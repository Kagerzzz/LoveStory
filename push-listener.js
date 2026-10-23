/**
 * LoveStory Realtime Web Push Daemon
 * Tự động lắng nghe sự kiện từ Supabase Realtime và bắn Web Push Notification
 * đến toàn bộ điện thoại (iPhone / Android) đã đăng ký.
 */

const { createClient } = require('@supabase/supabase-js');
const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://euxinlkkbmnqhjdbvuij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eGlubGtrYm1ucWhqZGJ2dWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NjY0NTUsImV4cCI6MjEwNjE0MjQ1NX0.JOyVo9kQigx4Gg5PxzV-B4ZX_xWbnaxJUFWgdS2NNEg';

// VAPID Keys
const vapidKeys = {
  publicKey: 'BH2q1Z90pv4TfqVDXbkMYOYaIekIfvAVUU86jkqLSEEXCvrSAlOItNNn8K1dqQoeXpi_rsk-duL-wjuh_QySCOg',
  privateKey: 'tDrlE4gb9rlCHGhiXSixPfDB1puttVHaUTLPjMkqM2k'
};

webpush.setVapidDetails(
  'mailto:thanhhieu@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🚀 [Push Daemon] Đang khởi động bộ lắng nghe Web Push cho LoveStory...');

// Bộ nhớ đệm chống trùng lặp (Deduplication Cache) trong 30 giây
const recentlyPushedIds = new Map();

function shouldPush(id) {
  if (!id) return true;
  const now = Date.now();
  if (recentlyPushedIds.has(id)) {
    const time = recentlyPushedIds.get(id);
    if (now - time < 30000) return false; // Đã bắn push cho mục này trong 30s trước
  }
  recentlyPushedIds.set(id, now);
  for (const [k, v] of recentlyPushedIds.entries()) {
    if (now - v > 60000) recentlyPushedIds.delete(k);
  }
  return true;
}

async function sendPushToAllSubscribers(notificationData) {
  try {
    const { data, error } = await supabase
      .from('love_notes')
      .select('id, content, text, date, created_at')
      .eq('author', '__PUSH_SUB__')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ [Push Daemon] Lỗi lấy danh sách push subscriptions:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.log('ℹ️ [Push Daemon] Chưa có thiết bị nào đăng ký nhận push (__PUSH_SUB__).');
      return;
    }

    // Deduplication Map: Mỗi thiết bị vật lý (hoặc endpoint độc nhất) CHỈ nhận đúng 1 thông báo
    const uniqueSubsMap = new Map();
    const staleDuplicateIds = [];

    for (const row of data) {
      let subObj = null;
      try {
        subObj = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
      } catch (e) {
        continue;
      }
      if (!subObj || !subObj.endpoint) continue;

      // Ưu tiên deviceId bền vững, fallback sang endpoint
      const deviceKey = subObj.deviceId || subObj.endpoint;

      if (uniqueSubsMap.has(deviceKey)) {
        // Vì data đã sort theo created_at giảm dần, bản ghi này cũ hơn -> gom lại để xóa
        staleDuplicateIds.push(row.id);
      } else {
        uniqueSubsMap.set(deviceKey, { row, subObj });
      }
    }

    // Tự động dọn dẹp các bản ghi trùng lặp trong cơ sở dữ liệu Supabase
    if (staleDuplicateIds.length > 0) {
      console.log(`🧹 [Push Daemon] Đang xóa ${staleDuplicateIds.length} bản ghi subscription trùng lặp khỏi DB:`, staleDuplicateIds);
      supabase.from('love_notes').delete().in('id', staleDuplicateIds).then(() => {});
    }

    let uniqueTargets = Array.from(uniqueSubsMap.values());

    if (notificationData.excludeDeviceId) {
      const beforeCount = uniqueTargets.length;
      uniqueTargets = uniqueTargets.filter(({ subObj }) => {
        // Nếu mục tiêu gửi là 'anh' và thiết bị này là máy của Anh (dev_wrbob92w_mvgk6e31),
        // KHÔNG loại trừ kể cả khi người dùng đang thử nghiệm đăng nhập 3108 trên máy mình để test:
        if (notificationData.targetRole === 'anh' && subObj.deviceId === 'dev_wrbob92w_mvgk6e31') {
          return true;
        }
        return subObj.deviceId !== notificationData.excludeDeviceId;
      });
      if (uniqueTargets.length < beforeCount) {
        console.log(`⏩ [Push Daemon] Đã bỏ qua thiết bị gửi [${notificationData.excludeDeviceId}] (không tự gửi push cho chính mình).`);
      }
    }

    // Lọc theo Target Role: Chỉ gửi đến thiết bị của người nhận tương ứng (anh -> em, em -> anh)
    if (notificationData.targetRole) {
      const beforeCount = uniqueTargets.length;
      uniqueTargets = uniqueTargets.filter(({ subObj }) => {
        // Tuyệt đối không gửi cho user 'em' (dev_q6r2nitw_mvglumhd) nếu targetRole là 'anh'
        if (notificationData.targetRole === 'anh') {
          if (subObj.deviceId === 'dev_q6r2nitw_mvglumhd') return false;
          // Máy của Anh cố định là dev_wrbob92w_mvgk6e31 (hoặc có role 'anh')
          if (subObj.deviceId === 'dev_wrbob92w_mvgk6e31') return true;
          return subObj.role === 'anh';
        }
        // Tuyệt đối không gửi cho user 'anh' (dev_wrbob92w_mvgk6e31) nếu targetRole là 'em'
        if (notificationData.targetRole === 'em') {
          if (subObj.deviceId === 'dev_wrbob92w_mvgk6e31') return false;
          // Máy của Em cố định là dev_q6r2nitw_mvglumhd (hoặc có role 'em')
          if (subObj.deviceId === 'dev_q6r2nitw_mvglumhd') return true;
          return subObj.role === 'em';
        }
        return subObj.role === notificationData.targetRole;
      });
      console.log(`🎯 [Push Daemon] Phân luồng targetRole="${notificationData.targetRole}": ${uniqueTargets.length}/${beforeCount} thiết bị phù hợp.`);
    }

    console.log(`🔔 [Push Daemon] Đang gửi thông báo đến ${uniqueTargets.length} thiết bị nhận...`);

    const notifTag = notificationData.tag || (notificationData.noteId ? 'note-' + notificationData.noteId : 'lovestory-push');

    const payloadString = JSON.stringify({
      title: notificationData.title || 'LoveStory 💕',
      body: notificationData.body || 'Bạn có một cập nhật mới!',
      icon: notificationData.icon || 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
      tag: notifTag,
      data: {
        url: notificationData.url || '/',
        action: notificationData.action || 'OPEN_NOTE',
        noteId: notificationData.noteId || null
      }
    });

    const results = await Promise.allSettled(
      uniqueTargets.map(async ({ row, subObj }) => {
        try {
          const res = await webpush.sendNotification(subObj, payloadString);
          console.log(`✅ [Push Daemon] Gửi thành công tới [${row.date || 'Device'} - ${subObj.role || 'no-role'} - ${subObj.deviceId || 'legacy'}]: HTTP ${res.statusCode}`);
          return { success: true };
        } catch (pushErr) {
          console.error(`❌ [Push Daemon] Lỗi gửi tới [${row.date || 'Device'}]:`, pushErr.message);
          if (pushErr.statusCode === 404 || pushErr.statusCode === 410) {
            console.log(`[-] Subscription hết hạn, đang xóa id ${row.id}...`);
            await supabase.from('love_notes').delete().eq('id', row.id);
          }
          return { error: pushErr.message };
        }
      })
    );

    const successCount = results.filter(r => r.status === 'fulfilled' && r.value && r.value.success).length;
    console.log(`✨ [Push Daemon] Hoàn tất: ${successCount}/${uniqueTargets.length} thiết bị đã nhận được thông báo!`);
  } catch (err) {
    console.error('❌ [Push Daemon] Lỗi gửi push:', err);
  }
}

// Lắng nghe Supabase Realtime cho love_notes
supabase
  .channel('push_daemon_channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'love_notes' }, async (payload) => {
    const row = payload.new;
    if (!row) return;

    // Bỏ qua các bản ghi nội bộ
    if (row.author === '__PUSH_SUB__' || row.author === '__CONFIG_MUSIC__' || row.author === '__CONFIG_AUTH__') return;

    if (!shouldPush(row.id)) {
      console.log(`⏩ [Push Daemon] Bỏ qua vì id ${row.id} vừa được gửi push.`);
      return;
    }

    console.log(`\n📬 [Push Daemon] Phát hiện INSERT mới: author="${row.author}"`);

    if (row.author === '__COMMENT__') {
      let cmtAuthor = 'Người ấy';
      let cmtText = 'Vừa để lại một phản hồi mới';
      let senderDevice = null;
      let senderRole = null;
      try {
        const parsed = JSON.parse(row.content);
        if (parsed.author) cmtAuthor = parsed.author;
        if (parsed.text) cmtText = parsed.text;
        if (parsed.sender_device) senderDevice = parsed.sender_device;
        if (parsed.sender_role) senderRole = parsed.sender_role;
      } catch (e) {
        if (row.text) cmtText = row.text;
      }

      if (!senderRole) {
        if (cmtAuthor.toLowerCase().includes('em') || cmtAuthor.toLowerCase().includes('linh')) {
          senderRole = 'em';
        } else {
          senderRole = 'anh';
        }
      }

      // Người gửi là senderRole -> Chỉ gửi đến role đối nghịch
      const targetRole = senderRole === 'anh' ? 'em' : 'anh';
      console.log(`💬 [Push Daemon] Bình luận từ "${cmtAuthor}" (${senderRole}) -> Gửi đến role: "${targetRole}"`);

      await sendPushToAllSubscribers({
        title: `💬 Thảo luận mới từ ${cmtAuthor}!`,
        body: cmtText,
        tag: 'comment-' + row.id,
        action: 'OPEN_NOTE',
        noteId: row.text,
        targetRole: targetRole,
        excludeDeviceId: senderDevice
      });
    } else {
      // Lời nhắn mới
      const authorName = row.author || 'Người thương';
      let noteBody = row.content || '';
      let senderRole = null;
      let senderDevice = null;

      if (row.text) {
        try {
          const meta = JSON.parse(row.text);
          if (meta.sender_role) senderRole = meta.sender_role;
          if (meta.sender_device) senderDevice = meta.sender_device;
          if (meta.text && !noteBody) noteBody = meta.text;
        } catch (e) {
          if (!noteBody) noteBody = row.text;
        }
      }

      if (!senderRole) {
        if (authorName.toLowerCase().includes('em') || authorName.toLowerCase().includes('linh')) {
          senderRole = 'em';
        } else {
          senderRole = 'anh';
        }
      }

      // Người gửi là senderRole -> Chỉ gửi đến role đối nghịch
      const targetRole = senderRole === 'anh' ? 'em' : 'anh';
      console.log(`💌 [Push Daemon] Lời nhắn từ "${authorName}" (${senderRole}) -> Gửi đến role: "${targetRole}"`);

      await sendPushToAllSubscribers({
        title: `💌 Lời nhắn mới từ ${authorName}!`,
        body: noteBody || 'Gửi đến bạn một lời nhắn ngọt ngào 💕',
        tag: 'note-' + row.id,
        action: 'OPEN_NOTE',
        noteId: row.id,
        targetRole: targetRole,
        excludeDeviceId: senderDevice
      });
    }
  })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'memories' }, async (payload) => {
    const row = payload.new;
    if (!row) return;

    if (!shouldPush(row.id)) {
      console.log(`⏩ [Push Daemon] Bỏ qua vì memory id ${row.id} vừa được gửi push.`);
      return;
    }

    console.log(`\n📸 [Push Daemon] Phát hiện ảnh kỷ niệm mới: "${row.caption}"`);

    await sendPushToAllSubscribers({
      title: '📸 Có ảnh kỷ niệm mới!',
      body: row.caption ? `"${row.caption}"` : 'Một khoảnh khắc mới vừa được lưu giữ',
      icon: row.image_url || undefined,
      tag: 'memory-' + row.id,
      action: 'OPEN_GALLERY'
    });
  })
  .subscribe((status) => {
    console.log('📡 [Push Daemon] Trạng thái kênh Supabase Realtime:', status);
    if (status === 'SUBSCRIBED') {
      console.log('🟢 [Push Daemon] ĐANG HOẠT ĐỘNG! Bất kỳ khi nào có lời nhắn/bình luận/ảnh mới, push sẽ tự động bắn đến iPhone ngay lập tức!');
    }
  });

// Giữ tiến trình chạy ngầm
process.on('SIGINT', () => {
  console.log('Stopping Push Daemon...');
  process.exit(0);
});

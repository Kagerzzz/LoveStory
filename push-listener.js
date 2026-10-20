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

async function sendPushToAllSubscribers(notificationData) {
  try {
    const { data, error } = await supabase
      .from('love_notes')
      .select('id, content, text, date')
      .eq('author', '__PUSH_SUB__');

    if (error) {
      console.error('❌ [Push Daemon] Lỗi lấy danh sách push subscriptions:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.log('ℹ️ [Push Daemon] Chưa có thiết bị nào đăng ký nhận push (__PUSH_SUB__).');
      return;
    }

    console.log(`🔔 [Push Daemon] Đang gửi thông báo đến ${data.length} thiết bị đăng ký...`);

    const payloadString = JSON.stringify({
      title: notificationData.title || 'LoveStory 💕',
      body: notificationData.body || 'Bạn có một cập nhật mới!',
      icon: notificationData.icon || 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
      data: {
        url: notificationData.url || '/',
        action: notificationData.action || 'OPEN_NOTE',
        noteId: notificationData.noteId || null
      }
    });

    const results = await Promise.allSettled(
      data.map(async (row) => {
        let subObj = null;
        try {
          subObj = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
        } catch (e) {
          console.warn('Lỗi parse subscription:', e);
          return;
        }

        if (!subObj || !subObj.endpoint) return;

        try {
          const res = await webpush.sendNotification(subObj, payloadString);
          console.log(`✅ [Push Daemon] Gửi thành công tới [${row.date || 'Device'}]: HTTP ${res.statusCode}`);
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
    console.log(`✨ [Push Daemon] Hoàn tất: ${successCount}/${data.length} thiết bị đã nhận được thông báo!`);
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
    if (row.author === '__PUSH_SUB__' || row.author === '__CONFIG_MUSIC__') return;

    console.log(`\n📬 [Push Daemon] Phát hiện INSERT mới: author="${row.author}"`);

    if (row.author === '__COMMENT__') {
      let cmtAuthor = 'Người ấy';
      let cmtText = 'Vừa để lại một phản hồi mới';
      try {
        const parsed = JSON.parse(row.content);
        if (parsed.author) cmtAuthor = parsed.author;
        if (parsed.text) cmtText = parsed.text;
      } catch (e) {
        if (row.text) cmtText = row.text;
      }

      await sendPushToAllSubscribers({
        title: `💬 Thảo luận mới từ ${cmtAuthor}!`,
        body: cmtText,
        action: 'OPEN_NOTE',
        noteId: row.text
      });
    } else {
      // Lời nhắn mới
      const authorName = row.author || 'Người thương';
      const noteBody = row.content || row.text || 'Gửi đến bạn một lời nhắn ngọt ngào 💕';

      await sendPushToAllSubscribers({
        title: `💌 Lời nhắn mới từ ${authorName}!`,
        body: noteBody,
        action: 'OPEN_NOTE',
        noteId: row.id
      });
    }
  })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'memories' }, async (payload) => {
    const row = payload.new;
    if (!row) return;

    console.log(`\n📸 [Push Daemon] Phát hiện ảnh kỷ niệm mới: "${row.caption}"`);

    await sendPushToAllSubscribers({
      title: '📸 Có ảnh kỷ niệm mới!',
      body: row.caption ? `"${row.caption}"` : 'Một khoảnh khắc mới vừa được lưu giữ',
      icon: row.image_url || undefined,
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

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://euxinlkkbmnqhjdbvuij.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eGlubGtrYm1ucWhqZGJ2dWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NjY0NTUsImV4cCI6MjEwNjE0MjQ1NX0.JOyVo9kQigx4Gg5PxzV-B4ZX_xWbnaxJUFWgdS2NNEg';

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || 'BH2q1Z90pv4TfqVDXbkMYOYaIekIfvAVUU86jkqLSEEXCvrSAlOItNNn8K1dqQoeXpi_rsk-duL-wjuh_QySCOg',
  privateKey: process.env.VAPID_PRIVATE_KEY || 'tDrlE4gb9rlCHGhiXSixPfDB1puttVHaUTLPjMkqM2k'
};

webpush.setVapidDetails(
  'mailto:thanhhieu@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Deduplication Cache (30 seconds)
const recentlyPushedIds = new Map();

function shouldPush(id) {
  if (!id) return true;
  const now = Date.now();
  if (recentlyPushedIds.has(id)) {
    const time = recentlyPushedIds.get(id);
    if (now - time < 30000) return false;
  }
  recentlyPushedIds.set(id, now);
  for (const [k, v] of recentlyPushedIds.entries()) {
    if (now - v > 60000) recentlyPushedIds.delete(k);
  }
  return true;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, body, icon, url, action, noteId, tag } = req.body || {};

    const notifTag = tag || (noteId ? 'note-' + noteId : 'lovestory-push');
    if (!shouldPush(notifTag)) {
      return res.status(200).json({ success: true, skipped: true, message: 'Deduplicated: already sent recently' });
    }

    const { data: subs, error } = await supabase
      .from('love_notes')
      .select('id, content, text, date')
      .eq('author', '__PUSH_SUB__');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!subs || subs.length === 0) {
      return res.status(200).json({ message: 'No subscriptions found', sent: 0 });
    }

    const payload = JSON.stringify({
      title: title || 'LoveStory 💕',
      body: body || 'Bạn có một cập nhật mới!',
      icon: icon || 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
      tag: notifTag,
      data: {
        url: url || '/',
        action: action || 'OPEN_NOTE',
        noteId: noteId || null
      }
    });

    const results = await Promise.allSettled(
      subs.map(async (row) => {
        try {
          const subObj = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
          if (subObj && subObj.endpoint) {
            await webpush.sendNotification(subObj, payload);
            return { success: true };
          }
        } catch (err) {
          if (err.statusCode === 404 || err.statusCode === 410) {
            await supabase.from('love_notes').delete().eq('id', row.id);
          }
          return { error: err.message };
        }
      })
    );

    const successCount = results.filter(r => r.status === 'fulfilled' && r.value && r.value.success).length;

    return res.status(200).json({
      success: true,
      sent: successCount,
      total: subs.length
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

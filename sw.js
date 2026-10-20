// ============================================================================
// Service Worker for LoveStory Web Notifications
// ============================================================================
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Lắng nghe sự kiện Push từ máy chủ (Web Push Notification chạy ngầm kể cả khi khóa màn hình)
self.addEventListener('push', (event) => {
  let data = {
    title: 'LoveStory 💕',
    body: 'Bạn vừa nhận được một cập nhật yêu thương mới!',
    icon: 'assets/images/IMG_1373.JPG',
    data: { url: '/', action: 'OPEN_NOTE' }
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  // Deduplication tag: use noteId or action so duplicate events collapse into 1 notification
  const notifTag = data.tag || (data.data && data.data.noteId ? 'note-' + data.data.noteId : 'lovestory-push');

  const options = {
    body: data.body || '',
    icon: data.icon || 'assets/images/IMG_1373.JPG',
    badge: 'assets/images/IMG_1373.JPG',
    vibrate: [200, 100, 200],
    tag: notifTag,
    renotify: false, // Ngăn chặn bắn lặp lại (double) khi cùng 1 nội dung đến
    data: data.data || { url: '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'LoveStory 💕', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          if (event.notification.data && event.notification.data.action) {
            client.postMessage({
              type: 'NOTIFICATION_ACTION',
              action: event.notification.data.action,
              data: event.notification.data
            });
          }
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

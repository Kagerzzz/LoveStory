/**
 * 30 DAYS OF US — ROMANTIC ANNIVERSARY INTERACTIVE SCRIPT
 * Security Architecture:
 * - Structural Unmounting: App template unmounted from DOM until unlocked.
 * - Zero-Knowledge SHA-256 password hash verification.
 * - WebCrypto AES-GCM encrypted love letter decryption in memory.
 * - Real-time Anti-Tamper Guard with MutationObserver and DevTools interceptors.
 * - Deferred Supabase network queries & Realtime channels.
 */

function initLoveStoryApp() {

  // Prevent mobile auto-scrolling to middle on reload: disable scroll restoration and clear URL hash
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  } catch (e) {
    console.warn('Scroll/history init:', e);
  }
  try {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } catch (e) {}

  // Safely resolve Supabase client (from window.supabaseClient or null if offline/blocked)
  const supabaseClient = (typeof window !== 'undefined' && window.supabaseClient) ? window.supabaseClient : null;

  // 1. STORY & COUPLE DATA
  // ==========================================
  const COUPLE_DATA = {
    hisName: 'Thân Hiếu',
    herName: 'Khánh Linh',
    startDate: '2026-08-31T00:00:00',
    letterDate: '00:00 29 thg 09, 2026',
    letterSalutation: 'Gửi em, nàng thơ của anh',
    // AES-GCM 256-bit encrypted ciphertext of the secret love letter
    letterBodyCipher: {
      iv: 'ORkjhpE6Ak+XVRtG',
      data: 'rjIjaV7V2puW0Rv8qOh2VomejWYfZAn1c/sWmgilcDuydwz4qCEfqxn8gWjsXi0vvnchWf36z7xrhFVrRdsWAabxtl1HAMUd4fKu8FmzWdfd8bu6IhM/T63MipkwEm29JKDkTcMah2aaagfEtxGhyP8tQ2zBKeSmLpeeF2ndlm5+JjHRRMXElJ54VJI03JaIk//+zX98t742N/BJqQ9eC4ZGdV4Cz/su3muJibwIZivS86gRt7E+MKuf6V74gJ1kPuHUx7XmMaG3tRoe1Piv6bWdvVzfrRGg7CkC7eZfzIYv7jW0kWNx4Ptuc4Rv0H7Fxo0LGYrFXMgHEODIE//j50SSoL8p4x6prOPn5Ti+jRmYbLHmRC4YDS95sBgsUUskeZ8Fpv7EhNwY7hys70BPr5KkZUB3Pu+mhNb0COP/DWvxRs8GfzfIvg9SSgKq1UBYs5FW2geNqyNH56D/ISfOY+oXIwgG8WrK8YQkQtpEXoPp17yVm9rwxyRMwZjM+AjH0X6GDJGuN7y/XBaizfaWNucbxIJLkpjt8P5/0BnxRC+q/VECxvNlBULnq0D2pFtXsOXcE4IWMiTZsIzxURyIB4R2Jk9u9fhLk1sTIV7z4ansKLVXud0qKRXrqG+bmZjcoxDJydu00/rmDZyOiqtjoS1be3ASYwQzCtwJYJzBLWZ8I8f9uG8G+eEuYlXpAZAZuydU/dBh8JLUzn2fKowUPt91JaZugUQYCV3nwzoR/Ivh8tW8fBHaQrPSRupTuHVZx6jJF90x2By8vuz1LILIHhn/I13u8rcB/xOTv4Ss/8LoIn9bj3XmszI+a+C5nIeXC/aDxaufXyAqq4+MMUKtYYXf/ryku5DkpNwqaZy2aIxMdeTAtnc3JlJKkcEKh/CWdivx/rdA+/I184ovx10XQrzrBmtMJhYLc+V3hmcDJeONJ52KBna5hIaHZRdAIy4YdYj1ivPfjDN3wNW3a1VX0S511jZWTyZFldBd2IQxA/+pNBl+spvLq8a0A4vXPV64z+/erWSSKeJCD6jtHVWrrxj/4Stbq6l238wou2q39fjj8etMISyaqx5MjoIi1Fvcpzr0TutWzg9GakpihiPeNsmkPZHOe1UVvuWSA511GUGYTyIJ8RMbaT7iYVaDVNTXOVVt1xTra3CLmixuq1fkNNNpB182wFVc/Ji10QJTZx/wAW/30nO6pfpRWSjerRDxzQKBjMzoOjlU6tgBBqrxYNFtW/VBAwkyCp97Rzk2EUcF0GHTM4FEjIaxxY987k81tCmYXPXb4maj7vBVPHIE3yoEoUrepZ28SfC2g1ssGkS7xE07NGu5UeXJpOLYKpmCZVc4TGsVbsLVpi6iX24NkgULQhuJUn+002z4zUoQNmbV40SKX09n9qaIpdB1vRB3a2l8c8oPxJkpStANyOZfXfac0q+3uLD8Y8X8sOxE6ESdZqO9Opn5qznjAiq/gmgja27UlKape7I72xBDy5Tnl2nx57mwqBl3lXfRK4SZ4y3GHRae0rU/ed98lZlT82zTb1y5I95LCCKSOSPcajISsi+Y9Rq9il1/f/q9gaWBFOqCddu7opQtPo32/nynsg='
    },
    letterSignature: 'Yêu em nhiều hơn mỗi ngày trôi qua'
  };

  const DEFAULT_NOTES = [
    {
      id: 'default-1',
      author: 'Khánh Linh',
      text: 'Cảm ơn anh người yêu 2001 đã luôn nhường nhịn, cưng chiều và thức đêm buôn chuyện cùng em. Yêu anh nhiều! 🎾💖',
      date: '31.08.2026 21:00'
    },
    {
      id: 'default-2',
      author: 'Thân Hiếu',
      text: 'May mắn nhất là hôm đó đi chơi pickleball và va phải em. Mãi là đồng đội số 1 của anh nhé bé yêu! 🥰',
      date: '31.08.2026 21:15'
    },
    {
      id: 'default-3',
      author: 'Hai Đứa Mình',
      text: 'Từ 31.08.2026 đến mãi mãi về sau — Cùng nhau đi thật nhiều nơi, cười thật nhiều và yêu thương nhau thật nhiều! ✨',
      date: '31.08.2026 22:00'
    }
  ];

  let appNotes = [...DEFAULT_NOTES];
  let appComments = [];
  let activeNoteDetailId = null;
  let appOpenNoteDetailModal = null;

  // Helper: HTML escaping
  function escapeHTML(str) {
    return (str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ==========================================
  // NOTIFICATION SYSTEM & HELPERS
  // ==========================================
  const myRecentlySentIds = new Set();

  function playNotificationChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.15); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880.00, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28); // D6

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
    } catch (e) {}
  }

  function showAppNotification({ title, body, icon, action, noteId, onClick }) {
    playNotificationChime();

    // 1. In-App Floating Toast Notification
    const container = document.getElementById('appToastContainer');
    if (container) {
      const toast = document.createElement('div');
      toast.className = 'app-toast';

      const isImgUrl = typeof icon === 'string' && (icon.includes('/') || icon.startsWith('data:image'));
      const iconHTML = isImgUrl
        ? `<img src="${escapeHTML(icon)}" class="app-toast-img" alt="Icon">`
        : `<span class="app-toast-icon">${icon || '💖'}</span>`;

      toast.innerHTML = `
        ${iconHTML}
        <div class="app-toast-body">
          <h5 class="app-toast-title">${escapeHTML(title)}</h5>
          <p class="app-toast-text">${escapeHTML(body)}</p>
        </div>
        <button type="button" class="app-toast-close" title="Đóng">✕</button>
        <div class="app-toast-progress" style="animation-duration: 6s;"></div>
      `;

      const closeBtn = toast.querySelector('.app-toast-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toast.classList.remove('show');
          setTimeout(() => toast.remove(), 350);
        });
      }

      toast.addEventListener('click', () => {
        if (typeof onClick === 'function') onClick();
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
      });

      container.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));

      setTimeout(() => {
        if (toast.parentElement) {
          toast.classList.remove('show');
          setTimeout(() => toast.remove(), 350);
        }
      }, 6000);
    }

    // 2. Web Browser Native Notification (System Banner / Background)
    // LƯU Ý KỸ THUẬT QUAN TRỌNG:
    // Tuyệt đối KHÔNG gọi `reg.showNotification` tại đây!
    // Hệ thống Web Push (push-listener.js -> Apple APNs / Google FCM -> sw.js) đã đảm nhận
    // việc bắn thông báo hệ thống khi màn hình khóa hoặc tab bị ẩn.
    // Nếu gọi song song tại đây, trình duyệt / iOS sẽ nhận 2 thông báo cùng lúc (1 từ WebSocket, 1 từ Web Push).
  }

  // Helper: Convert VAPID key to Uint8Array for PushManager
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Subscribe to Web Push and sync to Supabase (Deduplicated per physical device)
  async function syncWebPushSubscription() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const VAPID_PUBLIC_KEY = 'BH2q1Z90pv4TfqVDXbkMYOYaIekIfvAVUU86jkqLSEEXCvrSAlOItNNn8K1dqQoeXpi_rsk-duL-wjuh_QySCOg';
      let sub = await reg.pushManager.getSubscription();
      if (!sub && Notification.permission === 'granted') {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
      }
      if (supabaseClient && sub) {
        const endpoint = sub.endpoint;

        // 1. Quản lý Device ID bền vững trong localStorage
        let deviceId = localStorage.getItem('lovestory_device_id');
        if (!deviceId) {
          deviceId = 'dev_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
          localStorage.setItem('lovestory_device_id', deviceId);
        }

        // 2. Dọn dẹp endpoint cũ nếu trình duyệt đổi push token (tránh nhân đôi trên iOS APNs)
        const oldEndpoint = localStorage.getItem('lovestory_push_endpoint');
        if (oldEndpoint && oldEndpoint !== endpoint) {
          try {
            await supabaseClient
              .from('love_notes')
              .delete()
              .eq('author', '__PUSH_SUB__')
              .eq('text', oldEndpoint);
            console.log('🧹 [WebPush] Đã dọn dẹp push endpoint cũ:', oldEndpoint);
          } catch (e) {
            console.warn('Lỗi dọn dẹp push endpoint cũ:', e);
          }
        }
        localStorage.setItem('lovestory_push_endpoint', endpoint);

        const subJson = sub.toJSON();
        subJson.deviceId = deviceId;
        const deviceType = navigator.userAgent.includes('iPhone') ? 'iPhone' : (navigator.userAgent.includes('Android') ? 'Android' : 'Desktop');

        // 3. Kiểm tra các bản ghi subscription hiện có trên Supabase
        const { data: existingSubs } = await supabaseClient
          .from('love_notes')
          .select('id, content, text')
          .eq('author', '__PUSH_SUB__');

        let primaryId = null;
        const duplicateIds = [];

        if (existingSubs && existingSubs.length > 0) {
          for (const row of existingSubs) {
            let parsed = null;
            try {
              parsed = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
            } catch (e) {}

            const isSameDevice = parsed && parsed.deviceId === deviceId;
            const isSameEndpoint = row.text === endpoint || (parsed && parsed.endpoint === endpoint);

            if (isSameDevice || isSameEndpoint) {
              if (!primaryId) {
                primaryId = row.id;
              } else {
                duplicateIds.push(row.id);
              }
            }
          }
        }

        // Dọn sạch các bản ghi trùng lặp của cùng thiết bị này
        if (duplicateIds.length > 0) {
          await supabaseClient.from('love_notes').delete().in('id', duplicateIds);
          console.log('🧹 [WebPush] Đã xóa subscription trùng lặp:', duplicateIds);
        }

        if (primaryId) {
          await supabaseClient
            .from('love_notes')
            .update({
              content: JSON.stringify(subJson),
              text: endpoint,
              date: deviceType
            })
            .eq('id', primaryId);
          console.log('✨ [WebPush] Cập nhật push subscription thành công:', deviceId);
        } else {
          await supabaseClient
            .from('love_notes')
            .insert([{
              author: '__PUSH_SUB__',
              content: JSON.stringify(subJson),
              text: endpoint,
              date: deviceType
            }]);
          console.log('✨ [WebPush] Đăng ký push subscription mới thành công:', deviceId);
        }
      }
    } catch (err) {
      console.warn('WebPush sync error:', err);
    }
  }

  // Trigger cloud Web Push notification to all subscribers
  function triggerCloudWebPush(payload) {
    // Không cần gọi HTTP API riêng biệt vì daemon push-listener.js
    // đã tự động đón sự kiện INSERT thời gian thực từ Supabase để gửi Web Push tới toàn bộ thiết bị.
  }

  // Register service worker for web notifications if supported
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const registerSW = () => {
      navigator.serviceWorker.register('sw.js?v=2.2').then(reg => {
        console.log('✅ Service Worker registered successfully:', reg.scope);
        if (Notification.permission === 'granted') {
          syncWebPushSubscription().catch(() => {});
        }
      }).catch(err => {
        console.warn('Service Worker registration note:', err);
      });
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'NOTIFICATION_ACTION') {
        const { action, data } = event.data;
        if (action === 'OPEN_NOTE' && data && data.noteId) {
          if (typeof appOpenNoteDetailModal === 'function') {
            appOpenNoteDetailModal(data.noteId);
          } else if (typeof window !== 'undefined' && typeof window.__openNoteDetailModal === 'function') {
            window.__openNoteDetailModal(data.noteId);
          }
        } else if (action === 'OPEN_GALLERY') {
          const gallery = document.getElementById('gallery');
          if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // ==========================================
  // 2. CRYPTOGRAPHY & SECURITY HELPERS
  // ==========================================
  // SHA-256 hashes of valid PINs
  const HASH_3108 = '50d65da5a5788e6183a480898578d672eb3f1d593a5b308e6e0b971e90fab6b9'; // Em ❤️
  const HASH_7612 = '336120f10ba42e9e8b5e5e725c0f491bca7cd1968c318f43d8ec7c29aa1f990a'; // Anh ❤️

  const DEFAULT_AUTH_CONFIG = {
    em: { passcode: '3108', title: 'Em ❤️' },
    anh: { passcode: '7612', title: 'Anh ❤️' }
  };

  function getLocalAuthConfig() {
    try {
      const raw = localStorage.getItem('lovestory_auth_config');
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          em: { ...DEFAULT_AUTH_CONFIG.em, ...(parsed.em || {}) },
          anh: { ...DEFAULT_AUTH_CONFIG.anh, ...(parsed.anh || {}) }
        };
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_AUTH_CONFIG));
  }

  function saveLocalAuthConfig(cfg) {
    try {
      localStorage.setItem('lovestory_auth_config', JSON.stringify(cfg));
    } catch (e) {}
  }

  async function syncAuthConfigToDatabase(cfg) {
    saveLocalAuthConfig(cfg);
    if (!supabaseClient) return;
    try {
      const { data: existing } = await supabaseClient
        .from('love_notes')
        .select('id')
        .eq('author', '__CONFIG_AUTH__')
        .limit(1);

      if (existing && existing.length > 0) {
        await supabaseClient
          .from('love_notes')
          .update({
            content: JSON.stringify(cfg),
            text: 'CONFIG_AUTH_UPDATED',
            date: new Date().toLocaleDateString('vi-VN')
          })
          .eq('id', existing[0].id);
      } else {
        await supabaseClient
          .from('love_notes')
          .insert([{
            author: '__CONFIG_AUTH__',
            content: JSON.stringify(cfg),
            text: 'CONFIG_AUTH_INIT',
            date: new Date().toLocaleDateString('vi-VN')
          }]);
      }
    } catch (err) {
      console.warn('Lỗi đồng bộ auth config lên Supabase:', err);
    }
  }

  async function loadAuthConfigFromDatabase() {
    if (!supabaseClient) return;
    try {
      const { data, error } = await supabaseClient
        .from('love_notes')
        .select('*')
        .eq('author', '__CONFIG_AUTH__')
        .limit(1);

      if (!error && data && data.length > 0) {
        try {
          const remoteCfg = JSON.parse(data[0].content);
          if (remoteCfg && (remoteCfg.em || remoteCfg.anh)) {
            const merged = {
              em: { ...DEFAULT_AUTH_CONFIG.em, ...(remoteCfg.em || {}) },
              anh: { ...DEFAULT_AUTH_CONFIG.anh, ...(remoteCfg.anh || {}) }
            };
            saveLocalAuthConfig(merged);
          }
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Lỗi đọc auth config từ Supabase:', err);
    }
  }

  // Pre-load auth config from database
  loadAuthConfigFromDatabase();

  // Current logged in user identity and role based on passcode entered (em or anh)
  let currentUserIdentity = (typeof localStorage !== 'undefined' && localStorage.getItem('lovestory_user_identity')) || '';
  let currentAccountRole = (typeof localStorage !== 'undefined' && localStorage.getItem('lovestory_account_role')) || '';

  async function computeSHA256(message) {
    const enc = new TextEncoder();
    const data = enc.encode(message);
    const hashBuf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function decryptText(ciphertextBase64, ivBase64, password) {
    const enc = new TextEncoder();
    const salt = enc.encode('LoveStory3108Salt');
    const baseKey = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    const aesKey = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
    const encryptedBuf = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0));

    const decryptedBuf = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encryptedBuf
    );
    const dec = new TextDecoder();
    return dec.decode(decryptedBuf);
  }

  // ==========================================
  // 3. ANTI-TAMPER DEVTOOLS GUARD
  // ==========================================
  let isUnlocked = false;

  function triggerTamperLockdown() {
    if (isUnlocked) return;
    console.warn('[SECURITY] Phát hiện thao tác can thiệp DOM / DevTools khi chưa mở khóa!');
    
    // Purge mounted content and template
    const appRoot = document.getElementById('appRoot');
    if (appRoot) appRoot.innerHTML = '';
    const template = document.getElementById('protectedAppTemplate');
    if (template) template.remove();

    const introScreen = document.getElementById('introScreen');
    if (introScreen) introScreen.remove();

    const tamperScreen = document.getElementById('tamperScreen');
    if (tamperScreen) {
      tamperScreen.style.display = 'flex';
    }
  }

  const tamperObserver = new MutationObserver((mutations) => {
    if (isUnlocked) return;
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.removedNodes) {
          if (node.id === 'introScreen' || (node.querySelector && node.querySelector('#introScreen'))) {
            triggerTamperLockdown();
            return;
          }
        }
      }
      if (mutation.type === 'attributes') {
        const target = mutation.target;
        if (target && target.id === 'introScreen') {
          const comp = window.getComputedStyle(target);
          if (
            comp.display === 'none' ||
            comp.visibility === 'hidden' ||
            parseFloat(comp.opacity) < 0.1 ||
            target.classList.contains('hide')
          ) {
            triggerTamperLockdown();
            return;
          }
        }
      }
    }
  });

  tamperObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden']
  });

  // Guard against F12 & context menu while locked
  function onContextMenuGuard(e) {
    if (!isUnlocked) {
      e.preventDefault();
      return false;
    }
  }

  function onKeyDownGuard(e) {
    if (!isUnlocked) {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
      ) {
        e.preventDefault();
        return false;
      }
    }
  }

  document.addEventListener('contextmenu', onContextMenuGuard);
  window.addEventListener('keydown', onKeyDownGuard);

  function removeLockScreenGuards() {
    document.removeEventListener('contextmenu', onContextMenuGuard);
    window.removeEventListener('keydown', onKeyDownGuard);
  }


  // ==========================================
  // YOUTUBE AUDIO PLAYER BRIDGE & DYNAMIC CONFIG
  // ==========================================
  const DEFAULT_MUSIC_CONFIG = {
    url: 'https://www.youtube.com/watch?v=-uFQzcY7YHc',
    videoId: '-uFQzcY7YHc',
    title: 'Head In The Clouds',
    artist: 'Hayd'
  };

  function extractYouTubeId(url) {
    if (!url) return null;
    const str = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
      return str;
    }
    const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|.*[?&]v=))([\w-]{11})/i);
    return match ? match[1] : null;
  }

  async function fetchYouTubeMetadata(videoId, rawUrl) {
    try {
      const targetUrl = rawUrl || `https://www.youtube.com/watch?v=${videoId}`;
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`);
      if (res.ok) {
        const data = await res.json();
        return {
          title: data.title || 'YouTube Track',
          artist: data.author_name || 'YouTube'
        };
      }
    } catch (e) {
      console.warn('oEmbed fetch error:', e);
    }
    return {
      title: 'YouTube Track',
      artist: 'Custom Song'
    };
  }

  function getLocalMusicConfig() {
    try {
      const saved = localStorage.getItem('lovestory_music_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.videoId) return parsed;
      }
    } catch (e) {}
    return DEFAULT_MUSIC_CONFIG;
  }

  let currentMusicConfig = getLocalMusicConfig();
  let ytPlayer = null;
  let ytPlayerReady = false;
  let pendingPlay = false;

  // Floating audio player DOM references (hydrated upon mounting appRoot)
  let floatingAudioBar = null;
  let audioPlayBtn = null;
  let audioPlayIcon = null;
  let audioPauseIcon = null;
  let audioCurrentTime = null;
  let audioDuration = null;
  let audioProgressContainer = null;
  let audioProgressFill = null;
  let audioMuteBtn = null;
  let audioVolIcon = null;
  let audioVolumeSlider = null;
  let audioSettingsBtn = null;
  let audioCollapseBtn = null;
  let collapseIcon = null;

  let isPlayingMusic = true;
  let progressInterval = null;

  const FALLBACK_DURATION = 165; // Hayd - Head In The Clouds (~2:45)
  let currentElapsed = 0;
  let currentVolume = 0.75;
  let isMuted = false;
  let lastVolume = 75;

  function formatTimeTrack(seconds) {
    if (isNaN(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateTrackProgress() {
    try {
      let dur = FALLBACK_DURATION;
      let curr = currentElapsed;

      if (ytPlayer && ytPlayerReady) {
        try {
          const ytDur = ytPlayer.getDuration();
          if (ytDur && ytDur > 0) dur = ytDur;
          const ytCurr = ytPlayer.getCurrentTime();
          if (typeof ytCurr === 'number' && !isNaN(ytCurr)) {
            curr = ytCurr;
            currentElapsed = Math.floor(ytCurr);
          }
        } catch (e) {}
      }

      if (audioCurrentTime) audioCurrentTime.textContent = formatTimeTrack(curr);
      if (audioDuration) audioDuration.textContent = formatTimeTrack(dur);
      if (audioProgressFill) {
        const pct = Math.min(100, Math.max(0, (curr / dur) * 100));
        audioProgressFill.style.width = `${pct}%`;
      }
    } catch (e) {}
  }

  function startProgressTicker() {
    try {
      if (progressInterval) clearInterval(progressInterval);
      updateTrackProgress();
      progressInterval = setInterval(() => {
        if (!isPlayingMusic) return;
        if (!ytPlayer || !ytPlayerReady) {
          currentElapsed++;
          if (currentElapsed > FALLBACK_DURATION) currentElapsed = 0;
        }
        updateTrackProgress();
      }, 500);
    } catch (e) {}
  }

  function stopProgressTicker() {
    try {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    } catch (e) {}
  }

  function updateAudioUI(playing) {
    try {
      if (floatingAudioBar) {
        if (playing) {
          floatingAudioBar.classList.add('is-playing');
        } else {
          floatingAudioBar.classList.remove('is-playing');
        }
      }
      if (audioPlayIcon && audioPauseIcon) {
        if (playing) {
          audioPlayIcon.style.display = 'none';
          audioPauseIcon.style.display = 'block';
        } else {
          audioPlayIcon.style.display = 'block';
          audioPauseIcon.style.display = 'none';
        }
      }
    } catch (e) {}
  }

  function startMusic() {
    isPlayingMusic = true;
    try {
      updateAudioUI(true);
    } catch (e) {}

    try {
      if (ytPlayer && ytPlayerReady && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo();
      } else {
        pendingPlay = true;
      }
    } catch (e) {
      console.warn('ytPlayer.playVideo exception:', e);
      pendingPlay = true;
    }

    try {
      startProgressTicker();
    } catch (e) {}
  }

  function stopMusic() {
    isPlayingMusic = false;
    pendingPlay = false;
    try {
      updateAudioUI(false);
    } catch (e) {}

    try {
      if (ytPlayer && ytPlayerReady && typeof ytPlayer.pauseVideo === 'function') {
        ytPlayer.pauseVideo();
      }
    } catch (e) {
      console.warn('ytPlayer.pauseVideo exception:', e);
    }
    try {
      stopProgressTicker();
    } catch (e) {}
  }

  function handleYTStateChange(state) {
    // 1: PLAYING, 2: PAUSED, 0: ENDED
    if (state === 1) { // PLAYING
      isPlayingMusic = true;
      pendingPlay = false;
      updateAudioUI(true);
      startProgressTicker();
    } else if (state === 2) { // PAUSED
      isPlayingMusic = false;
      updateAudioUI(false);
      stopProgressTicker();
    } else if (state === 0) { // ENDED (Loop track)
      if (ytPlayer && typeof ytPlayer.seekTo === 'function') {
        ytPlayer.seekTo(0, true);
        ytPlayer.playVideo();
      }
    }
  }

  function handleYTError(err) {
    console.warn('YouTube Player error code:', err ? err.data : 'unknown');
  }

  function initYouTubePlayer() {
    if (ytPlayer || !window.YT || !window.YT.Player) return;
    try {
      const activeVideoId = currentMusicConfig.videoId || '-uFQzcY7YHc';
      ytPlayer = new YT.Player('ytAudioPlayer', {
        height: '200',
        width: '200',
        videoId: activeVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          playlist: activeVideoId
        },
        events: {
          onReady: () => {
            ytPlayerReady = true;
            try {
              if (typeof ytPlayer.setVolume === 'function') {
                ytPlayer.setVolume(Math.round(currentVolume * 100));
              }
              if (typeof ytPlayer.unMute === 'function') {
                ytPlayer.unMute();
              }
            } catch (e) {}
            if (isPlayingMusic || pendingPlay) {
              try {
                ytPlayer.playVideo();
              } catch (e) {
                console.warn('ytPlayer.playVideo exception:', e);
              }
            }
          },
          onStateChange: (event) => {
            handleYTStateChange(event.data);
          },
          onError: (err) => {
            handleYTError(err);
          }
        }
      });
    } catch (e) {
      console.warn('Failed to initialize YouTube Player:', e);
    }
  }

  window.initYouTubePlayerGlobal = initYouTubePlayer;

  // Hook global YouTube API callback
  window.onYouTubeIframeAPIReady = function() {
    initYouTubePlayer();
  };

  // If YouTube API script was already parsed and ready
  if (window.YT && window.YT.Player) {
    initYouTubePlayer();
  }

  // --- 3B. FLOATING NEUBRUTALISM AUDIO PLAYER (BOTTOM OF SCREEN) ---
  function initFloatingAudioPlayer() {
    floatingAudioBar = document.getElementById('floatingAudioBar');
    audioPlayBtn = document.getElementById('audioPlayBtn');
    audioPlayIcon = document.getElementById('audioPlayIcon');
    audioPauseIcon = document.getElementById('audioPauseIcon');
    audioCurrentTime = document.getElementById('audioCurrentTime');
    audioDuration = document.getElementById('audioDuration');
    audioProgressContainer = document.getElementById('audioProgressContainer');
    audioProgressFill = document.getElementById('audioProgressFill');
    audioMuteBtn = document.getElementById('audioMuteBtn');
    audioVolIcon = document.getElementById('audioVolIcon');
    audioVolumeSlider = document.getElementById('audioVolumeSlider');
    audioSettingsBtn = document.getElementById('audioSettingsBtn');
    audioCollapseBtn = document.getElementById('audioCollapseBtn');
    collapseIcon = document.getElementById('collapseIcon');

    // Music Settings Modal Elements
    const musicSettingsModal = document.getElementById('musicSettingsModal');
    const closeMusicModalBtn = document.getElementById('closeMusicModalBtn');
    const cancelMusicBtn = document.getElementById('cancelMusicBtn');
    const musicSettingsForm = document.getElementById('musicSettingsForm');
    const musicYoutubeUrlInput = document.getElementById('musicYoutubeUrlInput');
    const musicDetectInfo = document.getElementById('musicDetectInfo');
    const musicDetectTitle = document.getElementById('musicDetectTitle');
    const musicDetectArtist = document.getElementById('musicDetectArtist');
    const musicErrorTip = document.getElementById('musicErrorTip');
    const musicErrorTipText = document.getElementById('musicErrorTipText');
    const saveMusicBtnText = document.getElementById('saveMusicBtnText');

    // Sync audio UI with running audio controller
    updateAudioUI(isPlayingMusic);
    if (isPlayingMusic) {
      startProgressTicker();
    }

    if (audioPlayBtn) {
      audioPlayBtn.addEventListener('click', () => {
        if (isPlayingMusic) {
          stopMusic();
        } else {
          startMusic();
        }
      });
    }

    if (audioProgressContainer) {
      audioProgressContainer.addEventListener('click', (e) => {
        const rect = audioProgressContainer.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        let dur = FALLBACK_DURATION;
        if (ytPlayer && ytPlayerReady && typeof ytPlayer.getDuration === 'function') {
          const ytDur = ytPlayer.getDuration();
          if (ytDur && ytDur > 0) dur = ytDur;
        }
        const targetSec = clickRatio * dur;
        currentElapsed = Math.floor(targetSec);

        if (ytPlayer && ytPlayerReady && typeof ytPlayer.seekTo === 'function') {
          ytPlayer.seekTo(targetSec, true);
        }
        updateTrackProgress();
      });
    }

    if (audioVolumeSlider) {
      audioVolumeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        currentVolume = val / 100;
        if (ytPlayer && ytPlayerReady && typeof ytPlayer.setVolume === 'function') {
          ytPlayer.setVolume(val);
          if (val > 0 && typeof ytPlayer.isMuted === 'function' && ytPlayer.isMuted()) {
            ytPlayer.unMute();
          }
        }
        if (audioVolIcon) {
          audioVolIcon.textContent = val === 0 ? '🔇' : val < 50 ? '🔉' : '🔊';
        }
        isMuted = (val === 0);
      });
    }

    if (audioMuteBtn) {
      audioMuteBtn.addEventListener('click', () => {
        if (isMuted) {
          isMuted = false;
          const targetVol = lastVolume > 0 ? lastVolume : 75;
          currentVolume = targetVol / 100;
          if (audioVolumeSlider) audioVolumeSlider.value = targetVol;
          if (audioVolIcon) audioVolIcon.textContent = targetVol < 50 ? '🔉' : '🔊';
          if (ytPlayer && ytPlayerReady) {
            if (typeof ytPlayer.unMute === 'function') ytPlayer.unMute();
            if (typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(targetVol);
          }
        } else {
          isMuted = true;
          lastVolume = audioVolumeSlider ? parseInt(audioVolumeSlider.value, 10) : 75;
          currentVolume = 0;
          if (audioVolumeSlider) audioVolumeSlider.value = 0;
          if (audioVolIcon) audioVolIcon.textContent = '🔇';
          if (ytPlayer && ytPlayerReady && typeof ytPlayer.mute === 'function') {
            ytPlayer.mute();
          }
        }
      });
    }

    if (audioCollapseBtn && floatingAudioBar) {
      audioCollapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCollapsed = floatingAudioBar.classList.toggle('is-collapsed');
        floatingAudioBar.classList.toggle('collapsed', isCollapsed);
        if (isCollapsed) {
          if (collapseIcon) collapseIcon.textContent = '🎵';
          audioCollapseBtn.title = 'Mở rộng thanh nhạc';
          audioCollapseBtn.setAttribute('aria-label', 'Mở rộng thanh nhạc');
        } else {
          if (collapseIcon) collapseIcon.textContent = '✕';
          audioCollapseBtn.title = 'Thu gọn thanh nhạc';
          audioCollapseBtn.setAttribute('aria-label', 'Thu gọn thanh nhạc');
        }
      });

      // Allow clicking the collapsed mini-bar to expand it back
      floatingAudioBar.addEventListener('click', (e) => {
        if (floatingAudioBar.classList.contains('is-collapsed') || floatingAudioBar.classList.contains('collapsed')) {
          if (e.target.closest('#audioPlayBtn') || e.target.closest('#audioCollapseBtn') || e.target.closest('#audioSettingsBtn')) return;
          floatingAudioBar.classList.remove('is-collapsed', 'collapsed');
          if (collapseIcon) collapseIcon.textContent = '✕';
          audioCollapseBtn.title = 'Thu gọn thanh nhạc';
          audioCollapseBtn.setAttribute('aria-label', 'Thu gọn thanh nhạc');
        }
      });
    }

    // Dynamic music switcher & modal functions
    function applyMusicConfig(config, shouldPlay = true) {
      if (!config || !config.videoId) return;
      currentMusicConfig = config;

      const titleEl = document.getElementById('audioTrackTitle') || document.querySelector('.audio-title');
      const artistEl = document.querySelector('.audio-artist');
      const discEl = document.getElementById('audioDisc');

      if (titleEl) titleEl.textContent = config.title;
      if (artistEl) artistEl.textContent = config.artist;
      if (discEl) discEl.title = `Đang phát nhạc: ${config.title} - ${config.artist}`;

      if (ytPlayer && ytPlayerReady) {
        let currentUrl = '';
        try {
          if (typeof ytPlayer.getVideoUrl === 'function') {
            currentUrl = ytPlayer.getVideoUrl() || '';
          }
        } catch (e) {}

        const isSameVideo = currentUrl.includes(config.videoId);

        if (shouldPlay) {
          try {
            if (!isSameVideo && typeof ytPlayer.loadVideoById === 'function') {
              ytPlayer.loadVideoById(config.videoId);
            }
            if (typeof ytPlayer.playVideo === 'function') {
              ytPlayer.playVideo();
            }
            isPlayingMusic = true;
            updateAudioUI(true);
          } catch (e) {
            console.warn('loadVideoById error:', e);
          }
        } else {
          if (!isPlayingMusic && !isSameVideo && typeof ytPlayer.cueVideoById === 'function') {
            try {
              ytPlayer.cueVideoById(config.videoId);
            } catch (e) {
              console.warn('cueVideoById error:', e);
            }
          }
        }
      }
    }

    async function saveMusicToDatabase(config) {
      try {
        localStorage.setItem('lovestory_music_config', JSON.stringify(config));
      } catch (e) {}

      if (!supabaseClient) return;

      try {
        const { data: existing } = await supabaseClient
          .from('love_notes')
          .select('id')
          .eq('author', '__CONFIG_MUSIC__')
          .limit(1);

        if (existing && existing.length > 0) {
          await supabaseClient
            .from('love_notes')
            .update({
              content: JSON.stringify(config),
              text: `🎵 Nhạc nền: ${config.title} - ${config.artist}`,
              date: new Date().toLocaleDateString('vi-VN')
            })
            .eq('id', existing[0].id);
        } else {
          await supabaseClient
            .from('love_notes')
            .insert([{
              author: '__CONFIG_MUSIC__',
              content: JSON.stringify(config),
              text: `🎵 Nhạc nền: ${config.title} - ${config.artist}`,
              date: new Date().toLocaleDateString('vi-VN')
            }]);
        }
        console.log('✨ [Supabase] Đã lưu bài hát thành công vào database!');
      } catch (err) {
        console.error('Lỗi khi lưu nhạc vào Supabase:', err);
      }
    }

    async function loadMusicFromDatabase() {
      const local = getLocalMusicConfig();
      if (local && local.videoId) {
        currentMusicConfig = local;
        const titleEl = document.getElementById('audioTrackTitle') || document.querySelector('.audio-title');
        const artistEl = document.querySelector('.audio-artist');
        const discEl = document.getElementById('audioDisc');
        if (titleEl) titleEl.textContent = local.title;
        if (artistEl) artistEl.textContent = local.artist;
        if (discEl) discEl.title = `Đang phát nhạc: ${local.title} - ${local.artist}`;
      }

      if (!supabaseClient) return;
      try {
        const { data, error } = await supabaseClient
          .from('love_notes')
          .select('*')
          .eq('author', '__CONFIG_MUSIC__')
          .limit(1);

        if (!error && data && data.length > 0) {
          try {
            const remoteConfig = JSON.parse(data[0].content);
            if (remoteConfig && remoteConfig.videoId) {
              const isDifferent = remoteConfig.videoId !== currentMusicConfig.videoId;
              currentMusicConfig = remoteConfig;
              localStorage.setItem('lovestory_music_config', JSON.stringify(remoteConfig));
              if (isDifferent) {
                applyMusicConfig(remoteConfig, isPlayingMusic);
              } else {
                const titleEl = document.getElementById('audioTrackTitle') || document.querySelector('.audio-title');
                const artistEl = document.querySelector('.audio-artist');
                const discEl = document.getElementById('audioDisc');
                if (titleEl) titleEl.textContent = remoteConfig.title;
                if (artistEl) artistEl.textContent = remoteConfig.artist;
                if (discEl) discEl.title = `Đang phát nhạc: ${remoteConfig.title} - ${remoteConfig.artist}`;
              }
            }
          } catch (parseErr) {
            console.warn('Lỗi parse JSON config nhạc:', parseErr);
          }
        }
      } catch (err) {
        console.warn('Lỗi load config nhạc từ database:', err);
      }
    }

    function openMusicModal() {
      if (!musicSettingsModal) return;
      musicSettingsModal.style.display = 'flex';
      musicSettingsModal.classList.add('open', 'active');
      musicSettingsModal.setAttribute('aria-hidden', 'false');
      if (musicYoutubeUrlInput) {
        musicYoutubeUrlInput.value = currentMusicConfig.url || '';
        setTimeout(() => musicYoutubeUrlInput.focus(), 100);
      }
      if (musicDetectInfo) musicDetectInfo.style.display = 'none';
      if (musicErrorTip) musicErrorTip.style.display = 'none';
    }

    function closeMusicModal() {
      if (!musicSettingsModal) return;
      musicSettingsModal.classList.remove('open', 'active');
      musicSettingsModal.style.display = 'none';
      musicSettingsModal.setAttribute('aria-hidden', 'true');
    }

    if (audioSettingsBtn) {
      audioSettingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMusicModal();
      });
    }

    if (closeMusicModalBtn) closeMusicModalBtn.addEventListener('click', closeMusicModal);
    if (cancelMusicBtn) cancelMusicBtn.addEventListener('click', closeMusicModal);

    if (musicSettingsModal) {
      musicSettingsModal.addEventListener('click', (e) => {
        if (e.target === musicSettingsModal) closeMusicModal();
      });
    }

    let musicDetectDebounce = null;
    if (musicYoutubeUrlInput) {
      musicYoutubeUrlInput.addEventListener('input', () => {
        if (musicDetectDebounce) clearTimeout(musicDetectDebounce);
        if (musicErrorTip) musicErrorTip.style.display = 'none';

        const raw = musicYoutubeUrlInput.value.trim();
        const vId = extractYouTubeId(raw);
        if (!vId) {
          if (musicDetectInfo) musicDetectInfo.style.display = 'none';
          return;
        }

        musicDetectDebounce = setTimeout(async () => {
          const meta = await fetchYouTubeMetadata(vId, raw);
          if (meta && musicDetectInfo && musicDetectTitle && musicDetectArtist) {
            musicDetectTitle.textContent = meta.title;
            musicDetectArtist.textContent = meta.artist;
            musicDetectInfo.style.display = 'block';
          }
        }, 350);
      });
    }

    if (musicSettingsForm) {
      musicSettingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const raw = (musicYoutubeUrlInput.value || '').trim();
        const vId = extractYouTubeId(raw);

        if (!vId) {
          if (musicErrorTip) {
            musicErrorTip.style.display = 'block';
            if (musicErrorTipText) musicErrorTipText.textContent = '❌ Link YouTube không hợp lệ hoặc không trích xuất được Video ID.';
          }
          return;
        }

        if (saveMusicBtnText) saveMusicBtnText.textContent = 'Đang lưu & phát...';

        try {
          const meta = await fetchYouTubeMetadata(vId, raw);
          const newConfig = {
            url: raw,
            videoId: vId,
            title: meta.title || 'YouTube Track',
            artist: meta.artist || 'YouTube'
          };

          applyMusicConfig(newConfig, true);
          await saveMusicToDatabase(newConfig);

          closeMusicModal();

          if (typeof confetti === 'function') {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#ffd166', '#ff70a6', '#70e4d0', '#c77dff']
            });
          }
        } catch (err) {
          console.error('Lỗi khi đổi nhạc:', err);
          if (musicErrorTip) {
            musicErrorTip.style.display = 'block';
            if (musicErrorTipText) musicErrorTipText.textContent = '❌ Đã có lỗi xảy ra. Hãy thử lại!';
          }
        } finally {
          if (saveMusicBtnText) saveMusicBtnText.textContent = 'Lưu & Phát Ngay ♥';
        }
      });
    }

    // Apply saved music config immediately
    applyMusicConfig(currentMusicConfig, isPlayingMusic);

    // Initial load from Supabase
    loadMusicFromDatabase();
  }

  // Initialize floating audio player UI immediately so it appears on the lock screen
  initFloatingAudioPlayer();

  // Attempt immediate autoplay on page load
  try {
    startMusic();
  } catch (e) {}

  // Autoplay on first touch/click anywhere on page (handles mobile browser policy)
  const autoPlayOnFirstTouch = () => {
    pendingPlay = true;
    try {
      startMusic();
    } catch (e) {}
    window.removeEventListener('pointerdown', autoPlayOnFirstTouch);
    window.removeEventListener('touchstart', autoPlayOnFirstTouch);
    window.removeEventListener('click', autoPlayOnFirstTouch);
    window.removeEventListener('keydown', autoPlayOnFirstTouch);
  };
  window.addEventListener('pointerdown', autoPlayOnFirstTouch, { once: true, passive: true });
  window.addEventListener('touchstart', autoPlayOnFirstTouch, { once: true, passive: true });
  window.addEventListener('click', autoPlayOnFirstTouch, { once: true, passive: true });
  window.addEventListener('keydown', autoPlayOnFirstTouch, { once: true, passive: true });

  // ==========================================
  // 4. INTRO CURTAIN & PASSWORD VERIFICATION
  // ==========================================
  const introScreen = document.getElementById('introScreen');
  const enterBtn = document.getElementById('enterBtn');
  const introSeal = document.getElementById('introSeal');
  const introPasswordSection = document.getElementById('introPasswordSection');
  const introPasswordForm = document.getElementById('introPasswordForm');
  const introPasswordInput = document.getElementById('introPasswordInput');
  const submitPassBtn = document.getElementById('submitPassBtn');
  const passwordErrorMsg = document.getElementById('passwordErrorMsg');

  function dismissIntro(isInstant = false) {
    if (!introScreen) return;
    introScreen.classList.add('hide');
    if (isInstant) {
      introScreen.style.display = 'none';
    }
    document.body.classList.remove('lock-scroll');

    // Force top position on mobile immediately and after keyboard retracts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 300);

    if (!isInstant && typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff70a6', '#ffd166', '#70e4d0', '#c77dff', '#ffffff']
      });
    }

    startMusic();
    setTimeout(() => {
      startMusic();
    }, 350);
  }

  function showPasswordStep(e) {
    if (e && typeof e.preventDefault === 'function' && e.cancelable) {
      e.preventDefault();
    }

    // 1. Immediately toggle UI elements so user sees feedback without any blocking
    const b = document.getElementById('enterBtn');
    const s = document.getElementById('introPasswordSection');
    const inp = document.getElementById('introPasswordInput');

    if (b) b.style.display = 'none';
    if (s) {
      s.style.display = 'block';
    }

    if (inp) {
      try {
        inp.focus();
      } catch (err) {}
      setTimeout(() => {
        try {
          inp.focus();
        } catch (err) {}
      }, 80);
    }

    // 2. Safely attempt to start music
    try {
      startMusic();
    } catch (err) {
      console.warn('startMusic in showPasswordStep failed:', err);
    }
  }

  window.showPasswordStepGlobal = showPasswordStep;
  window.startMusic = startMusic;

  async function handlePasswordCheck(presetPasscode, isAutoLogin = false) {
    const rawVal = (presetPasscode !== undefined && presetPasscode !== null)
      ? String(presetPasscode)
      : (introPasswordInput ? (introPasswordInput.value || '') : '');
    const cleanDigits = rawVal.trim().replace(/[^0-9]/g, '');

    const authConfig = getLocalAuthConfig();
    let isMatch = false;
    let matchedUser = '';
    let matchedRole = '';

    if (cleanDigits === authConfig.em.passcode || cleanDigits === '3108') {
      isMatch = true;
      matchedRole = 'em';
      matchedUser = authConfig.em.title || 'Em ❤️';
    } else if (cleanDigits === authConfig.anh.passcode || cleanDigits === '7612') {
      isMatch = true;
      matchedRole = 'anh';
      matchedUser = authConfig.anh.title || 'Anh ❤️';
    } else {
      let hash = '';
      if (window.crypto && window.crypto.subtle) {
        try {
          hash = await computeSHA256(cleanDigits);
        } catch (e) {}
      }
      if (hash === HASH_3108) {
        isMatch = true;
        matchedRole = 'em';
        matchedUser = authConfig.em.title || 'Em ❤️';
      } else if (hash === HASH_7612) {
        isMatch = true;
        matchedRole = 'anh';
        matchedUser = authConfig.anh.title || 'Anh ❤️';
      }
    }

    if (isMatch) {
      isUnlocked = true;
      currentUserIdentity = matchedUser;
      currentAccountRole = matchedRole;
      try {
        localStorage.setItem('lovestory_passcode', cleanDigits);
        localStorage.setItem('lovestory_user_identity', matchedUser);
        localStorage.setItem('lovestory_account_role', matchedRole);
      } catch (e) {}

      if (tamperObserver) tamperObserver.disconnect();
      removeLockScreenGuards();

      // Immediately dismiss mobile keyboard so it doesn't shift scroll position
      if (introPasswordInput) introPasswordInput.blur();

      // Clear any URL hash so browser does not anchor-jump to middle
      try {
        if (window.location.hash) {
          history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      } catch (e) {}
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Start music directly within this user gesture call stack
      if (!isAutoLogin) {
        startMusic();
      }

      if (passwordErrorMsg) passwordErrorMsg.style.display = 'none';
      if (introPasswordInput) {
        introPasswordInput.classList.remove('pass-error');
        introPasswordInput.classList.add('pass-success');
      }

      if (!isAutoLogin && typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ff70a6', '#ffd166', '#70e4d0', '#ff8fab']
        });
      }

      // 1. Mount protected app template into appRoot
      const template = document.getElementById('protectedAppTemplate');
      const appRoot = document.getElementById('appRoot');
      if (template && appRoot) {
        const clone = template.content.cloneNode(true);
        appRoot.appendChild(clone);
        template.remove();
      }

      // Re-anchor to top after DOM insertion
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 2. Decrypt love letter via AES-GCM (Dùng key gốc 3108 để giải mã cho cả 2 user)
      const FALLBACK_LETTER = `Người ta thường nói, duyên số là do trời, nhưng nếu vậy thì vũ trụ đã ưu ái anh quá nhiều. Giữa thế giới hàng tỷ người, gặp nhau chỉ có thể là duyên hoặc nợ. Có duyên thì ở lại, còn nếu nợ thì anh xin được mang theo cả đời ...

Anh chưa bao giờ phủ nhận rằng, mình là kẻ phản diện. Anh từng vụng về với những điều đáng lẽ phải dịu dàng, từng im lặng ở những lúc cần một lời nói, và đôi khi mải mê với thế giới của mình.

Nhưng rồi em đến. Anh không biết từ khoảnh khắc nào anh bắt đầu muốn được nghe em nói, muốn được nhìn em cười, muốn cái cảm giác bình yên khi ở cạnh em.

Anh không hứa rằng những ngày phía trước sẽ luôn dễ dàng. Anh chỉ biết là cho dù nắng hay mưa, anh vẫn sẽ ở đó. Bởi sau cùng, tình yêu đẹp nhất không phải là cùng nhau đứng giữa những ngày rực rỡ, mà là khi ánh hoàng hôn tắt, ta vẫn nhận ra nhau — và vẫn muốn cùng nhau đi tiếp.

Với anh, anh muốn đi tiếp cùng với em.`;

      let plainLetter = '';
      try {
        if (window.crypto && window.crypto.subtle) {
          plainLetter = await decryptText(
            COUPLE_DATA.letterBodyCipher.data,
            COUPLE_DATA.letterBodyCipher.iv,
            '3108'
          );
        } else {
          plainLetter = FALLBACK_LETTER;
        }
      } catch (err) {
        console.warn('Không thể giải mã thư tình qua WebCrypto, dùng bản sao lưu:', err);
        plainLetter = FALLBACK_LETTER;
      }

      // 3. Initialize all interactive features and load Supabase data
      initMainApp(plainLetter);

      // 4. Animate and dismiss curtain
      if (isAutoLogin) {
        dismissIntro(true);
      } else {
        setTimeout(() => {
          dismissIntro(false);
        }, 400);
      }

    } else {
      if (isAutoLogin) {
        try {
          localStorage.removeItem('lovestory_passcode');
          localStorage.removeItem('lovestory_user_identity');
        } catch (e) {}
        return;
      }

      // Wrong password
      if (passwordErrorMsg) {
        passwordErrorMsg.style.display = 'block';
      }
      if (introPasswordInput) {
        introPasswordInput.classList.remove('pass-success');
        introPasswordInput.classList.add('pass-error');
        introPasswordInput.value = '';
        introPasswordInput.focus();
      }

      const card = document.querySelector('.intro-card');
      if (card) {
        card.classList.remove('shake-anim');
        void card.offsetWidth;
        card.classList.add('shake-anim');
      }
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', showPasswordStep);
  }
  if (introSeal) {
    introSeal.addEventListener('click', showPasswordStep);
  }

  if (introPasswordForm) {
    introPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handlePasswordCheck();
    });
  }

  if (submitPassBtn) {
    submitPassBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handlePasswordCheck();
    });
  }

  if (introPasswordInput) {
    introPasswordInput.addEventListener('input', () => {
      if (passwordErrorMsg) passwordErrorMsg.style.display = 'none';
      introPasswordInput.classList.remove('pass-error');

      const digits = introPasswordInput.value.replace(/[^0-9]/g, '');
      if (digits.length === 4) {
        handlePasswordCheck();
      }
    });
  }

  // Tự động đăng nhập nếu đã lưu mật mã hợp lệ trong localStorage
  try {
    const savedPasscode = localStorage.getItem('lovestory_passcode');
    const authCfg = getLocalAuthConfig();
    if (savedPasscode && (
      savedPasscode === authCfg.em.passcode ||
      savedPasscode === authCfg.anh.passcode ||
      savedPasscode === '3108' ||
      savedPasscode === '7612'
    )) {
      handlePasswordCheck(savedPasscode, true);
    }
  } catch (err) {
    console.warn('Lỗi đọc passcode từ localStorage:', err);
  }

  // ==========================================
  // 5. AMBIENT GOLDEN FIREFLIES & HEARTS CANVAS (BACKGROUND)
  // ==========================================
  // Runs immediately on page load so ambient atmosphere is visible behind intro card
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];
    const PARTICLE_COUNT = 38;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 3 + 1.2;
        this.speedY = Math.random() * 0.7 + 0.25;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.55 + 0.25;
        this.wobble = Math.random() * Math.PI * 2;
        this.type = Math.random() > 0.4 ? 'gold' : 'heart';
        this.isHeart = this.type === 'heart';
      }

      getColor() {
        return this.isHeart ? '255, 112, 166' : '255, 209, 102';
      }

      update() {
        this.y -= this.speedY;
        this.wobble += 0.02;
        this.x += Math.sin(this.wobble) * 0.5 + this.speedX;

        if (this.y < -30 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        const color = this.getColor();
        ctx.save();
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${color}, 0.7)`;

        if (this.isHeart) {
          drawMiniHeart(ctx, this.x, this.y, this.size * 2.5);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function drawMiniHeart(c, x, y, size) {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
      c.fill();
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new Particle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================
  // 6. CUSTOM MOUSE CURSOR TRAIL
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = -100, mouseY = -100;
  let glowX = -100, glowY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  });

  function renderCursorGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    if (cursorGlow) {
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    }
    requestAnimationFrame(renderCursorGlow);
  }
  renderCursorGlow();

  // ==========================================
  // CLIENT-SIDE IMAGE COMPRESSION UTILITY (OPTIMIZED FOR MOBILE PHONES & HIGH-RES CAMERAS)
  // Reduces 5MB-15MB camera photos (HEIC/JPEG/PNG) down to ~150KB (1200px max)
  // ==========================================
  function compressImageFile(file, maxDimension = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('Không có tệp ảnh nào được chọn.'));
      }

      // Nếu không phải ảnh, đọc theo dạng thông thường
      if (!file.type || !file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        try {
          let { width, height } = img;

          // Tính toán tỉ lệ co dãn phù hợp
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas 2D context không khả dụng.');
          }

          // Nền trắng cho ảnh trong suốt khi nén JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);

          // Vẽ ảnh đã rescale
          ctx.drawImage(img, 0, 0, width, height);

          // Chuyển sang DataURL định dạng image/jpeg
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          URL.revokeObjectURL(objectUrl);
          resolve(compressedDataUrl);
        } catch (err) {
          URL.revokeObjectURL(objectUrl);
          console.warn('Lỗi canvas resize, fallback FileReader:', err);
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        }
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(objectUrl);
        console.warn('Lỗi load Image object, fallback FileReader:', err);
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      };

      img.src = objectUrl;
    });
  }

  // ==========================================
  // 7. PROTECTED APPLICATION INITIALIZER
  // Called ONLY after password verification & DOM mounting
  // ==========================================
  function initMainApp(plainLetter) {

    // --- USER IDENTITY SETUP (Em ❤️ / Anh ❤️) & PROFILE POPUP ---
    const navUserName = document.getElementById('navUserName');
    if (navUserName) navUserName.textContent = currentUserIdentity || 'Anh ❤️';

    const userIdentityModal = document.getElementById('userIdentityModal');
    const closeUserIdentityModalBtn = document.getElementById('closeUserIdentityModalBtn');
    const modalActiveUserName = document.getElementById('modalActiveUserName');
    const modalUserEmoji = document.getElementById('modalUserEmoji');
    const customIdentityInput = document.getElementById('customIdentityInput');
    const saveIdentityBtn = document.getElementById('saveIdentityBtn');
    const identitySaveSuccessTip = document.getElementById('identitySaveSuccessTip');
    const newPasscodeInput = document.getElementById('newPasscodeInput');
    const savePasscodeBtn = document.getElementById('savePasscodeBtn');
    const passcodeSaveSuccessTip = document.getElementById('passcodeSaveSuccessTip');
    const passcodeSaveErrorTip = document.getElementById('passcodeSaveErrorTip');
    const modalLogoutBtn = document.getElementById('modalLogoutBtn');
    const nameChips = document.querySelectorAll('.btn-name-chip');

    function openUserIdentityModal() {
      if (!userIdentityModal) return;
      if (modalActiveUserName) modalActiveUserName.textContent = currentUserIdentity || 'Anh ❤️';
      if (modalUserEmoji) modalUserEmoji.textContent = (currentAccountRole === 'em') ? '🌸' : '❤️';
      if (customIdentityInput) customIdentityInput.value = currentUserIdentity || '';
      if (newPasscodeInput) newPasscodeInput.value = '';
      if (identitySaveSuccessTip) identitySaveSuccessTip.style.display = 'none';
      if (passcodeSaveSuccessTip) passcodeSaveSuccessTip.style.display = 'none';
      if (passcodeSaveErrorTip) passcodeSaveErrorTip.style.display = 'none';

      userIdentityModal.style.display = 'flex';
      userIdentityModal.classList.add('open', 'active');
      userIdentityModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeUserIdentityModal() {
      if (!userIdentityModal) return;
      userIdentityModal.classList.remove('open', 'active');
      userIdentityModal.style.display = 'none';
      userIdentityModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (closeUserIdentityModalBtn) {
      closeUserIdentityModalBtn.addEventListener('click', closeUserIdentityModal);
    }

    if (userIdentityModal) {
      userIdentityModal.addEventListener('click', (e) => {
        if (e.target === userIdentityModal) closeUserIdentityModal();
      });
    }

    window.__openUserIdentityModal = openUserIdentityModal;

    const navUserIdentityBadge = document.getElementById('navUserIdentityBadge');
    if (navUserIdentityBadge) {
      navUserIdentityBadge.setAttribute('title', `Đang đăng nhập: ${currentUserIdentity || 'Anh ❤️'} (Nhấp để đổi danh xưng, đổi mật mã, đăng xuất)`);
      navUserIdentityBadge.onclick = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        openUserIdentityModal();
      };
      navUserIdentityBadge.addEventListener('click', (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        openUserIdentityModal();
      });
    }

    // Name chips click
    nameChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-name');
        if (customIdentityInput && val) {
          customIdentityInput.value = val;
        }
      });
    });

    // Save identity / display name
    if (saveIdentityBtn) {
      saveIdentityBtn.addEventListener('click', async () => {
        const newTitle = (customIdentityInput ? customIdentityInput.value : '').trim();
        if (!newTitle) {
          alert('Vui lòng nhập danh xưng bạn muốn nhé!');
          if (customIdentityInput) customIdentityInput.focus();
          return;
        }

        currentUserIdentity = newTitle;
        try {
          localStorage.setItem('lovestory_user_identity', newTitle);
        } catch (e) {}

        const authCfg = getLocalAuthConfig();
        const role = currentAccountRole || (currentUserIdentity.includes('Em') ? 'em' : 'anh');
        if (!authCfg[role]) authCfg[role] = {};
        authCfg[role].title = newTitle;
        syncAuthConfigToDatabase(authCfg);

        // Update UI
        if (navUserName) navUserName.textContent = newTitle;
        if (modalActiveUserName) modalActiveUserName.textContent = newTitle;
        const noteSender = document.getElementById('noteSenderName');
        if (noteSender) noteSender.textContent = newTitle;

        if (identitySaveSuccessTip) {
          identitySaveSuccessTip.style.display = 'block';
          setTimeout(() => {
            if (identitySaveSuccessTip) identitySaveSuccessTip.style.display = 'none';
          }, 3500);
        }

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#ff70a6', '#ffd166', '#70e4d0']
          });
        }
      });
    }

    // Save new passcode
    if (savePasscodeBtn) {
      savePasscodeBtn.addEventListener('click', async () => {
        if (passcodeSaveErrorTip) passcodeSaveErrorTip.style.display = 'none';
        if (passcodeSaveSuccessTip) passcodeSaveSuccessTip.style.display = 'none';

        const rawCode = (newPasscodeInput ? newPasscodeInput.value : '').trim();
        const cleanCode = rawCode.replace(/[^0-9]/g, '');

        if (cleanCode.length !== 4) {
          if (passcodeSaveErrorTip) passcodeSaveErrorTip.style.display = 'block';
          if (newPasscodeInput) newPasscodeInput.focus();
          return;
        }

        try {
          localStorage.setItem('lovestory_passcode', cleanCode);
        } catch (e) {}

        const authCfg = getLocalAuthConfig();
        const role = currentAccountRole || (currentUserIdentity.includes('Em') ? 'em' : 'anh');
        if (!authCfg[role]) authCfg[role] = {};
        authCfg[role].passcode = cleanCode;
        syncAuthConfigToDatabase(authCfg);

        if (passcodeSaveSuccessTip) {
          passcodeSaveSuccessTip.style.display = 'block';
          setTimeout(() => {
            if (passcodeSaveSuccessTip) passcodeSaveSuccessTip.style.display = 'none';
          }, 3500);
        }

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#ffd166', '#ff70a6', '#70e4d0']
          });
        }
      });
    }

    // Modal Logout Button
    if (modalLogoutBtn) {
      modalLogoutBtn.addEventListener('click', () => {
        if (confirm(`Bạn đang ở phiên của ${currentUserIdentity || 'Anh ❤️'}.\n\nBạn có chắc chắn muốn đăng xuất và khóa lại trang web không?`)) {
          try {
            localStorage.removeItem('lovestory_passcode');
            localStorage.removeItem('lovestory_user_identity');
            localStorage.removeItem('lovestory_account_role');
          } catch (e) {}
          window.location.reload();
        }
      });
    }

    const noteSenderName = document.getElementById('noteSenderName');
    if (noteSenderName) noteSenderName.textContent = currentUserIdentity || 'Anh ❤️';

    // --- A. APPLY STORY & DECRYPTED LETTER TO DOM ---
    const brandCoupleNames = document.getElementById('brandCoupleNames');
    if (brandCoupleNames) brandCoupleNames.textContent = 'LoveStory';

    const heroHerName = document.getElementById('heroHerName');
    if (heroHerName) heroHerName.textContent = COUPLE_DATA.herName;

    const letterDateDisplay = document.getElementById('letterDateDisplay');
    if (letterDateDisplay) letterDateDisplay.textContent = COUPLE_DATA.letterDate;

    const letterDearText = document.getElementById('letterDearText');
    if (letterDearText) letterDearText.textContent = COUPLE_DATA.letterSalutation;

    const letterBodyContent = document.getElementById('letterBodyContent');
    if (letterBodyContent && plainLetter) {
      const paragraphs = plainLetter.split('\n\n').filter(p => p.trim());
      letterBodyContent.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
    }

    const letterSignature = document.getElementById('letterSignature');
    if (letterSignature) letterSignature.textContent = COUPLE_DATA.letterSignature;

    const footerNamesDisplay = document.getElementById('footerNamesDisplay');
    if (footerNamesDisplay) {
      footerNamesDisplay.textContent = 'Thân Hiếu & Khánh Linh';
    }

    const counterStartDateLabel = document.getElementById('counterStartDateLabel');
    if (counterStartDateLabel) {
      counterStartDateLabel.textContent = `Tính từ ngày 31 tháng 08, 2026 ✦ Từng giây từng phút đều trân quý`;
    }

    // --- NOTIFICATION PERMISSION & HERO HEADER BADGE ---
    const heroHeaderBadge = document.getElementById('heroHeaderBadge');
    const heroBadgeDot = document.getElementById('heroBadgeDot');
    const heroBadgeBell = document.getElementById('heroBadgeBell');

    function updateBadgeNotificationState() {
      if (!heroHeaderBadge) return;
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        heroHeaderBadge.classList.add('notif-enabled');
        heroHeaderBadge.setAttribute('title', 'Thông báo đang BẬT 🔔 (Nhấp để gửi thông báo thử nghiệm)');
        if (heroBadgeBell) heroBadgeBell.textContent = '🔔';
      } else if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'denied') {
        heroHeaderBadge.classList.remove('notif-enabled');
        heroHeaderBadge.setAttribute('title', 'Thông báo đang bị chặn. Hãy bấm vào biểu tượng cài đặt trình duyệt để cho phép.');
        if (heroBadgeBell) heroBadgeBell.textContent = '🔕';
      } else {
        heroHeaderBadge.classList.remove('notif-enabled');
        heroHeaderBadge.setAttribute('title', 'Nhấp để bật thông báo khi có ảnh kỷ niệm, lời nhắn hoặc thảo luận mới 🔔');
        if (heroBadgeBell) heroBadgeBell.textContent = '🔔';
      }
    }

    updateBadgeNotificationState();

    if (heroHeaderBadge) {
      heroHeaderBadge.addEventListener('click', async () => {
        if (!('Notification' in window)) {
          showAppNotification({
            title: 'Thông báo LoveStory',
            body: 'Trình duyệt này không hỗ trợ Web Notification, nhưng bạn vẫn sẽ nhận được thông báo trực tiếp trên trang web khi có cập nhật mới! 💖',
            icon: '🔔'
          });
          return;
        }

        if (Notification.permission === 'granted') {
          syncWebPushSubscription().catch(() => {});
          showAppNotification({
            title: 'LoveStory 💕 Thông báo đang hoạt động!',
            body: 'Bạn sẽ nhận được thông báo tức thì khi có ảnh kỷ niệm, lời nhắn hoặc thảo luận mới từ người thương 💌',
            icon: 'assets/images/IMG_1373.JPG'
          });
          return;
        }

        if (Notification.permission === 'denied') {
          showAppNotification({
            title: 'Quyền thông báo đang bị chặn',
            body: 'Bạn vui lòng nhấp vào biểu tượng ổ khóa / cài đặt trang web trên trình duyệt để cho phép thông báo nhé! 🔔',
            icon: '🔕'
          });
          return;
        }

        try {
          const perm = await Notification.requestPermission();
          updateBadgeNotificationState();

          if (perm === 'granted') {
            syncWebPushSubscription().catch(() => {});
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 35,
                spread: 60,
                origin: { y: 0.3 },
                colors: ['#ff70a6', '#ffd166', '#70e4d0', '#ff8fab']
              });
            }
            showAppNotification({
              title: 'LoveStory 💕 Đã bật thông báo!',
              body: 'Tuyệt vời! Từ giờ bạn sẽ nhận được thông báo ngay khi có ảnh kỷ niệm, lời nhắn hoặc thảo luận mới từ người thương.',
              icon: 'assets/images/IMG_1373.JPG'
            });
          } else {
            showAppNotification({
              title: 'Chưa cấp quyền thông báo',
              body: 'Bạn có thể bấm lại vào huy hiệu này bất kỳ lúc nào để bật lại thông báo nhé! 💌',
              icon: '🔔'
            });
          }
        } catch (err) {
          console.warn('Lỗi yêu cầu quyền thông báo:', err);
        }
      });

      heroHeaderBadge.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          heroHeaderBadge.click();
        }
      });
    }

    // --- B. LIVE LOVE COUNTER ---
    const cntDays = document.getElementById('cntDays');
    const cntHours = document.getElementById('cntHours');
    const cntMinutes = document.getElementById('cntMinutes');
    const cntSeconds = document.getElementById('cntSeconds');

    function updateLoveCounter() {
      const start = new Date(COUPLE_DATA.startDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (cntDays) cntDays.textContent = String(days).padStart(2, '0');
      if (cntHours) cntHours.textContent = String(hours).padStart(2, '0');
      if (cntMinutes) cntMinutes.textContent = String(minutes).padStart(2, '0');
      if (cntSeconds) cntSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);

    // --- D. INTERACTIVE LOVE ENVELOPE ---
    const envelope = document.getElementById('envelope');
    const envelopeClosedDecor = document.getElementById('envelopeClosedDecor');
    const sealBtn = document.getElementById('sealBtn');
    const toggleLetterBtn = document.getElementById('toggleLetterBtn');

    function toggleLetter() {
      if (!envelope) return;
      envelope.classList.toggle('open');
      envelope.classList.toggle('is-open');
      const isOpen = envelope.classList.contains('open') || envelope.classList.contains('is-open');

      if (toggleLetterBtn) {
        const btnSpan = toggleLetterBtn.querySelector('span');
        if (btnSpan) {
          btnSpan.textContent = isOpen ? 'Khép Lại Bức Thư 💌' : 'Chạm Vào Phong Thư Để Đọc 💌';
        }
      }

      if (isOpen && typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#ff70a6', '#ffd166', '#70e4d0', '#c77dff', '#ff8fab', '#18181b']
        });
      }
    }

    if (sealBtn) {
      sealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLetter();
      });
    }
    if (envelopeClosedDecor) {
      envelopeClosedDecor.addEventListener('click', (e) => {
        toggleLetter();
      });
    }
    if (toggleLetterBtn) {
      toggleLetterBtn.addEventListener('click', (e) => {
        toggleLetter();
      });
    }

    const navCtaBtn = document.querySelector('.nav-cta-btn');
    if (navCtaBtn) {
      navCtaBtn.addEventListener('click', () => {
        if (envelope && !envelope.classList.contains('open') && !envelope.classList.contains('is-open')) {
          setTimeout(toggleLetter, 400);
        }
      });
    }

    // --- E. MEMORIES CRUD WITH SUPABASE ---
    const FALLBACK_MEMORIES = [
      {
        id: 'default-1',
        caption: 'Chuyến đi biển đầu tiên — ngọt ngào như vị nước dừa tươi.',
        date: '30 - 31.08.2026',
        image_url: 'assets/images/polaroid-1.jpg',
        order_index: 1
      },
      {
        id: 'default-2',
        caption: 'Nụ cười xinh xắn làm anh "đổ gục" ngay từ cái nhìn đầu tiên.',
        date: 'Sweet Smile ✦ 12.08',
        image_url: 'assets/images/polaroid-2.jpg',
        order_index: 2
      },
      {
        id: 'default-3',
        caption: 'Bàn tay đan chặt ấm áp — Luôn là điểm tựa an toàn của em.',
        date: 'Always Together',
        image_url: 'assets/images/polaroid-3.jpg',
        order_index: 3
      },
      {
        id: 'default-4',
        caption: 'Những đêm deeptalk buôn chuyện mệt rồi ngủ quên lúc nào không hay.',
        date: 'Midnight Talk',
        image_url: 'assets/images/polaroid-4.jpg',
        order_index: 4
      },
      {
        id: 'default-5',
        caption: 'Chị người yêu 1999 nhưng lúc nào cũng nhí nhảnh, đáng yêu nhất trần đời.',
        date: 'My Baby Girl',
        image_url: 'assets/images/polaroid-5.jpg',
        order_index: 5
      },
      {
        id: 'default-6',
        caption: 'Công chúa của anh — Ngày 31.08 định mệnh và mãi mãi về sau.',
        date: 'Since 31.08.2026',
        image_url: 'assets/images/polaroid-6.jpg',
        order_index: 6
      }
    ];

    let currentMemories = [];
    const MEMORIES_STORAGE_KEY = 'lovestory_memories_v1';

    function loadLocalMemories() {
      try {
        const saved = localStorage.getItem(MEMORIES_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Lỗi đọc local memories:', e);
      }
      return [...FALLBACK_MEMORIES];
    }

    function saveLocalMemories(memories) {
      try {
        localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(memories));
      } catch (e) {
        console.warn('Lỗi lưu local memories (Quota):', e);
        try {
          // Khi bộ nhớ 5MB của trình duyệt bị đầy, cắt bớt và giữ 6 kỷ niệm gần nhất
          const trimmed = (memories || []).slice(-6);
          localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(trimmed));
        } catch (e2) {
          console.warn('Không thể lưu local memories ngay cả khi cắt gọn:', e2);
        }
      }
    }

    const polaroidGrid = document.getElementById('polaroidGrid');
    const openAddMemoryBtn = document.getElementById('openAddMemoryBtn');
    const memoryModal = document.getElementById('memoryModal');
    const closeMemoryModalBtn = document.getElementById('closeMemoryModalBtn');
    const cancelMemoryBtn = document.getElementById('cancelMemoryBtn');
    const memoryForm = document.getElementById('memoryForm');
    const memoryModalTitle = document.getElementById('memoryModalTitle');
    const saveMemoryBtnText = document.getElementById('saveMemoryBtnText');

    const viewAllMemoriesWrap = document.getElementById('viewAllMemoriesWrap');
    const viewAllMemoriesBtn = document.getElementById('viewAllMemoriesBtn');
    const memoriesTotalCount = document.getElementById('memoriesTotalCount');
    const allMemoriesModal = document.getElementById('allMemoriesModal');
    const allMemoriesModalCount = document.getElementById('allMemoriesModalCount');
    const allMemoriesGrid = document.getElementById('allMemoriesGrid');
    const closeAllMemoriesModalBtn = document.getElementById('closeAllMemoriesModalBtn');

    const memoryEditId = document.getElementById('memoryEditId');
    const memoryCaptionInput = document.getElementById('memoryCaptionInput');
    const memoryDateInput = document.getElementById('memoryDateInput');
    const memoryImageUrlInput = document.getElementById('memoryImageUrlInput');
    const memoryFileInput = document.getElementById('memoryFileInput');
    const memoryFileNameHint = document.getElementById('memoryFileNameHint');
    const memoryPreviewWrap = document.getElementById('memoryPreviewWrap');
    const memoryPreviewImg = document.getElementById('memoryPreviewImg');

    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

    async function fetchMemories() {
      if (!polaroidGrid) return;

      if (!supabaseClient) {
        console.warn('Supabase client chưa khởi tạo, hiển thị dữ liệu từ local storage.');
        currentMemories = loadLocalMemories();
        renderMemories(currentMemories);
        renderAllMemoriesModal();
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('memories')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Lỗi khi truy vấn memories từ Supabase:', error);
          currentMemories = loadLocalMemories();
        } else if (data && data.length > 0) {
          currentMemories = data;
          saveLocalMemories(currentMemories);
        } else {
          const local = loadLocalMemories();
          currentMemories = local.length > 0 ? local : [];
        }
      } catch (err) {
        console.error('Lỗi kết nối Supabase:', err);
        currentMemories = loadLocalMemories();
      }

      renderMemories(currentMemories);
      renderAllMemoriesModal();
    }

    function createPolaroidCardElement(mem, index) {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.setAttribute('data-id', mem.id);

      const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5];
      const rot = rotations[index % rotations.length];
      card.style.setProperty('--rot', `${rot}deg`);

      card.innerHTML = `
        <div class="polaroid-pin">📍</div>
        
        <div class="polaroid-action-bar">
          <button type="button" class="btn-card-action polaroid-btn-action btn-edit" title="Chỉnh sửa kỷ niệm này" data-id="${mem.id}">
            <span>✏️</span>
          </button>
          <button type="button" class="btn-card-action polaroid-btn-action btn-delete" title="Xóa kỷ niệm này" data-id="${mem.id}">
            <span>🗑️</span>
          </button>
        </div>

        <div class="polaroid-img-wrap" title="Nhấp để phóng to ảnh">
          <img src="${escapeHTML(mem.image_url)}" alt="${escapeHTML(mem.caption)}" loading="lazy">
          <div class="polaroid-zoom-hint">🔍 Phóng to</div>
        </div>

        <div class="polaroid-caption">
          <p class="polaroid-text">${escapeHTML(mem.caption)}</p>
          <span class="polaroid-date">${escapeHTML(mem.date || '')}</span>
        </div>
      `;

      const imgWrap = card.querySelector('.polaroid-img-wrap');
      if (imgWrap) {
        imgWrap.addEventListener('click', () => {
          openLightbox(mem.image_url, mem.caption, mem.date);
        });
      }

      const editBtn = card.querySelector('.btn-edit');
      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openEditModal(mem);
        });
      }

      const deleteBtn = card.querySelector('.btn-delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          await handleDeleteMemory(mem.id);
        });
      }

      return card;
    }

    function renderMemories(memories) {
      if (!polaroidGrid) return;
      polaroidGrid.innerHTML = '';

      const total = (memories && memories.length) || 0;
      if (memoriesTotalCount) memoriesTotalCount.textContent = total;
      if (allMemoriesModalCount) allMemoriesModalCount.textContent = total;
      if (viewAllMemoriesWrap) {
        viewAllMemoriesWrap.style.display = total > 0 ? 'flex' : 'none';
      }

      if (!memories || memories.length === 0) {
        polaroidGrid.innerHTML = `
          <div class="empty-memories-notice">
            <span class="empty-icon">📸</span>
            <p>Chưa có kỷ niệm nào trong album. Hãy nhấn nút "+ Thêm Kỷ Niệm Mới" để lưu giữ khoảnh khắc ngọt ngào nhé!</p>
          </div>
        `;
        return;
      }

      // Main page strictly displays at most 6 latest memories
      const displayMems = memories.slice(0, 6);
      displayMems.forEach((mem, index) => {
        polaroidGrid.appendChild(createPolaroidCardElement(mem, index));
      });

      initPolaroidTilt(polaroidGrid);
    }

    function renderAllMemoriesModal() {
      if (!allMemoriesGrid) return;
      allMemoriesGrid.innerHTML = '';

      const total = (currentMemories && currentMemories.length) || 0;
      if (allMemoriesModalCount) allMemoriesModalCount.textContent = total;

      if (!currentMemories || currentMemories.length === 0) {
        allMemoriesGrid.innerHTML = `
          <div class="empty-memories-notice" style="grid-column: 1 / -1; padding: 40px 20px;">
            <span class="empty-icon">📸</span>
            <p>Chưa có kỷ niệm nào trong album. Hãy nhấn nút "+ Thêm Kỷ Niệm Mới" để bắt đầu nhé!</p>
          </div>
        `;
        return;
      }

      currentMemories.forEach((mem, index) => {
        allMemoriesGrid.appendChild(createPolaroidCardElement(mem, index));
      });

      initPolaroidTilt(allMemoriesGrid);
    }

    function openAllMemoriesModal() {
      if (!allMemoriesModal) return;
      renderAllMemoriesModal();
      allMemoriesModal.style.display = 'flex';
      allMemoriesModal.classList.add('open', 'active');
      allMemoriesModal.setAttribute('aria-hidden', 'false');
    }

    function closeAllMemoriesModal() {
      if (!allMemoriesModal) return;
      allMemoriesModal.classList.remove('open', 'active');
      allMemoriesModal.style.display = 'none';
      allMemoriesModal.setAttribute('aria-hidden', 'true');
    }

    function initPolaroidTilt(container = document) {
      const cards = container.querySelectorAll('.polaroid-card');
      cards.forEach(card => {
        const actionBar = card.querySelector('.polaroid-action-bar');
        if (actionBar) {
          actionBar.addEventListener('mousemove', (e) => e.stopPropagation());
          actionBar.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.04) rotate(0deg)';
          });
        }

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = -(y / rect.height) * 12;
          const rotateY = (x / rect.width) * 12;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    function openAddModal() {
      if (!memoryModal) return;
      if (memoryModalTitle) memoryModalTitle.textContent = 'Thêm Kỷ Niệm Ngọt Ngào';
      if (saveMemoryBtnText) saveMemoryBtnText.textContent = 'Lưu Kỷ Niệm';
      if (memoryEditId) memoryEditId.value = '';
      if (memoryCaptionInput) memoryCaptionInput.value = '';
      if (memoryDateInput) memoryDateInput.value = '';
      if (memoryImageUrlInput) memoryImageUrlInput.value = '';
      if (memoryFileInput) memoryFileInput.value = '';
      if (memoryFileNameHint) memoryFileNameHint.textContent = '';
      if (memoryPreviewWrap) memoryPreviewWrap.style.display = 'none';

      memoryModal.classList.add('open', 'active');
      memoryModal.setAttribute('aria-hidden', 'false');
      if (memoryCaptionInput) memoryCaptionInput.focus();
    }

    function openEditModal(mem) {
      if (!memoryModal) return;
      if (memoryModalTitle) memoryModalTitle.textContent = 'Chỉnh Sửa Kỷ Niệm';
      if (saveMemoryBtnText) saveMemoryBtnText.textContent = 'Cập Nhật Kỷ Niệm';
      if (memoryEditId) memoryEditId.value = mem.id;
      if (memoryCaptionInput) memoryCaptionInput.value = mem.caption || '';
      if (memoryDateInput) memoryDateInput.value = mem.date || '';
      if (memoryImageUrlInput) memoryImageUrlInput.value = mem.image_url || '';
      if (memoryFileInput) memoryFileInput.value = '';
      if (memoryFileNameHint) memoryFileNameHint.textContent = '';

      if (memoryPreviewWrap && memoryPreviewImg && mem.image_url) {
        memoryPreviewImg.src = mem.image_url;
        memoryPreviewWrap.style.display = 'block';
      }

      memoryModal.classList.add('open', 'active');
      memoryModal.setAttribute('aria-hidden', 'false');
      if (memoryCaptionInput) memoryCaptionInput.focus();
    }

    function closeMemoryModal() {
      if (memoryModal) {
        memoryModal.classList.remove('open', 'active');
        memoryModal.setAttribute('aria-hidden', 'true');
      }
    }

    if (openAddMemoryBtn) openAddMemoryBtn.addEventListener('click', openAddModal);
    if (closeMemoryModalBtn) closeMemoryModalBtn.addEventListener('click', closeMemoryModal);
    if (cancelMemoryBtn) cancelMemoryBtn.addEventListener('click', closeMemoryModal);
    if (memoryModal) {
      memoryModal.addEventListener('click', (e) => {
        if (e.target === memoryModal) closeMemoryModal();
      });
    }

    if (viewAllMemoriesBtn) viewAllMemoriesBtn.addEventListener('click', openAllMemoriesModal);
    if (closeAllMemoriesModalBtn) closeAllMemoriesModalBtn.addEventListener('click', closeAllMemoriesModal);
    if (allMemoriesModal) {
      allMemoriesModal.addEventListener('click', (e) => {
        if (e.target === allMemoriesModal) closeAllMemoriesModal();
      });
    }

    if (memoryImageUrlInput) {
      memoryImageUrlInput.addEventListener('input', (e) => {
        const url = e.target.value.trim();
        if (url && memoryPreviewImg && memoryPreviewWrap) {
          memoryPreviewImg.src = url;
          memoryPreviewWrap.style.display = 'block';
        }
      });
    }

    if (memoryFileInput) {
      memoryFileInput.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (memoryFileNameHint) {
          memoryFileNameHint.textContent = `⏳ Đang xử lý & tối ưu ảnh...`;
          memoryFileNameHint.style.color = 'var(--pink-deep)';
        }

        try {
          const compressedDataUrl = await compressImageFile(file, 1200, 0.82);

          if (memoryImageUrlInput) {
            memoryImageUrlInput.value = compressedDataUrl;
          }

          if (memoryPreviewImg && memoryPreviewWrap) {
            memoryPreviewImg.src = compressedDataUrl;
            memoryPreviewWrap.style.display = 'block';
          }

          const approxKb = Math.round((compressedDataUrl.length * 0.75) / 1024);
          if (memoryFileNameHint) {
            memoryFileNameHint.textContent = `✓ Đã tối ưu: ${file.name} (~${approxKb} KB)`;
            memoryFileNameHint.style.color = '#16a34a';
          }
        } catch (err) {
          console.error('Lỗi khi nén ảnh:', err);
          if (memoryFileNameHint) {
            memoryFileNameHint.textContent = `⚠️ Lỗi xử lý ảnh: ${file.name}`;
            memoryFileNameHint.style.color = '#dc2626';
          }
          alert('Không thể tối ưu hóa tệp ảnh này. Bạn vui lòng thử chọn ảnh khác nhé!');
        }
      });
    }

    if (memoryForm) {
      memoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const editId = (memoryEditId && memoryEditId.value) || '';
        const caption = (memoryCaptionInput && memoryCaptionInput.value.trim()) || '';
        const date = (memoryDateInput && memoryDateInput.value.trim()) || '';
        const imageUrl = (memoryImageUrlInput && memoryImageUrlInput.value.trim()) || '';

        if (!caption) {
          alert('Vui lòng nhập lời tựa hoặc chú thích cho kỷ niệm nhé!');
          if (memoryCaptionInput) memoryCaptionInput.focus();
          return;
        }

        if (!imageUrl) {
          alert('Vui lòng nhập đường dẫn URL ảnh hoặc chọn file ảnh từ máy của bạn!');
          if (memoryImageUrlInput) memoryImageUrlInput.focus();
          return;
        }

        // Tự động đóng bàn phím trên điện thoại
        if (memoryCaptionInput) memoryCaptionInput.blur();
        if (memoryDateInput) memoryDateInput.blur();
        if (memoryImageUrlInput) memoryImageUrlInput.blur();

        const submitBtn = document.getElementById('saveMemoryBtn');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Đang lưu... ⏳</span>';
        }

        try {
          if (editId) {
            const isSupabaseId = supabaseClient && !String(editId).startsWith('default-') && !String(editId).startsWith('local-');

            if (isSupabaseId) {
              const { error } = await supabaseClient
                .from('memories')
                .update({
                  caption: caption,
                  date: date,
                  image_url: imageUrl
                })
                .eq('id', editId);

              if (error) throw error;
            } else if (supabaseClient) {
              const { error } = await supabaseClient
                .from('memories')
                .insert([{
                  caption: caption,
                  date: date,
                  image_url: imageUrl
                }]);

              if (error) throw error;
            }

            const targetIdx = currentMemories.findIndex(m => String(m.id) === String(editId));
            if (targetIdx !== -1) {
              currentMemories[targetIdx] = {
                ...currentMemories[targetIdx],
                caption,
                date,
                image_url: imageUrl
              };
            }
            saveLocalMemories(currentMemories);
          } else {
            let savedToRemote = false;
            let newRecord = null;

            if (supabaseClient) {
              try {
                const { data, error } = await supabaseClient
                  .from('memories')
                  .insert([{
                    caption: caption,
                    date: date,
                    image_url: imageUrl
                  }])
                  .select();

                if (error) {
                  console.warn('Lỗi Supabase khi lưu memories:', error);
                } else {
                  savedToRemote = true;
                  if (data && data[0]) {
                    newRecord = data[0];
                    if (newRecord.id) {
                      myRecentlySentIds.add(newRecord.id);
                      setTimeout(() => myRecentlySentIds.delete(newRecord.id), 45000);

                      triggerCloudWebPush({
                        title: '📸 Có ảnh kỷ niệm mới!',
                        body: caption || 'Một khoảnh khắc mới vừa được lưu giữ',
                        icon: imageUrl,
                        tag: 'memory-' + newRecord.id,
                        action: 'OPEN_GALLERY'
                      });
                    }
                  }
                }
              } catch (supErr) {
                console.warn('Lỗi mạng khi lưu Supabase memories, chuyển sang lưu nội bộ:', supErr);
              }
            }

            if (!savedToRemote) {
              newRecord = {
                id: 'local-' + Date.now(),
                caption,
                date,
                image_url: imageUrl,
                created_at: new Date().toISOString()
              };
            }

            if (newRecord) {
              currentMemories = [newRecord, ...currentMemories.filter(m => String(m.id) !== String(newRecord.id))];
              saveLocalMemories(currentMemories);
            }
          }

          closeMemoryModal();
          renderMemories(currentMemories);
          renderAllMemoriesModal();

          if (supabaseClient) {
            fetchMemories().catch(() => {});
          }

          if (typeof confetti === 'function') {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#ffd166', '#ff70a6', '#70e4d0', '#c77dff']
            });
          }
        } catch (err) {
          console.error('Lỗi khi lưu kỷ niệm:', err);
          if (editId) {
            const targetIdx = currentMemories.findIndex(m => String(m.id) === String(editId));
            if (targetIdx !== -1) {
              currentMemories[targetIdx] = {
                ...currentMemories[targetIdx],
                caption,
                date,
                image_url: imageUrl
              };
              saveLocalMemories(currentMemories);
              renderMemories(currentMemories);
              renderAllMemoriesModal();
              closeMemoryModal();
              alert('Đã cập nhật kỷ niệm vào bộ nhớ máy!');
              return;
            }
          }
          alert('Không thể lưu kỷ niệm: ' + (err.message || err));
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
      });
    }

    async function handleDeleteMemory(id) {
      const confirmDelete = confirm('Bạn có chắc chắn muốn xóa kỷ niệm đáng nhớ này không?');
      if (!confirmDelete) return;

      try {
        const isSupabaseId = supabaseClient && !String(id).startsWith('default-') && !String(id).startsWith('local-');

        if (isSupabaseId) {
          const { error } = await supabaseClient
            .from('memories')
            .delete()
            .eq('id', id);

          if (error) throw error;
        }

        currentMemories = currentMemories.filter(m => String(m.id) !== String(id));
        saveLocalMemories(currentMemories);
        renderMemories(currentMemories);
        renderAllMemoriesModal();

        if (isSupabaseId) {
          await fetchMemories();
        }
      } catch (err) {
        console.error('Lỗi khi xóa kỷ niệm:', err);
        currentMemories = currentMemories.filter(m => String(m.id) !== String(id));
        saveLocalMemories(currentMemories);
        renderMemories(currentMemories);
        renderAllMemoriesModal();
        alert('Đã xóa kỷ niệm thành công!');
      }
    }

    function openLightbox(imgSrc, caption, date) {
      if (!lightboxModal) return;
      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxCaption) {
        lightboxCaption.innerHTML = `<strong>${escapeHTML(caption)}</strong>${date ? `<br><small style="color:var(--text-muted);">${escapeHTML(date)}</small>` : ''}`;
      }
      lightboxModal.classList.add('open', 'active');
      lightboxModal.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
      if (lightboxModal) {
        lightboxModal.classList.remove('open', 'active');
        lightboxModal.setAttribute('aria-hidden', 'true');
      }
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
    }



    // --- G. INTERACTIVE LOVE NOTES WALL (SUPABASE DATABASE) ---
    const noteForm = document.getElementById('noteForm');
    const noteAuthorInput = document.getElementById('noteAuthorInput');
    const noteContentInput = document.getElementById('noteContentInput');
    const sendNoteBtn = document.getElementById('sendNoteBtn');
    const notesWall = document.getElementById('notesWall');

    const viewAllNotesWrap = document.getElementById('viewAllNotesWrap');
    const viewAllNotesBtn = document.getElementById('viewAllNotesBtn');
    const notesTotalCount = document.getElementById('notesTotalCount');
    const allNotesModal = document.getElementById('allNotesModal');
    const allNotesModalCount = document.getElementById('allNotesModalCount');
    const allNotesWall = document.getElementById('allNotesWall');
    const closeAllNotesModalBtn = document.getElementById('closeAllNotesModalBtn');

    // Note detail & comment elements
    const noteDetailModal = document.getElementById('noteDetailModal');
    const closeNoteDetailBtn = document.getElementById('closeNoteDetailBtn');
    const noteDetailFeatured = document.getElementById('noteDetailFeatured');
    const noteDetailCommentBadge = document.getElementById('noteDetailCommentBadge');
    const noteCommentsList = document.getElementById('noteCommentsList');
    const noteCommentForm = document.getElementById('noteCommentForm');
    const commentAuthorInput = document.getElementById('commentAuthorInput');
    const commentTextInput = document.getElementById('commentTextInput');
    const sendCommentBtn = document.getElementById('sendCommentBtn');
    const authorChips = document.querySelectorAll('.btn-author-chip');

    function loadLocalNotes() {
      try {
        const saved = localStorage.getItem('lovestory_notes_v1');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Lỗi đọc local notes:', e);
      }
      return [...DEFAULT_NOTES];
    }

    function saveLocalNotes() {
      try {
        localStorage.setItem('lovestory_notes_v1', JSON.stringify(appNotes));
      } catch (e) {
        console.warn('Lỗi lưu local notes (Quota):', e);
        try {
          const trimmed = (appNotes || []).slice(0, 10);
          localStorage.setItem('lovestory_notes_v1', JSON.stringify(trimmed));
        } catch (e2) {
          console.warn('Không thể lưu local notes ngay cả khi cắt gọn:', e2);
        }
      }
    }

    function loadLocalComments() {
      try {
        const saved = localStorage.getItem('lovestory_comments_v1');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Lỗi đọc local comments:', e);
      }
      return [];
    }

    function saveLocalComments() {
      try {
        localStorage.setItem('lovestory_comments_v1', JSON.stringify(appComments));
      } catch (e) {
        console.warn('Lỗi lưu local comments:', e);
      }
    }

    function getBubbleClass(author) {
      const norm = (author || '').toLowerCase();
      if (norm.includes('anh') || norm.includes('hiếu') || norm.includes('híu')) {
        return 'bubble-anh';
      }
      if (norm.includes('linh') || norm.includes('bé') || norm.includes('em') || norm.includes('vịu') || norm.includes('vịu')) {
        return 'bubble-linh';
      }
      return 'bubble-default';
    }

    async function fetchLoveNotes() {
      if (!notesWall) return;

      if (!supabaseClient) {
        console.warn('Supabase client chưa khởi tạo, hiển thị lời nhắn từ local storage.');
        appNotes = loadLocalNotes();
        appComments = loadLocalComments();
        renderNotes();
        renderAllNotesModal();
        if (activeNoteDetailId) renderNoteDetailComments(activeNoteDetailId);
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('love_notes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Lỗi truy vấn Supabase love_notes:', error);
          appNotes = loadLocalNotes();
          appComments = loadLocalComments();
        } else if (data && data.length > 0) {
          const userNotes = data.filter(item => item.author !== '__CONFIG_MUSIC__' && item.author !== '__CONFIG_AUTH__' && item.author !== '__COMMENT__' && item.author !== '__PUSH_SUB__');
          const commentRows = data.filter(item => item.author === '__COMMENT__');

          if (userNotes.length > 0) {
            appNotes = userNotes.map(item => ({
              id: item.id,
              author: item.author || 'Người Giấu Tên',
              text: item.content || item.text || '',
              date: item.date || ''
            }));
          } else {
            appNotes = [...DEFAULT_NOTES];
          }

          appComments = commentRows.map(item => {
            let parsed = {};
            try {
              parsed = typeof item.content === 'string' ? JSON.parse(item.content) : (item.content || {});
            } catch (e) {
              parsed = { text: item.content || item.text, author: 'Người Giấu Tên', note_id: item.text };
            }
            return {
              id: item.id,
              noteId: parsed.note_id || item.text,
              author: parsed.author || 'Người Giấu Tên',
              text: parsed.text || '',
              date: parsed.date || item.date || '',
              created_at: item.created_at || (parsed.timestamp ? new Date(parsed.timestamp).toISOString() : '')
            };
          });

          saveLocalNotes();
          saveLocalComments();
        } else {
          appNotes = [...DEFAULT_NOTES];
          appComments = loadLocalComments();
        }
      } catch (err) {
        console.error('Lỗi kết nối Supabase love_notes:', err);
        appNotes = loadLocalNotes();
        appComments = loadLocalComments();
      }

      renderNotes();
      renderAllNotesModal();
      if (activeNoteDetailId) {
        renderNoteDetailComments(activeNoteDetailId);
      }
    }

    async function deleteNote(id) {
      if (!confirm('Bạn có chắc muốn xóa lời nhắn này không?')) return;
      try {
        if (supabaseClient && !String(id).startsWith('local-') && !String(id).startsWith('default-')) {
          const { error } = await supabaseClient
            .from('love_notes')
            .delete()
            .eq('id', id);
          if (error) throw error;

          try {
            await supabaseClient
              .from('love_notes')
              .delete()
              .eq('author', '__COMMENT__')
              .eq('text', String(id));
          } catch (delCmtErr) {
            console.warn('Lỗi xóa bình luận kèm theo:', delCmtErr);
          }
        }

        appNotes = appNotes.filter(n => String(n.id) !== String(id));
        appComments = appComments.filter(c => String(c.noteId) !== String(id));
        saveLocalNotes();
        saveLocalComments();
        renderNotes();
        renderAllNotesModal();

        if (String(activeNoteDetailId) === String(id)) {
          closeNoteDetailModal();
        }

        await fetchLoveNotes();
      } catch (err) {
        console.error('Lỗi khi xóa lời nhắn:', err);
        alert('Không thể xóa: ' + (err.message || err));
      }
    }

    function createNoteCardElement(note, index) {
      const card = document.createElement('div');
      card.className = 'sticky-note note-card';
      card.title = 'Nhấp để xem chi tiết lời nhắn này';

      const rotations = [-2, 1.8, -1.5, 2.2, -1.8, 1.5];
      const tapeColors = ['#ffd166', '#ff70a6', '#70e4d0', '#c77dff', '#ff8fab'];

      const rot = rotations[index % rotations.length];
      const tapeColor = tapeColors[index % tapeColors.length];
      card.style.transform = `rotate(${rot}deg)`;

      const noteComments = appComments.filter(c => String(c.noteId) === String(note.id));
      const commentCount = noteComments.length;
      const badgeText = commentCount > 0 ? `💬 ${commentCount} phản hồi` : `💬 Thảo luận`;

      card.innerHTML = `
        <div class="note-tape" style="background:${tapeColor};"></div>
        <button class="btn-delete-note" title="Xóa lời nhắn này" data-id="${escapeHTML(note.id || '')}">✕</button>
        <p class="sticky-text note-text font-mali">"${escapeHTML(note.text)}"</p>
        <div class="sticky-footer note-footer">
          <span class="sticky-author note-author font-title">✦ ${escapeHTML(note.author)}</span>
          <span class="sticky-date note-date">${escapeHTML(note.date || '')}</span>
        </div>
        <div class="note-comment-pill" title="Bấm để xem và trả lời lời nhắn này">
          <span>${badgeText}</span>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete-note')) return;
        openNoteDetailModal(note.id);
      });

      const delBtn = card.querySelector('.btn-delete-note');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteNote(note.id);
        });
      }

      return card;
    }

    function renderNotes() {
      if (!notesWall) return;
      notesWall.innerHTML = '';

      const total = (appNotes && appNotes.length) || 0;
      if (notesTotalCount) notesTotalCount.textContent = total;
      if (allNotesModalCount) allNotesModalCount.textContent = total;
      if (viewAllNotesWrap) {
        viewAllNotesWrap.style.display = total > 0 ? 'flex' : 'none';
      }

      if (!appNotes || appNotes.length === 0) {
        notesWall.innerHTML = `
          <div class="notes-empty-state">
            <p>Chưa có lời nhắn nào được ghim. Hãy gửi lời nhắn đầu tiên đến người thương nhé! 💌</p>
          </div>
        `;
        return;
      }

      // Main page strictly displays at most 6 latest love notes
      const displayNotes = appNotes.slice(0, 6);
      displayNotes.forEach((note, index) => {
        notesWall.appendChild(createNoteCardElement(note, index));
      });
    }

    function renderAllNotesModal() {
      if (!allNotesWall) return;
      allNotesWall.innerHTML = '';

      const total = (appNotes && appNotes.length) || 0;
      if (allNotesModalCount) allNotesModalCount.textContent = total;

      if (!appNotes || appNotes.length === 0) {
        allNotesWall.innerHTML = `
          <div class="notes-empty-state" style="padding: 40px 20px;">
            <p>Chưa có lời nhắn nào được ghim. Hãy gửi lời nhắn đầu tiên đến người thương nhé! 💌</p>
          </div>
        `;
        return;
      }

      appNotes.forEach((note, index) => {
        allNotesWall.appendChild(createNoteCardElement(note, index));
      });
    }

    function openAllNotesModal() {
      if (!allNotesModal) return;
      renderAllNotesModal();
      allNotesModal.style.display = 'flex';
      allNotesModal.classList.add('open', 'active');
      allNotesModal.setAttribute('aria-hidden', 'false');
    }

    function closeAllNotesModal() {
      if (!allNotesModal) return;
      allNotesModal.classList.remove('open', 'active');
      allNotesModal.style.display = 'none';
      allNotesModal.setAttribute('aria-hidden', 'true');
    }

    if (viewAllNotesBtn) viewAllNotesBtn.addEventListener('click', openAllNotesModal);
    if (closeAllNotesModalBtn) closeAllNotesModalBtn.addEventListener('click', closeAllNotesModal);
    if (allNotesModal) {
      allNotesModal.addEventListener('click', (e) => {
        if (e.target === allNotesModal) closeAllNotesModal();
      });
    }

    function renderFeaturedNoteCard(note) {
      if (!noteDetailFeatured || !note) return;

      // Reset to collapsed view initially
      noteDetailFeatured.classList.remove('is-expanded');

      const isLong = (note.text && (note.text.length > 70 || note.text.includes('\n')));
      const expandBtnHTML = isLong ? `
        <button type="button" class="btn-toggle-note-expand" id="toggleNoteExpandBtn" title="Đọc toàn bộ / Thu gọn lời nhắn">
          <span class="toggle-text">Đọc tất cả</span>
          <span class="toggle-icon">▾</span>
        </button>
      ` : '';

      noteDetailFeatured.innerHTML = `
        <div class="note-featured-tape"></div>
        <p class="note-featured-text font-mali">"${escapeHTML(note.text)}"</p>
        <div class="note-featured-footer">
          <div class="note-featured-meta">
            <span class="note-featured-author font-title">✦ ${escapeHTML(note.author)}</span>
            <span class="note-featured-date">${escapeHTML(note.date || '')}</span>
          </div>
          ${expandBtnHTML}
        </div>
      `;

      if (isLong) {
        const toggleBtn = noteDetailFeatured.querySelector('#toggleNoteExpandBtn');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const expanded = noteDetailFeatured.classList.toggle('is-expanded');
            const txt = toggleBtn.querySelector('.toggle-text');
            const icon = toggleBtn.querySelector('.toggle-icon');
            if (txt) txt.textContent = expanded ? 'Thu gọn' : 'Đọc tất cả';
            if (icon) icon.textContent = expanded ? '▴' : '▾';
          });
        }
      }
    }

    function openNoteDetailModal(noteId) {
      let note = appNotes.find(n => String(n.id) === String(noteId));
      if (!note) {
        if (typeof fetchLoveNotes === 'function') {
          fetchLoveNotes().then(() => {
            const found = appNotes.find(n => String(n.id) === String(noteId));
            if (found) openNoteDetailModal(noteId);
          });
        }
        return;
      }

      activeNoteDetailId = note.id;

      renderFeaturedNoteCard(note);

      renderNoteDetailComments(note.id);

      if (noteDetailModal) {
        noteDetailModal.style.display = 'flex';
        noteDetailModal.classList.add('open', 'active');
        noteDetailModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('note-detail-open');
      }

      if (commentTextInput && window.innerWidth > 680) {
        setTimeout(() => commentTextInput.focus(), 150);
      }
    }

    // Expose openNoteDetailModal for notifications and SW deep-links
    appOpenNoteDetailModal = openNoteDetailModal;
    if (typeof window !== 'undefined') {
      window.__openNoteDetailModal = openNoteDetailModal;
    }

    function closeNoteDetailModal() {
      if (noteDetailModal) {
        noteDetailModal.classList.remove('open', 'active');
        noteDetailModal.style.display = 'none';
        noteDetailModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.classList.remove('note-detail-open');
      }
      if (noteDetailFeatured) {
        noteDetailFeatured.classList.remove('is-expanded');
      }
      activeNoteDetailId = null;
      if (commentTextInput) commentTextInput.value = '';
    }

    function renderNoteDetailComments(noteId) {
      if (!noteCommentsList) return;

      const comments = appComments
        .filter(c => String(c.noteId) === String(noteId))
        .sort((a, b) => {
          const tA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const tB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return tA - tB;
        });

      if (noteDetailCommentBadge) {
        noteDetailCommentBadge.textContent = comments.length > 0 ? `${comments.length} phản hồi` : '0 phản hồi';
      }

      if (comments.length === 0) {
        noteCommentsList.innerHTML = `
          <div class="comments-empty-state">
            <div class="empty-icon">💬</div>
            <p class="empty-text">Chưa có phản hồi nào</p>
            <p class="empty-sub">Hãy là người đầu tiên gửi lời đối đáp yêu thương nhé!</p>
          </div>
        `;
        return;
      }

      noteCommentsList.innerHTML = '';
      comments.forEach(c => {
        const bubble = document.createElement('div');
        const bubbleClass = getBubbleClass(c.author);
        bubble.className = `comment-bubble ${bubbleClass}`;

        bubble.innerHTML = `
          <div class="comment-bubble-header">
            <span class="comment-author-badge font-title">${escapeHTML(c.author)}</span>
            <div class="comment-header-right">
              <span class="comment-time">${escapeHTML(c.date || '')}</span>
              <button type="button" class="btn-delete-comment" title="Xóa phản hồi này" data-id="${escapeHTML(c.id || '')}">✕</button>
            </div>
          </div>
          <p class="comment-bubble-content font-mali">${escapeHTML(c.text)}</p>
        `;

        const delBtn = bubble.querySelector('.btn-delete-comment');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteComment(c.id);
          });
        }

        noteCommentsList.appendChild(bubble);
      });

      setTimeout(() => {
        noteCommentsList.scrollTop = noteCommentsList.scrollHeight;
      }, 50);
    }

    async function deleteComment(commentId) {
      if (!confirm('Bạn có chắc muốn xóa lời hồi đáp này không?')) return;
      try {
        if (supabaseClient && !String(commentId).startsWith('local-') && !String(commentId).startsWith('temp-')) {
          const { error } = await supabaseClient
            .from('love_notes')
            .delete()
            .eq('id', commentId);
          if (error) throw error;
        }

        appComments = appComments.filter(c => String(c.id) !== String(commentId));
        saveLocalComments();

        if (activeNoteDetailId) {
          renderNoteDetailComments(activeNoteDetailId);
        }
        renderNotes();
        renderAllNotesModal();
      } catch (err) {
        console.error('Lỗi khi xóa phản hồi:', err);
        alert('Không thể xóa phản hồi: ' + (err.message || err));
      }
    }

    if (noteCommentForm) {
      noteCommentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!activeNoteDetailId) return;

        const author = currentUserIdentity || (commentAuthorInput && commentAuthorInput.value.trim()) || 'Anh ❤️';
        const text = (commentTextInput && commentTextInput.value.trim()) || '';

        if (!text) {
          alert('Vui lòng nhập nội dung phản hồi nhé!');
          if (commentTextInput) commentTextInput.focus();
          return;
        }

        try {
          localStorage.setItem('lovestory_comment_author', author);
        } catch (e) {}

        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const myDeviceId = (typeof localStorage !== 'undefined' && localStorage.getItem('lovestory_device_id')) || '';
        const commentData = {
          note_id: String(activeNoteDetailId),
          author: author,
          text: text,
          date: dateStr,
          sender_device: myDeviceId,
          timestamp: Date.now()
        };

        const origBtnHTML = sendCommentBtn ? sendCommentBtn.innerHTML : '<span class="btn-send-text">Gửi</span><span class="btn-send-icon">💌</span>';
        if (sendCommentBtn) {
          sendCommentBtn.disabled = true;
          sendCommentBtn.innerHTML = '<span class="btn-send-text">Đang gửi...</span><span class="btn-send-icon">💌</span>';
        }

        try {
          if (supabaseClient) {
            const { data, error } = await supabaseClient
              .from('love_notes')
              .insert([{
                author: '__COMMENT__',
                content: JSON.stringify(commentData),
                text: String(activeNoteDetailId),
                date: dateStr
              }])
              .select();

            if (error) throw error;

            const newId = (data && data[0] && data[0].id) ? data[0].id : ('temp-' + Date.now());
            myRecentlySentIds.add(newId);
            setTimeout(() => myRecentlySentIds.delete(newId), 45000);

            appComments.push({
              id: newId,
              noteId: String(activeNoteDetailId),
              author: author,
              text: text,
              date: dateStr,
              created_at: new Date().toISOString()
            });

            triggerCloudWebPush({
              title: `💬 Thảo luận mới từ ${author}!`,
              body: text,
              tag: 'comment-' + newId,
              action: 'OPEN_NOTE',
              noteId: String(activeNoteDetailId)
            });
          } else {
            const newComment = {
              id: 'local-cmt-' + Date.now(),
              noteId: String(activeNoteDetailId),
              author: author,
              text: text,
              date: dateStr,
              created_at: new Date().toISOString()
            };
            appComments.push(newComment);
            saveLocalComments();
          }

          if (commentTextInput) commentTextInput.value = '';

          renderNoteDetailComments(activeNoteDetailId);
          renderNotes();
          renderAllNotesModal();

          if (typeof confetti === 'function') {
            confetti({
              particleCount: 28,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#ff70a6', '#ffd166', '#70e4d0', '#ff8fab']
            });
          }
        } catch (err) {
          console.error('Lỗi khi gửi phản hồi:', err);
          alert('Không thể gửi phản hồi: ' + (err.message || err));
        } finally {
          if (sendCommentBtn) {
            sendCommentBtn.disabled = false;
            sendCommentBtn.innerHTML = origBtnHTML;
          }
        }
      });
    }

    // Quick Author chips
    authorChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const name = chip.getAttribute('data-name');
        if (commentAuthorInput && name) {
          commentAuthorInput.value = name;
          try {
            localStorage.setItem('lovestory_comment_author', name);
          } catch (e) {}
        }
      });
    });

    if (commentTextInput) {
      commentTextInput.addEventListener('focus', () => {
        setTimeout(() => {
          if (noteCommentsList) {
            noteCommentsList.scrollTop = noteCommentsList.scrollHeight;
          }
        }, 300);
      });
    }

    const reloadNoteDetailBtn = document.getElementById('reloadNoteDetailBtn');
    if (reloadNoteDetailBtn) {
      reloadNoteDetailBtn.addEventListener('click', async (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const icon = reloadNoteDetailBtn.querySelector('.reload-icon');
        const label = reloadNoteDetailBtn.querySelector('.reload-label');
        if (icon) icon.classList.add('spin-anim');
        if (label) label.textContent = 'Đang tải...';
        reloadNoteDetailBtn.disabled = true;

        try {
          if (typeof fetchLoveNotes === 'function') {
            await fetchLoveNotes();
          }
          if (activeNoteDetailId) {
            const note = appNotes.find(n => String(n.id) === String(activeNoteDetailId));
            if (note) {
              renderFeaturedNoteCard(note);
            }
            renderNoteDetailComments(activeNoteDetailId);
          }
          if (label) label.textContent = '✓ Xong!';
          setTimeout(() => {
            if (label) label.textContent = 'Làm Mới';
          }, 1500);
        } catch (err) {
          console.warn('Lỗi khi làm mới lời nhắn:', err);
          if (label) label.textContent = 'Làm Mới';
        } finally {
          reloadNoteDetailBtn.disabled = false;
          if (icon) icon.classList.remove('spin-anim');
        }
      });
    }

    if (closeNoteDetailBtn) {
      closeNoteDetailBtn.addEventListener('click', closeNoteDetailModal);
    }

    if (noteDetailModal) {
      noteDetailModal.addEventListener('click', (e) => {
        if (e.target === noteDetailModal) {
          closeNoteDetailModal();
        }
      });
    }

    if (commentTextInput) {
      commentTextInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (noteCommentForm) {
            noteCommentForm.requestSubmit();
          }
        }
      });
    }

    let isSubmittingNote = false;

    async function handleSendNote(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }

      if (isSubmittingNote) return;

      const author = currentUserIdentity || (noteAuthorInput && noteAuthorInput.value.trim()) || 'Anh ❤️';
      const text = (noteContentInput && noteContentInput.value.trim()) || '';

      if (!text) {
        alert('Vui lòng viết một lời nhắn gửi ngọt ngào nhé!');
        if (noteContentInput) noteContentInput.focus();
        return;
      }

      // Thu gọn bàn phím ảo ngay lập tức trên điện thoại
      if (noteContentInput) noteContentInput.blur();
      if (noteAuthorInput) noteAuthorInput.blur();
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      isSubmittingNote = true;
      const originalBtnHTML = sendNoteBtn ? sendNoteBtn.innerHTML : '<span>Gửi Lời Nhắn Này ♥</span>';
      if (sendNoteBtn) {
        sendNoteBtn.disabled = true;
        sendNoteBtn.innerHTML = '<span>Đang gửi lời nhắn... 💌</span>';
      }

      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      try {
        let savedToRemote = false;
        let createdNoteId = 'local-' + Date.now();

        if (supabaseClient) {
          try {
            const { data, error } = await supabaseClient
              .from('love_notes')
              .insert([{
                author: author,
                content: text,
                text: text,
                date: dateStr
              }])
              .select();

            if (error) {
              console.warn('Lỗi Supabase khi lưu lời nhắn:', error);
            } else {
              savedToRemote = true;
              if (data && data[0] && data[0].id) {
                createdNoteId = data[0].id;
                myRecentlySentIds.add(createdNoteId);
                setTimeout(() => myRecentlySentIds.delete(createdNoteId), 45000);

                triggerCloudWebPush({
                  title: `💌 Lời nhắn mới từ ${author}!`,
                  body: text,
                  tag: 'note-' + createdNoteId,
                  action: 'OPEN_NOTE',
                  noteId: createdNoteId
                });
              }
            }
          } catch (supErr) {
            console.warn('Lỗi mạng khi kết nối Supabase, chuyển sang lưu nội bộ:', supErr);
          }
        }

        // Cập nhật tức thì vào danh sách hiển thị
        const newNoteObj = {
          id: createdNoteId,
          author: author,
          text: text,
          date: dateStr
        };

        appNotes = [newNoteObj, ...appNotes.filter(n => n.id !== createdNoteId)];
        saveLocalNotes();
        renderNotes();
        renderAllNotesModal();

        if (noteContentInput) noteContentInput.value = '';

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#ff70a6', '#ffd166', '#70e4d0', '#ff8fab']
          });
        }

        if (savedToRemote && supabaseClient) {
          fetchLoveNotes().catch(() => {});
        }
      } catch (err) {
        console.error('Lỗi khi gửi lời nhắn:', err);
        alert('Không thể lưu lời nhắn: ' + (err.message || err));
      } finally {
        isSubmittingNote = false;
        if (sendNoteBtn) {
          sendNoteBtn.disabled = false;
          sendNoteBtn.innerHTML = originalBtnHTML;
        }
      }
    }

    if (noteForm) {
      noteForm.addEventListener('submit', handleSendNote);
    }
    if (sendNoteBtn) {
      sendNoteBtn.addEventListener('click', handleSendNote);
    }

    // Global ESC key listener to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        closeMemoryModal();
        closeMusicModal();
        closeAllMemoriesModal();
        closeAllNotesModal();
        closeUserIdentityModal();
        if (activeNoteDetailId) closeNoteDetailModal();
      }
    });

    // Supabase Realtime Channel Subscription (ONLY active after unlock)
    if (supabaseClient) {
      try {
        supabaseClient
          .channel('public:love_notes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'love_notes' }, (payload) => {
            if (payload && payload.new && payload.new.author === '__CONFIG_MUSIC__') {
              try {
                const remoteCfg = JSON.parse(payload.new.content);
                if (remoteCfg && remoteCfg.videoId && remoteCfg.videoId !== currentMusicConfig.videoId) {
                  console.log('✨ [Realtime] Nhạc nền được đồng bộ từ đối phương:', remoteCfg.title);
                  applyMusicConfig(remoteCfg, isPlayingMusic);
                  localStorage.setItem('lovestory_music_config', JSON.stringify(remoteCfg));
                }
              } catch (e) {
                console.warn('Lỗi phân tích Realtime music payload:', e);
              }
            } else if (payload && payload.new && payload.new.author === '__CONFIG_AUTH__') {
              try {
                const remoteCfg = JSON.parse(payload.new.content);
                if (remoteCfg && (remoteCfg.em || remoteCfg.anh)) {
                  const merged = {
                    em: { ...DEFAULT_AUTH_CONFIG.em, ...(remoteCfg.em || {}) },
                    anh: { ...DEFAULT_AUTH_CONFIG.anh, ...(remoteCfg.anh || {}) }
                  };
                  saveLocalAuthConfig(merged);
                  const role = currentAccountRole || (currentUserIdentity.includes('Em') ? 'em' : 'anh');
                  if (merged[role] && merged[role].title) {
                    currentUserIdentity = merged[role].title;
                    if (navUserName) navUserName.textContent = currentUserIdentity;
                    const noteSender = document.getElementById('noteSenderName');
                    if (noteSender) noteSender.textContent = currentUserIdentity;
                  }
                }
              } catch (e) {
                console.warn('Lỗi phân tích Realtime auth payload:', e);
              }
            } else if (payload && payload.eventType === 'INSERT' && payload.new) {
              const newRow = payload.new;
              const rowId = newRow.id;

              if (!myRecentlySentIds.has(rowId)) {
                if (newRow.author === '__COMMENT__') {
                  let cmtAuthor = 'Người ấy';
                  let cmtText = 'Vừa để lại một phản hồi mới 💬';
                  try {
                    const parsed = JSON.parse(newRow.content);
                    if (parsed.author) cmtAuthor = parsed.author;
                    if (parsed.text) cmtText = parsed.text;
                  } catch (e) {
                    if (newRow.text) cmtText = newRow.text;
                  }
                  const noteTargetId = newRow.text;
                  showAppNotification({
                    title: `💬 Thảo luận mới từ ${cmtAuthor}`,
                    body: cmtText,
                    icon: '💬',
                    action: 'OPEN_NOTE',
                    noteId: noteTargetId,
                    onClick: () => {
                      if (typeof openNoteDetailModal === 'function' && noteTargetId) {
                        openNoteDetailModal(noteTargetId);
                      }
                    }
                  });
                } else if (newRow.author !== '__CONFIG_MUSIC__' && newRow.author !== '__CONFIG_AUTH__' && newRow.author !== '__PUSH_SUB__') {
                  const authorName = newRow.author || 'Người thương';
                  const noteBody = newRow.content || newRow.text || 'Gửi đến bạn một lời nhắn ngọt ngào 💕';
                  showAppNotification({
                    title: `💌 Lời nhắn mới từ ${authorName}!`,
                    body: noteBody,
                    icon: '💌',
                    action: 'OPEN_NOTE',
                    noteId: rowId,
                    onClick: () => {
                      if (typeof openNoteDetailModal === 'function' && rowId) {
                        openNoteDetailModal(rowId);
                      } else {
                        const notesSection = document.getElementById('notes');
                        if (notesSection) notesSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  });
                }
              }
            }
            fetchLoveNotes();
          })
          .subscribe();
      } catch (e) {
        console.warn('Realtime channel subscription error:', e);
      }

      try {
        supabaseClient
          .channel('public:memories')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'memories' }, (payload) => {
            if (payload && payload.eventType === 'INSERT' && payload.new) {
              const newRow = payload.new;
              const rowId = newRow.id;
              if (!myRecentlySentIds.has(rowId)) {
                const captionText = newRow.caption ? `"${newRow.caption}"` : 'Một khoảnh khắc mới vừa được lưu giữ';
                showAppNotification({
                  title: '📸 Có ảnh kỷ niệm mới!',
                  body: captionText,
                  icon: newRow.image_url || '📸',
                  action: 'OPEN_GALLERY',
                  onClick: () => {
                    const gallery = document.getElementById('gallery');
                    if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
                  }
                });
              }
            }
            fetchMemories();
          })
          .subscribe();
      } catch (e) {
        console.warn('Realtime memories subscription error:', e);
      }
    }

    // --- I. SMOOTH SCROLLING FOR IN-PAGE ANCHORS ---
    // Prevents browser from appending hash (#letter, etc.) to URL, avoiding jump to middle on reload
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.length > 1 && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Trigger initial data load from Supabase
    fetchMemories();
    fetchLoveNotes();
  }

}

// Resilient auto-launch: execute immediately if DOM is already ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoveStoryApp);
} else {
  initLoveStoryApp();
}


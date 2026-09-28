/**
 * 30 DAYS OF US — ROMANTIC ANNIVERSARY INTERACTIVE SCRIPT
 * Security Architecture:
 * - Structural Unmounting: App template unmounted from DOM until unlocked.
 * - Zero-Knowledge SHA-256 password hash verification.
 * - WebCrypto AES-GCM encrypted love letter decryption in memory.
 * - Real-time Anti-Tamper Guard with MutationObserver and DevTools interceptors.
 * - Deferred Supabase network queries & Realtime channels.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STORY & COUPLE DATA
  // ==========================================
  const COUPLE_DATA = {
    hisName: 'Thân Hiếu',
    herName: 'Khánh Linh',
    startDate: '2026-08-31T00:00:00',
    letterDate: 'Since 31 Tháng 08, 2026',
    letterSalutation: 'Gửi Khánh Linh — Cô gái xinh xắn chân dài của anh,',
    // AES-GCM 256-bit encrypted ciphertext of the secret love letter
    letterBodyCipher: {
      iv: 'FpxAWO9iEJih43J9',
      data: 'w/lhwTivsdXZI4mh61KyXC24opINo++NV4PGxssWgyiIULeAnF6YJDTYsu9AvKsDndgCq2fbfOvse1VX03CWVkPVaM4cSUpUVUmRhwC47oYIOEfpZ/TYUjfzbTnso998/uH7Y3LNrQvHpZg/rzBazsmwo74UYj5owLqHI9Jx6dfLckhe6NX+RidfSB0dCu4vhluHQBOnYQk+iYdYepooQ1hqn3r6E8mn6Kg6/9mwPDIZkY9L2Shu9VpGrKEASbIrsr3qggyx78tPKS/gEk6rvUJLNEnZqIrwesx5A8hx68pnp4hWdaUSNQc+H/i+Z4sona4nP23FZ60JnTQfnNu0dwFVhYi51Sa2cedC/BElHJWnbboM/dFSiDeWDfSXqfVupZC7kq780bZMjHLUCdc2ssSBbR509HrIpXWPWehMTvEcBJcZGVqOEYTJvp+hq2pAfmFPRiugCo12hxjwKDD5kbRoCweiCgOxWNupK5v71kWOSCVchoZsuAE7omT6Yrt8fhr9XCGRM/P9phLevFjeHrV9H5QffCDDLv7alIbNGS4/EgbZAL1tDeYArtRu4BXhknzWidhvuduQG6Vmtw04+Sgwfg5MniOPdrMZpNY2+Tbb06nfB1npkyqXD092qAdmyod1EXgVhYZEMMP+5N21zW9gnIENEwVvmuGnwjliH96bbvPo3GERvISbU5bOHlPxiTK0hTCRKeKNi+sBjGDINSUFvJXJnlWH4Tf4js8dwz4ybjmex64ywLKTfaqMiLb/6B+NFfWQIe7ZSXn87EBlxILHAwixAcPFNZ5NGP8NyC/VKpMOGzTONsTegiF/M/fMXNbEBqKI3+I/p6RVo0qc0kN7s8gTAJ57wmOGWJopIv5rMugIGqJzWYoR07P515aHrXsh+vZv6NIBGgh0aKtD6UTteFnjT8nyY/8PXhDOHztUzcKI3QAJoWtpgQgv5QpRKWz4nDYXm43ttjFjRFG0VhbDk/+R76nh2r3kGx/oJMNt/Q2bLwZ2oQnUVNKb6UfYmHzzHpBA+k1NvnkXrE05zfctN+KrJn040qC4dUs8VbumqdXYDA8oJxk5/hhG01C7qTIj2nxe9fYijTQp+yZbOQYUt2oz7nHz652t/3P0io1f8qPncbRl3N/t/W5OHmz85OhJo4EcZSUgbk34hNMNGNc3W3nKQKBCjGTKvq/MpwiJAnxjywwj/3Ioj5J4GD/VbKYuDzxjFFxL6ag4dL8jS0C0NQ99zRA/7bNWans8zYUThP8yIHnX/EvAWkvm9dqa+5J2mzNf5R3EIvzYBF7jSCxxkDQTtkzmXsRLv/BkRsopujysQf0WXqzK8qEU278/A5RTrQ+6VsoelTznxsVtcRvMGP+uIL6fQVY2QPyYDgylEY5jGQapShD7qrjqwt5nA+RWwtLbBirh9gPNQiv6Ts3nho2xi5PD9UuLhukeUVJscVcar1CwjizlJrBVWasV7Uv3M2lEYu38oj1qM3YaiIgrlpCmirDBK2zFzTtvJKPZ08NeurCqDhWHRT0rFi2DS45UNNqdvt2NSHIkP5hu8WwyELYaXbN+jgkULeqH1fRQ2IaL8hptzFEvvM2RmTfjiSKHTnTtzf6eeVtypFT21lVnG6BPeCYTR+OwQMWqNIjQILVdCCiov+Gxh+PtE77Z1i1tJ91kcujI7KsABfPuOG3lvQUHHS0G+fRo7PKGOOZL8TvqqUtg2LxpHnF9vhoh5wAPpCmQsRAgrkogiPwsl7nQmyjA4M36KedM8UupHKem9pjeJXbNm1H6xbp01GYohSZqGd+Jgxnit8sOnpk4hOgn8Ra903CPotnW4h9jYf9RFFrItfmn3IywZTpL6wY68+TW7hNsFgKgsZJ0XsdiLmLZUA1/pO3OT9KagIK8kT0bXswvDvHXhDkviem6NVDMXsS9hcrxf41wzbju6XL5EP8gjx3dSvC/yj5iIDF6vnl4ZF+9I6RZ6o2iVpvNuyy8U4GxrhN11sGIPm4yfthlxz4IBbfIE6xXpBKn0N31asBaEbNtG6yyuRiyMwjPdu7re4Vth7NnnTsYXgFza9WxCM0hECW+p9i3yrujWZlGJdWQHzkkG7f3KbquL9gSIBmX6hTLV1pcB3T02uoY7ZRIaje9puwaeFNq9WkQ2WUxmc+d8XYFqlP8QY7tQylAIl+qR5w0C1awNwYFd69qN2rQpX5ArdhDyDvOdGMBV9TJ5JHVGOjlj7NfXKmoiskW5in81gSCs0LKpJMHIjqqVQg0T+d0WQ2tH9SqO5R2JGYlnsTE9RbxNxX84GbJ3y24zrux2FQUOCPuPYpLXViPjpWWUeuyzVeS0GuySM+N1PIV1v+I1X1xfwG95aqlI82ZOA=='
    },
    letterSignature: 'Thân Hiếu (Chàng trai 2001 của em)'
  };

  const DEFAULT_NOTES = [
    {
      author: 'Khánh Linh',
      text: 'Cảm ơn anh người yêu 2001 đã luôn nhường nhịn, cưng chiều và thức đêm buôn chuyện cùng em. Yêu anh nhiều! 🎾💖',
      date: '31.08.2026 21:00'
    },
    {
      author: 'Thân Hiếu',
      text: 'May mắn nhất là hôm đó đi chơi pickleball và va phải em. Mãi là đồng đội số 1 của anh nhé bé yêu! 🥰',
      date: '31.08.2026 21:15'
    },
    {
      author: 'Hai Đứa Mình',
      text: 'Từ 31.08.2026 đến mãi mãi về sau — Cùng nhau đi thật nhiều nơi, cười thật nhiều và yêu thương nhau thật nhiều! ✨',
      date: '31.08.2026 22:00'
    }
  ];

  let appNotes = [...DEFAULT_NOTES];

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
  // 2. CRYPTOGRAPHY & SECURITY HELPERS
  // ==========================================
  // SHA-256 hash of valid PIN ('3108')
  const HASH_3108 = '50d65da5a5788e6183a480898578d672eb3f1d593a5b308e6e0b971e90fab6b9';

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

  // Forward declarations for functions needed across scopes
  let startMusic = () => {};
  let handleYTStateChange = () => {};
  let handleYTError = () => {};

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

  function initYouTubePlayer() {
    if (ytPlayer || !window.YT || !window.YT.Player) return;
    try {
      const activeVideoId = currentMusicConfig.videoId || '-uFQzcY7YHc';
      ytPlayer = new YT.Player('ytAudioPlayer', {
        height: '200',
        width: '200',
        videoId: activeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
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
                ytPlayer.setVolume(75);
              }
            } catch (e) {}
            if (pendingPlay) {
              pendingPlay = false;
              if (typeof startMusic === 'function') {
                startMusic();
              }
            }
          },
          onStateChange: (event) => {
            if (typeof handleYTStateChange === 'function') {
              handleYTStateChange(event.data);
            }
          },
          onError: (err) => {
            console.warn('YouTube Player error code:', err ? err.data : 'unknown');
            if (typeof handleYTError === 'function') {
              handleYTError(err);
            }
          }
        }
      });
    } catch (e) {
      console.warn('Failed to initialize YouTube Player:', e);
    }
  }

  // Hook global YouTube API callback
  window.onYouTubeIframeAPIReady = function() {
    initYouTubePlayer();
  };

  // If YouTube API script was already parsed and ready
  if (window.YT && window.YT.Player) {
    initYouTubePlayer();
  }

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

  function dismissIntro() {
    if (!introScreen) return;
    introScreen.classList.add('hide');

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff70a6', '#ffd166', '#70e4d0', '#c77dff', '#ffffff']
      });
    }

    if (typeof startMusic === 'function') {
      startMusic();
    }
  }

  function showPasswordStep() {
    if (!introPasswordSection) {
      return;
    }
    if (enterBtn) enterBtn.style.display = 'none';
    introPasswordSection.style.display = 'block';

    if (introPasswordInput) {
      setTimeout(() => {
        introPasswordInput.focus();
      }, 100);
    }
  }

  async function handlePasswordCheck() {
    if (!introPasswordInput) return;
    const rawVal = (introPasswordInput.value || '').trim();
    const cleanDigits = rawVal.replace(/[^0-9]/g, '');

    let isMatch = false;
    try {
      const hash = await computeSHA256(cleanDigits);
      if (hash === HASH_3108) {
        isMatch = true;
      }
    } catch (err) {
      console.error('Password hash computation error:', err);
    }

    if (isMatch) {
      isUnlocked = true;
      if (tamperObserver) tamperObserver.disconnect();
      removeLockScreenGuards();

      if (passwordErrorMsg) passwordErrorMsg.style.display = 'none';
      introPasswordInput.classList.remove('pass-error');
      introPasswordInput.classList.add('pass-success');

      if (typeof confetti === 'function') {
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

      // 2. Decrypt love letter via AES-GCM
      let plainLetter = '';
      try {
        plainLetter = await decryptText(
          COUPLE_DATA.letterBodyCipher.data,
          COUPLE_DATA.letterBodyCipher.iv,
          cleanDigits
        );
      } catch (err) {
        console.error('Không thể giải mã thư tình:', err);
        plainLetter = 'Thư tình đang tạm thời không thể giải mã.';
      }

      // 3. Initialize all interactive features and load Supabase data
      initMainApp(plainLetter);

      // 4. Animate and dismiss curtain
      setTimeout(() => {
        dismissIntro();
      }, 400);

    } else {
      // Wrong password
      if (passwordErrorMsg) {
        passwordErrorMsg.style.display = 'block';
      }
      introPasswordInput.classList.remove('pass-success');
      introPasswordInput.classList.add('pass-error');

      const card = document.querySelector('.intro-card');
      if (card) {
        card.classList.remove('shake-anim');
        void card.offsetWidth;
        card.classList.add('shake-anim');
      }

      introPasswordInput.value = '';
      introPasswordInput.focus();
    }
  }

  if (enterBtn) enterBtn.addEventListener('click', showPasswordStep);
  if (introSeal) introSeal.addEventListener('click', showPasswordStep);

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
  // 7. PROTECTED APPLICATION INITIALIZER
  // Called ONLY after password verification & DOM mounting
  // ==========================================
  function initMainApp(plainLetter) {

    // --- A. APPLY STORY & DECRYPTED LETTER TO DOM ---
    const brandCoupleNames = document.getElementById('brandCoupleNames');
    if (brandCoupleNames) brandCoupleNames.textContent = 'LoveStory';

    const heroHerName = document.getElementById('heroHerName');
    if (heroHerName) heroHerName.textContent = COUPLE_DATA.herName;

    const envelopeToName = document.getElementById('envelopeToName');
    if (envelopeToName) envelopeToName.textContent = COUPLE_DATA.herName;

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
      footerNamesDisplay.textContent = `${COUPLE_DATA.hisName} (2001) & ${COUPLE_DATA.herName} (1999) • Since 31.08.2026`;
    }

    const counterStartDateLabel = document.getElementById('counterStartDateLabel');
    if (counterStartDateLabel) {
      counterStartDateLabel.textContent = `Tính từ ngày 31 tháng 08, 2026 ✦ Từng giây từng phút đều trân quý`;
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

    // --- C. FLOATING AUDIO PLAYER (Hayd - Head In The Clouds) ---
    const floatingAudioBar = document.getElementById('floatingAudioBar');
    const audioPlayBtn = document.getElementById('audioPlayBtn');
    const audioPlayIcon = document.getElementById('audioPlayIcon');
    const audioPauseIcon = document.getElementById('audioPauseIcon');
    const audioCurrentTime = document.getElementById('audioCurrentTime');
    const audioDuration = document.getElementById('audioDuration');
    const audioProgressContainer = document.getElementById('audioProgressContainer');
    const audioProgressFill = document.getElementById('audioProgressFill');
    const audioMuteBtn = document.getElementById('audioMuteBtn');
    const audioVolIcon = document.getElementById('audioVolIcon');
    const audioVolumeSlider = document.getElementById('audioVolumeSlider');
    const audioSettingsBtn = document.getElementById('audioSettingsBtn');
    const audioCollapseBtn = document.getElementById('audioCollapseBtn');
    const collapseIcon = document.getElementById('collapseIcon');

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

    let audioCtx = null;
    let masterGainNode = null;
    let isPlayingMusic = false;
    let synthInterval = null;
    let progressInterval = null;

    const FALLBACK_DURATION = 165; // Hayd - Head In The Clouds (~2:45)
    let currentElapsed = 0;
    let currentVolume = 0.75;
    let isMuted = false;
    let lastVolume = 75;

    // Web Audio synthesizer (romantic arpeggiated piano fallback)
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 329.63], // G6
      [164.81, 196.00, 246.94, 293.66], // Em7
      [220.00, 261.63, 329.63, 392.00]  // Am7
    ];
    let chordIndex = 0;

    function initAudio() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        masterGainNode = audioCtx.createGain();
        masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
        masterGainNode.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playTone(freq, time, duration = 3.5, volume = 0.05) {
      if (!audioCtx || !masterGainNode) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainNode);

      osc.start(time);
      osc.stop(time + duration + 0.1);
    }

    function playArpeggiatedChord() {
      if (!isPlayingMusic || !audioCtx) return;
      const currentChord = chords[chordIndex % chords.length];
      const now = audioCtx.currentTime;

      currentChord.forEach((note, i) => {
        playTone(note, now + i * 0.18, 4.0, 0.045);
      });

      if (Math.random() > 0.4) {
        const highNote = currentChord[Math.floor(Math.random() * currentChord.length)] * 2;
        playTone(highNote, now + 1.2, 3.0, 0.025);
      }

      chordIndex++;
    }

    function startSynthFallback() {
      if (synthInterval) return;
      initAudio();
      playArpeggiatedChord();
      synthInterval = setInterval(playArpeggiatedChord, 3800);
    }

    function stopSynthFallback() {
      if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
    }

    function formatTimeTrack(seconds) {
      if (isNaN(seconds) || seconds < 0) seconds = 0;
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function updateTrackProgress() {
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
    }

    function startProgressTicker() {
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
    }

    function stopProgressTicker() {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    }

    function updateAudioUI(playing) {
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
    }

    startMusic = function() {
      isPlayingMusic = true;
      updateAudioUI(true);

      if (ytPlayer && ytPlayerReady && typeof ytPlayer.playVideo === 'function') {
        try {
          ytPlayer.playVideo();
        } catch (e) {
          console.warn('ytPlayer.playVideo exception:', e);
          startSynthFallback();
        }
      } else {
        pendingPlay = true;
        // Fallback after 4s if YouTube player doesn't become available
        setTimeout(() => {
          if (pendingPlay && (!ytPlayer || !ytPlayerReady)) {
            startSynthFallback();
          }
        }, 4000);
      }

      startProgressTicker();
    };

    function stopMusic() {
      isPlayingMusic = false;
      pendingPlay = false;
      updateAudioUI(false);

      if (ytPlayer && ytPlayerReady && typeof ytPlayer.pauseVideo === 'function') {
        try {
          ytPlayer.pauseVideo();
        } catch (e) {
          console.warn('ytPlayer.pauseVideo exception:', e);
        }
      }
      stopSynthFallback();
      stopProgressTicker();
    }

    handleYTStateChange = function(state) {
      // 1: PLAYING, 2: PAUSED, 0: ENDED
      if (state === 1) { // PLAYING
        isPlayingMusic = true;
        updateAudioUI(true);
        stopSynthFallback();
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
    };

    handleYTError = function(err) {
      console.warn('YouTube Player error code:', err ? err.data : 'unknown', '- switching to synth fallback');
      if (isPlayingMusic) {
        startSynthFallback();
      }
    };

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
        if (masterGainNode && audioCtx) {
          masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
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
          if (masterGainNode && audioCtx) {
            masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
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
          if (masterGainNode && audioCtx) {
            masterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
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

    // --- C2. DYNAMIC MUSIC SWITCHER & SUPABASE SYNC ---
    function applyMusicConfig(config, shouldPlay = true) {
      if (!config || !config.videoId) return;
      currentMusicConfig = config;

      const titleEl = document.getElementById('audioTrackTitle') || document.querySelector('.audio-title');
      const artistEl = document.querySelector('.audio-artist');
      const discEl = document.getElementById('audioDisc');

      if (titleEl) titleEl.textContent = config.title;
      if (artistEl) artistEl.textContent = config.artist;
      if (discEl) discEl.title = `Đang phát nhạc: ${config.title} - ${config.artist}`;

      if (ytPlayer && ytPlayerReady && typeof ytPlayer.loadVideoById === 'function') {
        if (shouldPlay) {
          try {
            ytPlayer.loadVideoById(config.videoId);
            ytPlayer.playVideo();
            isPlayingMusic = true;
            updateAudioUI(true);
          } catch (e) {
            console.warn('loadVideoById error:', e);
          }
        } else if (typeof ytPlayer.cueVideoById === 'function') {
          try {
            ytPlayer.cueVideoById(config.videoId);
          } catch (e) {
            console.warn('cueVideoById error:', e);
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
      // 1. Check local storage first
      const local = getLocalMusicConfig();
      if (local && local.videoId) {
        applyMusicConfig(local, false);
      }

      // 2. Fetch remote config from Supabase
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
              applyMusicConfig(remoteConfig, isDifferent && isPlayingMusic);
              localStorage.setItem('lovestory_music_config', JSON.stringify(remoteConfig));
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
    applyMusicConfig(currentMusicConfig, false);

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
        console.warn('Lỗi lưu local memories:', e);
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

    const memoryEditId = document.getElementById('memoryEditId');
    const memoryCaptionInput = document.getElementById('memoryCaptionInput');
    const memoryDateInput = document.getElementById('memoryDateInput');
    const memoryImageUrlInput = document.getElementById('memoryImageUrlInput');
    const memoryFileInput = document.getElementById('memoryFileInput');
    const memoryFileNameHint = document.getElementById('memoryFileNameHint');
    const memoryOrderInput = document.getElementById('memoryOrderInput');
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
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('memories')
          .select('*')
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: true });

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
    }

    function renderMemories(memories) {
      if (!polaroidGrid) return;
      polaroidGrid.innerHTML = '';

      if (!memories || memories.length === 0) {
        polaroidGrid.innerHTML = `
          <div class="empty-memories-notice">
            <span class="empty-icon">📸</span>
            <p>Chưa có kỷ niệm nào trong album. Hãy nhấn nút "+ Thêm Kỷ Niệm Mới" để lưu giữ khoảnh khắc ngọt ngào nhé!</p>
          </div>
        `;
        return;
      }

      memories.forEach((mem, index) => {
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

        polaroidGrid.appendChild(card);
      });

      initPolaroidTilt();
    }

    function initPolaroidTilt() {
      const cards = document.querySelectorAll('.polaroid-card');
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
      if (memoryOrderInput) memoryOrderInput.value = (currentMemories.length + 1);
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
      if (memoryOrderInput) memoryOrderInput.value = mem.order_index || 1;

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
      memoryFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (memoryFileNameHint) memoryFileNameHint.textContent = `Đã chọn: ${file.name}`;

        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          if (memoryImageUrlInput) memoryImageUrlInput.value = base64;
          if (memoryPreviewImg && memoryPreviewWrap) {
            memoryPreviewImg.src = base64;
            memoryPreviewWrap.style.display = 'block';
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (memoryForm) {
      memoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const editId = (memoryEditId && memoryEditId.value) || '';
        const caption = (memoryCaptionInput && memoryCaptionInput.value.trim()) || '';
        const date = (memoryDateInput && memoryDateInput.value.trim()) || '';
        const imageUrl = (memoryImageUrlInput && memoryImageUrlInput.value.trim()) || '';
        const orderIndex = parseInt((memoryOrderInput && memoryOrderInput.value) || '1', 10);

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
                  image_url: imageUrl,
                  order_index: orderIndex
                })
                .eq('id', editId);

              if (error) throw error;
            } else if (supabaseClient) {
              const { error } = await supabaseClient
                .from('memories')
                .insert([{
                  caption: caption,
                  date: date,
                  image_url: imageUrl,
                  order_index: orderIndex
                }]);

              if (error) throw error;
            }

            const targetIdx = currentMemories.findIndex(m => String(m.id) === String(editId));
            if (targetIdx !== -1) {
              currentMemories[targetIdx] = {
                ...currentMemories[targetIdx],
                caption,
                date,
                image_url: imageUrl,
                order_index: orderIndex
              };
            }
            saveLocalMemories(currentMemories);
          } else {
            if (supabaseClient) {
              const { error } = await supabaseClient
                .from('memories')
                .insert([{
                  caption: caption,
                  date: date,
                  image_url: imageUrl,
                  order_index: orderIndex
                }]);

              if (error) throw error;
            } else {
              currentMemories.push({
                id: 'local-' + Date.now(),
                caption,
                date,
                image_url: imageUrl,
                order_index: orderIndex
              });
              saveLocalMemories(currentMemories);
            }
          }

          closeMemoryModal();
          await fetchMemories();

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
                image_url: imageUrl,
                order_index: orderIndex
              };
              saveLocalMemories(currentMemories);
              renderMemories(currentMemories);
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

        if (isSupabaseId) {
          await fetchMemories();
        }
      } catch (err) {
        console.error('Lỗi khi xóa kỷ niệm:', err);
        currentMemories = currentMemories.filter(m => String(m.id) !== String(id));
        saveLocalMemories(currentMemories);
        renderMemories(currentMemories);
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

    // --- F. 3D FLIP CARDS ("REASONS WHY I LOVE YOU") ---
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });

    // --- G. INTERACTIVE LOVE NOTES WALL (SUPABASE DATABASE) ---
    const noteAuthorInput = document.getElementById('noteAuthorInput');
    const noteContentInput = document.getElementById('noteContentInput');
    const sendNoteBtn = document.getElementById('sendNoteBtn');
    const notesWall = document.getElementById('notesWall');

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
        console.warn('Lỗi lưu local notes:', e);
      }
    }

    async function fetchLoveNotes() {
      if (!notesWall) return;

      if (!supabaseClient) {
        console.warn('Supabase client chưa khởi tạo, hiển thị lời nhắn từ local storage.');
        appNotes = loadLocalNotes();
        renderNotes();
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
        } else if (data && data.length > 0) {
          const userNotes = data.filter(item => item.author !== '__CONFIG_MUSIC__');
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
        } else {
          appNotes = [...DEFAULT_NOTES];
        }
      } catch (err) {
        console.error('Lỗi kết nối Supabase love_notes:', err);
        appNotes = loadLocalNotes();
      }

      renderNotes();
    }

    async function deleteNote(id) {
      if (!confirm('Bạn có chắc muốn xóa lời nhắn này không?')) return;
      try {
        if (supabaseClient && !String(id).startsWith('local-')) {
          const { error } = await supabaseClient
            .from('love_notes')
            .delete()
            .eq('id', id);
          if (error) throw error;
        } else {
          appNotes = appNotes.filter(n => n.id !== id);
          saveLocalNotes();
        }
        await fetchLoveNotes();
      } catch (err) {
        console.error('Lỗi khi xóa lời nhắn:', err);
        alert('Không thể xóa: ' + (err.message || err));
      }
    }

    function renderNotes() {
      if (!notesWall) return;
      notesWall.innerHTML = '';

      if (!appNotes || appNotes.length === 0) {
        notesWall.innerHTML = `
          <div class="notes-empty-state">
            <p>Chưa có lời nhắn nào được ghim. Hãy gửi lời nhắn đầu tiên đến người thương nhé! 💌</p>
          </div>
        `;
        return;
      }

      const rotations = [-2, 1.8, -1.5, 2.2, -1.8, 1.5];
      const tapeColors = ['#ffd166', '#ff70a6', '#70e4d0', '#c77dff', '#ff8fab'];

      appNotes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'sticky-note note-card';

        const rot = rotations[index % rotations.length];
        const tapeColor = tapeColors[index % tapeColors.length];
        card.style.transform = `rotate(${rot}deg)`;

        card.innerHTML = `
          <div class="note-tape" style="background:${tapeColor};"></div>
          <button class="btn-delete-note" title="Xóa lời nhắn này" data-id="${escapeHTML(note.id || '')}">✕</button>
          <p class="sticky-text note-text font-mali">"${escapeHTML(note.text)}"</p>
          <div class="sticky-footer note-footer">
            <span class="sticky-author note-author font-title">✦ ${escapeHTML(note.author)}</span>
            <span class="sticky-date note-date">${escapeHTML(note.date || '')}</span>
          </div>
        `;

        const delBtn = card.querySelector('.btn-delete-note');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNote(note.id);
          });
        }

        notesWall.appendChild(card);
      });
    }

    if (sendNoteBtn) {
      sendNoteBtn.addEventListener('click', async () => {
        const author = (noteAuthorInput && noteAuthorInput.value.trim()) || 'Người Giấu Tên';
        const text = (noteContentInput && noteContentInput.value.trim()) || '';

        if (!text) {
          alert('Vui lòng viết một lời nhắn gửi ngọt ngào nhé!');
          if (noteContentInput) noteContentInput.focus();
          return;
        }

        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const originalBtnHTML = sendNoteBtn.innerHTML;
        sendNoteBtn.disabled = true;
        sendNoteBtn.innerHTML = '<span>Đang gửi lời nhắn... 💌</span>';

        try {
          if (supabaseClient) {
            const { error } = await supabaseClient
              .from('love_notes')
              .insert([{
                author: author,
                content: text,
                text: text,
                date: dateStr
              }]);

            if (error) throw error;
            await fetchLoveNotes();
          } else {
            appNotes.unshift({
              id: 'local-' + Date.now(),
              author,
              text,
              date: dateStr
            });
            saveLocalNotes();
            renderNotes();
          }

          if (noteContentInput) noteContentInput.value = '';

          if (typeof confetti === 'function') {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#ff70a6', '#ffd166', '#70e4d0', '#ff8fab']
            });
          }
        } catch (err) {
          console.error('Lỗi khi lưu lời nhắn vào Supabase:', err);
          alert('Không thể lưu lời nhắn: ' + (err.message || err));
        } finally {
          sendNoteBtn.disabled = false;
          sendNoteBtn.innerHTML = originalBtnHTML;
        }
      });
    }

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
          .on('postgres_changes', { event: '*', schema: 'public', table: 'memories' }, () => {
            fetchMemories();
          })
          .subscribe();
      } catch (e) {
        console.warn('Realtime memories subscription error:', e);
      }
    }

    // --- I. MOBILE BOTTOM NAV OBSERVER ---
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const trackedSections = document.querySelectorAll('section[id]');

    if (mobileNavItems.length && 'IntersectionObserver' in window) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            mobileNavItems.forEach(item => {
              const href = item.getAttribute('href');
              if (href === `#${id}`) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -40% 0px'
      });

      trackedSections.forEach(section => navObserver.observe(section));
    }

    // Trigger initial data load from Supabase
    fetchMemories();
    fetchLoveNotes();
    loadMusicFromDatabase();
  }

});

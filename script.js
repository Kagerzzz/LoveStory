/**
 * 30 DAYS OF US — ROMANTIC ANNIVERSARY INTERACTIVE SCRIPT
 * Features:
 * - Light Mode / Dark Mode switcher with persistent theme storage
 * - Real-time Live Love Counter
 * - Web Audio API Ambient Romantic Melody
 * - Floating Amber/Stardust/Heart Canvas Animation (adapts to Light & Dark Mode)
 * - Interactive 3D Envelope Unfold
 * - Polaroid 3D Tilt, Lightbox & Custom Image Upload (with localStorage)
 * - 3D Card Flipping & Gift Box Confetti Explosion
 * - Dynamic Couple Customizer (Names, Date, Letter, Love Notes)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. LIGHT / DARK THEME MANAGER (Default: Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  let currentTheme = localStorage.getItem('anniversary_theme_mode') || 'light';

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('anniversary_theme_mode', theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Chuyển sang chế độ Sáng (Light Mode)' : 'Chuyển sang chế độ Tối (Dark Mode)'
      );
    }
  }

  // Initialize theme
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);

      // Cute micro sparkle when switching theme
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.1, x: 0.9 },
          colors: newTheme === 'light' ? ['#d64d72', '#b8823b', '#fff'] : ['#e8c89a', '#e5989b', '#7a1f36']
        });
      }
    });
  }

  // ==========================================
  // 1. STATE & LOCAL STORAGE INITIALIZATION
  // ==========================================
  const DEFAULT_CONFIG = {
    hisName: 'Minh Quân',
    herName: 'Phương Linh',
    startDate: '2026-08-25T00:00:00',
    letterDate: '24 Tháng 09, 2026',
    letterSalutation: 'Gửi Em, Cô Gái Bé Nhỏ Của Anh,',
    letterBody: `Hôm nay là tròn 30 ngày kể từ khoảnh khắc anh lấy hết dũng khí để nắm lấy tay em và nói ra những điều ấp ủ bấy lâu. Một tháng — đối với thế giới có thể chỉ là một cái chớp mắt, nhưng với anh, đó là 30 ngày tràn ngập những nụ cười, những rung động ngọt ngào và những bình yên mà anh chưa từng có trước đây.\n\nAnh nhớ từng buổi tối hai đứa ngồi bên cốc cafe ấm, ánh đèn vàng hắt nhẹ lên khuôn mặt em; nhớ từng cuộc gọi nửa đêm kể đủ thứ chuyện không đầu không cuối; và nhớ nhất là nụ cười rạng rỡ của em mỗi khi nhìn thấy anh.\n\nCảm ơn em vì đã đồng ý bước vào thế giới của anh, bao dung những vụng về của anh và cho anh cơ hội được yêu thương em. 1 tháng mới chỉ là chương mở đầu cho một cuốn sách dài vô tận của chúng ta. Anh muốn cùng em đi qua tháng thứ hai, năm đầu tiên, và thật nhiều năm tháng rực rỡ phía trước nữa.`,
    letterSignature: 'Minh Quân',
    notes: [
      {
        author: 'Phương Linh',
        text: 'Cảm ơn anh vì 1 tháng qua đã luôn cưng chiều và nhường nhịn em. Yêu anh rất nhiều! ♥',
        date: '24.09.2026 09:30'
      },
      {
        author: 'Minh Quân',
        text: 'Nắm tay anh thật chặt nhé, dù có bão giông thì phía sau lưng em luôn có anh.',
        date: '24.09.2026 10:15'
      },
      {
        author: 'Hai Đứa Mình',
        text: 'Kỷ niệm 1 tháng ngọt ngào! Mục tiêu tiếp theo: 100 ngày, 1 năm, và mãi mãi!',
        date: '24.09.2026 11:00'
      }
    ]
  };

  let appConfig = loadConfig();

  function loadConfig() {
    try {
      const saved = localStorage.getItem('anniversary_config_v1');
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Error reading localStorage:', e);
    }
    return { ...DEFAULT_CONFIG };
  }

  function saveConfig() {
    try {
      localStorage.setItem('anniversary_config_v1', JSON.stringify(appConfig));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
    applyConfigToDOM();
  }

  function applyConfigToDOM() {
    // Brand & Intro
    const brandCoupleNames = document.getElementById('brandCoupleNames');
    if (brandCoupleNames) {
      const hisShort = appConfig.hisName.split(' ').pop();
      const herShort = appConfig.herName.split(' ').pop();
      brandCoupleNames.textContent = `${hisShort} & ${herShort}`;
    }

    const introNamesDisplay = document.getElementById('introNamesDisplay');
    if (introNamesDisplay) {
      introNamesDisplay.textContent = `${appConfig.hisName} & ${appConfig.herName}`;
    }

    const heroHerName = document.getElementById('heroHerName');
    if (heroHerName) heroHerName.textContent = appConfig.herName;

    const envelopeToName = document.getElementById('envelopeToName');
    if (envelopeToName) envelopeToName.textContent = appConfig.herName;

    // Love Letter
    const letterDateDisplay = document.getElementById('letterDateDisplay');
    if (letterDateDisplay) letterDateDisplay.textContent = appConfig.letterDate;

    const letterDearText = document.getElementById('letterDearText');
    if (letterDearText) letterDearText.textContent = appConfig.letterSalutation;

    const letterBodyContent = document.getElementById('letterBodyContent');
    if (letterBodyContent) {
      const paragraphs = appConfig.letterBody.split('\n\n').filter(p => p.trim());
      letterBodyContent.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
    }

    const letterSignature = document.getElementById('letterSignature');
    if (letterSignature) letterSignature.textContent = appConfig.letterSignature;

    // Vows Certificate
    const certHisName = document.getElementById('certHisName');
    if (certHisName) certHisName.textContent = appConfig.hisName;

    const certHerName = document.getElementById('certHerName');
    if (certHerName) certHerName.textContent = appConfig.herName;

    // Footer
    const footerNamesDisplay = document.getElementById('footerNamesDisplay');
    if (footerNamesDisplay) {
      footerNamesDisplay.textContent = `${appConfig.hisName} & ${appConfig.herName} • Since ${formatDateShort(appConfig.startDate)}`;
    }

    // Counter label
    const counterStartDateLabel = document.getElementById('counterStartDateLabel');
    if (counterStartDateLabel) {
      const d = new Date(appConfig.startDate);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      counterStartDateLabel.textContent = `Tính từ ngày ${day} tháng ${month}, ${year} ✦ Từng giây từng phút đều trân quý`;
    }

    renderNotes();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${d.getFullYear()}`;
  }

  // ==========================================
  // 2. LIVE LOVE COUNTER
  // ==========================================
  const cntDays = document.getElementById('cntDays');
  const cntHours = document.getElementById('cntHours');
  const cntMinutes = document.getElementById('cntMinutes');
  const cntSeconds = document.getElementById('cntSeconds');

  function updateLoveCounter() {
    const start = new Date(appConfig.startDate).getTime();
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

  // ==========================================
  // 3. CURTAIN INTRO SCREEN & AUDIO TRIGGER
  // ==========================================
  const introScreen = document.getElementById('introScreen');
  const enterBtn = document.getElementById('enterBtn');
  const introSeal = document.getElementById('introSeal');

  function dismissIntro() {
    if (!introScreen) return;
    introScreen.classList.add('hide');
    
    // Launch celebratory gentle confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e8c89a', '#e5989b', '#f7dfbe']
      });
    }

    // Start background music
    startMusic();
  }

  if (enterBtn) enterBtn.addEventListener('click', dismissIntro);
  if (introSeal) introSeal.addEventListener('click', dismissIntro);

  // ==========================================
  // 4. ROMANTIC AMBIENT SOUNDSCAPE (Web Audio API Synth)
  // ==========================================
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const vinylMini = document.getElementById('vinylMini');
  const equalizer = document.getElementById('equalizer');

  let audioCtx = null;
  let isPlayingMusic = false;
  let synthInterval = null;

  // Gentle romantic chord progression: Fmaj7 -> G6 -> Em7 -> Am7
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
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, time, duration = 3.5, volume = 0.05) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Warm Rhodes / Lofi Piano-like sound
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

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

    // Occasional gentle high sparkle note
    if (Math.random() > 0.4) {
      const highNote = currentChord[Math.floor(Math.random() * currentChord.length)] * 2;
      playTone(highNote, now + 1.2, 3.0, 0.025);
    }

    chordIndex++;
  }

  function startMusic() {
    initAudio();
    if (isPlayingMusic) return;
    isPlayingMusic = true;

    if (vinylMini) vinylMini.classList.add('spinning');
    if (equalizer) equalizer.classList.add('active');

    playArpeggiatedChord();
    synthInterval = setInterval(playArpeggiatedChord, 3800);
  }

  function stopMusic() {
    isPlayingMusic = false;
    if (synthInterval) clearInterval(synthInterval);
    if (vinylMini) vinylMini.classList.remove('spinning');
    if (equalizer) equalizer.classList.remove('active');
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlayingMusic) {
        stopMusic();
      } else {
        startMusic();
      }
    });
  }

  // ==========================================
  // 5. INTERACTIVE LOVE ENVELOPE (Unfolding 3D)
  // ==========================================
  const envelope = document.getElementById('envelope');
  const envelopeClosedDecor = document.getElementById('envelopeClosedDecor');
  const sealBtn = document.getElementById('sealBtn');
  const toggleLetterBtn = document.getElementById('toggleLetterBtn');
  const letterBtnText = document.getElementById('letterBtnText');

  let letterOpened = false;

  function toggleLetter() {
    if (!envelope) return;
    letterOpened = !letterOpened;
    envelope.classList.toggle('is-open', letterOpened);

    if (letterBtnText) {
      letterBtnText.textContent = letterOpened ? 'Gấp thư lại ♥' : 'Mở phong thư để đọc';
    }

    if (letterOpened && typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#df7b93', '#f7a8ba', '#cfa170', '#ffffff']
      });
    }
  }

  if (sealBtn) sealBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLetter();
  });
  if (envelopeClosedDecor) envelopeClosedDecor.addEventListener('click', toggleLetter);
  if (toggleLetterBtn) toggleLetterBtn.addEventListener('click', toggleLetter);

  // ==========================================
  // 6. POLAROID 3D TILT, LIGHTBOX & CUSTOM IMAGES
  // ==========================================
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  // Load saved custom polaroid photos from localStorage
  function loadSavedPolaroids() {
    try {
      const savedPhotos = JSON.parse(localStorage.getItem('custom_polaroid_photos') || '{}');
      polaroids.forEach(card => {
        const id = card.getAttribute('data-id');
        if (savedPhotos[id]) {
          const img = card.querySelector('.polaroid-img');
          if (img) img.src = savedPhotos[id];
        }
      });
    } catch (e) {
      console.warn('Error loading custom polaroid photos:', e);
    }
  }

  loadSavedPolaroids();

  // 3D Mouse Tilt
  polaroids.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // Click to view in Lightbox (unless clicking swap photo button)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-swap-photo')) return;
      const img = card.querySelector('.polaroid-img');
      const caption = card.querySelector('.caption-text');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
        if (lightboxModal) lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxCloseBtn && lightboxModal) {
    lightboxCloseBtn.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
  }

  // Individual photo replacement
  const singlePhotoInput = document.getElementById('singlePhotoInput');
  let currentTargetPolaroidId = null;

  document.querySelectorAll('.btn-swap-photo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentTargetPolaroidId = btn.getAttribute('data-target-id');
      if (singlePhotoInput) singlePhotoInput.click();
    });
  });

  if (singlePhotoInput) {
    singlePhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && currentTargetPolaroidId) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          const targetCard = document.querySelector(`.polaroid-card[data-id="${currentTargetPolaroidId}"]`);
          if (targetCard) {
            const img = targetCard.querySelector('.polaroid-img');
            if (img) img.src = base64;
          }
          savePolaroidPhoto(currentTargetPolaroidId, base64);
        };
        reader.readAsDataURL(file);
      }
      singlePhotoInput.value = '';
    });
  }

  // Batch photo upload
  const batchPhotoInput = document.getElementById('batchPhotoInput');
  if (batchPhotoInput) {
    batchPhotoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      files.forEach((file, index) => {
        if (index >= polaroids.length) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          const card = polaroids[index];
          if (card) {
            const img = card.querySelector('.polaroid-img');
            if (img) img.src = base64;
            const id = card.getAttribute('data-id');
            savePolaroidPhoto(id, base64);
          }
        };
        reader.readAsDataURL(file);
      });
      batchPhotoInput.value = '';
    });
  }

  function savePolaroidPhoto(id, dataUrl) {
    try {
      const savedPhotos = JSON.parse(localStorage.getItem('custom_polaroid_photos') || '{}');
      savedPhotos[id] = dataUrl;
      localStorage.setItem('custom_polaroid_photos', JSON.stringify(savedPhotos));
    } catch (e) {
      console.warn('Storage quota exceeded, photo preview active in memory:', e);
    }
  }

  // Reset photos
  const resetPhotosBtn = document.getElementById('resetPhotosBtn');
  if (resetPhotosBtn) {
    resetPhotosBtn.addEventListener('click', () => {
      if (confirm('Khôi phục lại ảnh kỷ niệm mẫu ban đầu?')) {
        localStorage.removeItem('custom_polaroid_photos');
        location.reload();
      }
    });
  }

  // ==========================================
  // 7. 3D FLIP CARDS ("REASONS WHY I LOVE YOU")
  // ==========================================
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });

  // ==========================================
  // 8. SURPRISE GIFT BOX & LOVE VOWS CERTIFICATE
  // ==========================================
  const giftBox = document.getElementById('giftBox');
  const openGiftBtn = document.getElementById('openGiftBtn');
  const vowsCertificate = document.getElementById('vowsCertificate');

  let giftOpened = false;

  function triggerGiftOpening() {
    if (giftOpened) return;
    giftOpened = true;

    if (giftBox) giftBox.classList.add('opened');
    if (openGiftBtn) openGiftBtn.style.display = 'none';

    // Massive Romantic Confetti blast
    if (typeof confetti === 'function') {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#e8c89a', '#d4af37']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#e5989b', '#ba2847']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        colors: ['#ffffff', '#f5dfbe']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }

    setTimeout(() => {
      if (vowsCertificate) {
        vowsCertificate.classList.add('show');
        vowsCertificate.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
  }

  if (giftBox) giftBox.addEventListener('click', triggerGiftOpening);
  if (openGiftBtn) openGiftBtn.addEventListener('click', triggerGiftOpening);

  // ==========================================
  // 9. INTERACTIVE NOTES WALL
  // ==========================================
  const noteAuthorInput = document.getElementById('noteAuthorInput');
  const noteContentInput = document.getElementById('noteContentInput');
  const sendNoteBtn = document.getElementById('sendNoteBtn');
  const notesWall = document.getElementById('notesWall');

  function renderNotes() {
    if (!notesWall) return;
    notesWall.innerHTML = '';
    appConfig.notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.className = 'sticky-note';
      noteEl.innerHTML = `
        <p class="sticky-text">"${escapeHTML(note.text)}"</p>
        <div class="sticky-footer">
          <span class="sticky-author">♥ ${escapeHTML(note.author)}</span>
          <span class="sticky-date">${escapeHTML(note.date)}</span>
        </div>
      `;
      notesWall.appendChild(noteEl);
    });
  }

  if (sendNoteBtn) {
    sendNoteBtn.addEventListener('click', () => {
      const author = (noteAuthorInput.value || '').trim() || 'Người Giấu Tên';
      const text = (noteContentInput.value || '').trim();

      if (!text) {
        alert('Vui lòng viết một lời nhắn gửi ngọt ngào nhé!');
        return;
      }

      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      appConfig.notes.unshift({
        author,
        text,
        date: dateStr
      });

      saveConfig();
      noteContentInput.value = '';

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#e5989b', '#e8c89a']
        });
      }
    });
  }

  // ==========================================
  // 10. CUSTOMIZATION / SETTINGS MODAL
  // ==========================================
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

  const inputHisName = document.getElementById('inputHisName');
  const inputHerName = document.getElementById('inputHerName');
  const inputStartDate = document.getElementById('inputStartDate');
  const inputLetterBody = document.getElementById('inputLetterBody');

  function openSettings() {
    if (!settingsModal) return;
    if (inputHisName) inputHisName.value = appConfig.hisName;
    if (inputHerName) inputHerName.value = appConfig.herName;
    if (inputStartDate) {
      const d = new Date(appConfig.startDate);
      if (!isNaN(d.getTime())) {
        inputStartDate.value = d.toISOString().split('T')[0];
      }
    }
    if (inputLetterBody) inputLetterBody.value = appConfig.letterBody;
    settingsModal.classList.add('active');
  }

  function closeSettings() {
    if (settingsModal) settingsModal.classList.remove('active');
  }

  if (openSettingsBtn) openSettingsBtn.addEventListener('click', openSettings);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettings();
    });
  }

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const his = (inputHisName.value || '').trim();
      const her = (inputHerName.value || '').trim();
      const dateVal = inputStartDate.value;
      const letter = (inputLetterBody.value || '').trim();

      if (his) appConfig.hisName = his;
      if (her) appConfig.herName = her;
      if (dateVal) appConfig.startDate = `${dateVal}T00:00:00`;
      if (letter) appConfig.letterBody = letter;

      appConfig.letterSignature = appConfig.hisName;
      saveConfig();
      updateLoveCounter();
      closeSettings();

      alert('Đã cập nhật thông tin kỷ niệm của hai bạn thành công! ✨');
    });
  }

  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', () => {
      if (confirm('Khôi phục lại toàn bộ nội dung mặc định?')) {
        localStorage.removeItem('anniversary_config_v1');
        appConfig = { ...DEFAULT_CONFIG };
        saveConfig();
        updateLoveCounter();
        closeSettings();
        location.reload();
      }
    });
  }

  // ==========================================
  // 11. CUSTOM MOUSE CURSOR TRAIL
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');

  let mouseX = -100, mouseY = -100;
  let glowX = -100, glowY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // ==========================================
  // 12. AMBIENT GOLDEN FIREFLIES & HEARTS CANVAS
  // ==========================================
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const PARTICLE_COUNT = 45;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2.5 + 1;
        this.speedY = Math.random() * 0.6 + 0.25;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        this.isHeart = Math.random() < 0.14; // 14% chance to be a floating heart
        this.wobble = Math.random() * Math.PI * 2;
      }

      getColor() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
          return Math.random() > 0.4 ? '223, 123, 147' : '207, 161, 112';
        } else {
          return Math.random() > 0.4 ? '242, 155, 176' : '223, 184, 142';
        }
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
  // 13. MOBILE BOTTOM NAVIGATION ACTIVE TRACKER
  // ==========================================
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

  // Initial apply
  applyConfigToDOM();

});

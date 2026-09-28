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
  // 1. STORY & COUPLE DATA (FIXED & CLEAN)
  // ==========================================
  const COUPLE_DATA = {
    hisName: 'Thân Hiếu',
    herName: 'Khánh Linh',
    startDate: '2026-08-31T00:00:00',
    letterDate: 'Since 31 Tháng 08, 2026',
    letterSalutation: 'Gửi Khánh Linh — Cô gái xinh xắn chân dài của anh,',
    letterBody: `Người ta thường bảo duyên số là do trời định, nhưng anh nghĩ vũ trụ đã ưu ái anh quá nhiều vào buổi chiều ngày 17/07 hôm ấy trên sân pickleball. Trong đám đông, anh lập tức bị thu hút bởi một cô bé vừa xinh xắn, dễ thương lại sở hữu đôi chân dài miên man. Buổi đầu tiên ấy, vì ngại ngùng nên anh còn chẳng dám lại gần xin cách liên lạc, cứ ngỡ mình đã bỏ lỡ một điều tuyệt vời...\n\nThế nhưng định mệnh thật khéo sắp đặt! Bằng một cơ duyên tình cờ, anh gặp lại bạn của em trên sân pick, và thế là bằng mọi cách anh đã có được info của em. Để rồi ngày 12/08 định mệnh, buổi hẹn chơi pickleball riêng đầu tiên của hai đứa đã diễn ra. Nhớ hôm đó, đánh bóng thì ít mà hai đứa đi nói chuyện tới tận 12h đêm thì nhiều! Chưa bao giờ anh thấy mình nói chuyện với ai mà lại hợp cạ, cười nhiều và tự nhiên đến thế.\n\nTừ hôm ấy là chuỗi ngày những buổi hẹn hò không dứt, những đêm thức khuya deeptalk từ chuyện trên trời dưới biển đến chuyện tương lai mà không biết chán. Dù em hơn anh 2 tuổi (1999 & 2001), nhưng ở bên em, anh vừa thấy được sự ngọt ngào, tinh tế, vừa thấy một cô người yêu bé bỏng mà anh muốn che chở cả đời. Chuyến đi du lịch biển cuối tháng 8 và khoảnh khắc tỏ tình ngày 31/08/2026 là ngày hạnh phúc nhất cuộc đời anh. Cảm ơn em vì đã đến bên anh, làm đồng đội trên sân pickleball và làm người bạn đời tuyệt vời nhất của anh!`,
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

  function applyStoryToDOM() {
    // Brand & Intro
    const brandCoupleNames = document.getElementById('brandCoupleNames');
    if (brandCoupleNames) brandCoupleNames.textContent = 'Hiếu & Linh';

    const introNamesDisplay = document.getElementById('introNamesDisplay');
    if (introNamesDisplay) introNamesDisplay.textContent = '✦ Our Love Story ✦';

    const heroHerName = document.getElementById('heroHerName');
    if (heroHerName) heroHerName.textContent = COUPLE_DATA.herName;

    const envelopeToName = document.getElementById('envelopeToName');
    if (envelopeToName) envelopeToName.textContent = COUPLE_DATA.herName;

    // Love Letter
    const letterDateDisplay = document.getElementById('letterDateDisplay');
    if (letterDateDisplay) letterDateDisplay.textContent = COUPLE_DATA.letterDate;

    const letterDearText = document.getElementById('letterDearText');
    if (letterDearText) letterDearText.textContent = COUPLE_DATA.letterSalutation;

    const letterBodyContent = document.getElementById('letterBodyContent');
    if (letterBodyContent) {
      const paragraphs = COUPLE_DATA.letterBody.split('\n\n').filter(p => p.trim());
      letterBodyContent.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
    }

    const letterSignature = document.getElementById('letterSignature');
    if (letterSignature) letterSignature.textContent = COUPLE_DATA.letterSignature;

    // Vows Certificate
    const certHisName = document.getElementById('certHisName');
    if (certHisName) certHisName.textContent = COUPLE_DATA.hisName;

    const certHerName = document.getElementById('certHerName');
    if (certHerName) certHerName.textContent = COUPLE_DATA.herName;

    // Footer
    const footerNamesDisplay = document.getElementById('footerNamesDisplay');
    if (footerNamesDisplay) {
      footerNamesDisplay.textContent = `${COUPLE_DATA.hisName} (2001) & ${COUPLE_DATA.herName} (1999) • Since 31.08.2026`;
    }

    // Counter label
    const counterStartDateLabel = document.getElementById('counterStartDateLabel');
    if (counterStartDateLabel) {
      counterStartDateLabel.textContent = `Tính từ ngày 31 tháng 08, 2026 ✦ Từng giây từng phút đều trân quý`;
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

  // ==========================================
  // 3. CURTAIN INTRO SCREEN, PASSWORD LOCK & AUDIO TRIGGER
  // ==========================================
  const introScreen = document.getElementById('introScreen');
  const enterBtn = document.getElementById('enterBtn');
  const introSeal = document.getElementById('introSeal');
  const introPasswordSection = document.getElementById('introPasswordSection');
  const introPasswordForm = document.getElementById('introPasswordForm');
  const introPasswordInput = document.getElementById('introPasswordInput');
  const submitPassBtn = document.getElementById('submitPassBtn');
  const passwordErrorMsg = document.getElementById('passwordErrorMsg');

  const CORRECT_PASS = '3108'; // Ngày 31/08

  function dismissIntro() {
    if (!introScreen) return;
    introScreen.classList.add('hide');
    
    // Launch celebratory gentle confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff70a6', '#ffd166', '#70e4d0', '#c77dff', '#ffffff']
      });
    }

    // Start background music
    startMusic();
  }

  function showPasswordStep() {
    if (!introPasswordSection) {
      dismissIntro();
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

  function handlePasswordCheck() {
    if (!introPasswordInput) return;
    const rawVal = (introPasswordInput.value || '').trim();
    const cleanDigits = rawVal.replace(/[^0-9]/g, '');

    // Accepts '3108', '31/08', '31-08'
    if (cleanDigits === CORRECT_PASS || rawVal === '31/08' || rawVal === '31-08') {
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

      // Play cute shake animation on intro card
      const card = document.querySelector('.intro-card');
      if (card) {
        card.classList.remove('shake-anim');
        void card.offsetWidth; // Trigger reflow to restart animation
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
  // 4. FLOATING NEUBRUTALISM AUDIO PLAYER (BOTTOM BAR)
  // ==========================================
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
  const audioCollapseBtn = document.getElementById('audioCollapseBtn');
  const collapseIcon = document.getElementById('collapseIcon');

  let audioCtx = null;
  let masterGainNode = null;
  let isPlayingMusic = false;
  let synthInterval = null;
  let clockInterval = null;

  // Track progress & duration (3 minutes 30 seconds = 210s)
  const TOTAL_DURATION = 210;
  let currentElapsed = 0;
  let currentVolume = 0.75;
  let isMuted = false;
  let lastVolume = 0.75;

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

    // Occasional gentle high sparkle note
    if (Math.random() > 0.4) {
      const highNote = currentChord[Math.floor(Math.random() * currentChord.length)] * 2;
      playTone(highNote, now + 1.2, 3.0, 0.025);
    }

    chordIndex++;
  }

  function formatTimeTrack(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateTrackProgress() {
    if (audioCurrentTime) audioCurrentTime.textContent = formatTimeTrack(currentElapsed);
    if (audioDuration) audioDuration.textContent = formatTimeTrack(TOTAL_DURATION);
    if (audioProgressFill) {
      const pct = Math.min(100, (currentElapsed / TOTAL_DURATION) * 100);
      audioProgressFill.style.width = `${pct}%`;
    }
  }

  function startMusic() {
    initAudio();
    if (isPlayingMusic) return;
    isPlayingMusic = true;

    if (floatingAudioBar) floatingAudioBar.classList.add('is-playing');
    if (audioPlayIcon) audioPlayIcon.style.display = 'none';
    if (audioPauseIcon) audioPauseIcon.style.display = 'block';

    playArpeggiatedChord();
    synthInterval = setInterval(playArpeggiatedChord, 3800);

    // Track running seconds & progress
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(() => {
      currentElapsed++;
      if (currentElapsed > TOTAL_DURATION) {
        currentElapsed = 0;
      }
      updateTrackProgress();
    }, 1000);
  }

  function stopMusic() {
    isPlayingMusic = false;
    if (synthInterval) clearInterval(synthInterval);
    if (clockInterval) clearInterval(clockInterval);

    if (floatingAudioBar) floatingAudioBar.classList.remove('is-playing');
    if (audioPlayIcon) audioPlayIcon.style.display = 'block';
    if (audioPauseIcon) audioPauseIcon.style.display = 'none';
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

  // Seeking on progress container click
  if (audioProgressContainer) {
    audioProgressContainer.addEventListener('click', (e) => {
      const rect = audioProgressContainer.getBoundingClientRect();
      const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      currentElapsed = Math.floor(clickRatio * TOTAL_DURATION);
      updateTrackProgress();
    });
  }

  // Volume Slider
  if (audioVolumeSlider) {
    audioVolumeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      currentVolume = val / 100;
      if (masterGainNode && audioCtx) {
        masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
      }
      if (audioVolIcon) {
        audioVolIcon.textContent = currentVolume === 0 ? '🔇' : currentVolume < 0.5 ? '🔉' : '🔊';
      }
      isMuted = (currentVolume === 0);
    });
  }

  // Mute / Unmute Button
  if (audioMuteBtn) {
    audioMuteBtn.addEventListener('click', () => {
      if (!isMuted) {
        lastVolume = currentVolume > 0 ? currentVolume : 0.75;
        currentVolume = 0;
        if (audioVolumeSlider) audioVolumeSlider.value = 0;
        if (audioVolIcon) audioVolIcon.textContent = '🔇';
        isMuted = true;
      } else {
        currentVolume = lastVolume;
        if (audioVolumeSlider) audioVolumeSlider.value = Math.round(currentVolume * 100);
        if (audioVolIcon) audioVolIcon.textContent = currentVolume < 0.5 ? '🔉' : '🔊';
        isMuted = false;
      }
      if (masterGainNode && audioCtx) {
        masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
      }
    });
  }

  // Collapse / Expand toggle
  if (audioCollapseBtn) {
    audioCollapseBtn.addEventListener('click', () => {
      if (!floatingAudioBar) return;
      floatingAudioBar.classList.toggle('is-collapsed');
      if (collapseIcon) {
        collapseIcon.textContent = floatingAudioBar.classList.contains('is-collapsed') ? '+' : '✕';
      }
    });
  }

  // Initialize progress display
  updateTrackProgress();

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
        colors: ['#ff70a6', '#ffd166', '#70e4d0', '#c77dff', '#ff8fab', '#18181b']
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
  // 6. GÓC KỶ NIỆM SUPABASE (CRUD: Thêm, Sửa, Xóa & Lightbox)
  // ==========================================
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

  // Fetch memories from Supabase Database
  async function fetchMemories() {
    if (!polaroidGrid) return;

    if (!supabaseClient) {
      console.warn('Supabase client chưa khởi tạo, hiển thị dữ liệu mặc định.');
      currentMemories = FALLBACK_MEMORIES;
      renderMemories(currentMemories);
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from('memories')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Lỗi truy vấn Supabase:', error);
        currentMemories = FALLBACK_MEMORIES;
      } else if (data && data.length > 0) {
        currentMemories = data;
      } else {
        currentMemories = FALLBACK_MEMORIES;
      }
    } catch (e) {
      console.error('Lỗi kết nối Supabase:', e);
      currentMemories = FALLBACK_MEMORIES;
    }

    renderMemories(currentMemories);
  }

  // Render Memories Grid
  function renderMemories(memories) {
    if (!polaroidGrid) return;
    polaroidGrid.innerHTML = '';

    if (!memories || memories.length === 0) {
      polaroidGrid.innerHTML = `
        <div class="gallery-loading">
          <p>Chưa có khoảnh khắc nào trong album. Hãy bấm <strong>"+ Thêm Kỷ Niệm Mới"</strong> để ghi dấu yêu thương nhé! 💖</p>
        </div>
      `;
      return;
    }

    memories.forEach((m, index) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.setAttribute('data-id', m.id);

      const washiIndex = (index % 3) + 1;

      card.innerHTML = `
        <div class="washi-tape washi-${washiIndex}"></div>
        <div class="polaroid-action-bar">
          <button type="button" class="btn-card-action btn-edit" title="Chỉnh sửa kỷ niệm này" data-id="${m.id}">✏️</button>
          <button type="button" class="btn-card-action btn-delete" title="Xóa kỷ niệm này" data-id="${m.id}">🗑️</button>
        </div>
        <div class="polaroid-img-wrap">
          <img src="${escapeHTML(m.image_url)}" alt="${escapeHTML(m.caption)}" class="polaroid-img" loading="lazy">
        </div>
        <div class="polaroid-caption">
          <span class="caption-text">"${escapeHTML(m.caption)}"</span>
          ${m.date ? `<span class="caption-date">${escapeHTML(m.date)}</span>` : ''}
        </div>
      `;

      // 3D Tilt Effect
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

      // Card Events
      card.addEventListener('click', (e) => {
        // Edit button
        const editBtn = e.target.closest('.btn-edit');
        if (editBtn) {
          e.stopPropagation();
          openEditModal(m);
          return;
        }

        // Delete button
        const delBtn = e.target.closest('.btn-delete');
        if (delBtn) {
          e.stopPropagation();
          deleteMemoryItem(m);
          return;
        }

        // Click on photo / card opens Lightbox
        if (lightboxModal && lightboxImg) {
          lightboxImg.src = m.image_url;
          if (lightboxCaption) lightboxCaption.textContent = m.caption;
          lightboxModal.classList.add('active');
        }
      });

      polaroidGrid.appendChild(card);
    });
  }

  // Lightbox close events
  if (lightboxCloseBtn && lightboxModal) {
    lightboxCloseBtn.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
  }

  // Open Modal to Add Memory
  function openAddModal() {
    if (!memoryModal) return;
    memoryForm.reset();
    memoryEditId.value = '';
    memoryModalTitle.textContent = 'Thêm Kỷ Niệm Mới';
    saveMemoryBtnText.textContent = 'Lưu Kỷ Niệm ♥';
    if (memoryFileNameHint) memoryFileNameHint.textContent = 'Chưa chọn tệp';
    if (memoryPreviewWrap) memoryPreviewWrap.style.display = 'none';
    if (memoryPreviewImg) memoryPreviewImg.src = '';
    if (memoryOrderInput) memoryOrderInput.value = (currentMemories.length + 1).toString();
    memoryModal.classList.add('active');
  }

  // Open Modal to Edit Memory
  function openEditModal(m) {
    if (!memoryModal) return;
    memoryEditId.value = m.id;
    memoryModalTitle.textContent = 'Chỉnh Sửa Kỷ Niệm';
    saveMemoryBtnText.textContent = 'Cập Nhật Kỷ Niệm ♥';
    if (memoryCaptionInput) memoryCaptionInput.value = m.caption || '';
    if (memoryDateInput) memoryDateInput.value = m.date || '';
    if (memoryImageUrlInput) memoryImageUrlInput.value = m.image_url || '';
    if (memoryOrderInput) memoryOrderInput.value = m.order_index || 1;
    if (memoryFileNameHint) memoryFileNameHint.textContent = 'Đang dùng ảnh hiện tại';

    if (m.image_url && memoryPreviewImg && memoryPreviewWrap) {
      memoryPreviewImg.src = m.image_url;
      memoryPreviewWrap.style.display = 'block';
    } else if (memoryPreviewWrap) {
      memoryPreviewWrap.style.display = 'none';
    }

    memoryModal.classList.add('active');
  }

  function closeMemoryModal() {
    if (memoryModal) memoryModal.classList.remove('active');
  }

  if (openAddMemoryBtn) openAddMemoryBtn.addEventListener('click', openAddModal);
  if (closeMemoryModalBtn) closeMemoryModalBtn.addEventListener('click', closeMemoryModal);
  if (cancelMemoryBtn) cancelMemoryBtn.addEventListener('click', closeMemoryModal);
  if (memoryModal) {
    memoryModal.addEventListener('click', (e) => {
      if (e.target === memoryModal) closeMemoryModal();
    });
  }

  // Live preview when typing image URL
  if (memoryImageUrlInput) {
    memoryImageUrlInput.addEventListener('input', () => {
      const val = memoryImageUrlInput.value.trim();
      if (val && memoryPreviewImg && memoryPreviewWrap) {
        memoryPreviewImg.src = val;
        memoryPreviewWrap.style.display = 'block';
      } else if (memoryPreviewWrap) {
        memoryPreviewWrap.style.display = 'none';
      }
    });
  }

  // Live preview when selecting image file
  if (memoryFileInput) {
    memoryFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (memoryFileNameHint) memoryFileNameHint.textContent = file.name;
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        if (memoryImageUrlInput) memoryImageUrlInput.value = base64;
        if (memoryPreviewImg) memoryPreviewImg.src = base64;
        if (memoryPreviewWrap) memoryPreviewWrap.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }

  // Save Memory (Insert / Update)
  if (memoryForm) {
    memoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const caption = (memoryCaptionInput.value || '').trim();
      const date = (memoryDateInput.value || '').trim();
      const imageUrl = (memoryImageUrlInput.value || '').trim();
      const orderIndex = parseInt(memoryOrderInput.value, 10) || 1;
      const editId = memoryEditId.value;

      if (!caption || !imageUrl) {
        alert('Vui lòng điền lời tựa và hình ảnh kỷ niệm nhé!');
        return;
      }

      const saveBtn = document.getElementById('saveMemoryBtn');
      if (saveBtn) {
        saveBtn.disabled = true;
        saveMemoryBtnText.textContent = 'Đang lưu vào Supabase...';
      }

      try {
        if (!supabaseClient) {
          throw new Error('Supabase Client chưa được khởi tạo.');
        }

        if (editId && !editId.startsWith('default-')) {
          // Update in Supabase
          const { error } = await supabaseClient
            .from('memories')
            .update({
              caption,
              date,
              image_url: imageUrl,
              order_index: orderIndex
            })
            .eq('id', editId);

          if (error) throw error;
        } else {
          // Insert into Supabase
          const { error } = await supabaseClient
            .from('memories')
            .insert([{
              caption,
              date,
              image_url: imageUrl,
              order_index: orderIndex
            }]);

          if (error) throw error;
        }

        // Magical celebration confetti
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff70a6', '#ffd166', '#70e4d0', '#ff8fab', '#18181b']
          });
        }

        closeMemoryModal();
        await fetchMemories();
      } catch (err) {
        console.error('Lỗi khi lưu kỷ niệm:', err);
        alert('Không thể lưu vào Supabase: ' + (err.message || err));
      } finally {
        if (saveBtn) {
          saveBtn.disabled = false;
          saveMemoryBtnText.textContent = editId ? 'Cập Nhật Kỷ Niệm ♥' : 'Lưu Kỷ Niệm ♥';
        }
      }
    });
  }

  // Delete Memory
  async function deleteMemoryItem(m) {
    const ok = confirm(`Bạn có chắc muốn xóa kỷ niệm "${m.caption}" không?`);
    if (!ok) return;

    try {
      if (supabaseClient && !m.id.startsWith('default-')) {
        const { error } = await supabaseClient
          .from('memories')
          .delete()
          .eq('id', m.id);

        if (error) throw error;
      } else {
        currentMemories = currentMemories.filter(item => item.id !== m.id);
        renderMemories(currentMemories);
        return;
      }

      await fetchMemories();
    } catch (err) {
      console.error('Lỗi khi xóa kỷ niệm:', err);
      alert('Không thể xóa kỷ niệm: ' + (err.message || err));
    }
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
        colors: ['#ff70a6', '#ffd166']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#70e4d0', '#ff8fab']
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
        colors: ['#ffffff', '#c77dff', '#18181b']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#ffea79', '#b5e48c']
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
  // 9. INTERACTIVE LOVE NOTES WALL (SUPABASE DATABASE)
  // ==========================================
  const noteAuthorInput = document.getElementById('noteAuthorInput');
  const noteContentInput = document.getElementById('noteContentInput');
  const sendNoteBtn = document.getElementById('sendNoteBtn');
  const notesWall = document.getElementById('notesWall');

  // Load fallback notes from localStorage
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

  // Fetch love notes from Supabase database
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
        appNotes = data.map(item => ({
          id: item.id,
          author: item.author || 'Người Giấu Tên',
          text: item.content || item.text || '',
          date: item.date || ''
        }));
      } else {
        appNotes = [...DEFAULT_NOTES];
      }
    } catch (err) {
      console.error('Lỗi kết nối Supabase love_notes:', err);
      appNotes = loadLocalNotes();
    }

    renderNotes();
  }

  // Render Notes to DOM
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

    appNotes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.className = 'sticky-note';
      noteEl.setAttribute('data-id', note.id);
      noteEl.innerHTML = `
        <button type="button" class="btn-delete-note" title="Xóa lời nhắn này" data-id="${note.id}">🗑️</button>
        <p class="sticky-text">"${escapeHTML(note.text)}"</p>
        <div class="sticky-footer">
          <span class="sticky-author">♥ ${escapeHTML(note.author)}</span>
          <span class="sticky-date">${escapeHTML(note.date)}</span>
        </div>
      `;

      const deleteBtn = noteEl.querySelector('.btn-delete-note');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteLoveNote(note.id);
        });
      }

      notesWall.appendChild(noteEl);
    });
  }

  // Delete a love note
  async function deleteLoveNote(id) {
    if (!confirm('Bạn có chắc muốn xóa lời nhắn này không?')) return;

    try {
      if (supabaseClient && !String(id).startsWith('default-') && !String(id).startsWith('local-')) {
        const { error } = await supabaseClient
          .from('love_notes')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await fetchLoveNotes();
        return;
      }

      appNotes = appNotes.filter(item => item.id !== id);
      saveLocalNotes();
      renderNotes();
    } catch (err) {
      console.error('Lỗi khi xóa lời nhắn:', err);
      alert('Không thể xóa lời nhắn: ' + (err.message || err));
    }
  }

  // Send a new love note to Supabase database
  if (sendNoteBtn) {
    sendNoteBtn.addEventListener('click', async () => {
      const author = (noteAuthorInput.value || '').trim() || 'Người Giấu Tên';
      const text = (noteContentInput.value || '').trim();

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

        noteContentInput.value = '';

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

  // Realtime subscription for live love notes sync
  if (supabaseClient) {
    try {
      supabaseClient
        .channel('public:love_notes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'love_notes' }, () => {
          fetchLoveNotes();
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel subscription error:', e);
    }
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
        const colors = [
          '255, 112, 166', // Bubblegum Pink
          '255, 209, 102', // Buttercup Yellow
          '112, 228, 208', // Mint Green
          '199, 125, 255', // Sweet Lavender
          '160, 196, 255'  // Pastel Sky Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
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

  // Initial apply story, fetch memories & fetch love notes from Supabase
  applyStoryToDOM();
  fetchMemories();
  fetchLoveNotes();
});

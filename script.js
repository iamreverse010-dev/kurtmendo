/**
 * DOĞUM GÜNÜ SÜRPRİZ SİTESİ - JAVASCRIPT ETKİLEŞİM MOTORU
 * Konfeti, Havai Fişek, Kazı-Kazan, Mum Üfleme & Dinamik Veriler
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.BIRTHDAY_CONFIG || {};

  // 1. Dinamik İçeriklerin Yüklenmesi
  renderDynamicContent(config);

  // 2. Arka Plan Yıldız Animasyonu
  initStarsCanvas();

  // 3. Havai Fişek Motoru Başlatma
  const fireworks = initFireworksCanvas();

  // 4. Uçan Balonları Başlatma
  initFloatingBalloons();

  // 5. Açılış Ekranı (Hediye Paketi) Etkileşimi
  setupIntroScreen();

  // 6. Mum Üfleme Mekaniği
  setupCakeCandles();

  // 7. Kazı Kazan Kartları
  setupScratchCards(config.scratchCards || []);

  // 8. Müzik ve Eğlence Kontrolleri
  setupControls(fireworks);
});

/* ==========================================================================
   1. DİNAMİK İÇERİK DOLDURMA
   ========================================================================== */
function renderDynamicContent(cfg) {
  // İsim ve Başlıklar
  const nameEls = document.querySelectorAll('.dynamic-name');
  nameEls.forEach(el => el.textContent = cfg.friendName || "Canım Dostum");

  const heroSub = document.getElementById('hero-subtitle');
  if (heroSub && cfg.heroSubtitle) heroSub.textContent = cfg.heroSubtitle;

  const heroDate = document.getElementById('hero-date-badge');
  if (heroDate && cfg.dateText) heroDate.textContent = cfg.dateText;



  // Duygusal Mektup
  const letterBody = document.getElementById('letter-body');
  if (letterBody && cfg.letter && cfg.letter.paragraphs) {
    letterBody.innerHTML = cfg.letter.paragraphs.map(p => `<p>${p}</p>`).join('');
  }
  const letterSalutation = document.getElementById('letter-salutation');
  if (letterSalutation && cfg.letter && cfg.letter.salutation) {
    letterSalutation.textContent = cfg.letter.salutation;
  }
  const letterSig = document.getElementById('letter-signature');
  if (letterSig && cfg.letter && cfg.letter.signature) {
    letterSig.textContent = cfg.letter.signature;
  }
}

/* ==========================================================================
   2. HEDİYE PAKETİ AÇILIŞ EKRANI
   ========================================================================== */
function setupIntroScreen() {
  const intro = document.getElementById('intro-screen');
  const openBtn = document.getElementById('open-gift-btn');
  const giftBox = document.getElementById('gift-box');

  const openGift = () => {
    if (!intro || intro.classList.contains('hidden')) return;

    if (window.birthdayAudio) {
      window.birthdayAudio.init();
      window.birthdayAudio.playPop();
      window.birthdayAudio.playCelebrationChime();
      setTimeout(() => {
        window.birthdayAudio.startMusicBox();
        const musicBtn = document.getElementById('music-toggle-btn');
        if (musicBtn) musicBtn.classList.add('active');
      }, 500);
    }

    if (giftBox) giftBox.classList.add('opened');

    // Süper konfeti patlaması
    fireConfettiBurst();

    setTimeout(() => {
      intro.classList.add('hidden');
    }, 700);
  };

  if (openBtn) openBtn.addEventListener('click', openGift);
  if (giftBox) giftBox.parentElement.addEventListener('click', openGift);
}

/* ==========================================================================
   3. KONFETİ EFEKTİ (CANVAS-CONFETTI KULLANARAK)
   ========================================================================== */
function fireConfettiBurst() {
  if (typeof confetti === 'function') {
    // Sol ve sağdan çapraz patlama
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7, x: 0.3 }
    });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7, x: 0.7 }
    });
    // Ortadan göğe fırlatma
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6, x: 0.5 }
      });
    }, 250);
  }
}

/* ==========================================================================
   4. İNTERAKTİF PASTA & MUM ÜFLEME
   ========================================================================== */
function setupCakeCandles() {
  const blowBtn = document.getElementById('blow-cake-btn');
  const cake = document.getElementById('birthday-cake');
  const candles = document.querySelectorAll('.candle');
  const wishBanner = document.getElementById('wish-banner');
  let isBlown = false;

  const blowAction = () => {
    if (isBlown) {
      // Tekrar yakma seçeneği
      candles.forEach(c => c.classList.remove('blown'));
      if (wishBanner) wishBanner.classList.remove('show');
      if (blowBtn) blowBtn.innerHTML = "🎂 Dilek Tut ve Mumları Üfle!";
      isBlown = false;
      return;
    }

    // Mumları söndür
    candles.forEach(c => c.classList.add('blown'));
    isBlown = true;

    if (window.birthdayAudio) {
      window.birthdayAudio.playBlowCandle();
    }

    fireConfettiBurst();

    if (wishBanner) {
      wishBanner.classList.add('show');
    }

    if (blowBtn) {
      blowBtn.innerHTML = "🔥 Mumları Yeniden Yak";
    }
  };

  if (blowBtn) blowBtn.addEventListener('click', blowAction);
  if (cake) cake.addEventListener('click', blowAction);
}

/* ==========================================================================
   5. KAZI KAZAN SÜRPRİZ KARTLARI
   ========================================================================== */
function setupScratchCards(cards) {
  const container = document.getElementById('scratch-grid');
  if (!container || !cards.length) return;

  container.innerHTML = cards.map(c => `
    <div class="scratch-card">
      <span class="scratch-badge">${c.badge}</span>
      <div class="scratch-question">${c.question}</div>
      <div class="scratch-area-box">
        <div class="scratch-secret">${c.secret}</div>
        <canvas class="scratch-canvas" data-card-id="${c.id}"></canvas>
      </div>
    </div>
  `).join('');

  // Her canvas için kazıma motorunu başlat
  const canvases = container.querySelectorAll('.scratch-canvas');
  canvases.forEach(initSingleScratchCanvas);
}

function initSingleScratchCanvas(canvas) {
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth || 300;
  canvas.height = parent.offsetHeight || 120;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Metalik kazıma kaplaması
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#c0c0c0');
  grad.addColorStop(0.5, '#e0e0e0');
  grad.addColorStop(1, '#a8a8a8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Parıltı yazısı
  ctx.fillStyle = '#444';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✨ Kazımak İçin Dokun 🪙', canvas.width / 2, canvas.height / 2);

  let isDrawing = false;
  let scratched = false;

  const scratch = (e) => {
    if (!isDrawing || scratched) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) transparentPixels++;
      }
      const totalSampled = imgData.data.length / 16;
      if (transparentPixels / totalSampled > 0.45) {
        scratched = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => { canvas.style.display = 'none'; }, 600);

        if (window.birthdayAudio) {
          window.birthdayAudio.playCelebrationChime();
        }
        if (typeof confetti === 'function') {
          confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
        }
      }
    } catch (e) {
      // Canvas tainted güvenlik kontrolü
    }
  };

  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  window.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', scratch);

  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: true });
  window.addEventListener('touchend', () => { isDrawing = false; });
  canvas.addEventListener('touchmove', scratch, { passive: true });
}



/* ==========================================================================
   7. YÜZEN KONTROLLER & ETKİLEŞİM
   ========================================================================== */
function setupControls(fireworks) {
  // Müzik Butonu
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (window.birthdayAudio) {
        const isPlaying = window.birthdayAudio.toggleMusic();
        musicBtn.classList.toggle('active', isPlaying);
        musicBtn.setAttribute('title', isPlaying ? 'Müziği Duraklat' : 'Müziği Çal');
      }
    });
  }

  // Konfeti Butonu
  const confettiBtn = document.getElementById('celebrate-hero-btn');
  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      fireConfettiBurst();
      if (window.birthdayAudio) {
        window.birthdayAudio.playPartyHorn();
      }
    });
  }

  // Havai Fişek Butonu
  const fireworksBtn = document.getElementById('fireworks-toggle-btn');
  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      if (fireworks) {
        fireworks.launchShow();
      }
      if (window.birthdayAudio) {
        window.birthdayAudio.playFirework();
      }
    });
  }
}

/* ==========================================================================
   8. UÇAN BALONLAR
   ========================================================================== */
function initFloatingBalloons() {
  const container = document.getElementById('balloons-container');
  if (!container) return;

  const colors = [
    'linear-gradient(135deg, #ff758c, #ff7eb3)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #ffd166, #ff9f1c)',
    'linear-gradient(135deg, #b185ff, #8338ec)',
    'linear-gradient(135deg, #06d6a0, #1b9aaa)'
  ];

  const createBalloon = () => {
    if (document.hidden) return;
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = `${Math.random() * 95}%`;
    const duration = 10 + Math.random() * 8;
    balloon.style.animationDuration = `${duration}s`;
    const scale = 0.7 + Math.random() * 0.6;
    balloon.style.transform = `scale(${scale})`;

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, duration * 1000);
  };

  // İlk parti balonlar
  for (let i = 0; i < 4; i++) {
    setTimeout(createBalloon, i * 1500);
  }
  // Sürekli yeni balon akışı
  setInterval(createBalloon, 3500);
}

/* ==========================================================================
   9. GECE GÖKYÜZÜ YILDIZ CANVAS EFEKTİ
   ========================================================================== */
function initStarsCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = 65;

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.008
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.alpha += s.speed;
      const opacity = (Math.sin(s.alpha) + 1) / 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   10. HAVAİ FİŞEK MOTORU
   ========================================================================== */
function initFireworksCanvas() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let particles = [];

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.018 + 0.015;
      this.gravity = 0.12;
    }
    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const colors = ['#ff416c', '#ffd166', '#00f2fe', '#e100ff', '#ffffff', '#06d6a0'];

  function createFirework(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 45; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(loop);
  }
  loop();

  return {
    launchShow: () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const x = width * 0.2 + Math.random() * (width * 0.6);
          const y = height * 0.2 + Math.random() * (height * 0.35);
          createFirework(x, y);
          if (window.birthdayAudio) window.birthdayAudio.playFirework();
        }, i * 350);
      }
    }
  };
}

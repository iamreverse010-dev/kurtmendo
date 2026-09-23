/**
 * Ses Efektleri ve Doğum Günü Müziği Motoru (Web Audio API)
 * Herhangi bir harici mp3'e ihtiyaç duymadan tarayıcıda doğrudan
 * kutlama sesleri, alkış, parti kornası ve doğum günü melodisi üretir.
 */

class BirthdayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.customAudio = null;
    this.musicTimer = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Patlama / Pop sesi (Konfeti için)
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Pop sound error:", e);
    }
  }

  // Parti kornası sesi
  playPartyHorn() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      // Çift tonlu neşeli korna
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.linearRampToValueAtTime(480, now + 0.15);
      osc1.frequency.setValueAtTime(480, now + 0.35);

      osc2.frequency.setValueAtTime(325, now);
      osc2.frequency.linearRampToValueAtTime(485, now + 0.15);
      osc2.frequency.setValueAtTime(485, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch (e) {
      console.warn("Party horn error:", e);
    }
  }

  // Havai fişek patlama ve ıslık efekti
  playFirework() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Islık
      const whistle = this.ctx.createOscillator();
      const whistleGain = this.ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(400, now);
      whistle.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
      whistleGain.gain.setValueAtTime(0.15, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      whistle.connect(whistleGain);
      whistleGain.connect(this.ctx.destination);
      whistle.start(now);
      whistle.stop(now + 0.25);

      // Patlama (Gürültü simülasyonu)
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const blastTime = this.ctx.currentTime;
        const blastOsc = this.ctx.createOscillator();
        const blastGain = this.ctx.createGain();
        blastOsc.type = 'triangle';
        blastOsc.frequency.setValueAtTime(180, blastTime);
        blastOsc.frequency.exponentialRampToValueAtTime(30, blastTime + 0.4);
        blastGain.gain.setValueAtTime(0.35, blastTime);
        blastGain.gain.exponentialRampToValueAtTime(0.001, blastTime + 0.45);

        blastOsc.connect(blastGain);
        blastGain.connect(this.ctx.destination);
        blastOsc.start(blastTime);
        blastOsc.stop(blastTime + 0.45);
      }, 250);
    } catch (e) {
      console.warn("Firework sound error:", e);
    }
  }

  // Mum üfleme nefes & sönme tınısı
  playBlowCandle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Rüzgar / Nefes fısıltısı
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);

      // Ardından alkış ve kutlama akoru
      setTimeout(() => {
        this.playCelebrationChime();
      }, 350);
    } catch (e) {
      console.warn("Blow candle sound error:", e);
    }
  }

  // Kutlama / Parıltı sesi (Chimes & Harplike Fanfare)
  playCelebrationChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, index) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
      }, index * 90);
    });
  }

  // Dahili Müzik Kutusu Melodisi: "Happy Birthday / İyi ki Doğdun"
  startMusicBox() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Eğer harici bir şarkı belirtildiyse onu çal
    const customUrl = window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.backgroundMusicUrl;
    if (customUrl && customUrl.trim() !== "") {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(e => {
        console.log("Audio play prevented, falling back to synth", e);
        this.playHappyBirthdaySynthLoop();
      });
      return;
    }

    this.playHappyBirthdaySynthLoop();
  }

  playHappyBirthdaySynthLoop() {
    if (!this.isPlayingMusic) return;

    // "Happy Birthday To You" notaları ve süreleri (Müzik Kutusu Tınısı)
    // C4, D4, E4, F4, G4, A4, B4, C5 vb.
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23,
          G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25;

    const melody = [
      { note: C4, duration: 350 }, { note: C4, duration: 250 },
      { note: D4, duration: 600 }, { note: C4, duration: 600 },
      { note: F4, duration: 600 }, { note: E4, duration: 1100 },

      { note: C4, duration: 350 }, { note: C4, duration: 250 },
      { note: D4, duration: 600 }, { note: C4, duration: 600 },
      { note: G4, duration: 600 }, { note: F4, duration: 1100 },

      { note: C4, duration: 350 }, { note: C4, duration: 250 },
      { note: C5, duration: 600 }, { note: A4, duration: 600 },
      { note: F4, duration: 600 }, { note: E4, duration: 600 },
      { note: D4, duration: 900 },

      { note: B4, duration: 350 }, { note: B4, duration: 250 },
      { note: A4, duration: 600 }, { note: F4, duration: 600 },
      { note: G4, duration: 600 }, { note: F4, duration: 1200 }
    ];

    let currentStep = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      if (currentStep >= melody.length) {
        currentStep = 0;
        // Melodi bitince 2 saniye nefes alıp tekrar başlasın
        this.musicTimer = setTimeout(playNext, 2000);
        return;
      }

      const item = melody[currentStep];
      this.playMusicBoxNote(item.note, item.duration / 1000);
      currentStep++;
      this.musicTimer = setTimeout(playNext, item.duration + 50);
    };

    playNext();
  }

  playMusicBoxNote(freq, dur) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Müzik kutusu benzeri saf ve tatlı sinüs + hafif harmonik
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 2, now); // Bir oktav yukarı daha kristal ses verir

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(dur, 0.4));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + Math.max(dur, 0.4));
    } catch (e) {
      console.warn("Music box note error:", e);
    }
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusicBox();
      return true;
    }
  }
}

window.birthdayAudio = new BirthdayAudioEngine();

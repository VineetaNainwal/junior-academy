/**
 * Web Audio Synthesizer & Speech Synthesis Utility for Bal Vidya
 * Creates joyful, kid-friendly sound effects (Bells, Flute, Tabla, Sparkle, Pop)
 * and sweet, natural girl-voice speech synthesis in English and Hindi.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechEnabled: boolean = true;
  private speechRate: number = 0.90; // Slower, crystal clear rate for toddlers
  private speechPitch: number = 1.28; // Cheerful, sweet young girl voice pitch
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoiceName: string | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          const v = window.speechSynthesis.getVoices();
          if (v && v.length > 0) {
            this.voices = v;
          }
        } catch {}
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSpeechEnabled(enabled: boolean) {
    this.speechEnabled = enabled;
  }

  public isSpeechEnabled(): boolean {
    return this.speechEnabled;
  }

  public setSpeechRate(rate: number) {
    this.speechRate = rate;
  }

  public setSpeechPitch(pitch: number) {
    this.speechPitch = pitch;
  }

  // Play a soft temple bell (Ghanti) sound
  public playBell() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Fundamental and harmonics for a bronze bell chime
      const freqs = [1046.5, 2093, 3135.9]; // C6, C7, G7 harmonics
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const volume = (0.25 / (idx + 1));
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 - idx * 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      });
    } catch {
      // Audio context might be restricted
    }
  }

  // Play a warm Indian Bamboo Flute (Bansuri) note or gentle arpeggio
  public playFlute(freqIndex = 0) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      // Rag Bhupali pentatonic scale frequencies (Sa Re Ga Pa Dha Sa)
      const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const freq = scale[freqIndex % scale.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // Gentle vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5, now);
      lfoGain.gain.setValueAtTime(3, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {}
  }

  // Play a soft tabla bayan / dhum tap
  public playTabla() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.2);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {}
  }

  // Play a joyful bubble/balloon pop sound
  public playPop() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  // Play a sparkling magic twinkle sound (for correct answers or star unlocks)
  public playSparkle() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D E F# A D
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } catch {}
  }

  // Play celebration fanfare
  public playCelebration() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0 },
        { freqs: [587.33, 739.99, 880.00], time: 0.15 },
        { freqs: [659.25, 830.61, 987.77], time: 0.3 },
        { freqs: [1046.5, 1318.5, 1567.9], time: 0.45 },
      ];
      const now = ctx.currentTime;

      chords.forEach((chord) => {
        chord.freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + chord.time);

          gain.gain.setValueAtTime(0.12, now + chord.time);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + chord.time + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + chord.time);
          osc.stop(now + chord.time + 0.5);
        });
      });
    } catch {}
  }

  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentSpeechSessionId = 0;
  private activeSpeakTimeout: any = null;

  /**
   * Checks if the client's browser/system has any native Hindi TTS voice installed.
   */
  public hasNativeHindiVoice(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    let availableVoices = this.voices;
    if (!availableVoices || availableVoices.length === 0) {
      availableVoices = window.speechSynthesis.getVoices() || [];
      this.voices = availableVoices;
    }
    return availableVoices.some(v =>
      v.lang.toLowerCase().startsWith('hi') ||
      v.lang.toLowerCase().includes('hi-in') ||
      v.lang.toLowerCase().includes('hi_in') ||
      v.name.toLowerCase().includes('hindi')
    );
  }

  /**
   * Selects the highest quality, natural "Girl Voice" (warm, cheerful, clear)
   * available in the user's browser/system.
   */
  private getBestGirlVoice(lang: 'en' | 'hi'): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    let availableVoices = this.voices;
    if (!availableVoices || availableVoices.length === 0) {
      availableVoices = window.speechSynthesis.getVoices() || [];
      this.voices = availableVoices;
    }

    if (availableVoices.length === 0) return null;

    // Preferred Indian & Natural English Girl / Female voice names
    const preferredEnglishGirlNames = [
      'neerja', 'heera', 'swara', 'priya', 'ananya', 'aditi', 'kavya', 'kalpana', 'geeta', 'lekha', 'veena',
      'jenny', 'aria', 'zira', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'ava', 'allison', 'serena',
      'google us english', 'google uk english female', 'microsoft jenny', 'microsoft aria', 'microsoft zira'
    ];

    // Preferred Hindi Girl / Female voice names
    const preferredHindiGirlNames = [
      'swara', 'kalpana', 'aditi', 'heera', 'kavya', 'lekha', 'geeta', 'priya', 'madhur', 'google हिन्दी', 'google hindi', 'hindi female', 'hindi'
    ];

    if (lang === 'hi') {
      // 1. Try preferred Hindi female names
      for (const name of preferredHindiGirlNames) {
        const found = availableVoices.find(v =>
          (v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi')) &&
          v.name.toLowerCase().includes(name)
        );
        if (found) return found;
      }
      // 2. Any Hindi voice
      const hindiVoice = availableVoices.find(v =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.lang.toLowerCase().includes('hi-in') ||
        v.lang.toLowerCase().includes('hi_in') ||
        v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) return hindiVoice;

      return null;
    }

    // English Voice Selection
    // 1. Check preferred girl names with en-IN or en-US/en-GB
    for (const name of preferredEnglishGirlNames) {
      const found = availableVoices.find(v =>
        v.lang.startsWith('en') && v.name.toLowerCase().includes(name)
      );
      if (found) return found;
    }

    // 2. Check for keywords 'female', 'girl', 'natural', 'woman'
    const femaleVoice = availableVoices.find(v =>
      v.lang.startsWith('en') &&
      (v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('girl') ||
       v.name.toLowerCase().includes('natural') ||
       v.name.toLowerCase().includes('woman'))
    );
    if (femaleVoice) return femaleVoice;

    // 3. Any English voice
    const fallbackEn = availableVoices.find(v => v.lang.startsWith('en'));
    return fallbackEn || availableVoices[0] || null;
  }

  // Kid-Friendly Text-to-Speech (Original Sweet Girl Sound)
  public speak(text: string, lang: 'en' | 'hi' = 'en', onEnd?: () => void, phoneticFallback?: string) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }

      // Invalidate any previous speech sequence callbacks
      this.currentSpeechSessionId++;
      const thisSessionId = this.currentSpeechSessionId;

      if (this.activeSpeakTimeout) {
        clearTimeout(this.activeSpeakTimeout);
        this.activeSpeakTimeout = null;
      }

      synth.cancel(); // Stop pending speech

      const hasHindi = this.hasNativeHindiVoice();
      let textToSpeak = text;
      let targetLang = lang === 'hi' ? 'hi-IN' : 'en-US';
      let chosenVoice: SpeechSynthesisVoice | null = null;

      if (lang === 'hi') {
        if (hasHindi) {
          chosenVoice = this.getBestGirlVoice('hi');
          targetLang = chosenVoice?.lang || 'hi-IN';
          textToSpeak = text;
        } else {
          // Client host has no Hindi speech pack. English engines produce complete silence on Devanagari.
          // Fall back to crystal-clear phonetic pronunciation using English voice!
          textToSpeak = phoneticFallback || text;
          targetLang = 'en-IN';
          chosenVoice = this.getBestGirlVoice('en');
        }
      } else {
        chosenVoice = this.getBestGirlVoice('en');
        targetLang = chosenVoice?.lang || 'en-US';
        textToSpeak = text;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      this.currentUtterance = utterance; // Prevent GC collection in Chrome/V8
      utterance.rate = this.speechRate; // 0.90 for clear, gentle learning
      utterance.pitch = this.speechPitch; // 1.28 for sweet, friendly young girl voice
      utterance.volume = 1.0;
      utterance.lang = targetLang;

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      let hasEnded = false;
      const handleFinish = (wasCancelled: boolean = false) => {
        if (!hasEnded) {
          hasEnded = true;
          this.currentUtterance = null;
          // Only fire onEnd callback if this session was not cancelled or stopped
          if (!wasCancelled && thisSessionId === this.currentSpeechSessionId && onEnd) {
            onEnd();
          }
        }
      };

      utterance.onend = () => {
        handleFinish(false);
      };

      utterance.onerror = (event) => {
        const isCancelled = event.error === 'canceled' || event.error === 'interrupted' || thisSessionId !== this.currentSpeechSessionId;
        handleFinish(isCancelled);
      };

      // Slight delay ensures the browser's speech queue clears from cancel()
      this.activeSpeakTimeout = setTimeout(() => {
        try {
          if (thisSessionId !== this.currentSpeechSessionId) return;
          if (synth.paused) synth.resume();
          synth.speak(utterance);
        } catch (err) {
          handleFinish(true);
        }
      }, 20);
    } catch (e) {
      console.warn("Speech synthesis error", e);
      if (onEnd) onEnd();
    }
  }

  // Convenient helper for Hindi letters & words with automatic phonetic fallback (e.g. "द से दीपक")
  public speakHindi(hindiText: string, phoneticFallback?: string, onEnd?: () => void) {
    this.speak(hindiText, 'hi', onEnd, phoneticFallback);
  }

  public stopSpeaking() {
    this.currentSpeechSessionId++; // Invalidate active speech and callbacks immediately
    if (this.activeSpeakTimeout) {
      clearTimeout(this.activeSpeakTimeout);
      this.activeSpeakTimeout = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.currentUtterance = null;
  }
}

export const sound = new SoundManager();


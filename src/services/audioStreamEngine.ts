import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, LanguageMeta } from '../data/translations';

class AudioStreamEngine {
  private audioCtx: AudioContext | null = null;
  private currentLanguage: LanguageCode = 'am';
  private listeners: Array<(meta: LanguageMeta) => void> = [];

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && !this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        try {
          this.audioCtx = new AudioCtxClass();
        } catch {
          // AudioContext might require user gesture
        }
      }
    }
  }

  /**
   * Play an audible harmonic radio-tuning / neural frequency transition chime
   * when switching audio channels
   */
  public playChannelSwitchSound(targetLang: LanguageCode) {
    try {
      if (!this.audioCtx) {
        this.initAudioContext();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Frequencies corresponding to neural linguistic pitches
      const baseFreqMap: Record<LanguageCode, number> = {
        am: 440, // A4
        om: 523.25, // C5
        ti: 587.33, // D5
        en: 659.25, // E5
        fr: 698.46, // F5
        zh: 783.99, // G5
        ar: 880.0, // A5
        de: 987.77, // B5
      };

      const freq = baseFreqMap[targetLang] || 440;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 0.75, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.12);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio playback fails silently if browser blocks autoplay
    }
  }

  public setLanguage(lang: LanguageCode) {
    this.currentLanguage = lang;
    this.playChannelSwitchSound(lang);

    const meta = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
    this.listeners.forEach((callback) => callback(meta));
  }

  public getActiveLanguage(): LanguageCode {
    return this.currentLanguage;
  }

  public getLanguageMeta(code?: LanguageCode): LanguageMeta {
    const lang = code || this.currentLanguage;
    return SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
  }

  public subscribe(callback: (meta: LanguageMeta) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }
}

export const audioStreamEngine = new AudioStreamEngine();

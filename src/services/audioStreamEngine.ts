import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, LanguageMeta } from '../data/translations';

export interface AudioProcessingMetrics {
  rmsDb: number;
  peakDb: number;
  volumeLevel: number; // 0 to 100
  isSpeaking: boolean;
  sampleRate: number;
  mode: 'Studio Master HD' | 'Podcast Clarity' | 'Dynamic Live' | 'Raw';
}

class AudioStreamEngine {
  private audioCtx: AudioContext | null = null;
  private currentLanguage: LanguageCode = 'am';
  private listeners: Array<(meta: LanguageMeta) => void> = [];
  private metricsListeners: Array<(metrics: AudioProcessingMetrics) => void> = [];

  // Studio Audio Graph Nodes
  private masterCompressor: DynamicsCompressorNode | null = null;
  private vocalPresenceFilter: BiquadFilterNode | null = null;
  private rumbleCutFilter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private isProcessingAudio: boolean = false;
  private activeStreamSource: MediaStreamAudioSourceNode | null = null;

  constructor() {
    this.initAudioContext();
  }

  public initAudioContext(): AudioContext | null {
    if (typeof window !== 'undefined' && !this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        try {
          this.audioCtx = new AudioCtxClass({
            latencyHint: 'interactive',
            sampleRate: 48000,
          });
          this.setupStudioMasterChain();
        } catch (e) {
          console.warn('AudioContext lazy init on user gesture:', e);
        }
      }
    }
    return this.audioCtx;
  }

  /**
   * Sets up broadcast-quality audio processing chain:
   * Rumble Cut (85Hz HighPass) -> Vocal Presence (2.8kHz Peaking) -> Studio Dynamics Compressor -> Master Gain -> Analyser -> Output
   */
  private setupStudioMasterChain() {
    if (!this.audioCtx) return;

    try {
      // 1. Highpass filter cutting sub-85Hz background rumbles and handling thumps
      this.rumbleCutFilter = this.audioCtx.createBiquadFilter();
      this.rumbleCutFilter.type = 'highpass';
      this.rumbleCutFilter.frequency.setValueAtTime(85, this.audioCtx.currentTime);
      this.rumbleCutFilter.Q.setValueAtTime(0.7, this.audioCtx.currentTime);

      // 2. Vocal clarity peaking filter at 2.8kHz for speech definition
      this.vocalPresenceFilter = this.audioCtx.createBiquadFilter();
      this.vocalPresenceFilter.type = 'peaking';
      this.vocalPresenceFilter.frequency.setValueAtTime(2800, this.audioCtx.currentTime);
      this.vocalPresenceFilter.gain.setValueAtTime(2.5, this.audioCtx.currentTime);
      this.vocalPresenceFilter.Q.setValueAtTime(1.1, this.audioCtx.currentTime);

      // 3. Studio Dynamics Compressor: Prevents clipping while boosting soft whispering/vocal speech
      this.masterCompressor = this.audioCtx.createDynamicsCompressor();
      this.masterCompressor.threshold.setValueAtTime(-24, this.audioCtx.currentTime);
      this.masterCompressor.knee.setValueAtTime(30, this.audioCtx.currentTime);
      this.masterCompressor.ratio.setValueAtTime(12, this.audioCtx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.25, this.audioCtx.currentTime);

      // 4. Master Gain Node
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime);

      // 5. Analyser for high-precision real-time decibels and VU metering
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      // Chain: RumbleCut -> VocalPresence -> Compressor -> MasterGain -> Analyser
      this.rumbleCutFilter.connect(this.vocalPresenceFilter);
      this.vocalPresenceFilter.connect(this.masterCompressor);
      this.masterCompressor.connect(this.masterGain);
      this.masterGain.connect(this.analyser);

      // Start metrics loop
      this.startMetricsLoop();
    } catch (err) {
      console.warn('Audio processing chain setup failed:', err);
    }
  }

  /**
   * Connect a MediaStream (microphone or incoming peer audio) to the studio pipeline
   */
  public attachMicrophoneStream(stream: MediaStream) {
    if (!this.audioCtx) this.initAudioContext();
    if (!this.audioCtx || !this.rumbleCutFilter) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    try {
      if (this.activeStreamSource) {
        this.activeStreamSource.disconnect();
      }
      this.activeStreamSource = this.audioCtx.createMediaStreamSource(stream);
      this.activeStreamSource.connect(this.rumbleCutFilter);
      this.isProcessingAudio = true;
    } catch (e) {
      console.warn('Could not attach stream to audio engine:', e);
    }
  }

  public detachMicrophoneStream() {
    if (this.activeStreamSource) {
      try {
        this.activeStreamSource.disconnect();
      } catch {
        // ignore
      }
      this.activeStreamSource = null;
    }
    this.isProcessingAudio = false;
  }

  /**
   * Continuous Audio Metrics Analyzer Loop
   */
  private startMetricsLoop() {
    const dataArray = new Uint8Array(128);

    const updateMetrics = () => {
      if (this.analyser && this.isProcessingAudio) {
        this.analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        let peak = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = dataArray[i];
          sum += val * val;
          if (val > peak) peak = val;
        }

        const rms = Math.sqrt(sum / dataArray.length);
        const volumeLevel = Math.min(100, Math.round((rms / 255) * 100 * 2.5));
        const rmsDb = rms > 0 ? Math.round(20 * Math.log10(rms / 255)) : -100;
        const peakDb = peak > 0 ? Math.round(20 * Math.log10(peak / 255)) : -100;

        const metrics: AudioProcessingMetrics = {
          rmsDb,
          peakDb,
          volumeLevel,
          isSpeaking: volumeLevel > 12,
          sampleRate: this.audioCtx?.sampleRate || 48000,
          mode: 'Studio Master HD',
        };

        this.metricsListeners.forEach((cb) => cb(metrics));
      }

      this.animFrameId = requestAnimationFrame(updateMetrics);
    };

    updateMetrics();
  }

  /**
   * Recommended WebRTC microphone constraints for studio audio quality
   */
  public getStudioAudioConstraints(): MediaTrackConstraints {
    return {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      sampleRate: { ideal: 48000 },
      channelCount: { ideal: 2 },
    };
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

  public subscribeMetrics(callback: (metrics: AudioProcessingMetrics) => void): () => void {
    this.metricsListeners.push(callback);
    return () => {
      this.metricsListeners = this.metricsListeners.filter((cb) => cb !== callback);
    };
  }
}

export const audioStreamEngine = new AudioStreamEngine();

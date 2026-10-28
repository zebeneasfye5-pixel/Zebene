import React from 'react';
import { X, Radio, Volume2, Sparkles, Check, Globe, Cpu } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { audioStreamEngine } from '../services/audioStreamEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const LanguageEngineModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const activeMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleLanguagePick = (code: LanguageCode) => {
    audioStreamEngine.setLanguage(code);
    onSelectLanguage(code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-amber-500/40 shadow-2xl shadow-amber-500/10 text-slate-100 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">{t.aiLanguageEngine}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                8 Channels Live
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.switchAudioAndText}</p>
          </div>
        </div>

        {/* Active Audio Channel Banner */}
        <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {t.activeAudioStream}
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                <span>{activeMeta.flag}</span>
                <span>{activeMeta.nativeName} ({activeMeta.name})</span>
                <span className="text-xs text-amber-300 font-mono font-normal">[{activeMeta.audioFrequency}]</span>
              </div>
            </div>
          </div>

          {/* Dynamic Audio Visualizer Bar */}
          <div className="flex items-center gap-1 bg-black/40 px-3 py-2 rounded-lg border border-slate-800">
            {[40, 75, 100, 60, 90, 45, 80, 65, 95, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-amber-500 to-emerald-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.max(8, h * 0.22)}px`,
                  animationDelay: `${i * 90}ms`,
                  animationDuration: '700ms',
                }}
              />
            ))}
          </div>
        </div>

        {/* Live Audio Quote in Active Language */}
        <div className="mb-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-amber-200/90 italic flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white not-italic mr-1.5">Live AI Interpreter:</span>
            "{activeMeta.sampleGreeting}"
          </div>
        </div>

        {/* 8 Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguagePick(lang.code)}
                className={`group relative text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{lang.flag}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        {lang.nativeName}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-amber-500/30 text-amber-200 border border-amber-400/40 px-1.5 py-0.2 rounded font-mono">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{lang.name}</div>
                    <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                      {lang.audioFrequency}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-700 group-hover:border-slate-500 flex items-center justify-center text-slate-500">
                      <Radio className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Technical Architecture Info */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Translation Telemetry & Specifications</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px]">
            <div>Model: <span className="text-amber-300">Oneworld Neural-v4</span></div>
            <div>Latency: <span className="text-emerald-400">12ms ultra-low</span></div>
            <div>Channels: <span className="text-slate-200">8 Isolated Feeds</span></div>
            <div>Acoustics: <span className="text-slate-200">48kHz / 24-bit OPUS</span></div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-xs tracking-wider transition shadow-lg"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

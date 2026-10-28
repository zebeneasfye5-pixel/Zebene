import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  variant?: 'sidebar' | 'banner' | 'pill';
  onInstalled?: () => void;
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'sidebar', onInstalled }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setInstallSuccess(true);
        if (onInstalled) onInstalled();
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Desktop / Browser without prompt event yet
      setShowIOSGuide(true);
    }
  };

  if (isInstalled) {
    if (variant === 'sidebar') {
      return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Oneworld App Installed</span>
        </div>
      );
    }
    return null;
  }

  if (installSuccess) {
    return (
      <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
        <CheckCircle2 className="w-4 h-4" />
        <span>Installed! Check your homescreen</span>
      </div>
    );
  }

  return (
    <>
      {variant === 'sidebar' && (
        <button
          onClick={handleInstallClick}
          className="w-full group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 hover:border-amber-400/60 text-amber-300 hover:text-amber-200 transition-all shadow-sm"
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wide text-amber-200">Install App (PWA)</div>
              <div className="text-[10px] text-amber-300/70">Native offline experience</div>
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
            {isIOS ? 'iOS' : 'APK / PWA'}
          </span>
        </button>
      )}

      {variant === 'banner' && (
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border-b border-amber-500/30 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Install <strong>Oneworld</strong> for instant room audio and native controls</span>
          </div>
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition text-[11px]"
          >
            <Download className="w-3.5 h-3.5" />
            Install App
          </button>
        </div>
      )}

      {variant === 'pill' && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-medium transition"
          title="Install Progressive Web App"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Install App</span>
        </button>
      )}

      {/* iOS Safari or Browser Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl text-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Install Oneworld (PWA)</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Oneworld is a standalone Progressive Web App founded by Zebene Asfaye (2026).
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 space-y-2">
              <div className="font-semibold text-amber-300">On iPhone / iPad:</div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Tap the <strong>Share</strong> button (box with upward arrow) in Safari.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Scroll down and select <strong>"Add to Home Screen"</strong>.</span>
              </div>
              <div className="border-t border-slate-700 pt-2 font-semibold text-amber-300">On Chrome / Android:</div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">•</span>
                <span>Tap the three dots in browser menu and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

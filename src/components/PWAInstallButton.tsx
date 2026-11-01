import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AppLogo } from './AppLogo';

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-b border-amber-500/40 text-xs text-amber-200 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-white">እንደ ቴሌግራም እና ፌስቡክ እራሱን ችሎ እንዲከፈት: </span>
              <span className="text-amber-300">አፑን በስልክዎ ወይም በኮምፒውተርዎ ላይ ይጫኑ (Install Standalone App)</span>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl hover:brightness-110 transition text-xs shadow shrink-0 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>አፑን ጫን (Install App)</span>
          </button>
        </div>
      )}

      {variant === 'pill' && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-bold transition shadow-sm active:scale-95"
          title="እንደ ቴሌግራም እና ፌስቡክ እራሱን ችሎ ከብራውዘር ተላቆ የሚከፈት መተግበሪያ (Install Standalone App)"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">አፑን ጫን (PWA)</span>
        </button>
      )}

      {/* iOS Safari or Browser Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#091322] border border-amber-500/50 p-6 shadow-2xl text-slate-100 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3.5 mb-4">
              <AppLogo size="lg" />
              <div>
                <h3 className="text-base font-bold text-white lowercase">oneworld መተግበሪያን ጫን (Install PWA)</h3>
                <p className="text-[11px] text-amber-300 font-mono">
                  የተመሰረተው በዘበነ አስፍዬ (Zebene Asfaye) • 2026
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed mb-4">
              <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>ልክ እንደ ቴሌግራም እና ፌስቡክ ከብራውዘር ውጭ እራሱን ችሎ ይከፈታል!</span>
              </div>
              አፑን ከጫኑ በኋላ ከብሮውዘር ገደብ ተላቆ ሙሉ ማያ (Standalone Window) በመሆን በስልክዎ ዋና ገጽ ወይም በኮምፒውተርዎ ዴስክቶፕ ላይ እንደ ገለልተኛ ፕሮግራም ይሰራል። ኢንተርኔት በሌለበት ቦታም ከመስመር ውጭ ውይይቶችንና ቅንብሮችን ያቀርባል።
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 space-y-3">
              <div className="font-bold text-cyan-300">በአንድሮይድ እና በኮምፒውተር (Chrome / Edge):</div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>በብሮውዘሩ አናት ላይ ያለውን <strong>"Install"</strong> ወይም ባለ 3 ነጥብ ሜኑ በመጫን <strong>"Add to Home screen" / "Install app"</strong> የሚለውን ይምረጡ::</span>
              </div>

              <div className="border-t border-slate-800 pt-2 font-bold text-amber-300">በአይፎን እና አይፓድ (iOS Safari):</div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>በSafari ስር ያለውን የ <strong>Share</strong> (ወደ ላይ ቀስት ያለበት) ምልክት ይጫኑ።</span>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>ወደ ታች ዝቅ ብለው <strong>"Add to Home Screen" (ወደ ዋና ገጽ አክል)</strong> የሚለውን ይጫኑ።</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
            >
              ተረድቻለሁ (Got it)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

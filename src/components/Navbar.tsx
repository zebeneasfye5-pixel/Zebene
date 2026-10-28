import React from 'react';
import {
  Menu,
  Radio,
  Landmark,
  Shield,
  Volume2,
  Sparkles,
  Layers,
  Gamepad2,
  Lock,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface Props {
  onToggleSidebar: () => void;
  currentLanguage: LanguageCode;
  onOpenLanguageModal: () => void;
  onOpenFinancials: () => void;
  onOpenAdmin: () => void;
  onOpenGamesArena: () => void;
}

export const Navbar: React.FC<Props> = ({
  onToggleSidebar,
  currentLanguage,
  onOpenLanguageModal,
  onOpenFinancials,
  onOpenAdmin,
  onOpenGamesArena,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#050B14]/95 border-b border-amber-500/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: 3-line Dashboard Sidebar Menu button (ባለ 3 ሰረዝ ምልክት ዳሽ ቦርድ) + Logo */}
        <div className="flex items-center gap-3">
          {/* Permanent Top-Left 3-Line Dashboard Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="group p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-300 transition shadow-sm flex items-center gap-2"
            aria-label="ባለ 3 ሰረዝ ዳሽ ቦርድ ማውጫ (Dashboard Sidebar Menu)"
            title="Open 3-Line Dashboard Menu (ባለ 3 ሰረዝ ምልክት ዳሽ ቦርድ)"
          >
            {/* Distinctive 3-Line Icon (ባለ 3 ሰረዝ ምልክት) */}
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-5 h-0.5 bg-amber-400 rounded-full group-hover:w-4 transition-all" />
              <span className="w-4 h-0.5 bg-amber-300 rounded-full group-hover:w-5 transition-all" />
              <span className="w-5 h-0.5 bg-amber-400 rounded-full group-hover:w-3 transition-all" />
            </div>
            <span className="hidden lg:inline text-xs font-bold text-amber-300/90">
              ዳሽ ቦርድ
            </span>
          </button>

          {/* Logo & Founder Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <span className="text-sm font-black tracking-tighter">Hበ1</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white font-serif">
                  ONEWORLD
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2026
                </span>
              </div>
              <p className="text-[10px] text-amber-400/90 truncate max-w-[190px] sm:max-w-none">
                {t.founderSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Items: Games Arena, AI Language Engine, Financials, Admin PIN, PWA Install */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Games & Lottery Arena Quick Access */}
          <button
            onClick={onOpenGamesArena}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-700/20 border border-amber-400/50 hover:border-amber-400 text-xs text-amber-300 font-bold transition shadow-sm"
            title="የጨዋታዎች እና ሎተሪ ማዕከል (Gebeta, Genna, Speed Chess, Daily Lottery)"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span className="hidden sm:inline">ጨዋታዎች (Arena)</span>
            <span className="text-[9px] font-mono bg-amber-500/30 px-1 rounded text-amber-200">
              60/10/10
            </span>
          </button>

          {/* AI Language Engine Quick Selector Button */}
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-xs text-amber-200 transition shadow-sm"
            title="Open AI Language Engine (8 Languages)"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-sm">{activeLangMeta.flag}</span>
            <span className="font-bold hidden sm:inline">{activeLangMeta.nativeName}</span>
            <span className="hidden md:inline font-mono text-[10px] text-amber-400/80">
              [{activeLangMeta.audioFrequency.split(' ')[0]}]
            </span>
          </button>

          {/* Financial Engine Button */}
          <button
            onClick={onOpenFinancials}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 hover:border-emerald-400 text-xs text-emerald-300 font-semibold transition"
            title="Financial Architecture & Revenue Engine (Chapa / CBE / Stripe / PayPal)"
          >
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Revenue Engine</span>
            <span className="text-[10px] font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">
              80/10/10
            </span>
          </button>

          {/* Secure Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-slate-300 hover:text-white transition"
            title="System Security Node (Admin Console)"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-mono text-[11px]">Admin Console</span>
          </button>

          {/* PWA Install Button */}
          <div className="hidden sm:block">
            <PWAInstallButton variant="pill" />
          </div>
        </div>
      </div>
    </header>
  );
};

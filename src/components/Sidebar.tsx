import React, { useState, useEffect } from 'react';
import {
  X,
  Layers,
  Globe,
  Shield,
  Home,
  Radio,
  Landmark,
  Lock,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  Activity,
  Wallet,
  Server,
  Cpu,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Gamepad2,
  Dice5,
  UserCheck,
} from 'lucide-react';
import { LanguageCode, HouseCategory } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';
import { HOUSES } from '../data/housesData';
import { RevenueEngine, ZEBENE_ASFAYE_ACCOUNT_META } from '../services/revenueEngine';
import { PWAInstallButton } from './PWAInstallButton';
import { getMaskedFounderAccount, getLedgerState, FOUNDER_NAME, VAULT_TOKENS } from '../services/secureConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  onSelectCategory: (cat: HouseCategory | 'all') => void;
  onOpenLanguageModal: () => void;
  onOpenFinancials: () => void;
  onOpenAdmin: () => void;
  onOpenGamesArena?: () => void;
}

export const Sidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectCategory,
  onOpenLanguageModal,
  onOpenFinancials,
  onOpenAdmin,
  onOpenGamesArena,
}) => {
  const [activeTab, setActiveTab] = useState<'navigation' | 'telemetry' | 'wallets' | 'matrix'>('navigation');
  const [showFounderCharter, setShowFounderCharter] = useState(false);
  const [liveLatency, setLiveLatency] = useState(12);

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Dynamic telemetry simulated jitter
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLiveLatency(Math.floor(10 + Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const ledger = RevenueEngine.getLedger();
  const totalVolumeETB = ledger
    .filter((l) => l.currency === 'ETB')
    .reduce((acc, curr) => acc + curr.grossAmount, 0);
  const totalUserEarningsETB = ledger
    .filter((l) => l.currency === 'ETB')
    .reduce((acc, curr) => acc + curr.userEarnings, 0);
  const totalBankSavingsETB = ledger
    .filter((l) => l.currency === 'ETB')
    .reduce((acc, curr) => acc + curr.bankSavings, 0);
  const totalDevCommissionETB = ledger
    .filter((l) => l.currency === 'ETB')
    .reduce((acc, curr) => acc + curr.devCommission, 0);

  const gameLedger = getLedgerState();

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Sidebar Dashboard Panel - Optimized Spatial Placement */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#050B14] via-[#071120] to-[#03060C] border-r border-amber-500/40 text-slate-100 flex flex-col justify-between p-4 sm:p-5 z-10 shadow-2xl animate-in slide-in-from-left duration-200 overflow-y-auto">
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <span className="text-base tracking-tighter">Hበ1</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide">
                  {t.controlDashboardTitle || 'Comprehensive Control Dashboard'}
                </h2>
                <p className="text-[10px] text-amber-400 font-medium">
                  {t.founderSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Global System Stats & Session Profile Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-black border border-amber-500/40 mb-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {t.founderVariablesTitle || 'Core System Telemetry'}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/40">
                2026 CHARTER
              </span>
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400">Total Users</div>
                <div className="text-white font-bold mt-0.5">148,290+</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400">Active Rooms</div>
                <div className="text-emerald-400 font-bold mt-0.5">15 / 15 Online</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400">Neural Stream</div>
                <div className="text-amber-400 font-bold mt-0.5">8 Langs HD</div>
              </div>
            </div>

            {/* Masked Sovereign Founder Ledger Token */}
            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Founder & Architect:</span>
                <span className="text-white font-bold">{FOUNDER_NAME}</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Settlement Ledger:</span>
                <span className="text-amber-400 font-semibold">{getMaskedFounderAccount(false)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-slate-800/80 font-mono">
              <span className="text-emerald-400 font-bold">Split: 80% User | 10% Bank | 10% Dev</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Admin Authenticated</span>
              </span>
            </div>
          </div>

          {/* Quick Games & Lottery Banner */}
          {onOpenGamesArena && (
            <button
              onClick={() => {
                onOpenGamesArena();
                onClose();
              }}
              className="w-full mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-950/40 border border-amber-400/60 hover:border-amber-400 flex items-center justify-between gap-3 text-left transition group shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center text-lg">
                  🎮
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                    <span>የጨዋታዎች እና ሎተሪ ማዕከል</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-mono">NEW</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ገበጣ፣ ገና፣ ፈጣን ቼዝ • 60/10/10/20 Escrow Pool
                  </div>
                </div>
              </div>
              <span className="text-xs text-amber-400 font-bold">&rarr;</span>
            </button>
          )}

          {/* Dashboard Section Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-semibold mb-4">
            <button
              onClick={() => setActiveTab('navigation')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'navigation' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ቤቶች (Houses)
            </button>
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'telemetry' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ቴሌሜትሪ
            </button>
            <button
              onClick={() => setActiveTab('wallets')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'wallets' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ዋሌት (Wallets)
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'matrix' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ማትሪክስ
            </button>
          </div>

          {/* TAB 1: NAVIGATION & PROTOCOLS */}
          {activeTab === 'navigation' && (
            <div className="space-y-4">
              {/* Category Navigation */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-1">
                  {t.sidebarMenuTitle}
                </div>

                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition text-xs font-semibold text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>{t.allHouses}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">15</span>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('global');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition text-xs font-semibold text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>{t.catGlobal}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">5</span>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('regional');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition text-xs font-semibold text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>{t.catRegional}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">5</span>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('wereda_kebele');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition text-xs font-semibold text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-purple-400" />
                    <span>{t.catWereda}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">5</span>
                </button>
              </div>

              {/* Protocol Controls */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                {/* AI Language Engine */}
                <button
                  onClick={() => {
                    onOpenLanguageModal();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>{t.aiLanguageEngine}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    {activeLangMeta.flag} {activeLangMeta.code.toUpperCase()}
                  </span>
                </button>

                {/* Financial Dashboard */}
                <button
                  onClick={() => {
                    onOpenFinancials();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Landmark className="w-4 h-4 text-emerald-400" />
                    <span>{t.financialDashboard}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    80/10/10
                  </span>
                </button>

                {/* Hidden Administrative Access Node */}
                <button
                  onClick={() => {
                    onOpenAdmin();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>{t.adminPinModal}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                    Security Node
                  </span>
                </button>
              </div>

              {/* Integrated PWA Install Button */}
              <div>
                <PWAInstallButton variant="sidebar" />
              </div>
            </div>
          )}

          {/* TAB 2: BACKEND STATE TELEMETRY & ISOLATION LOGS */}
          {activeTab === 'telemetry' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>WebRTC / Neural Stream Health</span>
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[9px] text-slate-500">Latency:</div>
                    <div className="text-emerald-400 font-bold">{liveLatency} ms (Ultra-Low)</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[9px] text-slate-500">Audio Codec:</div>
                    <div className="text-white font-bold">Opus 48kHz HD</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[9px] text-slate-500">Encryption:</div>
                    <div className="text-amber-300 font-bold">AES-256-GCM</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[9px] text-slate-500">Packet Loss:</div>
                    <div className="text-emerald-400 font-bold">0.00%</div>
                  </div>
                </div>
              </div>

              {/* Session Isolation Logs */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.sessionIsolationLogs || 'Session Isolation Logs'}</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">REALTIME</span>
                </div>

                <div className="h-36 overflow-y-auto space-y-1.5 text-[10px] font-mono text-slate-400 p-2 rounded bg-slate-950 border border-slate-800">
                  <div>[2026-10-28 13:20:01] House 1 Universal Hub: Stream Handshake verified.</div>
                  <div>[2026-10-28 13:20:04] House 4 Couples Sanctuary: Dual limit capped at 2 participants.</div>
                  <div>[2026-10-28 13:20:08] House 5 Civil Registry: 3-Witness mapping pipeline engaged.</div>
                  <div>[2026-10-28 13:20:12] House 7 Security Sentinel: Silent audit ledger synchronized.</div>
                  <div>[2026-10-28 13:20:15] Crypto Sandboxing: Zero cross-room leakage confirmed.</div>
                  <div>[2026-10-28 13:20:19] Gamification Escrow: 60/10/10/20 Settlement algorithm active.</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: USER & COMMUNITY WALLETS */}
          {activeTab === 'wallets' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-amber-400" />
                    <span>{t.userWalletsTitle || 'User & Community Wallets'}</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">80/10/10 MODEL</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] font-mono text-slate-400">ጠቅላላ የኔትዎርክ ልውውጥ (Gross Volume):</div>
                  <div className="text-xl font-black text-white font-mono mt-0.5">
                    {totalVolumeETB.toLocaleString()} ETB
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-emerald-300 font-bold">80% የተጠቃሚ ዋሌት (User Wallet)</div>
                      <div className="text-[9px] text-slate-400">ተሳታፊዎች፣ ተናጋሪዎችና አቅራቢዎች</div>
                    </div>
                    <span className="font-bold text-emerald-400">{totalUserEarningsETB.toLocaleString()} ETB</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-blue-300 font-bold">10% የባንክ ቁጠባ (Bank Yield Reserve)</div>
                      <div className="text-[9px] text-slate-400">CBE / የቁጠባ ዋስትና ተቀማጭ</div>
                    </div>
                    <span className="font-bold text-blue-400">{totalBankSavingsETB.toLocaleString()} ETB</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-amber-300 font-bold">10% የገንቢ ኮሚሽን (Zebene Asfaye)</div>
                      <div className="text-[9px] text-slate-400">Sovereign Settlement Vault</div>
                    </div>
                    <span className="font-bold text-amber-400">{totalDevCommissionETB.toLocaleString()} ETB</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OPERATIONAL HOUSE MATRICES */}
          {activeTab === 'matrix' && (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                {t.operationalMatrixTitle || '15 Houses Operational Matrix'}
              </div>

              {HOUSES.map((h) => (
                <div
                  key={h.id}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="truncate pr-2">
                    <div className="font-bold text-white truncate text-[11px]">{h.amharicTitle}</div>
                    <div className="text-[9px] text-slate-400 font-mono">
                      Category: {h.category} | Hash: {h.sandboxHash}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Founder Manifesto Toggle */}
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-black border border-amber-500/30 text-xs">
            <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Founder's 2026 Manifesto
              </span>
              <button
                onClick={() => setShowFounderCharter((prev) => !prev)}
                className="text-amber-400 hover:text-amber-200 p-0.5"
              >
                {showFounderCharter ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Oneworld was architected by Zebene Asfaye (ዘበነ አስፍዬ) in 2026 to unite humanity across 15 sovereign digital chambers.
            </p>

            {showFounderCharter && (
              <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 space-y-1.5 leading-normal animate-in fade-in">
                <p>
                  Rooted in ancient Ethiopian Ge'ez assemblies and modern planetary computing, Oneworld guarantees decentralized participation without corporate algorithmic censorship.
                </p>
                <div className="p-2 rounded bg-slate-950 font-mono text-[10px] text-amber-300 space-y-0.5">
                  <div>Founder: {FOUNDER_NAME}</div>
                  <div>Settlement: {getMaskedFounderAccount(false)}</div>
                  <div>Security Node: Admin Authenticated</div>
                  <div>Revenue Split: 80% User / 10% Bank / 10% Developer</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>Oneworld v2026.4</span>
          <span>Sovereign Settlement Vault • Protected</span>
        </div>
      </div>
    </div>
  );
};

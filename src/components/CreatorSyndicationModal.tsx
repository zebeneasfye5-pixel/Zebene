import React, { useState, useEffect } from 'react';
import {
  X,
  Radio,
  Tv,
  DollarSign,
  TrendingUp,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Play,
  Square,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  creatorSyndicationService,
  SyndicationPlatform,
  SyndicationStats,
} from '../services/creatorSyndicationService';
import { autonomousMonetizationEngine } from '../services/autonomousMonetizationEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomTitle?: string;
}

export const CreatorSyndicationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  roomTitle = 'oneworld Main Assembly',
}) => {
  const [platforms, setPlatforms] = useState<SyndicationPlatform[]>(
    creatorSyndicationService.getPlatforms()
  );
  const [stats, setStats] = useState<SyndicationStats>(
    creatorSyndicationService.getStats()
  );
  const [activeTab, setActiveTab] = useState<'relays' | 'monetization' | 'keys'>(
    'relays'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = creatorSyndicationService.subscribe(() => {
      setPlatforms(creatorSyndicationService.getPlatforms());
      setStats(creatorSyndicationService.getStats());
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStream = (id: string, name: string) => {
    const state = creatorSyndicationService.toggleStream(id);
    showToast(`${name}: ${state ? '🔴 LIVE Relay Activated' : 'Relay Paused'}`);
  };

  const handleToggleAll = (active: boolean) => {
    creatorSyndicationService.toggleAll(active);
    showToast(
      active
        ? '🚀 Multi-Cast LIVE across YouTube, TikTok, Twitch, Meta & X!'
        : '⏹ All external relays stopped.'
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#070D18] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-red-950/30 via-[#070D18] to-cyan-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-pink-600 to-cyan-400 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#070D18] rounded-[10px] flex items-center justify-center">
                <Tv className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Creator Multi-Cast & Monetization Hub
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                  LIVE SYNDICATE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                YouTube • TikTok • Twitch • Meta Reels • X Creator Rewards Bridge
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Summary Bar */}
        <div className="px-4 py-3 bg-[#050912] border-b border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-red-400" />
              <span>Cross-Platform Audience</span>
            </div>
            <div className="text-lg font-extrabold text-white mt-0.5">
              {stats.totalCrossPlatformViewers.toLocaleString()}{' '}
              <span className="text-[11px] font-normal text-emerald-400">Viewers</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-amber-400" />
              <span>Syndicated Yield (USD)</span>
            </div>
            <div className="text-lg font-extrabold text-amber-300 mt-0.5">
              ${stats.totalRevenueUSD.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-cyan-400" />
              <span>Yield in Local Currency</span>
            </div>
            <div className="text-lg font-extrabold text-cyan-300 mt-0.5">
              {stats.totalRevenueETB.toLocaleString()}{' '}
              <span className="text-[10px] font-normal text-slate-400">ETB</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Founder Vault Yield</span>
            </div>
            <div className="text-lg font-extrabold text-emerald-300 mt-0.5">
              {stats.developerYieldETB.toLocaleString()}{' '}
              <span className="text-[10px] font-normal text-slate-400">ETB</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-b border-slate-800/80">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('relays')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'relays'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📡 Live Broadcasters ({stats.activeRelays}/5)
            </button>
            <button
              onClick={() => setActiveTab('monetization')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'monetization'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💰 Automated Payout Engine
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'keys'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔑 RTMP / Ingestion Keys
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleToggleAll(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-semibold transition"
            >
              <Play className="w-3 h-3" />
              <span>Go All Live</span>
            </button>
            <button
              onClick={() => handleToggleAll(false)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 hover:border-rose-400 text-rose-300 text-xs font-semibold transition"
            >
              <Square className="w-3 h-3" />
              <span>Halt All</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Tab 1: Live Relays */}
          {activeTab === 'relays' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>
                  Active Room Stream Source:{' '}
                  <strong className="text-white">{roomTitle}</strong>
                </span>
                <span className="text-emerald-400 font-mono">
                  Sync: Opus 48kHz HD Audio + H.264/AV1 Video
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {platforms.map((p) => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border bg-gradient-to-br ${p.brandColor} transition-all relative overflow-hidden`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: p.iconColor }}
                          />
                          <h4 className="font-bold text-white text-sm">{p.name}</h4>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{p.channelName}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-[10px] text-slate-300">
                          {p.badge}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => handleToggleStream(p.id, p.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                            p.isStreaming
                              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {p.isStreaming ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                              <span>BROADCASTING</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-cyan-400" />
                              <span>START RELAY</span>
                            </>
                          )}
                        </button>
                        <span className="text-[11px] font-mono text-slate-400">
                          {p.isStreaming
                            ? `${p.activeViewers.toLocaleString()} watching`
                            : 'Idle'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">{p.payoutModel}</span>
                      <span className="font-bold text-emerald-300 font-mono">
                        +{p.totalEarningsETB.toLocaleString()} ETB
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Autonomous Monetization Engine */}
          {activeTab === 'monetization' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-300 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>ሳይነንሳዊ የሆነ የገቢ ማግኛ ስርዓት (Autonomous Revenue Architecture)</span>
                </div>
                የoneworld ሲስተም የተጠቃሚዎችን የፊት ገፅ ንፁህ በማድረግ የክፍያ ጥያቄዎችን በስተጀርባ
                በሳይንሳዊ መንገድ ያከናውናል:: ከቲክቶክ የቀጥታ ስጦታዎች (Live Diamonds), ከዩቲዩብ
                ማስታወቂያዎችና ከTwitch አጋርነት የሚመነጩ ገቢዎች በቀጥታ ወደ ገንቢው ሉዓላዊ ቮልት
                (Zebene Asfaye Sovereign Vault) እና ወደ ፈጣሪዎች የባንክ አካውንት በራስ-ሰር
                ይሰበሰባሉ::
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400">TikTok Creator Rewards</span>
                  <div className="text-base font-bold text-cyan-400 mt-1">72,150.00 ETB</div>
                  <span className="text-[10px] text-slate-500">Live Diamonds & Gifts Relay</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400">YouTube Partner Ad Pool</span>
                  <div className="text-base font-bold text-red-400 mt-1">48,920.50 ETB</div>
                  <span className="text-[10px] text-slate-500">55% Creator Share + SuperChat</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Twitch & Meta Performance</span>
                  <div className="text-base font-bold text-purple-400 mt-1">42,150.00 ETB</div>
                  <span className="text-[10px] text-slate-500">Bits, Subs & Reels Monthly Bonus</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Developer Continuous Micro-Yield:</span>
                  <span className="text-emerald-400 font-bold">25.00% Sovereign Protocol Share</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Designated Beneficiary Account:</span>
                  <span className="text-white font-mono">Zebene Asfaye (Hበ1 Sovereign Vault)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Settlement Currency:</span>
                  <span className="text-amber-300 font-semibold">ETB / USD / Stablecoin Webhook</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Automated Transfer Frequency:</span>
                  <span className="text-cyan-300 font-semibold">Continuous Real-Time Micro-Settlement (Every 5s)</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: RTMP & Ingestion Keys */}
          {activeTab === 'keys' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Secure streaming credentials for OBS Studio, vMix, TikTok Live Studio, and YouTube Ingestion servers:
              </p>

              {platforms.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: p.iconColor }}
                      />
                      {p.name}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono">Encrypted AES-256</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="p-2 rounded bg-black/50 border border-slate-800 text-slate-300 truncate">
                      <span className="text-slate-500 block text-[9px] uppercase">RTMP Ingest Server</span>
                      {p.rtmpServer}
                    </div>
                    <div className="p-2 rounded bg-black/50 border border-slate-800 text-slate-300 truncate">
                      <span className="text-slate-500 block text-[9px] uppercase">Stream Key</span>
                      {p.streamKey}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Toast Alert */}
        {toastMessage && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-xl animate-fade-in flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#050912] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero Front-Facing Interference • Background Autonomy Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            ዝጋ (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

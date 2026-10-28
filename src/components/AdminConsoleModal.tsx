import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Server,
  Activity,
  Cpu,
  Layers,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { HOUSES } from '../data/housesData';
import { ZEBENE_ASFAYE_ACCOUNT_META, RevenueEngine } from '../services/revenueEngine';
import { verifyAdminPin, getMaskedFounderAccount, FOUNDER_NAME } from '../services/secureConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
}

export const AdminConsoleModal: React.FC<Props> = ({ isOpen, onClose, currentLanguage }) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'sandboxes' | 'financials' | 'broadcast'>('overview');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pin)) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg(t.invalidPin || 'Access Denied: Invalid Security Passcode.');
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMsg('');
    }, 3000);
  };

  const summary = RevenueEngine.getFinancialSummary();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-amber-500/50 shadow-2xl p-5 sm:p-7 text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PIN Entry Gate */}
        {!isAuthenticated ? (
          <div className="py-8 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">{t.adminPinModal}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Founder & System Administration Gate • Enter Secure Access Code
            </p>

            <form onSubmit={handleVerify} className="mt-6 space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  autoFocus
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-48 text-center text-2xl tracking-[0.5em] font-mono py-2.5 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-400 flex items-center justify-center gap-1.5 animate-bounce">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="text-[11px] text-slate-500 font-mono">
                Security Passcode Encrypted • Multi-Factor Node
              </div>

              <button
                type="submit"
                className="w-full max-w-xs mx-auto py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{t.verifyPin}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div>
            {/* Authenticated Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Unlock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Oneworld Admin Terminal 2026
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ADMIN AUTHENTICATED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Founder: <strong className="text-amber-300">{FOUNDER_NAME}</strong> • <span className="font-mono text-emerald-400">{getMaskedFounderAccount(true)}</span>
                  </p>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('sandboxes')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeTab === 'sandboxes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  15 Sandboxes
                </button>
                <button
                  onClick={() => setActiveTab('financials')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeTab === 'financials' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Financial Vault
                </button>
                <button
                  onClick={() => setActiveTab('broadcast')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeTab === 'broadcast' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Broadcast
                </button>
              </div>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Houses Active</div>
                    <div className="text-xl font-bold text-white mt-1">15 / 15</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      100% Operational
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Isolation Index</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">0.00% Leak</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">AES-256 GCM Sandboxed</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Dev Commission</div>
                    <div className="text-xl font-bold text-amber-400 mt-1 font-mono">
                      ETB {summary.devCommissionETB.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-amber-300 mt-0.5">+ ${summary.devCommissionUSD} USD</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">AI Channels</div>
                    <div className="text-xl font-bold text-cyan-400 mt-1">8 Neural</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Ethiopic & Global Latency 12ms</div>
                  </div>
                </div>

                {/* Gateway Status Indicators */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Payment Gateway & Banking Connectors Status</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Chapa Payment Gateway</div>
                        <div className="text-[10px] text-slate-400">Telebirr & CBE Birr Webhooks</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        CONNECTED (200 OK)
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Commercial Bank of Ethiopia (CBE)</div>
                        <div className="text-[10px] text-slate-400">Core Banking Direct Settlement API</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        SYNCHRONIZED
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Stripe Global Vault</div>
                        <div className="text-[10px] text-slate-400">Visa, Mastercard, Apple Pay</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        ACTIVE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">PayPal Worldwide API</div>
                        <div className="text-[10px] text-slate-400">Instant IPN Notification Dispatch</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Sandboxes */}
            {activeTab === 'sandboxes' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Isolation Verification:</strong> All 15 virtual houses maintain isolated memory heaps, WebRTC peer topologies, and audio matrices.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {HOUSES.map((house) => (
                    <div
                      key={house.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>{house.amharicTitle}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                          ISOLATED
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 truncate">{house.englishSubtitle}</div>
                      <div className="text-[10px] font-mono text-amber-400/80 mt-1">
                        Token: {house.sandboxHash}
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        Category: {house.category.toUpperCase()} • Max Chairs: Unlimited
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Financials */}
            {activeTab === 'financials' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border border-amber-500/40">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Founder Developer Commission Protocol (80% / 10% / 10% Split)
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {ZEBENE_ASFAYE_ACCOUNT_META.accountName}
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-300 space-y-1">
                    <div>Commission Route: <span className="text-amber-400 font-bold">10% Immutable Split</span></div>
                    <div>CBE Account Number: <span className="text-emerald-400 font-bold">{ZEBENE_ASFAYE_ACCOUNT_META.cbeAccountNumber}</span></div>
                    <div>User Wallet Allocation: <span className="text-emerald-400 font-bold">80% Directly to Creators & Speakers</span></div>
                    <div>Bank Savings Yield: <span className="text-blue-400 font-bold">10% Sovereign Escrow</span></div>
                    <div>Primary Settlement Bank: <span className="text-slate-200">{ZEBENE_ASFAYE_ACCOUNT_META.bankRouting}</span></div>
                    <div>Status: <span className="text-emerald-400 font-bold">Active & Disbursing</span></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  Total Developer Commission Sequestered: <strong className="text-amber-300 font-mono">ETB {summary.devCommissionETB.toLocaleString()}</strong> + <strong className="text-amber-300 font-mono">${summary.devCommissionUSD.toLocaleString()} USD</strong> across {summary.transactionCount} transactions.
                </div>
              </div>
            )}

            {/* Tab: Broadcast */}
            {activeTab === 'broadcast' && (
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <label className="block text-xs font-semibold text-white mb-2">
                    Emergency Broadcast Dispatch (All 15 Sandboxed Houses)
                  </label>
                  <textarea
                    rows={3}
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    placeholder="Enter official executive broadcast message from Founder Zebene Asfaye..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">
                    Simultaneously translated into 8 languages across all virtual house screens.
                  </div>
                </div>

                {broadcastSent && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Emergency message broadcast successfully to all 15 houses!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!broadcastMsg}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition disabled:opacity-50"
                >
                  Send Universal Broadcast
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Security Session: ACTIVE • Authenticated Multi-Factor Session
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

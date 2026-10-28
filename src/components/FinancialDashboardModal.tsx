import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Percent,
  CheckCircle2,
  Lock,
  Landmark,
  Wallet,
  Receipt,
  UserCheck,
} from 'lucide-react';
import { LanguageCode, RevenueSplitResult } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { RevenueEngine, ZEBENE_ASFAYE_ACCOUNT_META } from '../services/revenueEngine';
import { HOUSES } from '../data/housesData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  selectedHouseId?: number;
}

export const FinancialDashboardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLanguage,
  selectedHouseId = 1,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const [activeGateway, setActiveGateway] = useState<'Chapa' | 'CBE' | 'Stripe' | 'PayPal'>('Chapa');
  const [targetHouseId, setTargetHouseId] = useState<number>(selectedHouseId);
  const [amountInput, setAmountInput] = useState<string>('1000');
  const [donorNameInput, setDonorNameInput] = useState<string>('Abebe Girma');
  const [purposeInput, setPurposeInput] = useState<string>('House Seat Contribution');
  const [processing, setProcessing] = useState<boolean>(false);
  const [lastTxn, setLastTxn] = useState<RevenueSplitResult | null>(null);

  const summary = RevenueEngine.getFinancialSummary();
  const ledger = RevenueEngine.getLedger();

  const isETB = activeGateway === 'Chapa' || activeGateway === 'CBE';
  const currency = isETB ? 'ETB' : 'USD';
  const numAmount = Math.max(0, parseFloat(amountInput) || 0);

  // Strict 80% User's Wallet, 10% Bank Savings, 10% Developer Commission
  const previewUser = (numAmount * 0.8).toFixed(2);
  const previewSavings = (numAmount * 0.1).toFixed(2);
  const previewDev = (numAmount * 0.1).toFixed(2);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0) return;

    setProcessing(true);
    setTimeout(() => {
      const result = RevenueEngine.calculateSplit(
        numAmount,
        currency,
        activeGateway,
        targetHouseId,
        donorNameInput.trim() || 'Verified Contributor',
        purposeInput.trim() || 'Virtual Seat Contribution'
      );
      setLastTxn(result);
      setProcessing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#0B1528] via-[#070F1D] to-[#050B14] border border-amber-500/40 shadow-2xl p-5 sm:p-7 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {t.financialDashboard}
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                80 / 10 / 10 LEDGER
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Chapa API & CBE Direct API for Ethiopian Birr • Stripe & PayPal for Global Currencies
            </p>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="my-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200/90 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Bank Security Protocol:</strong> All transactions are executed via encrypted API webhooks. Administrative payouts and ledger access are encrypted under Multi-Factor Security Vault Architecture.
          </span>
        </div>

        {/* 3 Strict Revenue Split Architecture Cards (80 / 10 / 10) */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Percent className="w-3.5 h-3.5 text-amber-400" />
            <span>Automated Revenue Split Ledger Algorithm</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* 80% User's Wallet */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 relative overflow-hidden">
              <div className="text-[10px] uppercase font-mono text-emerald-400 font-bold tracking-wider">80% Share</div>
              <div className="text-lg font-bold text-white mt-1">User's Wallet (የተጠቃሚ ዋሌት)</div>
              <div className="text-xs text-emerald-300/80 mt-1 leading-snug">
                Host compensation, speaker incentives, and community returns.
              </div>
              <div className="mt-2.5 text-xs font-mono font-semibold text-emerald-400">
                ETB {summary.userEarningsETB.toLocaleString()} / ${summary.userEarningsUSD.toLocaleString()}
              </div>
            </div>

            {/* 10% Bank Savings Yield */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/50 relative overflow-hidden">
              <div className="text-[10px] uppercase font-mono text-blue-400 font-bold tracking-wider">10% Yield</div>
              <div className="text-lg font-bold text-white mt-1">Bank Savings Yield (የባንክ ቁጠባ)</div>
              <div className="text-xs text-blue-300/80 mt-1 leading-snug">
                Automated high-yield bank savings & emergency liquidity pool.
              </div>
              <div className="mt-2.5 text-xs font-mono font-semibold text-blue-400">
                ETB {summary.bankSavingsETB.toLocaleString()} / ${summary.bankSavingsUSD.toLocaleString()}
              </div>
            </div>

            {/* 10% Developer Commission - Zebene Asfaye */}
            <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/60 relative overflow-hidden ring-1 ring-amber-500/40">
              <div className="text-[10px] uppercase font-mono text-amber-400 font-bold tracking-wider">10% Commission</div>
              <div className="text-lg font-bold text-white mt-1">Zebene Asfaye (ዘበነ አስፍዬ)</div>
              <div className="text-xs text-amber-300/90 mt-1 font-mono">
                {ZEBENE_ASFAYE_ACCOUNT_META.cbeAccountNumber}
              </div>
              <div className="mt-2.5 text-xs font-mono font-semibold text-amber-400">
                ETB {summary.devCommissionETB.toLocaleString()} / ${summary.devCommissionUSD.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Live Transaction / Payment Processor Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          {/* Payment Form */}
          <form onSubmit={handleProcessPayment} className="md:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Process Payment / Seat Contribution</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Live API Gateways</span>
            </div>

            {/* Gateway Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveGateway('Chapa')}
                className={`p-2.5 rounded-xl border text-center transition ${
                  activeGateway === 'Chapa'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">Chapa API</div>
                <div className="text-[9px] text-slate-400">Telebirr / CBE</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveGateway('CBE')}
                className={`p-2.5 rounded-xl border text-center transition ${
                  activeGateway === 'CBE'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">CBE Direct</div>
                <div className="text-[9px] text-slate-400">Settlement Vault</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveGateway('Stripe')}
                className={`p-2.5 rounded-xl border text-center transition ${
                  activeGateway === 'Stripe'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">Stripe Global</div>
                <div className="text-[9px] text-slate-400">Cards / Apple Pay</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveGateway('PayPal')}
                className={`p-2.5 rounded-xl border text-center transition ${
                  activeGateway === 'PayPal'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">PayPal</div>
                <div className="text-[9px] text-slate-400">Global Checkout</div>
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Amount ({currency})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-sm font-mono focus:outline-none"
                    placeholder="Amount..."
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 font-bold">
                    {currency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Target House
                </label>
                <select
                  value={targetHouseId}
                  onChange={(e) => setTargetHouseId(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs focus:outline-none"
                >
                  {HOUSES.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.amharicTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Instant Split Calculator Preview */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
              <div className="text-slate-400 font-semibold mb-1 flex items-center justify-between">
                <span>Auto-Split Preview (80% / 10% / 10%):</span>
                <span className="text-white font-mono font-bold">{numAmount} {currency}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                <div className="bg-emerald-950/40 p-2 rounded text-emerald-400">
                  <div className="text-[9px]">80% User Wallet</div>
                  <div className="font-bold">{previewUser}</div>
                </div>
                <div className="bg-blue-950/40 p-2 rounded text-blue-400">
                  <div className="text-[9px]">10% Bank Yield</div>
                  <div className="font-bold">{previewSavings}</div>
                </div>
                <div className="bg-amber-950/40 p-2 rounded text-amber-400">
                  <div className="text-[9px]">10% Zebene (CBE)</div>
                  <div className="font-bold">{previewDev}</div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing || numAmount <= 0}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
            >
              {processing ? (
                <span>በማስተላለፍ ላይ (Processing)...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ክፍያውን በ{activeGateway} አረጋግጥና አከፋፍል</span>
                </>
              )}
            </button>
          </form>

          {/* Account Structure Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/50 via-[#0B1528] to-slate-950 border border-amber-500/40 shadow-md">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Developer Commission Vault</div>
                  <div className="text-[10px] text-amber-300 font-mono">Zebene Asfaye (ዘበነ አስፍዬ)</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 space-y-1.5 font-mono pt-1">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">CBE Account:</span>
                  <span className="text-amber-300 font-bold">{ZEBENE_ASFAYE_ACCOUNT_META.cbeAccountNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Commission Share:</span>
                  <span className="text-emerald-400 font-bold">10.00% Immutable</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">User Wallet Share:</span>
                  <span className="text-emerald-400 font-bold">80.00% Immutable</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Settlement Route:</span>
                  <span className="text-slate-200">Commercial Bank of Ethiopia</span>
                </div>
              </div>
            </div>

            {lastTxn && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-slate-200 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settlement Successfully Disbursed!</span>
                </div>
                <div className="font-mono text-[10px] text-slate-300 space-y-0.5">
                  <div>Txn ID: <span className="text-amber-300">{lastTxn.transactionId}</span></div>
                  <div>User Wallet (80%): <span className="text-emerald-400 font-bold">{lastTxn.userEarnings} {lastTxn.currency}</span></div>
                  <div>Zebene Commission (10%): <span className="text-amber-400 font-bold">{lastTxn.devCommission} {lastTxn.currency}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ledger Table */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time Financial Settlement Ledger (80/10/10 Split)</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              {ledger.length} verified transactions
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-[11px] font-mono text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Transaction</th>
                  <th className="py-2.5 px-3">Gateway</th>
                  <th className="py-2.5 px-3">Gross</th>
                  <th className="py-2.5 px-3 text-emerald-400">User Wallet (80%)</th>
                  <th className="py-2.5 px-3 text-blue-400">Bank Savings (10%)</th>
                  <th className="py-2.5 px-3 text-amber-400">Zebene (10%)</th>
                  <th className="py-2.5 px-3">House</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {ledger.slice(0, 5).map((txn) => (
                  <tr key={txn.transactionId} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-amber-300">{txn.transactionId}</td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">
                        {txn.paymentGateway}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-bold text-white">
                      {txn.grossAmount.toLocaleString()} {txn.currency}
                    </td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">
                      +{txn.userEarnings.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-blue-400">
                      +{txn.bankSavings.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-amber-400 font-bold">
                      +{txn.devCommission.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-slate-400">House {txn.houseId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs tracking-wider transition min-h-[44px]"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

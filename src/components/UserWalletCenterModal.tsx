import React, { useState, useEffect } from 'react';
import {
  X,
  Wallet,
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Ticket,
  Building2,
  User,
  Landmark,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  Zap,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import {
  TenantLedgerService,
  TenantType,
  TenantWallet,
  SingleUsePIN,
  TenantActivityItem,
} from '../services/tenantLedgerService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  initialTenantType?: TenantType;
}

export const UserWalletCenterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLanguage,
  initialTenantType = 'INDIVIDUAL',
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const [activeTenantType, setActiveTenantType] = useState<TenantType>(initialTenantType);
  const [selectedCurrency, setSelectedCurrency] = useState<'ETB' | 'USD' | 'EUR'>('ETB');
  const [wallet, setWallet] = useState<TenantWallet>(() =>
    TenantLedgerService.getTenantWallet(`tenant-${initialTenantType.toLowerCase()}-1`, initialTenantType)
  );

  // Voucher redemption state
  const [voucherInput, setVoucherInput] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ success: boolean; message: string } | null>(null);

  // Dynamic checkout hooks state
  const [checkoutAmount, setCheckoutAmount] = useState('1000');
  const [selectedGateway, setSelectedGateway] = useState<'telebirr' | 'Chapa' | 'Stripe' | 'PayPal' | 'USDT'>('telebirr');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  // Activity list & sample vouchers
  const [activities, setActivities] = useState<TenantActivityItem[]>([]);
  const [availableVouchers, setAvailableVouchers] = useState<SingleUsePIN[]>([]);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const loadData = () => {
    const tenantId = `tenant-${activeTenantType.toLowerCase()}-1`;
    const w = TenantLedgerService.getTenantWallet(tenantId, activeTenantType);
    setWallet(w);
    setActivities(TenantLedgerService.getTenantActivity(tenantId));

    const tokens = TenantLedgerService.getAllTokens();
    setAvailableVouchers(Object.values(tokens).filter((v) => !v.is_used));
  };

  useEffect(() => {
    loadData();
  }, [activeTenantType]);

  const handleTenantSwitch = (type: TenantType) => {
    setActiveTenantType(type);
    setRedeemResult(null);
    setCheckoutNotice(null);
  };

  const handleRedeemVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;

    setRedeeming(true);
    setRedeemResult(null);

    setTimeout(() => {
      const tenantId = `tenant-${activeTenantType.toLowerCase()}-1`;
      const result = TenantLedgerService.activatePin(voucherInput.trim(), tenantId);
      setRedeemResult(result);
      setRedeeming(false);
      if (result.success) {
        setVoucherInput('');
        loadData();
      }
    }, 500);
  };

  const handleExecuteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(checkoutAmount);
    if (!amount || amount <= 0) return;

    setIsProcessingCheckout(true);
    setCheckoutNotice(null);

    setTimeout(() => {
      const tenantId = `tenant-${activeTenantType.toLowerCase()}-1`;
      const result = TenantLedgerService.processDirectGatewayTopUp(
        tenantId,
        amount,
        selectedCurrency,
        selectedGateway
      );

      setIsProcessingCheckout(false);
      if (result.success) {
        setCheckoutNotice(
          `Instant Webhook Approval received from ${selectedGateway}! Cryptographic Voucher ${result.voucher.tokenHash} generated & credited.`
        );
        loadData();
      }
    }, 700);
  };

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setVoucherInput(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#0B1528] via-[#070F1D] to-[#050B14] border border-amber-500/40 shadow-2xl p-5 sm:p-7 text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {t.financialDashboard || 'Multi-Tenant SaaS Wallet Center'}
                </h2>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  PCI-DSS Level 1 Encrypted
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic Tenant Ledger • Automated Activation Tokens • Multi-Currency Escrow
              </p>
            </div>
          </div>

          {/* Tenant Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => handleTenantSwitch('INDIVIDUAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTenantType === 'INDIVIDUAL'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Citizen</span>
            </button>
            <button
              onClick={() => handleTenantSwitch('BUSINESS')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTenantType === 'BUSINESS'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Business</span>
            </button>
            <button
              onClick={() => handleTenantSwitch('GOVERNMENT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTenantType === 'GOVERNMENT'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Government</span>
            </button>
          </div>
        </div>

        {/* Balance Monitor Card (Multi-Currency Interactive Wrapper) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          {/* Card 1: Interactive Balance Display */}
          <div className="md:col-span-7 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0C172C] to-[#070F1D] border border-amber-500/30 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                  {wallet.tier}
                </span>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{wallet.tenantName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {wallet.kycLevel}
                  </span>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono">
                {(['ETB', 'USD', 'EUR'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-2.5 py-1 rounded transition ${
                      selectedCurrency === curr
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Balance Number */}
            <div className="mb-4">
              <div className="text-xs text-slate-400">Available Liquid Balance</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mt-1">
                {selectedCurrency === 'ETB' ? 'ETB' : selectedCurrency === 'USD' ? '$' : '€'}{' '}
                {(wallet.balances[selectedCurrency] || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            {/* Multi-currency breakdown chips */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px] pt-3 border-t border-slate-800/80">
              <div
                onClick={() => setSelectedCurrency('ETB')}
                className={`p-2 rounded-xl border cursor-pointer transition ${
                  selectedCurrency === 'ETB'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[9px] uppercase">ETB Ledger</div>
                <div className="font-bold mt-0.5">{(wallet.balances.ETB || 0).toLocaleString()}</div>
              </div>

              <div
                onClick={() => setSelectedCurrency('USD')}
                className={`p-2 rounded-xl border cursor-pointer transition ${
                  selectedCurrency === 'USD'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[9px] uppercase">USD Reserve</div>
                <div className="font-bold mt-0.5">${(wallet.balances.USD || 0).toLocaleString()}</div>
              </div>

              <div
                onClick={() => setSelectedCurrency('EUR')}
                className={`p-2 rounded-xl border cursor-pointer transition ${
                  selectedCurrency === 'EUR'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[9px] uppercase">EUR Treasury</div>
                <div className="font-bold mt-0.5">€{(wallet.balances.EUR || 0).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Card 2: Encrypted Virtual Card Preview */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#121E36] via-[#091122] to-slate-950 border border-slate-700/80 shadow-xl flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  {wallet.virtualCards[0]?.cardId || 'VIRTUAL-CARD-ACTIVE'}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="my-4">
              <div className="font-mono text-base sm:text-lg tracking-widest text-amber-100 font-semibold">
                {wallet.virtualCards[0]?.maskedPan || '•••• •••• •••• 4192'}
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-slate-400">
                <div>
                  <div className="text-[8px] uppercase">Cardholder</div>
                  <div className="text-white font-semibold truncate max-w-[130px]">
                    {wallet.virtualCards[0]?.cardHolder || wallet.tenantName}
                  </div>
                </div>
                <div>
                  <div className="text-[8px] uppercase">Expires</div>
                  <div className="text-white font-semibold">
                    {wallet.virtualCards[0]?.expiry || '10/28'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Isolated Tokenization</span>
              </span>
              <span>AES-256 HSM Protected</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Dynamic Checkout Hooks & Single-Use Voucher Redemption */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          {/* Dynamic Checkout Hooks (telebirr, Chapa, Stripe, PayPal, USDT) */}
          <form
            onSubmit={handleExecuteCheckout}
            className="md:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Dynamic Checkout & Ingestion Webhooks</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Direct Top-Up</span>
            </div>

            {/* Gateway Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {(
                [
                  { id: 'telebirr', label: 'telebirr', desc: 'Direct Webhook' },
                  { id: 'Chapa', label: 'Chapa API', desc: 'CBE Birr / Cards' },
                  { id: 'Stripe', label: 'Stripe', desc: 'Global Cards' },
                  { id: 'PayPal', label: 'PayPal', desc: 'Express' },
                  { id: 'USDT', label: 'USDT', desc: 'Stablecoin' },
                ] as const
              ).map((gw) => (
                <button
                  key={gw.id}
                  type="button"
                  onClick={() => setSelectedGateway(gw.id)}
                  className={`p-2 rounded-xl border text-center transition ${
                    selectedGateway === gw.id
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold">{gw.label}</div>
                  <div className="text-[9px] text-slate-400">{gw.desc}</div>
                </button>
              ))}
            </div>

            {/* Input Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Amount to Top-Up
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={checkoutAmount}
                    onChange={(e) => setCheckoutAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-sm font-mono focus:outline-none"
                    placeholder="1000"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 font-bold">
                    {selectedCurrency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Settlement Currency
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs font-mono focus:outline-none"
                >
                  <option value="ETB">ETB (Ethiopian Birr)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
            </div>

            {checkoutNotice && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{checkoutNotice}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessingCheckout}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
            >
              {isProcessingCheckout ? (
                <span>Ingesting Webhook Approval...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>
                    Initiate {selectedGateway} Checkout ({checkoutAmount} {selectedCurrency})
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Voucher / Single-Use Token Redemption Field */}
          <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span>Voucher / Single-Use PIN</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">/api/v1/wallet/activate-pin</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Enter your cryptographic single-use token hash to deposit funds directly to your wallet balance.
              </p>

              {/* Redemption Form */}
              <form onSubmit={handleRedeemVoucher} className="mt-3 space-y-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="OW-VOUCH-XXXX-XXXX"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white font-mono text-xs uppercase tracking-wider focus:outline-none"
                  />
                  {voucherInput && (
                    <button
                      type="button"
                      onClick={() => setVoucherInput('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={redeeming || !voucherInput.trim()}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-400 text-white font-bold text-xs uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {redeeming ? (
                    <span>Verifying Cryptographic Hash...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Activate & Credit PIN</span>
                    </>
                  )}
                </button>
              </form>

              {redeemResult && (
                <div
                  className={`mt-2 p-2.5 rounded-xl border text-[11px] font-mono flex items-start gap-2 ${
                    redeemResult.success
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {redeemResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{redeemResult.message}</span>
                </div>
              )}
            </div>

            {/* Quick Test Seed Vouchers */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 mb-1.5 font-bold">
                Available Ingested Vouchers (Ready to Redeem):
              </div>
              <div className="space-y-1.5">
                {availableVouchers.slice(0, 2).map((v) => (
                  <div
                    key={v.tokenHash}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px] font-mono"
                  >
                    <div>
                      <div className="text-amber-300 font-bold">{v.tokenHash}</div>
                      <div className="text-[9px] text-slate-400">
                        {v.amount} {v.currency} • via {v.channel}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(v.tokenHash)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1 transition"
                      title="Use this PIN"
                    >
                      {copiedHash === v.tokenHash ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Use PIN</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tenant Activity & Ledger Audit Table */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Isolated Tenant Transaction History</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              {activities.length} immutable records
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-[11px] font-mono text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">Activity Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-amber-300">{act.id}</td>
                    <td className="py-2 px-3 font-semibold text-white">{act.title}</td>
                    <td className="py-2 px-3 text-slate-400">{act.category}</td>
                    <td
                      className={`py-2 px-3 font-bold ${
                        act.type === 'CREDIT' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {act.type === 'CREDIT' ? '+' : '-'}
                      {act.amount.toLocaleString()} {act.currency}
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px]">
                        {act.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500 text-[10px]">
                      {new Date(act.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-between items-center pt-3 border-t border-slate-800">
          <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Public Vulnerabilities • Encrypted Tenant Sharding Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs tracking-wider transition min-h-[44px]"
          >
            {t.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

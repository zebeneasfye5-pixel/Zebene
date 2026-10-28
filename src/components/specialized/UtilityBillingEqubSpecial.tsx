import React, { useState } from 'react';
import {
  Coins,
  Zap,
  Droplet,
  Phone,
  RotateCw,
  CheckCircle2,
  DollarSign,
  Gift,
  Sparkles,
} from 'lucide-react';

export const UtilityBillingEqubSpecial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'utilities' | 'equb'>('utilities');

  // Utility billing state
  const [selectedUtility, setSelectedUtility] = useState<'eeu' | 'water' | 'telecom'>('eeu');
  const [billAccountNo, setBillAccountNo] = useState('EEU-9842104-ADDIS');
  const [billAmount, setBillAmount] = useState('650');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Digital Equb (እቁብ) distribution cycle state
  const [equbRound, setEqubRound] = useState(4);
  const [equbMembers, setEqubMembers] = useState([
    { name: 'Abebe Bikila Guild', status: 'Dues Paid', won: false },
    { name: 'Selamawit Desta', status: 'Dues Paid', won: true, round: 1 },
    { name: 'Dr. Almaz Tefera', status: 'Dues Paid', won: true, round: 2 },
    { name: 'Yared Tesfaye', status: 'Dues Paid', won: true, round: 3 },
    { name: 'Dawit Mengistu', status: 'Dues Paid', won: false },
    { name: 'Bethlehem Assefa', status: 'Dues Paid', won: false },
  ]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);

  const handlePayUtility = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 4000);
    }, 600);
  };

  const handleRunEqubLottery = () => {
    setIsDrawing(true);
    setWinnerMessage(null);
    setTimeout(() => {
      const remaining = equbMembers.filter((m) => !m.won);
      if (remaining.length > 0) {
        const winner = remaining[Math.floor(Math.random() * remaining.length)];
        setEqubMembers((prev) =>
          prev.map((m) =>
            m.name === winner.name ? { ...m, won: true, round: equbRound } : m
          )
        );
        setEqubRound((prev) => prev + 1);
        setWinnerMessage(`Round ${equbRound} Winner: ${winner.name}! 60,000 ETB Pooled Payout Disbursed.`);
      } else {
        setWinnerMessage('All rounds completed! Resetting 12-round cycle.');
      }
      setIsDrawing(false);
    }, 1000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-950/20 via-[#07131D] to-black border border-emerald-500/40 p-4 sm:p-5 text-white space-y-4">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>የአገልግሎት ክፍያና የዲጂታል እቁብ ማዕከል</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SETTLEMENT & EQUB
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Utility Automated Settlement (EEU/Water/Telecom) & Global Digital Equb Cycles
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('utilities')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'utilities'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            አገልግሎት ክፍያ (Utilities)
          </button>
          <button
            onClick={() => setActiveTab('equb')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'equb'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ዲጂታል እቁብ (Equb Cycle)
          </button>
        </div>
      </div>

      {activeTab === 'utilities' ? (
        /* Utility Billing Form */
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setSelectedUtility('eeu');
                setBillAccountNo('EEU-9842104-ADDIS');
                setBillAmount('650');
              }}
              className={`p-3 rounded-xl border text-center transition ${
                selectedUtility === 'eeu'
                  ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 mx-auto mb-1 text-amber-400" />
              <div>የኤሌክትሪክ (EEU)</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedUtility('water');
                setBillAccountNo('WTR-AAWSA-04918');
                setBillAmount('380');
              }}
              className={`p-3 rounded-xl border text-center transition ${
                selectedUtility === 'water'
                  ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Droplet className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
              <div>የውሃ አገልግሎት (AAWSA)</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedUtility('telecom');
                setBillAccountNo('0911223344');
                setBillAmount('500');
              }}
              className={`p-3 rounded-xl border text-center transition ${
                selectedUtility === 'telecom'
                  ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
              <div>ኢትዮ ቴሌኮም (EthioTel)</div>
            </button>
          </div>

          <form onSubmit={handlePayUtility} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  የሂሳብ መለያ ቁጥር (Account Number / Meter)
                </label>
                <input
                  type="text"
                  required
                  value={billAccountNo}
                  onChange={(e) => setBillAccountNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  የክፍያ መጠን (Amount in ETB)
                </label>
                <input
                  type="number"
                  required
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold"
                />
              </div>
            </div>

            {paymentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ክፍያው በCBE Direct API በስኬት ተፈፅሟል! ደረሰኝ ቁጥር #REC-2026-90412 ተዘጋጅቷል።</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPaying}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              {isPaying ? (
                <span>በማስተላለፍ ላይ...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ክፍያውን በቴሌብር / CBE Birr ፈፅም</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Digital Equb (እቁብ) Distribution Cycle */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>የዲጂታል እቁብ ዙር {equbRound} (Digital Equb Round {equbRound})</span>
              </div>
              <div className="text-[11px] text-slate-400">Weekly Pool: 60,000 ETB (10,000 ETB per member)</div>
            </div>

            <button
              onClick={handleRunEqubLottery}
              disabled={isDrawing}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
              <span>{isDrawing ? 'እጣ በማውጣት ላይ...' : 'የእቁብ እጣ አውጣ (Draw Winner)'}</span>
            </button>
          </div>

          {winnerMessage && (
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/50 text-xs text-amber-300 font-bold flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4" />
              <span>{winnerMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
            {equbMembers.map((member, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  member.won
                    ? 'bg-amber-950/30 border-amber-400/50 text-amber-300'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="text-[10px] text-slate-400">{member.status}</div>
                </div>
                {member.won ? (
                  <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                    Won (Rd {member.round})
                  </span>
                ) : (
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                    Eligible
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

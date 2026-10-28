import React, { useState } from 'react';
import {
  Briefcase,
  Home,
  Car,
  UserCheck,
  ShieldCheck,
  DollarSign,
  Lock,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface ExchangeListing {
  id: string;
  category: 'Real Estate' | 'Automotive' | 'Jobs & Labor';
  title: string;
  location: string;
  price: number;
  currency: string;
  broker: string;
  brokerBond: string;
  highestBid: number;
  isContractLocked?: boolean;
}

export const House13InteractiveExchangeSpecial: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Real Estate' | 'Automotive' | 'Jobs & Labor'>('All');
  const [listings, setListings] = useState<ExchangeListing[]>([
    {
      id: 'lst-1',
      category: 'Real Estate',
      title: 'ዘመናዊ G+2 የመኖሪያ ቪላ (Bole Atlas)',
      location: 'Addis Ababa (Bole)',
      price: 24000000,
      currency: 'ETB',
      broker: 'Abebe Certified Brokers Guild',
      brokerBond: 'BOND-CBE-99120',
      highestBid: 24500000,
    },
    {
      id: 'lst-2',
      category: 'Automotive',
      title: 'ቶዮታ ራቭ4 2024 (Toyota RAV4 Hybrid)',
      location: 'Hawassa / Addis',
      price: 9800000,
      currency: 'ETB',
      broker: 'Southern Motors Verified Agent',
      brokerBond: 'BOND-CBE-48192',
      highestBid: 10100000,
    },
    {
      id: 'lst-3',
      category: 'Jobs & Labor',
      title: 'ዋና የሶፍትዌር መሃንዲስ (Senior Cloud Architect)',
      location: 'National / Remote',
      price: 120000,
      currency: 'ETB/mo',
      broker: 'Ethio-Tech Talent Exchange',
      brokerBond: 'BOND-MINT-7718',
      highestBid: 135000,
    },
  ]);

  const [bidAmount, setBidAmount] = useState<Record<string, string>>({});
  const [lockedContractId, setLockedContractId] = useState<string | null>(null);

  const handlePlaceBid = (id: string) => {
    const amount = Number(bidAmount[id]);
    if (!amount) return;

    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, highestBid: Math.max(l.highestBid, amount) } : l))
    );
    setBidAmount({ ...bidAmount, [id]: '' });
  };

  const handleLockContract = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isContractLocked: true } : l))
    );
    setLockedContractId(id);
    setTimeout(() => setLockedContractId(null), 4000);
  };

  const filtered =
    selectedCategory === 'All' ? listings : listings.filter((l) => l.category === selectedCategory);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#0B150A] to-[#040A03] border border-lime-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-lime-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Certified Brokerage & Escrow Exchange</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Mandatory Bond & Contract Locking</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የድለላ፣ የፈላጊና ተፈላጊና የንብረት ግብይት አዳራሽ (Brokerage & Labor Exchange)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {(['All', 'Real Estate', 'Automotive', 'Jobs & Labor'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs transition ${
                selectedCategory === cat ? 'bg-lime-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-lime-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] mb-2">
                <span className="px-2 py-0.5 rounded bg-lime-950/60 text-lime-300 font-mono border border-lime-500/30">
                  {item.category}
                </span>
                <span className="text-emerald-400 font-mono flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>BONDED</span>
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug mb-1">
                {item.title}
              </h4>
              <div className="text-[10px] text-slate-400 mb-1">{item.location}</div>
              <div className="text-[10px] text-slate-500 mb-2">
                ደላላ: <span className="text-slate-300">{item.broker}</span> ({item.brokerBond})
              </div>
              <div className="flex items-baseline justify-between mb-3 bg-slate-950 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400">የመነሻ ዋጋ:</span>
                <span className="text-xs font-bold text-white font-mono">
                  {item.price.toLocaleString()} {item.currency}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-2.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">ከፍተኛ ጨረታ:</span>
                <span className="font-mono font-bold text-amber-300">
                  {item.highestBid.toLocaleString()} {item.currency}
                </span>
              </div>

              {item.isContractLocked ? (
                <div className="py-2 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-bold text-center border border-emerald-500/50 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>ውል በኢስክሮው ተቆልፏል (Contract Locked)</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      placeholder="አዲስ የጨረታ ዋጋ..."
                      value={bidAmount[item.id] || ''}
                      onChange={(e) => setBidAmount({ ...bidAmount, [item.id]: e.target.value })}
                      className="w-2/3 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                    <button
                      onClick={() => handlePlaceBid(item.id)}
                      className="w-1/3 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-lime-300 font-bold text-xs"
                    >
                      ጨርት
                    </button>
                  </div>
                  <button
                    onClick={() => handleLockContract(item.id)}
                    className="w-full py-1.5 rounded-lg bg-lime-600 hover:bg-lime-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>ውሉን አጽድቅና ቆልፍ (Lock Contract)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

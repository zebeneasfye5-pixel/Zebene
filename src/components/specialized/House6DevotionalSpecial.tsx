import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  DollarSign,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const House6DevotionalSpecial: React.FC = () => {
  const [selectedDenomination, setSelectedDenomination] = useState<
    'Orthodox' | 'Muslim' | 'Protestant' | 'Catholic' | 'Waaqeffanna'
  >('Orthodox');
  const [titheAmount, setTitheAmount] = useState('100');
  const [titheConfirmed, setTitheConfirmed] = useState(false);

  const denominationData = {
    Orthodox: {
      title: 'የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን መንፈሳዊ ጉባኤ',
      verse: '“እግዚአብሔር ብርሃኔና መድኃኒቴ ነው፤ የሚያስፈራኝ ማን ነው?” (መዝሙር 27:1)',
      sermonTitle: 'የሰላምና የአንድነት መንፈሳዊ ትምህርት በሊቀ ማእምራን',
      liveClergy: 'አባ ገብረኪዳን',
    },
    Muslim: {
      title: 'የኢትዮጵያ እስልምና ጉዳዮች ጠቅላይ ምክር ቤት ጉባኤ',
      verse: '“አላህ ሰላምንና መልካምነትን የሚያስተምሩትን ይወዳል፤ በእውነትና በትዕግስት ተመካከሩ።” (ሱረቱል አስር)',
      sermonTitle: 'የመልካም ስነ-ምግባር እና የአብሮነት ሁትባ (Sermon)',
      liveClergy: 'ኡስታዝ አህመድ',
    },
    Protestant: {
      title: 'የወንጌላውያን አብያተ ክርስቲያናት ህብረት',
      verse: '“በፍቅር እርስ በርሳችሁ ተሳሰቡ፤ ሰላምንም ከሁሉ ጋር ተከታተሉ።” (ዕብራውያን 12:14)',
      sermonTitle: 'የእምነት ፅናት እና የህይወት ለውጥ ትምህርት',
      liveClergy: 'ፓስተር ዮናስ',
    },
    Catholic: {
      title: 'የኢትዮጵያ ካቶሊካዊት ቤተክርስቲያን ጉባኤ',
      verse: '“የሚያስታርቁ ብፁዓን ናቸው፥ የእግዚአብሔር ልጆች ይባላሉና።” (ማቴዎስ 5:9)',
      sermonTitle: 'የፍቅርና የይቅርታ ወንጌል ጥናት',
      liveClergy: 'አቡነ ተስፋዬ',
    },
    Waaqeffanna: {
      title: 'የዋቄፈና ባህላዊና መንፈሳዊ እሴቶች ጉባኤ',
      verse: '“Waaqni tokkicha, nagaa fi dhugaa jaallata. Uumaa fi uumama kabajaa!”',
      sermonTitle: 'የተፈጥሮ፣ የሰላም እና የአይያና (Ayyaana) ትምህርት',
      liveClergy: 'Abbaa Gadaa & Luboota',
    },
  };

  const currentInfo = denominationData[selectedDenomination];

  const handleSendTithe = (e: React.FormEvent) => {
    e.preventDefault();
    setTitheConfirmed(true);
    setTimeout(() => setTitheConfirmed(false), 3500);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#12081C] to-[#080310] border border-purple-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Multi-Denominational Sanctuary</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Isolated Faith Streams & Zero Hate-Speech</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የእምነት፣ የቅዱሳት መጻሕፍት ጥናትና የመንፈሳዊ በረከት አዳራሽ (Devotional Hub)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs overflow-x-auto max-w-full">
          {(['Orthodox', 'Muslim', 'Protestant', 'Catholic', 'Waaqeffanna'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDenomination(d)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                selectedDenomination === d
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Left: Scripture of the Day */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>የእለቱ ቅዱስ ቃል / አንቀጽ (Sacred Verse)</span>
          </div>
          <blockquote className="text-xs text-purple-100 italic leading-relaxed border-l-2 border-purple-500 pl-3 py-1">
            {currentInfo.verse}
          </blockquote>
          <p className="text-[11px] text-slate-400 pt-1">
            በ{selectedDenomination} የእምነት ክፍል የተመሰጠረ የግል የፀሎትና የጥናት ማዕከል።
          </p>
        </div>

        {/* Center: Live Sermon & Audio Channel */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>የቀጥታ ስብከትና ትምህርት (Live Sermon)</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-500/40">
              AUDIO STREAM
            </span>
          </div>
          <div className="text-xs font-semibold text-amber-200">
            {currentInfo.sermonTitle}
          </div>
          <div className="text-[11px] text-slate-400">
            አስተማሪ: <span className="text-white font-medium">{currentInfo.liveClergy}</span>
          </div>
          <div className="w-full bg-slate-950 p-2 rounded-lg flex items-center justify-between text-[11px] text-slate-400">
            <span>HD Spatial Audio</span>
            <span className="text-emerald-400 font-mono">1,492 ምዕመናን በመከታተል ላይ</span>
          </div>
        </div>

        {/* Right: Tithe & Spiritual Gift (80/10/10) */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            <span>አስራት፣ በረከትና ምፅዋት (Tithe & Offering)</span>
          </div>
          <p className="text-[10px] text-slate-400">
            በ80/10/10 ሞዴል (80% ለተቋሙ፣ 10% ለቁጠባ፣ 10% ለዘበነ አስፋዬ ሉዓላዊ የክፍያ ቋት - Sovereign Settlement Vault)
          </p>
          <form onSubmit={handleSendTithe} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={titheAmount}
                onChange={(e) => setTitheAmount(e.target.value)}
                className="w-2/3 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                placeholder="Amount (ETB)"
              />
              <button
                type="submit"
                className="w-1/3 px-2 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                በረከት ላክ
              </button>
            </div>
            {titheConfirmed && (
              <div className="p-1.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px] text-center font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{titheAmount} ETB በረከትዎ ተቀባይነት አግኝቷል!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

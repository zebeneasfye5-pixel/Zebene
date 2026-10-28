import React, { useState, useEffect } from 'react';
import {
  Heart,
  Clock,
  Sparkles,
  Lock,
  Flame,
  Send,
  UserCheck,
  ShieldAlert,
  Scale,
  EyeOff,
  Users2,
  FileKey,
} from 'lucide-react';

interface DisappearingMessage {
  id: string;
  sender: string;
  text: string;
  timeLeft: number;
}

export const House4CouplesSanctuarySpecial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'case_context' | 'disappearing' | 'matching'>('case_context');

  // Case Context
  const [caseContext, setCaseContext] = useState<'legal' | 'whistleblower' | 'couples' | 'business'>('legal');

  // Compatibility Score Matcher
  const [lifestyleScore, setLifestyleScore] = useState(85);
  const [valuesScore, setValuesScore] = useState(92);
  const [communicationScore, setCommunicationScore] = useState(88);

  // Disappearing messages
  const [messages, setMessages] = useState<DisappearingMessage[]>([
    {
      id: 'dm-1',
      sender: 'SovereignCounsel_01',
      text: 'ሰላም፣ የዚህ ቻምበር ተሳታፊዎች ቁጥር በሲስተም ደረጃ በትክክል በ2 ብቻ የተገደበ ነው።',
      timeLeft: 28,
    },
    {
      id: 'dm-2',
      sender: 'PrivateParty_02',
      text: 'እጅግ በጣም ጥሩ፣ ማንም 3ኛ አካል ወደዚህ ክፍል መግባት ወይም ማዳመጥ አይችልም።',
      timeLeft: 22,
    },
  ]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prev) =>
        prev
          .map((m) => ({ ...m, timeLeft: m.timeLeft - 1 }))
          .filter((m) => m.timeLeft > 0)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendDisappearing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages([
      ...messages,
      {
        id: `dm-${Date.now()}`,
        sender: 'You (Confidential)',
        text: newMsg,
        timeLeft: 30,
      },
    ]);
    setNewMsg('');
  };

  const overallMatch = Math.round((lifestyleScore + valuesScore + communicationScore) / 3);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#1A0A14] to-[#0D040A] border border-rose-500/40 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Lock className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Strict 2-Participant Capping (Hard Limit)</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">Dual Isolation Locked (2/2)</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የሚስጥር ቤት • Confidential Dual Sanctuary (Legal, Whistleblower & Couples)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('case_context')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'case_context' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            የጉዳይ መስክ (Cases)
          </button>
          <button
            onClick={() => setActiveTab('disappearing')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'disappearing' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ጠፊ ቻት (Burn 30s)
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'matching' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ተኳሃኝነት (Couples)
          </button>
        </div>
      </div>

      {/* Strict 2-Participant Capacity Warning Banner */}
      <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-rose-300">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            <strong>የአባላት ቁጥር ገደብ:</strong> በዚህ ክፍለ-ጊዜ ከ2 ተሳታፊ በላይ መግባት በሲስተም ደረጃ በሃርድኮድ የታገደ ነው።
          </span>
        </div>
        <span className="font-mono text-[10px] bg-rose-900/60 text-rose-200 px-2 py-0.5 rounded border border-rose-500/40 font-bold shrink-0 ml-2">
          CAPPED: 2 PARTICIPANTS
        </span>
      </div>

      {/* Tab 1: Expanded Confidential Cases (Legal, Whistleblower, Couples, M&A) */}
      {activeTab === 'case_context' && (
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-200">
            የሚስጥራዊ ግንኙነት መስክ ይምረጡ (Select Confidential Domain):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                id: 'legal',
                title: 'የጠበቃና ደንበኛ (Attorney-Client)',
                desc: 'ህጋዊ የፍርድ ቤት ሚስጥራዊ መረጃ ልውውጥና ክስ ዝግጅት',
                icon: Scale,
              },
              {
                id: 'whistleblower',
                title: 'የአደጋ መረጃ (Whistleblower)',
                desc: 'ስም-አልባ የሙስናና የአደጋ መረጃ አቀባይ ከጋዜጠኛ ጋር',
                icon: FileKey,
              },
              {
                id: 'couples',
                title: 'የጥንዶች ትዳር (Couples)',
                desc: 'የሁለት ሰዎች ሚስጥራዊ የህይወትና የትዳር ተስፋ ውይይት',
                icon: Heart,
              },
              {
                id: 'business',
                title: 'ሚስጥራዊ ድርድር (Confidential M&A)',
                desc: 'ከፍተኛ የፋይናንስና የድርጅት ውህደት ሚስጥራዊ ድርድር',
                icon: Users2,
              },
            ].map((c) => {
              const Icon = c.icon;
              const isSelected = caseContext === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setCaseContext(c.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-rose-400' : 'text-slate-400'}`} />
                  <div className="text-xs font-bold">{c.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-snug">{c.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Timed Disappearing Chat */}
      {activeTab === 'disappearing' && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>መልእክቶች ከተላኩ ከ30 ሰከንድ በኋላ ከሰርቨርና ከመሳሪያ ላይ በራስ-ሰር ይጠፋሉ (Burn-After-Reading)</span>
            </span>
            <span className="font-mono text-[10px] text-emerald-400">ZERO FOOTPRINT</span>
          </div>

          <div className="h-44 overflow-y-auto space-y-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            {messages.length === 0 ? (
              <div className="text-center text-xs text-slate-500 pt-12">
                ምንም አዲስ መልእክት የለም። ሁሉም የቀደሙ መልእክቶች በጊዜ ገደባቸው ጠፍተዋል።
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-rose-300">{m.sender}: </span>
                    <span className="text-slate-200">{m.text}</span>
                  </div>
                  <span className="font-mono text-[10px] text-amber-400 flex items-center gap-1 shrink-0 ml-2">
                    <Clock className="w-3 h-3" />
                    <span>{m.timeLeft}s</span>
                  </span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendDisappearing} className="flex gap-2">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="ሚስጥራዊ ጠፊ መልእክት እዚህ ይጻፉ (30 ሰከንድ ቆይታ)..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ላክ</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Couples Compatibility */}
      {activeTab === 'matching' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-2xl font-black text-rose-300">
              {overallMatch}%
            </div>
            <div className="text-xs font-bold text-white mt-2">የተኳሃኝነት ነጥብ (Match Index)</div>
            <div className="text-[10px] text-slate-400 mt-1">
              በአልጎሪዝም የተረጋገጠ እሴት፣ አመለካከትና የህይወት ግብ ንፅፅር
            </div>
          </div>

          <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>የህይወት ዘይቤና ባህል (Lifestyle & Traditions)</span>
                <span className="font-mono text-rose-300">{lifestyleScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${lifestyleScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>የቤተሰብና መንፈሳዊ እሴቶች (Values & Concord)</span>
                <span className="font-mono text-rose-300">{valuesScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${valuesScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>ግልጽነትና ውይይት (Communication Quotient)</span>
                <span className="font-mono text-rose-300">{communicationScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${communicationScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

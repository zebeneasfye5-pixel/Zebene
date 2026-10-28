import React, { useState } from 'react';
import {
  Heart,
  PhoneCall,
  Video,
  PenTool,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const House12ClinicalCounselingSpecial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'support_group' | 'crisis'>('consultation');
  const [whiteboardNotes, setWhiteboardNotes] = useState(
    'የህይወት ሚዛን፣ የአእምሮ ሰላም እና የተመጣጠነ እረፍት እቅድ...'
  );
  const [crisisTriggered, setCrisisTriggered] = useState(false);

  const handleTrigger907 = () => {
    setCrisisTriggered(true);
    setTimeout(() => setCrisisTriggered(false), 5000);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#1C0A14] to-[#0D040A] border border-pink-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Heart className="w-5 h-5 fill-pink-500/30" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Mental Wellness & Psychological Sanctuary</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Licensed Therapists & 907 Hotline</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የስነ-ልቦና ምክክር፣ ቴራፒና የአእምሮ ጤና ማዕከል (Counseling Sanctuary)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTrigger907}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg animate-pulse"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>907 የአስቸኳይ መስመር (907 Hotline)</span>
          </button>
        </div>
      </div>

      {crisisTriggered && (
        <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>
            907 የአደጋ ጊዜ የስነ-ልቦና ድጋፍ ጥሪ ተገናኝቷል! ባለሙያ በቅጽበት ወደ መስመሩ እየገቡ ነው።
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('consultation')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'consultation' ? 'bg-pink-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          1-ለ-1 ምክክርና ዋይትቦርድ
        </button>
        <button
          onClick={() => setActiveTab('support_group')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'support_group' ? 'bg-pink-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          ስውር የድጋፍ ቡድን (Support Group)
        </button>
      </div>

      {/* Tab 1: Video Consultation & Interactive Whiteboard */}
      {activeTab === 'consultation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-pink-300">
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-pink-400" />
                <span>ሚስጥራዊ የቪዲዮ ክፍለ-ጊዜ (Encrypted Video Session)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">HIPAA-COMPLIANT</span>
            </div>
            <div className="h-36 rounded-lg bg-slate-950 flex flex-col items-center justify-center text-slate-500 text-xs">
              <ShieldCheck className="w-8 h-8 text-pink-500/60 mb-2" />
              <span>የተመሰጠረ የግል ምክክር መስመር ዝግጁ ነው</span>
              <span className="text-[10px] text-slate-600 mt-1">ዶ/ር ሰላም ታደሰ (Licensed Clinical Psychologist)</span>
            </div>
            <button className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5">
              <Video className="w-4 h-4" />
              <span>የቀጥታ ክፍለ-ጊዜውን ጀምር (Start Session)</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-pink-300">
              <span className="flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-pink-400" />
                <span>የቴራፒ ዋይትቦርድ (Interactive Therapy Whiteboard)</span>
              </span>
              <span className="text-[10px] text-slate-500">የጋራ ማስታወሻ</span>
            </div>
            <textarea
              value={whiteboardNotes}
              onChange={(e) => setWhiteboardNotes(e.target.value)}
              rows={5}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-pink-500 font-sans leading-relaxed"
            />
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>በክፍለ-ጊዜው መጨረሻ ማስታወሻው ወደ ደንበኛው የተመሰጠረ ካዝና ይላካል።</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Anonymized Support Groups */}
      {activeTab === 'support_group' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: 'የስራ ጫናና የድካም ማገገሚያ ቡድን',
              members: 24,
              time: 'ሰኞ እና ረቡዕ 1:00 PM',
              focus: 'Burnout Relief',
            },
            {
              title: 'የሀዘንና የህይወት ለውጥ ማፅናኛ ጉባኤ',
              members: 18,
              time: 'ማክሰኞ እና ሐሙስ 2:00 PM',
              focus: 'Grief Support',
            },
            {
              title: 'የወጣቶች የስነ-ልቦና ማበረታቻ ማዕከል',
              members: 42,
              time: 'ቅዳሜ 10:00 AM',
              focus: 'Youth Resilience',
            },
          ].map((grp, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">{grp.title}</div>
              <div className="text-[10px] text-pink-400 font-mono">{grp.focus}</div>
              <div className="text-[11px] text-slate-400">{grp.time}</div>
              <div className="text-[10px] text-slate-500">ተሳታፊዎች: {grp.members} አባላት</div>
              <button className="w-full mt-2 py-1.5 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white text-xs font-bold transition">
                በስውር ተቀላቀል (Join Anonymous)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Landmark,
  ShieldAlert,
  Vote,
  Radio,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileCheck,
} from 'lucide-react';

interface PolicyProposal {
  id: string;
  title: string;
  department: string;
  description: string;
  votesYes: number;
  votesNo: number;
  hasVoted?: 'yes' | 'no';
  status: 'Active Voting' | 'Adopted' | 'Emergency Council';
}

export const House3GovernanceStrategySpecial: React.FC = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [proposals, setProposals] = useState<PolicyProposal[]>([
    {
      id: 'pol-1',
      title: 'የታዳሽ ሃይል እና የቀጣናዊ ኔትዎርክ ማጠናከሪያ ፖሊሲ 2026',
      department: 'Ministry of Innovation & Energy',
      description:
        'በሁሉ አቀፍ ዲጂታል መሰረተ-ልማት የኤሌክትሪክና የቴሌኮም ስርጭትን 100% ተደራሽ የማድረግ ብሄራዊ ስትራቴጂ።',
      votesYes: 48,
      votesNo: 3,
      status: 'Active Voting',
    },
    {
      id: 'pol-2',
      title: 'የድንበር ተሻጋሪ ዲጂታል ንግድና የጉምሩክ ቅልጥፍና ማዕቀፍ',
      department: 'Ministry of Revenues & Trade',
      description:
        'በአንድ ዓለም የክፍያ ስርአት (80/10/10 ሞዴል) የወጪና ገቢ ንግድን በብሎክቼይን ሳንድቦክስ ማቀላጠፍ።',
      votesYes: 62,
      votesNo: 1,
      status: 'Active Voting',
    },
    {
      id: 'pol-3',
      title: 'የብሄራዊ የምግብ ዋስትና እና የግብርና AI ክትትል ረቂቅ',
      department: 'Ministry of Agriculture',
      description:
        'በሳተላይትና በድሮን የተደገፈ የዝናብና የምርት ትንበያ ለሁሉም ወረዳዎች በነፃ እንዲሰራጭ መፍቀድ።',
      votesYes: 75,
      votesNo: 0,
      status: 'Adopted',
    },
  ]);

  const handleVote = (id: string, decision: 'yes' | 'no') => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === id && !p.hasVoted) {
          return {
            ...p,
            hasVoted: decision,
            votesYes: decision === 'yes' ? p.votesYes + 1 : p.votesYes,
            votesNo: decision === 'no' ? p.votesNo + 1 : p.votesNo,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#07131B] to-[#040A10] border border-emerald-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>High-Security Statecraft & Strategy Portal</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-300">Biometric Whitelisted</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የባለስልጣናት፣ የሚኒስትሮችና ስትራቴጂካዊ የፖሊሲ አዳራሽ (Governance Hub)
            </h3>
          </div>
        </div>

        <button
          onClick={() => setIsEmergencyActive(!isEmergencyActive)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow ${
            isEmergencyActive
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{isEmergencyActive ? 'የአስቸኳይ ጊዜ ስርጭት ንቁ ነው 🔴' : 'የአስቸኳይ ጊዜ ስርጭት (Crisis Broadcast)'}</span>
        </button>
      </div>

      {/* Emergency Siren Broadcast Banner */}
      {isEmergencyActive && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/60 text-white flex items-center gap-3 animate-pulse">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-rose-200 uppercase tracking-wider">
              ብሄራዊ አስቸኳይ ጊዜ ስርጭት (Crisis Management Center)
            </div>
            <p className="text-rose-100 text-[11px] mt-0.5">
              የፌደራል ሚኒስትሮችና የክልል ፕሬዝዳንቶች የቪዲዮ አውታር ተገናኝቷል። በሁሉም ወረዳዎች የደህንነት ማስጠንቀቂያ በሳንድቦክስ ተልኳል።
            </p>
          </div>
        </div>
      )}

      {/* Policy Proposals & E2E Encrypted Voting */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Vote className="w-4 h-4 text-emerald-400" />
            <span>የተመሰጠረ የፖሊሲ ድምፅ መስጫ (E2E Encrypted Secret Ballot)</span>
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            CRYPTOGRAPHIC TOKEN VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {proposals.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1.5">
                  <span className="font-mono text-emerald-400">{item.department}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span className="text-emerald-400">ደግፍ: {item.votesYes}</span>
                  <span className="text-rose-400">ተቃወም: {item.votesNo}</span>
                </div>
                {item.hasVoted ? (
                  <div className="py-1 px-2 rounded bg-emerald-950/50 text-emerald-300 text-[10px] font-bold text-center border border-emerald-500/40">
                    ድምፅዎ በE2E ምስጠራ ተመዝግቧል ✓ ({item.hasVoted.toUpperCase()})
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(item.id, 'yes')}
                      className="flex-1 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/40 transition"
                    >
                      እደግፋለሁ (Yes)
                    </button>
                    <button
                      onClick={() => handleVote(item.id, 'no')}
                      className="flex-1 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/40 transition"
                    >
                      እቃወማለሁ (No)
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

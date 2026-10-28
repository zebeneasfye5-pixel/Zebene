import React, { useState } from 'react';
import {
  Scale,
  Award,
  FileCheck,
  Disc,
  ShieldCheck,
  Stamp,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { JudicialDecree } from '../../types';

export const JudiciaryDecreeSpecial: React.FC = () => {
  const [decree, setDecree] = useState<JudicialDecree>({
    decreeNumber: 'DECREE-ARB-2026-ETH-084',
    caseTitle: 'Wereda 03 Agricultural Land Boundary & Water Access Arbitration',
    claimantName: 'Kifle Tadesse (አቤቱታ አቅራቢ)',
    respondentName: 'Mulugeta Zewde (መልስ ሰጪ)',
    verdictSummary:
      'After elder testimony and satellite GIS land registry review, joint water diversion rights are awarded on an alternating 3-day schedule with restitution of border furrow.',
    presidingJudge: 'Honorable Judge Solomon Desta (ዋና ዳኛ)',
    isEnforced: true,
    issuedDate: '2026-10-28',
  });

  const [isRecording, setIsRecording] = useState(true);
  const [recordingSeconds, setRecordingSeconds] = useState(1482);
  const [showFullDecree, setShowFullDecree] = useState(false);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-950/20 via-[#0A0E1A] to-black border border-amber-500/40 p-4 sm:p-5 text-white space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>የአቤቱታና የዳኝነት ቻምበር (Courtroom)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                JUDICIAL ARBITRATION
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Automated Audio/Video Archive Recording & Legally Binding Civil Decree Document Generator
            </p>
          </div>
        </div>

        {/* Live Audio/Video Recording Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs self-start sm:self-auto">
          <div className="flex items-center gap-1.5 text-rose-400">
            <Disc className="w-4 h-4 animate-spin text-rose-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">COURT REC:</span>
          </div>
          <span className="text-white font-bold">{formatTime(recordingSeconds)}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1 rounded">SECURE AUDIO VAULT</span>
        </div>
      </div>

      {/* Virtual Courtroom Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-amber-400 font-bold">ተከራካሪ ወገኖች (Litigants)</div>
          <div className="font-semibold text-white truncate">ከሳሽ: {decree.claimantName}</div>
          <div className="font-semibold text-slate-300 truncate">ተከሳሽ: {decree.respondentName}</div>
          <div className="text-[10px] text-slate-500">Case Type: Property & Water Rights</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-amber-400 font-bold">ዋና ዳኛና ሽምግልና (Court Bench)</div>
          <div className="font-semibold text-white">{decree.presidingJudge}</div>
          <div className="text-[10px] text-slate-300">የቀበሌ የፍትህ ኮሚሽን ሰብሳቢ</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" />
            <span>Digital Judicial Gavel Armed</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-amber-400 font-bold">ህጋዊ ውሳኔ (Decree Document)</div>
          <div className="font-mono text-amber-300 font-semibold">{decree.decreeNumber}</div>
          <div className="text-[10px] text-slate-400">Date Issued: {decree.issuedDate}</div>
          <button
            onClick={() => setShowFullDecree((prev) => !prev)}
            className="text-[10px] text-amber-400 font-bold hover:underline block pt-1"
          >
            {showFullDecree ? 'ውሳኔውን አሳጥር' : 'ሙሉ የፍርድ ሰነድ ተመልከት...'}
          </button>
        </div>
      </div>

      {/* Generated Legal Binding Decree Document */}
      {showFullDecree && (
        <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-amber-500/40 space-y-3 font-serif text-slate-200 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                በኢትዮጵያ ህግ መሰረት የተሰጠ ይፋዊ የዳኝነት ውሳኔ
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">{decree.caseTitle}</h4>
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <Stamp className="w-5 h-5" />
            </div>
          </div>

          <div className="text-xs leading-relaxed text-slate-300 font-sans p-3 rounded-xl bg-black/50 border border-slate-800">
            <span className="font-bold text-white block mb-1">የፍርድ ውሳኔ ፍሬ-ነገር (Decree Ruling):</span>
            "{decree.verdictSummary}"
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span>Presiding: {decree.presidingJudge}</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographically Sealed & Binding</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

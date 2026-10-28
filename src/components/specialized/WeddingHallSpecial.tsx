import React, { useState } from 'react';
import {
  Heart,
  Award,
  Sparkles,
  PenTool,
  CheckCircle2,
  Printer,
  Users,
  ShieldCheck,
  FileText,
  MapPin,
  Clock,
  Fingerprint,
} from 'lucide-react';
import { WeddingContract } from '../../types';

export const WeddingHallSpecial: React.FC = () => {
  const [contract, setContract] = useState<WeddingContract>({
    groomName: 'Ato Yared Tesfaye (ያሬድ ተስፋዬ)',
    brideName: 'Woizero Selamawit Bekele (ሰላማዊት በቀለ)',
    weddingDate: '2026-10-28',
    civilRegistryNumber: 'CIVIL-WED-ETH-2026-98124',
    groomsmen: ['Kidus Assefa (Best Man)', 'Michael Girma (Groomsman)'],
    bridesmaids: ['Bethlehem Tadesse (Maid of Honor)', 'Rahel Solomon (Bridesmaid)'],
    groomParents: 'Ato Tesfaye Wolde & Woizero Almaz Gebre',
    brideParents: 'Ato Bekele Tessema & Woizero Martha Hailu',
    witnesses: [
      'Dr. Berhanu Nega (Certified Witness 1)',
      'Woizero Senait Desta (Certified Witness 2)',
      'Ato Solomon Tekle (Certified Witness 3)',
    ],
    witnessIds: ['ETH-FAYDA-WIT-991', 'ETH-FAYDA-WIT-992', 'ETH-FAYDA-WIT-993'],
    elderPresiding: 'Ato Gebeyehu Mersha (የሀገር ሽማግሌና የሲቪል መዝጋቢ)',
    legalArticles: [
      'የኢትዮጵያ ፌዴራላዊ ዴሞክራሲያዊ ሪፐብሊክ የተሻሻለው የቤተሰብ ህግ አዋጅ ቁጥር 213/1992 አንቀጽ 1-40',
      'Civil Marriage & Sovereign Registry Code of 2026 (Free Consent & Capacity)',
      'United Nations Convention on Consent to Marriage & Registry Compliance',
    ],
    locationCoordinates: 'Lat: 9.0320° N, Long: 38.7480° E (Addis Ababa Sovereign Sanctuary Node ETH-ADD-2026-H05)',
    biometricReady: true,
    isSigned: false,
    brideSignature: 'Selamawit Bekele (Digital SHA-256)',
    groomSignature: 'Yared Tesfaye (Digital SHA-256)',
    witnessSignatures: [
      'Berhanu Nega [Signed]',
      'Senait Desta [Signed]',
      'Solomon Tekle [Signed]',
    ],
    issuedAt: '2026-10-28 13:30:00 UTC+3',
  });

  const [signatureText, setSignatureText] = useState('Yared & Selamawit');
  const [isSigning, setIsSigning] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSignContract = () => {
    setIsSigning(true);
    setTimeout(() => {
      setContract((prev) => ({
        ...prev,
        isSigned: true,
      }));
      setIsSigning(false);
      setShowCertificate(true);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-950/30 via-[#0B1528] to-slate-950 border border-amber-500/40 p-4 sm:p-5 text-white space-y-4">
      {/* Wedding Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Heart className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>የሰርግ አዳራሽና የህጋዊ ሲቪል ጋብቻ ምዝገባ ማዕከል</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Civil Registry 2026
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Virtual Wedding Studio • 3 Witnesses, Groomsmen, Bridesmaids & Courtroom-Grade Civil Binding Contract
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-[11px] text-amber-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <span>ቁጥር: {contract.civilRegistryNumber}</span>
        </div>
      </div>

      {/* Nodes Mapping Overview: Groomsmen, Bridesmaids, Parents, 3 Witnesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Couple & Parents */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-amber-400 font-mono uppercase font-bold">ተጋቢዎችና ተጠሪ አባቶች</div>
          <div className="font-bold text-white">{contract.groomName}</div>
          <div className="font-bold text-pink-300">& {contract.brideName}</div>
          <div className="text-[10px] text-slate-400 pt-1">
            ተጠሪ አባቶች: {contract.groomParents} & {contract.brideParents}
          </div>
        </div>

        {/* Groomsmen & Bridesmaids */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-amber-400 font-mono uppercase font-bold">ሚዜዎች (Groomsmen & Bridesmaids)</div>
          <div className="text-slate-200">
            <strong>ወንድ ሚዜዎች:</strong> {contract.groomsmen.join(', ')}
          </div>
          <div className="text-slate-200">
            <strong>ሴት ሚዜዎች:</strong> {contract.bridesmaids.join(', ')}
          </div>
        </div>

        {/* Exactly 3 Witnesses */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-amber-400 font-mono uppercase font-bold">በትክክል 3 ህጋዊ ምስክሮች</div>
          <div className="space-y-0.5 text-[11px] text-emerald-300">
            <div>✓ {contract.witnesses[0]}</div>
            <div>✓ {contract.witnesses[1]}</div>
            <div>✓ {contract.witnesses[2]}</div>
          </div>
        </div>

        {/* Presiding Elder & Location */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-amber-400 font-mono uppercase font-bold">ሽምግልናና የቦታ መጋጠሚያ</div>
          <div className="font-bold text-white">{contract.elderPresiding}</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{contract.locationCoordinates}</span>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{contract.issuedAt}</span>
          </div>
        </div>
      </div>

      {/* Signing Panel or Legal PDF Certificate Preview */}
      {!contract.isSigned ? (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <PenTool className="w-4 h-4" />
            <span>ዲጂታል የጋብቻ ውል መፈረሚያና ማረጋገጫ (Biometric-Ready Legal Execution)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <div className="font-bold text-amber-300">የህግ ማዕቀፍ ማረጋገጫዎች:</div>
            {contract.legalArticles.map((art, i) => (
              <div key={i} className="text-slate-400">• {art}</div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              placeholder="Sign Full Legal Name..."
              className="flex-1 w-full px-3 py-2 rounded-xl bg-black border border-amber-500/50 text-amber-200 font-serif italic text-sm focus:outline-none"
            />
            <button
              onClick={handleSignContract}
              disabled={isSigning || !signatureText}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2"
            >
              {isSigning ? (
                <span>በማረጋገጥ ላይ...</span>
              ) : (
                <>
                  <PenTool className="w-3.5 h-3.5" />
                  <span>ውሉን በባዮሜትሪክና በ3 ምስክሮች አፅድቅ</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* High-Fidelity Downloadable / Printable PDF Document */
        <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-[#07101E] to-black border-2 border-amber-400 text-center space-y-4 relative shadow-2xl print:border-black print:bg-white print:text-black">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 mx-auto sm:mx-0">
              <Award className="w-7 h-7" />
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>ሰርተፊኬቱን አትም / አውርድ (Print Legal PDF)</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
              FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA • CIVIL REGISTRY OF 2026
            </div>
            <h4 className="text-base sm:text-xl font-bold text-white font-serif tracking-wider uppercase">
              ህጋዊ የሲቪል ጋብቻ ምስክር ወረቀት (Official Civil Marriage Certificate)
            </h4>
            <div className="text-xs font-mono text-emerald-400 font-bold">
              REGISTRATION NO: {contract.civilRegistryNumber}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs text-slate-200 space-y-2">
            <p className="leading-relaxed">
              በተሻሻለው የቤተሰብ ህግ አዋጅ ቁጥር 213/1992 እና በዓለም አቀፍ የሲቪል ጋብቻ ድንጋጌዎች መሰረት፣ ተጋቢዎች <strong>{contract.groomName}</strong> እና <strong>{contract.brideName}</strong> በነፃ ፈቃዳቸውና በሙሉ ፍላጎታቸው ህጋዊ ጋብቻ መመስረታቸውን በክብር ሽማግሌ <strong>{contract.elderPresiding}</strong> እና በ3ቱ የተረጋገጡ ምስክሮች ፊት አረጋግጠዋል።
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-[11px]">
              <div>
                <span className="text-slate-400">የሙሽራው ተጠሪ አባት/አሳዳጊ:</span>
                <div className="font-semibold text-white">{contract.groomParents}</div>
              </div>
              <div>
                <span className="text-slate-400">የሙሽሪት ተጠሪ አባት/አሳዳጊ:</span>
                <div className="font-semibold text-white">{contract.brideParents}</div>
              </div>
              <div>
                <span className="text-slate-400">የወንድ ሚዜዎች:</span>
                <div className="font-semibold text-white">{contract.groomsmen.join(', ')}</div>
              </div>
              <div>
                <span className="text-slate-400">የሴት ሚዜዎች:</span>
                <div className="font-semibold text-white">{contract.bridesmaids.join(', ')}</div>
              </div>
            </div>

            {/* 3 Witnesses Signatures */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-amber-300">የ3ቱ ህጋዊ ምስክሮች ዲጂታል ፊርማና ባዮሜትሪክ ማረጋገጫ:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                {contract.witnesses.map((w, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px]">
                    <div className="font-bold text-white truncate">{w}</div>
                    <div className="text-emerald-400 font-mono mt-0.5">Biometric Signed ✓</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800">
              <span>Location: {contract.locationCoordinates}</span>
              <span>Timestamp: {contract.issuedAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

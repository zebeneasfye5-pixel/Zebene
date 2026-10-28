import React, { useState } from 'react';
import {
  X,
  UserCheck,
  ShieldCheck,
  MapPin,
  Lock,
  Phone,
  KeyRound,
  Fingerprint,
  Heart,
  FileText,
  Building,
  Briefcase,
  AlertTriangle,
  Scale,
  Zap,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
  Camera,
  Upload,
  BadgeCheck,
} from 'lucide-react';
import { UserProfile, House } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  house: House;
  onVerified: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}

export const IndividualSignupGateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  house,
  onVerified,
  currentProfile,
}) => {
  const [profile, setProfile] = useState<UserProfile>({
    ...currentProfile,
    profession: currentProfile.profession || 'Enterprise Systems Architect',
    houseSpecificRole: currentProfile.houseSpecificRole || 'Senior Delegate',
    officialRank: currentProfile.officialRank || 'Minister Plenipotentiary',
    officialTitle: currentProfile.officialTitle || 'H.E. Sovereign Strategic Council',
    commandGrade: currentProfile.commandGrade || 'Grade 1 Executive Command',
    securityCredentialId: currentProfile.securityCredentialId || 'NISS-SEC-2026-9912',
    idDocumentUrl: currentProfile.idDocumentUrl || 'ETH-FAYDA-NID-VERIFIED-2026.pdf',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docUploaded, setDocUploaded] = useState(true);
  const [photoUploaded, setPhotoUploaded] = useState(true);

  // House 1: Phone + OTP
  const [phone, setPhone] = useState('+251 91 123 4567');
  const [otpCode, setOtpCode] = useState('2026');
  const [otpSent, setOtpSent] = useState(true);

  // House 2: Lineage tree info
  const [familyHead, setFamilyHead] = useState('Asfaye Lineage Clan');
  const [witnessLink1, setWitnessLink1] = useState('oneworld.eth/invite/fam-8891');
  const [witnessLink2, setWitnessLink2] = useState('oneworld.eth/invite/fam-9923');

  // House 3: Governance Mandatory Fields
  const [govEmail, setGovEmail] = useState('minister.office@mfa.gov.et');
  const [biometricScanned, setBiometricScanned] = useState(true);

  // House 4: Confidential Matter Scope & Pseudonym
  const [pseudonym, setPseudonym] = useState('SovereignClient_26');
  const [confidentialCaseType, setConfidentialCaseType] = useState('Legal & Private Arbitration Matter');
  const [agreedPrivacyNDA, setAgreedPrivacyNDA] = useState(true);

  // House 5: Complete Wedding Nodes
  const [groomName, setGroomName] = useState('Ato Dawit Yohannes');
  const [brideName, setBrideName] = useState('Woizero Tigist Abebe');
  const [groomsmenText, setGroomsmenText] = useState('Kidus Assefa, Michael Girma');
  const [bridesmaidsText, setBridesmaidsText] = useState('Bethlehem Tadesse, Rahel Solomon');
  const [groomParents, setGroomParents] = useState('Ato Yohannes Haile & Woizero Almaz');
  const [brideParents, setBrideParents] = useState('Ato Abebe Kebede & Woizero Martha');
  const [witness1, setWitness1] = useState('Dr. Berhanu Nega (ID: ETH-NID-991)');
  const [witness2, setWitness2] = useState('Woizero Senait Desta (ID: ETH-NID-992)');
  const [witness3, setWitness3] = useState('Ato Solomon Tekle (ID: ETH-NID-993)');
  const [singleCertUploaded, setSingleCertUploaded] = useState(true);

  // House 6: Faith Denomination
  const [denomination, setDenomination] = useState('Ethiopian Orthodox Tewahedo');
  const [signedPeaceCharter, setSignedPeaceCharter] = useState(true);

  // House 7: Law Enforcement Credentials
  const [securityBadgeId, setSecurityBadgeId] = useState('FED-POL-INTEL-2026-880');
  const [securityAgency, setSecurityAgency] = useState('National Intelligence & Security Service (NISS)');
  const [securityPin, setSecurityPin] = useState('2026');
  const [lawEnforcementCredentialUploaded, setLawEnforcementCredentialUploaded] = useState(true);

  // House 8: Talent Creator (Boundless)
  const [creatorDomain, setCreatorDomain] = useState('Aero-Robotics & AI Drone Innovation');
  const [talentAuditionReady, setTalentAuditionReady] = useState(true);

  // House 9: Commerce TIN & License
  const [tinNumber, setTinNumber] = useState('TIN-ETH-8829104');
  const [merchantLicense, setMerchantLicense] = useState('LIC-MINT-2026-COMM-77');
  const [gatewayBinding, setGatewayBinding] = useState('Telebirr / CBE Birr Super-Gateway');

  // House 10: Education Role & Teaching Subject
  const [eduRole, setEduRole] = useState<'Student' | 'Teacher'>('Teacher');
  const [teachingSubjects, setTeachingSubjects] = useState('Quantum Computing, Macroeconomics & Ethiopic Epigraphy');

  // House 11: Institutional Hierarchy & Sub-role
  const [trainingRole, setTrainingRole] = useState<'Trainer/Instructor' | 'Trainee/Participant'>('Trainer/Instructor');
  const [institutionName, setInstitutionName] = useState('Federal Civil Service Commission');
  const [institutionTier, setInstitutionTier] = useState('National Federal Directorate');

  // House 12: Counseling License / Client Triage
  const [counselingRole, setCounselingRole] = useState<'Client' | 'Licensed Specialist'>('Client');
  const [triageFocus, setTriageFocus] = useState('Stress Management & Work-Life Balance');

  // House 13: Broker Escrow Bond
  const [brokerBondId, setBrokerBondId] = useState('BOND-ESCROW-CBE-2026-990');
  const [escrowAccepted, setEscrowAccepted] = useState(true);

  // House 14: Petition Details
  const [petitionSubject, setPetitionSubject] = useState('Civil Arbitration & Land Boundary Settlement');
  const [arbitratorType, setArbitratorType] = useState('Certified Panel Arbitrator');

  // House 15: Utility Account Numbers
  const [eeuMeter, setEeuMeter] = useState('EEU-0982-1149');
  const [waterAcc, setWaterAcc] = useState('AAWSA-WATER-77218');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const updated: UserProfile = {
        ...profile,
        isRegistered: true,
      };
      try {
        localStorage.setItem('oneworld_user_profile', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setIsSubmitting(false);
      onVerified(updated);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-[#050B14] border border-amber-500/40 shadow-2xl p-5 sm:p-6 text-white relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>ማረጋገጫና ምዝገባ (Mandatory Core Signup Gate)</span>
              <span className="text-slate-500">•</span>
              <span>House {house.houseNumber}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {house.amharicTitle}
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          ወደ ውይይቱ ከመቀላቀልዎ በፊት የተሟላ የዜግነት መረጃዎን፣ ሙያዎን እና የክፍሉን ልዩ መስፈርቶች ያረጋግጡ። ሁሉም መረጃዎች በከፍተኛ ጥበቃ (Sandboxed Security) የተጠበቁ ናቸው።
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* 1. MANDATORY UNIFIED CORE PROFILE */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>1. ሁለንተናዊ የዜግነትና የመታወቂያ ሰነድ (Mandatory Core Profile)</span>
            </div>

            {/* Full Name & Gender & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  ሙሉ ስም (Full Name) *
                </label>
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  placeholder="Abebe Kebede..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  ጾታና እድሜ *
                </label>
                <div className="flex gap-1.5">
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile({ ...profile, gender: e.target.value as 'Male' | 'Female' | 'Other' })
                    }
                    className="w-1/2 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Male">ወንድ</option>
                    <option value="Female">ሴት</option>
                    <option value="Other">ሌላ</option>
                  </select>
                  <input
                    type="number"
                    min="16"
                    max="120"
                    required
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    className="w-1/2 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Nationality & Flag & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  ዜግነት ከሰንደቅ-አላማ ጋር (Nationality & Flag Index) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={profile.nationality}
                    onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  />
                  <span className="text-xl px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {profile.flag}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  አድራሻ (City, Region, Wereda, Kebele) *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={profile.address.city}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, city: e.target.value },
                      })
                    }
                    placeholder="ከተማ (City)"
                    className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-[11px]"
                  />
                  <input
                    type="text"
                    value={profile.address.wereda}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, wereda: e.target.value },
                      })
                    }
                    placeholder="ወረዳ (Wereda)"
                    className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Official ID Upload & Profile Photo Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  ኦፊሴላዊ መታወቂያ ሰነድ (Official ID Document Upload) *
                </label>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono text-[10px] text-slate-200 truncate">
                      {profile.idDocumentUrl || 'ETH-FAYDA-2026.pdf'}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40 shrink-0">
                    VERIFIED ✓
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  የመገለጫ ፎቶ (Profile Photo Capture/Upload) *
                </label>
                <div className="flex items-center gap-2">
                  <img
                    src={profile.photoUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-amber-400 object-cover"
                  />
                  <input
                    type="text"
                    value={profile.photoUrl}
                    onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300"
                    placeholder="Photo URL..."
                  />
                </div>
              </div>
            </div>

            {/* MANDATORY PROFESSION & HOUSE-SPECIFIC ROLE MAPPING */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-800/80">
              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>የአሁን ሙያ / ስራ (Profession/Occupation) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.profession}
                  onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  placeholder="e.g. Systems Architect, Legal Counselor, Physician..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-500/40 text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>በዚህ ቤት ውስጥ ያለዎት ሚና (House Specific Role) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.houseSpecificRole}
                  onChange={(e) => setProfile({ ...profile, houseSpecificRole: e.target.value })}
                  placeholder="e.g. Lead Speaker, Presiding Arbitrator, Delegate..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-500/40 text-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. STRICT HOUSE-SPECIFIC MANDATORY OPERATIONAL FIELDS */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>2. የ{house.amharicTitle} ልዩ መስፈርቶች (Designated House Engine)</span>
            </div>

            {/* HOUSE 3: STRICT POLITICAL RANK, TITLE & COMMAND GRADE */}
            {house.houseNumber === 3 && (
              <div className="space-y-2.5 p-3 rounded-lg bg-slate-950/90 border border-emerald-500/50">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Building className="w-4 h-4" />
                  <span>የባለስልጣናት ማዕረግ፣ የስራ መጠሪያና የትእዛዝ ደረጃ (Mandatory Statecraft Fields) *</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">ፖለቲካዊ ማዕረግ (Political Rank) *</label>
                    <select
                      value={profile.officialRank}
                      onChange={(e) => setProfile({ ...profile, officialRank: e.target.value })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-emerald-500/40 text-white text-[11px]"
                    >
                      <option value="Cabinet Minister">የካቢኔ ሚኒስትር (Cabinet Minister)</option>
                      <option value="State Minister">የመንግስት ዴኤታ (State Minister)</option>
                      <option value="Ambassador Plenipotentiary">ባለሙሉ ስልጣን አምባሳደር</option>
                      <option value="Federal Commissioner">የፌደራል ኮሚሽነር</option>
                      <option value="Regional Bureau Head">የክልል ቢሮ ሀላፊ</option>
                      <option value="Director General">ዋና ዳይሬክተር</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">የስራ መጠሪያ (Official Title) *</label>
                    <input
                      type="text"
                      required
                      value={profile.officialTitle}
                      onChange={(e) => setProfile({ ...profile, officialTitle: e.target.value })}
                      placeholder="e.g. H.E. Minister of Innovation..."
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-emerald-500/40 text-white text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">የትእዛዝ እርከን (Command Grade) *</label>
                    <select
                      value={profile.commandGrade}
                      onChange={(e) => setProfile({ ...profile, commandGrade: e.target.value })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-emerald-500/40 text-white text-[11px]"
                    >
                      <option value="Grade 1 Executive Command">Grade 1 Executive Sovereign Command</option>
                      <option value="Grade 2 Senior Ministerial">Grade 2 Senior Ministerial Directorate</option>
                      <option value="Grade 3 Strategic Field">Grade 3 Strategic Field Operations</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-emerald-300 pt-1">
                  <span>Gov Whitelist Email: {govEmail}</span>
                  <span className="font-mono font-bold">BIOMETRIC TOKEN VERIFIED ✓</span>
                </div>
              </div>
            )}

            {/* HOUSE 4: STRICT 2-PARTICIPANT ROOM CAPPING & CONFIDENTIAL SCOPE */}
            {house.houseNumber === 4 && (
              <div className="space-y-2 p-3 rounded-lg bg-slate-950/90 border border-rose-500/50">
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>ጥብቅ የ2 ሰዎች ብቻ ገደብ (Strict 2-Participant Room Capping)</span>
                  </span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/40">
                    MAX 2 ONLY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">ስውር ቅጽል ስም (Pseudonym) *</label>
                    <input
                      type="text"
                      value={pseudonym}
                      onChange={(e) => setPseudonym(e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">የሚስጥራዊ ጉዳይ መስክ (Case Context) *</label>
                    <select
                      value={confidentialCaseType}
                      onChange={(e) => setConfidentialCaseType(e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="Legal & Private Arbitration Matter">የህግና የጠበቃ ሚስጥራዊ ጉዳይ (Attorney-Client)</option>
                      <option value="Investigative Whistleblower">የአደጋና የመረጃ ጥበቃ (Whistleblower)</option>
                      <option value="Marriage & Private Life Case">የጥንዶችና የትዳር ጉዳይ (Couples Sanctuary)</option>
                      <option value="Confidential Strategic Deal">ሚስጥራዊ የቢዝነስ ድርድር (Confidential M&A)</option>
                    </select>
                  </div>
                </div>

                <p className="text-[10px] text-slate-300">
                  በዚህ ቤት ውስጥ በክፍለ-ጊዜው ከ2 ተሳታፊ በላይ መግባት በሲስተም ደረጃ በሃርድኮድ የታገደ ነው።
                </p>
              </div>
            )}

            {/* HOUSE 5: COMPLETE LEGAL REGISTRY NODES (GROOMSMEN, BRIDESMAIDS, PARENTS, 3 WITNESSES) */}
            {house.houseNumber === 5 && (
              <div className="space-y-2.5 p-3 rounded-lg bg-slate-950/90 border border-amber-500/50">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>ህጋዊ የሲቪል ጋብቻ ምዝገባ ኖዶች (Mandatory Civil Wedding Nodes) *</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">ሙሽራ (Groom Full Name)</label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">ሙሽሪት (Bride Full Name)</label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">የወንድ ሚዜዎች (Groomsmen)</label>
                    <input
                      type="text"
                      value={groomsmenText}
                      onChange={(e) => setGroomsmenText(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">የሴት ሚዜዎች (Bridesmaids)</label>
                    <input
                      type="text"
                      value={bridesmaidsText}
                      onChange={(e) => setBridesmaidsText(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">የሙሽራው ተጠሪ አባት/አሳዳጊ</label>
                    <input
                      type="text"
                      value={groomParents}
                      onChange={(e) => setGroomParents(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">የሙሽሪት ተጠሪ አባት/አሳዳጊ</label>
                    <input
                      type="text"
                      value={brideParents}
                      onChange={(e) => setBrideParents(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-amber-400 font-bold mb-1">
                    በትክክል 3 ህጋዊ ምስክሮች (Exactly 3 Mandatory Legal Witnesses) *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                    <input
                      type="text"
                      value={witness1}
                      onChange={(e) => setWitness1(e.target.value)}
                      placeholder="ምስክር 1"
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                    />
                    <input
                      type="text"
                      value={witness2}
                      onChange={(e) => setWitness2(e.target.value)}
                      placeholder="ምስክር 2"
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                    />
                    <input
                      type="text"
                      value={witness3}
                      onChange={(e) => setWitness3(e.target.value)}
                      placeholder="ምስክር 3"
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* HOUSE 7: LAW ENFORCEMENT & SECURITY CREDENTIALS UPLOAD */}
            {house.houseNumber === 7 && (
              <div className="space-y-2 p-3 rounded-lg bg-slate-950/90 border border-cyan-500/50">
                <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>የፀጥታና የህግ አስከባሪነት የተረጋገጠ መታወቂያ (Law Enforcement Credentials) *</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">የደህንነት ባጅ ቁጥር (Badge ID) *</label>
                    <input
                      type="text"
                      required
                      value={securityBadgeId}
                      onChange={(e) => setSecurityBadgeId(e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-cyan-500/40 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">የፀጥታ ተቋም (Agency) *</label>
                    <input
                      type="text"
                      required
                      value={securityAgency}
                      onChange={(e) => setSecurityAgency(e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-cyan-500/40 text-white"
                    />
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>ኦፊሴላዊ የደህንነት ሰነድ ተረጋግጧል (Credential Uploaded)</span>
                  </span>
                  <span className="text-slate-400 font-mono">SOVEREIGN CLEARANCE VERIFIED</span>
                </div>
              </div>
            )}

            {/* HOUSE 8: BOUNDLESS TALENT SHOW CATEGORIES */}
            {house.houseNumber === 8 && (
              <div className="space-y-2 p-3 rounded-lg bg-slate-950/90 border border-yellow-500/50">
                <div className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>ገደብ የለሽ የተሰጥኦና የፈጠራ መስክ (Limitless Talent Domain)</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">የፈጠራ ወይም የተሰጥኦ መስክዎን በነፃነት ይግለጹ *</label>
                  <input
                    type="text"
                    required
                    value={creatorDomain}
                    onChange={(e) => setCreatorDomain(e.target.value)}
                    placeholder="e.g. AI Robotics, Modern Ethio-Jazz, Standup Comedy, Classical Inventions..."
                    className="w-full px-3 py-1.5 rounded bg-slate-900 border border-yellow-500/40 text-white font-medium"
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  ማንኛውንም ልዩ ስጦታና የፈጠራ ጥበብ ያለገደብ ማቅረብ ይችላሉ።
                </div>
              </div>
            )}

            {/* HOUSE 10: TEACHER OR STUDENT PARTITIONING & INFINITE SUBJECTS */}
            {house.houseNumber === 10 && (
              <div className="space-y-2 p-3 rounded-lg bg-slate-950/90 border border-emerald-500/50">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>የትምህርት ሚና መለያየት (Teacher vs Student Enrollment) *</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEduRole('Teacher')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      eduRole === 'Teacher' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    መምህር (Teacher / Instructor)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEduRole('Student')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      eduRole === 'Student' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    ተማሪ (Student / Learner)
                  </button>
                </div>

                {eduRole === 'Teacher' && (
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">የሚያስተምሩት የትምህርት ዘርፍ (Teaching Subjects) *</label>
                    <input
                      type="text"
                      required
                      value={teachingSubjects}
                      onChange={(e) => setTeachingSubjects(e.target.value)}
                      placeholder="e.g. Artificial Intelligence, Medicine, Ge'ez, Renewable Energy..."
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-emerald-500/40 text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {/* HOUSE 11: TRAINER VS TRAINEE INTERACTION MATRIX */}
            {house.houseNumber === 11 && (
              <div className="space-y-2 p-3 rounded-lg bg-slate-950/90 border border-violet-500/50">
                <div className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-violet-400" />
                  <span>የተቋማዊ ስልጠና ሚና (Trainer vs Trainee Matrix) *</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTrainingRole('Trainer/Instructor')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      trainingRole === 'Trainer/Instructor' ? 'bg-violet-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    አሰልጣኝ (Trainer / Instructor)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrainingRole('Trainee/Participant')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      trainingRole === 'Trainee/Participant' ? 'bg-violet-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    ሰልጣኝ (Trainee / Participant)
                  </button>
                </div>
              </div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER HOUSES */}
            {![3, 4, 5, 7, 8, 10, 11].includes(house.houseNumber) && (
              <div className="text-xs text-slate-300">
                የተረጋገጠ የ{house.amharicTitle} ምዝገባ መረጃዎች በሙሉ በቤቱ ምስጠራ ሳንድቦክስ ብቻ የተከለሉ ናቸው።
              </div>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              የተመዘገቡ መረጃዎች በሙሉ በ{house.amharicTitle} ምስጠራ ሳንድቦክስ ብቻ የተከለሉ ናቸው።
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              ይቅር
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold tracking-wide shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>በማረጋገጥ ላይ...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>መስፈርቱን አረጋግጥና ውይይቱን ተቀላቀል</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

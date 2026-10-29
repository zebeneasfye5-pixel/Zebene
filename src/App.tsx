import React, { useState, useEffect } from 'react';
import {
  Globe,
  Radio,
  Landmark,
  ShieldCheck,
  Sparkles,
  Lock,
  Download,
  Layers,
  ChevronDown,
  ChevronUp,
  Volume2,
  CheckCircle2,
  ExternalLink,
  UserCheck,
  Gamepad2,
  Dice5,
  Shield,
} from 'lucide-react';
import { House, HouseCategory, LanguageCode, UserProfile } from './types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from './data/translations';
import { HOUSES } from './data/housesData';
import { audioStreamEngine } from './services/audioStreamEngine';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HousesGrid } from './components/HousesGrid';
import { VirtualHouseRoom } from './components/VirtualHouseRoom';
import { LanguageEngineModal } from './components/LanguageEngineModal';
import { UserWalletCenterModal } from './components/UserWalletCenterModal';
import { AdminConsoleModal } from './components/AdminConsoleModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { IndividualSignupGateModal } from './components/IndividualSignupGateModal';
import { GamificationLotteryArena } from './components/GamificationLotteryArena';
import { FOUNDER_NAME } from './services/secureConfig';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('am');
  const [activeCategory, setActiveCategory] = useState<HouseCategory | 'all'>('all');
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  // User Profile Metadata for Signup Gate
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('oneworld_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fullName: 'Abebe Kebede (አበበ ከበደ)',
      gender: 'Male',
      age: 32,
      nationality: 'Ethiopia',
      flag: '🇪🇹',
      countryCode: 'ET',
      address: {
        city: 'Addis Ababa',
        region: 'Addis Ababa',
        wereda: 'Kirkos 03',
        kebele: 'Kebele 08',
      },
      officialId: 'ETH-FAYDA-2026-8819',
      idType: 'Fayda National ID',
      idDocumentUrl: 'ETH-FAYDA-2026.pdf',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      profession: 'Enterprise Systems Architect',
      houseSpecificRole: 'Lead Delegate',
      officialRank: 'Minister Plenipotentiary',
      officialTitle: 'H.E. Sovereign Strategic Council',
      commandGrade: 'Grade 1 Executive Command',
      isRegistered: true,
    };
  });

  const [gateHouseTarget, setGateHouseTarget] = useState<House | null>(null);

  // Modals & Panels
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [financialTargetHouseId, setFinancialTargetHouseId] = useState<number>(1);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGamesArenaOpen, setIsGamesArenaOpen] = useState(false);
  const [showHeroReadMore, setShowHeroReadMore] = useState(false);

  // Sync active language with audio stream engine
  useEffect(() => {
    const unsubscribe = audioStreamEngine.subscribe((meta) => {
      setCurrentLanguage(meta.code);
    });
    return () => unsubscribe();
  }, []);

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleOpenFinancialsForHouse = (houseId: number) => {
    setFinancialTargetHouseId(houseId);
    setIsFinancialModalOpen(true);
  };

  const handleSelectHouseToJoin = (house: House) => {
    // If not registered or needs gate verification, open gate; otherwise directly enter
    if (!userProfile.isRegistered) {
      setGateHouseTarget(house);
    } else {
      setSelectedHouse(house);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top PWA Banner */}
      <PWAInstallButton variant="banner" />

      {/* Main Navigation Bar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        currentLanguage={currentLanguage}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onOpenFinancials={() => {
          setFinancialTargetHouseId(selectedHouse ? selectedHouse.id : 1);
          setIsFinancialModalOpen(true);
        }}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenGamesArena={() => setIsGamesArenaOpen(true)}
      />

      {/* 3-Line Dashboard Sidebar Menu */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentLanguage={currentLanguage}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (selectedHouse) setSelectedHouse(null);
        }}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onOpenFinancials={() => {
          setFinancialTargetHouseId(selectedHouse ? selectedHouse.id : 1);
          setIsFinancialModalOpen(true);
        }}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenGamesArena={() => setIsGamesArenaOpen(true)}
      />

      {/* AI Language Engine Modal (8 Languages Folder) */}
      <LanguageEngineModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => {
          setCurrentLanguage(lang);
        }}
      />

      {/* Multi-Tenant SaaS Wallet Center Modal */}
      <UserWalletCenterModal
        isOpen={isFinancialModalOpen}
        onClose={() => setIsFinancialModalOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Secure Admin Console Modal */}
      <AdminConsoleModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Mass Gamification & Lottery Arena Modal */}
      <GamificationLotteryArena
        isOpen={isGamesArenaOpen}
        onClose={() => setIsGamesArenaOpen(false)}
        currentLanguage={currentLanguage}
        currentUser={userProfile}
      />

      {/* Gate Verification Modal if required */}
      {gateHouseTarget && (
        <IndividualSignupGateModal
          isOpen={!!gateHouseTarget}
          onClose={() => setGateHouseTarget(null)}
          house={gateHouseTarget}
          currentProfile={userProfile}
          onVerified={(updated) => {
            setUserProfile(updated);
            setSelectedHouse(gateHouseTarget);
            setGateHouseTarget(null);
          }}
        />
      )}

      {/* View Switch: Inside a Virtual House Room vs Main 15 Houses Overview */}
      {selectedHouse ? (
        <VirtualHouseRoom
          house={selectedHouse}
          onBack={() => setSelectedHouse(null)}
          currentLanguage={currentLanguage}
          onOpenFinancials={handleOpenFinancialsForHouse}
          onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          userProfile={userProfile}
          onUpdateProfile={(updated) => setUserProfile(updated)}
        />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          {/* Hero Banner with Dark Glassmorphism and Clean Read More Toggle */}
          <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950/30 via-[#0B1528] to-[#050B14] border border-amber-500/40 p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-3xl space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#060B14] border border-cyan-500/40 p-1 shadow-lg shadow-cyan-950/50 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/oneworld-logo.png"
                      alt="Oneworld Official Celestial Emblem"
                      className="w-full h-full object-contain filter drop-shadow(0 0 10px rgba(34,211,238,0.5))"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>FOUNDED BY ZEBENE ASFAYE (ዘበነ አስፋዬ) • 2026</span>
                    </div>
                    <div className="text-[11px] text-cyan-300 font-mono mt-0.5">
                      ኦፊሴላዊ የሰለስቲያል ህብረ-ኮከብ አርማ (Official Celestial Emblem)
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {t.appTitle}: 15ቱ ልዩ ዲጂታል ቤቶች (15 Specialized Virtual Houses)
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  በዘበነ አስፍዬ (Hበ1) በ2026 የተመሰረተ ዓለም አቀፍ የዲጂታል ሉዓላዊነት፣ የባህል ቅርስ እና ማህበረሰባዊ ትስስር መድረክ። ያልተገደበ የወንበር ሥርዓት፣ የቀጥታ 8 ቋንቋዎች የኤአይ ትርጉም እና ባለብዙ-ተከራይ የዲጂታል ዋሌት ሥርዓት (Multi-Tenant SaaS Ledger)።
                </p>

                {/* Quick Interactive Arena Launcher Callout */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsGamesArenaOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition"
                  >
                    <Gamepad2 className="w-4 h-4 fill-current" />
                    <span>የጨዋታዎች እና ሎተሪ ማዕከል (Gaming Arena)</span>
                  </button>

                  <button
                    onClick={() => setIsLanguageModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-400 text-xs text-slate-200 font-semibold flex items-center gap-2 transition"
                  >
                    <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>ቋንቋ: {activeLangMeta.nativeName}</span>
                  </button>
                </div>

                {/* Physics-animated 'ተጨማሪ አንብብ (Read More)' toggle component */}
                {showHeroReadMore && (
                  <div className="p-4 rounded-2xl bg-[#040810]/90 border border-slate-800 text-xs text-slate-300 space-y-2.5 animate-in fade-in duration-200">
                    <p className="font-semibold text-amber-300">
                      የመድረኩ 3ቱ ዋና ምሰሶዎች (Platform Architectural Pillars):
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                      <li>
                        <strong>ፍጹም የተከለለ ደህንነት (Absolute Sandboxing):</strong> እያንዳንዱ 15 ቤት የራሱ የሆነ የተመሰጠረ መስመር ያለው ሲሆን የዳታም ሆነ የድምጽ መደራረብ በዜሮ ደረጃ የተገደበ ነው።
                      </li>
                      <li>
                        <strong>የኤአይ ቋንቋ ሞተር (AI Translation Layer):</strong> አማርኛ፣ ኦሮምኛ፣ ትግርኛ፣ እንግሊዝኛ፣ ፈረንሳይኛ፣ ቻይንኛ፣ አረብኛ እና ጀርመንኛን በቅጽበት በድምፅና በጽሑፍ ያስተላልፋል።
                      </li>
                      <li>
                        <strong>ባለብዙ-ተከራይ ሳስ ዋሌት (Multi-Tenant SaaS Ledger):</strong> ለእያንዳንዱ ዜጋ፣ ንግድና የመንግስት ተቋም የተከለለ ባለብዙ-ገንዘብ ዋሌት፣ በቴሌብር፣ ቻፓ፣ ስትራይፕ፣ ፔይፓልና ክሪፕቶግራፊክ ቫውቸር የሚሰራ አስተማማኝ ሥርዓት።
                      </li>
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setShowHeroReadMore((prev) => !prev)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition focus:outline-none"
                >
                  <span>{showHeroReadMore ? t.readLess : 'ተጨማሪ አንብብ (Read More)'}</span>
                  {showHeroReadMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Status Box */}
              <div className="shrink-0 p-4 rounded-2xl bg-[#070F1D]/90 border border-slate-800 space-y-3 font-mono text-xs text-slate-300 min-w-[250px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">የድምፅ ቻናል:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {activeLangMeta.audioFrequency.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">ያሉ ቤቶች:</span>
                  <span className="text-amber-400 font-bold">15 / 15 Online</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Wallet Engine:</span>
                  <span className="text-emerald-400 font-bold">Multi-Tenant SaaS Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">የስርዓት አድሚን:</span>
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Node</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 15 Specialized Houses Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-amber-400" />
                  <span>15ቱ ልዩ ቤቶች (The 15 Functional Rooms)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  የተሟላ የዜግነት መረጃ በማረጋገጥ ወደሚፈልጉት ቤት በመግባት ውይይቱን ይቀላቀሉ።
                </p>
              </div>

              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs text-amber-300 font-medium transition"
              >
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>ቋንቋ: {activeLangMeta.nativeName}</span>
              </button>
            </div>

            <HousesGrid
              currentLanguage={currentLanguage}
              onSelectHouse={handleSelectHouseToJoin}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />
          </section>
        </main>
      )}

      {/* Luxury Dark Glassmorphism Footer */}
      <footer className="mt-auto bg-[#040810] border-t border-slate-800/80 text-xs text-slate-400 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-white font-bold text-sm">
              <img
                src="/assets/oneworld-logo.png"
                alt="oneworld Emblem"
                className="w-7 h-7 rounded-lg object-contain bg-[#070B14] border border-cyan-500/40 p-0.5 shadow-sm"
              />
              <span className="font-sans lowercase font-extrabold text-base">oneworld</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">አንድ ዓለም</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-mono text-xs">2026 Charter</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              የተመሰረተው በ <strong className="text-white">{FOUNDER_NAME}</strong> • 2026 Sovereign Charter | Multi-Tenant SaaS Subsystem
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              Admin Authenticated • Multi-Factor Node • House Cryptographic Sandboxing Active
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 flex-wrap justify-center text-[10px] font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
                telebirr & Chapa Direct
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
                CBE Gateway
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-blue-300">
                Stripe Global
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300">
                PayPal & USDT
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PCI-DSS Level 1 & NBE Integrated Multi-Tenant SaaS Subsystem</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

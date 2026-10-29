import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  Plus,
  ArrowLeft,
  Volume2,
  ShieldCheck,
  Radio,
  Sparkles,
  Users,
  MessageSquare,
  DollarSign,
  Send,
  Lock,
  UserCheck,
  Gift,
  Crown,
  Wallet,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { House, VirtualSeat, LanguageCode, ChatMessage, UserProfile } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';
import { getInitialSeatsForHouse } from '../data/housesData';
import { TenantLedgerService } from '../services/tenantLedgerService';
import { House1PublicAssemblySpecial } from './specialized/House1PublicAssemblySpecial';
import { House2GenealogySpecial } from './specialized/House2GenealogySpecial';
import { House3GovernanceStrategySpecial } from './specialized/House3GovernanceStrategySpecial';
import { House4CouplesSanctuarySpecial } from './specialized/House4CouplesSanctuarySpecial';
import { WeddingHallSpecial } from './specialized/WeddingHallSpecial';
import { House6DevotionalSpecial } from './specialized/House6DevotionalSpecial';
import { SecuritySentinelSpecial } from './specialized/SecuritySentinelSpecial';
import { TalentShowSpecial } from './specialized/TalentShowSpecial';
import { House9DigitalMarketplaceSpecial } from './specialized/House9DigitalMarketplaceSpecial';
import { AiAcademySpecial } from './specialized/AiAcademySpecial';
import { House11InstitutionalTrainingSpecial } from './specialized/House11InstitutionalTrainingSpecial';
import { House12ClinicalCounselingSpecial } from './specialized/House12ClinicalCounselingSpecial';
import { House13InteractiveExchangeSpecial } from './specialized/House13InteractiveExchangeSpecial';
import { JudiciaryDecreeSpecial } from './specialized/JudiciaryDecreeSpecial';
import { UtilityBillingEqubSpecial } from './specialized/UtilityBillingEqubSpecial';
import { IndividualSignupGateModal } from './IndividualSignupGateModal';

interface Props {
  house: House;
  onBack: () => void;
  currentLanguage: LanguageCode;
  onOpenFinancials: (houseId: number) => void;
  onOpenLanguageModal: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const VirtualHouseRoom: React.FC<Props> = ({
  house,
  onBack,
  currentLanguage,
  onOpenFinancials,
  onOpenLanguageModal,
  userProfile,
  onUpdateProfile,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const [seats, setSeats] = useState<VirtualSeat[]>(() => getInitialSeatsForHouse(house.id));
  const [userSeatId, setUserSeatId] = useState<string | null>(null);
  const [isMyMicActive, setIsMyMicActive] = useState<boolean>(false);
  const [isMyVideoActive, setIsMyVideoActive] = useState<boolean>(false);
  const [hasRaisedHand, setHasRaisedHand] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      senderName: 'House Moderator',
      senderRole: 'Host',
      text: `እንኳን ወደ ${house.amharicTitle} በደህና መጡ። የክፍሉ ምስጠራና የዳታ ከለላ 100% ንቁ ነው።`,
      timestamp: 'Just now',
    },
  ]);
  const [newMessageText, setNewMessageText] = useState('');
  const [speechCaptionIndex, setSpeechCaptionIndex] = useState(0);

  // Streaming Gift & VIP Seating State
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [giftTargetSpeaker, setGiftTargetSpeaker] = useState<string>('Founder');
  const [giftAmountInput, setGiftAmountInput] = useState<string>('100');
  const [giftFeedback, setGiftFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [vipSeatIndex, setVipSeatIndex] = useState<number>(1);
  const [vipFeedback, setVipFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSendGift = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(giftAmountInput);
    if (!amount || amount <= 0) return;

    const res = TenantLedgerService.processGiftTip(
      userProfile.officialId || 'tenant-individual-1',
      `speaker-${giftTargetSpeaker.toLowerCase()}`,
      giftTargetSpeaker,
      amount,
      'ETB'
    );
    setGiftFeedback(res);
  };

  const handleLeaseVipSeat = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = 250;
    const res = TenantLedgerService.processVipSeatLease(
      userProfile.officialId || 'tenant-individual-1',
      vipSeatIndex,
      cost,
      'ETB'
    );
    setVipFeedback(res);
  };

  // Dynamic live translated closed captions reflecting the simultaneous translation stream and dynamic multi-tenant SaaS ledger
  const sampleCaptions: Record<LanguageCode, string[]> = {
    am: [
      'የዘበነ አስፍዬ የ2026 አንድ ዓለም መድረክ የዲጂታል ሉዓላዊነትን እና ቀጣናዊ አንድነትን ያረጋግጣል።',
      'በዚህ ቤት ውስጥ የሚደረጉ ውይይቶች በሙሉ የተመሰጠሩ እና ከሌሎች ቤቶች ተለይተው የተጠበቁ ናቸው።',
      'ባለብዙ-ተከራይ የዲጂታል ዋሌት (Multi-Tenant SaaS Ledger) በእውነተኛ ጊዜ ፈጣን ክፍያን ያስተናግዳል።',
      'የቀጥታ አርቴፊሻል ኢንተለጀንስ የትርጉም ድምፅ በ 92.4 MHz ላይ እየተላለፈ ነው።',
    ],
    en: [
      'The Oneworld 2026 charter by Zebene Asfaye establishes sovereign collaboration and decentralized governance.',
      'All virtual seats in House ' + house.houseNumber + ' are strictly sandboxed with zero cross-room leakage.',
      'Dynamic Multi-Tenant SaaS Ledger powers instant token swaps with encrypted settlement.',
      'Live neural AI simultaneous translation stream is synchronized with ultra-low 12ms latency.',
    ],
    om: [
      'Sirni Addunyaa Tokko kan Zebene Asfaye bara 2026 tokkummaa fi misooma hawaasaa ni cimsa.',
      'Mariin mana kana keessatti adeemsifamu hundi iccitummaan isaa kan eegameedha.',
      'Sirni lakkoofsa SaaS gabaa dijitaalaa fi kaffaltii hatattamaa ni mirkaneessa.',
      'Hiikkaan AI kallattii chaanaalii Oromia Link irratti hojjetaa jira.',
    ],
    ti: [
      'ናይ ዘበነ አስፋዬ 2026 ሓደ ዓለም መድረኽ ዲጂታላዊ ሓድነትን ቁጠባዊ ምዕባለን የረጋግጽ።',
      'ኣብዚ ገዛ ዝካየድ ዘተ ብሙሉኡ ዝተሓለወን ካብ ካልእ ገዛ ዘይርከብን እዩ።',
      'ባለብዙ-ተከራይ ናይ ዋሌት ስርዓት (SaaS Ledger) ውሑስን ቅልጡፍን ምልውዋጥ የረጋግጽ።',
      'ቀጥታዊ ናይ ድምጺ ትርጉም ብንጡፍ ይሰርሕ ኣሎ።',
    ],
    fr: [
      'La plateforme Oneworld 2026 fondée par Zebene Asfaye garantit la souveraineté numérique et le dialogue.',
      'Toutes les places sont isolées cryptographiquement sans aucune fuite de données.',
      'Le grand livre multi-locataires SaaS assure des transferts de valeur instantanés et sécurisés.',
      'Le flux d\'interprétation simultanée par IA est synchronisé en temps réel.',
    ],
    zh: [
      '由 Zebene Asfaye 于2026年创立的 Oneworld 平台致力于促进全球与社区的互联互通。',
      '所有席位均实施沙盒安全隔离，绝无跨室数据流串扰。',
      '多租户云端账本（Multi-Tenant SaaS Ledger）保障即时且加密的代币交易。',
      'AI 神经网络同声传译流正在以 12 毫秒极低延迟实时传送。',
    ],
    ar: [
      'منصة عالم واحد لعام 2026 التي أسسها زبين أسفاي ترسخ التعاون والسيادة الرقمية المستقلة.',
      'جميع المقاعد في الغرفة معزولة تشفيرياً بالكامل بدون أي تسرب.',
      'نظام دفتر الأستاذ السحابي متعدد المستأجرين يضمن تسويات مالية فورية وآمنة.',
      'بث الترجمة الفورية بالذكاء الاصطناعي يعمل بأعلى دقة وزمن استجابة فائق السرعة.',
    ],
    de: [
      'Die Oneworld 2026 Charta von Zebene Asfaye sichert digitale Souveränität und globale Verbundenheit.',
      'Alle Sitze in dieser Kammer sind kryptografisch voneinander isoliert.',
      'Das mandantenfähige SaaS-Ledger garantiert blitzschnelle und verschlüsselte Abrechnungen.',
      'Der neuronale KI-Simultandolmetscher-Stream sendet synchron in Echtzeit.',
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSpeechCaptionIndex((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleMic = (seatId: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seatId) {
          const nextState = !s.isMicActive;
          if (s.isLocalUser) setIsMyMicActive(nextState);
          return {
            ...s,
            isMicActive: nextState,
            isSpeaking: nextState,
          };
        }
        return s;
      })
    );
  };

  const handleToggleVideo = (seatId: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seatId) {
          const nextState = !s.isVideoActive;
          if (s.isLocalUser) setIsMyVideoActive(nextState);
          return { ...s, isVideoActive: nextState };
        }
        return s;
      })
    );
  };

  const isHouse4 = house.id === 4 || house.specialModuleType === 'couples_sanctuary';
  const isHouse4Capped = isHouse4 && seats.length >= 2;

  const handleTakeSeat = () => {
    if (userSeatId) return;
    if (isHouse4 && seats.length >= 2) return;
    const newId = `user-seat-${Date.now()}`;
    const mySeat: VirtualSeat = {
      id: newId,
      name: `${userProfile.fullName} (${userProfile.officialId})`,
      gender: userProfile.gender,
      age: userProfile.age,
      nationality: userProfile.nationality,
      countryCode: userProfile.countryCode,
      flag: userProfile.flag,
      idContext: userProfile.officialId,
      avatarUrl: userProfile.photoUrl,
      role: 'Delegate',
      isMicActive: true,
      isVideoActive: true,
      isSpeaking: true,
      handRaised: false,
      isLocalUser: true,
    };
    setSeats((prev) => [mySeat, ...prev]);
    setUserSeatId(newId);
    setIsMyMicActive(true);
    setIsMyVideoActive(true);
  };

  const handleLeaveSeat = () => {
    if (!userSeatId) return;
    setSeats((prev) => prev.filter((s) => s.id !== userSeatId));
    setUserSeatId(null);
    setIsMyMicActive(false);
    setIsMyVideoActive(false);
    setHasRaisedHand(false);
  };

  const handleAddChair = () => {
    if (isHouse4Capped) return;
    const chairNumber = seats.length + 1;
    const newSeat: VirtualSeat = {
      id: `virtual-chair-${Date.now()}`,
      name: `Guest Chair #${chairNumber}`,
      gender: chairNumber % 2 === 0 ? 'Female' : 'Male',
      age: 25 + (chairNumber % 30),
      nationality: 'Global Assembly',
      countryCode: 'UN',
      flag: '🌐',
      idContext: `VIRTUAL-CHAIR-${chairNumber}`,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      role: 'Audience',
      isMicActive: false,
      isVideoActive: false,
      isSpeaking: false,
      handRaised: false,
    };
    setSeats((prev) => [...prev, newSeat]);
  };

  const handleToggleRaiseHand = () => {
    const next = !hasRaisedHand;
    setHasRaisedHand(next);
    if (userSeatId) {
      setSeats((prev) =>
        prev.map((s) => (s.id === userSeatId ? { ...s, handRaised: next } : s))
      );
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: userSeatId ? userProfile.fullName : 'Citizen Observer',
      senderRole: userSeatId ? 'Delegate' : 'Citizen',
      text: newMessageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setNewMessageText('');
  };

  const speakers = seats.filter((s) => s.role === 'Founder' || s.role === 'Host' || s.role === 'Speaker' || s.role === 'Judge');
  const audience = seats.filter((s) => s.role !== 'Founder' && s.role !== 'Host' && s.role !== 'Speaker' && s.role !== 'Judge');
  const activeCaptions = sampleCaptions[currentLanguage] || sampleCaptions.en;

  return (
    <div className="min-h-screen bg-[#050B14] text-white flex flex-col pb-28">
      {/* Streaming Gift ("ስጦታ ላክ") Modal (25% Platform Fee Split) */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#091322] border border-amber-500/50 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">ስጦታ ላክ (Live Stream Gift Tip)</h3>
              </div>
              <button
                onClick={() => {
                  setIsGiftModalOpen(false);
                  setGiftFeedback(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Send tokens directly to active stage speakers. A strict <strong>25% Platform Service Fee</strong> is automated prior to creator disbursement.
            </p>

            <form onSubmit={handleSendGift} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Recipient Speaker
                </label>
                <select
                  value={giftTargetSpeaker}
                  onChange={(e) => setGiftTargetSpeaker(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                >
                  {speakers.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Gift Amount (ETB)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['50', '100', '250', '500'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setGiftAmountInput(amt)}
                      className={`py-1.5 rounded-lg border font-mono text-xs font-bold transition ${
                        giftAmountInput === amt
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {amt} ETB
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="5"
                  value={giftAmountInput}
                  onChange={(e) => setGiftAmountInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  placeholder="Custom amount..."
                />
              </div>

              {/* Split Preview */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono flex justify-between">
                <span className="text-slate-400">Creator Receives (75%):</span>
                <span className="text-emerald-400 font-bold">
                  {(parseFloat(giftAmountInput || '0') * 0.75).toFixed(2)} ETB
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono flex justify-between">
                <span className="text-slate-400">Platform Protocol Fee (25%):</span>
                <span className="text-amber-400 font-bold">
                  {(parseFloat(giftAmountInput || '0') * 0.25).toFixed(2)} ETB
                </span>
              </div>

              {giftFeedback && (
                <div
                  className={`p-3 rounded-xl border text-xs font-mono flex items-start gap-2 ${
                    giftFeedback.success
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {giftFeedback.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{giftFeedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg"
              >
                Confirm & Disburse Gift (ስጦታ ላክ)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIP Seating Lease Modal (10% Flat Split Fee) */}
      {isVipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#091322] border border-purple-500/50 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">VIP Audio Seat Lease (#1 to #5)</h3>
              </div>
              <button
                onClick={() => {
                  setIsVipModalOpen(false);
                  setVipFeedback(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Lease priority front-row stage seats #1 through #5 with prominent avatar spotlight. A flat <strong>10% Platform Protocol Fee</strong> is applied.
            </p>

            <form onSubmit={handleLeaseVipSeat} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Select VIP Seat Number
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setVipSeatIndex(num)}
                      className={`py-2 rounded-xl border font-mono text-xs font-bold transition ${
                        vipSeatIndex === num
                          ? 'bg-purple-600 text-white border-purple-400 shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      Seat #{num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Lease Term:</span>
                  <span className="text-white font-bold">Active Live Session</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gross Cost:</span>
                  <span className="text-emerald-400 font-bold">250.00 ETB</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Platform Split Fee (10%):</span>
                  <span className="text-purple-400 font-bold">25.00 ETB</span>
                </div>
              </div>

              {vipFeedback && (
                <div
                  className={`p-3 rounded-xl border text-xs font-mono flex items-start gap-2 ${
                    vipFeedback.success
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {vipFeedback.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{vipFeedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg"
              >
                Lease VIP Seat #{vipSeatIndex} (250 ETB)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Individual Signup Gate Modal */}
      <IndividualSignupGateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        house={house}
        currentProfile={userProfile}
        onVerified={(updated) => {
          onUpdateProfile(updated);
          setIsProfileModalOpen(false);
        }}
      />

      {/* Top Room Banner with strict typography (Primary Amharic, Secondary English) */}
      <div className="bg-[#070F1D]/95 border-b border-slate-800/90 sticky top-0 z-30 backdrop-blur-md px-3 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* House Info */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={onBack}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
              title="Return to 15 Houses"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>15 ቤቶች</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                  {house.houseNumber}
                </span>
                {/* 1. TYPOGRAPHY: Primary Title (Amharic) 1.25rem (20px), font-weight: 600, color: #FFFFFF */}
                <h1
                  style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF' }}
                  className="tracking-tight truncate max-w-[280px] sm:max-w-md"
                >
                  {house.amharicTitle}
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Room
                </span>
              </div>
              {/* Secondary Subtitle (English): 0.875rem (14px), font-weight: 400, color: #9CA3AF */}
              <div
                style={{ fontSize: '0.875rem', fontWeight: 400, color: '#9CA3AF' }}
                className="truncate mt-0.5"
              >
                {house.englishSubtitle}
              </div>
            </div>
          </div>

          {/* Quick Actions (System ID codes hidden from public view) */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
            {/* Clean Sandboxed Session Indicator (No raw hash ID cluttering the UI) */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-[11px] font-mono text-emerald-400"
              title="Cryptographic Isolation Active"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sandboxed Session</span>
            </div>

            {/* Profile Gate Verification Trigger */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-slate-300 hover:text-white transition"
              title="Verify or update Profile Metadata"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">መገለጫ ({userProfile.fullName.split(' ')[0]})</span>
            </button>

            {/* AI Audio Channel Trigger */}
            <button
              onClick={onOpenLanguageModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 hover:border-amber-400 text-xs text-amber-300 transition"
              title="Change Audio Channel"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{langMeta.flag}</span>
              <span className="font-mono text-[10px]">{langMeta.audioFrequency.split(' ')[0]}</span>
            </button>

            {/* Streaming Gift Redemptions ("ስጦታ ላክ") Trigger */}
            <button
              onClick={() => setIsGiftModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/50 hover:border-amber-400 text-xs text-amber-300 font-bold transition shadow-sm"
              title="Send Live Stream Gift (25% Platform Fee Split Applied)"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>ስጦታ ላክ</span>
            </button>

            {/* VIP Seating Lease Trigger */}
            <button
              onClick={() => setIsVipModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 text-xs text-purple-300 font-semibold transition"
              title="Lease VIP Audio Seat #1-#5 (10% Flat Split Fee)"
            >
              <Crown className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">VIP ወንበር (10% Split)</span>
            </button>

            {/* Open Multi-Tenant Wallet Center */}
            <button
              onClick={() => onOpenFinancials(house.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500/50 hover:bg-emerald-600/40 text-xs text-emerald-300 font-semibold transition"
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              <span>ዋሌት ማዕከል</span>
            </button>
          </div>
        </div>

        {/* Live AI Simultaneous Translation Closed Caption Bar */}
        <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold">
              <Sparkles className="w-3 h-3" />
              <span>AI Audio Translation</span>
            </div>
            <div className="truncate text-amber-100 font-medium italic">
              "{activeCaptions[speechCaptionIndex]}"
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-500 shrink-0 ml-3">
            <span>Latency: 12ms</span>
            <span>•</span>
            <span>48kHz HD</span>
          </div>
        </div>
      </div>

      {/* Main Room Body */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col gap-6">
        {/* Render Specialized Sub-System Module for all 15 Houses */}
        {house.specialModuleType === 'onboarding' && <House1PublicAssemblySpecial />}
        {house.specialModuleType === 'genealogy' && <House2GenealogySpecial />}
        {house.specialModuleType === 'sovereign_governance' && <House3GovernanceStrategySpecial />}
        {house.specialModuleType === 'couples_sanctuary' && <House4CouplesSanctuarySpecial />}
        {house.specialModuleType === 'wedding' && <WeddingHallSpecial />}
        {house.specialModuleType === 'faith' && <House6DevotionalSpecial />}
        {house.specialModuleType === 'security' && <SecuritySentinelSpecial />}
        {house.specialModuleType === 'talent_show' && <TalentShowSpecial />}
        {house.specialModuleType === 'commerce' && <House9DigitalMarketplaceSpecial />}
        {house.specialModuleType === 'ai_academy' && <AiAcademySpecial />}
        {house.specialModuleType === 'institutional_training' && <House11InstitutionalTrainingSpecial />}
        {house.specialModuleType === 'counseling' && <House12ClinicalCounselingSpecial />}
        {house.specialModuleType === 'brokerage' && <House13InteractiveExchangeSpecial />}
        {house.specialModuleType === 'judiciary' && <JudiciaryDecreeSpecial />}
        {house.specialModuleType === 'utility_equb' && <UtilityBillingEqubSpecial />}

        {/* Left / Center Grid of Virtual Seats & Chat Panel */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            {/* Section: Stage Speakers */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  {t.speakersOnStage} ({speakers.length})
                </h2>
                <span className="text-[11px] font-mono text-slate-400">
                  Active Audio Feed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {speakers.map((seat) => (
                  <SeatCard
                    key={seat.id}
                    seat={seat}
                    onToggleMic={() => handleToggleMic(seat.id)}
                    onToggleVideo={() => handleToggleVideo(seat.id)}
                  />
                ))}
              </div>
            </div>

            {/* Section: Virtual Chairs (Audience / Delegates) */}
            <div>
              <div className="flex items-center justify-between mb-3.5 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    {t.audienceInChairs} ({audience.length})
                  </h2>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {isHouse4 ? '🔒 Dual Sanctuary: Max 2 Only' : t.unlimitedChairs}
                  </span>
                </div>

                {isHouse4Capped ? (
                  <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold">
                    🔒 Capped: 2/2 Participants
                  </span>
                ) : (
                  <button
                    onClick={handleAddChair}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-semibold text-amber-300 hover:text-white transition shadow-sm min-h-[38px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.addChair}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {audience.map((seat) => (
                  <SeatCard
                    key={seat.id}
                    seat={seat}
                    onToggleMic={() => handleToggleMic(seat.id)}
                    onToggleVideo={() => handleToggleVideo(seat.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sandboxed Room Chat Drawer */}
          {showChat && (
            <div className="w-full lg:w-80 h-[480px] lg:h-auto rounded-2xl bg-[#070F1D] border border-slate-800 flex flex-col p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.roomChat}
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  SANDBOXED
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-amber-300 text-[11px]">{msg.senderName}</span>
                      <span className="text-[9px] font-mono text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-200 leading-snug">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder={t.typeMessage}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Bottom Controls Dock (Clubhouse / Zoom Style) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#070F1D]/95 border-t border-slate-800 backdrop-blur-md px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Seat Status & Take Seat Action */}
          <div className="flex items-center gap-3">
            {!userSeatId ? (
              <button
                onClick={handleTakeSeat}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-amber-500/20 min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>{t.takeSeat}</span>
              </button>
            ) : (
              <button
                onClick={handleLeaveSeat}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-semibold text-xs hover:bg-rose-900/60 transition min-h-[44px]"
              >
                <span>{t.leaveSeat}</span>
              </button>
            )}

            <button
              onClick={handleAddChair}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs text-slate-300 font-medium transition min-h-[44px]"
              title="Add another chair"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.addChair}</span>
            </button>
          </div>

          {/* Interactive Mic & Camera & Raise Hand Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (userSeatId) {
                  handleToggleMic(userSeatId);
                } else {
                  handleTakeSeat();
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition shadow-sm min-h-[44px] ${
                isMyMicActive
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 ring-2 ring-emerald-400/50'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isMyMicActive ? (
                <>
                  <Mic className="w-4 h-4 animate-pulse" />
                  <span>{t.micActive}</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 text-rose-400" />
                  <span>{t.micMuted}</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (userSeatId) {
                  handleToggleVideo(userSeatId);
                } else {
                  handleTakeSeat();
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition shadow-sm min-h-[44px] ${
                isMyVideoActive
                  ? 'bg-blue-600 text-white hover:bg-blue-500 ring-2 ring-blue-400/50'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isMyVideoActive ? (
                <>
                  <Video className="w-4 h-4" />
                  <span>{t.videoOn}</span>
                </>
              ) : (
                <>
                  <VideoOff className="w-4 h-4 text-slate-400" />
                  <span>{t.videoOff}</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleRaiseHand}
              className={`p-2.5 rounded-xl border transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                hasRaisedHand
                  ? 'bg-amber-500 text-slate-950 border-amber-400 animate-bounce'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={hasRaisedHand ? t.lowerHand : t.raiseHand}
            >
              <Hand className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowChat((prev) => !prev)}
              className={`p-2.5 rounded-xl border transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                showChat
                  ? 'bg-slate-800 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Toggle Room Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Individual Virtual Seat Card with Zoom/Clubhouse style toggles
const SeatCard: React.FC<{
  seat: VirtualSeat;
  onToggleMic: () => void;
  onToggleVideo: () => void;
}> = ({ seat, onToggleMic, onToggleVideo }) => {
  const isSpeaking = seat.isMicActive && (seat.isSpeaking ?? true);

  return (
    <div
      className={`group relative rounded-2xl bg-gradient-to-b from-[#091322]/95 to-[#050B14] border transition-all duration-200 overflow-hidden shadow-lg p-4 flex flex-col justify-between ${
        isSpeaking
          ? 'border-emerald-400/80 shadow-emerald-500/20 ring-2 ring-emerald-500/30'
          : seat.isLocalUser
          ? 'border-amber-400/80 shadow-amber-500/20 ring-1 ring-amber-400/40'
          : 'border-slate-800/90 hover:border-slate-700 hover:shadow-slate-800/40'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono ${
              seat.role === 'Founder'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black'
                : seat.role === 'Host'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : seat.role === 'Speaker'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : seat.role === 'Judge'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                : seat.role === 'Delegate'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {seat.role}
          </span>

          {seat.isLocalUser && (
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-400/40">
              YOU
            </span>
          )}
        </div>

        {seat.handRaised && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-semibold animate-pulse">
            <Hand className="w-3 h-3" />
            <span>Hand Raised</span>
          </div>
        )}
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-3 flex items-center justify-center">
        {seat.isVideoActive ? (
          <div className="relative w-full h-full">
            <img
              src={seat.avatarUrl}
              alt={seat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              HD Video
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-400 p-2 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-300 text-base font-bold shadow-inner">
              {seat.name.charAt(0)}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1">Video Off</span>
          </div>
        )}

        {isSpeaking && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-emerald-500/30">
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Speaking
            </span>
            <div className="flex items-center gap-0.5">
              {[40, 90, 60, 100, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-0.5 bg-emerald-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(4, h * 0.12)}px`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between gap-1">
          <div className="text-sm font-bold text-white truncate" title={seat.name}>
            {seat.name}
          </div>
          <span className="text-base shrink-0" title={seat.nationality}>
            {seat.flag}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
          <span>{seat.gender}, {seat.age} yrs</span>
          <span>•</span>
          <span className="truncate">{seat.nationality}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={onToggleMic}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition min-h-[36px] ${
            seat.isMicActive
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
          }`}
          title={seat.isMicActive ? 'Mute Seat Mic' : 'Unmute Seat Mic'}
        >
          {seat.isMicActive ? (
            <>
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mic On</span>
            </>
          ) : (
            <>
              <MicOff className="w-3.5 h-3.5 text-rose-400" />
              <span>Muted</span>
            </>
          )}
        </button>

        <button
          onClick={onToggleVideo}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition min-h-[36px] ${
            seat.isVideoActive
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
          }`}
          title={seat.isVideoActive ? 'Turn Video Off' : 'Turn Video On'}
        >
          {seat.isVideoActive ? (
            <>
              <Video className="w-3.5 h-3.5 text-blue-400" />
              <span>Video On</span>
            </>
          ) : (
            <>
              <VideoOff className="w-3.5 h-3.5 text-slate-400" />
              <span>Video Off</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

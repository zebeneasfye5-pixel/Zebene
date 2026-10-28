import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Gamepad2,
  Dice5,
  Swords,
  Users,
  User,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Landmark,
  Coins,
  CheckCircle2,
  DollarSign,
  Flame,
  Target,
  BarChart2,
  Timer,
  Lock,
} from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import {
  recordGameMatchSettlement,
  getLedgerState,
  getMaskedFounderAccount,
  FOUNDER_NAME,
  VAULT_TOKENS,
} from '../services/secureConfig';

export type GameCategory = 'traditional' | 'modern' | 'lottery';
export type GameMode = 'solo' | 'dual' | 'tournament';

export interface GameDefinition {
  id: string;
  category: GameCategory;
  nameAm: string;
  nameEn: string;
  tagline: string;
  icon: string;
  description: string;
  modes: GameMode[];
  defaultStakeETB: number;
  playersCount: string;
  duration: string;
}

export const GAME_CATALOG: GameDefinition[] = [
  // Traditional Ethiopian Games
  {
    id: 'gebeta',
    category: 'traditional',
    nameAm: 'ገበጣ (Gebeta Mancala)',
    nameEn: 'Gebeta Ancient Mancala',
    tagline: 'ባህላዊ የስትራቴጂ እና የቁጥር ስሌት ጨዋታ',
    icon: '🕳️',
    description: '12 ጓደጓዶችና 48 ጠጠሮችን በመጠቀም የሚካሄድ የኢትዮጵያ አንጋፋ ስትራቴጂክ ውድድር። ተጋጣሚዎን በብልሃት ይርቱ።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 100,
    playersCount: '1 - 2 Players',
    duration: '3 - 5 min',
  },
  {
    id: 'genna',
    category: 'traditional',
    nameAm: 'ገና (Genna Hockey)',
    nameEn: 'Genna Field Hockey Arena',
    tagline: 'ባህላዊ የገና ጨዋታ እና የጎል ውድድር',
    icon: '🏑',
    description: 'በገና በዓል የሚዘወተረውን አንጋፋ የዱላና የኳስ ውድድር በቨርቹዋል ሜዳ ላይ ይጫወቱ። ጎል ያስቆጥሩና የውድድሩን ዋንጫ ያንሱ።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 150,
    playersCount: '2 - 8 Players',
    duration: '2 - 4 min',
  },
  {
    id: 'tiringo',
    category: 'traditional',
    nameAm: 'ጥሪንጎ (Tiringo Precision)',
    nameEn: 'Tiringo Lemon Catch Arena',
    tagline: 'የፍጥነት እና ትኩረት ባህላዊ ፈተና',
    icon: '🍋',
    description: 'የብርቱካንና የሎሚ ጥሪንጎን በአየር ላይ በመወርወር እና በመቅለብ የሚደረግ ጥንታዊ የፍጥነትና ሚዛን መለኪያ ጨዋታ።',
    modes: ['solo', 'dual'],
    defaultStakeETB: 50,
    playersCount: '1 - 2 Players',
    duration: '90 sec',
  },
  {
    id: 'segno',
    category: 'traditional',
    nameAm: 'ሰኞ ማክሰኞ (Segno Maksegno)',
    nameEn: 'Segno Maksegno Hopscotch',
    tagline: 'የሰሌዳ ዝላይ እና የድንጋይ ውርወራ ጥበብ',
    icon: '🪜',
    description: 'ከሰኞ እስከ እሁድ ያሉትን ሳጥኖች በጠጠር ውርወራና በነጠላ እግር ዝላይ የማጠናቀቅ ባህላዊ የቅልጥፍና ውድድር።',
    modes: ['solo', 'dual'],
    defaultStakeETB: 80,
    playersCount: '1 - 4 Players',
    duration: '2 min',
  },
  // Modern Digital Games
  {
    id: 'speed_chess',
    category: 'modern',
    nameAm: 'ፈጣን ቼዝ (Speed Chess)',
    nameEn: 'Speed Chess Blitz Arena',
    tagline: 'የአእምሮ ፍጥነት እና ቼክሜት ውድድር',
    icon: '♟️',
    description: 'የ60 ሰከንድ ፈጣን የቼዝ ታክቲክ ግጥሚያ። ብልህ ውሳኔዎችን በፍጥነት በመወሰን ተጋጣሚዎን ቼክሜት ያድርጉ።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 200,
    playersCount: '2 Players',
    duration: '60 sec',
  },
  {
    id: 'cyber_quiz',
    category: 'modern',
    nameAm: 'ሳይበር ኩዊዝ (Cyber Quiz Battle)',
    nameEn: 'Cyber Quiz Intellectual Clash',
    tagline: 'የቴክኖሎጂ እና ሳይንስ ፍልሚያ',
    icon: '⚡',
    description: 'በቴክኖሎጂ፣ አርቴፊሻል ኢንተለጀንስ እና ፈጠራ ዙሪያ የሚነሱ ፈታኝ ጥያቄዎችን በሰከንዶች ውስጥ በመመለስ አሸናፊ ይሁኑ።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 100,
    playersCount: '1 - 16 Players',
    duration: '2 min',
  },
  {
    id: 'trivia',
    category: 'modern',
    nameAm: 'አንድ ዓለም ትሪቪያ (Sovereign Trivia)',
    nameEn: 'Oneworld Sovereign Trivia',
    tagline: 'የኢትዮጵያ ታሪክ እና የ15ቱ ቤቶች እውቀት',
    icon: '🌍',
    description: 'የኢትዮጵያ ታሪክ፣ ጂኦግራፊ እና የ15ቱ የኦንዎርልድ ቤቶች ቻርተር እውቀት የሚፈተሽበት ብሄራዊ የትሪቪያ ማዕከል ነው።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 50,
    playersCount: '1 - 32 Players',
    duration: '3 min',
  },
  {
    id: 'trader',
    category: 'modern',
    nameAm: 'ትሬደር አሬና (Trader Arena)',
    nameEn: 'Trader Market Sim Arena',
    tagline: 'የቀጥታ ገበያ ግብይት እና ትንበያ ውድድር',
    icon: '📈',
    description: 'የሻማ ቻርቶችን በማንበብ Buy / Sell ትዕዛዞችን በማስቀመጥ ከፍተኛውን ትርፍ ያስመዘገበ ተወዳዳሪ ገንዳውን ይወስዳል።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 300,
    playersCount: '1 - 10 Players',
    duration: '90 sec',
  },
  {
    id: 'penalty',
    category: 'modern',
    nameAm: 'የፍፁም ቅጣት ምት (Penalty Shootout)',
    nameEn: 'Sovereign Penalty Shootout',
    tagline: 'የእግር ኳስ የፍፁም ቅጣት ምት ፍልሚያ',
    icon: '⚽',
    description: 'የኳሷን አቅጣጫና ጉልበት በመምረጥ ግብ ጠባቂውን በማታለል ጎል ያስቆጥሩ ወይም ኳሷን መልሰው ሻምፒዮን ይሁኑ።',
    modes: ['solo', 'dual', 'tournament'],
    defaultStakeETB: 120,
    playersCount: '2 Players',
    duration: '2 min',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  currentUser: UserProfile;
}

export const GamificationLotteryArena: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLanguage,
  currentUser,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState<'games' | 'lottery' | 'ledger'>('games');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'all'>('all');
  const [selectedGame, setSelectedGame] = useState<GameDefinition>(GAME_CATALOG[0]);
  const [selectedMode, setSelectedMode] = useState<GameMode>('dual');
  const [stakeAmountETB, setStakeAmountETB] = useState<number>(100);

  // Active match state
  const [matchStatus, setMatchStatus] = useState<'idle' | 'in_match' | 'resolved'>('idle');
  const [gameTimer, setGameTimer] = useState<number>(30);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [settlementResult, setSettlementResult] = useState<{
    winnerName: string;
    winnerPayout: number;
    bankEscrowYield: number;
    founderCommission: number;
    platformReserve: number;
    totalPool: number;
    txnId: string;
  } | null>(null);

  // Lottery State
  const [lotteryTicketCount, setLotteryTicketCount] = useState<number>(1);
  const [isSpinningWheel, setIsSpinningWheel] = useState<boolean>(false);
  const [lotteryWinningTicket, setLotteryWinningTicket] = useState<string | null>(null);
  const [lotteryPrizeResult, setLotteryPrizeResult] = useState<{
    prizeETB: number;
    winner: string;
  } | null>(null);

  // Live dynamic ledger state
  const [ledgerState, setLedgerState] = useState(getLedgerState());

  useEffect(() => {
    setLedgerState(getLedgerState());
  }, [matchStatus, lotteryPrizeResult]);

  // Match countdown simulation
  useEffect(() => {
    let interval: any = null;
    if (matchStatus === 'in_match' && gameTimer > 0) {
      interval = setInterval(() => {
        setGameTimer((prev) => {
          if (prev <= 1) {
            handleResolveMatch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchStatus, gameTimer]);

  const handleStartMatch = () => {
    setMatchStatus('in_match');
    setGameTimer(25);
    setPlayerScore(0);
    setOpponentScore(0);
    setSettlementResult(null);
  };

  const handleInteractiveAction = () => {
    // Player scores a point or makes a smart tactical move
    const added = Math.floor(Math.random() * 20) + 10;
    setPlayerScore((prev) => prev + added);

    // Opponent counter-action
    setTimeout(() => {
      const oppAdded = Math.floor(Math.random() * 18) + 8;
      setOpponentScore((prev) => prev + oppAdded);
    }, 400);
  };

  const handleResolveMatch = () => {
    const finalPlayerScore = playerScore + Math.floor(Math.random() * 15);
    const finalOpponentScore = opponentScore + Math.floor(Math.random() * 10);
    setPlayerScore(finalPlayerScore);
    setOpponentScore(finalOpponentScore);

    const isWinner = finalPlayerScore >= finalOpponentScore;
    const winnerName = isWinner
      ? currentUser.fullName || 'Abebe Kebede'
      : selectedMode === 'dual'
      ? 'Tadesse Bekele (Opponent)'
      : 'Blue Eagles Team';

    // Calculate total pool based on mode:
    // Solo = 1x stake, Dual = 2x stake, Tournament = 8x stake
    const multiplier = selectedMode === 'solo' ? 1.5 : selectedMode === 'dual' ? 2 : 8;
    const totalPool = stakeAmountETB * multiplier;

    // Execute Secured Settlement Algorithm:
    // 60% Winner Payout, 10% Bank Escrow Yield, 10% Founder Commission, 20% Platform Reserve
    const settlement = recordGameMatchSettlement(totalPool, selectedGame.nameEn);

    setSettlementResult({
      winnerName,
      winnerPayout: settlement.winnerPayout,
      bankEscrowYield: settlement.bankEscrowYield,
      founderCommission: settlement.founderCommission,
      platformReserve: settlement.platformReserve,
      totalPool,
      txnId: `ZA-SETTLE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    });

    setMatchStatus('resolved');
  };

  const handleBuyLotteryTicket = () => {
    setIsSpinningWheel(true);
    setLotteryWinningTicket(null);
    setLotteryPrizeResult(null);

    const ticketPrice = 20; // 20 ETB per ticket
    const totalPool = ticketPrice * lotteryTicketCount * 25; // 25 participants in pool

    setTimeout(() => {
      setIsSpinningWheel(false);
      const luckyNumber = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setLotteryWinningTicket(luckyNumber);

      const settlement = recordGameMatchSettlement(totalPool, 'Daily Sovereign Lottery Draw');

      setLotteryPrizeResult({
        prizeETB: settlement.winnerPayout,
        winner: currentUser.fullName,
      });
    }, 2500);
  };

  const filteredGames = GAME_CATALOG.filter((g) => {
    if (selectedCategory === 'all') return true;
    return g.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#060D1A] via-[#040812] to-[#02050A] border border-amber-500/40 shadow-2xl p-4 sm:p-7 text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 text-2xl">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  የጨዋታዎች እና ሎተሪ ማዕከል (Gaming & Lottery Arena)
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  60/10/10/20 POOL
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium mt-0.5">
                ባህላዊ እና ዘመናዊ ጨዋታዎች • የተረጋገጠ የሽልማት ክፍፍል • 10% የመስራቹ ቋት (Zebene Asfaye)
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 font-mono">የመስራቹ ቋት (Founder Vault)</div>
              <div className="text-xs font-mono font-bold text-amber-400">
                ETB {ledgerState.founderCommissionBalance.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 max-w-md">
          <button
            onClick={() => setActiveTab('games')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'games'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>ጨዋታዎች (Games Arena)</span>
          </button>
          <button
            onClick={() => setActiveTab('lottery')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'lottery'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Dice5 className="w-4 h-4" />
            <span>ዕለታዊ ሎተሪ (Daily Lottery)</span>
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'ledger'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>የገቢ ቋት (Sovereign Ledger)</span>
          </button>
        </div>

        {/* TAB 1: GAMES ARENA */}
        {activeTab === 'games' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 5 Cols: Game Selection & Filters */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  ጨዋታ ይምረጡ (Choose Game)
                </span>
                {/* Category Filter */}
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2 py-1 rounded-lg ${
                      selectedCategory === 'all'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    ሁሉም
                  </button>
                  <button
                    onClick={() => setSelectedCategory('traditional')}
                    className={`px-2 py-1 rounded-lg ${
                      selectedCategory === 'traditional'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    ባህላዊ
                  </button>
                  <button
                    onClick={() => setSelectedCategory('modern')}
                    className={`px-2 py-1 rounded-lg ${
                      selectedCategory === 'modern'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    ዘመናዊ
                  </button>
                </div>
              </div>

              {/* Game Cards List */}
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredGames.map((game) => {
                  const isSelected = selectedGame.id === game.id;
                  return (
                    <div
                      key={game.id}
                      onClick={() => {
                        setSelectedGame(game);
                        setStakeAmountETB(game.defaultStakeETB);
                        setMatchStatus('idle');
                        setSettlementResult(null);
                      }}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border-amber-400 ring-1 ring-amber-400/50'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {game.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{game.nameAm}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-normal">
                              {game.category === 'traditional' ? 'ባህላዊ' : 'ዲጂታል'}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{game.tagline}</div>
                          <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                            መነሻ ውርርድ: {game.defaultStakeETB} ETB • {game.duration}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-500 ${isSelected ? 'text-amber-400 translate-x-1' : ''}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Cols: Active Game Arena, Mode Selector & Settlement Logic */}
            <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4">
              {/* Selected Game Details & Mode Selector */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{selectedGame.icon}</span>
                    <div>
                      <h2 className="text-base font-bold text-white">{selectedGame.nameAm}</h2>
                      <p className="text-xs text-slate-400">{selectedGame.nameEn}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold px-2.5 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                    Live Escrow Vault
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {selectedGame.description}
                </p>

                {/* 3 Play Modes Picker */}
                <div className="mt-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    የጨዋታ ሁነታ ይምረጡ (3 Playing Modes)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Solo Mode */}
                    <button
                      type="button"
                      disabled={matchStatus === 'in_match'}
                      onClick={() => setSelectedMode('solo')}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                        selectedMode === 'solo'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <User className="w-4 h-4 text-amber-400" />
                      <span className="text-xs">የግል ፈተና (Solo)</span>
                      <span className="text-[9px] font-mono opacity-70">1.5x Pool Yield</span>
                    </button>

                    {/* Dual Mode */}
                    <button
                      type="button"
                      disabled={matchStatus === 'in_match'}
                      onClick={() => setSelectedMode('dual')}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                        selectedMode === 'dual'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Swords className="w-4 h-4 text-amber-400" />
                      <span className="text-xs">የሁለትዮሽ ግጥሚያ (Dual)</span>
                      <span className="text-[9px] font-mono opacity-70">2x Head-to-Head</span>
                    </button>

                    {/* Tournament Mode */}
                    <button
                      type="button"
                      disabled={matchStatus === 'in_match'}
                      onClick={() => setSelectedMode('tournament')}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                        selectedMode === 'tournament'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Users className="w-4 h-4 text-amber-400" />
                      <span className="text-xs">የቡድን ሻምፒዮና</span>
                      <span className="text-[9px] font-mono opacity-70">8x Massive Pool</span>
                    </button>
                  </div>
                </div>

                {/* Stake / Entry Fee Escrow Configuration */}
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">የመግቢያ ክፍያ / ውርርድ (Entry Fee Stake):</span>
                    <span className="text-amber-400 font-mono font-bold">{stakeAmountETB} ETB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[50, 100, 200, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        disabled={matchStatus === 'in_match'}
                        onClick={() => setStakeAmountETB(amt)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition ${
                          stakeAmountETB === amt
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>

                  {/* Pool Distribution Preview Formula */}
                  <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-slate-800 text-center font-mono text-[10px]">
                    <div className="p-1 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                      <div>60% Winner</div>
                      <div className="font-bold">
                        {Math.round(stakeAmountETB * (selectedMode === 'solo' ? 1.5 : selectedMode === 'dual' ? 2 : 8) * 0.6)} ETB
                      </div>
                    </div>
                    <div className="p-1 rounded bg-blue-950/40 text-blue-300 border border-blue-500/30">
                      <div>10% Bank Escrow</div>
                      <div className="font-bold">
                        {Math.round(stakeAmountETB * (selectedMode === 'solo' ? 1.5 : selectedMode === 'dual' ? 2 : 8) * 0.1)} ETB
                      </div>
                    </div>
                    <div className="p-1 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">
                      <div>10% Founder (ZA)</div>
                      <div className="font-bold">
                        {Math.round(stakeAmountETB * (selectedMode === 'solo' ? 1.5 : selectedMode === 'dual' ? 2 : 8) * 0.1)} ETB
                      </div>
                    </div>
                    <div className="p-1 rounded bg-purple-950/40 text-purple-300 border border-purple-500/30">
                      <div>20% Reserve</div>
                      <div className="font-bold">
                        {Math.round(stakeAmountETB * (selectedMode === 'solo' ? 1.5 : selectedMode === 'dual' ? 2 : 8) * 0.2)} ETB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GAME STAGE & SIMULATION CONTAINER */}
              <div className="min-h-[170px] rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-amber-500/30 p-4 flex flex-col justify-between relative overflow-hidden">
                {matchStatus === 'idle' && (
                  <div className="flex flex-col items-center justify-center my-auto text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                      <Target className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">ግጥሚያውን ለመጀመር ዝግጁ ኖት?</h3>
                      <p className="text-[11px] text-slate-400">
                        የእርስዎ ተጋጣሚ ተሰይሟል • የውርርድ ፈንዱ በባንክ ኤስክሮው ተይዟል
                      </p>
                    </div>
                    <button
                      onClick={handleStartMatch}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>ግጥሚያ ጀምር (Enter Match Arena)</span>
                    </button>
                  </div>
                )}

                {matchStatus === 'in_match' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-amber-400 animate-spin" />
                        <span className="text-xs font-mono font-bold text-amber-400">
                          ጊዜ: {gameTimer} ሰከንድ
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        MATCH IN PROGRESS
                      </span>
                    </div>

                    {/* Live Scoreboard */}
                    <div className="grid grid-cols-2 gap-3 py-2">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-center">
                        <div className="text-[10px] text-slate-400 truncate font-semibold">
                          እርስዎ ({currentUser.fullName.split(' ')[0]})
                        </div>
                        <div className="text-2xl font-mono font-black text-emerald-400 mt-1">
                          {playerScore}
                        </div>
                        <div className="text-[9px] text-emerald-300">ነጥብ (Points)</div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/40 text-center">
                        <div className="text-[10px] text-slate-400 truncate font-semibold">
                          {selectedMode === 'dual' ? 'ተጋጣሚ (Opponent)' : 'ተቀናቃኝ ቡድን'}
                        </div>
                        <div className="text-2xl font-mono font-black text-rose-400 mt-1">
                          {opponentScore}
                        </div>
                        <div className="text-[9px] text-rose-300">ነጥብ (Points)</div>
                      </div>
                    </div>

                    {/* Interactive Action Button for Gameplay */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleInteractiveAction}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4 fill-current" />
                        <span>
                          {selectedGame.id === 'gebeta'
                            ? 'ጠጠር ዝራ (Sow Seeds)'
                            : selectedGame.id === 'genna'
                            ? 'ጎል ምታ (Strike Puck)'
                            : selectedGame.id === 'penalty'
                            ? 'ቅጣት ምት ምታ (Shoot Ball)'
                            : selectedGame.id === 'speed_chess'
                            ? 'ታክቲክ አንቀሳቅስ (Move Tactic)'
                            : selectedGame.id === 'trader'
                            ? 'Buy / Sell ትዕዛዝ አስገባ'
                            : 'ትክክለኛውን መልስ ምረጥ (Submit Answer)'}
                        </span>
                      </button>

                      <button
                        onClick={handleResolveMatch}
                        className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                        title="ጨዋታውን አጠናቅቅ"
                      >
                        ጨርስ
                      </button>
                    </div>
                  </div>
                )}

                {matchStatus === 'resolved' && settlementResult && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-black border border-amber-500/50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-mono">
                            የጨዋታው አሸናፊ (Match Champion)
                          </div>
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{settlementResult.winnerName}</span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              (+{settlementResult.winnerPayout} ETB)
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                        SETTLED
                      </span>
                    </div>

                    {/* Breakdown Ledger Card */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/40">
                        <div className="text-slate-400">Winner (60%)</div>
                        <div className="text-emerald-400 font-bold mt-0.5">
                          {settlementResult.winnerPayout} ETB
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-950/50 border border-blue-500/40">
                        <div className="text-slate-400">Escrow (10%)</div>
                        <div className="text-blue-400 font-bold mt-0.5">
                          {settlementResult.bankEscrowYield} ETB
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-500/40">
                        <div className="text-slate-400">Founder (10%)</div>
                        <div className="text-amber-400 font-bold mt-0.5">
                          {settlementResult.founderCommission} ETB
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-950/50 border border-purple-500/40">
                        <div className="text-slate-400">Reserve (20%)</div>
                        <div className="text-purple-400 font-bold mt-0.5">
                          {settlementResult.platformReserve} ETB
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
                      <div>Ledger Hash: <span className="text-amber-400">{settlementResult.txnId}</span></div>
                      <button
                        onClick={handleStartMatch}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>እንደገና ተጫወት</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAILY LOTTERY & EQUB DRAW */}
        {activeTab === 'lottery' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-black border border-amber-500/50 relative overflow-hidden">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  የዕለትና የሳምንት ሉዓላዊ ሎተሪ (Daily Sovereign Lottery)
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  የዕድል እጣ ዙር • ፈጣን የባንክ ክፍፍል
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  በየቀኑ የሚካሄድ የ15ቱ ቤቶች ህብረተሰብ ሎተሪ። 60% ለአሸናፊው፣ 10% ለባንክ ቁጠባ፣ 10% ለመስራቹ ቋት (Zebene Asfaye) እንዲሁም 20% ለመጠባበቂያ የሚከፋፈልበት ግልፅ ስሌት።
                </p>
              </div>

              {/* Action Area */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">የትኬት ብዛት:</span>
                  {[1, 5, 10, 25].map((count) => (
                    <button
                      key={count}
                      onClick={() => setLotteryTicketCount(count)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                        lotteryTicketCount === count
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 hover:text-white'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                  <span className="text-xs font-mono text-amber-400 font-bold ml-2">
                    {lotteryTicketCount * 20} ETB
                  </span>
                </div>

                <button
                  disabled={isSpinningWheel}
                  onClick={handleBuyLotteryTicket}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
                >
                  <Dice5 className={`w-5 h-5 ${isSpinningWheel ? 'animate-spin' : ''}`} />
                  <span>{isSpinningWheel ? 'እጣው እየወጣ ነው...' : 'እጣ ቁረጥና አሽከርክር (Spin Wheel)'}</span>
                </button>
              </div>

              {/* Lottery Result Display */}
              {lotteryPrizeResult && (
                <div className="mt-5 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 animate-in fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-black">
                      🎟️
                    </div>
                    <div>
                      <div className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>እንኳን ደስ አላችሁ! አሸናፊው እጣ ወጥቷል</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        የትኬት ቁጥር: <span className="font-mono text-amber-300">{lotteryWinningTicket}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">
                        ተሸላሚ: {lotteryPrizeResult.winner}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">የተሸለሙት መጠን (60%)</div>
                    <div className="text-xl font-mono font-black text-emerald-400">
                      +{lotteryPrizeResult.prizeETB.toLocaleString()} ETB
                    </div>
                    <div className="text-[10px] text-amber-400/90 font-mono">
                      +10% ለመስራቹ ቋት ገቢ ሆኗል
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SOVEREIGN LEDGER & FOUNDER REVENUE MATRIX */}
        {activeTab === 'ledger' && (
          <div className="space-y-5">
            {/* Header Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>ሉዓላዊ የጨዋታ እና የሎተሪ ገቢ ስርጭት ማህደር (Escrow Ledger)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  የጨዋታዎች ፈንድ ክፍፍል በራስ-ሰር በ60/10/10/20 ቀመር ይተገበራል።
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">የተፈቱ ግጥሚያዎች</span>
                <span className="text-base font-mono font-bold text-amber-400">
                  {ledgerState.totalMatchesResolved} Matches
                </span>
              </div>
            </div>

            {/* 4 Cards Ledger Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* 60% Winners Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <div className="text-[10px] uppercase font-mono text-emerald-400 font-bold">
                  60% ለአሸናፊዎች (Winners Pool)
                </div>
                <div className="text-xl font-mono font-bold text-white mt-1.5">
                  ETB {ledgerState.totalDistributedWinners.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-300/80 mt-1">
                  ለጨዋታ እና ለሎተሪ አሸናፊዎች በቀጥታ የተከፈለ
                </div>
              </div>

              {/* 10% Bank Escrow Yield */}
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40">
                <div className="text-[10px] uppercase font-mono text-blue-400 font-bold">
                  10% የባንክ ኤስክሮው (Bank Escrow)
                </div>
                <div className="text-xl font-mono font-bold text-white mt-1.5">
                  ETB {ledgerState.bankEscrowYieldBalance.toLocaleString()}
                </div>
                <div className="text-[10px] text-blue-300/80 mt-1">
                  በባንክ በከፍተኛ ወለድ የተቀመጠ የመጠባበቂያ ፈንድ
                </div>
              </div>

              {/* 10% Founder Commission Ledger (Zebene Asfaye) */}
              <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/60 ring-1 ring-amber-500/40">
                <div className="text-[10px] uppercase font-mono text-amber-400 font-bold flex items-center justify-between">
                  <span>10% የመስራች ኮሚሽን</span>
                  <span className="text-[9px] bg-amber-500/20 px-1.5 py-0.2 rounded text-amber-300">
                    ZEBENE ASFAYE
                  </span>
                </div>
                <div className="text-xl font-mono font-bold text-white mt-1.5">
                  ETB {ledgerState.founderCommissionBalance.toLocaleString()}
                </div>
                <div className="text-[10px] text-amber-300/90 mt-1 font-mono">
                  {getMaskedFounderAccount(false)}
                </div>
              </div>

              {/* 20% Tournament Operations Reserve */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40">
                <div className="text-[10px] uppercase font-mono text-purple-400 font-bold">
                  20% የውድድር መጠባበቂያ (Reserve)
                </div>
                <div className="text-xl font-mono font-bold text-white mt-1.5">
                  ETB {ledgerState.tournamentReserveBalance.toLocaleString()}
                </div>
                <div className="text-[10px] text-purple-300/80 mt-1">
                  ለትላልቅ ዋንጫዎችና ለአመታዊ ሻምፒዮናዎች የተያዘ
                </div>
              </div>
            </div>

            {/* Legal Security Footnote */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                ሁሉም የጨዋታ እና የሎተሪ ክፍፍሎች በህጋዊ የኤስክሮው ኮንትራት የተቆለፉ ናቸው። የገንቢ እና የመስራች ኮሚሽኖች በራስ-ሰር ወደ ሉዓላዊው አካውንት ገቢ ይሆናሉ።
              </span>
            </div>
          </div>
        )}

        {/* Footer info bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-mono text-[11px]">
              Oneworld Entertainment & Gaming Matrix • Active Network Escrow
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            ዝጋ (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

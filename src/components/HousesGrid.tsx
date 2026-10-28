import React, { useState } from 'react';
import {
  Globe,
  Landmark,
  Cpu,
  TrendingUp,
  Sparkles,
  Shield,
  Zap,
  Droplets,
  HeartHandshake,
  Users,
  Home,
  Wheat,
  Code,
  Award,
  Coins,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';
import { House, HouseCategory, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { HOUSES } from '../data/housesData';

interface Props {
  currentLanguage: LanguageCode;
  onSelectHouse: (house: House) => void;
  activeCategory: HouseCategory | 'all';
  onSelectCategory: (cat: HouseCategory | 'all') => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  Landmark,
  Cpu,
  TrendingUp,
  Sparkles,
  Shield,
  Zap,
  Droplets,
  HeartHandshake,
  Users,
  Home,
  Wheat,
  Code,
  Award,
  Coins,
};

export const HousesGrid: React.FC<Props> = ({
  currentLanguage,
  onSelectHouse,
  activeCategory,
  onSelectCategory,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const filteredHouses =
    activeCategory === 'all'
      ? HOUSES
      : HOUSES.filter((h) => h.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Tabs Filter */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-amber-500/20'
              : 'bg-[#0B1528]/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t.allHouses}</span>
          <span className="text-[10px] opacity-80 font-mono ml-1">15</span>
        </button>

        <button
          onClick={() => onSelectCategory('global')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
            activeCategory === 'global'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-amber-500/20'
              : 'bg-[#0B1528]/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{t.catGlobal}</span>
          <span className="text-[10px] opacity-80 font-mono ml-1">5</span>
        </button>

        <button
          onClick={() => onSelectCategory('regional')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
            activeCategory === 'regional'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-amber-500/20'
              : 'bg-[#0B1528]/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{t.catRegional}</span>
          <span className="text-[10px] opacity-80 font-mono ml-1">5</span>
        </button>

        <button
          onClick={() => onSelectCategory('wereda_kebele')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
            activeCategory === 'wereda_kebele'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-amber-500/20'
              : 'bg-[#0B1528]/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>{t.catWereda}</span>
          <span className="text-[10px] opacity-80 font-mono ml-1">5</span>
        </button>
      </div>

      {/* 15 Specialized Houses Grid with strict typography rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map((house) => (
          <HouseCard
            key={house.id}
            house={house}
            currentLanguage={currentLanguage}
            onSelectHouse={() => onSelectHouse(house)}
          />
        ))}
      </div>
    </div>
  );
};

// Sub-component: House Card following strict typography and microcopy specifications
const HouseCard: React.FC<{
  house: House;
  currentLanguage: LanguageCode;
  onSelectHouse: () => void;
}> = ({ house, currentLanguage, onSelectHouse }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const IconComponent = ICON_MAP[house.iconName] || Globe;

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-[#0B1528]/95 via-[#080F1D]/95 to-[#050B14] border border-slate-800/90 hover:border-amber-500/60 transition-all duration-300 p-6 shadow-xl flex flex-col justify-between hover:shadow-amber-500/10">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

      <div>
        {/* Top Badges: Category & House Number (System ID removed from public view) */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-black text-xs flex items-center justify-center shadow-inner">
            #{house.houseNumber}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            {house.category.replace('_', ' ')}
          </span>
        </div>

        {/* 1. TYPOGRAPHY & TEXT HIERARCHY OPTIMIZATION
            - Primary Title: Amharic text elevated with font size 1.25rem (20px), font-weight: 600 (Bold), color: #FFFFFF
            - Secondary Subtitle: English text demoted with font size 0.875rem (14px), font-weight: 400 (Regular), color: #9CA3AF (#9CA3AF = text-gray-400)
        */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-slate-800 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition mt-0.5">
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            {/* Primary Title (Amharic): 1.25rem (20px), font-weight: 600, color: #FFFFFF */}
            <h3
              style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF' }}
              className="tracking-tight leading-snug group-hover:text-amber-200 transition"
            >
              {house.amharicTitle}
            </h3>

            {/* Secondary Subtitle (English): 0.875rem (14px), font-weight: 400, color: #9CA3AF */}
            <p
              style={{ fontSize: '0.875rem', fontWeight: 400, color: '#9CA3AF' }}
              className="leading-snug"
            >
              {house.englishSubtitle}
            </p>
          </div>
        </div>

        {/* Short Summary Description */}
        <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
          {house.shortDesc}
        </p>

        {/* Smooth Read More Toggle Component */}
        {isExpanded && (
          <div className="mt-3.5 p-3.5 rounded-xl bg-[#040810]/90 border border-slate-800 text-[11px] text-slate-300 leading-relaxed animate-in fade-in duration-200 space-y-1.5">
            <div className="text-amber-300 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>የክፍሉ ሙሉ ዝርዝርና መመሪያ:</span>
            </div>
            <p>{house.fullDesc}</p>
          </div>
        )}

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2.5 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition focus:outline-none"
        >
          <span>{isExpanded ? t.readLess : 'ተጨማሪ አንብብ (Read More)'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mt-3.5 pt-3.5 border-t border-slate-800/80">
          {house.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-400 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. CALL-TO-ACTION (CTA) BUTTON RE-WORDING & INCREASED TAP-TARGET:
          Replaced "ወደ ቤት ግባ ->" with modern conversion-focused microcopy: "ውይይቱን ተቀላቀል" (Join Discussion)
      */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ያልተገደበ ወንበር</span>
        </div>

        <button
          onClick={onSelectHouse}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-500/20 active:scale-[0.98] min-h-[44px]"
        >
          <span>ውይይቱን ተቀላቀል</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

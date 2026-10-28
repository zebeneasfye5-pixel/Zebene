import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Award,
  TrendingUp,
  ThumbsUp,
  Sliders,
  DollarSign,
  Radio,
  Plus,
  Compass,
} from 'lucide-react';

export const TalentShowSpecial: React.FC = () => {
  const [likesCount, setLikesCount] = useState<number>(3428);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

  // Boundless Talent Domains
  const [categories, setCategories] = useState<string[]>([
    'የቴክኖሎጂ እና AI ሮቦቲክስ ፈጠራ (Tech & AI)',
    'ዘመናዊና ባህላዊ ሙዚቃ (Ethio-Jazz & Vocals)',
    'ተውኔትና ኮሜዲ (Standup Comedy & Drama)',
    'ጥበብና ስእል (Fine Arts & Sculpture)',
    'የፈጠራ ስነ-ጽሁፍና ግጥም (Literature & Poetry)',
    'ሳይንሳዊ ግኝት (Green Energy Inventions)',
  ]);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [newCustomCategory, setNewCustomCategory] = useState<string>('');
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

  // Judges Scores (1 to 10 points)
  const [judge1Score, setJudge1Score] = useState<number>(9.5);
  const [judge2Score, setJudge2Score] = useState<number>(8.8);
  const [judge3Score, setJudge3Score] = useState<number>(9.2);

  const averageJudgeScore = ((judge1Score + judge2Score + judge3Score) / 3).toFixed(1);

  const handleAudienceLike = () => {
    setLikesCount((prev) => prev + 1);
    setHasLiked(true);
    // Add heart particle effect
    const id = Date.now();
    setFloatingHearts((prev) => [...prev.slice(-10), id]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h !== id));
    }, 1200);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomCategory.trim()) return;
    setCategories((prev) => [newCustomCategory.trim(), ...prev]);
    setActiveCategory(newCustomCategory.trim());
    setNewCustomCategory('');
    setShowAddCategory(false);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-950/20 via-[#0C1222] to-slate-950 border border-yellow-500/40 p-4 sm:p-5 text-white space-y-4 relative overflow-hidden">
      {/* Floating Hearts Reaction Canvas */}
      <div className="absolute right-6 bottom-16 pointer-events-none z-20">
        {floatingHearts.map((h, i) => (
          <div
            key={h}
            className="absolute -bottom-2 text-rose-500 animate-bounce duration-1000 transition-all opacity-80"
            style={{
              right: `${(i % 4) * 14}px`,
              fontSize: `${18 + (i % 3) * 6}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>የታለንት ሾው የቀጥታ ውድድር መድረክ</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                BOUNDLESS ARENA
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Limitless Categories of Skill, Invention & Art • Judges Metrics (1-10) vs Live Audience Likes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Like button with count */}
          <button
            onClick={handleAudienceLike}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/30 border border-rose-500/50 hover:bg-rose-600/50 text-rose-300 text-xs font-bold transition shadow-lg active:scale-95"
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{likesCount.toLocaleString()} Likes</span>
          </button>
        </div>
      </div>

      {/* Boundless Talent Categories Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-yellow-400 flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            <span>ገደብ የለሽ የተሰጥኦና የፈጠራ መስኮች (Boundless Talent Domains)</span>
          </span>
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>አዲስ መስክ ጨምር (Add Custom Domain)</span>
          </button>
        </div>

        {showAddCategory && (
          <form onSubmit={handleAddCategory} className="flex gap-2 p-2 rounded-xl bg-slate-900 border border-yellow-500/40">
            <input
              type="text"
              value={newCustomCategory}
              onChange={(e) => setNewCustomCategory(e.target.value)}
              placeholder="አዲሱን የተሰጥኦ ወይም የፈጠራ ዘርፍ ያስገቡ (e.g. Acrobatics, Fusion Culinary)..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs"
            >
              መዝግብ
            </button>
          </form>
        )}

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition text-[11px] font-medium ${
                activeCategory === cat
                  ? 'bg-yellow-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Judges Panel vs Audience Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Judges Scoring Matrix */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>የዳኞች ነጥብ (Judges Score)</span>
            </span>
            <span className="text-sm font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {averageJudgeScore} / 10.0
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Judge Teddy Makonnen (ቴክኒክና ፈጠራ):</span>
                <span className="text-yellow-400 font-bold">{judge1Score}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={judge1Score}
                onChange={(e) => setJudge1Score(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Judge Aster Aweke (ክህሎትና ልዩ ስጦታ):</span>
                <span className="text-yellow-400 font-bold">{judge2Score}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={judge2Score}
                onChange={(e) => setJudge2Score(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Judge Elias Melka (አጠቃላይ ማራኪነት):</span>
                <span className="text-yellow-400 font-bold">{judge3Score}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={judge3Score}
                onChange={(e) => setJudge3Score(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Audience Tip / Revenue Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>የቀጥታ ማበረታቻና ሽልማት (Audience Tips)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                80/10/10 REVENUE
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ተወዳዳሪው የሚያገኘው ገቢ በራስ-ሰር 80% ለተወዳዳሪው ዋሌት፣ 10% ለባንክ ቁጠባ፣ 10% ለመስራቹ ሉዓላዊ ቋት (Sovereign Settlement Vault) ይከፋፈላል።
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs">
              +100 ETB
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs">
              +500 ETB
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs">
              +1000 ETB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

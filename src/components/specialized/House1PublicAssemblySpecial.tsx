import React, { useState } from 'react';
import {
  Globe,
  Share2,
  TrendingUp,
  Search,
  Sparkles,
  Heart,
  MessageCircle,
  Plus,
  Send,
  Compass,
  CheckCircle,
} from 'lucide-react';

interface FeedItem {
  id: string;
  author: string;
  region: string;
  category: string;
  content: string;
  likes: number;
  shares: number;
  timeAgo: string;
  hasLiked?: boolean;
}

export const House1PublicAssemblySpecial: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: 'post-1',
      author: 'Yared Tesfaye (Addis Ababa)',
      region: 'National Assembly Hub',
      category: 'Community Green Energy',
      content:
        'በዘበነ አስፍዬ 2026 ራዕይ የተደገፈው የንፁህ ሃይል ፕሮጀክት በ5 ወረዳዎች 20,000 አባወራዎችን ተጠቃሚ አድርጓል! አንድ ዓለም ለጋራ ልማት።',
      likes: 1240,
      shares: 312,
      timeAgo: '12 min ago',
    },
    {
      id: 'post-2',
      author: 'Halima Mohammed (Harar)',
      region: 'Eastern Cultural Hub',
      category: 'Youth Innovation Guild',
      content:
        'ዛሬ በቤት 1 አዳራሽ በኩል ከዲያስፖራው ማህበረሰብ ጋር የተደረገው የቴክኖሎጂ ስልጠና ትስስር 50 አዳዲስ ስራዎችን ፈጥሯል።',
      likes: 890,
      shares: 180,
      timeAgo: '35 min ago',
    },
    {
      id: 'post-3',
      author: 'Dawit Gebre (Mekelle)',
      region: 'Northern Innovation Node',
      category: 'Digital Literacy',
      content:
        'የነፃ ትምህርት መድረኮቻችን በAI ተተርጉመው በሁሉም ቋንቋዎች ለህዝብ ክፍት ሆነዋል። ሁላችንም እውቀትን እንጋራ!',
      likes: 645,
      shares: 98,
      timeAgo: '1 hr ago',
    },
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLike = (id: string) => {
    setFeedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.hasLiked;
          return {
            ...item,
            hasLiked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newItem: FeedItem = {
      id: `post-${Date.now()}`,
      author: 'የእርስዎ ዜግነት ፕሮፋይል (Citizen)',
      region: 'National Feed',
      category: 'Positive Impact Story',
      content: newPostText,
      likes: 1,
      shares: 0,
      timeAgo: 'Just now',
      hasLiked: true,
    };
    setFeedItems([newItem, ...feedItems]);
    setNewPostText('');
    setShowShareModal(false);
  };

  const filteredFeed = feedItems.filter(
    (item) =>
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#070F1E] to-[#040913] border border-amber-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Universal Plenary Square</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Live Global Feed</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የህዝብ የጋራ አደባባይ እና አዎንታዊ ይዘት ማጋሪያ (Public Assembly Hub)
            </h3>
          </div>
        </div>

        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>አዎንታዊ ይዘት አጋራ (Share Impact)</span>
        </button>
      </div>

      {/* Directory Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="በጋራ አደባባይ ፈልግ (ዜና፣ አዎንታዊ ታሪኮች፣ ማህበረሰብ)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 whitespace-nowrap">
            ሁሉንም (All)
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 cursor-pointer whitespace-nowrap">
            ልማት (Development)
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 cursor-pointer whitespace-nowrap">
            ፈጠራ (Innovation)
          </span>
        </div>
      </div>

      {/* Share Impact Modal / Inline Composer */}
      {showShareModal && (
        <form
          onSubmit={handleAddPost}
          className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2.5 animate-in fade-in"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
            <span>አዲስ አዎንታዊ የህብረተሰብ ታሪክ ያጋሩ</span>
            <button
              type="button"
              onClick={() => setShowShareModal(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            rows={3}
            placeholder="የማህበረሰብዎን በጎ ተሞክሮ፣ የልማት ዜና ወይም የሰላም መልእክት እዚህ ይጻፉ..."
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowShareModal(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              ይቅር
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ወደ አደባባይ ልቀቅ</span>
            </button>
          </div>
        </form>
      )}

      {/* Public Square Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                <span className="font-semibold text-amber-300 truncate max-w-[140px]">
                  {item.author}
                </span>
                <span className="font-mono text-slate-500">{item.timeAgo}</span>
              </div>
              <div className="inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[9px] mb-2 uppercase">
                {item.category}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {item.content}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-400">
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center gap-1 transition ${
                  item.hasLiked ? 'text-rose-400 font-bold' : 'hover:text-rose-400'
                }`}
              >
                <Heart className="w-3.5 h-3.5" fill={item.hasLiked ? 'currentColor' : 'none'} />
                <span>{item.likes}</span>
              </button>
              <div className="flex items-center gap-1 hover:text-amber-300 cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
                <span>{item.shares}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                <CheckCircle className="w-3 h-3" />
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

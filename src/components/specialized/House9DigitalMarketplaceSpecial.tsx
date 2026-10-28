import React, { useState } from 'react';
import {
  ShoppingBag,
  Tag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Radio,
  Sparkles,
  FileText,
  Phone,
  Plus,
  Send,
} from 'lucide-react';

interface ProductItem {
  id: string;
  merchant: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  isStreaming: boolean;
  escrowStatus: 'Protected' | 'Dispatched';
}

interface ClassifiedAd {
  id: string;
  merchantName: string;
  title: string;
  category: string;
  bodyText: string;
  price: string;
  contactPhone: string;
  postedAt: string;
}

export const House9DigitalMarketplaceSpecial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stream_expo' | 'text_classifieds'>('stream_expo');

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'p-1',
      merchant: 'Yirgacheffe Specialty Guild',
      name: 'የይርጋጨፌ ፕሪሚየም ቡና (Grade 1 Roast)',
      category: 'Organic Agricultural Export',
      price: 850,
      currency: 'ETB',
      stock: 45,
      isStreaming: true,
      escrowStatus: 'Protected',
    },
    {
      id: 'p-2',
      merchant: 'Sheba Heritage Weavers',
      name: 'የሀበሻ ባህላዊ ጥልፍ ቀሚስ (Handmade Tibeb)',
      category: 'Textile & Artisan Craft',
      price: 4200,
      currency: 'ETB',
      stock: 12,
      isStreaming: true,
      escrowStatus: 'Protected',
    },
    {
      id: 'p-3',
      merchant: 'Addis Smart IoT Labs',
      name: 'የስማርት እርሻ እርጥበት መቆጣጠሪያ (Smart Sensor Hub)',
      category: 'Agri-Tech Hardware',
      price: 3600,
      currency: 'ETB',
      stock: 28,
      isStreaming: false,
      escrowStatus: 'Protected',
    },
  ]);

  const [classifieds, setClassifieds] = useState<ClassifiedAd[]>([
    {
      id: 'ad-1',
      merchantName: 'Selam Agro-Industries',
      title: 'የመጀመሪያ ደረጃ ማኛ ጤፍ በጅምላ (Export Grade White Teff)',
      category: 'ግብርና እና እህል',
      bodyText: 'ከምስራቅ ጎጃም የመጣ ንፁህና የተመረጠ ማኛ ጤፍ በኩንታል ይሸጣል። አስተማማኝ የትራንስፖርት አቅርቦት አለን።',
      price: '11,500 ETB / ኩንታል',
      contactPhone: '+251 91 234 5678',
      postedAt: '15 min ago',
    },
    {
      id: 'ad-2',
      merchantName: 'Finfinne Heavy Equipment Hire',
      title: 'የግንባታ ማሽነሪዎች ኪራይ (Caterpillar Excavators & Loaders)',
      category: 'ኮንስትራክሽንና ማሽነሪ',
      bodyText: 'ለረጅም እና ለአጭር ጊዜ ፕሮጀክቶች የሚሆኑ ዘመናዊ ኤክስካቫተሮችና ሎደሮች በተመጣጣኝ ዋጋ ከነነዳጃቸው እናቀርባለን።',
      price: 'በድርድር (Negotiable)',
      contactPhone: '+251 92 888 9900',
      postedAt: '45 min ago',
    },
    {
      id: 'ad-3',
      merchantName: 'Habesha Tech Solutions',
      title: 'የድርጅት ኔትዎርኪንግ እና የደመና ዳታቤዝ ዝርጋታ (Cloud ERP)',
      category: 'ቴክኖሎጂ እና ሶፍትዌር',
      bodyText: 'ፋብሪካዎችና ትልልቅ ተቋማት የሽያጭና የክምችት መረጃቸውን በቀላሉ እንዲያስተዳድሩ ዘመናዊ ሶፍትዌር እንዘረጋለን።',
      price: '45,000 ETB',
      contactPhone: '+251 94 555 1234',
      postedAt: '2 hours ago',
    },
  ]);

  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdMerchant, setNewAdMerchant] = useState('');
  const [newAdCategory, setNewAdCategory] = useState('አጠቃላይ ንግድ');
  const [newAdBody, setNewAdBody] = useState('');
  const [newAdPrice, setNewAdPrice] = useState('');
  const [newAdPhone, setNewAdPhone] = useState('');

  const [orderedProduct, setOrderedProduct] = useState<string | null>(null);

  const handleOrder = (id: string) => {
    setOrderedProduct(id);
    setTimeout(() => {
      setOrderedProduct(null);
    }, 4000);
  };

  const handlePostClassified = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle.trim() || !newAdBody.trim()) return;
    const item: ClassifiedAd = {
      id: `ad-${Date.now()}`,
      merchantName: newAdMerchant || 'የተረጋገጠ ነጋዴ',
      title: newAdTitle,
      category: newAdCategory,
      bodyText: newAdBody,
      price: newAdPrice || 'በድርድር',
      contactPhone: newAdPhone || '+251 91 000 0000',
      postedAt: 'Just now',
    };
    setClassifieds([item, ...classifieds]);
    setNewAdTitle('');
    setNewAdMerchant('');
    setNewAdBody('');
    setNewAdPrice('');
    setNewAdPhone('');
    setShowPostAdModal(false);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#1C0F08] to-[#0A0503] border border-orange-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Live Commerce & Classified Billboard</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Escrow Protected</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የማስታወቂያ አዳራሽ • Live Stream Expo & Classified Billboard
            </h3>
          </div>
        </div>

        {/* Tab Switcher: Live Stream Expo vs Text Classifieds */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('stream_expo')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'stream_expo' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            የቀጥታ ስርጭት (Live Expo)
          </button>
          <button
            onClick={() => setActiveTab('text_classifieds')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'text_classifieds' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            የጽሁፍ ማስታወቂያ ሰሌዳ (Classifieds)
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE STREAM EXPO */}
      {activeTab === 'stream_expo' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="text-orange-400 font-semibold">{item.merchant}</span>
                  {item.isStreaming && (
                    <span className="flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>LIVE EXPO</span>
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-white leading-snug mb-1">
                  {item.name}
                </h4>
                <div className="text-[10px] text-slate-400 mb-2">{item.category}</div>
                <div className="text-sm font-black text-amber-300 font-mono mb-3">
                  {item.price.toLocaleString()} {item.currency}
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-2.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                  <span>የቀረ ክምችት: {item.stock}</span>
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>ገንዘብ በኢስክሮው የተያዘ</span>
                  </span>
                </div>

                {orderedProduct === item.id ? (
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-300 font-bold text-center text-xs flex items-center justify-center gap-1.5 border border-emerald-500/50">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ትዕዛዝ ተፈጽሟል! (80/10/10 Split Escrowed)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOrder(item.id)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>በአንድ ክሊክ ይዘዙ (1-Click Buy)</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: TEXT-BASED CLASSIFIED BILLBOARD */}
      {activeTab === 'text_classifieds' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>የነጋዴዎች የጽሁፍ ማስታወቂያ ሰሌዳ (Native Text Billboard)</span>
            </span>
            <button
              onClick={() => setShowPostAdModal(!showPostAdModal)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>አዲስ ማስታወቂያ ለጥፍ (Post Ad)</span>
            </button>
          </div>

          {/* Post Ad Form Modal/Inline */}
          {showPostAdModal && (
            <form onSubmit={handlePostClassified} className="p-3.5 rounded-xl bg-slate-900 border border-orange-500/40 space-y-2.5">
              <div className="font-bold text-amber-300 text-xs">አዲስ የጽሁፍ ማስታወቂያ መለጠፊያ</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="የማስታወቂያው አርዕስት (Ad Headline)..."
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="የንግድ ድርጅት / ነጋዴ ስም..."
                  value={newAdMerchant}
                  onChange={(e) => setNewAdMerchant(e.target.value)}
                  className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="የማስታወቂያው ዝርዝር መግለጫ (Product/Service specifications)..."
                value={newAdBody}
                onChange={(e) => setNewAdBody(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="ዋጋ (Price, e.g. 10,000 ETB)..."
                  value={newAdPrice}
                  onChange={(e) => setNewAdPrice(e.target.value)}
                  className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="የመገናኛ ስልክ / ቴሌግራም (+251...)..."
                  value={newAdPhone}
                  onChange={(e) => setNewAdPhone(e.target.value)}
                  className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPostAdModal(false)}
                  className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs"
                >
                  ይቅር
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-orange-600 text-white font-bold text-xs"
                >
                  ለጥፍ (Publish)
                </button>
              </div>
            </form>
          )}

          {/* Classifieds Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {classifieds.map((ad) => (
              <div key={ad.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-semibold text-orange-400 truncate max-w-[140px]">{ad.merchantName}</span>
                    <span className="font-mono text-slate-500">{ad.postedAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">{ad.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{ad.bodyText}</p>
                </div>

                <div className="border-t border-slate-800/80 pt-2 text-[10px]">
                  <div className="font-mono font-bold text-amber-300 mb-1">{ad.price}</div>
                  <div className="flex items-center gap-1 text-emerald-400 font-mono">
                    <Phone className="w-3 h-3" />
                    <span>{ad.contactPhone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Users,
  GitFork,
  Image as ImageIcon,
  HeartPulse,
  Plus,
  Lock,
  Share2,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: number;
  birthYear: number;
  origin: string;
  healthNotes?: string;
}

export const House2GenealogySpecial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tree' | 'album' | 'health'>('tree');

  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 'm1',
      name: 'Fitawrari Gebreyes Asfaye',
      relation: 'Great-Grandfather (ቅድመ-አያት)',
      generation: 1,
      birthYear: 1894,
      origin: 'Shewa / Ankober',
      healthNotes: 'Longevity (98 yrs), Natural Vision, Herb Specialist',
    },
    {
      id: 'm2',
      name: 'Woizero Aster Wolde',
      relation: 'Great-Grandmother (ቅድመ-አያት)',
      generation: 1,
      birthYear: 1902,
      origin: 'Wollo / Dessie',
      healthNotes: 'Longevity (92 yrs)',
    },
    {
      id: 'm3',
      name: 'Ato Asfaye Gebreyes',
      relation: 'Grandfather (አያት)',
      generation: 2,
      birthYear: 1932,
      origin: 'Addis Ababa',
      healthNotes: 'Type O+ Blood, Mild Hypertension at 80',
    },
    {
      id: 'm4',
      name: 'Woizero Almaz Tekle',
      relation: 'Grandmother (አያት)',
      generation: 2,
      birthYear: 1938,
      origin: 'Gondar',
      healthNotes: 'Rh-Positive, Excellent Cardiovascular History',
    },
    {
      id: 'm5',
      name: 'Zebene Asfaye (ዘበነ አስፋዬ)',
      relation: 'Founder & Architect (ተወላጅ)',
      generation: 3,
      birthYear: 1988,
      origin: 'Ethiopia / Global',
      healthNotes: 'Universal Blood Group, Optimal Biomarkers',
    },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const item: FamilyMember = {
      id: `m-${Date.now()}`,
      name: newMemberName,
      relation: newMemberRelation || 'Family Descendant',
      generation: 4,
      birthYear: 2026,
      origin: 'Global Vault',
    };
    setMembers([...members, item]);
    setNewMemberName('');
    setNewMemberRelation('');
    setShowAddForm(false);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#060D1A] to-[#040813] border border-blue-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Secure Lineage Network</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Sandboxed Vault</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              የስጋ ዘመድ የዘር ሀረግና የቤተሰብ ታሪክ ማህደር (Genealogy Network)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'tree' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            የዘር ሀረግ (Tree)
          </button>
          <button
            onClick={() => setActiveTab('album')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'album' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ፎቶ አልበም (Media)
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'health' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ጤናና ታሪክ (Health)
          </button>
        </div>
      </div>

      {/* Tab 1: Lineage Tree Node Graph */}
      {activeTab === 'tree' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>የተረጋገጡ ትውልዶች ({members.length} የተመዘገቡ አባላት)</span>
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ዘመድ መዝግብ (Add Kin)</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddMember} className="p-3 rounded-xl bg-slate-900 border border-blue-500/40 flex gap-2">
              <input
                type="text"
                placeholder="ሙሉ ስም (Full Name)"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
              />
              <input
                type="text"
                placeholder="ዝምድና (Relation, e.g. አጎት/አክስት)"
                value={newMemberRelation}
                onChange={(e) => setNewMemberRelation(e.target.value)}
                className="w-1/3 px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
              />
              <button type="submit" className="px-4 py-1.5 rounded bg-blue-600 text-white font-bold text-xs">
                መዝግብ
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {members.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-blue-400">{m.relation}</div>
                  <h4 className="text-xs font-bold text-white mt-0.5">{m.name}</h4>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-1">
                    <span>ትውልድ {m.generation}</span>
                    <span>•</span>
                    <span>እ.ኤ.አ {m.birthYear}</span>
                    <span>•</span>
                    <span>{m.origin}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 font-bold text-xs">
                  {m.generation}G
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Shared Encrypted Photo/Video Album */}
      {activeTab === 'album' && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>የተመሰጠረ የቤተሰብ ሚዲያ አልበም (Only 2-Witness Verified Family Access)</span>
            </span>
            <button className="px-3 py-1 rounded bg-blue-600/30 text-blue-300 text-xs font-semibold">
              + ፎቶ/ቪዲዮ ጫን
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: 'የቤተሰብ ጉባኤ 1974', location: 'Addis Ababa', tag: 'Archival' },
              { title: 'የዘበነ አስፋዬ የልጅነት ትዝታ', location: 'Ethiopia', tag: 'Historic' },
              { title: 'የቅድመ-አያቶች ጥንታዊ ቅርስ', location: 'Ankober', tag: 'Heritage' },
              { title: 'ዓለም አቀፍ የዲያስፖራ ትስስር 2026', location: 'Geneva', tag: 'Modern' },
            ].map((media, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
                <div className="h-24 rounded-lg bg-slate-950 flex items-center justify-center text-slate-600">
                  <ImageIcon className="w-8 h-8 text-blue-400/60" />
                </div>
                <div className="text-xs font-semibold text-white truncate">{media.title}</div>
                <div className="text-[10px] text-slate-400">{media.location} • {media.tag}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Hereditary Health & History Tracking */}
      {activeTab === 'health' && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>የዘር ሀረግ የጤና ታሪክና የጂኖም ባህሪያት (Hereditary Health Ledger)</span>
          </div>

          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{m.name}</span>
                  <span className="text-slate-400 ml-2">({m.relation})</span>
                  <p className="text-[11px] text-emerald-300 mt-0.5">
                    የጤና መዛግብት: {m.healthNotes || 'ምንም የታወቀ የዘር በሽታ አልተገኘም'}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  ISO-HEREDITARY-SECURE
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

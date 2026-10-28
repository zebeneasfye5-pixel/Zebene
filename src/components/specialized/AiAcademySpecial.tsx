import React, { useState } from 'react';
import {
  Cpu,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Code,
  HeartPulse,
  Compass,
  ArrowRight,
  Plus,
  GraduationCap,
  Users,
} from 'lucide-react';

interface CurriculumModule {
  id: string;
  subject: string;
  level: string;
  title: string;
  instructor: string;
  duration: string;
  objectives: string[];
  sampleQuizQuestion: string;
  sampleOptions: string[];
  correctOptionIndex: number;
}

export const AiAcademySpecial: React.FC = () => {
  // Role Partitioning: Teacher vs Student
  const [userRole, setUserRole] = useState<'Student' | 'Teacher'>('Student');
  const [teacherSubjects, setTeacherSubjects] = useState('Quantum Computing, Macroeconomics & Ethiopic Epigraphy');

  // Limitless Educational Categories Directory
  const [categories, setCategories] = useState<string[]>([
    'Technology & AI',
    'History & Epigraphy',
    'Community Healthcare',
    'Applied Mathematics',
    'Renewable Energy & Agri-Tech',
    'Sovereign Economics',
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Technology & AI');
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

  // New Course submission for Teachers
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseObjectives, setNewCourseObjectives] = useState('');
  const [coursePublishedMessage, setCoursePublishedMessage] = useState(false);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const modules: Record<string, CurriculumModule> = {
    'Technology & AI': {
      id: 'mod-tech',
      subject: 'Technology & Artificial Intelligence',
      level: 'Level 3 - Autonomous Systems',
      title: 'Neural Language Models & Ge\'ez Script Tokenization',
      instructor: 'Prof. Yonas Kebede (AI Architect)',
      duration: '45 mins',
      objectives: [
        'Ethiopic Unicode byte pair encoding (BPE)',
        'Low-latency WebRTC neural speech synthesis',
        'Decentralized data sandboxing in browser runtimes',
      ],
      sampleQuizQuestion: 'Which tokenization approach optimizes Amharic morphology for low compute footprint?',
      sampleOptions: ['Character-level n-gram', 'Morpheme-aware Subword BPE', 'ASCII mapping', 'Raw phoneme array'],
      correctOptionIndex: 1,
    },
    'History & Epigraphy': {
      id: 'mod-hist',
      subject: 'Ethiopian History & Ge\'ez Manuscripts',
      level: 'Heritage Masterclass',
      title: 'The Solomonic Diplomatic Treaties & Aksumite Coinage',
      instructor: 'Dr. Aster Wolde (Historian)',
      duration: '40 mins',
      objectives: [
        'Ezana\'s trilingual stone inscriptions (Ge\'ez, Sabaean, Greek)',
        '16th century diplomatic letters of Emperor Lebna Dengel',
        'Preservation of Lalibela rock-hewn architectural acoustics',
      ],
      sampleQuizQuestion: 'In which ancient century were the famous Aksumite gold and silver coins first minted?',
      sampleOptions: ['1st Century BCE', '3rd Century CE (King Endubis)', '8th Century CE', '14th Century CE'],
      correctOptionIndex: 1,
    },
    'Community Healthcare': {
      id: 'mod-health',
      subject: 'Community Healthcare & Nutrition',
      level: 'Rural & Urban Extension',
      title: 'Teff Iron Bioavailability & Preventative Maternal Nutrition',
      instructor: 'Dr. Selam Tadesse (Public Health)',
      duration: '30 mins',
      objectives: [
        'Fermentation kinetics of injera dough and mineral absorption',
        'Childhood immunization records on decentralized health cards',
        'Clean water sanitation at Kebele healthcare posts',
      ],
      sampleQuizQuestion: 'What biochemical advantage does traditional teff fermentation provide?',
      sampleOptions: ['Degrades phytates enhancing iron absorption', 'Adds synthetic preservatives', 'Removes carbohydrates', 'Reduces water content'],
      correctOptionIndex: 0,
    },
    'Applied Mathematics': {
      id: 'mod-math',
      subject: 'Applied Mathematics & Cryptography',
      level: 'Foundational Systems',
      title: 'Elliptic Curve Cryptography & Gadaa Generational Calculus',
      instructor: 'Ato Dawit Mengistu (Mathematician)',
      duration: '50 mins',
      objectives: [
        '8-year Gadaa generational cycles as modular arithmetic',
        'Public-key encryption for House sandboxing',
        'Zero-knowledge proof verification for civic identity',
      ],
      sampleQuizQuestion: 'How many years constitute one full Gadaa leadership cycle in Oromo participatory democracy?',
      sampleOptions: ['4 years', '6 years', '8 years', '10 years'],
      correctOptionIndex: 2,
    },
  };

  const currentModule = modules[selectedCategory] || modules['Technology & AI'];

  const handleSelectOption = (idx: number) => {
    setQuizAnswer(idx);
    setIsAnswered(true);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setCategories((prev) => [...prev, newCategoryName.trim()]);
    setSelectedCategory(newCategoryName.trim());
    setNewCategoryName('');
    setShowAddCategory(false);
  };

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    setCoursePublishedMessage(true);
    setTimeout(() => {
      setCoursePublishedMessage(false);
      setNewCourseTitle('');
      setNewCourseObjectives('');
    }, 3500);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-950/20 via-[#06121E] to-black border border-emerald-500/40 p-4 sm:p-5 text-white space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>የትምህርት ቤት አውቶማቲክ AI ስርዓተ-ትምህርት</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI HORIZONS 2026
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Role Partitioning (Teacher vs Student) • Limitless Educational Categories Directory & Instant Quizzes
            </p>
          </div>
        </div>

        {/* Role Partitioning Selector */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setUserRole('Teacher')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              userRole === 'Teacher' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>መምህር (Teacher)</span>
          </button>
          <button
            onClick={() => setUserRole('Student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              userRole === 'Student' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ተማሪ (Student)</span>
          </button>
        </div>
      </div>

      {/* Teacher Mode Panel: Teaching Subjects & Course Authoring */}
      {userRole === 'Teacher' && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>የመምህራን የማስተማሪያ ዘርፎችና ኮርስ ማመንጫ (Instructor Dashboard)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">CERTIFIED FACULTY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">የሚያስተምሯቸው ዋና ዋና የትምህርት ዘርፎች *</label>
              <input
                type="text"
                value={teacherSubjects}
                onChange={(e) => setTeacherSubjects(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 mb-1">አዲስ ኮርስ ወደ ስርዓተ-ትምህርቱ ጨምር</label>
              <form onSubmit={handlePublishCourse} className="flex gap-2">
                <input
                  type="text"
                  placeholder="የኮርሱ አርዕስት..."
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  አትም
                </button>
              </form>
            </div>
          </div>

          {coursePublishedMessage && (
            <div className="p-2 rounded bg-emerald-950 text-emerald-300 text-xs font-bold flex items-center gap-2 border border-emerald-500/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>አዲሱ ኮርስ በተሳካ ሁኔታ ወደ አለም አቀፍ ስርዓተ-ትምህርት ማውጫ ተጨምሯል!</span>
            </div>
          )}
        </div>
      )}

      {/* Limitless Educational Categories Directory */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>ገደብ የለሽ የትምህርት ማውጫ (Limitless Curriculum Directory)</span>
          </span>
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>አዲስ የትምህርት ዘርፍ (Add Category)</span>
          </button>
        </div>

        {showAddCategory && (
          <form onSubmit={handleAddCategory} className="flex gap-2 p-2 rounded-xl bg-slate-900 border border-emerald-500/40">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="አዲስ የትምህርት ዘርፍ ስም ያስገቡ (e.g. Molecular Biology, Robotics)..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              መዝግብ
            </button>
          </form>
        )}

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsAnswered(false);
                setQuizAnswer(null);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition text-[11px] font-medium ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Module Lesson & Instant AI Quiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Lesson Overview */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{currentModule.level}</span>
            <span>⏱️ {currentModule.duration}</span>
          </div>
          <h4 className="text-sm font-bold text-white leading-snug">{currentModule.title}</h4>
          <div className="text-[11px] text-amber-300 font-medium">አስተማሪ: {currentModule.instructor}</div>
          <div className="space-y-1 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="font-semibold text-slate-200">የክፍለ-ትምህርቱ ዋና ዋና ግቦች:</div>
            {currentModule.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Interactive Quiz */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>የቅጽበት AI ፈተና (Instant Real-time Quiz)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">PASS SCORE: 100%</span>
            </div>
            <p className="text-xs font-semibold text-white mb-3">
              {currentModule.sampleQuizQuestion}
            </p>

            <div className="space-y-2">
              {currentModule.sampleOptions.map((opt, idx) => {
                const isSelected = quizAnswer === idx;
                const isCorrect = idx === currentModule.correctOptionIndex;
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {isAnswered && (
            <div className="pt-2 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>የክህሎት ሰርተፊኬት ወደ መገለጫዎ ተጨምሯል (Verified Digital Credential)!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

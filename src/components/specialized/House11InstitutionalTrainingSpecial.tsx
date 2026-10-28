import React, { useState } from 'react';
import {
  Building,
  Calendar,
  Award,
  Users,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  BarChart,
  UserCheck,
  GraduationCap,
  Download,
  Send,
} from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  tier: 'National' | 'Regional' | 'Wereda' | 'Kebele';
  instructor: string;
  schedule: string;
  attendanceCount: number;
  capacityScore: number;
  status: 'Scheduled' | 'Live Now' | 'Completed';
}

export const House11InstitutionalTrainingSpecial: React.FC = () => {
  // Clear sub-role partitioning
  const [subRole, setSubRole] = useState<'Trainer/Instructor' | 'Trainee/Participant'>('Trainee/Participant');
  const [selectedTier, setSelectedTier] = useState<'All' | 'National' | 'Regional' | 'Wereda' | 'Kebele'>('All');

  const [modules, setModules] = useState<TrainingModule[]>([
    {
      id: 'trn-1',
      title: 'የዲጂታል ሲቪል ሰርቪስ ስታንዳርድና የህዝብ አገልግሎት ቅልጥፍና',
      tier: 'National',
      instructor: 'Senior Civil Service Commissioner',
      schedule: 'ዛሬ 2:30 PM (Live Video Guild)',
      attendanceCount: 1420,
      capacityScore: 94,
      status: 'Live Now',
    },
    {
      id: 'trn-2',
      title: 'የክልል የግብርና እና የመስኖ መረጃ አሰባሰብ ስርዓት',
      tier: 'Regional',
      instructor: 'Regional Bureau Directorate',
      schedule: 'ነገ 9:00 AM',
      attendanceCount: 840,
      capacityScore: 89,
      status: 'Scheduled',
    },
    {
      id: 'trn-3',
      title: 'የቀበሌ የነዋሪዎች መዝገብና የፋይዳ ዲጂታል መታወቂያ አስተዳደር',
      tier: 'Kebele',
      instructor: 'Wereda Governance Lead',
      schedule: 'የተጠናቀቀ (Completed)',
      attendanceCount: 3100,
      capacityScore: 96,
      status: 'Completed',
    },
  ]);

  const [attendedId, setAttendedId] = useState<string | null>(null);

  // Trainer create session
  const [newTitle, setNewTitle] = useState('');
  const [newTier, setNewTier] = useState<'National' | 'Regional' | 'Wereda' | 'Kebele'>('National');
  const [newSchedule, setNewSchedule] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleMarkAttendance = (id: string) => {
    setAttendedId(id);
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, attendanceCount: m.attendanceCount + 1 } : m))
    );
    setTimeout(() => setAttendedId(null), 3500);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newMod: TrainingModule = {
      id: `trn-${Date.now()}`,
      title: newTitle,
      tier: newTier,
      instructor: 'You (Certified Trainer)',
      schedule: newSchedule || 'ዛሬ 4:00 PM',
      attendanceCount: 1,
      capacityScore: 95,
      status: 'Live Now',
    };
    setModules([newMod, ...modules]);
    setNewTitle('');
    setNewSchedule('');
    setShowScheduleForm(false);
  };

  const filteredModules =
    selectedTier === 'All' ? modules : modules.filter((m) => m.tier === selectedTier);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#130A1F] to-[#080410] border border-violet-500/30 p-4 sm:p-5 text-white shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Civil Service Guild & Capacity Matrix</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Trainer & Trainee Synchronized Workflows</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              ተቋማዊ ስልጠና አዳራሽ • Institutional Training Matrix
            </h3>
          </div>
        </div>

        {/* Clear Sub-Role Enrollment Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setSubRole('Trainer/Instructor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              subRole === 'Trainer/Instructor' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>አሰልጣኝ (Trainer)</span>
          </button>
          <button
            onClick={() => setSubRole('Trainee/Participant')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              subRole === 'Trainee/Participant' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>ሰልጣኝ (Trainee)</span>
          </button>
        </div>
      </div>

      {/* Trainer Dashboard Action */}
      {subRole === 'Trainer/Instructor' && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-violet-500/40 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-violet-300">
            <span>የአሰልጣኝ ዳሽቦርድ: አዲስ የተቋም ስልጠና መርሐ-ግብር ይፍጠሩ</span>
            <button
              onClick={() => setShowScheduleForm(!showScheduleForm)}
              className="px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs"
            >
              + አዲስ ስልጠና ጀምር
            </button>
          </div>

          {showScheduleForm && (
            <form onSubmit={handleCreateSession} className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                required
                placeholder="የስልጠናው ርዕስ..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
              />
              <select
                value={newTier}
                onChange={(e) => setNewTier(e.target.value as any)}
                className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
              >
                <option value="National">National (ብሄራዊ ፌደራል)</option>
                <option value="Regional">Regional (የክልል ቢሮ)</option>
                <option value="Wereda">Wereda (የወረዳ)</option>
                <option value="Kebele">Kebele (የቀበሌ)</option>
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ሰዓት (e.g. ዛሬ 3:00 PM)..."
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                />
                <button type="submit" className="px-3 py-1.5 rounded bg-violet-600 text-white font-bold text-xs">
                  መዝግብ
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tier Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
        {(['All', 'National', 'Regional', 'Wereda', 'Kebele'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTier(t)}
            className={`px-3 py-1.5 rounded-lg text-xs transition ${
              selectedTier === t ? 'bg-violet-600 text-white font-bold' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t} Tier
          </button>
        ))}
      </div>

      {/* Modules Grid with Synchronized Attendance Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredModules.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] mb-2">
                <span className="px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 font-mono border border-violet-500/30">
                  {item.tier} Tier
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.status === 'Live Now'
                      ? 'bg-rose-950/80 text-rose-400 border border-rose-500/40 animate-pulse'
                      : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug mb-1">
                {item.title}
              </h4>
              <div className="text-[10px] text-slate-400 mb-2">
                አሰልጣኝ: <span className="text-slate-200">{item.instructor}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.schedule}</span>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-2.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 font-mono">
                <span>የተገኙ ሰልጣኞች: {item.attendanceCount}</span>
                <span className="text-emerald-400">ብቃት: {item.capacityScore}%</span>
              </div>

              {attendedId === item.id ? (
                <div className="py-1.5 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-bold text-center border border-emerald-500/40 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>መገኘትዎ በዲጂታል ፊርማ ተመዝግቧል (Present)</span>
                </div>
              ) : (
                <button
                  onClick={() => handleMarkAttendance(item.id)}
                  className="w-full py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    {subRole === 'Trainer/Instructor' ? 'ክትትል አድርግ (Monitor)' : 'መገኘትን አረጋግጥ (Log Attendance)'}
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

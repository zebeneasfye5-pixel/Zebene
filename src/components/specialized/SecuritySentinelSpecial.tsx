import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  Lock,
  VolumeX,
  UserX,
  CheckCircle2,
  Terminal,
  RefreshCw,
  BadgeCheck,
  Cpu,
  Eye,
  Radio,
} from 'lucide-react';

interface SecurityLogEntry {
  id: string;
  timestamp: string;
  houseId: number;
  userId: string;
  eventType: 'Disruptive Audio' | 'Unauthorized Packet' | 'Policy Violation' | 'IP Anomaly' | 'Spam Bot';
  threatLevel: 'Low' | 'Medium' | 'Critical';
  status: 'Resolved' | 'Under Review' | 'Muted';
  description: string;
}

export const SecuritySentinelSpecial: React.FC = () => {
  const [logs, setLogs] = useState<SecurityLogEntry[]>([
    {
      id: 'SEC-LOG-4419',
      timestamp: '2026-10-28 06:14:02',
      houseId: 1,
      userId: 'ANON-USR-992',
      eventType: 'Disruptive Audio',
      threatLevel: 'Medium',
      status: 'Muted',
      description: 'Acoustic mic threshold exceeded (+18dB burst). Auto-compressor engaged.',
    },
    {
      id: 'SEC-LOG-4420',
      timestamp: '2026-10-28 06:12:44',
      houseId: 9,
      userId: 'BOT-CRAWLER-12',
      eventType: 'Spam Bot',
      threatLevel: 'Low',
      status: 'Resolved',
      description: 'Repeated promotional checkout ping detected and sandboxed.',
    },
    {
      id: 'SEC-LOG-4421',
      timestamp: '2026-10-28 06:09:15',
      houseId: 14,
      userId: 'DISPUTE-PARTY-B',
      eventType: 'Policy Violation',
      threatLevel: 'Critical',
      status: 'Under Review',
      description: 'Unwarranted interruption during presiding judge decree reading.',
    },
  ]);

  const [behaviorTelemetry, setBehaviorTelemetry] = useState([
    { metric: 'Keystroke & Cursor Telemetry', value: 'Nominal (No Automated Scripts)', status: 'Safe' },
    { metric: 'Voice Sentiment Jitter', value: 'Calm / Standard Frequency', status: 'Safe' },
    { metric: 'Cross-Room Socket Snoop', value: 'Zero Unauthorized Packets', status: 'Optimal' },
    { metric: 'Law Enforcement Verification', value: 'FED-POL-INTEL-2026-880 Approved', status: 'Verified' },
  ]);

  const [isQuarantining, setIsQuarantining] = useState(false);

  // Background automated behavior monitoring logging
  useEffect(() => {
    const timer = setInterval(() => {
      const randomHouses = [1, 2, 4, 8, 9, 13, 14, 15];
      const hId = randomHouses[Math.floor(Math.random() * randomHouses.length)];
      const newLog: SecurityLogEntry = {
        id: `SEC-LOG-${Math.floor(5000 + Math.random() * 4000)}`,
        timestamp: new Date().toLocaleTimeString(),
        houseId: hId,
        userId: `NODE-${Math.floor(100 + Math.random() * 900)}`,
        eventType: 'Unauthorized Packet',
        threatLevel: 'Low',
        status: 'Resolved',
        description: 'Automated telemetry heartbeat scan passed with zero payload leakage.',
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleMuteAllDisruptive = () => {
    setIsQuarantining(true);
    setTimeout(() => {
      setLogs((prev) =>
        prev.map((l) => ({ ...l, status: 'Resolved' }))
      );
      setIsQuarantining(false);
    }, 500);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#071120] to-black border border-cyan-500/40 p-4 sm:p-5 text-white space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>የደህንነት አስጠባቂ ሚስጥራዊ መዝገብና የክትትል ቴሌሜትሪ</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SENTINEL INTEL
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Verified Law Enforcement Portal • Automated Audit Trail Telemetry & Real-Time Behavior Monitoring
            </p>
          </div>
        </div>

        <button
          onClick={handleMuteAllDisruptive}
          disabled={isQuarantining}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-600/30 border border-cyan-500/50 hover:bg-cyan-600/50 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <VolumeX className="w-3.5 h-3.5" />
          <span>{isQuarantining ? 'Quarantining...' : 'Mute Disruptive Audio'}</span>
        </button>
      </div>

      {/* Verified Law Enforcement Credentials Badge */}
      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <BadgeCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <div>
            <div className="font-bold text-white">Officer Clearance: FED-POL-INTEL-2026-880</div>
            <div className="text-[10px] text-slate-400">Agency: National Intelligence & Security Service (NISS)</div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/40">
          CLEARANCE VERIFIED ✓
        </span>
      </div>

      {/* Automated Behavioral Telemetry Scripts Monitor */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-cyan-300 font-mono">
          <span className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Automated Behavior Monitoring & Threat Analysis</span>
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>SCRIPTS RUNNING</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
          {behaviorTelemetry.map((item, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[9px] text-slate-400">{item.metric}</div>
              <div className="text-white font-bold mt-0.5 text-[11px] truncate">{item.value}</div>
              <div className="text-[9px] text-emerald-400 mt-1">Status: {item.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Ledger Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-[11px] font-mono text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="py-2 px-3">Log ID</th>
              <th className="py-2 px-3">House</th>
              <th className="py-2 px-3">User Target</th>
              <th className="py-2 px-3">Event Type</th>
              <th className="py-2 px-3">Threat</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40">
                <td className="py-2 px-3 text-cyan-300">{log.id}</td>
                <td className="py-2 px-3">House {log.houseId}</td>
                <td className="py-2 px-3 font-semibold text-white">{log.userId}</td>
                <td className="py-2 px-3 text-slate-300">{log.eventType}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      log.threatLevel === 'Critical'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        : log.threatLevel === 'Medium'
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {log.threatLevel}
                  </span>
                </td>
                <td className="py-2 px-3 text-emerald-400 font-semibold">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

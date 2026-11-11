import React from 'react';
import { 
  Server, 
  Activity, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileCheck, 
  ShieldAlert, 
  Search,
  Filter,
  Check,
  ChevronRight,
  Database,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { INITIAL_INTERVENTIONS } from '../mockData';
import { FacultyInterventionQueue } from '../types';

interface FacultyAdminDashboardProps {
  onBackToKiosk: () => void;
  language: 'en' | 'hi';
}

export const FacultyAdminDashboard: React.FC<FacultyAdminDashboardProps> = ({ 
  onBackToKiosk,
  language 
}) => {
  const [interventions, setInterventions] = React.useState<FacultyInterventionQueue[]>(INITIAL_INTERVENTIONS);
  const [filterRole, setFilterRole] = React.useState<'All' | 'High' | 'Medium'>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const resolveTicket = (id: string) => {
    setInterventions(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Resolved' };
      }
      return item;
    }));
  };

  const filtered = interventions.filter(i => {
    if (filterRole !== 'All' && i.priority !== filterRole) return false;
    if (searchQuery && !i.studentName.toLowerCase().includes(searchQuery.toLowerCase()) && !i.rollNo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-4 px-3">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white">Faculty & Campus Admin Portal</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-semibold">
                Authorized Role: Faculty Mentor & Dept Head
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live fleet telemetry, privacy-controlled intervention queues, and department aggregate analytics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToKiosk}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            ← Switch to Kiosk Display View
          </button>
        </div>
      </div>

      {/* Kiosk Hardware & Fleet Telemetry Cards (Section 12 & 13) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Kiosk Hardware Health</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-xl font-bold text-white">4 / 4 Units Online</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">99.8% Uptime (Library & Cafeteria)</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Daily Mentoring Sessions</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white">142 Completed</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Avg session: 5.2 mins</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Roadmap Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">76.4%</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">+12% vs last semester baseline</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Pending Interventions</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400">{interventions.filter(i => i.status !== 'Resolved').length} Active</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Referred by students or rules</span>
        </div>
      </div>

      {/* Aggregate Subject Diagnostic Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
            <span>Dept Subject Bottlenecks</span>
            <span className="text-[10px] text-indigo-400 font-mono">CSE Dept S5</span>
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white font-medium">CS301: Data Structures</span>
                <span className="font-bold text-amber-400">42% Need Revision</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[42%]"></div>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Hotspots: Trees traversal, Graph DFS/BFS</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white font-medium">MA301: Discrete Math</span>
                <span className="font-bold text-amber-400">31% Need Revision</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[31%]"></div>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Hotspots: Recurrence relations</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white font-medium">CS302: Database Systems</span>
                <span className="font-bold text-emerald-400">14% Need Revision</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[14%]"></div>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Hotspots: B+ Tree Indexing</span>
            </div>
          </div>
        </div>

        {/* Intervention Queue (Section 6 Module I & Section 9) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Authorized Faculty Intervention Queue</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                  Privacy-Governed
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Action cases requiring human counsellor or faculty 1-on-1 attention.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterRole('All')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterRole === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterRole('High')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterRole === 'High' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setFilterRole('Medium')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterRole === 'Medium' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Medium
              </button>
            </div>
          </div>

          {/* Intervention tickets list */}
          <div className="space-y-3">
            {filtered.map(t => {
              const isResolved = t.status === 'Resolved';
              return (
                <div 
                  key={t.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
                    isResolved 
                      ? 'bg-slate-950/40 border-slate-800/50 opacity-60' 
                      : 'bg-slate-950 border-slate-800 shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{t.studentName}</span>
                      <span className="text-[11px] font-mono text-slate-400">({t.rollNo})</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        t.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {t.priority}
                      </span>
                      <span className="text-[10px] text-slate-500">• {t.timestamp}</span>
                    </div>

                    <div className="text-xs font-semibold text-indigo-400 mt-1">
                      Subject: {t.subject}
                    </div>

                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      {t.issue}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {isResolved ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                        <Check className="w-4 h-4" /> Resolved
                      </span>
                    ) : (
                      <button
                        onClick={() => resolveTicket(t.id)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Actioned</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

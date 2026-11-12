import React from 'react';
import { motion } from 'framer-motion';
import {
  Server, Activity, TrendingUp, AlertTriangle, Check,
  Users, BarChart2, Wifi, Cpu, Shield
} from 'lucide-react';
import { INITIAL_INTERVENTIONS } from '../mockData';
import { FacultyInterventionQueue } from '../types';

interface FacultyAdminDashboardProps {
  onBackToKiosk: () => void;
  language: 'en' | 'hi';
}

const StatCard = ({
  label, value, sub, icon: Icon, color = 'slate', trend
}: {
  label: string; value: string; sub?: string; icon: any; color?: string; trend?: string;
}) => {
  const colors: Record<string, string> = {
    slate: 'text-slate-400 bg-slate-800/60',
    indigo: 'text-indigo-400 bg-indigo-500/15',
    emerald: 'text-emerald-400 bg-emerald-500/15',
    amber: 'text-amber-400 bg-amber-500/15',
  };
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-400 font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-xl font-black text-white">{value}</div>
      {sub && <div className={`text-xs mt-0.5 ${trend === 'up' ? 'text-emerald-400' : 'text-slate-500'}`}>{sub}</div>}
    </div>
  );
};

export const FacultyAdminDashboard: React.FC<FacultyAdminDashboardProps> = ({
  onBackToKiosk,
  language,
}) => {
  const [tickets, setTickets] = React.useState<FacultyInterventionQueue[]>(INITIAL_INTERVENTIONS);
  const [filter, setFilter] = React.useState<'All' | 'High' | 'Medium'>('All');

  const resolve = (id: string) =>
    setTickets(prev => prev.map(t => (t.id === id ? { ...t, status: 'Resolved' } : t)));

  const filtered = tickets.filter(t => filter === 'All' || t.priority === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Faculty & Admin Portal</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-semibold">
                Sections 11–13
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Fleet telemetry, department analytics & intervention queues</p>
          </div>
        </div>
        <button
          onClick={onBackToKiosk}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer transition-all shadow-md shadow-indigo-600/25"
        >
          ← Switch to Kiosk View
        </button>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Kiosk Fleet Health" value="4 / 4 Online" sub="99.8% uptime · Library & Cafeteria" icon={Wifi} color="emerald" trend="up" />
        <StatCard label="Daily Mentor Sessions" value="142" sub="Avg 5.2 mins per session" icon={Activity} color="indigo" />
        <StatCard label="Roadmap Completion" value="76.4%" sub="+12% vs last semester" icon={TrendingUp} color="emerald" trend="up" />
        <StatCard label="Pending Interventions" value={`${tickets.filter(t => t.status !== 'Resolved').length} Active`} sub="Faculty action required" icon={AlertTriangle} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Department Bottlenecks */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 glass rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            Department Subject Bottlenecks
            <span className="ml-auto text-[10px] text-indigo-400 font-mono">CSE S5</span>
          </h3>

          <div className="space-y-5">
            {[
              { subject: 'CS301: Data Structures', pct: 42, hotspot: 'Trees traversal · Graph DFS/BFS', color: 'amber' },
              { subject: 'MA301: Discrete Math', pct: 31, hotspot: 'Recurrence relations', color: 'amber' },
              { subject: 'CS302: Database Systems', pct: 14, hotspot: 'B+ Tree Indexing', color: 'emerald' },
              { subject: 'CS303: Operating Systems', pct: 8, hotspot: 'CPU Scheduling', color: 'emerald' },
            ].map(({ subject, pct, hotspot, color }) => (
              <div key={subject}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-slate-200 truncate">{subject}</span>
                  <span className={`font-bold font-mono ${color === 'amber' ? 'text-amber-400' : 'text-emerald-400'}`}>{pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full ${color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500">Hotspot: {hotspot}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Intervention Queue */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 glass rounded-2xl p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Authorized Faculty Intervention Queue
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                  Privacy-Governed
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Cases requiring human counsellor or faculty 1-on-1 attention</p>
            </div>

            <div className="flex gap-1.5">
              {(['All', 'High', 'Medium'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    filter === f
                      ? f === 'High'
                        ? 'bg-rose-600 text-white'
                        : f === 'Medium'
                          ? 'bg-amber-600 text-white'
                          : 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filtered.map((t) => {
              const resolved = t.status === 'Resolved';
              return (
                <div
                  key={t.id}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-3 p-4 rounded-xl border transition-all ${
                    resolved
                      ? 'opacity-50 bg-slate-900/30 border-slate-800/40'
                      : 'bg-slate-900/70 border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white">{t.studentName}</span>
                      <span className="text-[11px] font-mono text-slate-400">({t.rollNo})</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        t.priority === 'High'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      }`}>
                        {t.priority}
                      </span>
                      <span className="text-[10px] text-slate-500">{t.timestamp}</span>
                    </div>
                    <div className="text-xs text-indigo-400 font-semibold">{t.subject}</div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">{t.issue}</p>
                  </div>

                  <div className="flex-shrink-0">
                    {resolved ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5" /> Resolved
                      </span>
                    ) : (
                      <button
                        onClick={() => resolve(t.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-700 hover:text-white text-slate-300 text-xs font-semibold cursor-pointer transition-all"
                      >
                        <Check className="w-3.5 h-3.5" /> Mark Actioned
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

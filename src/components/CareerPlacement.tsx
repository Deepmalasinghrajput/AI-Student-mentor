import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, AlertCircle, CheckCircle, ExternalLink,
  Code, FileCheck, Award, TrendingUp, ChevronRight
} from 'lucide-react';
import { StudentProfile } from '../types';

interface CareerPlacementProps {
  student: StudentProfile;
  language: 'en' | 'hi';
}

const ROLES = {
  sde: {
    id: 'sde',
    label: 'Software Development Engineer',
    shortLabel: 'SDE',
    readiness: 72,
    color: 'indigo',
    skills: [
      { name: 'Data Structures & Algorithms', current: 55, target: 80, advice: 'Complete Trees/Graphs plan + LeetCode Medium 50.' },
      { name: 'OOP & Design Patterns', current: 78, target: 75, advice: 'Solid C++ / Java fundamentals — benchmark met.' },
      { name: 'Databases & Query Optimization', current: 80, target: 75, advice: 'Ready for SQL tuning and ACID scenario questions.' },
      { name: 'Operating Systems & Concurrency', current: 82, target: 70, advice: 'High mid-term performance in process synchronization.' },
      { name: 'System Design Basics', current: 45, target: 65, advice: 'Focus on caching, rate-limiting and REST API design.' },
    ],
    projects: [
      { name: 'Distributed Key-Value Store with Raft Consensus', tag: 'High Impact' },
      { name: 'Real-time Collaborative Markdown Editor (WebSockets)', tag: 'Full-Stack' },
    ],
    mockSchedule: 'Week 3: DSA Mock Technical Screen',
  },
  aiml: {
    id: 'aiml',
    label: 'AI / Machine Learning Engineer',
    shortLabel: 'AI/ML',
    readiness: 61,
    color: 'violet',
    skills: [
      { name: 'Linear Algebra & Calculus', current: 74, target: 85, advice: 'Matrix decompositions and gradient descent proofs.' },
      { name: 'Python, NumPy & PyTorch', current: 80, target: 80, advice: 'Good scripting mastery demonstrated in lab.' },
      { name: 'Deep Learning Architectures', current: 50, target: 75, advice: 'Study transformer attention and CNN feature extraction.' },
      { name: 'Data Preprocessing & Metrics', current: 68, target: 80, advice: 'Practice F1-score, precision-recall under imbalanced data.' },
    ],
    projects: [
      { name: 'Multimodal RAG System on Campus Notes', tag: 'GenAI' },
      { name: 'Low-Latency Indian Speech Recognition Pipeline', tag: 'Audio AI' },
    ],
    mockSchedule: 'Week 4: ML Systems & Pipeline Screening',
  },
  data: {
    id: 'data',
    label: 'Data Engineer & Analytics',
    shortLabel: 'Data Eng',
    readiness: 79,
    color: 'cyan',
    skills: [
      { name: 'Advanced SQL & Window Functions', current: 85, target: 80, advice: 'Proficient in complex CTEs — benchmark exceeded.' },
      { name: 'Python / Pandas Pipelines', current: 78, target: 75, advice: 'Satisfactory data processing workflows.' },
      { name: 'Distributed Processing (Spark/Kafka)', current: 40, target: 70, advice: 'Needs hands-on Dockerized Kafka & PySpark lab.' },
    ],
    projects: [
      { name: 'Batch & Stream Pipeline for Smart Campus IoT', tag: 'Big Data' },
    ],
    mockSchedule: 'Week 2: SQL & Pipeline Architecture',
  },
};

type RoleId = keyof typeof ROLES;

const COLOR_MAP = {
  indigo: { bar: 'bg-indigo-500', met: 'bg-emerald-500', tab: 'bg-indigo-600', badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20' },
  violet: { bar: 'bg-violet-500', met: 'bg-emerald-500', tab: 'bg-violet-600', badge: 'bg-violet-500/15 text-violet-300 border-violet-500/20' },
  cyan: { bar: 'bg-cyan-500', met: 'bg-emerald-500', tab: 'bg-cyan-600', badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20' },
};

export const CareerPlacement: React.FC<CareerPlacementProps> = ({ student }) => {
  const [role, setRole] = React.useState<RoleId>('sde');
  const active = ROLES[role];
  const colors = COLOR_MAP[active.color as keyof typeof COLOR_MAP];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] text-indigo-400 font-semibold uppercase tracking-widest mb-1">
              Section 9 · Career & Placement Guidance
            </div>
            <h2 className="text-2xl font-bold text-white">Role-Based Competency Framework</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Connects your verified course mastery to role-specific requirements and placement readiness.
            </p>
          </div>

          {/* Ethical disclaimer */}
          <div className="max-w-xs p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/15 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <AlertCircle className="w-4 h-4" /> Responsible AI Policy
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Shows skill gaps and readiness indicators <strong className="text-slate-300">without promising hiring, selection, salary or placement</strong>.
            </p>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="flex gap-2 mt-5 pt-5 border-t border-slate-800/60 overflow-x-auto">
          {Object.values(ROLES).map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id as RoleId)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                role === r.id
                  ? `${colors.tab} text-white shadow-lg`
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
        {/* Skill Gaps (5 cols) */}
        <div className="lg:col-span-5 glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">{active.label}</h3>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  key={role}
                  initial={{ width: 0 }}
                  animate={{ width: `${active.readiness}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${colors.bar} rounded-full`}
                />
              </div>
              <span className={`text-sm font-black ${role === 'data' ? 'text-cyan-400' : role === 'aiml' ? 'text-violet-400' : 'text-indigo-400'}`}>
                {active.readiness}% Ready
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {active.skills.map((sk, i) => {
              const isMet = sk.current >= sk.target;
              const pct = Math.min(100, Math.round((sk.current / sk.target) * 100));
              return (
                <motion.div
                  key={sk.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/60"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-200">{sk.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      isMet
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : sk.target - sk.current > 20
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {sk.current}% / {sk.target}% {isMet ? '✓ Met' : `${sk.target - sk.current}% Gap`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                    <motion.div
                      key={`${role}-${sk.name}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                      className={`h-full rounded-full ${isMet ? 'bg-emerald-500' : sk.target - sk.current > 20 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 italic">{sk.advice}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Portfolio Projects */}
          <div className="glass rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Portfolio Projects
            </h4>
            <div className="space-y-2.5">
              {active.projects.map((p, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800/60">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-white leading-snug">{p.name}</span>
                    <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-md font-medium border ${colors.badge}`}>
                      {p.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume & Interview */}
          <div className="glass rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Interview Prep
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800/60">
                <span className="text-slate-400">ATS Resume Score</span>
                <span className="font-mono font-bold text-emerald-400">84/100</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800/60">
                <span className="text-slate-400">Aptitude Streak</span>
                <span className="font-mono font-bold text-indigo-400">12 Days</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 mb-0.5">Next Mock Slot</div>
                <div className="text-cyan-300 font-medium">{active.mockSchedule}</div>
              </div>
            </div>
            <button
              onClick={() => alert('Mock Coding Sandbox launching via Campus CodeLab…')}
              className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Code className="w-3.5 h-3.5" /> Launch Mock Coding Sandbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

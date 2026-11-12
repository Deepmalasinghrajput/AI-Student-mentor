import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, TrendingUp, CheckCircle, AlertCircle,
  UserPlus, Download, ArrowRight, Sparkles, ShieldCheck
} from 'lucide-react';
import { PersonalizedRoadmap, StudentProfile } from '../types';

interface ProgressReportProps {
  roadmap: PersonalizedRoadmap;
  student: StudentProfile;
  onRequestFacultyReferral: (note: string) => void;
  language: 'en' | 'hi';
}

const ScoreComparison = ({
  label, before, after, maxBefore, maxAfter, missing = false
}: {
  label: string; before: number; after?: number; maxBefore: number; maxAfter?: number; missing?: boolean;
}) => {
  const beforePct = Math.round((before / maxBefore) * 100);
  const afterPct = after !== undefined && maxAfter ? Math.round((after / maxAfter) * 100) : null;
  const delta = afterPct !== null ? afterPct - beforePct : null;

  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/60 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-200 truncate">{label}</span>
        {delta !== null && (
          <span className={`font-bold font-mono flex items-center gap-1 ${delta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            <TrendingUp className="w-3 h-3" />
            {delta > 0 ? '+' : ''}{delta}%
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
            <span>Before</span>
            {missing ? <span className="text-rose-400">Missing</span> : <span className={beforePct < 60 ? 'text-amber-400' : 'text-slate-300'}>{before}/{maxBefore}</span>}
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            {!missing && (
              <div
                className={`h-full rounded-full ${beforePct < 60 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                style={{ width: `${beforePct}%` }}
              />
            )}
          </div>
        </div>
        {afterPct !== null && (
          <>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>After</span>
                <span className="text-emerald-400">{after}/{maxAfter}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${afterPct}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const ProgressReport: React.FC<ProgressReportProps> = ({
  roadmap, student, onRequestFacultyReferral, language
}) => {
  const [referralSent, setReferralSent] = React.useState(false);
  const [note, setNote] = React.useState('I practiced BFS and DFS but would like faculty advice on directed graph cycle detection.');

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-indigo-400 font-semibold uppercase tracking-widest">
                Section 10 · Progress Monitoring
              </div>
              <h2 className="text-xl font-bold text-white">Improvement Outcome Report</h2>
            </div>
          </div>
          <button
            onClick={() => alert('Downloading verified PDF report…')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-200 text-xs font-semibold cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            Export PDF
          </button>
        </div>

        {/* Reference metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-800/60 text-xs">
          {[
            { label: 'Student', value: `${student.name} (${student.rollNo})` },
            { label: 'Plan Subject', value: roadmap.prioritySubject },
            { label: 'Plan Start Date', value: roadmap.createdDate },
            { label: 'Review Milestone', value: roadmap.reviewDate },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-slate-500 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
              <div className="font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Score Comparison (Verified) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Baseline */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Verified Baseline Scores</h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono border border-slate-700/60">
              Pre-Plan
            </span>
          </div>
          <ScoreComparison label="Quiz 2: Trees & BST" before={9} maxBefore={20} />
          <ScoreComparison label="Mid-Term Examination" before={52} maxBefore={100} />
          <ScoreComparison label="Graph BFS/DFS Lab" before={0} maxBefore={25} missing />
        </motion.div>

        {/* Post Review */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Review Milestone Scores
            </h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 font-mono border border-emerald-500/20">
              Post-14 Days
            </span>
          </div>
          <ScoreComparison label="Checkpoint Assessment: Trees & BST" before={9} maxBefore={20} after={17} maxAfter={20} />
          <ScoreComparison label="CodeLab BFS/DFS Autograder" before={0} maxBefore={25} after={23} maxAfter={25} />
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/60">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-200">Roadmap Task Completion</span>
              <span className="font-bold font-mono text-indigo-400">4 / 5 (80%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 italic">
              Distinguishes verified academic evidence from self-reported study hours.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Strengths & Gaps */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-5"
      >
        <h3 className="text-sm font-bold text-white mb-4">Strengths Acquired & Remaining Gaps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/15 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle className="w-4 h-4" /> Demonstrated Improvements
            </div>
            {[
              'Tree traversals (Inorder, Preorder, Postorder) — 100% test pass in automated grader.',
              'Graph adjacency matrix vs list memory tradeoffs clearly understood.',
              'Standard Queue-based BFS search implementation verified.',
            ].map((item, i) => (
              <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/15 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertCircle className="w-4 h-4" /> Still Requires Attention
            </div>
            {[
              'Directed graph cycle detection using DFS recursion stack tracking.',
              "Time complexity analysis of Dijkstra's shortest path algorithm.",
            ].map((item, i) => (
              <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5 flex-shrink-0">◉</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Faculty Referral Block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 mb-2">
          <UserPlus className="w-5 h-5" />
          Faculty Mentor Referral (Student-Controlled Sharing)
        </div>
        <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
          Your progress report is private by default. You may choose to share this diagnostic summary with your designated
          course mentor <strong className="text-white">Prof. S. R. Kulkarni</strong> for one-on-one lab guidance.
          AI recommendations support — not replace — human faculty decisions.
        </p>

        {!referralSent ? (
          <div className="space-y-3">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/60 resize-none"
              placeholder="Optional note for the faculty counsellor…"
            />
            <div className="flex justify-end">
              <button
                onClick={() => { setReferralSent(true); onRequestFacultyReferral(note); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer transition-all shadow-lg shadow-indigo-600/25"
              >
                Send Referral to Faculty Queue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <strong>Referral dispatched to Faculty Intervention Dashboard!</strong>
              <div className="text-[11px] text-emerald-400/80 mt-0.5">
                Ticket #INT-2026-902 created. Prof. Kulkarni notified for office-hour review.
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

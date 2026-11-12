import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Circle, Clock, BookOpen, QrCode,
  Smartphone, ArrowRight, Sparkles, Calendar, Target,
  X, ShieldAlert, TrendingUp, AlertCircle
} from 'lucide-react';
import { PersonalizedRoadmap, StudentProfile } from '../types';

interface PersonalizedRoadmapViewProps {
  roadmap: PersonalizedRoadmap;
  student: StudentProfile;
  onOpenMobileView: () => void;
  onOpenReview: () => void;
  language: 'en' | 'hi';
}

export const PersonalizedRoadmapView: React.FC<PersonalizedRoadmapViewProps> = ({
  roadmap,
  student,
  onOpenMobileView,
  onOpenReview,
  language,
}) => {
  const [tasks, setTasks] = React.useState(roadmap.plan);
  const [showQr, setShowQr] = React.useState(false);

  const completed = tasks.filter(t => t.isCompleted).length;
  const pct = Math.round((completed / tasks.length) * 100);

  const toggle = (id: string) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-5">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-2">
                <Sparkles className="w-3 h-3" />
                Personalized Study Roadmap · Section 8
              </div>
              <h2 className="text-2xl font-bold text-white">{roadmap.prioritySubject}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                <strong className="text-slate-300">Evidence:</strong> {roadmap.evidence}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowQr(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-200 text-xs font-semibold cursor-pointer transition-all"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                QR to Phone
              </button>
              <button
                onClick={onOpenMobileView}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-200 text-xs font-semibold cursor-pointer transition-all"
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                Mobile View
              </button>
              <button
                onClick={onOpenReview}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-all shadow-md shadow-emerald-600/25"
              >
                Review Outcomes
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Duration', value: `${roadmap.durationDays} Days`, icon: Calendar },
              { label: 'Daily Effort', value: `~${roadmap.dailyEffortMinutes} Mins`, icon: Clock },
              { label: 'Review Date', value: roadmap.reviewDate, icon: Target, color: 'indigo' },
              { label: 'Progress', value: `${pct}% Done`, icon: TrendingUp, color: 'emerald' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 uppercase font-semibold mb-1">
                  <Icon className={`w-3.5 h-3.5 ${color === 'indigo' ? 'text-indigo-400' : color === 'emerald' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {label}
                </div>
                <div className={`text-sm font-bold ${color === 'indigo' ? 'text-indigo-400' : color === 'emerald' ? 'text-emerald-400' : 'text-white'}`}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full progress-shimmer rounded-full"
              />
            </div>
            <span className="text-xs font-bold text-slate-300 flex-shrink-0">{completed}/{tasks.length} Checkpoints</span>
          </div>
        </div>
      </motion.div>

      {/* Focus Topics */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest mr-1">Focus Topics:</span>
        {roadmap.focusTopics.map((t, i) => (
          <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-200">
            {t}
          </span>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          14-Day Learning Activities (Click to toggle completion)
        </h3>

        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            onClick={() => toggle(task.id)}
            className={`group relative flex gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
              task.isCompleted
                ? 'bg-slate-900/40 border-emerald-500/20 opacity-80'
                : 'bg-slate-900/70 border-slate-800/60 hover:border-slate-700'
            }`}
          >
            {/* Timeline connector */}
            {idx < tasks.length - 1 && (
              <div className="absolute left-8 top-full h-3 w-px bg-slate-800" />
            )}

            {/* Checkbox */}
            <div className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              task.isCompleted
                ? 'bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/30'
                : 'border-slate-700 group-hover:border-indigo-500/60'
            }`}>
              {task.isCompleted
                ? <CheckCircle2 className="w-4 h-4 text-white" />
                : <span className="text-xs font-bold text-slate-500">{idx + 1}</span>
              }
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400">
                  {task.dayRange}
                </span>
                <h4 className={`text-sm font-semibold ${task.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">{task.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1 text-slate-500">
                  <BookOpen className="w-3 h-3 text-indigo-400/70" />
                  {task.learningResource}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  {task.estimatedMinutes} mins/day
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 text-right min-w-[150px]">
              <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Evidence of Completion</div>
              <div className="text-xs font-medium text-cyan-400">{task.evidenceOfCompletion}</div>
              {task.scoreOrQuizOutcome && (
                <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1">{task.scoreOrQuizOutcome}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* QR Modal */}
      {showQr && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-700/40"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-base font-bold text-white">Transfer to Your Phone</h3>
              <button onClick={() => setShowQr(false)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-44 h-44 bg-white rounded-2xl mx-auto mb-4 p-4 shadow-xl flex items-center justify-center">
              <QrCode className="w-32 h-32 text-slate-900" strokeWidth={1.5} />
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-indigo-300 break-all mb-4">
              https://kiosk.campus.edu.in/rdm/{roadmap.id}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-amber-400/90 bg-amber-500/8 p-2.5 rounded-xl border border-amber-500/15 mb-4 text-left">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              Token expires after 14 days or on session logoff.
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setShowQr(false); onOpenMobileView(); }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
              >
                Open Mobile UI
              </button>
              <button
                onClick={() => setShowQr(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

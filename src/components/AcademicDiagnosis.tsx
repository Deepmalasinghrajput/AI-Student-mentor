import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, CheckCircle, TrendingDown, TrendingUp,
  BookOpen, Sparkles, ArrowRight, ShieldCheck, ChevronRight,
  BarChart2, Calendar, Clock, Target, Zap
} from 'lucide-react';
import { StudentProfile, SubjectPerformance } from '../types';

interface AcademicDiagnosisProps {
  student: StudentProfile;
  onProceedToMentor: (prioritySubject: SubjectPerformance) => void;
  language: 'en' | 'hi';
}

const STATUS_CONFIG = {
  'Critical Attention': { color: 'rose', label: 'Critical' },
  'Needs Practice': { color: 'amber', label: 'Needs Focus' },
  'Good': { color: 'sky', label: 'Good' },
  'Excellent': { color: 'emerald', label: 'Excellent' },
};

const StatusBadge = ({ status }: { status: SubjectPerformance['status'] }) => {
  const cfg = STATUS_CONFIG[status];
  const colors = {
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };
  return (
    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${colors[cfg.color as keyof typeof colors]}`}>
      {cfg.label}
    </span>
  );
};

const ScoreBar = ({ value, max = 100, color = 'indigo' }: { value: number; max?: number; color?: string }) => {
  const pct = Math.round((value / max) * 100);
  const barColors: Record<string, string> = {
    indigo: 'from-indigo-500 to-cyan-400',
    amber: 'from-amber-500 to-orange-400',
    rose: 'from-rose-500 to-pink-400',
    emerald: 'from-emerald-500 to-teal-400',
  };
  const cls = pct >= 70 ? 'emerald' : pct >= 50 ? 'amber' : 'rose';
  return (
    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full bg-gradient-to-r ${barColors[cls]} rounded-full`}
      />
    </div>
  );
};

export const AcademicDiagnosis: React.FC<AcademicDiagnosisProps> = ({
  student,
  onProceedToMentor,
  language
}) => {
  const [selectedSubject, setSelectedSubject] = React.useState<SubjectPerformance>(
    student.subjects.find(s => s.status === 'Needs Practice' || s.status === 'Critical Attention') || student.subjects[0]
  );

  const prioritySubject = student.subjects.find(s => s.status === 'Needs Practice' || s.status === 'Critical Attention');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Student Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#030712] flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-slate-900" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{student.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-medium">
                {student.rollNo}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {student.programme} · {student.branch} · Semester {student.semester}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">{student.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-white">{student.cgpa.toFixed(2)}</div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold mt-0.5">CGPA</div>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-center">
            <div className="text-2xl font-black text-indigo-400">{student.subjects.length}</div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold mt-0.5">Courses</div>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-center">
            <div className="text-2xl font-black text-amber-400">
              {student.subjects.filter(s => s.status === 'Needs Practice' || s.status === 'Critical Attention').length}
            </div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold mt-0.5">Need Focus</div>
          </div>
        </div>
      </motion.div>

      {/* AI Alert Banner */}
      {prioritySubject && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-indigo-950/30"
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative p-5 flex flex-wrap items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-amber-100 mb-0.5">
                Academic Intelligence Alert · Learning Gap Detected
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Analytics detected a <strong className="text-white">22% scoring variance</strong> in{' '}
                <strong className="text-amber-300 underline decoration-amber-500/40">{prioritySubject.name}</strong>.
                Recent Trees & Graphs assessments show a significant drop from your historical average.
                An AI mentor consultation and personalized remediation plan is recommended.
              </p>
            </div>
            <button
              onClick={() => onProceedToMentor(prioritySubject)}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start AI Mentor Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Subject Cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject Performance</h4>
            <span className="text-[10px] text-slate-600">Tap to inspect</span>
          </div>

          {student.subjects.map((sub, i) => {
            const isSelected = selectedSubject.code === sub.code;
            const isWeak = sub.status === 'Needs Practice' || sub.status === 'Critical Attention';

            return (
              <motion.div
                key={sub.code}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedSubject(sub)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer card-hover ${
                  isSelected
                    ? 'bg-slate-800/80 border-indigo-500/40 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/60 border-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-indigo-400">{sub.code}</span>
                    <h5 className="text-sm font-semibold text-white mt-0.5 leading-snug">{sub.name}</h5>
                  </div>
                  <StatusBadge status={sub.status} />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <div className="text-[10px] text-slate-500 mb-1">Internal Avg</div>
                    <div className={`text-sm font-bold ${isWeak ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {sub.internalAverage}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 mb-1">Attendance</div>
                    <div className={`text-sm font-bold ${sub.attendancePct < 75 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {sub.attendancePct}%
                    </div>
                  </div>
                </div>

                <ScoreBar value={sub.internalAverage} />

                {isSelected && (
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-indigo-400 font-medium">
                    <ChevronRight className="w-3 h-3" />
                    <span>Details visible on right →</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right: Deep Diagnostic Panel */}
        <motion.div
          key={selectedSubject.code}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 glass rounded-2xl p-6 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-800/60">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400">{selectedSubject.code}</span>
              <h3 className="text-xl font-bold text-white mt-0.5">{selectedSubject.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Attendance</div>
              <div className={`text-lg font-bold ${selectedSubject.attendancePct < 75 ? 'text-rose-400' : 'text-white'}`}>
                {selectedSubject.attendancePct}%
                {selectedSubject.attendancePct < 75 && <span className="text-[11px] ml-1 text-rose-400/70">(Below 75%)</span>}
              </div>
            </div>
          </div>

          {/* AI Reasoning Block */}
          <div className="bg-indigo-500/8 border border-indigo-500/20 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Diagnostic Reasoning (Explainable)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedSubject.learningGapReason || 'Academic performance is consistent across all assessments. No significant learning gaps detected in this subject.'}
            </p>
          </div>

          {/* Focus Topics */}
          {selectedSubject.focusTopics.length > 0 && (
            <div className="mb-5">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Prioritized Focus Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSubject.focusTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-200 font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Assessment Records */}
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Assessment Records (SIS Verified)</span>
            </div>
            <div className="space-y-2">
              {selectedSubject.assessments.map((a) => {
                const pct = Math.round((a.score / a.maxScore) * 100);
                const isLow = pct < 60;
                return (
                  <div
                    key={a.id}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/60 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-200 truncate">{a.name}</div>
                      <div className="text-slate-500 mt-0.5">{a.type} · {a.date}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-slate-500">{a.score}/{a.maxScore}</span>
                          <span className={isLow ? 'text-amber-400' : 'text-emerald-400'}>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              AI mentor will use this diagnostic to personalize a study plan.
            </p>
            <button
              onClick={() => onProceedToMentor(selectedSubject)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 cursor-pointer transition-all flex-shrink-0"
            >
              <span>Consult AI on {selectedSubject.code}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

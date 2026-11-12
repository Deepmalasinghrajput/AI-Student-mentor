import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Clock, BookOpen } from 'lucide-react';
import { PersonalizedRoadmap, StudentProfile } from '../types';

interface MobileCompanionViewProps {
  roadmap: PersonalizedRoadmap;
  student: StudentProfile;
  onBack: () => void;
}

export const MobileCompanionView: React.FC<MobileCompanionViewProps> = ({
  roadmap, student, onBack
}) => {
  const [tasks, setTasks] = React.useState(roadmap.plan);
  const toggle = (id: string) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));

  const done = tasks.filter(t => t.isCompleted).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <div className="max-w-sm mx-auto py-6 px-4">
      <p className="text-xs text-slate-500 text-center mb-4 italic">
        Simulating student mobile companion view — Section 11
      </p>

      {/* Phone frame */}
      <div className="relative bg-slate-900 border-4 border-slate-700 rounded-[48px] shadow-2xl overflow-hidden p-1">
        {/* Notch */}
        <div className="flex justify-center py-3">
          <div className="w-24 h-5 bg-slate-950 rounded-full" />
        </div>

        <div className="bg-[#030712] min-h-[640px] rounded-[36px] overflow-hidden overflow-y-auto px-4 py-4">
          {/* App header */}
          <div className="flex items-center gap-2 mb-4">
            <button onClick={onBack} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <div>
              <div className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">Student Companion</div>
              <div className="text-xs font-bold text-white">Study Roadmap</div>
            </div>
          </div>

          {/* Profile mini */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40 mb-4">
            <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <div className="text-xs font-bold text-white">{student.name}</div>
              <div className="text-[10px] text-slate-400">{student.rollNo}</div>
            </div>
          </div>

          {/* Roadmap card */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 p-3.5 rounded-xl border border-indigo-500/20 mb-4">
            <div className="text-[10px] text-indigo-300 font-semibold uppercase mb-0.5">Focus Subject</div>
            <div className="text-sm font-bold text-white leading-tight mb-2">{roadmap.prioritySubject}</div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
              <span>Progress: {pct}%</span>
              <span>{done}/{tasks.length} done</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>~{roadmap.dailyEffortMinutes} mins/day</span>
              <span>Review: {roadmap.reviewDate}</span>
            </div>
          </div>

          {/* Tasks */}
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Daily Modules</div>
          <div className="space-y-2">
            {tasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                  t.isCompleted
                    ? 'border-emerald-500/20 bg-slate-900/40 opacity-70'
                    : 'border-slate-800 bg-slate-900/70'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 flex-shrink-0 ${t.isCompleted ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {t.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className={`font-semibold ${t.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                      {t.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{t.dayRange} · ~{t.estimatedMinutes} mins</div>
                    <div className="text-[10px] text-cyan-400 mt-1">{t.evidenceOfCompletion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-600">
            Synced · Campus Kiosk Token expires 25 Nov 2026
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center py-3">
          <div className="w-24 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};

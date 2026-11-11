import React from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  QrCode, 
  Share2, 
  Download, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Smartphone,
  ChevronRight,
  UserCheck
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
  language
}) => {
  const [showQrModal, setShowQrModal] = React.useState(false);
  const [tasks, setTasks] = React.useState(roadmap.plan);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    }));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-6xl mx-auto py-2 px-2">
      {/* Top Banner / Roadmap Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 8: Verified Improvement Roadmap</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {roadmap.prioritySubject}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              <strong>Grounding Evidence:</strong> {roadmap.evidence}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQrModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>QR Code to Phone</span>
            </button>

            <button
              onClick={onOpenMobileView}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulate Mobile View</span>
            </button>

            <button
              onClick={onOpenReview}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/25"
            >
              <span>Review Date (Day 14)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Roadmap Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Duration</span>
            <span className="text-lg font-bold text-white">{roadmap.durationDays} Days Plan</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Daily Target Effort</span>
            <span className="text-lg font-bold text-white">{roadmap.dailyEffortMinutes} Mins / Day</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Scheduled Review Date</span>
            <span className="text-lg font-bold text-indigo-400">{roadmap.reviewDate}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Execution Progress</span>
            <span className="text-lg font-bold text-emerald-400">{progressPct}% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden mt-4 border border-slate-800">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* 14-Day Timeline Schedule (Section 8 Table) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Curriculum Activities & Completion Evidence (Click to toggle completion)
          </h3>
          <span className="text-xs text-slate-500">
            {completedCount} of {tasks.length} Checkpoints Cleared
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task, idx) => {
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  task.isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/30'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    task.isCompleted ? 'text-emerald-400' : 'text-slate-600'
                  }`}>
                    {task.isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                        {task.dayRange}
                      </span>
                      <h4 className={`text-base font-bold ${task.isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                        {task.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-slate-400">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{task.learningResource}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>~{task.estimatedMinutes} mins/day</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto text-left md:text-right shrink-0 bg-slate-950/60 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">Evidence of Completion</span>
                  <span className="text-xs font-medium text-cyan-300 block mt-0.5">{task.evidenceOfCompletion}</span>
                  {task.scoreOrQuizOutcome && (
                    <span className="text-[11px] font-mono text-emerald-400 font-bold block mt-1">
                      {task.scoreOrQuizOutcome}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Modal Popup */}
      {showQrModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-1">Transfer Roadmap to Phone</h3>
            <p className="text-xs text-slate-400 mb-6">
              Scan with your smartphone camera to access this roadmap anytime on campus Wi-Fi.
            </p>

            <div className="w-48 h-48 bg-white p-4 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <QrCode className="w-36 h-36 text-slate-950" />
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-indigo-300 break-all mb-4">
              https://kiosk.campus.edu.in/rdm/{roadmap.id}?token=exp20261125
            </div>

            <div className="flex items-center gap-2 text-[10px] text-amber-400/90 mb-5 text-left bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Token expires in 14 days or automatically after session logoff.</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowQrModal(false);
                  onOpenMobileView();
                }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Open Mobile UI Now
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

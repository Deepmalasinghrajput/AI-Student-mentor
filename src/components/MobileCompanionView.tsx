import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Calendar,
  Share2,
  Sparkles,
  Award
} from 'lucide-react';
import { PersonalizedRoadmap, StudentProfile } from '../types';

interface MobileCompanionViewProps {
  roadmap: PersonalizedRoadmap;
  student: StudentProfile;
  onBack: () => void;
}

export const MobileCompanionView: React.FC<MobileCompanionViewProps> = ({
  roadmap,
  student,
  onBack
}) => {
  const [tasks, setTasks] = React.useState(roadmap.plan);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-md mx-auto py-4 px-2">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-[40px] shadow-2xl p-4 overflow-hidden relative">
        {/* Top Speaker Notch simulation */}
        <div className="w-28 h-4 bg-slate-950 rounded-b-xl mx-auto mb-3 flex items-center justify-center">
          <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* Mobile Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Student Companion</span>
            <span className="text-xs font-bold text-white">Study Roadmap #{roadmap.id.slice(-4)}</span>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Student Mini Card */}
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 my-3 flex items-center gap-3">
          <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <h4 className="text-xs font-bold text-white">{student.name}</h4>
            <p className="text-[10px] text-slate-400">{student.programme} • Sem {student.semester}</p>
          </div>
        </div>

        {/* Roadmap Goal Card */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-950 p-4 rounded-2xl border border-indigo-500/30 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] text-indigo-300 font-semibold uppercase">Subject Focus</span>
              <h3 className="text-sm font-extrabold text-white">{roadmap.prioritySubject}</h3>
            </div>
            <span className="text-xs font-black text-emerald-400">{progressPct}%</span>
          </div>

          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progressPct}%` }}></div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Daily: ~{roadmap.dailyEffortMinutes} mins</span>
            <span>Review Date: {roadmap.reviewDate}</span>
          </div>
        </div>

        {/* Daily Tasks in Phone View */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Modules</span>
            <span className="text-[10px] text-slate-500">{completedCount}/{tasks.length} Done</span>
          </div>

          {tasks.map(t => (
            <div
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                t.isCompleted 
                  ? 'bg-slate-950/40 border-emerald-500/30 text-slate-400' 
                  : 'bg-slate-950 border-slate-800 text-white'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 ${t.isCompleted ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {t.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">
                      {t.dayRange}
                    </span>
                    <span className={`font-semibold ${t.isCompleted ? 'line-through text-slate-500' : ''}`}>
                      {t.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {t.description}
                  </p>
                  <div className="mt-2 text-[10px] text-cyan-300 font-medium">
                    Evidence: {t.evidenceOfCompletion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sync Status footer */}
        <div className="text-center pt-2 border-t border-slate-800">
          <span className="text-[10px] text-slate-500">
            Synced with Campus Kiosk Token #20261125
          </span>
        </div>
      </div>
    </div>
  );
};

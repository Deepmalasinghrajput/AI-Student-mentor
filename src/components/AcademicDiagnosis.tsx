import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown, 
  TrendingUp, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  User,
  GraduationCap
} from 'lucide-react';
import { StudentProfile, SubjectPerformance } from '../types';

interface AcademicDiagnosisProps {
  student: StudentProfile;
  onProceedToMentor: (prioritySubject: SubjectPerformance) => void;
  language: 'en' | 'hi';
}

export const AcademicDiagnosis: React.FC<AcademicDiagnosisProps> = ({ 
  student, 
  onProceedToMentor,
  language 
}) => {
  const [selectedSubject, setSelectedSubject] = React.useState<SubjectPerformance>(
    student.subjects.find(s => s.status === 'Needs Practice') || student.subjects[0]
  );

  return (
    <div className="max-w-6xl mx-auto py-4 px-2">
      {/* Student Profile Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img 
            src={student.avatar} 
            alt={student.name} 
            className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{student.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-medium">
                Roll: {student.rollNo}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {student.programme} • {student.branch} • Semester {student.semester}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Cumulative GPA</span>
            <span className="text-xl font-black text-white">{student.cgpa.toFixed(2)}</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Enrolled Courses</span>
            <span className="text-xl font-black text-indigo-400">{student.subjects.length} Subjects</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>SIS Verified</span>
          </div>
        </div>
      </div>

      {/* Diagnosis Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-5 mb-6 flex items-start gap-4 shadow-xl">
        <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-amber-200">
            {language === 'en' 
              ? 'Academic Intelligence Alert: Significant Learning Gap Detected'
              : 'शैक्षणिक विश्लेषण चेतावनी: सीखने में अंतराल पाया गया'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Analytics detected a <strong>22% scoring variance</strong> in <span className="text-white font-semibold underline decoration-amber-400">CS301: Data Structures & Algorithms</span>. 
            While foundational array concepts are stable, Trees and Graphs assessments show acute drop. An explainable remediation plan is recommended.
          </p>
        </div>
        <button
          onClick={() => onProceedToMentor(selectedSubject)}
          className="self-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <span>Start AI Dialogue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Left Subject Cards, Right Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subjects list (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
            <span>Subject-Wise Performance</span>
            <span className="text-[10px] text-slate-500">Tap to inspect</span>
          </h4>

          {student.subjects.map((sub) => {
            const isSelected = selectedSubject.code === sub.code;
            const isWarning = sub.status === 'Needs Practice' || sub.status === 'Critical Attention';

            return (
              <div
                key={sub.code}
                onClick={() => setSelectedSubject(sub)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-indigo-400">{sub.code}</span>
                    <h5 className="text-sm font-semibold text-white mt-0.5">{sub.name}</h5>
                  </div>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                    isWarning 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950/50 p-2 rounded-xl">
                    <span className="text-slate-500 block text-[10px]">Internal Avg</span>
                    <span className={`font-bold ${isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {sub.internalAverage}%
                    </span>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded-xl">
                    <span className="text-slate-500 block text-[10px]">Attendance</span>
                    <span className="font-bold text-slate-200">{sub.attendancePct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Explainable Indicator & Assessments (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold">{selectedSubject.code} Deep Diagnostic</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedSubject.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Class Attendance</span>
                <span className="text-base font-bold text-white">{selectedSubject.attendancePct}%</span>
              </div>
            </div>

            {/* Explainable AI Reasoning Box (As mandated by Section 4 & Section 7) */}
            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Explainable Academic Intelligence Diagnostic</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSubject.learningGapReason || 'Consistent academic performance recorded across quizzes and mid-semester exams.'}
              </p>
            </div>

            {/* Focus Topics tagged */}
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Target Topics for Mentoring Dialogue
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSubject.focusTopics.map((topic, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-indigo-200 font-medium"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Assessment History list */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Verified Assessment Records (SIS/LMS API)
              </span>
              <div className="space-y-2">
                {selectedSubject.assessments.map((a) => {
                  const pct = Math.round((a.score / a.maxScore) * 100);
                  const isLow = pct < 60;

                  return (
                    <div 
                      key={a.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-200">{a.name}</span>
                        <div className="text-[11px] text-slate-500 mt-0.5">{a.type} • {a.date}</div>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-bold ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {a.score} / {a.maxScore} ({pct}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Select this subject to initialize grounded dialogue with the AI Mentor.
            </span>
            <button
              onClick={() => onProceedToMentor(selectedSubject)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Consult AI Mentor on {selectedSubject.code}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

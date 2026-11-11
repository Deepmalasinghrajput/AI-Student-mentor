import React from 'react';
import { 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  UserPlus, 
  Download, 
  Share2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { PersonalizedRoadmap, StudentProfile } from '../types';

interface ProgressReportProps {
  roadmap: PersonalizedRoadmap;
  student: StudentProfile;
  onRequestFacultyReferral: (facultyNote: string) => void;
  language: 'en' | 'hi';
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  roadmap,
  student,
  onRequestFacultyReferral,
  language
}) => {
  const [facultyShared, setFacultyShared] = React.useState(false);
  const [referralSent, setReferralSent] = React.useState(false);
  const [note, setNote] = React.useState('I practiced BFS and DFS concepts, but would like faculty advice on graph cycle detection in directed graphs.');

  const handleReferral = () => {
    setReferralSent(true);
    onRequestFacultyReferral(note);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-2">
      {/* Report Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Official Campus Progress Evaluation • Section 10
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                Improvement Outcome & Diagnostic Comparison
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Downloading verified PDF progress report...")}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Student & Plan Reference Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-xs">
          <div>
            <span className="text-slate-500 block">Student Reference</span>
            <span className="font-bold text-white">{student.name} ({student.rollNo})</span>
          </div>
          <div>
            <span className="text-slate-500 block">Course Plan</span>
            <span className="font-bold text-white">{roadmap.prioritySubject}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Plan Baseline Date</span>
            <span className="font-bold text-white">{roadmap.createdDate}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Review Milestone</span>
            <span className="font-bold text-indigo-400">{roadmap.reviewDate} (Completed)</span>
          </div>
        </div>
      </div>

      {/* Comparison Grid: Baseline vs Review Outcomes (Section 10 Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Baseline Evidence (Verified) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Baseline Initial Scores (Verified)
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              Pre-Plan
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Quiz 2: Trees & BST</span>
                <span className="font-bold text-amber-400">9 / 20 (45%)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-amber-500 h-full w-[45%]"></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Mid-Term Subject Score</span>
                <span className="font-bold text-amber-400">52 / 100 (52%)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-amber-500 h-full w-[52%]"></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Graph BFS/DFS Lab Submission</span>
                <span className="font-bold text-rose-400">Missing / Incomplete (0/25)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Roadmap Review Evidence */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>2. Review Milestone Scores (Verified)</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 font-mono border border-emerald-500/30">
              Post-14 Days
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Post-Plan Checkpoint Assessment</span>
                <span className="font-bold text-emerald-400">17 / 20 (85%) <span className="text-[10px] text-emerald-500 font-normal">(+40%)</span></span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[85%]"></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Re-attempted CodeLab BFS/DFS Grader</span>
                <span className="font-bold text-emerald-400">23 / 25 (92%) <span className="text-[10px] text-emerald-500 font-normal">Cleared</span></span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[92%]"></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Roadmap Task Completion Rate</span>
                <span className="font-bold text-indigo-400">4 / 5 Checkpoints (80%)</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Distinguishes verified academic evidence from self-reported study time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Remaining Gaps Analysis */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 mb-6 shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Strengths Acquired & Remaining Gaps
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span>Demonstrated Improvements</span>
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• Traversal algorithms (Inorder, Preorder, Postorder) mastered with 100% test pass.</li>
              <li>• Graph adjacency representation memory tradeoffs clearly understood.</li>
              <li>• Standard Queue-based BFS search implementation verified in automated grader.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Areas Still Requiring Attention</span>
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• Directed graph cycle detection using recursion stack tracking needs more practice.</li>
              <li>• Time complexity analysis of Dijkstra’s shortest path algorithm.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Human Escalation / Faculty Referral Action (Section 5 & Section 9) */}
      <div className="bg-gradient-to-r from-indigo-950/50 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
          <UserPlus className="w-5 h-5" />
          <span>Faculty Mentor Referral & Student-Controlled Sharing (Section 10)</span>
        </div>
        <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
          The kiosk operates under student privacy control: your progress report is private by default. 
          You can choose to escalate complex topics to your designated course mentor <strong>Prof. S. R. Kulkarni</strong> for one-on-one lab guidance.
        </p>

        {!referralSent ? (
          <div className="space-y-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              placeholder="Add optional notes for the faculty counsellor..."
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={facultyShared} 
                  onChange={(e) => setFacultyShared(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0" 
                />
                <span>Authorize sharing this diagnostic summary with Faculty Intervention Queue</span>
              </label>

              <button
                onClick={handleReferral}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 cursor-pointer transition-all flex items-center gap-2"
              >
                <span>Request Faculty Mentor Referral</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong>Referral Dispatched to Faculty Intervention Dashboard!</strong>
              <div className="text-[11px] text-emerald-400/80 mt-0.5">
                Ticket #INT-2026-902 created. Faculty Mentor Prof. Kulkarni has been notified for office-hour review.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

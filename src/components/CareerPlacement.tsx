import React from 'react';
import { 
  Briefcase, 
  Target, 
  Code, 
  CheckCircle, 
  AlertCircle, 
  FileCheck, 
  TrendingUp, 
  BookOpen, 
  Sparkles,
  ExternalLink,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { StudentProfile } from '../types';

interface CareerPlacementProps {
  student: StudentProfile;
  language: 'en' | 'hi';
}

export const CareerPlacement: React.FC<CareerPlacementProps> = ({ student, language }) => {
  const [selectedRole, setSelectedRole] = React.useState<'sde' | 'aiml' | 'data'>('sde');

  const roleFrameworks = {
    sde: {
      title: 'Software Development Engineer (Backend / Systems)',
      readiness: 72,
      description: 'Role-based competency alignment against typical Tier-1 campus placement drives.',
      requirements: [
        { skill: 'Data Structures & Algorithms', current: 55, target: 80, gap: 'Medium', advice: 'Complete 14-day trees/graphs plan and LeetCode Top 50 Medium.' },
        { skill: 'Object Oriented Programming & Design Patterns', current: 78, target: 75, gap: 'Met', advice: 'Solid C++ / Java fundamentals.' },
        { skill: 'Databases & Query Optimization', current: 80, target: 75, gap: 'Met', advice: 'Ready for SQL index tuning and ACID scenario questions.' },
        { skill: 'Operating Systems & Concurrency', current: 82, target: 70, gap: 'Met', advice: 'High mid-term performance in process synchronization.' },
        { skill: 'System Design Basics', current: 45, target: 65, gap: 'High', advice: 'Focus on caching (Redis), rate-limiting and REST API contract design.' },
      ],
      recommendedProjects: [
        { name: 'Distributed Key-Value Store with Raft consensus', tag: 'High Impact', link: 'Campus Lab Project #3' },
        { name: 'Real-time collaborative markdown editor via WebSockets', tag: 'Full-stack', link: 'Self-guided Repo' },
      ],
      mockInterviewSchedule: 'Target Week 3: DSA Mock Technical Screen'
    },
    aiml: {
      title: 'AI / Machine Learning Engineer',
      readiness: 61,
      description: 'Competency alignment for foundational AI, PyTorch, and NLP engineering pathways.',
      requirements: [
        { skill: 'Linear Algebra & Calculus', current: 74, target: 85, gap: 'Medium', advice: 'Matrix decompositions and gradient descent optimization proofs.' },
        { skill: 'Python, NumPy & PyTorch', current: 80, target: 80, gap: 'Met', advice: 'Good scripting mastery demonstrated in lab.' },
        { skill: 'Deep Learning Architectures', current: 50, target: 75, gap: 'High', advice: 'Study transformer attention mechanisms and CNN feature extraction.' },
        { skill: 'Data Preprocessing & Evaluation Metrics', current: 68, target: 80, gap: 'Medium', advice: 'Practice F1-score, precision-recall curve analysis under imbalanced datasets.' },
      ],
      recommendedProjects: [
        { name: 'Multimodal Retrieval-Augmented Generation (RAG) on Campus Notes', tag: 'GenAI', link: 'Trialshopy AI Lab' },
        { name: 'Low-latency Indian speech recognition model pipeline', tag: 'Audio AI', link: 'University Research Grant' },
      ],
      mockInterviewSchedule: 'Target Week 4: ML Systems & Pipeline Screening'
    },
    data: {
      title: 'Data Engineer / Analytics Specialist',
      readiness: 79,
      description: 'Data warehouse architecture, ETL pipelines, and streaming ingestion.',
      requirements: [
        { skill: 'Advanced SQL & Analytical Windows', current: 85, target: 80, gap: 'Met', advice: 'Proficient in complex window functions and CTEs.' },
        { skill: 'Python / Pandas Data Pipelines', current: 78, target: 75, gap: 'Met', advice: 'Satisfactory data processing workflows.' },
        { skill: 'Distributed Processing (Spark / Kafka)', current: 40, target: 70, gap: 'High', advice: 'Needs hands-on lab with Dockerized Kafka & PySpark.' },
      ],
      recommendedProjects: [
        { name: 'Batch & Stream Processing Pipeline for Smart Campus IoT', tag: 'Big Data', link: 'IoT Center of Excellence' },
      ],
      mockInterviewSchedule: 'Target Week 2: SQL & Pipeline Architecture'
    }
  };

  const active = roleFrameworks[selectedRole];

  return (
    <div className="max-w-6xl mx-auto py-2 px-2">
      {/* Disclaimer Banner (Mandated in Section 6, 9 & 14) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Section 9: Role-Based Competency Framework</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Career & Placement Readiness Guidance</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Connects your verified course mastery to institutional placement rubrics.
            </p>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl max-w-sm text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Responsible AI Career Policy</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Shows diagnostic skill gaps and readiness indicators <strong>without promising hiring, selection, salary or placement</strong>.
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex gap-2 mt-6 pt-6 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => setSelectedRole('sde')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              selectedRole === 'sde'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Software Development Engineer (SDE)
          </button>

          <button
            onClick={() => setSelectedRole('aiml')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              selectedRole === 'aiml'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            AI / Machine Learning Engineer
          </button>

          <button
            onClick={() => setSelectedRole('data')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              selectedRole === 'data'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Data Engineer & Analytics
          </button>
        </div>
      </div>

      {/* Main Framework Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skill Gap Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Target Role</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{active.title}</h3>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Readiness Metric</span>
              <span className="text-xl font-black text-emerald-400">{active.readiness}%</span>
            </div>
          </div>

          <div className="space-y-4">
            {active.requirements.map((req, idx) => {
              const isMet = req.gap === 'Met';
              const isHigh = req.gap === 'High';

              return (
                <div key={idx} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-slate-200">{req.skill}</span>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      isMet ? 'bg-emerald-500/10 text-emerald-400' : isHigh ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {req.current}% / {req.target}% Target ({req.gap === 'Met' ? 'Benchmark Cleared' : `${req.gap} Priority Gap`})
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full ${isMet ? 'bg-emerald-500' : isHigh ? 'bg-rose-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(100, (req.current / req.target) * 100)}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Action: {req.advice}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recommended Projects & Mock Interview Schedules (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Projects */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Recommended Portfolio Projects</span>
            </h4>

            <div className="space-y-3">
              {active.recommendedProjects.map((p, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                      {p.tag}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between mt-2">
                    <span>Source: {p.link}</span>
                    <span className="text-indigo-400 hover:underline cursor-pointer flex items-center gap-0.5">
                      Spec <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume & Interview Prep Module */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Resume & Mock Interview Support</span>
            </h4>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Resume ATS Keyword Score:</span>
                <span className="font-mono font-bold text-emerald-400">84/100 (Optimized)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Aptitude Practice Streak:</span>
                <span className="font-mono font-bold text-indigo-400">12 Days</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300">
                Scheduled Slot: {active.mockInterviewSchedule}
              </div>
            </div>

            <button
              onClick={() => alert("Mock Technical Coding Screen simulator launched. Check campus CodeLab.")}
              className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Code className="w-4 h-4" />
              <span>Launch Mock Coding Sandbox</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

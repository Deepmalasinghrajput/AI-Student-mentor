import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, GraduationCap, MessageSquare, Map, BarChart2,
  Briefcase, LayoutDashboard, LogOut, Clock, Hand, ChevronRight,
  Sparkles, Shield
} from 'lucide-react';

import { WelcomeConsent } from './components/WelcomeConsent';
import { Authentication } from './components/Authentication';
import { AcademicDiagnosis } from './components/AcademicDiagnosis';
import { MentorConversation } from './components/MentorConversation';
import { PersonalizedRoadmapView } from './components/PersonalizedRoadmapView';
import { ProgressReport } from './components/ProgressReport';
import { CareerPlacement } from './components/CareerPlacement';
import { FacultyAdminDashboard } from './components/FacultyAdminDashboard';
import { MobileCompanionView } from './components/MobileCompanionView';
import { PalmistryEntertainment } from './components/PalmistryEntertainment';
import { SAMPLE_STUDENT, INITIAL_ROADMAP } from './mockData';
import { StudentProfile, SubjectPerformance, PersonalizedRoadmap } from './types';

type Step = 'welcome' | 'auth' | 'diagnosis' | 'dialogue' | 'roadmap' | 'progress' | 'career' | 'faculty' | 'mobile';

const NAV_ITEMS = [
  { id: 'diagnosis', label: 'Academic Diagnosis', icon: GraduationCap },
  { id: 'dialogue', label: 'AI Mentor', icon: MessageSquare },
  { id: 'roadmap', label: '14-Day Roadmap', icon: Map },
  { id: 'progress', label: 'Progress Report', icon: BarChart2 },
  { id: 'career', label: 'Career & Placement', icon: Briefcase },
  { id: 'faculty', label: 'Admin / Faculty', icon: LayoutDashboard },
];

import type { Variants } from 'framer-motion';

const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function App() {
  const [step, setStep] = React.useState<Step>('welcome');
  const [language, setLanguage] = React.useState<'en' | 'hi'>('en');
  const [student, setStudent] = React.useState<StudentProfile | null>(null);
  const [prioritySubject, setPrioritySubject] = React.useState<SubjectPerformance | null>(null);
  const [roadmap, setRoadmap] = React.useState<PersonalizedRoadmap>(INITIAL_ROADMAP);
  const [showPalmistry, setShowPalmistry] = React.useState(false);
  const [sessionTimer, setSessionTimer] = React.useState(180);

  // Session timeout
  React.useEffect(() => {
    if (!student || step === 'welcome' || step === 'auth') return;
    const id = setInterval(() => {
      setSessionTimer(t => {
        if (t <= 1) { handleLogout(); return 180; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [student, step]);

  const handleLogout = () => {
    setStudent(null);
    setPrioritySubject(null);
    setStep('welcome');
    setSessionTimer(180);
  };

  const handleAuthSuccess = (s: StudentProfile) => {
    setStudent(s);
    const gap = s.subjects.find(sub => sub.status === 'Needs Practice' || sub.status === 'Critical Attention');
    setPrioritySubject(gap || s.subjects[0]);
    setStep('diagnosis');
  };

  const isInSession = student && step !== 'welcome' && step !== 'auth';

  const navigateTo = (id: string) => {
    if (!student) {
      setStudent(SAMPLE_STUDENT);
      setPrioritySubject(SAMPLE_STUDENT.subjects[0]);
    }
    setStep(id as Step);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      {/* ═══ TOP HEADER (Kiosk Bezel) ══════════════════════════════════════════ */}
      {isInSession && (
        <header className="fixed top-0 left-0 right-0 z-30 h-14 glass border-b border-white/5 flex items-center px-6 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-sm">
              T
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-bold text-white tracking-wide">TRIALSHOPY</div>
              <div className="text-[10px] text-slate-500">AI Student Mentor Kiosk #LIB-04</div>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-800 mx-1 flex-shrink-0 hidden md:block" />

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto flex-1 min-w-0">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = step === id;
              return (
                <button
                  key={id}
                  onClick={() => navigateTo(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-indigo-400' : ''}`} />
                  <span className="hidden lg:inline">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: session utilities */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Student chip */}
            {student && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <img src={student.avatar} alt={student.name} className="w-5 h-5 rounded-md object-cover" />
                <span className="text-xs font-medium text-slate-200">{student.name}</span>
                <span className="text-[10px] text-slate-500">{student.rollNo}</span>
              </div>
            )}

            {/* Timer */}
            <div className={`hidden md:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border ${
              sessionTimer < 30
                ? 'bg-rose-950/60 border-rose-500/30 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <Clock className="w-3 h-3" />
              <span>{Math.floor(sessionTimer / 60)}:{String(sessionTimer % 60).padStart(2, '0')}</span>
            </div>

            {/* Palm demo */}
            <button
              onClick={() => setShowPalmistry(true)}
              className="p-1.5 rounded-lg bg-slate-900 border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-all"
              title="Optional entertainment demo (Section 15)"
            >
              <Hand className="w-3.5 h-3.5" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-semibold cursor-pointer transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">End Session</span>
            </button>
          </div>
        </header>
      )}

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════════════════ */}
      <main className={`flex-1 ${isInSession ? 'pt-14' : ''} overflow-y-auto`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-full"
          >
            {step === 'welcome' && (
              <WelcomeConsent
                language={language}
                onLanguageChange={setLanguage}
                onStartAuth={() => setStep('auth')}
              />
            )}

            {step === 'auth' && (
              <Authentication
                language={language}
                onSuccess={handleAuthSuccess}
                onBack={() => setStep('welcome')}
              />
            )}

            {step === 'diagnosis' && (
              <AcademicDiagnosis
                student={student || SAMPLE_STUDENT}
                language={language}
                onProceedToMentor={(subj) => {
                  setPrioritySubject(subj);
                  setStep('dialogue');
                }}
              />
            )}

            {step === 'dialogue' && (
              <MentorConversation
                student={student || SAMPLE_STUDENT}
                prioritySubject={prioritySubject || (student || SAMPLE_STUDENT).subjects[0]}
                language={language}
                onRoadmapGenerated={(r) => {
                  setRoadmap(r);
                  setStep('roadmap');
                }}
              />
            )}

            {step === 'roadmap' && (
              <PersonalizedRoadmapView
                roadmap={roadmap}
                student={student || SAMPLE_STUDENT}
                language={language}
                onOpenMobileView={() => setStep('mobile')}
                onOpenReview={() => setStep('progress')}
              />
            )}

            {step === 'progress' && (
              <ProgressReport
                roadmap={roadmap}
                student={student || SAMPLE_STUDENT}
                language={language}
                onRequestFacultyReferral={(note) => {
                  alert(`Faculty referral dispatched! Note: "${note}"`);
                }}
              />
            )}

            {step === 'career' && (
              <CareerPlacement
                student={student || SAMPLE_STUDENT}
                language={language}
              />
            )}

            {step === 'faculty' && (
              <FacultyAdminDashboard
                language={language}
                onBackToKiosk={() => setStep('welcome')}
              />
            )}

            {step === 'mobile' && (
              <MobileCompanionView
                roadmap={roadmap}
                student={student || SAMPLE_STUDENT}
                onBack={() => setStep('roadmap')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ═══ STATUS BAR (Kiosk Lower Bezel) ═══════════════════════════════════ */}
      {isInSession && (
        <footer className="h-8 glass border-t border-white/5 px-6 flex items-center justify-between text-[10px] text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SIS Connector: Active
            </span>
            <span>DPDP Compliant · No Face Recognition · Session Encrypted</span>
          </div>
          <span>Trialshopy Smart Campus · Assignment Deadline 13 Nov 2026</span>
        </footer>
      )}

      {/* Palm Demo */}
      <PalmistryEntertainment isOpen={showPalmistry} onClose={() => setShowPalmistry(false)} />
    </div>
  );
}

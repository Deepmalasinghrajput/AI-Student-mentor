import React from 'react';
import { 
  LogOut, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  FileText, 
  BookOpen, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  Bot, 
  Briefcase, 
  CheckCircle,
  Eye,
  Server,
  Hand
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

export function App() {
  // Navigation State
  const [currentStep, setCurrentStep] = React.useState<
    'welcome' | 'auth' | 'diagnosis' | 'dialogue' | 'roadmap' | 'progress' | 'career' | 'faculty' | 'mobile'
  >('welcome');

  const [language, setLanguage] = React.useState<'en' | 'hi'>('en');
  const [student, setStudent] = React.useState<StudentProfile | null>(null);
  const [prioritySubject, setPrioritySubject] = React.useState<SubjectPerformance | null>(null);
  const [roadmap, setRoadmap] = React.useState<PersonalizedRoadmap>(INITIAL_ROADMAP);
  
  // Section 15 Palmistry Entertainment toggle
  const [showPalmistry, setShowPalmistry] = React.useState(false);

  // Inactivity timeout simulation (Section 14 session safety)
  const [sessionTimer, setSessionTimer] = React.useState(180); // 3 mins session timeout

  React.useEffect(() => {
    if (!student || currentStep === 'welcome') return;
    const interval = setInterval(() => {
      setSessionTimer(prev => {
        if (prev <= 1) {
          handleLogout();
          return 180;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [student, currentStep]);

  const handleLogout = () => {
    setStudent(null);
    setPrioritySubject(null);
    setCurrentStep('welcome');
    setSessionTimer(180);
  };

  const handleAuthSuccess = (loggedStudent: StudentProfile) => {
    setStudent(loggedStudent);
    // Find priority subject
    const subjectWithGap = loggedStudent.subjects.find(s => s.status === 'Needs Practice') || loggedStudent.subjects[0];
    setPrioritySubject(subjectWithGap);
    setCurrentStep('diagnosis');
  };

  const handleSelectPriorityAndProceed = (subj: SubjectPerformance) => {
    setPrioritySubject(subj);
    setCurrentStep('dialogue');
  };

  const handleRoadmapReady = (generatedRoadmap: PersonalizedRoadmap) => {
    setRoadmap(generatedRoadmap);
    setCurrentStep('roadmap');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Kiosk Display Fixed Upper Bezel (Simulating 32-43" Commercial Kiosk Top Header) */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-lg shadow-md">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">TRIALSHOPY</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                AI Smart Student Mentor Kiosk
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">Library Common Display Unit #4</span>
          </div>
        </div>

        {/* Global Navigation Pills for Demo / Interactive exploration */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setCurrentStep('welcome')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'welcome' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Welcome
          </button>
          <button
            onClick={() => {
              if (!student) setStudent(SAMPLE_STUDENT);
              setCurrentStep('diagnosis');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'diagnosis' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Diagnosis
          </button>
          <button
            onClick={() => {
              if (!student) setStudent(SAMPLE_STUDENT);
              if (!prioritySubject) setPrioritySubject(SAMPLE_STUDENT.subjects[0]);
              setCurrentStep('dialogue');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'dialogue' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. AI Mentor
          </button>
          <button
            onClick={() => {
              if (!student) setStudent(SAMPLE_STUDENT);
              setCurrentStep('roadmap');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'roadmap' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. 14-Day Roadmap
          </button>
          <button
            onClick={() => {
              if (!student) setStudent(SAMPLE_STUDENT);
              setCurrentStep('progress');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'progress' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5. Progress Review
          </button>
          <button
            onClick={() => {
              if (!student) setStudent(SAMPLE_STUDENT);
              setCurrentStep('career');
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'career' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            6. Career & Placement
          </button>
          <button
            onClick={() => setCurrentStep('faculty')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              currentStep === 'faculty' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            7. Admin / Faculty
          </button>
        </div>

        {/* Right Session Utility Actions */}
        <div className="flex items-center gap-3">
          {/* Optional Palmistry Entertainment Button (Section 15) */}
          <button
            onClick={() => setShowPalmistry(true)}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 cursor-pointer"
            title="Optional Entertainment Demo (Section 15)"
          >
            <Hand className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Palm Demo</span>
          </button>

          {student && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Timeout in {sessionTimer}s</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-semibold cursor-pointer transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>End Session</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Dynamic Viewport */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {currentStep === 'welcome' && (
          <WelcomeConsent
            language={language}
            onLanguageChange={setLanguage}
            onStartAuth={() => setCurrentStep('auth')}
          />
        )}

        {currentStep === 'auth' && (
          <Authentication
            language={language}
            onSuccess={handleAuthSuccess}
            onBack={() => setCurrentStep('welcome')}
          />
        )}

        {currentStep === 'diagnosis' && (
          <AcademicDiagnosis
            student={student || SAMPLE_STUDENT}
            language={language}
            onProceedToMentor={handleSelectPriorityAndProceed}
          />
        )}

        {currentStep === 'dialogue' && (
          <MentorConversation
            student={student || SAMPLE_STUDENT}
            prioritySubject={prioritySubject || (student || SAMPLE_STUDENT).subjects[0]}
            language={language}
            onRoadmapGenerated={handleRoadmapReady}
          />
        )}

        {currentStep === 'roadmap' && (
          <PersonalizedRoadmapView
            roadmap={roadmap}
            student={student || SAMPLE_STUDENT}
            language={language}
            onOpenMobileView={() => setCurrentStep('mobile')}
            onOpenReview={() => setCurrentStep('progress')}
          />
        )}

        {currentStep === 'progress' && (
          <ProgressReport
            roadmap={roadmap}
            student={student || SAMPLE_STUDENT}
            language={language}
            onRequestFacultyReferral={(note) => {
              alert(`Faculty Referral Ticket Created! Note dispatched to Prof. Kulkarni: "${note}"`);
            }}
          />
        )}

        {currentStep === 'career' && (
          <CareerPlacement
            student={student || SAMPLE_STUDENT}
            language={language}
          />
        )}

        {currentStep === 'faculty' && (
          <FacultyAdminDashboard
            language={language}
            onBackToKiosk={() => setCurrentStep('welcome')}
          />
        )}

        {currentStep === 'mobile' && (
          <MobileCompanionView
            roadmap={roadmap}
            student={student || SAMPLE_STUDENT}
            onBack={() => setCurrentStep('roadmap')}
          />
        )}
      </main>

      {/* Optional Palmistry Demonstration Modal */}
      <PalmistryEntertainment
        isOpen={showPalmistry}
        onClose={() => setShowPalmistry(false)}
      />

      {/* Kiosk Display Lower Status Strip */}
      <footer className="bg-slate-950/90 border-t border-slate-900 px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Campus ERP/SIS Connector: Connected
          </span>
          <span>•</span>
          <span>DPDP Compliant (No Face / Emotion Recognition)</span>
        </div>

        <div>
          Assignment Submission: 13 November 2026 • Trialshopy Project Assignment
        </div>
      </footer>
    </div>
  );
}

export default App;

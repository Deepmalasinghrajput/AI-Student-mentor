import React from 'react';
import { 
  Eye, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Languages, 
  UserCheck, 
  ArrowRight,
  Info,
  QrCode,
  Volume2
} from 'lucide-react';

interface WelcomeConsentProps {
  onStartAuth: () => void;
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
}

export const WelcomeConsent: React.FC<WelcomeConsentProps> = ({ 
  onStartAuth, 
  language, 
  onLanguageChange 
}) => {
  const [agreed, setAgreed] = React.useState(false);
  const [simulatedPersonDetected, setSimulatedPersonDetected] = React.useState(true);

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between items-center text-center p-6 max-w-5xl mx-auto">
      {/* Top Status & Sensor Indicators */}
      <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Kiosk Hardware #LIB-04 • Library Central</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Proximity Sensor:</span>
            <span className="text-cyan-300 font-medium">{simulatedPersonDetected ? 'Student Present' : 'Idle / Standby'}</span>
          </div>
        </div>

        {/* Language selector & Camera Privacy indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Camera: Passive Presence Only (No Recording / Face ID Disabled)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <Languages className="w-4 h-4 ml-2 text-indigo-400" />
            <button 
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
            <button 
              onClick={() => onLanguageChange('hi')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'hi' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>
      </div>

      {/* Main Kiosk Welcome Hero */}
      <div className="py-8 my-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Trialshopy Smart Campus Initiative</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          AI Smart Student Mentor
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 mt-2">
            & Career Guidance Display
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          {language === 'en' 
            ? 'Touch to begin your personalized academic diagnostic, interactive voice mentoring, and tailored 14-day study roadmap.'
            : 'अपने व्यक्तिगत शैक्षणिक निदान, इंटरैक्टिव वॉयस मेंटरिंग और 14-दिवसीय अध्ययन रोडमैप के लिए स्पर्श करें।'}
        </p>

        {/* Privacy Notice & Responsible AI Principles Box */}
        <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-left shadow-2xl backdrop-blur-md mb-8">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-sm uppercase tracking-wider">Privacy Notice & Ethical Scope (DPDP Framework)</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Data Minimization:</strong> We only read approved academic grades, attendance, and enrolled course records for this session.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>No Face or Emotion Biometrics:</strong> Camera is strictly for presence detection. The system never infers mood, honesty, or mental state from facial cues.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Supportive Not Determinative:</strong> AI advice is designed to assist you; high-stakes evaluations or referrals are handled by verified human faculty counsellors.</span>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-200">
                I understand and consent to academic record analysis for this mentoring session.
              </span>
            </label>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartAuth}
          disabled={!agreed}
          className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all transform ${
            agreed 
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white cursor-pointer hover:scale-105 shadow-indigo-500/25' 
              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
          }`}
        >
          <span>{language === 'en' ? 'Touch Screen to Authenticate' : 'प्रमाणीकरण के लिए स्क्रीन स्पर्श करें'}</span>
          <ArrowRight className={`w-5 h-5 transition-transform ${agreed ? 'group-hover:translate-x-1' : ''}`} />
        </button>
      </div>

      {/* Footer Info */}
      <div className="w-full flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" /> 256-bit University TLS Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Directional Acoustic Audio Enabled
          </span>
        </div>
        <div>Trialshopy EdTech Campus Solution • Version 2.4.0</div>
      </div>
    </div>
  );
};

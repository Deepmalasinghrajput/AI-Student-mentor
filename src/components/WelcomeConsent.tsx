import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, Camera, CheckCircle2, ShieldCheck, Sparkles,
  Lock, Languages, ArrowRight, Volume2, Wifi, Zap,
  Shield, Info, ChevronRight, Circle
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
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#030712] overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/4 rounded-full blur-[160px]" />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/30">
              T
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#030712] status-live" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">TRIALSHOPY</div>
            <div className="text-[11px] text-slate-500 font-medium">Smart Campus Initiative</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sensor strip */}
          <div className="flex items-center gap-3 px-4 py-2 glass rounded-xl text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Proximity:</span>
              <span className="text-cyan-300 font-semibold">Student Detected</span>
            </div>
            <div className="w-px h-3.5 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Camera className="w-3.5 h-3.5" />
              <span className="text-emerald-300">No Recording Active</span>
            </div>
            <div className="w-px h-3.5 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-400">
              <Wifi className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-300">Kiosk #LIB-04</span>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 p-1 glass rounded-xl">
            {(['en', 'hi'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  language === lang
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'en' ? 'EN' : 'हिन्दी'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            <span>AI-Powered Academic Mentoring Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 status-live" />
          </motion.div>

          {/* Hero heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4"
          >
            AI Smart Student
            <span className="block gradient-text mt-1">Mentor Display</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mb-10"
          >
            {language === 'en'
              ? 'Personalized academic diagnosis, voice-guided mentoring, and a custom 14-day study roadmap — available here, now.'
              : 'व्यक्तिगत शैक्षणिक निदान, वॉयस मेंटरिंग और 14-दिवसीय अध्ययन रोडमैप — यहाँ, अभी।'}
          </motion.p>

          {/* Privacy Notice Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="gradient-border rounded-2xl mb-8 text-left"
          >
            <div className="bg-slate-900/80 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-4">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span>Privacy Notice & Responsible AI Policy</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                  DPDP Compliant
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {[
                  {
                    icon: Lock,
                    color: 'indigo',
                    title: 'Data Minimization',
                    desc: 'Only approved academic grades, attendance, and course enrolment records are retrieved.'
                  },
                  {
                    icon: Camera,
                    color: 'emerald',
                    title: 'No Biometric Recording',
                    desc: 'Camera is for presence detection only. No face recognition, no emotion inference, no recording.'
                  },
                  {
                    icon: Shield,
                    color: 'cyan',
                    title: 'Supportive, Not Determinative',
                    desc: 'AI advice supports students. All high-stakes decisions involve human faculty counsellors.'
                  }
                ].map(({ icon: Icon, color, title, desc }) => (
                  <div key={title} className="flex gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      color === 'indigo' ? 'bg-indigo-500/15 text-indigo-400' :
                      color === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' :
                      'bg-cyan-500/15 text-cyan-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white mb-0.5">{title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-700/60 bg-slate-800/30 hover:bg-slate-800/50 cursor-pointer transition-colors group">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  agreed
                    ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-600/40'
                    : 'border-slate-600 bg-slate-900 group-hover:border-indigo-500/60'
                }`}>
                  {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                <span className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white">I understand and consent</span> — my academic records will be accessed solely for this mentoring session, and my data will not be retained beyond session timeout.
                </span>
              </label>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={onStartAuth}
              disabled={!agreed}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={agreed ? { scale: 1.02 } : {}}
              whileTap={agreed ? { scale: 0.98 } : {}}
              className={`relative group inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold transition-all duration-300 ${
                agreed
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white cursor-pointer shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-600/60'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              {agreed && (
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              )}
              <span className="relative">
                {language === 'en' ? 'Touch to Begin Authentication' : 'प्रमाणीकरण के लिए स्पर्श करें'}
              </span>
              <ArrowRight className={`relative w-5 h-5 transition-transform duration-200 ${agreed && hovered ? 'translate-x-1' : ''}`} />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer Status Bar */}
      <footer className="relative z-10 flex items-center justify-between px-8 py-3.5 border-t border-white/5 text-[11px] text-slate-500">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-500" />
            256-bit TLS Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-3 h-3 text-slate-500" />
            Directional Audio Active
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-slate-500" />
            Version 2.4.0
          </span>
        </div>
        <span>Trialshopy EdTech · Library Central · Assignment Deadline: 13 Nov 2026</span>
      </footer>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard, QrCode, KeyRound, ArrowLeft, ShieldAlert,
  Fingerprint, CheckCircle2, Loader2, ChevronRight, Zap
} from 'lucide-react';
import { SAMPLE_STUDENT } from '../mockData';
import { StudentProfile } from '../types';

interface AuthenticationProps {
  onSuccess: (student: StudentProfile) => void;
  onBack: () => void;
  language: 'en' | 'hi';
}

const METHOD_CONFIG = [
  {
    id: 'rfid' as const,
    icon: CreditCard,
    label: 'Campus Smartcard',
    sublabel: 'RFID / NFC Tap',
    color: 'indigo'
  },
  {
    id: 'qr' as const,
    icon: QrCode,
    label: 'Student App QR',
    sublabel: 'Scan from Phone',
    color: 'cyan'
  },
  {
    id: 'sso' as const,
    icon: KeyRound,
    label: 'University SSO',
    sublabel: 'LDAP / OAuth Login',
    color: 'violet'
  }
];

export const Authentication: React.FC<AuthenticationProps> = ({
  onSuccess,
  onBack,
  language
}) => {
  const [method, setMethod] = React.useState<'rfid' | 'qr' | 'sso'>('rfid');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const simulateLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onSuccess(SAMPLE_STUDENT);
      }, 700);
    }, 1400);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#030712] overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/6 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      {/* Back button */}
      <div className="relative z-10 p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Welcome</span>
        </button>
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Fingerprint className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Student Authentication</h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Verify your identity using one of the approved methods below. All sessions are encrypted and time-limited.
            </p>
          </div>

          {/* Method selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {METHOD_CONFIG.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  method === m.id
                    ? 'bg-indigo-600/15 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <m.icon className={`w-5 h-5 ${method === m.id ? 'text-indigo-400' : 'text-slate-400'}`} />
                <div className="text-center">
                  <div className={`text-xs font-semibold ${method === m.id ? 'text-white' : 'text-slate-300'}`}>
                    {m.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.sublabel}</div>
                </div>
                {method === m.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </button>
            ))}
          </div>

          {/* Auth Card */}
          <div className="gradient-border rounded-2xl">
            <div className="bg-slate-900/90 rounded-2xl p-8 backdrop-blur-sm">
              {/* Success overlay */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 rounded-2xl z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-white font-bold text-lg">Identity Verified</div>
                  <div className="text-slate-400 text-sm mt-1">Loading academic profile…</div>
                </motion.div>
              )}

              {method === 'rfid' && (
                <motion.div
                  key="rfid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="relative mx-auto w-28 h-28 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 border-2 border-dashed border-indigo-500/40 animate-pulse flex items-center justify-center">
                      <CreditCard className="w-12 h-12 text-indigo-400" />
                    </div>
                    <div className="absolute -inset-3 rounded-3xl border border-indigo-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Tap Your Campus ID Card</h3>
                  <p className="text-sm text-slate-400 mb-6 max-w-xs mx-auto">
                    Place your RFID badge on the NFC sensor panel on the lower bezel of this display.
                  </p>
                  <button
                    onClick={simulateLogin}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Connecting to SIS…</>
                    ) : (
                      <><Zap className="w-5 h-5" /> Simulate RFID Tap — Aarav Sharma (21BCSE104)</>
                    )}
                  </button>
                </motion.div>
              )}

              {method === 'qr' && (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="mx-auto w-40 h-40 bg-white rounded-2xl p-4 mb-6 shadow-xl flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-slate-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Scan Dynamic Session QR</h3>
                  <p className="text-sm text-slate-400 mb-6 max-w-xs mx-auto">
                    Open your University Student Companion App, tap "Kiosk Quick-Connect", then scan this screen.
                  </p>
                  <button
                    onClick={simulateLogin}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying token…</> : 'Simulate App Scan'}
                  </button>
                </motion.div>
              )}

              {method === 'sso' && (
                <motion.div
                  key="sso"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">University SSO Sign-In</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Roll No. / University Email', value: '21bcse104@campus.edu.in', type: 'text' },
                      { label: 'Session Passcode / PIN', value: '••••••••', type: 'password' }
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          defaultValue={f.value}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={simulateLogin}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating…</> : 'Sign In via Campus SSO'}
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500/70" />
            <span>Biometric face login is disabled by campus privacy charter (Section 14 & 15).</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

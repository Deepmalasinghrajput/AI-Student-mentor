import React from 'react';
import { 
  CreditCard, 
  QrCode, 
  KeyRound, 
  Check, 
  ArrowLeft, 
  ShieldAlert, 
  Sparkles,
  School,
  Smartphone,
  Cpu
} from 'lucide-react';
import { SAMPLE_STUDENT } from '../mockData';
import { StudentProfile } from '../types';

interface AuthenticationProps {
  onSuccess: (student: StudentProfile) => void;
  onBack: () => void;
  language: 'en' | 'hi';
}

export const Authentication: React.FC<AuthenticationProps> = ({ 
  onSuccess, 
  onBack,
  language 
}) => {
  const [method, setMethod] = React.useState<'rfid' | 'qr' | 'sso'>('rfid');
  const [loading, setLoading] = React.useState(false);
  const [rfidTapped, setRfidTapped] = React.useState(false);

  const simulateLogin = (studentToLoad: StudentProfile = SAMPLE_STUDENT) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(studentToLoad);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'en' ? 'Back to Welcome Screen' : 'स्वागत स्क्रीन पर वापस जाएं'}</span>
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          {language === 'en' ? 'Student Authentication' : 'विद्यार्थी प्रमाणीकरण'}
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          {language === 'en' 
            ? 'Verify your identity securely. The kiosk interfaces with university SIS/ERP via read-only encrypted tokens.'
            : 'अपनी पहचान सुरक्षित रूप से सत्यापित करें। कियोस्क रीड-ओनली एनक्रिप्टेड टोकन द्वारा यूनिवर्सिटी ईआरपी से जुड़ता है।'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex gap-2">
          <button
            onClick={() => setMethod('rfid')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              method === 'rfid' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Campus Smartcard (RFID)</span>
          </button>

          <button
            onClick={() => setMethod('qr')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              method === 'qr' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Student App QR</span>
          </button>

          <button
            onClick={() => setMethod('sso')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              method === 'sso' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>University SSO Login</span>
          </button>
        </div>
      </div>

      {/* Method Cards */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-xl mx-auto shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {method === 'rfid' && (
          <div className="text-center py-4 flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-indigo-950/70 border-2 border-indigo-500/40 flex items-center justify-center mb-6 shadow-inner animate-pulse">
              <CreditCard className="w-12 h-12 text-indigo-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Tap Physical University ID Card</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Place your RFID badge on the NFC sensor plate on the lower bezel of this kiosk display.
            </p>

            <button
              onClick={() => simulateLogin()}
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Fetching SIS Records...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Simulate RFID Tap (Aarav Sharma - 21BCSE104)</span>
                </>
              )}
            </button>
          </div>
        )}

        {method === 'qr' && (
          <div className="text-center py-4 flex flex-col items-center">
            <div className="w-36 h-36 bg-white p-3 rounded-2xl shadow-xl mb-6 flex items-center justify-center">
              {/* Simulated QR Code matrix */}
              <div className="w-full h-full border-4 border-slate-900 border-dashed rounded-lg flex flex-col items-center justify-center bg-slate-50 text-slate-900">
                <QrCode className="w-20 h-20 text-indigo-900" />
                <span className="text-[10px] font-mono tracking-tighter text-slate-600 font-bold uppercase mt-1">Scan from Student App</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Scan Dynamic QR Code</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Open your University Companion App on iOS/Android, go to "Kiosk Quick-Connect" and scan this screen.
            </p>

            <button
              onClick={() => simulateLogin()}
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Authorizing token...</span>
              ) : (
                <span>Simulate Companion App Scan</span>
              )}
            </button>
          </div>
        )}

        {method === 'sso' && (
          <div className="py-2">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">University Roll No / Email</label>
                <input 
                  type="text" 
                  defaultValue="21bcse104@campus.edu.in" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Passcode / PIN</label>
                <input 
                  type="password" 
                  defaultValue="••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={() => simulateLogin()}
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? 'Authenticating via LDAP/OAuth...' : 'Sign In with Campus SSO'}
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80" />
          <span>Section 14 & 15 Notice: Biometric Face Login is disabled by campus privacy charter.</span>
        </div>
      </div>
    </div>
  );
};

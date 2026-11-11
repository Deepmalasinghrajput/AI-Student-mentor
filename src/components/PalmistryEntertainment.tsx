import React from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  Info, 
  Scan, 
  CheckCircle, 
  X,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';

interface PalmistryEntertainmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PalmistryEntertainment: React.FC<PalmistryEntertainmentProps> = ({
  isOpen,
  onClose
}) => {
  const [agreed, setAgreed] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);
  const [funResult, setFunResult] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const funPredictions = [
    "Your 'Debugging Line' is exceptionally deep! You have a mysterious knack for fixing null pointer exceptions at 2 AM.",
    "The 'Curiosity Mount' indicates high enthusiasm for distributed systems and excessive tabs open in your browser.",
    "Your 'Coffee Compatibility Curve' indicates high endurance during hackathons and mid-term exam weeks!"
  ];

  const handleScan = () => {
    setScanning(true);
    setFunResult(null);
    setTimeout(() => {
      setScanning(false);
      setFunResult(funPredictions[Math.floor(Math.random() * funPredictions.length)]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Section 15 Strict Disclosure */}
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Section 15 Boundary: Entertainment Demonstration Only</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Optional Campus Tech Demo: Palm Scanner
        </h3>

        <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed mb-4">
          <strong className="text-amber-300 block mb-1">Scientific Validity & Ethics Warning (Section 15):</strong>
          Palmistry is <strong>NOT</strong> a scientifically validated method to predict academic capability, career trajectory, intelligence or character. 
          This demonstration is completely decoupled from your academic records and will <strong>NEVER</strong> affect your study recommendations or placement profile.
        </div>

        {!agreed ? (
          <div>
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer mb-5">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0" 
              />
              <span>
                I understand this is purely for entertainment purposes and has zero educational or placement impact.
              </span>
            </label>

            <button
              disabled={!agreed}
              onClick={() => {}}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                agreed 
                  ? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-500' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Continue to Entertainment Sandbox
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="relative w-36 h-36 mx-auto mb-4 border-2 border-dashed border-indigo-500/50 rounded-2xl flex items-center justify-center bg-slate-950">
              <Scan className={`w-16 h-16 text-indigo-400 ${scanning ? 'animate-pulse' : ''}`} />
              {scanning && (
                <div className="absolute inset-x-0 h-1 bg-cyan-400 top-0 animate-bounce"></div>
              )}
            </div>

            {funResult ? (
              <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-2xl text-xs text-indigo-200 mb-4 animate-in fade-in">
                <span className="block font-bold text-sm text-cyan-300 mb-1">Fun Observation</span>
                "{funResult}"
              </div>
            ) : null}

            <button
              onClick={handleScan}
              disabled={scanning}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg cursor-pointer"
            >
              {scanning ? 'Analyzing Hand Contours (Fun Demo)...' : 'Scan Hand on Display Glass'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

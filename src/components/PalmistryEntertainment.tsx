import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Scan } from 'lucide-react';

interface PalmistryEntertainmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PalmistryEntertainment: React.FC<PalmistryEntertainmentProps> = ({
  isOpen, onClose
}) => {
  const [agreed, setAgreed] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  const predictions = [
    'Your "Debugging Line" is exceptionally deep. You have a remarkable knack for fixing null pointer exceptions at 2 AM.',
    'The "Curiosity Mount" suggests high enthusiasm for distributed systems and an impressive number of open browser tabs.',
    'Your "Coffee Compatibility Curve" indicates extraordinary endurance during hackathons and exam weeks.',
  ];

  const scan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(predictions[Math.floor(Math.random() * predictions.length)]);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-700/40 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Section 15 Mandatory Disclaimer */}
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4" /> Section 15 · Entertainment Only
          </div>

          <h3 className="text-lg font-bold text-white mb-3">Palm Scanner — Optional Tech Demo</h3>

          <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/15 text-xs text-slate-300 leading-relaxed mb-4">
            <strong className="text-amber-300 block mb-1">Scientific Validity Warning:</strong>
            Palmistry is <strong>NOT</strong> a scientifically validated method to predict academic capability,
            career potential, intelligence, or character. This demonstration is entirely decoupled from your
            academic records and will <strong>NEVER</strong> affect study recommendations or placement profiles.
          </div>

          {!agreed ? (
            <>
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-700/60 bg-slate-800/30 cursor-pointer mb-4 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                />
                <span>I understand this is purely for entertainment. It has zero educational or placement impact.</span>
              </label>
              <button
                disabled={!agreed}
                className="w-full py-3 rounded-xl bg-slate-800 text-slate-500 font-bold text-sm cursor-not-allowed"
              >
                Continue to Entertainment Demo
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className={`relative w-32 h-32 mx-auto mb-4 rounded-2xl border-2 border-dashed flex items-center justify-center ${scanning ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-indigo-500/30 bg-slate-900'}`}>
                <Scan className={`w-14 h-14 ${scanning ? 'text-cyan-400 animate-pulse' : 'text-indigo-400'}`} />
                {scanning && (
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-cyan-400 animate-bounce" />
                )}
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-indigo-500/8 border border-indigo-500/15 text-sm text-indigo-200 mb-4 italic"
                >
                  "{result}"
                </motion.div>
              )}

              <button
                onClick={scan}
                disabled={scanning}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm cursor-pointer transition-all disabled:opacity-60"
              >
                {scanning ? 'Analysing hand contours (fun demo)…' : 'Place Hand on Display Glass'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

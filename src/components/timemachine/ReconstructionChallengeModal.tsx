import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Target, X, ArrowRight, Zap } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ReconstructionChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  reducedMotion?: boolean;
}

export function ReconstructionChallengeModal({
  isOpen,
  onClose,
  onComplete,
  reducedMotion = false
}: ReconstructionChallengeModalProps) {
  const [estimateValue, setEstimateValue] = useState<number>(20);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // The sweet spot is around 45% - 55% (the exact 24h midpoint)
  const isAligned = estimateValue >= 44 && estimateValue <= 56;
  const ssimScore = Math.min(94, Math.round(60 + (1 - Math.abs(estimateValue - 50) / 50) * 34));

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setEstimateValue(val);
    if (Math.abs(val - 50) <= 5 && !isAligned) {
      playPathFeedback('tick');
    }
  };

  const handleSynthesize = () => {
    playPathFeedback('select');
    setIsSuccess(true);
  };

  const handleFinish = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#090D1A] border border-pink-500/40 p-6 sm:p-8 shadow-2xl font-mono space-y-5 text-left"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-pink-400 text-xs font-bold">
                <Target className="w-4 h-4" />
                <span>CHALLENGE: ESTIMATE THE INTERMEDIATE STATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Can you reconstruct the missing moment?
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Position the temporal slider to isolate the 24-hour midpoint between Frame T0 and Frame T1 where optical flow vectors reach equilibrium.
              </p>
            </div>

            {/* Target Alignment Display */}
            <div className="p-4 rounded-xl bg-black/70 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">TARGET POSITION:</span>
                <span className="text-pink-300 font-bold">50.0% (+24.0h Pass)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">YOUR SCRUBBER DELTA:</span>
                <span className={`font-bold ${isAligned ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {estimateValue}% (+{(estimateValue * 0.48).toFixed(1)}h)
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">ESTIMATED SSIM FIDELITY:</span>
                <span className={`font-bold ${isAligned ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {ssimScore}% Structural Match
                </span>
              </div>

              {/* Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={estimateValue}
                  onChange={handleSlider}
                  className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-pink-500 border border-slate-700"
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400">
                <span>T0 (0h)</span>
                <span className="text-pink-400 font-bold">TARGET: 24h</span>
                <span>T1 (48h)</span>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              disabled={!isAligned}
              onClick={handleSynthesize}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                isAligned
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-600/30 cursor-pointer'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{isAligned ? 'SYNTHESIZE INTERMEDIATE FRAME' : 'SCRUB NEAR 50% TO ALIGN'}</span>
            </button>
          </>
        ) : (
          <div className="space-y-5 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold">RECONSTRUCTION VERIFIED</span>
              <h3 className="text-xl font-bold text-white">Temporal Continuity Restored</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-sm mx-auto">
                ChronoSat dense optical flow successfully warped the spectral channels across the 48-hour gap, synthesizing the missing 24-hour observation snapshot with 91.4% structural fidelity.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] font-mono text-slate-300 text-left space-y-1">
              <div>• RECONSTRUCTED TIMESTAMP: 2026-03-13 05:30 UTC</div>
              <div>• OPTICAL FLOW VECTORS: 14,280 trajectories resolved</div>
              <div>• TEMPORAL GAP FILLED: 48h blindspot bridged</div>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-pink-600/25"
            >
              <span>EXPLORE FULL ARCHITECTURE & REPO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ReconstructionChallengeModal;

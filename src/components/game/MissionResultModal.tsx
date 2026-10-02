import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Clock,
  Radio,
  ExternalLink
} from 'lucide-react';
import type { ThermalSignal } from '../../types/pyravexGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface MissionResultModalProps {
  isSuccess: boolean;
  signal: ThermalSignal;
  timerSeconds: number;
  investigatedCount: number;
  totalSignalsCount: number;
  simulationScore: number;
  onRetry: () => void;
  onContinueToExplanation: () => void;
  onDismissWrongSelection: () => void;
  reducedMotion?: boolean;
}

export function MissionResultModal({
  isSuccess,
  signal,
  timerSeconds,
  investigatedCount,
  totalSignalsCount,
  simulationScore,
  onRetry,
  onContinueToExplanation,
  onDismissWrongSelection,
  reducedMotion = false
}: MissionResultModalProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-mono">
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#080D16] border shadow-2xl relative overflow-hidden"
        style={{
          borderColor: isSuccess ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)',
          boxShadow: isSuccess
            ? '0 0 40px rgba(16, 185, 129, 0.25), 0 20px 40px rgba(0,0,0,0.8)'
            : '0 0 40px rgba(239, 68, 68, 0.25), 0 20px 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div>
            {/* Status Header */}
            <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>ANOMALY CONFIRMED • MISSION COMPLETE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
              Anomaly Successfully Identified.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-5">
              You correctly classified <strong>{signal.name} ({signal.region})</strong> as the breakout hazard by evaluating temporal escalation rather than raw temperature alone.
            </p>

            {/* Triad of Reasons */}
            <div className="p-4 rounded-2xl bg-[#05070B] border border-slate-800 space-y-2 mb-5 text-xs">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>EXPONENTIAL RECENT SURGE (+{signal.recentChangePercent}%)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>PERSISTENT NOCTURNAL RADIATION (89% Continuity)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>UNUSUAL HISTORICAL BEHAVIOR DEVIATION</span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#05070B] border border-slate-800 text-center mb-6 text-[11px]">
              <div>
                <span className="text-[9px] text-slate-400 block">INVESTIGATED</span>
                <span className="font-bold text-white">{investigatedCount} / {totalSignalsCount}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block">MISSION TIME</span>
                <span className="font-bold text-cyan-400">{formatTime(timerSeconds)}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block">SIMULATION SCORE</span>
                <span className="font-bold text-amber-400">{simulationScore} pts</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onRetry}
                data-cursor="pointer"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#05070B] border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>PLAY AGAIN</span>
              </button>

              <button
                type="button"
                onClick={onContinueToExplanation}
                data-cursor="pointer"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                }}
              >
                <span>HOW PYRAVEX WORKS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* WRONG SELECTION STATE */
          <div>
            {/* Status Header */}
            <div className="flex items-center gap-2 mb-3 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>SIGNAL NOT CONFIRMED AS ANOMALY</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-2">
              {signal.name} — Normal Baseline Activity
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
              {signal.wrongSelectionReason ||
                'This signal does not show enough statistical evidence to classify it as the anomaly in this scenario.'}
            </p>

            <div className="p-3.5 rounded-xl bg-[#05070B] border border-slate-800 mb-6 text-xs text-slate-400 font-sans">
              <strong className="text-slate-200 font-mono block mb-1">
                ANALYSIS LESSON:
              </strong>
              High absolute temperature alone does not define an anomaly. Normal industrial plants and seasonal agricultural burning are hot, but they follow flat or predictable cyclical baselines.
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={onDismissWrongSelection}
              data-cursor="pointer"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-98"
            >
              <span>RETURN TO MAP & KEEP INVESTIGATING</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default MissionResultModal;

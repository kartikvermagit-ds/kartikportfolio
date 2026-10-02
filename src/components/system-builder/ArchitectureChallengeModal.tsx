import React from 'react';
import { motion } from 'framer-motion';
import { Target, X, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { SystemCategory, SystemComponent } from '../../types/systemBuilder';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ArchitectureChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedComponents: Partial<Record<SystemCategory, SystemComponent>>;
  onAutoSolveChallenge: () => void;
  reducedMotion?: boolean;
}

export function ArchitectureChallengeModal({
  isOpen,
  onClose,
  selectedComponents,
  onAutoSolveChallenge,
  reducedMotion = false
}: ArchitectureChallengeModalProps) {
  if (!isOpen) return null;

  const hasSatelliteInput = selectedComponents['data-source']?.id === 'src-satellite';
  const hasProcessing = Boolean(selectedComponents['processing']);
  const hasIntelligence = Boolean(selectedComponents['intelligence']);
  const hasStorage = Boolean(selectedComponents['storage']);
  const hasApi = Boolean(selectedComponents['api']);
  const hasMapFrontend = selectedComponents['frontend']?.id === 'front-map';

  const isChallengeFulfilled =
    hasSatelliteInput &&
    hasProcessing &&
    hasIntelligence &&
    hasStorage &&
    hasApi &&
    hasMapFrontend;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#090D1A] border border-blue-500/40 p-6 shadow-2xl font-mono space-y-5 text-left"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            playPathFeedback('tick');
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
            <Target className="w-4 h-4" />
            <span>ARCHITECTURE CHALLENGE: GEOSPATIAL MONITORING</span>
          </div>
          <h3 className="text-xl font-bold text-white">Can you construct this system?</h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
            "Build a system that receives satellite thermal data, processes it, analyzes incidents, stores results, and displays them on an interactive map."
          </p>
        </div>

        {/* Challenge Requirements Checklist */}
        <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">1. Data Source: Satellite Telemetry</span>
            {hasSatelliteInput ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-[10px] text-amber-400">Required</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">2. Processing Pipeline</span>
            {hasProcessing ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-[10px] text-amber-400">Required</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">3. Intelligence (Clustering / Risk Analytics)</span>
            {hasIntelligence ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-[10px] text-amber-400">Required</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">4. Spatial Database Persistence</span>
            {hasStorage ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-[10px] text-amber-400">Required</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">5. Backend REST API Gateway</span>
            {hasApi ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-[10px] text-amber-400">Required</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">6. Frontend: Interactive Map Interface</span>
            {hasMapFrontend ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-[10px] text-amber-400">Required</span>
            )}
          </div>
        </div>

        {/* Status Feedback */}
        {isChallengeFulfilled ? (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>CHALLENGE COMPLETE! Your architecture satisfies all criteria.</span>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Select the missing requirements on the canvas, or auto-load below.</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {!isChallengeFulfilled ? (
            <button
              type="button"
              onClick={() => {
                onAutoSolveChallenge();
                playPathFeedback('select');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>LOAD CHALLENGE ARCHITECTURE</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
            >
              <span>RETURN TO WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ArchitectureChallengeModal;

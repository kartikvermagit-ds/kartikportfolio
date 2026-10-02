import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, X, RefreshCw } from 'lucide-react';
import type { PathItem } from '../../types/path';

interface ReturningVisitorPromptProps {
  savedPath: PathItem;
  onContinue: (path: PathItem) => void;
  onDismiss: () => void;
  reducedMotion?: boolean;
}

export function ReturningVisitorPrompt({
  savedPath,
  onContinue,
  onDismiss,
  reducedMotion = false
}: ReturningVisitorPromptProps) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      className="max-w-xl mx-auto mb-10 p-4 rounded-2xl bg-[#080D16]/95 border backdrop-blur-md shadow-xl relative"
      style={{
        borderColor: `${savedPath.color}45`,
        boxShadow: `0 0 25px ${savedPath.color}15, 0 10px 25px rgba(0,0,0,0.5)`
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: `${savedPath.color}15`,
              borderColor: `${savedPath.color}40`
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: savedPath.color }} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-300">
                WELCOME BACK
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-xs text-slate-300 font-sans mt-0.5">
              Continue exploring your{' '}
              <strong style={{ color: savedPath.color }}>{savedPath.shortTitle}</strong> route?
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss welcome prompt"
          data-cursor="pointer"
          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-850 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-3.5 pt-3 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => onContinue(savedPath)}
          data-cursor="pointer"
          className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold text-white transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
          style={{
            backgroundColor: savedPath.color,
            boxShadow: `0 0 15px ${savedPath.color}35`
          }}
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onDismiss}
          data-cursor="pointer"
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-slate-400 hover:text-slate-200 bg-[#05070B] border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3 h-3 text-slate-500" />
          <span>CHOOSE ANOTHER PATH</span>
        </button>
      </div>
    </motion.div>
  );
}

export default ReturningVisitorPrompt;

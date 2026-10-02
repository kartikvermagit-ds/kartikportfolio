import React from 'react';
import { Sparkles, X } from 'lucide-react';
import type { ExplorationMilestone } from '../../types/exploration';

interface MilestoneToastProps {
  milestone: ExplorationMilestone | null;
  onDismiss: () => void;
}

export const MilestoneToast: React.FC<MilestoneToastProps> = ({
  milestone,
  onDismiss
}) => {
  if (!milestone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="flex items-start gap-3 p-3.5 bg-slate-950/95 border border-blue-500/40 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono tracking-wider font-semibold text-blue-400 uppercase">
              DISCOVERY UNLOCKED
            </span>
          </div>
          <div className="font-mono text-xs font-bold text-slate-100 tracking-wide mt-0.5">
            {milestone.title}
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5 leading-snug">
            {milestone.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss discovery notification"
          className="text-slate-500 hover:text-slate-200 p-1 rounded-md hover:bg-slate-900 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400 min-h-[36px] min-w-[36px] flex items-center justify-center -mr-1 -mt-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

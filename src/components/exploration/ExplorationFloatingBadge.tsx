import React from 'react';
import { Compass, X } from 'lucide-react';

interface ExplorationFloatingBadgeProps {
  totalDiscovered: number;
  totalItems: number;
  isPanelOpen: boolean;
  onOpenPanel: () => void;
  onDismiss: () => void;
}

export const ExplorationFloatingBadge: React.FC<ExplorationFloatingBadgeProps> = ({
  totalDiscovered,
  totalItems,
  isPanelOpen,
  onOpenPanel,
  onDismiss
}) => {
  const formattedCount = String(totalDiscovered).padStart(2, '0');
  const formattedTotal = String(totalItems).padStart(2, '0');

  return (
    <div
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-32 z-30 transition-all duration-300"
      role="region"
      aria-label="Portfolio Exploration Tracker"
    >
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 backdrop-blur-md border border-slate-800/80 hover:border-blue-500/50 rounded-xl shadow-2xl shadow-black/60 group">
        <button
          type="button"
          onClick={onOpenPanel}
          aria-expanded={isPanelOpen}
          aria-controls="exploration-panel"
          aria-label={`Open exploration protocol. Discovered ${totalDiscovered} of ${totalItems} experiences.`}
          className="flex items-center gap-2.5 px-3 py-2 text-left rounded-lg transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[44px]"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/10 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-all">
            <Compass className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
            {totalDiscovered > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            )}
          </div>

          {/* Desktop Display */}
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 group-hover:text-slate-200 uppercase">
              KARTIK.EXPLORE
            </span>
            <span className="text-xs font-mono font-medium text-blue-400 group-hover:text-blue-300">
              {formattedCount} / {formattedTotal} DISCOVERED
            </span>
          </div>

          {/* Mobile Compact Pill */}
          <div className="sm:hidden flex items-center gap-1.5 font-mono text-xs font-medium text-slate-300">
            <span className="text-[11px] text-slate-400 font-semibold tracking-wider">EXPLORE</span>
            <span className="text-blue-400 font-bold">{formattedCount}/{formattedTotal}</span>
          </div>
        </button>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          aria-label="Dismiss exploration indicator"
          title="Dismiss indicator (reopen via footer or Command Center 'explore')"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-900/80 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[44px] min-w-[32px]"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

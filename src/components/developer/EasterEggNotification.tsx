import React from 'react';
import { Sparkles, X } from 'lucide-react';
import type { EasterEggItem } from '../../types/developer';

interface EasterEggNotificationProps {
  egg: EasterEggItem | null;
  onDismiss: () => void;
}

export const EasterEggNotification: React.FC<EasterEggNotificationProps> = ({ egg, onDismiss }) => {
  if (!egg) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="flex items-start gap-3 p-3.5 bg-slate-950/95 border border-amber-500/50 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>

        <div className="flex-1 min-w-0 font-mono">
          <div className="text-[10px] tracking-wider font-semibold text-amber-400 uppercase">
            EASTER EGG DISCOVERED
          </div>
          <div className="text-xs font-bold text-slate-100 tracking-wide mt-0.5">
            {egg.title}
          </div>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-snug">
            "{egg.discoveryMessage}"
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss discovery notification"
          className="text-slate-500 hover:text-slate-200 p-1 rounded-md hover:bg-slate-900 transition-colors -mr-1 -mt-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

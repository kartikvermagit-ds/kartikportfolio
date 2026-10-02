import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface DeepLayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const DeepLayerModal: React.FC<DeepLayerModalProps> = ({
  isOpen,
  onClose,
  onOpenTerminal
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="The Deep Layer"
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg p-6 sm:p-8 bg-[#05070B] border border-amber-500/50 rounded-2xl shadow-2xl shadow-black overflow-hidden font-mono text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-1">
            SECRET DISCOVERY UNLOCKED
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase mb-4">
            YOU FOUND THE DEEP LAYER
          </h3>

          <div className="space-y-3 text-slate-300 text-sm font-sans leading-relaxed max-w-md my-2">
            <p className="font-mono text-slate-400 text-xs">
              --------------------------------
            </p>
            <p className="text-base font-semibold text-slate-100">
              Most people scroll.
            </p>
            <p className="text-base font-semibold text-amber-300">
              You explored.
            </p>
            <p className="font-mono text-slate-400 text-xs">
              --------------------------------
            </p>
            <p className="text-sm italic text-slate-300 pt-1">
              "Curiosity compounds."
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-800/80 w-full">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 font-mono text-xs font-semibold transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>EXPLORE CLI TERMINAL</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-medium transition-colors"
            >
              RESUME PORTFOLIO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

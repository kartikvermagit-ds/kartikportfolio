import React, { useEffect } from 'react';
import { AlertCircle, Play, X } from 'lucide-react';

interface TypingQuitModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onQuit: () => void;
}

export const TypingQuitModal: React.FC<TypingQuitModalProps> = ({
  isOpen,
  onContinue,
  onQuit
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onContinue();
      } else if (e.key === 'Enter') {
        onContinue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onContinue]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Quit Typing Test Confirmation"
    >
      <div className="relative max-w-sm w-full p-6 rounded-2xl bg-[#080D16] border border-amber-500/40 shadow-2xl shadow-black font-mono text-center">
        <div className="mx-auto w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
          <AlertCircle className="w-5 h-5 animate-pulse" />
        </div>

        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
          PAUSE // QUIT TEST?
        </h3>

        <p className="text-xs font-sans text-slate-400 mb-6 leading-relaxed">
          Your current session will be discarded. Do you wish to continue typing or reset the test?
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RESUME (ESC)</span>
          </button>

          <button
            type="button"
            onClick={onQuit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-rose-300 font-mono text-xs font-semibold tracking-wider transition-all active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
            <span>QUIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

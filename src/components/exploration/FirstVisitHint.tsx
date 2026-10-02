import React, { useState, useEffect } from 'react';
import { Compass, Check } from 'lucide-react';

interface FirstVisitHintProps {
  isDismissed: boolean;
  onDismiss: () => void;
}

export const FirstVisitHint: React.FC<FirstVisitHintProps> = ({
  isDismissed,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Small delay after page load so it doesn't pop up abruptly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 left-4 sm:left-6 z-30 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="flex items-center gap-3 p-3 bg-slate-950/90 border border-slate-800 rounded-xl shadow-xl backdrop-blur-md">
        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">
          <Compass className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-300 font-sans leading-tight">
            Explore freely. Your journey is saved locally.
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Acknowledge exploration hint"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-[11px] font-mono font-medium transition-colors min-h-[36px]"
        >
          <Check className="w-3 h-3" />
          <span>GOT IT</span>
        </button>
      </div>
    </div>
  );
};

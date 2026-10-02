import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface DevShortcutPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevShortcutPanel: React.FC<DevShortcutPanelProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'Shift', 'D'], label: 'Toggle Developer Mode (Cmd on macOS)' },
    { keys: ['Ctrl', 'K'], label: 'Open Command Center (KartikOS)' },
    { keys: ['T'], label: 'Launch Developer Terminal (in Dev Mode)' },
    { keys: ['?'], label: 'Open Keybindings Help (in Dev Mode)' },
    { keys: ['Esc'], label: 'Close Active Modal / Terminal / Dialog' },
    { keys: ['↑', '↓'], label: 'Navigate Terminal Command History & Menus' },
    { keys: ['K', 'A', 'R', 'T', 'I', 'K'], label: 'Secret Signal Keystroke Sequence' },
    { keys: ['↑', '↑', '↓', '↓', '←', '→', '←', '→'], label: 'Legacy Directional Sequence' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts Panel"
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg flex flex-col bg-[#05070B] border border-blue-500/40 rounded-2xl shadow-2xl shadow-black overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900/80 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-100 tracking-wider uppercase">
                KEYBOARD SHORTCUTS
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Real keyboard handlers active in application state
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortcuts panel"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-2.5 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-slate-800">
          {shortcuts.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 gap-3"
            >
              <span className="text-slate-300 font-sans text-xs">{item.label}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                {item.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[10px] shadow-sm font-semibold"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 bg-slate-900/50 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-medium transition-colors"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};

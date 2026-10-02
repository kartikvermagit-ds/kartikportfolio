import React, { useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import { CommandItem } from './CommandItem';
import { SystemStatus } from './SystemStatus';
import type { CommandItem as CommandItemType, SystemTelemetry, CommandCategory } from '../../types/command';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
  filteredCommands: CommandItemType[];
  feedback: string | null;
  telemetry: SystemTelemetry;
  reducedMotion: boolean;
}

const CATEGORY_ORDER: CommandCategory[] = [
  'NAVIGATION',
  'PROJECTS',
  'EXPLORER',
  'ENGINEERING',
  'SYSTEM',
  'EASTER_EGGS'
];

const CATEGORY_TITLES: Record<CommandCategory, string> = {
  NAVIGATION: 'SYSTEM NAVIGATION',
  PROJECTS: 'FLAGSHIP & DEPLOYED SYSTEMS',
  EXPLORER: 'INTERACTIVE 3D & EXPLORERS',
  ENGINEERING: 'EXTERNAL VERIFIED PROFILES',
  SYSTEM: 'SYSTEM PREFERENCES & UTILITIES',
  EASTER_EGGS: 'DEVELOPER CLI & EASTER EGGS'
};

export function CommandPalette({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  selectedIndex,
  onSelectIndex,
  filteredCommands,
  feedback,
  telemetry,
  reducedMotion
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input field on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trap focus inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Group commands by category while preserving global indices for keyboard navigation
  const groupedCommands = useMemo(() => {
    const groups: { category: CommandCategory; items: { command: CommandItemType; globalIndex: number }[] }[] = [];

    let currentIndex = 0;
    const categoryMap = new Map<CommandCategory, { command: CommandItemType; globalIndex: number }[]>();

    filteredCommands.forEach((cmd) => {
      const list = categoryMap.get(cmd.category) || [];
      list.push({ command: cmd, globalIndex: currentIndex });
      categoryMap.set(cmd.category, list);
      currentIndex++;
    });

    CATEGORY_ORDER.forEach((cat) => {
      const items = categoryMap.get(cat);
      if (items && items.length > 0) {
        groups.push({ category: cat, items });
      }
    });

    return groups;
  }, [filteredCommands]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kartik OS Command Center"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 pt-16 sm:pt-4"
    >
      {/* Subdued Backdrop - keeps 3D environment visible underneath */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#05070B]/80 backdrop-blur-xs cursor-pointer"
      />

      {/* Main Command Palette Window */}
      <motion.div
        ref={containerRef}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#080D16]/95 border border-slate-700/80 rounded-2xl shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] backdrop-blur-xl overflow-hidden flex flex-col max-h-[85vh] z-10"
      >
        {/* Top OS Window Header */}
        <div className="px-4 py-3 bg-[#05070B] border-b border-slate-800/80 flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold text-white tracking-wider">KARTIK OS</span>
              <span className="text-[10px] text-slate-500 hidden xs:inline">// v2.6 COMMAND INTERFACE</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
              ESC
            </kbd>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Kartik OS"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative px-4 py-3 border-b border-slate-800/80 flex items-center gap-3 bg-[#080D16]">
          <span className="text-blue-400 font-mono text-sm font-bold select-none">&gt;</span>
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search commands, systems, projects, or type 'whoami'..."
            aria-label="Search Kartik OS commands"
            className="w-full bg-transparent text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none tracking-wide"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic CLI Feedback Output Banner (For easter eggs, status, copy actions) */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-blue-950/40 border-b border-blue-500/30 px-4 py-2 flex items-center gap-2 text-xs font-mono text-blue-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{feedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Command List */}
        <div
          role="listbox"
          aria-label="Command suggestions"
          className="flex-1 overflow-y-auto px-2 py-2 max-h-[420px] divide-y divide-slate-800/40"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 px-4 text-center font-mono">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <div className="text-xs text-slate-300 font-semibold mb-1">
                NO COMMANDS FOUND FOR "{searchQuery}"
              </div>
              <div className="text-[11px] text-slate-500">
                Try searching for 'pyravex', 'dsa', 'github', 'audio', or 'whoami'.
              </div>
            </div>
          ) : (
            groupedCommands.map((group) => (
              <div key={group.category} className="py-2 first:pt-0 last:pb-0">
                {/* Category Header */}
                <div className="px-3 py-1 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                  <span>{CATEGORY_TITLES[group.category]}</span>
                  <span className="text-slate-600">{group.items.length}</span>
                </div>

                {/* Items in this category */}
                <div className="mt-1">
                  {group.items.map(({ command, globalIndex }) => (
                    <CommandItem
                      key={command.id}
                      command={command}
                      isSelected={selectedIndex === globalIndex}
                      onSelect={() => onSelectIndex(globalIndex)}
                      onExecute={() => command.action()}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Real System Telemetry Footer */}
        <SystemStatus telemetry={telemetry} />
      </motion.div>
    </div>
  );
}
export default CommandPalette;

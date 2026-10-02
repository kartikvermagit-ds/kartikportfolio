import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  X,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Send,
  AlertTriangle
} from 'lucide-react';
import type { ExplorationCategorySummary, ExplorationItem } from '../../types/exploration';
import { INITIAL_EASTER_EGGS, EASTER_EGGS_STORAGE_KEY } from '../../data/easterEggs';

interface ExplorationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ExplorationCategorySummary[];
  totalDiscovered: number;
  totalItems: number;
  isAllDiscovered: boolean;
  onReset: () => void;
}

export const ExplorationPanel: React.FC<ExplorationPanelProps> = ({
  isOpen,
  onClose,
  categories,
  totalDiscovered,
  totalItems,
  isAllDiscovered,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'WORK' | 'PLAY' | 'STACK' | 'PERSON' | 'SECRETS'>('ALL');
  const [easterEggs, setEasterEggs] = useState(INITIAL_EASTER_EGGS);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = localStorage.getItem(EASTER_EGGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, boolean>;
        setEasterEggs(
          INITIAL_EASTER_EGGS.map((egg) => ({
            ...egg,
            isDiscovered: Boolean(parsed[egg.id])
          }))
        );
      }
    } catch {}
  }, [isOpen]);

  const discoveredSecretsCount = easterEggs.filter((e) => e.isDiscovered).length;
  const totalSecretsCount = easterEggs.length;

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigateToItem = (item: ExplorationItem) => {
    const el = document.getElementById(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClose();
    }
  };

  const handleConfirmReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  const filteredCategories =
    activeTab === 'ALL'
      ? categories
      : categories.filter((c) => c.category === activeTab);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exploration-dialog-title"
      ref={panelRef}
    >
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Panel / Mobile Bottom Sheet */}
      <div className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[82vh] flex flex-col bg-slate-950/95 border border-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="exploration-dialog-title"
                  className="font-mono text-sm sm:text-base font-bold tracking-wider text-slate-100 uppercase"
                >
                  EXPLORATION PROTOCOL
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40">
                  {totalDiscovered} / {totalItems}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Unified system map of discovered portfolio layers
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close exploration protocol"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 px-5 py-2.5 border-b border-slate-800/60 bg-slate-950/40 overflow-x-auto no-scrollbar">
          {(['ALL', 'WORK', 'PLAY', 'STACK', 'PERSON', 'SECRETS'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap min-h-[36px] flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{tab}</span>
                {tab !== 'ALL' && tab !== 'SECRETS' && (
                  <span className="text-[10px] opacity-75">
                    {categories.find((c) => c.category === tab)?.discoveredCount ?? 0}/
                    {categories.find((c) => c.category === tab)?.totalCount ?? 0}
                  </span>
                )}
                {tab === 'SECRETS' && (
                  <span className="text-[10px] text-amber-400 font-semibold">
                    {discoveredSecretsCount}/{totalSecretsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Completion Banner (if all discovered) */}
          {isAllDiscovered && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-emerald-950/40 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wide">
                    SYSTEM EXPLORED
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    You’ve seen the work, the experiments, the stack, and the person behind them.
                  </p>
                  <div className="flex flex-wrap gap-2.5 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          onClose();
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-mono text-xs font-semibold hover:bg-blue-500 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      GET IN TOUCH
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-mono text-xs hover:bg-slate-700 transition-colors"
                    >
                      EXPLORE AGAIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categorized Items */}
          {filteredCategories.map((catSummary) => {
            const { category, categoryLabel, color, discoveredCount, totalCount, items } = catSummary;

            return (
              <div key={category} className="space-y-2.5">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
                      {categoryLabel}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {discoveredCount} / {totalCount}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((item) => {
                    const isDone = item.isDiscovered;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigateToItem(item)}
                        className={`group relative flex items-start gap-3 p-3 text-left rounded-xl border transition-all min-h-[58px] ${
                          isDone
                            ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                            : 'bg-slate-950/40 border-slate-900/80 hover:border-slate-800 hover:bg-slate-900/40 opacity-75'
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {isDone ? (
                            <CheckCircle2
                              className="w-4 h-4 transition-transform group-hover:scale-110"
                              style={{ color }}
                            />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-500" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-mono text-xs font-semibold truncate ${
                                isDone
                                  ? 'text-slate-200 group-hover:text-white'
                                  : 'text-slate-400 group-hover:text-slate-300'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.isInteractive && (
                              <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                                LAB
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans truncate mt-0.5">
                            {item.sublabel}
                          </p>
                        </div>

                        <ArrowUpRight className="absolute top-3 right-3 w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Secret Discoveries Section (Task 13) */}
          {(activeTab === 'ALL' || activeTab === 'SECRETS') && (
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
                    SECRET DISCOVERIES
                  </span>
                </div>
                <span className="font-mono text-xs text-amber-400 font-semibold">
                  {discoveredSecretsCount} / {totalSecretsCount} FOUND
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {easterEggs.map((egg) => (
                  <div
                    key={egg.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      egg.isDiscovered
                        ? 'bg-amber-950/20 border-amber-500/40 text-slate-200'
                        : 'bg-slate-950/40 border-slate-900/80 text-slate-500 opacity-60'
                    }`}
                  >
                    {egg.isDiscovered ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-700 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 font-mono text-xs">
                      <div className="flex items-center justify-between gap-1">
                        <span className={egg.isDiscovered ? 'text-amber-300 font-semibold truncate' : 'text-slate-500'}>
                          {egg.isDiscovered ? egg.title : 'Undiscovered Secret'}
                        </span>
                        {egg.isDiscovered && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                            FOUND
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-sans text-slate-400 mt-0.5 leading-snug">
                        {egg.isDiscovered ? egg.discoveryMessage : 'Explore the portfolio to reveal this hidden layer.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between gap-3">
          {showResetConfirm ? (
            <div className="flex items-center justify-between w-full p-2 rounded-lg bg-red-950/30 border border-red-900/40 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-mono text-red-300">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>RESET LOCAL EXPLORATION?</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-red-600 text-white hover:bg-red-500 transition-colors"
                >
                  RESET
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-800/50 min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET EXPLORATION</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-medium transition-colors min-h-[44px]"
              >
                CLOSE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

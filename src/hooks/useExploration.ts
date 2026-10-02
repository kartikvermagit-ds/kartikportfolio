import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type {
  ExplorationCategory,
  ExplorationMilestone,
  ExplorationProgressState,
  ExplorationCategorySummary
} from '../types/exploration';
import {
  EXPLORATION_STORAGE_KEY,
  EXPLORATION_VERSION,
  CATEGORY_COLORS,
  EXPLORATION_ITEMS,
  EXPLORATION_MILESTONES
} from '../data/explorationData';

const DISMISSED_KEY = 'kartik-explore-ui-dismissed';

const DEFAULT_STATE: ExplorationProgressState = {
  version: EXPLORATION_VERSION,
  discovered: {},
  milestones: {},
  firstVisitDismissed: false,
  uiDismissed: false,
  lastVisitedId: null,
  lastVisitedTimestamp: Date.now()
};

function loadInitialState(): ExplorationProgressState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(EXPLORATION_STORAGE_KEY);
    const dismissedFlag = localStorage.getItem(DISMISSED_KEY) === 'true';

    if (!raw) {
      return {
        ...DEFAULT_STATE,
        uiDismissed: dismissedFlag
      };
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== EXPLORATION_VERSION || typeof parsed.discovered !== 'object') {
      // Version mismatch or malformed: gracefully reset
      return {
        ...DEFAULT_STATE,
        uiDismissed: dismissedFlag
      };
    }

    return {
      version: EXPLORATION_VERSION,
      discovered: parsed.discovered || {},
      milestones: parsed.milestones || {},
      firstVisitDismissed: Boolean(parsed.firstVisitDismissed),
      uiDismissed: dismissedFlag || Boolean(parsed.uiDismissed),
      lastVisitedId: parsed.lastVisitedId || null,
      lastVisitedTimestamp: parsed.lastVisitedTimestamp || Date.now()
    };
  } catch (err) {
    console.warn('[KARTIK.EXPLORE] Failed to load exploration state from localStorage, using memory defaults:', err);
    return DEFAULT_STATE;
  }
}

export function useExploration() {
  const [state, setState] = useState<ExplorationProgressState>(loadInitialState);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<ExplorationMilestone | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Save to localStorage safely whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(EXPLORATION_STORAGE_KEY, JSON.stringify(state));
      if (state.uiDismissed) {
        localStorage.setItem(DISMISSED_KEY, 'true');
      } else {
        localStorage.removeItem(DISMISSED_KEY);
      }
    } catch (err) {
      console.warn('[KARTIK.EXPLORE] Failed to persist exploration state to localStorage:', err);
    }
  }, [state]);

  // Queue milestone toast
  const triggerMilestoneToast = useCallback((milestone: ExplorationMilestone) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setActiveToast(milestone);
    toastTimeoutRef.current = setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  }, []);

  const dismissMilestoneToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setActiveToast(null);
  }, []);

  // Mark an item as discovered
  const markDiscovered = useCallback((itemId: string, opts?: { triggerMilestoneId?: string }) => {
    setState((prev) => {
      if (prev.discovered[itemId]) {
        // Already discovered, but maybe milestone needs triggering
        if (opts?.triggerMilestoneId && !prev.milestones[opts.triggerMilestoneId]) {
          const ms = EXPLORATION_MILESTONES.find((m) => m.id === opts.triggerMilestoneId);
          if (ms) {
            triggerMilestoneToast(ms);
            return {
              ...prev,
              milestones: { ...prev.milestones, [ms.id]: true }
            };
          }
        }
        return prev;
      }

      const nextDiscovered = { ...prev.discovered, [itemId]: true };
      const nextMilestones = { ...prev.milestones };

      // Find if there is an associated milestone
      const milestone = opts?.triggerMilestoneId
        ? EXPLORATION_MILESTONES.find((m) => m.id === opts.triggerMilestoneId)
        : EXPLORATION_MILESTONES.find((m) => m.associatedItemId === itemId);

      if (milestone && !nextMilestones[milestone.id]) {
        nextMilestones[milestone.id] = true;
        triggerMilestoneToast(milestone);
      }

      return {
        ...prev,
        discovered: nextDiscovered,
        milestones: nextMilestones,
        lastVisitedId: itemId,
        lastVisitedTimestamp: Date.now()
      };
    });
  }, [triggerMilestoneToast]);

  const markMilestone = useCallback((milestoneId: string) => {
    setState((prev) => {
      if (prev.milestones[milestoneId]) return prev;
      const ms = EXPLORATION_MILESTONES.find((m) => m.id === milestoneId);
      if (ms) {
        triggerMilestoneToast(ms);
      }
      return {
        ...prev,
        milestones: { ...prev.milestones, [milestoneId]: true }
      };
    });
  }, [triggerMilestoneToast]);

  const isDiscovered = useCallback((itemId: string) => {
    return Boolean(state.discovered[itemId]);
  }, [state.discovered]);

  const dismissFirstVisit = useCallback(() => {
    setState((prev) => ({ ...prev, firstVisitDismissed: true }));
  }, []);

  const dismissUI = useCallback(() => {
    setState((prev) => ({ ...prev, uiDismissed: true }));
  }, []);

  const restoreUI = useCallback(() => {
    setState((prev) => ({ ...prev, uiDismissed: false }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh: ExplorationProgressState = {
      version: EXPLORATION_VERSION,
      discovered: {},
      milestones: {},
      firstVisitDismissed: false,
      uiDismissed: false,
      lastVisitedId: null,
      lastVisitedTimestamp: Date.now()
    };
    try {
      localStorage.removeItem(EXPLORATION_STORAGE_KEY);
      localStorage.removeItem(DISMISSED_KEY);
    } catch {
      // ignore
    }
    setState(fresh);
    setActiveToast(null);
  }, []);

  // Compute category breakdown
  const categories = useMemo<ExplorationCategorySummary[]>(() => {
    const categoryOrder: ExplorationCategory[] = ['WORK', 'PLAY', 'STACK', 'PERSON'];
    const categoryLabels: Record<ExplorationCategory, string> = {
      WORK: 'WORK',
      PLAY: 'PLAY',
      STACK: 'STACK',
      PERSON: 'PERSON'
    };

    return categoryOrder.map((cat) => {
      const itemsInCat = EXPLORATION_ITEMS.filter((item) => item.category === cat);
      const itemsWithStatus = itemsInCat.map((item) => ({
        ...item,
        isDiscovered: Boolean(state.discovered[item.id])
      }));
      const discoveredCount = itemsWithStatus.filter((i) => i.isDiscovered).length;

      return {
        category: cat,
        categoryLabel: categoryLabels[cat],
        color: CATEGORY_COLORS[cat].primary,
        discoveredCount,
        totalCount: itemsInCat.length,
        items: itemsWithStatus
      };
    });
  }, [state.discovered]);

  const totalDiscovered = useMemo(() => {
    return Object.values(state.discovered).filter(Boolean).length;
  }, [state.discovered]);

  const totalItems = EXPLORATION_ITEMS.length;
  const isAllDiscovered = totalDiscovered >= totalItems;

  // Window event listeners for global interactions & command center
  useEffect(() => {
    const handleOpenPanel = () => setIsPanelOpen(true);
    const handleClosePanel = () => setIsPanelOpen(false);
    const handleTogglePanel = () => setIsPanelOpen((prev) => !prev);

    const handleCustomMark = (e: Event) => {
      const ce = e as CustomEvent<{ id: string; milestoneId?: string }>;
      if (ce.detail?.id) {
        markDiscovered(ce.detail.id, { triggerMilestoneId: ce.detail.milestoneId });
      }
    };

    const handleCaseStudy = () => {
      markDiscovered('exp-case-studies', { triggerMilestoneId: 'ms-project-diver' });
    };

    const handlePathSelected = (e: Event) => {
      const ce = e as CustomEvent<{ pathId?: string }>;
      markMilestone('ms-path-chosen');
      if (ce.detail?.pathId) {
        if (ce.detail.pathId === 'work') {
          markDiscovered('exp-work');
        } else if (ce.detail.pathId === 'stack') {
          markDiscovered('exp-tech-universe');
        } else if (ce.detail.pathId === 'person') {
          markDiscovered('exp-about');
        }
      }
    };

    const handleSystemBuilderEntered = () => {
      markDiscovered('exp-system-builder', { triggerMilestoneId: 'ms-system-thinker' });
    };

    const handleCodeReactorEntered = () => {
      markDiscovered('exp-code-reactor', { triggerMilestoneId: 'ms-code-mode' });
    };

    const handleTechDetectiveEntered = () => {
      markDiscovered('exp-tech-detective', { triggerMilestoneId: 'ms-stack-trace' });
    };

    const handleSystemMapEntered = () => {
      markDiscovered('exp-system-map', { triggerMilestoneId: 'ms-map-explorer' });
    };

    const handleAlgorithmEscapeEntered = () => {
      markDiscovered('exp-algorithm-escape', { triggerMilestoneId: 'ms-puzzle-resolver' });
    };

    window.addEventListener('open-exploration-panel', handleOpenPanel);
    window.addEventListener('close-exploration-panel', handleClosePanel);
    window.addEventListener('toggle-exploration-panel', handleTogglePanel);
    window.addEventListener('kartik-exploration-mark', handleCustomMark);
    window.addEventListener('open-case-study', handleCaseStudy);
    window.addEventListener('kartik-path-selected', handlePathSelected);
    window.addEventListener('system-builder-entered', handleSystemBuilderEntered);
    window.addEventListener('code-reactor-entered', handleCodeReactorEntered);
    window.addEventListener('tech-detective-entered', handleTechDetectiveEntered);
    window.addEventListener('system-map-entered', handleSystemMapEntered);
    window.addEventListener('algorithm-escape-entered', handleAlgorithmEscapeEntered);

    return () => {
      window.removeEventListener('open-exploration-panel', handleOpenPanel);
      window.removeEventListener('close-exploration-panel', handleClosePanel);
      window.removeEventListener('toggle-exploration-panel', handleTogglePanel);
      window.removeEventListener('kartik-exploration-mark', handleCustomMark);
      window.removeEventListener('open-case-study', handleCaseStudy);
      window.removeEventListener('kartik-path-selected', handlePathSelected);
      window.removeEventListener('system-builder-entered', handleSystemBuilderEntered);
      window.removeEventListener('code-reactor-entered', handleCodeReactorEntered);
      window.removeEventListener('tech-detective-entered', handleTechDetectiveEntered);
      window.removeEventListener('system-map-entered', handleSystemMapEntered);
      window.removeEventListener('algorithm-escape-entered', handleAlgorithmEscapeEntered);
    };
  }, [markDiscovered, markMilestone]);

  // Meaningful dwell observer for static DOM sections:
  // Requires 25% intersection for >= 1.2s before marking discovered
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Trigger First Step milestone once hero is loaded via microtask
    let heroTimer: ReturnType<typeof setTimeout> | null = null;
    if (!state.milestones['ms-first-step']) {
      heroTimer = setTimeout(() => {
        const heroEl = document.getElementById('hero');
        if (heroEl) {
          markMilestone('ms-first-step');
        }
      }, 500);
    }

    const timerMap = timerMapRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.id;
          if (!targetId) return;

          // Find items with this targetId
          const matchingItems = EXPLORATION_ITEMS.filter((i) => i.targetId === targetId);
          if (matchingItems.length === 0) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            // Start dwell timer if not already set and not discovered
            if (!timerMap.has(targetId)) {
              const timer = setTimeout(() => {
                matchingItems.forEach((item) => {
                  // For non-interactive items or general view
                  if (!item.isInteractive) {
                    markDiscovered(item.id);
                  }
                });
                timerMap.delete(targetId);
              }, 1200); // 1.2s meaningful dwell
              timerMap.set(targetId, timer);
            }
          } else {
            // User scrolled away before 1.2s: cancel timer
            const existingTimer = timerMap.get(targetId);
            if (existingTimer) {
              clearTimeout(existingTimer);
              timerMap.delete(targetId);
            }
          }
        });
      },
      {
        threshold: [0.25]
      }
    );

    // Observe all unique target elements present in DOM
    const uniqueTargetIds = Array.from(new Set(EXPLORATION_ITEMS.map((i) => i.targetId)));
    uniqueTargetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (heroTimer) clearTimeout(heroTimer);
      observer.disconnect();
      timerMap.forEach((t) => clearTimeout(t));
      timerMap.clear();
    };
  }, [markDiscovered, markMilestone, state.milestones]);

  // Development debug helper
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__KARTIK_EXPLORE_DEBUG__ = {
        getState: () => state,
        categories,
        totalDiscovered,
        totalItems,
        markDiscovered,
        markMilestone,
        resetProgress
      };
    }
  }, [state, categories, totalDiscovered, totalItems, markDiscovered, markMilestone, resetProgress]);

  return {
    state,
    categories,
    totalDiscovered,
    totalItems,
    isAllDiscovered,
    isPanelOpen,
    activeToast,
    setIsPanelOpen,
    openPanel: () => setIsPanelOpen(true),
    closePanel: () => setIsPanelOpen(false),
    togglePanel: () => setIsPanelOpen((prev) => !prev),
    markDiscovered,
    markMilestone,
    isDiscovered,
    dismissMilestoneToast,
    dismissFirstVisit,
    dismissUI,
    restoreUI,
    resetProgress
  };
}

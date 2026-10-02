import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Network,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import type {
  DetectiveState,
  ConstellationNode,
  DetectiveSessionProgress
} from '../../types/techStackDetective';
import {
  STACK_CASES,
  DETECTIVE_STORAGE_KEY
} from '../../data/techStackCases';
import { DetectiveIntro } from './DetectiveIntro';
import { EvidencePanel } from './EvidencePanel';
import { QuestionPanel } from './QuestionPanel';
import { StackTraceCore } from './StackTraceCore';
import { InvestigationComplete } from './InvestigationComplete';
import { TechnologyConstellation } from './TechnologyConstellation';
import { TechnologyInspector } from './TechnologyInspector';
import { playPathFeedback } from '../../utils/audioFeedback';

interface TechStackDetectiveProps {
  reducedMotion?: boolean;
}

export function TechStackDetective({ reducedMotion = false }: TechStackDetectiveProps) {
  // Session progress loaded from localStorage
  const [progress, setProgress] = useState<DetectiveSessionProgress>(() => {
    try {
      const stored = localStorage.getItem(DETECTIVE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Graceful fallback
    }
    return {
      currentCaseIndex: 0,
      completedCaseIds: [],
      discoveredTechs: [],
      hintsUsed: 0,
      attemptsPerCase: {},
      hasRevealedAnswer: {},
      isComplete: false,
      hasStarted: false
    };
  });

  // Current view state: 'INTRO' | 'INVESTIGATING' | 'COMPLETE' | 'CONSTELLATION'
  const [viewMode, setViewMode] = useState<'INTRO' | 'INVESTIGATING' | 'COMPLETE' | 'CONSTELLATION'>(() => {
    if (progress.isComplete) return 'COMPLETE';
    if (progress.hasStarted) return 'INVESTIGATING';
    return 'INTRO';
  });

  // Question answer state for active case
  const [activeCaseState, setActiveCaseState] = useState<DetectiveState>('INVESTIGATING');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [inspectedNode, setInspectedNode] = useState<ConstellationNode | null>(null);
  const [hintsRevealedMap, setHintsRevealedMap] = useState<Record<string, number>>({});

  const activeCase = STACK_CASES[progress.currentCaseIndex] || STACK_CASES[0];
  const currentAttempts = progress.attemptsPerCase[activeCase.id] || 0;
  const hasRevealedCurrent = progress.hasRevealedAnswer[activeCase.id] || false;
  const currentHintsRevealed = hintsRevealedMap[activeCase.id] || 0;

  // Persist session to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DETECTIVE_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  // Sync state when active case changes
  useEffect(() => {
    if (progress.completedCaseIds.includes(activeCase.id)) {
      setActiveCaseState('VERIFIED');
      setSelectedOptionId(activeCase.correctAnswerId);
    } else {
      setActiveCaseState('INVESTIGATING');
      setSelectedOptionId(null);
    }
  }, [activeCase.id, progress.completedCaseIds, activeCase.correctAnswerId]);

  // Handle Option selection
  const handleSelectOption = (optionId: string) => {
    if (activeCaseState === 'VERIFIED') return;
    setSelectedOptionId(optionId);
    if (activeCaseState === 'FAILED') {
      setActiveCaseState('INVESTIGATING');
    }
  };

  // Submit Answer Verification
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || activeCaseState === 'VERIFIED') return;

    if (selectedOptionId === activeCase.correctAnswerId) {
      // Success: Correct answer
      playPathFeedback('correct');
      setActiveCaseState('VERIFIED');

      setProgress((prev) => {
        const nextCompleted = prev.completedCaseIds.includes(activeCase.id)
          ? prev.completedCaseIds
          : [...prev.completedCaseIds, activeCase.id];

        const nextTechs = prev.discoveredTechs.includes(activeCase.technology)
          ? prev.discoveredTechs
          : [...prev.discoveredTechs, activeCase.technology];

        const isAllDone = nextCompleted.length === STACK_CASES.length;

        return {
          ...prev,
          completedCaseIds: nextCompleted,
          discoveredTechs: nextTechs,
          isComplete: isAllDone
        };
      });
    } else {
      // Failure: Incorrect answer
      playPathFeedback('error');
      setActiveCaseState('FAILED');

      setProgress((prev) => ({
        ...prev,
        attemptsPerCase: {
          ...prev.attemptsPerCase,
          [activeCase.id]: (prev.attemptsPerCase[activeCase.id] || 0) + 1
        }
      }));
    }
  };

  // Retry after incorrect answer
  const handleRetry = () => {
    setSelectedOptionId(null);
    setActiveCaseState('INVESTIGATING');
  };

  // Reveal Answer (after 2 attempts)
  const handleRevealAnswer = () => {
    playPathFeedback('select');
    setActiveCaseState('VERIFIED');
    setSelectedOptionId(activeCase.correctAnswerId);

    setProgress((prev) => {
      const nextCompleted = prev.completedCaseIds.includes(activeCase.id)
        ? prev.completedCaseIds
        : [...prev.completedCaseIds, activeCase.id];

      const nextTechs = prev.discoveredTechs.includes(activeCase.technology)
        ? prev.discoveredTechs
        : [...prev.discoveredTechs, activeCase.technology];

      return {
        ...prev,
        completedCaseIds: nextCompleted,
        discoveredTechs: nextTechs,
        hasRevealedAnswer: {
          ...prev.hasRevealedAnswer,
          [activeCase.id]: true
        },
        isComplete: nextCompleted.length === STACK_CASES.length
      };
    });
  };

  // Request an educational hint
  const handleRequestHint = () => {
    const current = hintsRevealedMap[activeCase.id] || 0;
    if (current < activeCase.hints.length) {
      setHintsRevealedMap((prev) => ({
        ...prev,
        [activeCase.id]: current + 1
      }));
      setProgress((prev) => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1
      }));
    }
  };

  // Advance to next case or complete
  const handleNextCase = () => {
    if (progress.currentCaseIndex < STACK_CASES.length - 1) {
      setProgress((prev) => ({
        ...prev,
        currentCaseIndex: prev.currentCaseIndex + 1
      }));
    } else {
      // Completed all cases
      playPathFeedback('complete');
      setViewMode('COMPLETE');
      setProgress((prev) => ({
        ...prev,
        isComplete: true
      }));
    }
  };

  // Jump to specific case from progression scrubber
  const handleSelectCaseIndex = (index: number) => {
    playPathFeedback('tick');
    setProgress((prev) => ({
      ...prev,
      currentCaseIndex: index
    }));
  };

  // Reset investigation session
  const handleReset = () => {
    try {
      localStorage.removeItem(DETECTIVE_STORAGE_KEY);
    } catch {}

    setProgress({
      currentCaseIndex: 0,
      completedCaseIds: [],
      discoveredTechs: [],
      hintsUsed: 0,
      attemptsPerCase: {},
      hasRevealedAnswer: {},
      isComplete: false,
      hasStarted: false
    });
    setHintsRevealedMap({});
    setSelectedOptionId(null);
    setActiveCaseState('INVESTIGATING');
    setViewMode('INTRO');
  };

  // Project navigation integration (Section 27)
  const handleViewProject = (projectId: string) => {
    window.dispatchEvent(
      new CustomEvent('open-case-study', { detail: { projectId } })
    );
    const el = document.getElementById(projectId) || document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // System Builder integration (Section 25)
  const handleOpenSystemBuilder = (presetId?: string) => {
    if (presetId) {
      window.dispatchEvent(
        new CustomEvent('system-builder-select-preset', { detail: { presetId } })
      );
    }
    const el = document.getElementById('system-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Code Reactor navigation integration (Section 26)
  const handleOpenCodeReactor = () => {
    const el = document.getElementById('code-reactor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Tech Universe navigation
  const handleExploreStack = () => {
    const el = document.getElementById('stack');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Flagship projects navigation
  const handleExploreProjects = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Navigation Bar when inside investigation or constellation */}
      {viewMode !== 'INTRO' && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playPathFeedback('tick');
                setViewMode('INTRO');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO DOSSIER INTRO</span>
            </button>

            {viewMode === 'INVESTIGATING' ? (
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  setViewMode('CONSTELLATION');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-colors cursor-pointer"
              >
                <Network className="w-3.5 h-3.5" />
                <span>OPEN CONSTELLATION MATRIX</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  setViewMode('INVESTIGATING');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>RESUME CASE FILES</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              handleReset();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            title="Reset current investigation progress"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET SESSION</span>
          </button>
        </div>
      )}

      {/* Main Dynamic View Modes */}
      <AnimatePresence mode="wait">
        {viewMode === 'INTRO' && (
          <motion.div
            key="view-intro"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DetectiveIntro
              hasStarted={progress.hasStarted}
              completedCasesCount={progress.completedCaseIds.length}
              totalCasesCount={STACK_CASES.length}
              onStart={() => {
                setProgress((prev) => ({ ...prev, hasStarted: true }));
                setViewMode('INVESTIGATING');
              }}
              onResume={() => setViewMode('INVESTIGATING')}
              onOpenConstellation={() => setViewMode('CONSTELLATION')}
              onReset={handleReset}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        )}

        {viewMode === 'INVESTIGATING' && (
          <motion.div
            key="view-investigating"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Desktop: 2-3 Column Forensic Layout | Mobile: Single Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Evidence Dossier & Hints (4 Cols) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6 order-2 lg:order-1">
                <EvidencePanel
                  activeCase={activeCase}
                  hintsRevealed={currentHintsRevealed}
                  onRequestHint={handleRequestHint}
                  reducedMotion={reducedMotion}
                />

                <StackTraceCore
                  cases={STACK_CASES}
                  currentCaseIndex={progress.currentCaseIndex}
                  completedCaseIds={progress.completedCaseIds}
                  discoveredTechs={progress.discoveredTechs}
                  hintsUsed={progress.hintsUsed}
                  onSelectCaseIndex={handleSelectCaseIndex}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Right Column: Question & Conclusion Terminal (8 Cols) */}
              <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
                <QuestionPanel
                  activeCase={activeCase}
                  selectedOptionId={selectedOptionId}
                  onSelectOption={handleSelectOption}
                  onSubmitAnswer={handleSubmitAnswer}
                  onRetry={handleRetry}
                  onRevealAnswer={handleRevealAnswer}
                  onNextCase={handleNextCase}
                  onViewProject={handleViewProject}
                  onOpenSystemBuilder={handleOpenSystemBuilder}
                  state={activeCaseState}
                  attemptsCount={currentAttempts}
                  hasRevealed={hasRevealedCurrent}
                  isLastCase={progress.currentCaseIndex === STACK_CASES.length - 1}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'COMPLETE' && (
          <motion.div
            key="view-complete"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <InvestigationComplete
              completedCasesCount={progress.completedCaseIds.length}
              totalCasesCount={STACK_CASES.length}
              hintsUsed={progress.hintsUsed}
              discoveredTechs={progress.discoveredTechs}
              onExploreProjects={handleExploreProjects}
              onExploreStack={handleExploreStack}
              onOpenSystemBuilder={handleOpenSystemBuilder}
              onOpenCodeReactor={handleOpenCodeReactor}
              onReset={handleReset}
              onOpenConstellation={() => setViewMode('CONSTELLATION')}
              reducedMotion={reducedMotion}
            />

            {/* Embedded Constellation right below completion screen */}
            <TechnologyConstellation
              onSelectNode={(node) => setInspectedNode(node)}
              onViewProject={handleViewProject}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        )}

        {viewMode === 'CONSTELLATION' && (
          <motion.div
            key="view-constellation"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TechnologyConstellation
              onSelectNode={(node) => setInspectedNode(node)}
              onViewProject={handleViewProject}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technology Detail Profile Modal */}
      <TechnologyInspector
        node={inspectedNode}
        onClose={() => setInspectedNode(null)}
        onViewProject={handleViewProject}
        onOpenSystemBuilder={handleOpenSystemBuilder}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

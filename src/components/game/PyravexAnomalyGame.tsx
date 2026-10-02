import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Satellite,
  Radio,
  Clock,
  Target,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  RefreshCw,
  Layers
} from 'lucide-react';
import { PYRAVEX_SCENARIOS } from '../../data/pyravexScenario';
import { MissionIntro } from './MissionIntro';
import { SatelliteConsoleMap } from './SatelliteConsoleMap';
import { SignalInvestigationPanel } from './SignalInvestigationPanel';
import { MissionResultModal } from './MissionResultModal';
import { PyravexExplanation } from './PyravexExplanation';
import type { GameStatus, ThermalSignal } from '../../types/pyravexGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface PyravexAnomalyGameProps {
  reducedMotion?: boolean;
}

export function PyravexAnomalyGame({ reducedMotion = false }: PyravexAnomalyGameProps) {
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('INTRO');
  const [selectedSignal, setSelectedSignal] = useState<ThermalSignal | null>(null);
  const [investigatedSignalIds, setInvestigatedSignalIds] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [attemptsCount, setAttemptsCount] = useState<number>(0);
  const [submittedSignal, setSubmittedSignal] = useState<ThermalSignal | null>(null);
  const [isSuccessResult, setIsSuccessResult] = useState<boolean>(false);

  const scenario = PYRAVEX_SCENARIOS[scenarioIndex];

  // Stopwatch timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Start mission
  const handleStartMission = useCallback(() => {
    setStatus('SCANNING');
    setSelectedSignal(null);
    setInvestigatedSignalIds([]);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setAttemptsCount(0);
    setSubmittedSignal(null);
    window.dispatchEvent(
      new CustomEvent('kartik-exploration-mark', {
        detail: { id: 'exp-pyravex-mission', milestoneId: 'ms-anomaly-hunter' }
      })
    );
  }, []);

  // Cycle scenario for replayability
  const handleCycleScenario = useCallback(() => {
    setScenarioIndex((prev) => (prev + 1) % PYRAVEX_SCENARIOS.length);
    handleStartMission();
  }, [handleStartMission]);

  // Select signal on map
  const handleSelectSignal = useCallback((signal: ThermalSignal) => {
    setSelectedSignal(signal);
    setStatus('INVESTIGATING');
    setInvestigatedSignalIds((prev) => (prev.includes(signal.id) ? prev : [...prev, signal.id]));
  }, []);

  // Close investigation panel
  const handleCloseInvestigation = useCallback(() => {
    setSelectedSignal(null);
    setStatus('SCANNING');
  }, []);

  // Submit anomaly decision
  const handleConfirmAnomaly = useCallback((signal: ThermalSignal) => {
    setSubmittedSignal(signal);
    setAttemptsCount((prev) => prev + 1);

    if (signal.isAnomaly) {
      // Success! Stop timer
      setIsTimerRunning(false);
      setIsSuccessResult(true);
      setStatus('CONFIRMATION_SUCCESS');
      playPathFeedback('select');
    } else {
      // Wrong selection
      setIsSuccessResult(false);
      setStatus('CONFIRMATION_FAILURE');
      playPathFeedback('tick');
    }
  }, []);

  // Dismiss wrong result modal
  const handleDismissWrong = useCallback(() => {
    setSubmittedSignal(null);
    setStatus('SCANNING');
  }, []);

  // Advance from success modal to PYRAVEX architectural explanation
  const handleContinueToExplanation = useCallback(() => {
    setStatus('COMPLETE');
  }, []);

  // Keyboard accessibility listeners (1-6 keys, Arrow keys, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'SCANNING' && status !== 'INVESTIGATING') return;

      // Escape closes current panel
      if (e.key === 'Escape' && selectedSignal) {
        handleCloseInvestigation();
        return;
      }

      // Number keys 1-6 select signal
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= scenario.signals.length) {
        const targetSig = scenario.signals[num - 1];
        if (targetSig) {
          handleSelectSignal(targetSig);
          playPathFeedback('tick');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, selectedSignal, scenario.signals, handleCloseInvestigation, handleSelectSignal]);

  // Calculate score
  const simulationScore = Math.max(
    300,
    1000 - Math.min(600, timerSeconds * 4) - Math.max(0, (attemptsCount - 1) * 120)
  );

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full font-mono select-none">
      {/* 1. INTRO STATE */}
      {status === 'INTRO' && (
        <MissionIntro onStartMission={handleStartMission} reducedMotion={reducedMotion} />
      )}

      {/* 2. ACTIVE GAMEPLAY (SCANNING & INVESTIGATING) */}
      {(status === 'SCANNING' || status === 'INVESTIGATING') && (
        <div className="space-y-4">
          {/* Tactical HUD Header Bar */}
          <div className="p-4 rounded-2xl bg-[#080D16]/95 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Mission Identifier */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#05070B] border border-blue-500/30">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span>PYRAVEX CONSOLE</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-blue-400 font-bold">{scenario.missionNumber}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-amber-400 font-semibold text-[9px] uppercase">
                    SCENARIO {scenarioIndex + 1}/{PYRAVEX_SCENARIOS.length}
                  </span>
                </div>
                <div className="text-sm font-heading font-black text-white">
                  {scenario.title}
                </div>
              </div>
            </div>

            {/* Live Metrics: Signals, Anomalies, Timer */}
            <div className="flex items-center gap-2.5 sm:gap-4 text-[11px]">
              <div className="px-3 py-1.5 rounded-xl bg-[#05070B] border border-slate-800">
                <span className="text-slate-400 text-[9px] block">OBSERVATIONS</span>
                <span className="font-bold text-white">
                  {investigatedSignalIds.length} / {scenario.signals.length} INSPECTED
                </span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-[#05070B] border border-slate-800">
                <span className="text-slate-400 text-[9px] block">ELAPSED TIME</span>
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(timerSeconds)}</span>
                </span>
              </div>

              {/* Scenario Switcher Button */}
              {PYRAVEX_SCENARIOS.length > 1 && (
                <button
                  type="button"
                  onClick={handleCycleScenario}
                  data-cursor="pointer"
                  title="Switch training scenario"
                  aria-label="Switch training scenario"
                  className="p-2 rounded-xl bg-[#05070B] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden md:inline">ROTATE</span>
                </button>
              )}

              {/* Restart Simulation */}
              <button
                type="button"
                onClick={handleStartMission}
                data-cursor="pointer"
                title="Restart simulation"
                aria-label="Restart simulation"
                className="p-2 rounded-xl bg-[#05070B] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Geospatial Satellite Radar Map */}
          <SatelliteConsoleMap
            signals={scenario.signals}
            selectedSignal={selectedSignal}
            investigatedSignalIds={investigatedSignalIds}
            onSelectSignal={handleSelectSignal}
            reducedMotion={reducedMotion}
          />

          {/* Active Signal Investigation Panel Drawer */}
          <AnimatePresence>
            {selectedSignal && (
              <SignalInvestigationPanel
                signal={selectedSignal}
                onConfirmAnomaly={handleConfirmAnomaly}
                onDismiss={handleCloseInvestigation}
                reducedMotion={reducedMotion}
              />
            )}
          </AnimatePresence>

          {/* Quick Helper Banner */}
          {!selectedSignal && (
            <div className="p-3.5 rounded-xl bg-[#080D16]/90 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Select any observation pin on the map (or from the list) to inspect its 7-day thermal timeline, persistence, and contextual classification.
                </span>
              </div>
              <span className="text-[9px] text-slate-400 hidden sm:inline uppercase font-bold">
                TRAINING SIMULATION
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3. CONFIRMATION OUTCOME MODALS (SUCCESS OR WRONG SELECTION) */}
      <AnimatePresence>
        {(status === 'CONFIRMATION_SUCCESS' || status === 'CONFIRMATION_FAILURE') && submittedSignal && (
          <MissionResultModal
            isSuccess={isSuccessResult}
            signal={submittedSignal}
            timerSeconds={timerSeconds}
            investigatedCount={investigatedSignalIds.length}
            totalSignalsCount={scenario.signals.length}
            simulationScore={simulationScore}
            onRetry={handleCycleScenario}
            onContinueToExplanation={handleContinueToExplanation}
            onDismissWrongSelection={handleDismissWrong}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* 4. POST-GAME PYRAVEX ARCHITECTURAL EXPLANATION */}
      {status === 'COMPLETE' && (
        <PyravexExplanation onPlayAgain={handleCycleScenario} reducedMotion={reducedMotion} />
      )}
    </div>
  );
}

export default PyravexAnomalyGame;

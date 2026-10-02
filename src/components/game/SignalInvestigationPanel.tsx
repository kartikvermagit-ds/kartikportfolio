import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  X,
  TrendingUp,
  Activity,
  Compass,
  Flame,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import type { ThermalSignal } from '../../types/pyravexGame';
import { HistoricalTrendChart } from './HistoricalTrendChart';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SignalInvestigationPanelProps {
  signal: ThermalSignal;
  onConfirmAnomaly: (signal: ThermalSignal) => void;
  onDismiss: () => void;
  reducedMotion?: boolean;
}

export function SignalInvestigationPanel({
  signal,
  onConfirmAnomaly,
  onDismiss,
  reducedMotion = false
}: SignalInvestigationPanelProps) {
  const isSurge = signal.recentChangePercent > 50;
  const accent = isSurge ? '#EF4444' : '#3B82F6';

  const handleMark = () => {
    playPathFeedback('select');
    onConfirmAnomaly(signal);
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      className="p-5 sm:p-6 rounded-2xl bg-[#080D16]/98 border backdrop-blur-md shadow-2xl relative select-none font-mono"
      style={{
        borderColor: `${accent}70`,
        boxShadow: `0 0 35px ${accent}20, 0 15px 35px rgba(0,0,0,0.7)`
      }}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}40`
              }}
            >
              {signal.code}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              INVESTIGATION DOSSIER
            </span>
          </div>
          <h4 className="text-lg font-heading font-black text-white">
            {signal.name} — {signal.region}
          </h4>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close investigation panel"
          data-cursor="pointer"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Key Telemetry Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 text-xs">
        {/* 1. Temperature */}
        <div className="p-2.5 rounded-xl bg-[#05070B] border border-slate-800">
          <span className="text-[9px] text-slate-400 block mb-1">BRIGHTNESS TEMP</span>
          <span className="text-base font-bold text-white flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{signal.currentTempKelvin} K</span>
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 block">
            {signal.intensityPercent}% Intensity
          </span>
        </div>

        {/* 2. Persistence */}
        <div className="p-2.5 rounded-xl bg-[#05070B] border border-slate-800">
          <span className="text-[9px] text-slate-400 block mb-1">PERSISTENCE</span>
          <span className="text-base font-bold text-white flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>{signal.persistencePercent}%</span>
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 block">
            {signal.persistencePercent > 70 ? 'High Nocturnal' : 'Diurnal / Periodic'}
          </span>
        </div>

        {/* 3. Recent Change */}
        <div className="p-2.5 rounded-xl bg-[#05070B] border border-slate-800">
          <span className="text-[9px] text-slate-400 block mb-1">7-DAY DELTA</span>
          <span
            className="text-base font-bold flex items-center gap-1"
            style={{ color: isSurge ? '#EF4444' : '#34D399' }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{signal.recentChangePercent > 0 ? `+${signal.recentChangePercent}%` : `${signal.recentChangePercent}%`}</span>
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 block">
            {isSurge ? 'RAPID SURGE' : 'Within baseline'}
          </span>
        </div>

        {/* 4. Pattern */}
        <div className="p-2.5 rounded-xl bg-[#05070B] border border-slate-800">
          <span className="text-[9px] text-slate-400 block mb-1">HISTORICAL PATTERN</span>
          <span
            className="text-sm font-bold truncate block"
            style={{ color: signal.historicalPattern === 'UNUSUAL' ? '#EF4444' : '#94A3B8' }}
          >
            {signal.historicalPattern}
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 block truncate">
            {signal.coordinates.lat}, {signal.coordinates.lon}
          </span>
        </div>
      </div>

      {/* 7-Day Historical Trend Bar Chart */}
      <div className="mb-5">
        <HistoricalTrendChart
          readings={signal.historicalReadings}
          isAnomalySignal={signal.isAnomaly}
          accentColor={accent}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Evaluation Assessment Card */}
      <div className="p-3 rounded-xl bg-[#05070B] border border-slate-800 text-xs mb-5">
        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
          <Compass className="w-3 h-3 text-blue-400" />
          <span>SATELLITE INTELLIGENCE ASSESSMENT NOTE</span>
        </div>
        <p className="text-slate-300 font-sans text-xs leading-relaxed">
          {signal.evaluationNote}
        </p>
      </div>

      {/* Action Decision Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <button
          type="button"
          onClick={onDismiss}
          data-cursor="pointer"
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#05070B] border border-slate-800 hover:border-slate-700 transition-colors"
        >
          ← KEEP INVESTIGATING OTHER SIGNALS
        </button>

        <button
          type="button"
          onClick={handleMark}
          data-cursor="pointer"
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            backgroundColor: '#DC2626',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)'
          }}
        >
          <ShieldAlert className="w-4 h-4 text-white" />
          <span>MARK AS THE ANOMALY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default SignalInvestigationPanel;

import React from 'react';
import { motion } from 'framer-motion';

interface HistoricalTrendChartProps {
  readings: number[]; // 7 numbers (0-100 scale)
  isAnomalySignal?: boolean;
  accentColor?: string;
  reducedMotion?: boolean;
}

export function HistoricalTrendChart({
  readings,
  isAnomalySignal = false,
  accentColor = '#3B82F6',
  reducedMotion = false
}: HistoricalTrendChartProps) {
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7 (Today)'];

  return (
    <div className="w-full p-3.5 rounded-xl bg-[#05070B] border border-slate-800 font-mono select-none">
      {/* Chart Header */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3 pb-1.5 border-b border-slate-850">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span>7-DAY SATELLITE OBSERVATION TIMELINE</span>
        </span>
        <span className="text-[9px] text-slate-500 uppercase">
          {isAnomalySignal ? 'ALERT: ANOMALOUS SURGE' : 'BASELINE STABLE'}
        </span>
      </div>

      {/* SVG Bar Chart with Historical Trend Curve */}
      <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-24 px-1 pb-1">
        {readings.map((val, idx) => {
          const heightPercent = Math.max(12, Math.min(100, val));
          const isSurge = isAnomalySignal && idx >= 3;
          const barColor = isSurge ? '#EF4444' : isAnomalySignal && idx >= 2 ? '#F59E0B' : accentColor;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
              {/* Tooltip on Hover */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-slate-750 px-1.5 py-0.5 rounded text-[9px] text-white pointer-events-none whitespace-nowrap z-10">
                {val}% signal
              </div>

              {/* Bar Metric Value */}
              <span className="text-[8px] text-slate-400 mb-1">
                {val}
              </span>

              {/* Animated Bar Column */}
              <motion.div
                initial={reducedMotion ? { height: `${heightPercent}%` } : { height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="w-full rounded-t-md relative overflow-hidden transition-colors"
                style={{
                  backgroundColor: barColor,
                  boxShadow: isSurge ? '0 0 10px rgba(239, 68, 68, 0.4)' : undefined
                }}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/25 pointer-events-none" />
              </motion.div>

              {/* Day Label */}
              <span className="text-[8px] text-slate-400 mt-1.5 truncate max-w-full">
                D{idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend / Interpretation Footer */}
      <div className="mt-2 pt-2 border-t border-slate-850 flex items-center justify-between text-[9px] text-slate-400">
        <span>T-6 Days ago</span>
        <span className="text-slate-400">→ Observation Direction →</span>
        <span className="font-semibold text-slate-300">T-0 (Latest Pass)</span>
      </div>
    </div>
  );
}

export default HistoricalTrendChart;

import React from 'react';

interface TypingGraphProps {
  wpmHistory: number[];
  reducedMotion?: boolean;
}

export const TypingGraph: React.FC<TypingGraphProps> = ({
  wpmHistory,
  reducedMotion = false
}) => {
  if (wpmHistory.length < 2) {
    return null;
  }

  const maxWpm = Math.max(...wpmHistory, 60);
  const minWpm = Math.min(...wpmHistory.filter((w) => w > 0), 20);
  const range = Math.max(maxWpm - minWpm, 20);

  const width = 500;
  const height = 120;
  const paddingX = 30;
  const paddingY = 20;

  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  // Build points for SVG path
  const points = wpmHistory.map((val, idx) => {
    const x = paddingX + (idx / (wpmHistory.length - 1)) * graphWidth;
    const normalizedY = (val - minWpm) / range;
    const y = height - paddingY - normalizedY * graphHeight;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  // Fill gradient path
  const fillD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${paddingX},${height - paddingY} Z`;

  return (
    <div className="w-full flex flex-col gap-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs select-none">
      <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
        <span>SESSION SPEED CONSISTENCY</span>
        <span className="text-blue-400">PEAK: {Math.max(...wpmHistory)} WPM</span>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-24 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wpmGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Guideline */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="rgba(255, 255, 255, 0.1)"
          />

          {/* Area Fill */}
          <path d={fillD} fill="url(#wpmGradient)" />

          {/* Sparkline Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={reducedMotion ? '' : 'transition-all duration-300'}
          />

          {/* Peak Point Dot */}
          {points.map((pt, i) => {
            if (pt.val === Math.max(...wpmHistory)) {
              return (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="#60A5FA"
                  stroke="#1D4ED8"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
        <span>0s</span>
        <span>DURATION: {wpmHistory.length}s</span>
      </div>
    </div>
  );
};

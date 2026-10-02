import React from 'react';
import type { PathId, PathItem } from '../../types/path';

interface PathConnectionsProps {
  activePath: PathItem | null;
  hoveredPath: PathItem | null;
  reducedMotion?: boolean;
}

export function PathConnections({
  activePath,
  hoveredPath,
  reducedMotion = false
}: PathConnectionsProps) {
  const currentPath = hoveredPath || activePath;

  // Path coordinates connecting Center (500, 340) to nodes
  // Top: WORK (500, 130)
  // Left: PLAY (220, 340)
  // Right: STACK (780, 340)
  // Bottom: PERSON (500, 550)

  const lineDefs: Record<PathId, { d: string; id: string; targetAngle: number }> = {
    work: {
      d: 'M 500 275 L 500 145',
      id: 'conn-work',
      targetAngle: -90
    },
    play: {
      d: 'M 410 340 L 260 340',
      id: 'conn-play',
      targetAngle: 180
    },
    stack: {
      d: 'M 590 340 L 740 340',
      id: 'conn-stack',
      targetAngle: 0
    },
    person: {
      d: 'M 500 405 L 500 535',
      id: 'conn-person',
      targetAngle: 90
    }
  };

  return (
    <svg
      viewBox="0 0 1000 680"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="line-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="line-glow-amber" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="line-glow-purple" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="line-glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Linear Gradients for inactive lines */}
        <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Decorative Circuit Grid Backdrop */}
      <circle cx="500" cy="340" r="170" fill="none" stroke="rgba(51,65,85,0.18)" strokeDasharray="3 6" />
      <circle cx="500" cy="340" r="260" fill="none" stroke="rgba(51,65,85,0.12)" strokeDasharray="4 8" />

      {/* Diagonal Technical Bus Cross-Hairs */}
      <line x1="380" y1="220" x2="430" y2="270" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="620" y1="220" x2="570" y2="270" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="380" y1="460" x2="430" y2="410" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="620" y1="460" x2="570" y2="410" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />

      {/* Render the 4 main connection lines */}
      {(Object.entries(lineDefs) as [PathId, typeof lineDefs[PathId]][]).map(([key, def]) => {
        const isSelected = currentPath?.id === key;
        const color = isSelected ? currentPath.color : 'rgba(51, 65, 85, 0.4)';
        const filterId =
          key === 'work'
            ? 'line-glow-blue'
            : key === 'play'
            ? 'line-glow-amber'
            : key === 'stack'
            ? 'line-glow-purple'
            : 'line-glow-emerald';

        return (
          <g key={key}>
            {/* Primary Base Line */}
            <path
              id={def.id}
              d={def.d}
              fill="none"
              stroke={color}
              strokeWidth={isSelected ? '2.5' : '1.5'}
              strokeDasharray={isSelected ? 'none' : '4 4'}
              filter={isSelected ? `url(#${filterId})` : undefined}
              className="transition-all duration-300"
            />

            {/* Traveling Data Particle Packets along active line */}
            {isSelected && !reducedMotion && (
              <>
                <circle r="3.5" fill={currentPath.color} opacity="0.95">
                  <animateMotion
                    dur="1.2s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${def.id}`} />
                  </animateMotion>
                </circle>

                <circle r="2.5" fill="#FFFFFF" opacity="0.8">
                  <animateMotion
                    dur="1.2s"
                    begin="0.4s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${def.id}`} />
                  </animateMotion>
                </circle>

                <circle r="2" fill={currentPath.secondaryColor} opacity="0.7">
                  <animateMotion
                    dur="1.2s"
                    begin="0.8s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${def.id}`} />
                  </animateMotion>
                </circle>
              </>
            )}

            {/* Anchor Port Terminals */}
            <circle
              cx={key === 'work' ? 500 : key === 'play' ? 410 : key === 'stack' ? 590 : 500}
              cy={key === 'work' ? 275 : key === 'play' ? 340 : key === 'stack' ? 340 : 405}
              r={isSelected ? '3.5' : '2.5'}
              fill={isSelected ? currentPath.color : '#334155'}
              className="transition-all duration-300"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default PathConnections;

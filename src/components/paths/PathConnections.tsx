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

  // Path coordinates connecting Center (500, 300) to 4 surrounding nodes
  // Top: WORK (500, 150)
  // Left: PLAY (300, 300)
  // Right: STACK (700, 300)
  // Bottom: PERSON (500, 450)

  const lineDefs: Record<PathId, { d: string; id: string; portX: number; portY: number }> = {
    work: {
      d: 'M 500 215 L 500 150',
      id: 'conn-work',
      portX: 500,
      portY: 215
    },
    play: {
      d: 'M 405 300 L 300 300',
      id: 'conn-play',
      portX: 405,
      portY: 300
    },
    stack: {
      d: 'M 595 300 L 700 300',
      id: 'conn-stack',
      portX: 595,
      portY: 300
    },
    person: {
      d: 'M 500 385 L 500 450',
      id: 'conn-person',
      portX: 500,
      portY: 385
    }
  };

  return (
    <svg
      viewBox="0 0 1000 600"
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
      </defs>

      {/* Decorative Circuit Grid Rings */}
      <circle cx="500" cy="300" r="150" fill="none" stroke="rgba(51,65,85,0.22)" strokeDasharray="3 6" />
      <circle cx="500" cy="300" r="230" fill="none" stroke="rgba(51,65,85,0.12)" strokeDasharray="4 8" />

      {/* Diagonal Technical Bus Cross-Hairs */}
      <line x1="390" y1="190" x2="440" y2="240" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="610" y1="190" x2="560" y2="240" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="390" y1="410" x2="440" y2="360" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="610" y1="410" x2="560" y2="360" stroke="rgba(51,65,85,0.25)" strokeWidth="1" strokeDasharray="2 3" />

      {/* Render the 4 main connection lines */}
      {(Object.entries(lineDefs) as [PathId, typeof lineDefs[PathId]][]).map(([key, def]) => {
        const isSelected = currentPath?.id === key;
        const color = isSelected ? currentPath.color : 'rgba(51, 65, 85, 0.45)';
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

            {/* Center Port Terminal */}
            <circle
              cx={def.portX}
              cy={def.portY}
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

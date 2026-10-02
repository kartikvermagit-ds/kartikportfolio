import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Gamepad2, Cpu, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PathItem } from '../../types/path';

interface PathNodeProps {
  path: PathItem;
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  isRouting: boolean;
  onHover: (path: PathItem | null) => void;
  onSelect: (path: PathItem) => void;
  reducedMotion?: boolean;
  className?: string;
}

const ICON_COMPONENTS = {
  Briefcase,
  Gamepad2,
  Cpu,
  User
};

export function PathNode({
  path,
  isActive,
  isHovered,
  isDimmed,
  isRouting,
  onHover,
  onSelect,
  reducedMotion = false,
  className = ''
}: PathNodeProps) {
  const Icon = ICON_COMPONENTS[path.iconName] || Briefcase;

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isDimmed ? 0.38 : 1,
        scale: isHovered && !reducedMotion ? 1.03 : 1
      }}
      transition={{ duration: 0.25 }}
      className={`relative ${className}`}
    >
      <button
        type="button"
        onClick={() => onSelect(path)}
        onMouseEnter={() => onHover(path)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(path)}
        onBlur={() => onHover(null)}
        data-cursor="pointer"
        aria-label={`${path.number} — ${path.title}: ${path.description}. Press Enter to initialize route.`}
        className={`w-full text-left p-4 sm:p-5 rounded-2xl bg-[#0B1220]/90 border transition-all duration-300 relative group overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
          isActive
            ? 'ring-2 shadow-2xl backdrop-blur-md'
            : isHovered
            ? 'shadow-xl backdrop-blur-md'
            : 'border-slate-800/90 shadow-lg'
        }`}
        style={{
          borderColor: isActive
            ? path.color
            : isHovered
            ? `${path.color}bb`
            : 'rgba(30, 41, 59, 0.8)',
          boxShadow: isHovered || isActive
            ? `0 0 25px ${path.color}25, 0 10px 30px rgba(0,0,0,0.6)`
            : '0 8px 24px rgba(0,0,0,0.4)',
          minHeight: '120px'
        }}
      >
        {/* Subtle Top Glowing Line Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${path.color}, transparent)`,
            opacity: isHovered || isActive ? 1 : 0.3
          }}
        />

        {/* Header Row: Node Number & Category Icon */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-mono font-bold px-2 py-0.5 rounded transition-colors"
              style={{
                backgroundColor: `${path.color}18`,
                color: path.color,
                border: `1px solid ${path.color}35`
              }}
            >
              {path.number}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              NODE / {path.shortTitle}
            </span>
          </div>

          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: isHovered || isActive ? `${path.color}25` : '#080D16',
              border: `1px solid ${isHovered || isActive ? path.color : 'rgba(51, 65, 85, 0.6)'}`
            }}
          >
            <Icon
              className="w-4 h-4 transition-colors"
              style={{ color: isHovered || isActive ? path.color : '#94A3B8' }}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-heading font-black tracking-wide text-white mb-1.5 group-hover:text-white transition-colors">
          {path.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3 line-clamp-2">
          {path.description}
        </p>

        {/* Status / Call to Action Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/70 text-[10px] font-mono">
          {isActive && isRouting ? (
            <span className="flex items-center gap-1.5 font-bold animate-pulse text-amber-300">
              <CheckCircle2 className="w-3 h-3 text-amber-300" />
              ROUTE INITIALIZED...
            </span>
          ) : isActive ? (
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: path.color }}>
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: path.color }} />
              ACTIVE ROUTE
            </span>
          ) : isHovered ? (
            <span className="flex items-center gap-1 font-semibold" style={{ color: path.color }}>
              INITIALIZE JOURNEY <ArrowRight className="w-3 h-3" />
            </span>
          ) : (
            <span className="text-slate-500">
              TAP OR CLICK TO EXPLORE
            </span>
          )}

          <span className="text-[9px] text-slate-500">
            {path.steps.length} STOPS
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export default PathNode;

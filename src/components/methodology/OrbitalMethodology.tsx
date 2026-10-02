import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Search,
  Settings,
  ShieldCheck,
  Layers,
  CloudUpload,
  LineChart,
  Lightbulb,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface StageConfig {
  number: string;
  name: string;
  summary: string;
  accent: 'blue' | 'orange';
  accentColor: string;
  glowColor: string;
  borderHover: string;
  icon: React.ComponentType<{ className?: string }>;
  planetType: 'cratered-blue' | 'rocky-orange' | 'oceanic-cyan' | 'crimson-mars' | 'banded-jupiter' | 'aquamarine-rings' | 'sapphire-neptune';
  size: number;
}

const STAGES: StageConfig[] = [
  {
    number: '01',
    name: 'Problem',
    summary: 'Identify Real Constraint',
    accent: 'blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    borderHover: 'border-blue-500/80',
    icon: Target,
    planetType: 'cratered-blue',
    size: 52
  },
  {
    number: '02',
    name: 'Research',
    summary: 'Explore Existing Solutions',
    accent: 'orange',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    borderHover: 'border-amber-500/80',
    icon: Search,
    planetType: 'rocky-orange',
    size: 50
  },
  {
    number: '03',
    name: 'Prototype',
    summary: 'Minimal Viable Pipeline',
    accent: 'blue',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    borderHover: 'border-cyan-400/80',
    icon: Settings,
    planetType: 'oceanic-cyan',
    size: 54
  },
  {
    number: '04',
    name: 'Validate',
    summary: 'Stress & Conflict Tests',
    accent: 'orange',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    borderHover: 'border-orange-500/80',
    icon: ShieldCheck,
    planetType: 'crimson-mars',
    size: 50
  },
  {
    number: '05',
    name: 'Build',
    summary: 'Modular Implementation',
    accent: 'blue',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    borderHover: 'border-indigo-400/80',
    icon: Layers,
    planetType: 'banded-jupiter',
    size: 62
  },
  {
    number: '06',
    name: 'Deploy',
    summary: 'Cloud & Client Delivery',
    accent: 'orange',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    borderHover: 'border-amber-400/80',
    icon: CloudUpload,
    planetType: 'aquamarine-rings',
    size: 54
  },
  {
    number: '07',
    name: 'Iterate',
    summary: 'Performance & Refinement',
    accent: 'blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    borderHover: 'border-blue-400/80',
    icon: LineChart,
    planetType: 'sapphire-neptune',
    size: 52
  }
];

// Planet SVG Renderers
function PlanetRenderer({ type, size, isHovered }: { type: StageConfig['planetType']; size: number; isHovered: boolean }) {
  const scale = isHovered ? 1.08 : 1.0;

  switch (type) {
    case 'cratered-blue':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p1-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="35%" stopColor="#3B82F6" />
              <stop offset="70%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0B132B" />
            </radialGradient>
            <filter id="p1-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#3B82F6" floodOpacity="0.6" />
            </filter>
          </defs>
          {/* Subtle Ring */}
          <ellipse cx="30" cy="30" rx="34" ry="7" fill="none" stroke="rgba(96, 165, 250, 0.25)" strokeWidth="1.2" transform="rotate(-18 30 30)" />
          {/* Globe */}
          <circle cx="30" cy="30" r="22" fill="url(#p1-grad)" filter="url(#p1-glow)" />
          {/* Craters */}
          <circle cx="23" cy="24" r="3.5" fill="#1E3A8A" opacity="0.6" />
          <circle cx="35" cy="34" r="4.5" fill="#172554" opacity="0.6" />
          <circle cx="28" cy="38" r="2.5" fill="#1E3A8A" opacity="0.5" />
          {/* Specular Rim */}
          <path d="M12 26 A 22 22 0 0 1 34 10" fill="none" stroke="#BFDBFE" strokeWidth="1.8" opacity="0.75" />
        </svg>
      );

    case 'rocky-orange':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p2-grad" cx="32%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="65%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#451A03" />
            </radialGradient>
            <filter id="p2-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#F59E0B" floodOpacity="0.55" />
            </filter>
          </defs>
          <circle cx="30" cy="30" r="21" fill="url(#p2-grad)" filter="url(#p2-glow)" />
          {/* Surface texture ridges */}
          <path d="M16 26 Q 25 32 38 24" fill="none" stroke="#78350F" strokeWidth="2.5" opacity="0.4" />
          <path d="M22 36 Q 30 40 40 33" fill="none" stroke="#78350F" strokeWidth="2" opacity="0.4" />
          {/* Specular Rim */}
          <path d="M13 25 A 21 21 0 0 1 33 11" fill="none" stroke="#FEF3C7" strokeWidth="1.8" opacity="0.8" />
        </svg>
      );

    case 'oceanic-cyan':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p3-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="25%" stopColor="#38BDF8" />
              <stop offset="60%" stopColor="#0284C7" />
              <stop offset="85%" stopColor="#0C4A6E" />
              <stop offset="100%" stopColor="#082F49" />
            </radialGradient>
            <filter id="p3-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#38BDF8" floodOpacity="0.6" />
            </filter>
          </defs>
          {/* Subtle Ring */}
          <ellipse cx="30" cy="30" rx="35" ry="6" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" transform="rotate(-12 30 30)" />
          <circle cx="30" cy="30" r="22.5" fill="url(#p3-grad)" filter="url(#p3-glow)" />
          {/* Swirling Atmospheric Clouds */}
          <path d="M14 26 Q 24 20 34 26 Q 42 22 47 28" fill="none" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.6" strokeLinecap="round" />
          <path d="M18 34 Q 28 32 38 37" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />
          {/* Specular Rim */}
          <path d="M11 26 A 22.5 22.5 0 0 1 34 10" fill="none" stroke="#F0F9FF" strokeWidth="2" opacity="0.85" />
        </svg>
      );

    case 'crimson-mars':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p4-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="30%" stopColor="#EA580C" />
              <stop offset="70%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </radialGradient>
            <filter id="p4-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#EA580C" floodOpacity="0.6" />
            </filter>
          </defs>
          <circle cx="30" cy="30" r="21" fill="url(#p4-grad)" filter="url(#p4-glow)" />
          {/* Volcanic surface streaks */}
          <circle cx="24" cy="24" r="3" fill="#7F1D1D" opacity="0.6" />
          <circle cx="36" cy="32" r="4" fill="#7F1D1D" opacity="0.5" />
          <path d="M15 32 Q 26 36 38 29" fill="none" stroke="#7F1D1D" strokeWidth="2.2" opacity="0.5" />
          {/* Specular Rim */}
          <path d="M12 25 A 21 21 0 0 1 32 11" fill="none" stroke="#FFEDD5" strokeWidth="1.8" opacity="0.8" />
        </svg>
      );

    case 'banded-jupiter':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 70 70"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p5-grad" cx="32%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#E0E7FF" />
              <stop offset="30%" stopColor="#818CF8" />
              <stop offset="65%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </radialGradient>
            <filter id="p5-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#6366F1" floodOpacity="0.5" />
            </filter>
            <clipPath id="p5-clip">
              <circle cx="35" cy="35" r="24" />
            </clipPath>
          </defs>
          {/* Ring Back */}
          <ellipse cx="35" cy="35" rx="42" ry="9" fill="none" stroke="rgba(165, 180, 252, 0.4)" strokeWidth="3" transform="rotate(-15 35 35)" />
          <ellipse cx="35" cy="35" rx="38" ry="7" fill="none" stroke="rgba(199, 210, 254, 0.3)" strokeWidth="1.5" transform="rotate(-15 35 35)" />
          
          {/* Globe */}
          <circle cx="35" cy="35" r="24" fill="url(#p5-grad)" filter="url(#p5-glow)" />

          {/* Gas Bands inside Clip */}
          <g clipPath="url(#p5-clip)">
            <rect x="5" y="24" width="60" height="4" fill="#C7D2FE" opacity="0.3" transform="rotate(-5 35 35)" />
            <rect x="5" y="31" width="60" height="5" fill="#312E81" opacity="0.45" transform="rotate(-5 35 35)" />
            <rect x="5" y="38" width="60" height="4" fill="#6366F1" opacity="0.35" transform="rotate(-5 35 35)" />
            <rect x="5" y="44" width="60" height="3" fill="#1E1B4B" opacity="0.5" transform="rotate(-5 35 35)" />
          </g>

          {/* Ring Front (Overlapping) */}
          <path
            d="M 6 38 A 42 9 0 0 0 64 32"
            fill="none"
            stroke="rgba(199, 210, 254, 0.55)"
            strokeWidth="3"
            transform="rotate(-15 35 35)"
          />
          {/* Specular Rim */}
          <path d="M15 30 A 24 24 0 0 1 39 13" fill="none" stroke="#EEF2FF" strokeWidth="2" opacity="0.85" />
        </svg>
      );

    case 'aquamarine-rings':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p6-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#CCFBF1" />
              <stop offset="30%" stopColor="#14B8A6" />
              <stop offset="70%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#042F2E" />
            </radialGradient>
            <filter id="p6-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#14B8A6" floodOpacity="0.55" />
            </filter>
          </defs>
          {/* Double Rings */}
          <ellipse cx="30" cy="30" rx="35" ry="8" fill="none" stroke="rgba(20, 184, 166, 0.45)" strokeWidth="2" transform="rotate(20 30 30)" />
          <ellipse cx="30" cy="30" rx="31" ry="6" fill="none" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1" transform="rotate(20 30 30)" />
          <circle cx="30" cy="30" r="22" fill="url(#p6-grad)" filter="url(#p6-glow)" />
          {/* Front Ring segment */}
          <path d="M 6 36 A 35 8 0 0 0 54 24" fill="none" stroke="rgba(94, 234, 212, 0.6)" strokeWidth="2" transform="rotate(20 30 30)" />
          {/* Specular Rim */}
          <path d="M12 26 A 22 22 0 0 1 34 10" fill="none" stroke="#F0FDFA" strokeWidth="2" opacity="0.85" />
        </svg>
      );

    case 'sapphire-neptune':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          className="transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <defs>
            <radialGradient id="p7-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#BFDBFE" />
              <stop offset="35%" stopColor="#2563EB" />
              <stop offset="70%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0B132B" />
            </radialGradient>
            <filter id="p7-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3B82F6" floodOpacity="0.65" />
            </filter>
          </defs>
          <ellipse cx="30" cy="30" rx="34" ry="7" fill="none" stroke="rgba(96, 165, 250, 0.35)" strokeWidth="1.5" transform="rotate(-10 30 30)" />
          <circle cx="30" cy="30" r="21.5" fill="url(#p7-grad)" filter="url(#p7-glow)" />
          <path d="M 7 34 A 34 7 0 0 0 53 26" fill="none" stroke="rgba(147, 197, 253, 0.55)" strokeWidth="1.5" transform="rotate(-10 30 30)" />
          {/* Specular Rim */}
          <path d="M12 25 A 21.5 21.5 0 0 1 33 10" fill="none" stroke="#EFF6FF" strokeWidth="2" opacity="0.85" />
        </svg>
      );

    default:
      return null;
  }
}

export function OrbitalMethodology() {
  const [activeStageIdx, setActiveStageIdx] = useState<number | null>(null);

  const handleStageHover = (idx: number) => {
    setActiveStageIdx(idx);
    playPathFeedback('hover');
  };

  const handleStageLeave = () => {
    setActiveStageIdx(null);
  };

  const handleStageClick = (idx: number) => {
    setActiveStageIdx(idx);
    playPathFeedback('select');
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#05080D]/95 border border-[#1A2A3A] relative overflow-hidden shadow-2xl">
      {/* Background Star Dust & Orbit Glow Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle radial aura behind IDEA */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/10 blur-[80px]" />
        {/* Subtle radial aura behind Stage 05-07 */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-[90px]" />

        {/* Ambient star points */}
        <div className="absolute top-12 left-1/4 w-1 h-1 rounded-full bg-slate-500/40" />
        <div className="absolute top-20 right-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[0.5px]" />
        <div className="absolute bottom-16 left-1/3 w-1 h-1 rounded-full bg-amber-400/30" />
        <div className="absolute bottom-24 right-1/4 w-1.5 h-1.5 rounded-full bg-slate-400/30" />
        <div className="absolute top-1/3 right-12 w-1 h-1 rounded-full bg-cyan-400/40" />
        <div className="absolute bottom-12 left-16 w-1 h-1 rounded-full bg-slate-500/40" />
      </div>

      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b border-[#1A2A3A]/80 relative z-10">
        <div>
          {/* Top-left Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-amber-500/50 bg-amber-500/10 text-amber-400 font-mono text-[11px] tracking-widest uppercase font-semibold mb-2 shadow-sm shadow-amber-500/10">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>ENGINEERING METHODOLOGY</span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
            From <span className="text-amber-400">Idea</span> <span className="text-slate-400">→</span> System.
          </h3>
        </div>

        {/* Right Metadata */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            7-STAGE VERIFICATION PROTOCOL
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP & TABLET: HORIZONTAL ORBITAL SYSTEM VISUALIZATION */}
      {/* ======================================================== */}
      <div className="hidden md:block relative z-10 overflow-x-auto pb-4 scrollbar-thin">
        <div className="min-w-[1040px] px-2 py-4">
          
          {/* TOP ROW: Floating HUD Information Cards */}
          <div className="grid grid-cols-8 gap-3 mb-2 items-end">
            {/* Column 0: Empty spacer above IDEA Sun */}
            <div className="flex items-center justify-center p-2">
              <div className="text-[10px] font-mono text-amber-400/80 tracking-widest uppercase text-center py-1 px-2 rounded border border-amber-500/30 bg-amber-500/10">
                GENESIS
              </div>
            </div>

            {/* Columns 1-7: Stage HUD Cards */}
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isHovered = activeStageIdx === idx;
              const isBlue = stage.accent === 'blue';

              return (
                <div
                  key={stage.number}
                  onMouseEnter={() => handleStageHover(idx)}
                  onMouseLeave={handleStageLeave}
                  onClick={() => handleStageClick(idx)}
                  className={`p-3 rounded-xl bg-[#080D16]/95 border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[148px] relative group backdrop-blur-md ${
                    isHovered
                      ? isBlue
                        ? 'border-blue-400 bg-[#0C1524] shadow-lg shadow-blue-500/20 translate-y-[-3px]'
                        : 'border-amber-400 bg-[#16120C] shadow-lg shadow-amber-500/20 translate-y-[-3px]'
                      : 'border-[#1A2A3A] hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Card Top: Stage Number Pill + Stage Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                          isBlue
                            ? 'text-blue-400 border-blue-500/40 bg-blue-500/10'
                            : 'text-amber-400 border-amber-500/40 bg-amber-500/10'
                        }`}
                      >
                        {stage.number}
                      </span>
                      <Icon
                        className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                          isBlue ? 'text-blue-400' : 'text-amber-400'
                        }`}
                      />
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-heading font-bold text-white mb-1 tracking-tight">
                      {stage.name}
                    </h4>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 font-sans leading-snug">
                      {stage.summary}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[9px] font-mono flex items-center justify-between text-slate-500">
                    <span>STAGE {idx + 1}/7</span>
                    {isHovered && (
                      <span className={isBlue ? 'text-blue-400' : 'text-amber-400'}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIDDLE ROW: Vertical Light Connector Lines dropping to Planets */}
          <div className="grid grid-cols-8 gap-3 my-0">
            {/* Column 0: Connector from Genesis */}
            <div className="flex justify-center items-center h-8">
              <div className="w-[1px] h-full bg-gradient-to-b from-amber-500/40 to-amber-500/80" />
            </div>

            {/* Columns 1-7: Stage Connector Droplines */}
            {STAGES.map((stage, idx) => {
              const isHovered = activeStageIdx === idx;
              const isBlue = stage.accent === 'blue';

              return (
                <div key={`conn-${stage.number}`} className="flex flex-col items-center justify-center h-8 relative">
                  {/* Top Pip */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full mb-auto transition-all ${
                      isHovered
                        ? isBlue
                          ? 'bg-blue-400 shadow-sm shadow-blue-400'
                          : 'bg-amber-400 shadow-sm shadow-amber-400'
                        : 'bg-slate-700'
                    }`}
                  />
                  {/* Line */}
                  <div
                    className={`w-[1px] h-full transition-all duration-300 ${
                      isHovered
                        ? isBlue
                          ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                          : 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                        : 'bg-gradient-to-b from-slate-700 via-slate-800 to-transparent'
                    }`}
                  />
                  {/* Bottom Pip */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-auto transition-all ${
                      isHovered
                        ? isBlue
                          ? 'bg-blue-400 shadow-sm shadow-blue-400'
                          : 'bg-amber-400 shadow-sm shadow-amber-400'
                        : 'bg-slate-700'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* BOTTOM ROW: The Planetary Orbital System Canvas */}
          <div className="relative pt-4 pb-6 min-h-[140px] flex items-center">
            
            {/* Horizontal Orbital Vector Paths SVG Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1000 120"
            >
              <defs>
                <linearGradient id="main-orbit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                  <stop offset="12%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#F97316" stopOpacity="0.75" />
                  <stop offset="85%" stopColor="#6366F1" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.95" />
                </linearGradient>

                <filter id="line-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Secondary faint orbital ellipse traces */}
              <path
                d="M 20 70 Q 250 30 500 60 T 960 50"
                fill="none"
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <path
                d="M 40 50 Q 300 80 600 50 T 980 65"
                fill="none"
                stroke="rgba(245, 158, 11, 0.12)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />

              {/* Main Progress Orbital Highway Line passing through planet centers */}
              <path
                d="M 60 60 L 965 60"
                fill="none"
                stroke="url(#main-orbit-grad)"
                strokeWidth="1.8"
                filter="url(#line-glow)"
              />

              {/* Waypoint pings along the track */}
              <circle cx="180" cy="60" r="2.5" fill="#3B82F6" opacity="0.8" />
              <circle cx="310" cy="60" r="2.5" fill="#F59E0B" opacity="0.8" />
              <circle cx="435" cy="60" r="2.5" fill="#38BDF8" opacity="0.8" />
              <circle cx="560" cy="60" r="2.5" fill="#F97316" opacity="0.8" />
              <circle cx="685" cy="60" r="2.5" fill="#6366F1" opacity="0.8" />
              <circle cx="810" cy="60" r="2.5" fill="#F59E0B" opacity="0.8" />
              <circle cx="935" cy="60" r="2.5" fill="#3B82F6" opacity="0.8" />

              {/* Arrow Head terminating into SYSTEM */}
              <path
                d="M 960 54 L 975 60 L 960 66 Z"
                fill="#60A5FA"
                filter="url(#line-glow)"
              />
            </svg>

            {/* Planets & Central Idea Sun Flex Container */}
            <div className="grid grid-cols-8 gap-3 items-center w-full relative z-10">
              
              {/* STAGE 0: The Central Glowing IDEA Sun */}
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                    boxShadow: [
                      '0 0 25px rgba(245, 158, 11, 0.5), 0 0 50px rgba(245, 158, 11, 0.2)',
                      '0 0 35px rgba(245, 158, 11, 0.7), 0 0 70px rgba(245, 158, 11, 0.3)',
                      '0 0 25px rgba(245, 158, 11, 0.5), 0 0 50px rgba(245, 158, 11, 0.2)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[84px] h-[84px] rounded-full relative flex flex-col items-center justify-center cursor-default select-none border-2 border-amber-300/80 shadow-2xl"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, #FFFBEB 0%, #FDE047 25%, #F59E0B 55%, #D97706 80%, #9A3412 100%)'
                  }}
                >
                  {/* Concentric subtle solar orbital ring */}
                  <div className="absolute -inset-2.5 rounded-full border border-amber-400/30 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute -inset-5 rounded-full border border-dashed border-amber-500/20 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

                  {/* Sun Content: Bulb Icon + IDEA Label */}
                  <Lightbulb className="w-5 h-5 text-amber-950 fill-amber-950/80 drop-shadow-sm mb-0.5" />
                  <span className="text-[12px] font-heading font-black tracking-widest text-amber-950">
                    IDEA
                  </span>
                </motion.div>
              </div>

              {/* STAGES 1-7: Stage Planet Nodes */}
              {STAGES.map((stage, idx) => {
                const isHovered = activeStageIdx === idx;

                return (
                  <div
                    key={`planet-${stage.number}`}
                    onMouseEnter={() => handleStageHover(idx)}
                    onMouseLeave={handleStageLeave}
                    onClick={() => handleStageClick(idx)}
                    className="flex flex-col items-center justify-center cursor-pointer group py-2"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Aura Halo on Hover */}
                      <div
                        className="absolute inset-0 rounded-full blur-md transition-opacity duration-300 pointer-events-none"
                        style={{
                          backgroundColor: stage.accentColor,
                          opacity: isHovered ? 0.4 : 0,
                          transform: 'scale(1.4)'
                        }}
                      />

                      {/* Planet Vector Sphere */}
                      <PlanetRenderer
                        type={stage.planetType}
                        size={stage.size}
                        isHovered={isHovered}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final Target Badge: SYSTEM → (Positioned on the far right) */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center">
              <div className="pl-6 flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#080D16]/90 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold shadow-lg shadow-blue-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYSTEM</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE: VERTICAL ORBITAL TIMELINE VISUALIZATION (< md)     */}
      {/* ======================================================== */}
      <div className="block md:hidden relative z-10 pt-2">
        
        {/* Mobile Sun Origin */}
        <div className="flex items-center gap-4 mb-8 p-3 rounded-2xl bg-[#080D16] border border-amber-500/30">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 15px rgba(245, 158, 11, 0.4)',
                '0 0 25px rgba(245, 158, 11, 0.6)',
                '0 0 15px rgba(245, 158, 11, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center shrink-0 border border-amber-300/80"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #FFFBEB 0%, #FDE047 30%, #F59E0B 70%, #B45309 100%)'
            }}
          >
            <Lightbulb className="w-4 h-4 text-amber-950 fill-amber-950/80" />
            <span className="text-[10px] font-heading font-black text-amber-950">IDEA</span>
          </motion.div>
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
              GENESIS POINT
            </div>
            <div className="text-sm font-heading font-bold text-white">
              Raw Concept & Ambiguous Need
            </div>
          </div>
        </div>

        {/* Vertical Orbital Spine Flow */}
        <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:via-blue-500 before:to-emerald-500">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isHovered = activeStageIdx === idx;
            const isBlue = stage.accent === 'blue';

            return (
              <div
                key={`mobile-${stage.number}`}
                onClick={() => handleStageClick(idx)}
                className="relative flex items-start gap-4 group cursor-pointer"
              >
                {/* Node on the spine */}
                <div className="absolute -left-[23px] top-3.5 z-10">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                      isBlue
                        ? 'border-blue-400 bg-[#080D16] group-hover:bg-blue-400'
                        : 'border-amber-400 bg-[#080D16] group-hover:bg-amber-400'
                    }`}
                  />
                </div>

                {/* Mobile Stage Card with Planet Avatar */}
                <div
                  className={`w-full p-4 rounded-xl bg-[#080D16]/90 border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isHovered
                      ? isBlue
                        ? 'border-blue-400/80 bg-[#0C1524]'
                        : 'border-amber-400/80 bg-[#16120C]'
                      : 'border-[#1A2A3A]'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          isBlue
                            ? 'text-blue-400 border-blue-500/40 bg-blue-500/10'
                            : 'text-amber-400 border-amber-500/40 bg-amber-500/10'
                        }`}
                      >
                        {stage.number}
                      </span>
                      <Icon className={`w-3.5 h-3.5 ${isBlue ? 'text-blue-400' : 'text-amber-400'}`} />
                      <h4 className="text-sm font-heading font-bold text-white">
                        {stage.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      {stage.summary}
                    </p>
                  </div>

                  {/* Compact Planet Avatar */}
                  <div className="shrink-0 flex items-center justify-center w-12 h-12">
                    <PlanetRenderer
                      type={stage.planetType}
                      size={42}
                      isHovered={isHovered}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile Final Terminus: SYSTEM */}
          <div className="relative flex items-center gap-3 pt-2">
            <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 z-10">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
            </div>
            <div className="w-full p-3.5 rounded-xl bg-[#080D16] border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  VERIFIED PRODUCTION SYSTEM
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
export default OrbitalMethodology;

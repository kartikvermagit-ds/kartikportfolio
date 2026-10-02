import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { HeroCinematicBackground } from '../hero/HeroCinematicBackground';
import { HeroHUDCards } from '../hero/HeroHUDCards';
import { HeroOrbitalCard } from '../hero/HeroOrbitalCard';
import { MagneticButton } from '../common/MagneticButton';
import { SOCIAL_LINKS } from '../../data/profiles';

interface HeroSectionProps {
  mouse?: { normalizedX: number; normalizedY: number };
  scrollY: number;
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  const isScrolledPast = scrollY > 260;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth) * 2 - 1,
      y: (clientY / innerHeight) * 2 - 1
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[94vh] w-full flex flex-col justify-between pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#05070B]"
    >
      {/* Cinematic AI x Data x Geospatial Layered Environment */}
      <HeroCinematicBackground mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Hero Content Layer - Responsive 2-Column Layout */}
      <div className="relative z-10 max-w-[1360px] mx-auto my-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center py-6 sm:py-8">
        {/* Left Column: Personal Narrative & Call to Actions */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Academic / Location Monospace Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080D16]/90 border border-slate-700/60 text-xs font-mono text-slate-300 mb-6 backdrop-blur-md shadow-lg shadow-black/40"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>B.Tech CSE (Data Science) • PSIT Kanpur</span>
            <span className="text-slate-600">|</span>
            <span className="text-orange-400 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-amber-400" /> 2026 Developer
            </span>
          </motion.div>

          {/* Main Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white mb-3"
          >
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">
              Kartik Verma
            </span>
            .
          </motion.h1>

          {/* Core Identity */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg sm:text-2xl md:text-3xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-orange-400 tracking-wide mb-6 uppercase"
          >
            AI • Data Science • Full-Stack Developer
          </motion.p>

          {/* Honest, Evidence-Driven Positioning Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base sm:text-lg text-slate-300 max-w-xl font-sans leading-relaxed mb-8"
          >
            Building AI-assisted products, geospatial intelligence systems, and full-stack software through project-driven experimentation and algorithmic discipline.
          </motion.p>

          {/* Action Magnetic Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <MagneticButton href="#work" cursorType="project">
              <div className="px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-[0_0_25px_rgba(249,115,22,0.35)] border border-orange-400/50 hover:scale-105 flex items-center gap-2">
                <span>EXPLORE MY WORK</span>
                <span className="text-amber-200 font-bold">→</span>
              </div>
            </MagneticButton>

            <MagneticButton href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" cursorType="github">
              <div className="px-7 py-3.5 rounded-full bg-[#080D16]/90 hover:bg-slate-800 text-slate-200 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all border border-slate-700/80 hover:border-orange-500/60 flex items-center gap-2 hover:scale-105 backdrop-blur-md">
                <GithubIcon className="w-4 h-4 text-orange-400" />
                <span>VIEW GITHUB</span>
              </div>
            </MagneticButton>
          </motion.div>

          {/* Quick Monospace Spec Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] font-mono text-slate-400"
          >
            <span className="px-2.5 py-1 rounded-md bg-[#080D16]/80 border border-slate-800 text-orange-300">
              ⚡ Python & PyTorch
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#080D16]/80 border border-slate-800 text-sky-300">
              ◈ React 19 & TypeScript
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#080D16]/80 border border-slate-800 text-amber-300">
              ✦ NASA FIRMS Geospatial
            </span>
          </motion.div>
        </div>

        {/* Right Column: Floating HUD Cards + Orbital Portrait Card */}
        <motion.div
          initial={{ opacity: 0, x: 25, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-5 flex items-center justify-center lg:justify-end gap-5 xl:gap-7"
        >
          {/* Floating HUD Cards (AI, Data, Systems) */}
          <HeroHUDCards />

          {/* Portrait Card with Orbital Trajectories & Signature */}
          <HeroOrbitalCard />
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Indicator linking to Choose Your Path */}
      <motion.div
        animate={{ opacity: isScrolledPast ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center text-slate-400 font-mono text-[10px] tracking-widest mt-4 select-none"
      >
        <a
          href="#pathways"
          data-cursor="pointer"
          aria-label="Scroll to Choose Your Path section"
          className="group flex flex-col items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-400 rounded-lg p-1"
        >
          <span className="mb-1.5 uppercase text-[9px] text-slate-400 group-hover:text-orange-300 tracking-[0.2em] font-semibold transition-colors flex items-center gap-1.5">
            <span>CHOOSE YOUR PATH</span>
            <span className="text-slate-600">•</span>
            <span>SCROLL</span>
          </span>
          <div className="w-4 h-7 rounded-full border border-slate-500/60 group-hover:border-orange-400/80 p-0.5 flex justify-center shadow-lg shadow-black/50 transition-colors">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-orange-400"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
            className="mt-1"
          >
            <ArrowDown className="w-3 h-3 text-orange-400 group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}

export default HeroSection;


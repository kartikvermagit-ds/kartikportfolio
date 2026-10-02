import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { Hero3DScene } from '../3d/Hero3DScene';
import { MagneticButton } from '../common/MagneticButton';
import { SOCIAL_LINKS } from '../../data/profiles';

interface HeroSectionProps {
  mouse?: { normalizedX: number; normalizedY: number };
  scrollY: number;
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  const isScrolledPast = scrollY > 260;

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between pt-32 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-gradient">
      {/* 7-Layer Intelligence Core WebGL Canvas */}
      <Hero3DScene />

      {/* Cyber Grid Subtlety */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Academic / Location Monospace Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080D16]/90 border border-slate-700/60 text-xs font-mono text-slate-300 mb-6 backdrop-blur-md shadow-lg shadow-black/40"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>B.Tech CSE (Data Science) • PSIT Kanpur</span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3 h-3" /> 2026 Developer
          </span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white mb-3"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Kartik Verma</span>.
        </motion.h1>

        {/* Core Identity */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg sm:text-2xl md:text-3xl font-heading font-semibold text-blue-400 tracking-wide mb-6 uppercase"
        >
          AI • Data Science • Full-Stack Developer
        </motion.p>

        {/* Honest, Evidence-Driven Positioning Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed mb-10"
        >
          Building AI-assisted products, geospatial intelligence systems, and full-stack software through project-driven experimentation and algorithmic discipline.
        </motion.p>

        {/* Action Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#work" cursorType="project">
            <div className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-xl shadow-blue-500/25 border border-blue-400/40 hover:scale-105">
              EXPLORE MY WORK
            </div>
          </MagneticButton>

          <MagneticButton href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" cursorType="github">
            <div className="px-7 py-3.5 rounded-full bg-[#080D16]/90 hover:bg-slate-800 text-slate-200 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all border border-slate-700/80 hover:border-slate-500 flex items-center gap-2 hover:scale-105">
              <GithubIcon className="w-4 h-4 text-blue-400" />
              <span>VIEW GITHUB</span>
            </div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <motion.div
        animate={{ opacity: isScrolledPast ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center text-slate-500 font-mono text-xs tracking-widest pointer-events-none mt-6"
      >
        <span className="mb-1.5 uppercase text-[10px] text-slate-500">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
export default HeroSection;

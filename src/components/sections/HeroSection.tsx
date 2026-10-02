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

      {/* Hero Content Layer - 2-Column Responsive Layout */}
      <div className="relative z-10 max-w-[1320px] mx-auto my-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-6 sm:py-8">
        {/* Left Column: Personal Narrative & Call to Actions */}
        <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
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
              <div className="px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-xl shadow-orange-500/25 border border-orange-400/40 hover:scale-105">
                EXPLORE MY WORK
              </div>
            </MagneticButton>

            <MagneticButton href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" cursorType="github">
              <div className="px-7 py-3.5 rounded-full bg-[#080D16]/90 hover:bg-slate-800 text-slate-200 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all border border-slate-700/80 hover:border-orange-500/60 flex items-center gap-2 hover:scale-105">
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

        {/* Right Column: Proper Full Uncropped Portrait Photo Card */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex justify-center lg:justify-end lg:pr-2"
        >
          <div className="relative group max-w-[260px] sm:max-w-[285px] lg:max-w-[305px] w-full lg:translate-x-5">
            {/* Ambient Multi-Layer Glow Aura */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-blue-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Futuristic HUD Corner Crosshairs */}
            <div className="absolute -top-3 -left-3 text-sm font-mono text-orange-400/80 select-none pointer-events-none z-20">⌜</div>
            <div className="absolute -top-3 -right-3 text-sm font-mono text-orange-400/80 select-none pointer-events-none z-20">⌝</div>
            <div className="absolute -bottom-3 -left-3 text-sm font-mono text-orange-400/80 select-none pointer-events-none z-20">⌞</div>
            <div className="absolute -bottom-3 -right-3 text-sm font-mono text-orange-400/80 select-none pointer-events-none z-20">⌟</div>

            {/* Glowing Cyber Gradient Frame */}
            <div className="relative p-[2.5px] rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-400 via-purple-500 to-blue-500 shadow-2xl shadow-orange-500/20 transition-all duration-500 group-hover:shadow-orange-500/40">
              {/* Inner Dark Shell */}
              <div className="relative rounded-[22px] bg-[#080D16] p-2 overflow-hidden border border-slate-800">
                {/* HUD Top Bar Header */}
                <div className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg bg-[#05070B]/90 border border-slate-800/80 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    <span className="text-orange-400 font-bold tracking-wider">KARTIK VERMA</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="tracking-widest">DEV // ACTIVE</span>
                  </div>
                </div>

                {/* Proper Uncropped Photo Container */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src="/photo.jpeg"
                    alt="Kartik Verma"
                    className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Theme Gradients Overlay (Does not obscure face, blends edges) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D16] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Floating Glassmorphism Spec Tag over bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#080D16]/90 border border-slate-700/70 backdrop-blur-md flex items-center justify-between text-xs font-mono shadow-xl">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Specialization</div>
                      <div className="font-semibold text-slate-100 text-[11px]">AI & Data Science</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-orange-400 font-bold">PSIT '26</div>
                      <div className="text-[10px] text-slate-400">Kanpur, IN</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <ArrowDown className="w-3.5 h-3.5 text-orange-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
export default HeroSection;

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { Hero3DScene } from '../3d/Hero3DScene';
import { MagneticButton } from '../common/MagneticButton';
import { SOCIAL_LINKS } from '../../data/profiles';

interface HeroSectionProps {
  mouse: { normalizedX: number; normalizedY: number };
  scrollY: number;
}

export function HeroSection({ mouse, scrollY }: HeroSectionProps) {
  const isScrolledPast = scrollY > 300;

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-gradient">
      {/* Three.js 3D Interactive Canvas */}
      <Hero3DScene mouse={mouse} scrollY={scrollY} />

      {/* Cyber Grid Subtlety */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-mono text-slate-300 mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>B.Tech CSE (Data Science) • PSIT Kanpur</span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> 2026 Developer
          </span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white mb-4"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Kartik Verma</span>.
        </motion.h1>

        {/* Primary Identity */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl md:text-3xl font-heading font-semibold text-blue-400 tracking-wide mb-6 uppercase"
        >
          AI • Data Science • Full-Stack Developer
        </motion.p>

        {/* Positioning Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed mb-10"
        >
          I build intelligent systems, data-driven products, and real-world software — from satellite thermal telemetry platforms to tamper-proof interface auditing tools.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#work" cursorType="project">
            <div className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold tracking-wider transition-all shadow-lg shadow-blue-500/25 border border-blue-400/40 hover:scale-105">
              EXPLORE MY WORK
            </div>
          </MagneticButton>

          <MagneticButton href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" cursorType="github">
            <div className="px-7 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-mono text-sm font-semibold tracking-wider transition-all border border-slate-700 hover:border-slate-500 flex items-center gap-2 hover:scale-105">
              <GithubIcon className="w-4 h-4 text-blue-400" />
              <span>VIEW GITHUB</span>
            </div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ opacity: isScrolledPast ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center text-slate-400 font-mono text-xs tracking-widest pointer-events-none"
      >
        <span className="mb-2 uppercase text-[10px] text-slate-400">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
export default HeroSection;

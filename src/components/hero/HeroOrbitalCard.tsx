import React from 'react';
import { motion } from 'framer-motion';

export function HeroOrbitalCard() {
  return (
    <div className="relative group max-w-[270px] sm:max-w-[295px] lg:max-w-[315px] w-full select-none">
      {/* 1. Ambient Glow Aura behind card */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-yellow-500/25 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* 2. Curved Orbital Light Trajectories Looping Around the Card */}
      <div className="absolute -inset-8 pointer-events-none z-20 overflow-visible">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 360 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Glowing Ellipse Trajectory 1 */}
          <ellipse
            cx="180"
            cy="220"
            rx="195"
            ry="115"
            transform="rotate(-20 180 220)"
            stroke="url(#orbitGradient1)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="opacity-75"
          />

          {/* Secondary Counter-Orbit 2 */}
          <ellipse
            cx="180"
            cy="220"
            rx="185"
            ry="90"
            transform="rotate(35 180 220)"
            stroke="url(#orbitGradient2)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-60"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="orbitGradient1" x1="0" y1="0" x2="360" y2="440" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="1" stopColor="#F97316" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="orbitGradient2" x1="0" y1="440" x2="360" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="0.7" stopColor="#F59E0B" stopOpacity="0.7" />
              <stop offset="1" stopColor="#818CF8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbiting Photon Bead 1 (Orange/Gold) */}
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] -left-1 top-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orbiting Photon Bead 2 (Cyan) */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] right-2 top-1/4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* 3. Golden Handwritten Cursive Signature on the Right */}
      <div className="absolute -right-8 sm:-right-12 bottom-12 z-30 pointer-events-none select-none rotate-[-8deg]">
        <div
          className="text-xl sm:text-2xl font-serif italic text-amber-300 tracking-wider font-light"
          style={{
            textShadow: '0 0 12px rgba(245, 185, 66, 0.8), 0 0 24px rgba(245, 185, 66, 0.4)'
          }}
        >
          Kartik
        </div>
        <div
          className="text-2xl sm:text-3xl font-serif italic text-amber-400 tracking-widest -mt-1 ml-5 font-normal"
          style={{
            textShadow: '0 0 15px rgba(245, 185, 66, 0.9), 0 0 30px rgba(245, 185, 66, 0.5)'
          }}
        >
          Verma
        </div>
      </div>

      {/* 4. Glowing Cyber Gradient Outer Frame */}
      <div className="relative p-[2px] rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-400 shadow-[0_0_35px_rgba(249,115,22,0.35)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]">
        {/* Inner Dark Shell */}
        <div className="relative rounded-[22px] overflow-hidden bg-[#080D16] border border-white/5">
          {/* Top-Left ID Monospace Badge */}
          <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-md bg-[#080D16]/90 border border-slate-800 text-[10px] font-mono text-slate-300 backdrop-blur-md">
            <span className="text-orange-400 font-bold">KV</span>.2026
          </div>

          {/* Top-Right Live Status Pill */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#080D16]/90 border border-slate-700/60 backdrop-blur-md text-[10px] font-mono text-emerald-400 shadow-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="tracking-widest font-semibold ml-0.5">DEV // ACTIVE</span>
          </div>

          {/* Photo Container with 4:5 Aspect Ratio */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
            <img
              src="/photo.jpeg"
              alt="Kartik Verma"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Edge Shadow Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D16] via-[#080D16]/20 to-transparent opacity-80 pointer-events-none" />

            {/* Bottom Floating Information Pill */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#080D16]/90 border border-slate-700/60 backdrop-blur-md flex items-center justify-between text-xs font-mono shadow-xl">
              <div>
                <div className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">Kartik Verma</div>
                <div className="font-medium text-slate-200 text-[11px]">AI & Data Science</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">PSIT Kanpur</div>
                <div className="text-[10px] text-blue-400 font-medium">B.Tech '26</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroOrbitalCard;

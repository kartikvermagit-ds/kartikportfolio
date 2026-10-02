import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, RotateCcw, Satellite, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';

interface PyravexExplanationProps {
  onPlayAgain: () => void;
  reducedMotion?: boolean;
}

export function PyravexExplanation({ onPlayAgain, reducedMotion = false }: PyravexExplanationProps) {
  const steps = [
    { title: 'RAW SATELLITE DATA', desc: 'Direct MODIS & VIIRS telemetry ingest via NASA FIRMS API feeds.' },
    { title: 'THERMAL SIGNALS', desc: 'Kelvin temperature, scan geometry, and radiative power (FRP) extraction.' },
    { title: 'GEOSPATIAL CONTEXT', desc: 'Spatial DBSCAN clustering grouping adjacent thermal pixels into coherent hot spots.' },
    { title: 'HISTORICAL BEHAVIOR', desc: 'Multi-day baseline comparison separating normal cyclical activity from sudden breakout hazards.' },
    { title: 'INTELLIGENCE & MONITORING', desc: 'Leaflet command interface correlating Open-Meteo wind vectors with wildfire spread vectors.' }
  ];

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      className="p-6 sm:p-8 rounded-3xl bg-[#080D16]/95 border border-blue-500/30 shadow-2xl relative font-mono select-none"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 mb-2">
            <Satellite className="w-3.5 h-3.5" />
            <span>REAL-WORLD ENGINEERING FOUNDATION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            This is the Idea Behind PYRAVEX.
          </h3>
        </div>

        <button
          type="button"
          onClick={onPlayAgain}
          data-cursor="pointer"
          className="px-4 py-2 rounded-xl bg-[#05070B] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>PLAY MISSION AGAIN</span>
        </button>
      </div>

      {/* Distinction Banner */}
      <div className="p-3.5 rounded-xl bg-[#05070B] border border-slate-800 text-xs text-slate-300 font-sans mb-8 leading-relaxed">
        <strong className="text-white font-mono block mb-1">
          SIMULATION vs PRODUCTION PYRAVEX:
        </strong>
        While this portfolio mini-game uses a controlled deterministic training scenario for demonstration, the real <strong>PYRAVEX</strong> system continuously polls automated satellite feeds, computes DBSCAN spatial clusters, and cross-references live atmospheric wind vectors.
      </div>

      {/* Actual Technical Flow */}
      <div className="space-y-2.5 mb-8">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
          ACTUAL PRODUCTION PIPELINE
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {steps.map((st, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#05070B] border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-bold text-blue-400 mb-1">
                  0{idx + 1}
                </div>
                <div className="text-xs font-bold text-white mb-1">
                  {st.title}
                </div>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Links */}
      <div className="p-5 rounded-2xl bg-[#05070B] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-white block">
            Inspect the Live Production Platform
          </span>
          <span className="text-[10px] text-slate-400 font-sans">
            Explore verified satellite passes, active incident clusters, and Leaflet map controls.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kartikvermagit-ds/PYRAVEX-2"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="github"
            className="px-4 py-2 rounded-full bg-[#080D16] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5 text-white" />
            <span>View Source</span>
          </a>

          <a
            href="https://pyravex-2.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="project"
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/25"
          >
            <span>Launch Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default PyravexExplanation;

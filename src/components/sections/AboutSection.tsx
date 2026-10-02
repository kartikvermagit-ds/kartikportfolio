import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Cpu, Database, Globe, Binary, Server } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { SOCIAL_LINKS } from '../../data/profiles';

interface SystemNodeData {
  id: string;
  label: string;
  tagline: string;
  detail: string;
  technologies: string[];
  color: string;
  icon: React.ElementType;
}

const SYSTEM_PROFILE_NODES: Record<string, SystemNodeData> = {
  ai: {
    id: 'ai',
    label: 'AI',
    tagline: 'LLM Workflows & Intelligent Systems',
    detail: 'Grounded document parsing, schema-constrained prompts, local Ollama inference, and multi-stage verification pipelines.',
    technologies: ['FastAPI', 'Ollama', 'Prompt Engineering', 'LangChain Patterns'],
    color: '#8B5CF6',
    icon: Cpu
  },
  data: {
    id: 'data',
    label: 'DATA',
    tagline: 'Geospatial Telemetry & Analytics',
    detail: 'NASA FIRMS active fire anomaly clustering, Open-Meteo atmospheric integration, and Pandas dataframes.',
    technologies: ['NASA FIRMS', 'Open-Meteo', 'Pandas', 'NumPy'],
    color: '#38BDF8',
    icon: Database
  },
  web: {
    id: 'web',
    label: 'WEB',
    tagline: 'Modern Frontend & Reactive Interfaces',
    detail: 'Modular React architectures, type-safe TypeScript interfaces, Tailwind styling, and responsive UX design.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    color: '#10B981',
    icon: Globe
  },
  dsa: {
    id: 'dsa',
    label: 'DSA',
    tagline: 'Algorithms & Problem Solving',
    detail: 'Continuous algorithmic drills covering graph traversals, dynamic programming tables, trees, and complexity analysis.',
    technologies: ['C++', 'Python', 'LeetCode', 'Codeforces'],
    color: '#F59E0B',
    icon: Binary
  },
  systems: {
    id: 'systems',
    label: 'SYSTEMS',
    tagline: 'APIs, Deployment & Architecture',
    detail: 'Asynchronous Python endpoints, Supabase PostgreSQL, containerized deployment, and Electron desktop suites.',
    technologies: ['FastAPI Async', 'Supabase', 'PostgreSQL', 'Docker'],
    color: '#6366F1',
    icon: Server
  }
};

export function AboutSection() {
  const [selectedNode, setSelectedNode] = useState<string>('ai');
  const activeData = SYSTEM_PROFILE_NODES[selectedNode];

  return (
    <section id="about" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      <SectionHeading
        number="01 — PHILOSOPHY"
        tag="BACKGROUND & CORE DISCIPLINES"
        title="Building by Doing."
        subtitle="Bridging theoretical data science principles with hands-on systems engineering."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-6 space-y-5 text-slate-300 text-base leading-relaxed font-sans">
          <p>
            I'm <strong className="text-white font-medium">Kartik Verma</strong>, a B.Tech Computer Science student specializing in <span className="text-blue-400 font-medium">Data Science</span> at <span className="text-white font-medium">PSIT Kanpur</span>.
          </p>
          <p>
            I enjoy turning ideas into working software — from satellite thermal intelligence platforms and document validation engines to full-stack applications and tamper-proof interface auditing tools.
          </p>
          <p className="text-slate-400">
            My learning is strongly project-driven. I experiment, build minimal viable pipelines, test boundary conditions, and iteratively improve architectural reliability.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080D16] border border-slate-800 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {SOCIAL_LINKS.location}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080D16] border border-slate-800 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Project-Driven Learning
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Engineering Profile Constellation Diagram */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#080D16]/90 border border-slate-800/90 shadow-2xl relative">
            <div className="text-[11px] font-mono text-slate-400 text-center mb-6 uppercase tracking-wider">
              INTERACTIVE SYSTEM TOPOLOGY • CLICK TO INSPECT
            </div>

            {/* Central Star Topology Diagram */}
            <div className="relative w-64 h-64 mx-auto mb-6 flex items-center justify-center">
              {/* Connecting Wire Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 256 256">
                {/* Center to Top (AI) */}
                <line x1="128" y1="128" x2="128" y2="40" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                {/* Center to Left (DATA) */}
                <line x1="128" y1="128" x2="40" y2="128" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                {/* Center to Right (WEB) */}
                <line x1="128" y1="128" x2="216" y2="128" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                {/* Center to Bottom-Left (DSA) */}
                <line x1="128" y1="128" x2="70" y2="210" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                {/* Center to Bottom-Right (SYSTEMS) */}
                <line x1="128" y1="128" x2="186" y2="210" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Central Core: KARTIK */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#05070B] border-2 border-orange-500/70 shadow-xl shadow-orange-500/30 flex flex-col items-center justify-center text-center p-0.5 group overflow-hidden">
                <img
                  src="/photo.jpeg"
                  alt="Kartik Verma"
                  className="w-full h-full object-cover object-[center_18%] rounded-full filter contrast-[1.05] brightness-[1.02] group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-70 pointer-events-none" />
                <span className="absolute bottom-1 px-1.5 py-0.2 rounded bg-black/80 text-[8px] font-mono font-bold text-orange-300 tracking-wider border border-orange-500/40">
                  KARTIK
                </span>
              </div>

              {/* AI Node (Top) */}
              <button
                type="button"
                onClick={() => setSelectedNode('ai')}
                className={`absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                  selectedNode === 'ai'
                    ? 'bg-purple-600 text-white border-purple-400 scale-110 shadow-lg shadow-purple-500/30'
                    : 'bg-[#0B1220] text-purple-300 border-purple-500/40 hover:border-purple-400'
                }`}
              >
                AI
              </button>

              {/* DATA Node (Left) */}
              <button
                type="button"
                onClick={() => setSelectedNode('data')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                  selectedNode === 'data'
                    ? 'bg-sky-600 text-white border-sky-400 scale-110 shadow-lg shadow-sky-500/30'
                    : 'bg-[#0B1220] text-sky-300 border-sky-500/40 hover:border-sky-400'
                }`}
              >
                DATA
              </button>

              {/* WEB Node (Right) */}
              <button
                type="button"
                onClick={() => setSelectedNode('web')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                  selectedNode === 'web'
                    ? 'bg-emerald-600 text-white border-emerald-400 scale-110 shadow-lg shadow-emerald-500/30'
                    : 'bg-[#0B1220] text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                }`}
              >
                WEB
              </button>

              {/* DSA Node (Bottom Left) */}
              <button
                type="button"
                onClick={() => setSelectedNode('dsa')}
                className={`absolute bottom-2 left-6 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                  selectedNode === 'dsa'
                    ? 'bg-amber-600 text-white border-amber-400 scale-110 shadow-lg shadow-amber-500/30'
                    : 'bg-[#0B1220] text-amber-300 border-amber-500/40 hover:border-amber-400'
                }`}
              >
                DSA
              </button>

              {/* SYSTEMS Node (Bottom Right) */}
              <button
                type="button"
                onClick={() => setSelectedNode('systems')}
                className={`absolute bottom-2 right-4 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                  selectedNode === 'systems'
                    ? 'bg-indigo-600 text-white border-indigo-400 scale-110 shadow-lg shadow-indigo-500/30'
                    : 'bg-[#0B1220] text-indigo-300 border-indigo-500/40 hover:border-indigo-400'
                }`}
              >
                SYSTEMS
              </button>
            </div>

            {/* Dynamic Active Node Tooltip Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-4 rounded-xl bg-[#05070B] border border-slate-800 text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold" style={{ color: activeData.color }}>
                    [{activeData.label}] — {activeData.tagline}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                  {activeData.detail}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeData.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;

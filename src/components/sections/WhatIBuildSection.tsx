import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Layers, Binary, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { PROCESS_STAGES } from '../../data/process';

const CAPABILITY_DOMAINS = [
  {
    number: '01',
    title: 'AI SYSTEMS',
    subtitle: 'Intelligent applications, LLM workflows, and grounded verification systems.',
    icon: BrainCircuit,
    color: '#8B5CF6',
    normalFocus: 'Building domain-specific intelligence with deterministic safeguards, avoiding hallucinations via schema-mapped extraction.',
    pipeline: ['INPUT', 'EXTRACTION', 'REASONING', 'VERIFICATION', 'OUTPUT'],
    tech: 'FastAPI • Python • Ollama • LLMs'
  },
  {
    number: '02',
    title: 'DATA & INTELLIGENCE',
    subtitle: 'Turning telemetry, geospatial feeds, and raw observations into actionable systems.',
    icon: LineChart,
    color: '#38BDF8',
    normalFocus: 'Ingesting NASA FIRMS satellite anomalies, Open-Meteo weather parameters, and time-series sensor points for spatial insight.',
    pipeline: ['SOURCE', 'INGESTION', 'PROCESSING', 'ANALYSIS', 'INSIGHT'],
    tech: 'NASA FIRMS • Open-Meteo • Pandas • Leaflet'
  },
  {
    number: '03',
    title: 'FULL-STACK PRODUCTS',
    subtitle: 'End-to-end architectures from type-safe client interfaces to asynchronous backend microservices.',
    icon: Layers,
    color: '#10B981',
    normalFocus: 'Pairing modern React frontends with PostgreSQL relational schemas, Supabase authentication, and Electron desktop apps.',
    pipeline: ['CLIENT', 'API', 'SERVICE', 'DATABASE', 'DEPLOYMENT'],
    tech: 'React • TypeScript • Node • Supabase'
  },
  {
    number: '04',
    title: 'PROBLEM SOLVING',
    subtitle: 'Algorithmic efficiency, time-space optimization, and competitive problem solving.',
    icon: Binary,
    color: '#F59E0B',
    normalFocus: 'Modeling complex graph networks, dynamic programming state transitions, and high-pressure hackathon sprints.',
    pipeline: ['INPUT', 'PATTERN', 'ALGORITHM', 'OPTIMIZATION', 'RESULT'],
    tech: 'C++ • Python • LeetCode • Codeforces'
  }
];

export function WhatIBuildSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      {/* Section Header */}
      <SectionHeading
        number="02 — CAPABILITIES"
        tag="SYSTEM DISCIPLINES & WORKFLOW"
        title="What I Build."
        subtitle="Transforming ambiguous requirements into verified data pipelines and resilient software architectures."
      />

      {/* 4 Interactive System Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {CAPABILITY_DOMAINS.map((domain, idx) => {
          const Icon = domain.icon;
          const isHovered = hoveredCard === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`p-6 sm:p-8 rounded-2xl bg-[#080D16]/90 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${
                isHovered
                  ? 'border-blue-500/60 shadow-2xl shadow-blue-500/15 translate-y-[-2px]'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Dynamic Aura Gradient on Hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  opacity: isHovered ? 0.08 : 0,
                  background: `radial-gradient(circle at 80% 20%, ${domain.color}, transparent 70%)`
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-slate-500 font-bold tracking-wider">
                    SYSTEM /{domain.number}
                  </span>
                  <div
                    className="p-3 rounded-xl border transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${domain.color}15`,
                      borderColor: `${domain.color}40`,
                      color: domain.color
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-2 tracking-tight">
                  {domain.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                  {domain.subtitle}
                </p>

                {/* Normal State vs Pipeline State on Hover */}
                <div className="p-4 rounded-xl bg-[#05070B] border border-slate-800/80 mb-6 min-h-[92px] flex items-center">
                  {!isHovered ? (
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {domain.normalFocus}
                    </p>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
                        <span>Execution Pipeline:</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        {domain.pipeline.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
                              style={{
                                backgroundColor: `${domain.color}15`,
                                borderColor: `${domain.color}40`,
                                color: domain.color
                              }}
                            >
                              {step}
                            </span>
                            {sIdx < domain.pipeline.length - 1 && (
                              <span className="text-[10px] text-slate-600 font-mono">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="text-slate-400">{domain.tech}</span>
                <span className="text-blue-400 flex items-center gap-1 text-[11px]">
                  <span>INSPECT</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* "HOW I BUILD: FROM IDEA → SYSTEM" WORKFLOW STREAM */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#080D16]/80 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">
              ENGINEERING METHODOLOGY
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
              From Idea → System.
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">7-STAGE VERIFICATION PROTOCOL</span>
        </div>

        {/* 7-Stage Horizontal / Wrap Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {PROCESS_STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="p-4 rounded-xl bg-[#05070B] border border-slate-800/90 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2">
                  {stage.step}
                </span>
                <h4 className="text-sm font-heading font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-sans leading-tight line-clamp-3">
                  {stage.summary}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-900 text-[9px] font-mono text-slate-500">
                STAGE {idx + 1}/7
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WhatIBuildSection;

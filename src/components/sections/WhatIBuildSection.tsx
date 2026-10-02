import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Layers, Binary, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Card3D } from '../common/Card3D';

const CARDS = [
  {
    number: '01',
    title: 'AI SYSTEMS',
    subtitle: 'Intelligent applications, LLM workflows and AI-assisted products.',
    icon: BrainCircuit,
    color: '#8B5CF6',
    features: ['Grounded LLM extraction', 'Multi-step verification pipelines', 'Local & cloud inference', 'Deterministic audits'],
    tech: 'FastAPI • Python • Ollama • LLMs'
  },
  {
    number: '02',
    title: 'DATA & INTELLIGENCE',
    subtitle: 'Turning raw data into useful insights, analysis and decision systems.',
    icon: LineChart,
    color: '#38BDF8',
    features: ['Satellite anomaly telemetry', 'Atmospheric vector processing', 'Temporal resolution expansion', 'Geospatial mapping'],
    tech: 'NASA FIRMS • Open-Meteo • Optical Flow'
  },
  {
    number: '03',
    title: 'FULL-STACK PRODUCTS',
    subtitle: 'Modern frontend, APIs, databases and deployment.',
    icon: Layers,
    color: '#10B981',
    features: ['Modular React architectures', 'Type-safe endpoints', 'PostgreSQL & Supabase storage', 'Desktop Electron apps'],
    tech: 'React • TypeScript • Node • Supabase'
  },
  {
    number: '04',
    title: 'PROBLEM SOLVING',
    subtitle: 'DSA, competitive programming and algorithmic thinking.',
    icon: Binary,
    color: '#F59E0B',
    features: ['Optimized graph traversal', 'Dynamic programming tables', 'Time & space complexity rigor', 'Timed hackathon sprints'],
    tech: 'C++ • Python • LeetCode • Codeforces'
  }
];

export function WhatIBuildSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="02"
        tag="DOMAINS OF WORK"
        title="What I Build."
        subtitle="Focused on creating reliable, domain-specific systems rather than generic clones."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="h-full min-h-[300px]">
              <Card3D className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      SYSTEM /{card.number}
                    </span>
                    <div
                      className="p-3 rounded-xl border transition-transform duration-300"
                      style={{
                        backgroundColor: `${card.color}15`,
                        borderColor: `${card.color}40`,
                        color: card.color
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-2 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed mb-6">
                    "{card.subtitle}"
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {card.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: card.color }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-slate-400">{card.tech}</span>
                  <span className="text-blue-400">CORE FOCUS</span>
                </div>
              </Card3D>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default WhatIBuildSection;

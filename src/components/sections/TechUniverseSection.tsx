import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { TECH_NODES, TECH_CATEGORIES } from '../../data/technologies';
import type { TechNode } from '../../types';
import { Sparkles, Layers } from 'lucide-react';

export function TechUniverseSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeNode, setActiveNode] = useState<TechNode>(TECH_NODES[0]);

  const filteredNodes = selectedCategory === 'ALL'
    ? TECH_NODES
    : TECH_NODES.filter((n) => n.category === selectedCategory);

  return (
    <section id="stack" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      <SectionHeading
        number="03 — STACK"
        tag="TECHNOLOGY CONSTELLATION"
        title="Technology & Engineering Stack."
        subtitle="Practical technologies grounded in repository commits, system architectures, and competitive hackathon deliverables."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-slate-800/80">
        {TECH_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                : 'bg-[#080D16] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Node Constellation Matrix */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredNodes.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between min-h-[92px] ${
                  isSelected
                    ? 'bg-[#0E172A] border-blue-500 shadow-xl shadow-blue-500/20'
                    : 'bg-[#080D16]/80 border-slate-800/90 hover:border-slate-700 hover:bg-[#0B1220]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">
                    {node.category}
                  </span>
                </div>

                <div className="font-heading font-bold text-sm sm:text-base text-white">
                  {node.name}
                </div>

                <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                  {node.level}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Live Telemetry Inspector */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="p-6 rounded-2xl bg-[#080D16] border border-blue-500/30 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: activeNode.color }}
            />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                  ACTIVE NODE TELEMETRY
                </span>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold"
                style={{
                  backgroundColor: `${activeNode.color}15`,
                  borderColor: `${activeNode.color}40`,
                  color: activeNode.color
                }}
              >
                {activeNode.category}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-2xl font-heading font-extrabold text-white mb-1">
                {activeNode.name}
              </h3>
              <div className="text-xs font-mono text-blue-400 mb-4">
                Discipline: {activeNode.level}
              </div>

              <div className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                {activeNode.description}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2 font-semibold">
                  VERIFIED REPOSITORY USE:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.relatedProjects.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#05070B] border border-slate-700/80 text-xs font-mono text-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400">
                <Sparkles className="w-3 h-3" /> Factual Implementation
              </span>
              <span>Kartik Verma Ecosystem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default TechUniverseSection;

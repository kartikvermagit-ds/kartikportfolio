import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon, LeetCodeIcon, CodeforcesIcon, HackerRankIcon } from '../common/Icons';
import { SectionHeading } from '../common/SectionHeading';
import { CODING_PLATFORMS } from '../../data/profiles';
import { AlgoGraphScene } from '../3d/AlgoGraphScene';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Code: LeetCodeIcon,
  Terminal: CodeforcesIcon,
  Award: HackerRankIcon,
};

export function CodingJourneySection() {
  return (
    <section id="problem-solving" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      {/* Standardized Section Heading */}
      <SectionHeading
        number="07 — PROBLEM SOLVING"
        tag="ALGORITHMIC PRACTICE & PROFILES"
        title="Algorithmic Discipline."
        subtitle="Continuous problem solving and data structures implementation across competitive programming platforms."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 4 Factual Platform Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CODING_PLATFORMS.map((platform, idx) => {
            const Icon = ICON_MAP[platform.iconName] || LeetCodeIcon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-[#080D16]/90 border border-slate-800/80 hover:border-blue-500/40 hover:bg-[#0B1220] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-[#05070B] border border-slate-800 text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      @{platform.handle}
                    </span>
                  </div>

                  <h4 className="text-lg font-heading font-bold text-white mb-1.5">
                    {platform.name}
                  </h4>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                    {platform.description}
                  </p>
                </div>

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#05070B] hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-blue-500 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Open Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Interactive 3D Algorithmic Structure Network */}
        <div className="lg:col-span-6 h-[460px] rounded-3xl bg-[#080D16] border border-slate-800/90 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <AlgoGraphScene />
        </div>
      </div>
    </section>
  );
}
export default CodingJourneySection;

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
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="08"
        tag="ALGORITHMIC PRACTICE"
        title="Beyond Projects."
        subtitle="Continuous algorithmic discipline, competitive rounds, and data structures exploration."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 4 Platform Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CODING_PLATFORMS.map((platform, idx) => {
            const Icon = ICON_MAP[platform.iconName] || LeetCodeIcon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      {platform.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-heading font-bold text-white mb-1">
                    {platform.name}
                  </h4>
                  <div className="text-xs font-mono text-slate-400 mb-3">
                    @{platform.handle}
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6">
                    {platform.description}
                  </p>
                </div>

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Open Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: 3D Algorithmic Structure Visual */}
        <div className="lg:col-span-5 h-[420px] rounded-3xl bg-[#090E17] border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-slate-400 bg-black/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md">
            <span>ALGORITHMIC STRUCTURES NETWORK</span>
          </div>

          <AlgoGraphScene />

          <div className="relative z-10 text-[10px] font-mono text-slate-400 text-center">
            Visual graph representation of continuous DSA drills & patterns
          </div>
        </div>
      </div>
    </section>
  );
}
export default CodingJourneySection;

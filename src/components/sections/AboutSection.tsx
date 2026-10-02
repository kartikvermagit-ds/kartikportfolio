import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Trophy, Terminal, MapPin, Cpu } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { SOCIAL_LINKS } from '../../data/profiles';

export function AboutSection() {
  const facts = [
    {
      icon: GraduationCap,
      title: 'B.Tech CSE — Data Science',
      subtitle: 'PSIT Kanpur (Current Student)',
      tag: 'Academic Track',
      color: '#3B82F6'
    },
    {
      icon: Cpu,
      title: 'AI / Full-Stack / Data',
      subtitle: 'FastAPI, React, Python, Supabase',
      tag: 'Core Focus',
      color: '#8B5CF6'
    },
    {
      icon: Trophy,
      title: 'Hackathons & Sprints',
      subtitle: 'BAH 2026, SIH, UniHack, Orchestrate',
      tag: 'Competitive Builds',
      color: '#10B981'
    },
    {
      icon: Terminal,
      title: 'DSA & Algorithms',
      subtitle: 'LeetCode, Codeforces, HackerRank',
      tag: 'Problem Solving',
      color: '#F59E0B'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story */}
        <div className="lg:col-span-7">
          <SectionHeading
            number="01"
            tag="BACKGROUND & PHILOSOPHY"
            title="Building by Doing."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed font-sans"
          >
            <p>
              I'm <strong className="text-white font-medium">Kartik Verma</strong>, a B.Tech Computer Science student specializing in <span className="text-blue-400 font-medium">Data Science</span> at <span className="text-white font-medium">PSIT Kanpur</span>.
            </p>
            <p>
              I enjoy turning ideas into working software — from AI-powered systems and satellite intelligence platforms to full-stack applications and developer tools.
            </p>
            <p className="text-slate-400">
              My learning is strongly project-driven. I experiment, build, break things, debug them, and keep improving.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {SOCIAL_LINKS.location}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for AI & Full-Stack Projects
            </span>
          </div>
        </div>

        {/* Right Column: 4 Fact Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {facts.map((fact, idx) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-xl bg-[#0B1220]/80 border border-slate-800 hover:border-blue-500/40 transition-colors group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg border flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: `${fact.color}15`,
                      borderColor: `${fact.color}40`,
                      color: fact.color
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                      {fact.tag}
                    </span>
                    <h4 className="text-white font-heading font-bold text-base mt-0.5">
                      {fact.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-sans mt-0.5">
                      {fact.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default AboutSection;

import React from 'react';
import { motion } from 'framer-motion';
import { BrainNetworkScene } from '../3d/BrainNetworkScene';

export function BrainTransitionSection({ scrollProgress }: { scrollProgress: number }) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#05070B] border-y border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4 tracking-wider uppercase"
        >
          [SYSTEM ARCHITECTURE METAPHOR]
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white max-w-3xl leading-tight mb-2"
        >
          "I don't just write code — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">I build systems.</span>"
        </motion.h2>

        <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-xl mb-6">
          Interactive neural core connecting algorithms, real-time data ingestion, and cloud microservices.
        </p>

        {/* 3D Network Canvas */}
        <div className="w-full max-w-4xl relative">
          <BrainNetworkScene scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}
export default BrainTransitionSection;

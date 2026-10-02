import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Zap, Target, Flame, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { HACKATHON_JOURNEY } from '../../data/timeline';

export function HackathonJourneySection() {
  const [selectedEvent, setSelectedEvent] = useState(0);

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="07"
        tag="COMPETITIVE BUILDS"
        title="Built Under Pressure."
        subtitle="Intense hackathons and timed build challenges where architecture, team synchronization, and execution speed matter."
      />

      {/* Interactive Horizontal Timeline Navigation */}
      <div className="relative mb-12">
        {/* Glow Line Track */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-slate-800" />
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${(selectedEvent / (HACKATHON_JOURNEY.length - 1)) * 100}%` }}
        />

        <div className="relative flex justify-between items-center max-w-4xl mx-auto">
          {HACKATHON_JOURNEY.map((item, idx) => {
            const isCurrent = selectedEvent === idx;
            const isPassed = idx <= selectedEvent;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedEvent(idx)}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                    isCurrent
                      ? 'bg-blue-600 border-white shadow-xl shadow-blue-500/50 scale-110'
                      : isPassed
                      ? 'bg-[#0B1220] border-blue-500 text-blue-400'
                      : 'bg-[#0B1220] border-slate-700 text-slate-500 group-hover:border-slate-500'
                  }`}
                >
                  <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 ${isCurrent ? 'text-white' : ''}`} />
                </div>

                <div className="mt-2 text-center hidden sm:block">
                  <span className={`text-[11px] font-mono block ${isCurrent ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                    {item.year}
                  </span>
                  <span className={`text-xs font-heading font-semibold max-w-[120px] truncate block ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                    {item.project}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Event Card */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={selectedEvent}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-10 rounded-3xl bg-[#0B1220] border border-blue-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Accent Glow Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">
                {HACKATHON_JOURNEY[selectedEvent].year} • HACKATHON ENGAGEMENT
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                {HACKATHON_JOURNEY[selectedEvent].event}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300">
                {HACKATHON_JOURNEY[selectedEvent].tag}
              </span>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-heading font-bold text-slate-200">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Engineered Solution: {HACKATHON_JOURNEY[selectedEvent].project}</span>
            </div>

            <p className="text-slate-300 font-sans text-base leading-relaxed">
              {HACKATHON_JOURNEY[selectedEvent].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <Target className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Core Deliverable</div>
                <div className="text-xs font-mono font-semibold text-white">
                  {HACKATHON_JOURNEY[selectedEvent].highlight}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Carousel Steppers */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>MILESTONE {selectedEvent + 1} OF {HACKATHON_JOURNEY.length}</span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={selectedEvent === 0}
                onClick={() => setSelectedEvent((p) => Math.max(0, p - 1))}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-500 text-white"
              >
                ← Prev
              </button>
              <button
                type="button"
                disabled={selectedEvent === HACKATHON_JOURNEY.length - 1}
                onClick={() => setSelectedEvent((p) => Math.min(HACKATHON_JOURNEY.length - 1, p + 1))}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-500 text-white"
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default HackathonJourneySection;

import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { CURRENTLY_BUILDING } from '../../data/profiles';

export function CurrentlyBuildingSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="09"
        tag="LIVE ENGINEERING STATUS"
        title="Currently Building."
        subtitle="Active development focus, exploration tracks, and engineering initiatives."
      />

      <div className="max-w-4xl mx-auto rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="px-5 py-3.5 bg-[#0D1322] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-400 ml-2 font-mono">kartik@engineering-kernel:~$ telemetry --active</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NODE ONLINE</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
          <div className="text-slate-500 pb-2 border-b border-slate-900">
            // ACTIVE PROCESS REGISTRY • KARTIK VERMA
          </div>

          {CURRENTLY_BUILDING.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold shrink-0">→</span>
                <div>
                  <span className="text-white font-bold">{item.topic}</span>
                  <p className="text-slate-400 text-xs font-sans mt-0.5">{item.detail}</p>
                </div>
              </div>

              <span
                className={`self-start sm:self-center text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                  item.status === 'ACTIVE'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : item.status === 'DEVELOPING'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                }`}
              >
                {item.status}
              </span>
            </motion.div>
          ))}

          {/* Animated Blinking Command Line */}
          <div className="pt-4 flex items-center gap-2 text-slate-400 text-xs">
            <span className="text-emerald-400">kartik@dev:~$</span>
            <span className="text-slate-200">await nextSprint.ship()</span>
            <span className="w-2 h-4 bg-blue-400 animate-cursor-blink inline-block" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default CurrentlyBuildingSection;

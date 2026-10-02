import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Clock, Zap, ChevronDown } from 'lucide-react';
import { LEARNING_NODES } from '../../data/chronosatScenario';
import { playPathFeedback } from '../../utils/audioFeedback';

interface TemporalLearningNodesProps {
  reducedMotion?: boolean;
}

export function TemporalLearningNodes({ reducedMotion = false }: TemporalLearningNodesProps) {
  const [expandedId, setExpandedId] = useState<string | null>('interpolation-concept');

  const toggleNode = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    playPathFeedback('tick');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-pink-400" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-5 shadow-xl font-mono space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-pink-400" />
          <span>INTERACTIVE LEARNING NODES</span>
        </div>
        <span className="text-[10px] text-slate-400">CLICK TO EXPAND CONCEPTS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {LEARNING_NODES.map((node) => {
          const isExpanded = expandedId === node.id;

          return (
            <div
              key={node.id}
              className={`rounded-xl border transition-all text-left overflow-hidden ${
                isExpanded
                  ? 'bg-black/80 border-pink-500/50 shadow-lg shadow-pink-500/10'
                  : 'bg-black/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleNode(node.id)}
                aria-expanded={isExpanded}
                className="w-full p-3.5 flex items-start justify-between gap-2 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-400"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getIcon(node.icon)}
                    <span className="text-xs font-bold text-white">{node.title}</span>
                  </div>
                  <div className="text-[10px] text-pink-300 font-semibold">{node.subtitle}</div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 mt-0.5 ${
                    isExpanded ? 'rotate-180 text-pink-400' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-3.5 pb-3.5 space-y-2 border-t border-slate-800/60 pt-2.5"
                  >
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{node.shortDesc}</p>
                    <ul className="space-y-1.5 pt-1">
                      {node.details.map((detail, idx) => (
                        <li key={idx} className="text-[11px] text-slate-400 font-sans flex items-start gap-1.5">
                          <span className="text-pink-400 font-mono text-[9px] mt-0.5">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TemporalLearningNodes;

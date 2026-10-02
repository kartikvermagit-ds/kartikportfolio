import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Layers } from 'lucide-react';

interface HUDCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  accentColor: string;
  floatDelay: number;
}

const HUD_CARDS: HUDCardData[] = [
  {
    id: 'ai',
    title: 'AI',
    subtitle: 'Build Intelligent Solutions',
    icon: BrainCircuit,
    iconColor: 'text-purple-400',
    accentColor: 'border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/10',
    floatDelay: 0
  },
  {
    id: 'data',
    title: 'Data',
    subtitle: 'Find Meaningful Patterns',
    icon: LineChart,
    iconColor: 'text-sky-400',
    accentColor: 'border-sky-500/30 hover:border-sky-400/60 shadow-sky-500/10',
    floatDelay: 0.6
  },
  {
    id: 'systems',
    title: 'Systems',
    subtitle: 'Scalable Real-world Products',
    icon: Layers,
    iconColor: 'text-emerald-400',
    accentColor: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-500/10',
    floatDelay: 1.2
  }
];

export function HeroHUDCards() {
  return (
    <div className="hidden xl:flex flex-col gap-3.5 select-none pointer-events-auto shrink-0 z-20">
      {HUD_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: card.floatDelay * 0.3 + 0.3 }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 4 + card.floatDelay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.floatDelay
              }}
              whileHover={{ scale: 1.04, x: 4 }}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl bg-[#080D16]/70 backdrop-blur-md border ${card.accentColor} shadow-xl transition-all duration-300 group cursor-default w-[210px]`}
            >
              {/* Icon Container */}
              <div className="w-9 h-9 rounded-xl bg-[#05070B] border border-slate-700/60 flex items-center justify-center shrink-0 shadow-inner group-hover:border-slate-500 transition-colors">
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>

              {/* Text Meta */}
              <div className="flex flex-col min-w-0">
                <span className="font-heading font-bold text-xs text-white tracking-wide group-hover:text-blue-300 transition-colors">
                  {card.title}
                </span>
                <span className="text-[10px] font-sans text-slate-400 leading-tight truncate">
                  {card.subtitle}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default HeroHUDCards;

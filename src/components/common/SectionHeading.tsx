import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  number,
  tag,
  title,
  subtitle,
  center = false,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 sm:mb-16 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'} ${className}`}>
      {/* Category Monospace Badge & Section Index */}
      {(number || tag) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex items-center gap-2.5 mb-3 text-xs font-mono tracking-widest uppercase ${
            center ? 'justify-center' : ''
          }`}
        >
          {number && (
            <span className="text-orange-400 font-bold px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 shadow-sm shadow-orange-500/10">
              {number}
            </span>
          )}
          {tag && (
            <span className="text-slate-400 font-medium tracking-wider">
              {tag}
            </span>
          )}
        </motion.div>
      )}

      {/* Main Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-3"
      >
        {title}
      </motion.h2>

      {/* Signature warm orange accent line */}
      <div className={`h-[2px] w-12 bg-gradient-to-r from-orange-500 via-amber-400 to-transparent mb-3 ${center ? 'mx-auto' : ''}`} />

      {/* Editorial Subtitle with Controlled Reading Width */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-[680px]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
export default SectionHeading;

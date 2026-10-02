import React from 'react';

interface SectionHeadingProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({
  number,
  tag,
  title,
  subtitle,
  center = false
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}>
      <div className={`flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-blue-400 uppercase ${center ? 'justify-center' : ''}`}>
        {number && <span className="text-slate-500">[{number}]</span>}
        {tag && (
          <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
            {tag}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
export default SectionHeading;

import React, { useState, useEffect } from 'react';

interface DevLabelProps {
  section: string;
  id?: string;
  type?: string;
  state?: string;
  className?: string;
}

export const DevLabel: React.FC<DevLabelProps> = ({
  section,
  id,
  type = 'SECTION',
  state = 'ACTIVE',
  className = ''
}) => {
  const [isDev, setIsDev] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      localStorage.getItem('kartik-dev-mode') === 'true' ||
      document.documentElement.getAttribute('data-dev-mode') === 'true'
    );
  });

  useEffect(() => {
    const handleToggle = () => {
      setIsDev(
        localStorage.getItem('kartik-dev-mode') === 'true' ||
          document.documentElement.getAttribute('data-dev-mode') === 'true'
      );
    };

    window.addEventListener('toggle-dev-mode', handleToggle);
    window.addEventListener('enable-dev-mode', handleToggle);
    window.addEventListener('disable-dev-mode', handleToggle);

    return () => {
      window.removeEventListener('toggle-dev-mode', handleToggle);
      window.removeEventListener('enable-dev-mode', handleToggle);
      window.removeEventListener('disable-dev-mode', handleToggle);
    };
  }, []);

  if (!isDev) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-[10px] font-mono text-blue-300 shadow-sm backdrop-blur-sm select-none pointer-events-none animate-in fade-in duration-200 ${className}`}
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      <span className="font-semibold text-blue-200">[{type}: {section}]</span>
      {id && <span className="text-slate-400">#{id}</span>}
      <span className="text-blue-400 font-medium">[{state}]</span>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'github'>('default');
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch primary
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestLink = target.closest('a, button, [data-cursor]');
      if (closestLink) {
        const cursorAttr = closestLink.getAttribute('data-cursor');
        if (cursorAttr === 'view' || closestLink.getAttribute('href')?.includes('vercel.app')) {
          setCursorType('project');
        } else if (cursorAttr === 'github' || closestLink.getAttribute('href')?.includes('github.com')) {
          setCursorType('github');
        } else {
          setCursorType('pointer');
        }
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-blue-400"
        style={{
          width: cursorType === 'default' ? 6 : 4,
          height: cursorType === 'default' ? 6 : 4,
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
        }}
        animate={{
          x: position.x - (cursorType === 'default' ? 3 : 2),
          y: position.y - (cursorType === 'default' ? 3 : 2),
          opacity: cursorType === 'project' || cursorType === 'github' ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Outer Ring / Interactive Pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-blue-500/50 backdrop-blur-[2px]"
        animate={{
          x: position.x - (cursorType === 'project' || cursorType === 'github' ? 32 : cursorType === 'pointer' ? 22 : 18),
          y: position.y - (cursorType === 'project' || cursorType === 'github' ? 32 : cursorType === 'pointer' ? 22 : 18),
          width: cursorType === 'project' || cursorType === 'github' ? 64 : cursorType === 'pointer' ? 44 : 36,
          height: cursorType === 'project' || cursorType === 'github' ? 64 : cursorType === 'pointer' ? 44 : 36,
          backgroundColor:
            cursorType === 'project'
              ? 'rgba(59, 130, 246, 0.85)'
              : cursorType === 'github'
              ? 'rgba(15, 23, 42, 0.9)'
              : cursorType === 'pointer'
              ? 'rgba(59, 130, 246, 0.15)'
              : 'rgba(59, 130, 246, 0.04)',
          borderColor:
            cursorType === 'project' || cursorType === 'github'
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(59, 130, 246, 0.4)'
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.2 }}
      >
        {cursorType === 'project' && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-white">VIEW</span>
        )}
        {cursorType === 'github' && (
          <span className="text-[9px] font-mono font-bold tracking-wider text-slate-200">GITHUB</span>
        )}
      </motion.div>
    </>
  );
}
export default CustomCursor;

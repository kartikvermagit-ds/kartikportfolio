import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'github'>('default');
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Ultra-fast motion values (Bypasses React component re-rendering on mousemove)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 500, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorType === 'project' || cursorType === 'github';
  const size = isExpanded ? 64 : cursorType === 'pointer' ? 44 : 32;

  return (
    <>
      {/* Central High-Performance Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-blue-400"
        style={{
          width: 5,
          height: 5,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.9)',
          opacity: isExpanded ? 0 : 1,
          willChange: 'transform'
        }}
      />

      {/* Outer Spring Follower Ring / Interactive Pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-blue-500/50 backdrop-blur-[1px]"
        style={{
          width: size,
          height: size,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor:
            cursorType === 'project'
              ? 'rgba(59, 130, 246, 0.9)'
              : cursorType === 'github'
              ? 'rgba(15, 23, 42, 0.92)'
              : cursorType === 'pointer'
              ? 'rgba(59, 130, 246, 0.15)'
              : 'rgba(59, 130, 246, 0.04)',
          borderColor: isExpanded ? 'rgba(255, 255, 255, 0.4)' : 'rgba(59, 130, 246, 0.4)',
          willChange: 'transform, width, height'
        }}
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

import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const normalizedX = (e.clientX / innerWidth) * 2 - 1;
        const normalizedY = -(e.clientY / innerHeight) * 2 + 1;

        setMousePosition({
          x: e.clientX,
          y: e.clientY,
          normalizedX,
          normalizedY
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mousePosition;
}

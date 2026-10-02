import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3D({ children, className = '' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values to avoid triggering component re-renders on mousemove
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8; // Max tilt 8deg
    const rY = ((x - centerX) / centerX) * 8;

    rawRotateX.set(rX);
    rawRotateY.set(rY);

    // Update CSS variables directly for spotlight without re-rendering JSX
    cardRef.current.style.setProperty('--spotlight-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--spotlight-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          willChange: 'transform'
        }}
        animate={{
          scale: isHovered ? 1.015 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#080D16]/90 backdrop-blur-md preserve-3d transition-colors duration-300 ${
          isHovered ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' : ''
        } ${className}`}
      >
        {/* Hardware-Accelerated Dynamic Light Follower using CSS Variables */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: 'radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(59, 130, 246, 0.4), transparent 60%)'
          }}
        />

        <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
export default Card3D;

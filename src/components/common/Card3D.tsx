import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3D({ children, className = '' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
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
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B1220]/70 backdrop-blur-md preserve-3d transition-colors duration-300 ${
          isHovered ? 'border-blue-500/40 shadow-2xl shadow-blue-500/10' : ''
        } ${className}`}
      >
        {/* Dynamic Light Follower */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(59, 130, 246, 0.45), transparent 60%)`
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

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroCinematicBackgroundProps {
  mouseX?: number;
  mouseY?: number;
}

export function HeroCinematicBackground({ mouseX = 0, mouseY = 0 }: HeroCinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-performance canvas particle & shooting star simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool: mix of cool cosmic stars and warm lantern embers
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const particlesCount = window.innerWidth < 768 ? 35 : 75;
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const isWarm = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isWarm ? Math.random() * 2 + 1 : Math.random() * 1.5 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: isWarm ? -(Math.random() * 0.4 + 0.15) : (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.6 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.3,
        color: isWarm
          ? Math.random() > 0.5
            ? 'rgba(251, 146, 60,' // warm amber
            : 'rgba(245, 185, 66,' // golden
          : Math.random() > 0.5
          ? 'rgba(56, 189, 248,' // cyan
          : 'rgba(167, 139, 250,', // violet
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Occasional shooting star
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 80,
      speed: 12,
      angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
      opacity: 0,
      active: false
    };

    let nextStarTimer = 120;

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Render drifting particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.baseOpacity + Math.sin(time * 3 * p.pulseSpeed + p.pulseOffset) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.05, Math.min(1, currentOpacity))})`;
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${currentOpacity * 0.25})`;
          ctx.fill();
        }
      }

      // Handle shooting star
      if (!shootingStar.active) {
        nextStarTimer--;
        if (nextStarTimer <= 0) {
          shootingStar = {
            x: Math.random() * (width * 0.6),
            y: Math.random() * (height * 0.35),
            length: Math.random() * 60 + 70,
            speed: Math.random() * 8 + 14,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            opacity: 1,
            active: true
          };
          nextStarTimer = Math.floor(Math.random() * 320 + 200);
        }
      } else {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.022;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        } else {
          ctx.save();
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;
          const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.7, `rgba(251, 191, 36, ${shootingStar.opacity * 0.6})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.opacity})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax offsets based on mouse position
  const parallaxX = mouseX * 12;
  const parallaxY = mouseY * 8;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Cinematic Matte Painting Wallpaper */}
      <motion.div
        className="absolute -inset-[3%] w-[106%] h-[106%]"
        animate={{
          x: parallaxX * -0.5,
          y: parallaxY * -0.5
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 120 }}
      >
        <img
          src="/hero-cinematic-bg.jpg"
          alt="Cinematic AI Developer Workspace Background"
          className="w-full h-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.08]"
          loading="eager"
        />
      </motion.div>

      {/* 2. Atmospheric Readability Vignettes & Dark Gradient Wash */}
      {/* Left side gradient ensuring 100% text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070B]/92 via-[#05070B]/68 to-transparent/30" />

      {/* Top navbar dark protection */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#05070B]/95 via-[#05070B]/40 to-transparent" />

      {/* Bottom seamless blend into next sections */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#05070B] via-[#05070B]/70 to-transparent" />

      {/* Subtle radial ambient cosmic glow around Earth & Developer */}
      <div className="absolute right-0 top-0 w-2/3 h-full bg-radial-gradient opacity-40 mix-blend-screen pointer-events-none" />

      {/* 3. Subtle Atmospheric Code Telemetry Lines in Distance */}
      <div className="hidden xl:block absolute top-28 left-[38%] text-[10px] font-mono text-cyan-300/35 tracking-widest space-y-1 select-none pointer-events-none">
        <div>&gt; telemetry.ingest(NASA_FIRMS_STREAM)</div>
        <div>&gt; coords.cluster(lat=26.84, lon=80.94)</div>
        <div>&gt; model.load(weights='geoint_sat_v4')</div>
        <div>&gt; status: 200 OK // latency: 14ms</div>
      </div>

      <div className="hidden xl:block absolute bottom-36 left-[30%] text-[10px] font-mono text-orange-300/30 tracking-widest space-y-1 select-none pointer-events-none">
        <div>&gt; system.pipeline: ACTIVE</div>
        <div>&gt; memory: 64.2MB // FPS: 60</div>
      </div>

      {/* 4. Canvas Particle Field & Embers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* 5. Cyber Grid Overlay at very low opacity */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 mix-blend-overlay pointer-events-none" />
    </div>
  );
}

export default HeroCinematicBackground;

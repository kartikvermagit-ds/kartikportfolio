import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { PathCentralNode } from './PathCentralNode';
import { PathNode } from './PathNode';
import { PathConnections } from './PathConnections';
import { PathRoutePreview } from './PathRoutePreview';
import { ReturningVisitorPrompt } from './ReturningVisitorPrompt';
import { EXPLORATION_PATHS, PATH_STORAGE_KEY } from '../../data/paths';
import { playPathFeedback } from '../../utils/audioFeedback';
import type { PathId, PathItem, RouteStep } from '../../types/path';

interface ChooseYourPathSectionProps {
  onPathSelected?: (pathId: PathId) => void;
}

export function ChooseYourPathSection({ onPathSelected }: ChooseYourPathSectionProps) {
  const [selectedPathId, setSelectedPathId] = useState<PathId | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem(PATH_STORAGE_KEY) as PathId) || null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [hoveredPathId, setHoveredPathId] = useState<PathId | null>(null);
  const [isRouting, setIsRouting] = useState<boolean>(false);
  const [returningVisitorPath, setReturningVisitorPath] = useState<PathItem | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(PATH_STORAGE_KEY) as PathId | null;
        if (saved) {
          return EXPLORATION_PATHS.find((p) => p.id === saved) || null;
        }
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isDismissedReturning, setIsDismissedReturning] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        document.documentElement.getAttribute('data-reduced-motion') === 'true'
      );
    }
    return false;
  });
  const sectionRef = useRef<HTMLElement | null>(null);

  // Subscribe to media query changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleMotionChange);

      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }
  }, []);

  // Desktop subtle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredPathId(null);
  };

  const activePath = EXPLORATION_PATHS.find((p) => p.id === selectedPathId) || null;
  const hoveredPath = EXPLORATION_PATHS.find((p) => p.id === hoveredPathId) || null;
  const previewPath = hoveredPath || activePath;

  // Handle path hover
  const handleHover = useCallback((path: PathItem | null) => {
    setHoveredPathId(path ? path.id : null);
    if (path) {
      playPathFeedback('hover');
    }
  }, []);

  // Safe navigation helper
  const scrollToTarget = useCallback((targetId: string) => {
    if (targetId === 'hero' || targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Handle path selection
  const handleSelectPath = useCallback(
    (path: PathItem) => {
      setSelectedPathId(path.id);
      setIsRouting(true);
      playPathFeedback('select');

      // Persist in localStorage
      try {
        localStorage.setItem(PATH_STORAGE_KEY, path.id);
      } catch {
        // Ignore localStorage error
      }

      // Notify parent or trigger indicator
      if (onPathSelected) {
        onPathSelected(path.id);
      }
      window.dispatchEvent(new CustomEvent('kartik-path-selected', { detail: { pathId: path.id } }));

      // Wait 800ms for user to absorb visual feedback ("ROUTE INITIALIZED"), then smoothly scroll
      setTimeout(() => {
        setIsRouting(false);
        scrollToTarget(path.primaryTargetId);
      }, 800);
    },
    [onPathSelected, scrollToTarget]
  );

  // Direct waypoint navigation
  const handleNavigateToStep = useCallback(
    (step: RouteStep) => {
      playPathFeedback('tick');
      scrollToTarget(step.targetId);
    },
    [scrollToTarget]
  );

  // Open Kartik OS command palette
  const handleOpenOS = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-kartik-os'));
  }, []);

  // Work, Play, Stack, Person node getters
  const workNode = EXPLORATION_PATHS.find((p) => p.id === 'work')!;
  const playNode = EXPLORATION_PATHS.find((p) => p.id === 'play')!;
  const stackNode = EXPLORATION_PATHS.find((p) => p.id === 'stack')!;
  const personNode = EXPLORATION_PATHS.find((p) => p.id === 'person')!;

  return (
    <section
      id="pathways"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto overflow-hidden scroll-mt-20 select-none"
    >
      {/* Background Subtle Tech Ambient Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Heading */}
      <div className="relative z-10">
        <SectionHeading
          number="02 — PATHWAYS"
          tag="WHAT BRINGS YOU HERE?"
          title="Choose Your Path."
          subtitle="Choose a path. I'll show you around."
          center={true}
        />

        {/* Optional Returning Visitor Prompt */}
        <AnimatePresence>
          {returningVisitorPath && !isDismissedReturning && (
            <ReturningVisitorPrompt
              savedPath={returningVisitorPath}
              onContinue={(path) => handleSelectPath(path)}
              onDismiss={() => setIsDismissedReturning(true)}
              reducedMotion={reducedMotion}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP VIEW: Connected Orbital Constellation (lg and above) */}
      {/* ======================================================== */}
      <div className="hidden lg:block relative z-10 max-w-[1080px] mx-auto my-6">
        <div
          className="relative w-full h-[640px] rounded-3xl bg-[#05070B]/80 border border-slate-800/80 p-6 backdrop-blur-sm overflow-hidden shadow-2xl transition-transform duration-300 ease-out"
          style={
            reducedMotion
              ? undefined
              : {
                  transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`
                }
          }
        >
          {/* Animated SVG Connections */}
          <PathConnections
            activePath={activePath}
            hoveredPath={hoveredPath}
            reducedMotion={reducedMotion}
          />

          {/* 1. TOP NODE: WORK */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[340px] z-20">
            <PathNode
              path={workNode}
              isActive={selectedPathId === 'work'}
              isHovered={hoveredPathId === 'work'}
              isDimmed={!!hoveredPathId && hoveredPathId !== 'work'}
              isRouting={isRouting && selectedPathId === 'work'}
              onHover={handleHover}
              onSelect={handleSelectPath}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* 2. LEFT NODE: PLAY */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[300px] z-20">
            <PathNode
              path={playNode}
              isActive={selectedPathId === 'play'}
              isHovered={hoveredPathId === 'play'}
              isDimmed={!!hoveredPathId && hoveredPathId !== 'play'}
              isRouting={isRouting && selectedPathId === 'play'}
              onHover={handleHover}
              onSelect={handleSelectPath}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* 3. CENTER NODE: KARTIK.OS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <PathCentralNode
              activePath={activePath}
              hoveredPath={hoveredPath}
              onOpenOS={handleOpenOS}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* 4. RIGHT NODE: STACK */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[300px] z-20">
            <PathNode
              path={stackNode}
              isActive={selectedPathId === 'stack'}
              isHovered={hoveredPathId === 'stack'}
              isDimmed={!!hoveredPathId && hoveredPathId !== 'stack'}
              isRouting={isRouting && selectedPathId === 'stack'}
              onHover={handleHover}
              onSelect={handleSelectPath}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* 5. BOTTOM NODE: PERSON */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[340px] z-20">
            <PathNode
              path={personNode}
              isActive={selectedPathId === 'person'}
              isHovered={hoveredPathId === 'person'}
              isDimmed={!!hoveredPathId && hoveredPathId !== 'person'}
              isRouting={isRouting && selectedPathId === 'person'}
              onHover={handleHover}
              onSelect={handleSelectPath}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE / TABLET VIEW: Deliberate Vertical Interactive Tree */}
      {/* ======================================================== */}
      <div className="lg:hidden relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Central KARTIK.OS Node Header */}
        <div className="mb-8">
          <PathCentralNode
            activePath={activePath}
            hoveredPath={hoveredPath}
            onOpenOS={handleOpenOS}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Vertical Pulse Line Track */}
        <div className="relative w-full flex flex-col items-center">
          <div className="absolute top-0 bottom-6 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-emerald-500/20 pointer-events-none" />

          {/* 4 Deliberate Sequential Nodes */}
          <div className="w-full space-y-4 relative z-10">
            {EXPLORATION_PATHS.map((path) => (
              <PathNode
                key={path.id}
                path={path}
                isActive={selectedPathId === path.id}
                isHovered={hoveredPathId === path.id}
                isDimmed={!!hoveredPathId && hoveredPathId !== path.id}
                isRouting={isRouting && selectedPathId === path.id}
                onHover={handleHover}
                onSelect={handleSelectPath}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Route Waypoints Preview Bar */}
      <AnimatePresence>
        {previewPath && (
          <div className="relative z-20">
            <PathRoutePreview
              path={previewPath}
              onNavigateToStep={handleNavigateToStep}
              onInitializeRoute={handleSelectPath}
              isRouting={isRouting}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ChooseYourPathSection;

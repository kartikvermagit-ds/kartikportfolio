import { useState, useEffect } from 'react';

export type DeviceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface DeviceCapability {
  tier: DeviceTier;
  isMobile: boolean;
  isTablet: boolean;
  isCoarsePointer: boolean;
  prefersReducedMotion: boolean;
  dpr: number;
}

/**
 * Lightweight, non-blocking device capability detection to tune 3D rendering
 * and animation density without arbitrarily blocking users or breaking fallback UI.
 */
export function useDeviceTier(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() => {
    if (typeof window === 'undefined') {
      return {
        tier: 'HIGH',
        isMobile: false,
        isTablet: false,
        isCoarsePointer: false,
        prefersReducedMotion: false,
        dpr: 1
      };
    }

    const width = window.innerWidth;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Heuristics for Tiering
    let tier: DeviceTier = 'HIGH';
    if (reducedMotion) {
      tier = 'LOW';
    } else if (isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) {
      tier = 'MEDIUM';
    } else if (isTablet) {
      tier = 'MEDIUM';
    }

    return {
      tier,
      isMobile,
      isTablet,
      isCoarsePointer: isCoarse,
      prefersReducedMotion: reducedMotion,
      dpr
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      let tier: DeviceTier = 'HIGH';
      if (reducedMotion) {
        tier = 'LOW';
      } else if (isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) {
        tier = 'MEDIUM';
      } else if (isTablet) {
        tier = 'MEDIUM';
      }

      setCapability({
        tier,
        isMobile,
        isTablet,
        isCoarsePointer: isCoarse,
        prefersReducedMotion: reducedMotion,
        dpr
      });
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      motionQuery.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return capability;
}

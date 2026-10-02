import { useState, useEffect, useCallback, useRef } from 'react';
import {
  EASTER_EGGS_STORAGE_KEY,
  INITIAL_EASTER_EGGS
} from '../data/easterEggs';
import type { EasterEggItem } from '../types/developer';
import { playPathFeedback } from '../utils/audioFeedback';

const KARTIK_SEQUENCE = ['k', 'a', 'r', 't', 'i', 'k'];
const KONAMI_SEQUENCE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright'
];

export function useEasterEggs() {
  const [eggs, setEggs] = useState<EasterEggItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_EASTER_EGGS;
    try {
      const stored = localStorage.getItem(EASTER_EGGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, boolean>;
        return INITIAL_EASTER_EGGS.map((egg) => ({
          ...egg,
          isDiscovered: Boolean(parsed[egg.id])
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_EASTER_EGGS;
  });

  const [activeNotification, setActiveNotification] = useState<EasterEggItem | null>(null);
  const [pingCount, setPingCount] = useState<number>(0);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keySequenceRef = useRef<string[]>([]);
  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      const map: Record<string, boolean> = {};
      eggs.forEach((e) => {
        if (e.isDiscovered) map[e.id] = true;
      });
      localStorage.setItem(EASTER_EGGS_STORAGE_KEY, JSON.stringify(map));
    } catch {}
  }, [eggs]);

  const triggerNotification = useCallback((egg: EasterEggItem) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setActiveNotification(egg);
    playPathFeedback('complete');
    notificationTimeoutRef.current = setTimeout(() => {
      setActiveNotification(null);
    }, 4500);
  }, []);

  const dismissNotification = useCallback(() => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setActiveNotification(null);
  }, []);

  const discoverEgg = useCallback(
    (eggId: string) => {
      setEggs((prev) => {
        const target = prev.find((e) => e.id === eggId);
        if (!target || target.isDiscovered) return prev;

        const updated = prev.map((e) =>
          e.id === eggId ? { ...e, isDiscovered: true, discoveredAt: Date.now() } : e
        );

        const discoveredItem = updated.find((e) => e.id === eggId);
        if (discoveredItem) {
          triggerNotification(discoveredItem);
        }

        // Notify KARTIK.EXPLORE via window event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('kartik-exploration-mark', {
              detail: { id: `ee-${eggId}` }
            })
          );
        }

        // Check if >= 3 Easter eggs are discovered, unlocking DEEP LAYER
        const currentDiscoveredCount = updated.filter(
          (e) => e.isDiscovered && e.id !== 'ee-deep-layer'
        ).length;

        if (currentDiscoveredCount >= 3 && !updated.find((e) => e.id === 'ee-deep-layer')?.isDiscovered) {
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('discover-easter-egg', { detail: { id: 'ee-deep-layer' } })
              );
            }
          }, 1500);
        }

        return updated;
      });
    },
    [triggerNotification]
  );

  const isDiscovered = useCallback(
    (eggId: string) => {
      return Boolean(eggs.find((e) => e.id === eggId)?.isDiscovered);
    },
    [eggs]
  );

  // Ping diagnostic probe handler
  const probePing = useCallback((): { message: string; isComplete: boolean } => {
    const nextCount = pingCount + 1;
    setPingCount(nextCount);
    playPathFeedback('tick');

    if (nextCount === 1) {
      return { message: 'PONG', isComplete: false };
    } else if (nextCount === 2) {
      return { message: 'PONG (ROUNDTRIP 12ms)', isComplete: false };
    } else {
      discoverEgg('ee-system-ping');
      return { message: 'SYSTEM RESPONSE DETECTED • HANDSHAKE OK', isComplete: true };
    }
  }, [pingCount, discoverEgg]);

  // Keyboard sequence detector: K-A-R-T-I-K and Konami
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Clear any pending timeout and restart 1.5s grace period
      if (sequenceTimerRef.current) {
        clearTimeout(sequenceTimerRef.current);
      }
      sequenceTimerRef.current = setTimeout(() => {
        keySequenceRef.current = [];
      }, 1500);

      keySequenceRef.current.push(key);
      if (keySequenceRef.current.length > 20) {
        keySequenceRef.current.shift();
      }

      const current = keySequenceRef.current;

      // Check KARTIK sequence
      if (current.length >= KARTIK_SEQUENCE.length) {
        const slice = current.slice(-KARTIK_SEQUENCE.length);
        if (slice.every((k, i) => k === KARTIK_SEQUENCE[i])) {
          keySequenceRef.current = [];
          discoverEgg('ee-kartik-sequence');
          playPathFeedback('correct');
        }
      }

      // Check Konami sequence
      if (current.length >= KONAMI_SEQUENCE.length) {
        const slice = current.slice(-KONAMI_SEQUENCE.length);
        if (slice.every((k, i) => k === KONAMI_SEQUENCE[i])) {
          keySequenceRef.current = [];
          discoverEgg('ee-konami');
          playPathFeedback('correct');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    };
  }, [discoverEgg]);

  // Listen to external custom events
  useEffect(() => {
    const handleCustomDiscover = (e: Event) => {
      const ce = e as CustomEvent<{ id: string }>;
      if (ce.detail?.id) {
        discoverEgg(ce.detail.id);
      }
    };

    window.addEventListener('discover-easter-egg', handleCustomDiscover);
    return () => window.removeEventListener('discover-easter-egg', handleCustomDiscover);
  }, [discoverEgg]);

  const discoveredCount = eggs.filter((e) => e.isDiscovered).length;
  const totalCount = eggs.length;

  return {
    eggs,
    discoveredCount,
    totalCount,
    activeNotification,
    pingCount,
    discoverEgg,
    isDiscovered,
    dismissNotification,
    probePing
  };
}

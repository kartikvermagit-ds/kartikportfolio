import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getCommandRegistry, filterCommands } from '../data/commands';
import type { CommandItem, SystemTelemetry } from '../types/command';
import type { GitHubRepo } from '../types';

interface UseKartikOSProps {
  repos?: GitHubRepo[];
}

export function useKartikOS({ repos = [] }: UseKartikOSProps = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        document.documentElement.getAttribute('data-reduced-motion') === 'true'
      );
    }
    return false;
  });

  const previousActiveElement = useRef<HTMLElement | null>(null);

  // WebGL support detector
  const webglStatus = useMemo<'READY' | 'UNAVAILABLE'>(() => {
    if (typeof window === 'undefined') return 'READY';
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return gl ? 'READY' : 'UNAVAILABLE';
    } catch {
      return 'UNAVAILABLE';
    }
  }, []);

  // Listen to audio status changes from BackgroundMusic
  useEffect(() => {
    const handleMusicChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      if (customEvent.detail) {
        setAudioActive(customEvent.detail.isPlaying);
      }
    };
    const handleOpenOS = () => {
      openOS();
    };
    window.addEventListener('portfolio-music-change', handleMusicChange);
    window.addEventListener('open-kartik-os', handleOpenOS);
    return () => {
      window.removeEventListener('portfolio-music-change', handleMusicChange);
      window.removeEventListener('open-kartik-os', handleOpenOS);
    };
  }, [openOS]);

  const toggleAudio = useCallback(() => {
    window.dispatchEvent(new CustomEvent('toggle-portfolio-music'));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute('data-reduced-motion', 'true');
      } else {
        document.documentElement.removeAttribute('data-reduced-motion');
      }
      return next;
    });
  }, []);

  const openOS = useCallback(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    setSearchQuery('');
    setSelectedIndex(0);
    setFeedback(null);
  }, []);

  const closeOS = useCallback(() => {
    setIsOpen(false);
    setFeedback(null);
    if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
      previousActiveElement.current.focus();
    }
  }, []);

  const toggleOS = useCallback(() => {
    if (isOpen) {
      closeOS();
    } else {
      openOS();
    }
  }, [isOpen, closeOS, openOS]);

  // Registry of all commands
  const rawCommands = useMemo(() => {
    return getCommandRegistry({
      closeOS,
      setFeedback: (msg: string) => {
        setFeedback(msg);
        // Clear feedback message automatically after 4 seconds
        setTimeout(() => setFeedback(null), 4000);
      },
      toggleAudio,
      toggleReducedMotion
    });
  }, [closeOS, toggleAudio, toggleReducedMotion]);

  // Filtered commands based on user search query
  const filteredCommands = useMemo(() => {
    return filterCommands(rawCommands, searchQuery);
  }, [rawCommands, searchQuery]);

  // Telemetry details
  const telemetry: SystemTelemetry = useMemo(() => {
    return {
      coreStatus: 'ONLINE',
      webglStatus,
      audioStatus: audioActive ? 'ACTIVE' : 'MUTED',
      githubStatus: repos.length > 0 ? 'CONNECTED' : 'ONLINE',
      reposCount: repos.length,
      reducedMotion,
      registeredCommandsCount: rawCommands.length
    };
  }, [webglStatus, audioActive, repos.length, reducedMotion, rawCommands.length]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Global Keyboard Shortcuts (Cmd+K, Ctrl+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac');
      const isModifierPressed = isMac ? e.metaKey : e.ctrlKey;

      // Toggle with Cmd+K or Ctrl+K
      if (isModifierPressed && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        toggleOS();
        return;
      }

      // If OS is open, handle palette controls
      if (isOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeOS();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => {
            if (filteredCommands.length === 0) return 0;
            return (prev + 1) % filteredCommands.length;
          });
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => {
            if (filteredCommands.length === 0) return 0;
            return (prev - 1 + filteredCommands.length) % filteredCommands.length;
          });
          return;
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleOS, closeOS, filteredCommands, selectedIndex]);

  return {
    isOpen,
    openOS,
    closeOS,
    toggleOS,
    searchQuery,
    setSearchQuery,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    allCommands: rawCommands,
    feedback,
    telemetry,
    reducedMotion
  };
}

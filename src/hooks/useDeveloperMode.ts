import { useState, useEffect, useCallback } from 'react';
import {
  DEV_MODE_STORAGE_KEY,
  DEV_PREFERENCES_STORAGE_KEY,
  DEFAULT_DEV_PREFERENCES
} from '../data/easterEggs';
import type { DeveloperPreferences } from '../types/developer';
import { playPathFeedback } from '../utils/audioFeedback';

export function useDeveloperMode() {
  const [isDevMode, setIsDevMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(DEV_MODE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [preferences, setPreferences] = useState<DeveloperPreferences>(() => {
    if (typeof window === 'undefined') return DEFAULT_DEV_PREFERENCES;
    try {
      const raw = localStorage.getItem(DEV_PREFERENCES_STORAGE_KEY);
      if (raw) return { ...DEFAULT_DEV_PREFERENCES, ...JSON.parse(raw) };
    } catch {
      // fallback
    }
    return DEFAULT_DEV_PREFERENCES;
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSourceInspectorOpen, setIsSourceInspectorOpen] = useState(false);
  const [isShortcutHelpOpen, setIsShortcutHelpOpen] = useState(false);
  const [isDeepLayerOpen, setIsDeepLayerOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [showActivationToast, setShowActivationToast] = useState(false);

  // Sync dev mode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DEV_MODE_STORAGE_KEY, String(isDevMode));
    } catch {}
  }, [isDevMode]);

  // Sync preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DEV_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    } catch {}
  }, [preferences]);

  // Apply or remove data-dev-mode on root document
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDevMode) {
      document.documentElement.setAttribute('data-dev-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-dev-mode');
    }
  }, [isDevMode]);

  // Apply or remove wireframe mode on root document
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDevMode && preferences.wireframeEnabled) {
      document.documentElement.setAttribute('data-dev-wireframe', 'true');
    } else {
      document.documentElement.removeAttribute('data-dev-wireframe');
    }
  }, [isDevMode, preferences.wireframeEnabled]);

  // Observe active section in DOM
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = [
      'hero',
      'pathways',
      'about',
      'capabilities',
      'stack',
      'work',
      'pyravex-mission',
      'veridexa-verification',
      'chronosat-timemachine',
      'registry',
      'github',
      'journey',
      'problem-solving',
      'algorithm-escape',
      'code-reactor',
      'system-builder',
      'tech-stack-detective',
      'system-map',
      'currently-building',
      'contact'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { threshold: [0.25] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleDevMode = useCallback(() => {
    setIsDevMode((prev) => {
      const next = !prev;
      playPathFeedback(next ? 'correct' : 'tick');
      if (next) {
        setShowActivationToast(true);
        setTimeout(() => setShowActivationToast(false), 4500);
      }
      return next;
    });
  }, []);

  const enableDevMode = useCallback(() => {
    setIsDevMode(true);
    playPathFeedback('correct');
    setShowActivationToast(true);
    setTimeout(() => setShowActivationToast(false), 4500);
  }, []);

  const disableDevMode = useCallback(() => {
    setIsDevMode(false);
    playPathFeedback('tick');
  }, []);

  const toggleWireframe = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      wireframeEnabled: !prev.wireframeEnabled
    }));
    playPathFeedback('select');
  }, []);

  const toggleOverlayMinimized = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      overlayMinimized: !prev.overlayMinimized
    }));
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      // Ctrl + Shift + D or Cmd + Shift + D: Toggle Developer Mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        toggleDevMode();
        return;
      }

      // If typing in input/textarea, do not capture single key shortcuts
      if (isInput) return;

      // When Developer Mode is active:
      if (isDevMode) {
        // '?' or 'Shift + /': Toggle Shortcut Help
        if (e.key === '?' || (e.shiftKey && e.key === '/')) {
          e.preventDefault();
          setIsShortcutHelpOpen((prev) => !prev);
          return;
        }

        // 'T' or 't': Toggle Terminal
        if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
          return;
        }
      }

      // 'Escape': Close dev modals
      if (e.key === 'Escape') {
        if (isTerminalOpen) {
          setIsTerminalOpen(false);
          e.preventDefault();
        } else if (isSourceInspectorOpen) {
          setIsSourceInspectorOpen(false);
          e.preventDefault();
        } else if (isShortcutHelpOpen) {
          setIsShortcutHelpOpen(false);
          e.preventDefault();
        } else if (isDeepLayerOpen) {
          setIsDeepLayerOpen(false);
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isDevMode,
    isTerminalOpen,
    isSourceInspectorOpen,
    isShortcutHelpOpen,
    isDeepLayerOpen,
    toggleDevMode
  ]);

  // Window custom events
  useEffect(() => {
    const handleToggle = () => toggleDevMode();
    const handleEnable = () => enableDevMode();
    const handleDisable = () => disableDevMode();
    const handleOpenTerminal = () => setIsTerminalOpen(true);
    const handleOpenInspector = () => setIsSourceInspectorOpen(true);
    const handleOpenShortcuts = () => setIsShortcutHelpOpen(true);
    const handleOpenDeepLayer = () => setIsDeepLayerOpen(true);

    window.addEventListener('toggle-dev-mode', handleToggle);
    window.addEventListener('enable-dev-mode', handleEnable);
    window.addEventListener('disable-dev-mode', handleDisable);
    window.addEventListener('open-dev-terminal', handleOpenTerminal);
    window.addEventListener('open-source-inspector', handleOpenInspector);
    window.addEventListener('open-dev-shortcuts', handleOpenShortcuts);
    window.addEventListener('open-deep-layer', handleOpenDeepLayer);

    return () => {
      window.removeEventListener('toggle-dev-mode', handleToggle);
      window.removeEventListener('enable-dev-mode', handleEnable);
      window.removeEventListener('disable-dev-mode', handleDisable);
      window.removeEventListener('open-dev-terminal', handleOpenTerminal);
      window.removeEventListener('open-source-inspector', handleOpenInspector);
      window.removeEventListener('open-dev-shortcuts', handleOpenShortcuts);
      window.removeEventListener('open-deep-layer', handleOpenDeepLayer);
    };
  }, [toggleDevMode, enableDevMode, disableDevMode]);

  return {
    isDevMode,
    preferences,
    activeSectionId,
    isTerminalOpen,
    isSourceInspectorOpen,
    isShortcutHelpOpen,
    isDeepLayerOpen,
    showActivationToast,
    toggleDevMode,
    enableDevMode,
    disableDevMode,
    toggleWireframe,
    toggleOverlayMinimized,
    setIsTerminalOpen,
    setIsSourceInspectorOpen,
    setIsShortcutHelpOpen,
    setIsDeepLayerOpen,
    closeActivationToast: () => setShowActivationToast(false)
  };
}

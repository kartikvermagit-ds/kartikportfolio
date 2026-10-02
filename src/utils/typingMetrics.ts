import type { PersonalBest, TypingSessionResult } from '../types/typing';

export const BEST_STORAGE_KEY = 'kartik-type-best';
export const HISTORY_STORAGE_KEY = 'kartik-type-history';

/**
 * Calculate Gross and Net Words Per Minute
 * Standard industry metric: 5 characters = 1 standard word
 */
export function calculateWpm(
  correctChars: number,
  totalTyped: number,
  elapsedSeconds: number
): { wpm: number; grossWpm: number } {
  if (elapsedSeconds <= 0) {
    return { wpm: 0, grossWpm: 0 };
  }

  const minutes = elapsedSeconds / 60;
  const netWpm = Math.max(0, Math.round((correctChars / 5) / minutes));
  const grossWpm = Math.max(0, Math.round((totalTyped / 5) / minutes));

  return { wpm: netWpm, grossWpm };
}

/**
 * Calculate Typing Accuracy Percentage
 */
export function calculateAccuracy(correctChars: number, totalTyped: number): number {
  if (totalTyped <= 0) return 100;
  const raw = (correctChars / totalTyped) * 100;
  return Math.min(100, Math.max(0, Math.round(raw * 10) / 10));
}

/**
 * Calculate Consistency Score (0 - 100%)
 * Consistency = 100 - standard deviation of WPM samples over time
 */
export function calculateConsistency(wpmHistory: number[]): number {
  if (wpmHistory.length < 2) return 100;

  const validSamples = wpmHistory.filter((w) => w > 0);
  if (validSamples.length < 2) return 100;

  const mean = validSamples.reduce((a, b) => a + b, 0) / validSamples.length;
  if (mean === 0) return 100;

  const variance =
    validSamples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validSamples.length;
  const standardDeviation = Math.sqrt(variance);

  // Coefficient of variation relative percentage
  const varianceRatio = (standardDeviation / mean) * 100;
  return Math.max(0, Math.min(100, Math.round(100 - varianceRatio)));
}

/**
 * Load Personal Best from localStorage safely
 */
export function loadPersonalBest(): PersonalBest | null {
  try {
    const raw = localStorage.getItem(BEST_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersonalBest;
  } catch {
    return null;
  }
}

/**
 * Save Personal Best if new record is achieved
 */
export function checkAndSavePersonalBest(wpm: number, accuracy: number, mode: string): boolean {
  try {
    const current = loadPersonalBest();
    if (!current || wpm > current.wpm) {
      const record: PersonalBest = {
        wpm,
        accuracy,
        timestamp: Date.now(),
        mode
      };
      localStorage.setItem(BEST_STORAGE_KEY, JSON.stringify(record));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Load Session History (Max 5 items)
 */
export function loadSessionHistory(): TypingSessionResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
  } catch {
    return [];
  }
}

/**
 * Append Session History (capped at 5 items)
 */
export function appendSessionHistory(session: TypingSessionResult): void {
  try {
    const current = loadSessionHistory();
    const updated = [session, ...current.filter((s) => s.id !== session.id)].slice(0, 5);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

/**
 * Clear Session History
 */
export function clearSessionHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {}
}

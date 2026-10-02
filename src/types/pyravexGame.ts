export type GameStatus =
  | 'INTRO'
  | 'SCANNING'
  | 'INVESTIGATING'
  | 'CONFIRMATION_SUCCESS'
  | 'CONFIRMATION_FAILURE'
  | 'COMPLETE';

export interface ThermalSignal {
  id: string;
  name: string;
  code: string;
  region: string;
  coordinates: {
    lat: string;
    lon: string;
    mapX: number; // Percentage 0-100 for map placement
    mapY: number; // Percentage 0-100 for map placement
  };
  currentTempKelvin: number;
  intensityPercent: number;
  persistencePercent: number;
  recentChangePercent: number; // e.g. +340% or +8%
  historicalReadings: number[]; // 7-day readings (0-100 scale)
  historicalPattern: 'NORMAL' | 'UNUSUAL' | 'FLAT' | 'CYCLICAL';
  contextClassification: string;
  isAnomaly: boolean;
  evaluationNote: string;
  wrongSelectionReason?: string;
}

export interface ScenarioDefinition {
  id: string;
  missionNumber: string;
  title: string;
  briefing: string;
  signals: ThermalSignal[];
  targetAnomalyId: string;
}

export interface GameState {
  status: GameStatus;
  selectedSignalId: string | null;
  investigatedSignalIds: string[];
  timerSeconds: number;
  isTimerRunning: boolean;
  attemptsCount: number;
  simulationScore: number;
  selectedSignal: ThermalSignal | null;
}

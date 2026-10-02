// Types for ChronoSat: Temporal Time Machine Interactive Simulation

export type TimeMachineMode = 'TIMELINE' | 'BEFORE_AFTER';

export type FrameId = 'T0' | 'INTERMEDIATE' | 'T1';

export interface SatelliteFrameData {
  id: FrameId;
  label: string;
  subLabel: string;
  timestamp: string;
  source: string;
  status: 'GROUND_TRUTH' | 'SYNTHESIZED' | 'TARGET_TRUTH';
  sensor: string;
  resolution: string;
  cloudCover: string;
  spectralBands: string[];
  solarAzimuth: string;
  flowVectorCount?: number;
  synthesisConfidence?: string;
  description: string;
}

export interface TemporalScenario {
  id: string;
  regionName: string;
  coordinates: string;
  sensorConstellation: string;
  temporalGapHours: number;
  gapLabel: string;
  challengeTrack: string;
  frames: {
    t0: SatelliteFrameData;
    intermediate: SatelliteFrameData;
    t1: SatelliteFrameData;
  };
}

export interface LearningNode {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  details: string[];
  icon: string;
}

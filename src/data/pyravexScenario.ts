import type { ScenarioDefinition } from '../types/pyravexGame';

export const PYRAVEX_SCENARIO_01: ScenarioDefinition = {
  id: 'training-scenario-01',
  missionNumber: 'MISSION 01',
  title: 'FIND THE ANOMALY',
  briefing: 'Multiple thermal signals detected across the South Asian geospatial grid. One signal represents an unverified breakout anomaly requiring immediate operational classification.',
  targetAnomalyId: 'sig-d',
  signals: [
    {
      id: 'sig-a',
      name: 'Signal Alpha',
      code: 'SIG-A',
      region: 'Indo-Gangetic Basin',
      coordinates: {
        lat: '26.8° N',
        lon: '80.9° E',
        mapX: 42,
        mapY: 28
      },
      currentTempKelvin: 326,
      intensityPercent: 68,
      persistencePercent: 32,
      recentChangePercent: 8,
      historicalReadings: [62, 64, 60, 65, 63, 67, 68],
      historicalPattern: 'NORMAL',
      contextClassification: 'Seasonal Agricultural Residue Burning',
      isAnomaly: false,
      evaluationNote: 'Moderate thermal intensity consistent with post-harvest seasonal crop management. Nighttime satellite passes show rapid cooling, confirming expected diurnal pattern.',
      wrongSelectionReason: 'Signal Alpha displays elevated heat, but its stable 7-day baseline and low nighttime persistence match seasonal agricultural burning rather than an uncontrolled hazard.'
    },
    {
      id: 'sig-b',
      name: 'Signal Bravo',
      code: 'SIG-B',
      region: 'Western Industrial Belt',
      coordinates: {
        lat: '19.1° N',
        lon: '72.9° E',
        mapX: 25,
        mapY: 52
      },
      currentTempKelvin: 358,
      intensityPercent: 86,
      persistencePercent: 96,
      recentChangePercent: 2,
      historicalReadings: [85, 86, 85, 86, 85, 86, 86],
      historicalPattern: 'FLAT',
      contextClassification: 'Licensed Industrial Thermal / Gas Flare',
      isAnomaly: false,
      evaluationNote: 'Very high continuous thermal output with near-zero historical variance. Geographic coordinates directly overlay registered petrochemical refinery grid infrastructure.',
      wrongSelectionReason: 'Signal Bravo is intense and persistent, but its completely flat 7-day variance overlays a licensed industrial gas flare facility.'
    },
    {
      id: 'sig-c',
      name: 'Signal Charlie',
      code: 'SIG-C',
      region: 'Thar Western Arid Zone',
      coordinates: {
        lat: '27.1° N',
        lon: '71.2° E',
        mapX: 18,
        mapY: 34
      },
      currentTempKelvin: 312,
      intensityPercent: 44,
      persistencePercent: 18,
      recentChangePercent: -6,
      historicalReadings: [45, 44, 43, 45, 42, 43, 44],
      historicalPattern: 'CYCLICAL',
      contextClassification: 'High Albedo Desert Surface Absorption',
      isAnomaly: false,
      evaluationNote: 'Elevated daytime ground heat absorption without combustion radiative power (FRP). Completely vanishes during midnight MODIS passes.',
      wrongSelectionReason: 'Signal Charlie is caused by high-albedo solar heating of barren terrain. It cools completely at night and exhibits zero combustion characteristics.'
    },
    {
      id: 'sig-d',
      name: 'Signal Delta',
      code: 'SIG-D',
      region: 'Eastern Forest Ecological Corridor',
      coordinates: {
        lat: '21.9° N',
        lon: '86.3° E',
        mapX: 68,
        mapY: 42
      },
      currentTempKelvin: 374,
      intensityPercent: 92,
      persistencePercent: 89,
      recentChangePercent: 340,
      historicalReadings: [12, 14, 15, 28, 52, 74, 92],
      historicalPattern: 'UNUSUAL',
      contextClassification: 'Rapid Wildfire Anomaly Breakout',
      isAnomaly: true,
      evaluationNote: 'Exponential 7-day thermal surge (+340%) in dense canopy terrain with strong radiative power (FRP = 142 MW) and high nocturnal persistence. Fits criteria for wildfire incident propagation.',
      wrongSelectionReason: undefined
    },
    {
      id: 'sig-e',
      name: 'Signal Echo',
      code: 'SIG-E',
      region: 'Central Deccan Plateau',
      coordinates: {
        lat: '17.4° N',
        lon: '78.5° E',
        mapX: 45,
        mapY: 64
      },
      currentTempKelvin: 334,
      intensityPercent: 58,
      persistencePercent: 48,
      recentChangePercent: 12,
      historicalReadings: [52, 54, 53, 56, 54, 55, 58],
      historicalPattern: 'CYCLICAL',
      contextClassification: 'Clustered Brick Kiln Operations',
      isAnomaly: false,
      evaluationNote: 'Periodic thermal spikes corresponding to rotational batch firing of brick kilns. Multi-year spatial baselines verify normal operating variance.',
      wrongSelectionReason: 'Signal Echo exhibits periodic batch-firing heat spikes. Historical data confirms normal seasonal brick kiln cluster operations.'
    },
    {
      id: 'sig-f',
      name: 'Signal Foxtrot',
      code: 'SIG-F',
      region: 'Offshore Bay Maritime Terminal',
      coordinates: {
        lat: '16.2° N',
        lon: '82.2° E',
        mapX: 60,
        mapY: 72
      },
      currentTempKelvin: 346,
      intensityPercent: 74,
      persistencePercent: 62,
      recentChangePercent: -12,
      historicalReadings: [82, 80, 78, 77, 76, 75, 74],
      historicalPattern: 'NORMAL',
      contextClassification: 'Offshore Marine Extraction Platform',
      isAnomaly: false,
      evaluationNote: 'Verified maritime coordinates matching offshore extraction terminal with controlled declining thermal trend over recent passes.',
      wrongSelectionReason: 'Signal Foxtrot has verified offshore coordinates and a decreasing thermal trend, indicating controlled platform operations rather than an uncontrolled hazard.'
    }
  ]
};

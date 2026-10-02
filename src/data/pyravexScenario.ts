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
        mapX: 44,
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
        mapX: 26,
        mapY: 54
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
        mapX: 20,
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
        mapY: 44
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
        mapX: 46,
        mapY: 66
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
        mapX: 58,
        mapY: 74
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

export const PYRAVEX_SCENARIO_02: ScenarioDefinition = {
  id: 'training-scenario-02',
  missionNumber: 'MISSION 02',
  title: 'SUB-CANOPY SMOLDERING DETECTION',
  briefing: 'Nighttime satellite orbital passes have recorded localized thermal anomalies. Distinguish stable industrial cooling channels and solar heat retention from a high-risk subsurface peatland breakout.',
  targetAnomalyId: 'sig-2b',
  signals: [
    {
      id: 'sig-2a',
      name: 'Observation Alpha',
      code: 'OBS-01',
      region: 'Punjab Wheat Belt',
      coordinates: {
        lat: '30.9° N',
        lon: '75.8° E',
        mapX: 32,
        mapY: 18
      },
      currentTempKelvin: 320,
      intensityPercent: 62,
      persistencePercent: 28,
      recentChangePercent: 5,
      historicalReadings: [58, 60, 59, 62, 61, 60, 62],
      historicalPattern: 'NORMAL',
      contextClassification: 'Agricultural Residual Stubble',
      isAnomaly: false,
      evaluationNote: 'Predictable seasonal burning pattern with rapid post-sunset cooling.',
      wrongSelectionReason: 'Observation Alpha cools rapidly after dusk. Its predictable diurnal behavior matches standard agricultural residue clearing.'
    },
    {
      id: 'sig-2b',
      name: 'Observation Bravo',
      code: 'OBS-02',
      region: 'Damodar Coalfield Basin',
      coordinates: {
        lat: '23.8° N',
        lon: '86.4° E',
        mapX: 66,
        mapY: 36
      },
      currentTempKelvin: 382,
      intensityPercent: 95,
      persistencePercent: 94,
      recentChangePercent: 280,
      historicalReadings: [18, 22, 25, 42, 65, 82, 95],
      historicalPattern: 'UNUSUAL',
      contextClassification: 'Subsurface Peat & Coal Smoldering Breakout',
      isAnomaly: true,
      evaluationNote: 'Intense continuous nocturnal heat signature with exponential 7-day escalation (+280%). Significant Fire Radiative Power (FRP) sustained through 02:00 UTC midnight passes indicates active underground combustion breaching the surface.',
      wrongSelectionReason: undefined
    },
    {
      id: 'sig-2c',
      name: 'Observation Charlie',
      code: 'OBS-03',
      region: 'Rann of Kutch Salt Flats',
      coordinates: {
        lat: '23.5° N',
        lon: '70.5° E',
        mapX: 16,
        mapY: 46
      },
      currentTempKelvin: 310,
      intensityPercent: 38,
      persistencePercent: 12,
      recentChangePercent: -8,
      historicalReadings: [42, 40, 39, 41, 38, 37, 38],
      historicalPattern: 'CYCLICAL',
      contextClassification: 'Salt Flat Daytime Albedo',
      isAnomaly: false,
      evaluationNote: 'Solar radiative surface heating without combustion spectral signatures.',
      wrongSelectionReason: 'Observation Charlie shows zero nighttime thermal emissivity. The heat is purely caused by intense daytime solar absorption on bare salt crust.'
    },
    {
      id: 'sig-2d',
      name: 'Observation Delta',
      code: 'OBS-04',
      region: 'Chota Nagpur Steel Plant',
      coordinates: {
        lat: '22.8° N',
        lon: '85.9° E',
        mapX: 62,
        mapY: 48
      },
      currentTempKelvin: 362,
      intensityPercent: 88,
      persistencePercent: 98,
      recentChangePercent: 1,
      historicalReadings: [88, 87, 88, 88, 87, 88, 88],
      historicalPattern: 'FLAT',
      contextClassification: 'Blast Furnace Heavy Metallurgy',
      isAnomaly: false,
      evaluationNote: 'Continuous industrial output with zero historical variation across multiple orbital cycles.',
      wrongSelectionReason: 'Observation Delta has high temperature, but its 7-day trend is completely flat and directly overlays a verified industrial steel manufacturing complex.'
    },
    {
      id: 'sig-2e',
      name: 'Observation Echo',
      code: 'OBS-05',
      region: 'Mahanadi River Alluvial Zone',
      coordinates: {
        lat: '20.5° N',
        lon: '85.2° E',
        mapX: 60,
        mapY: 58
      },
      currentTempKelvin: 328,
      intensityPercent: 52,
      persistencePercent: 35,
      recentChangePercent: 10,
      historicalReadings: [48, 50, 49, 51, 50, 52, 52],
      historicalPattern: 'NORMAL',
      contextClassification: 'Brick Kiln Circular Chimney',
      isAnomaly: false,
      evaluationNote: 'Controlled cyclical heating corresponding to regulated firing schedules.',
      wrongSelectionReason: 'Observation Echo represents controlled brick firing operations within normal baseline limits.'
    },
    {
      id: 'sig-2f',
      name: 'Observation Foxtrot',
      code: 'OBS-06',
      region: 'Mumbai Offshore Basin',
      coordinates: {
        lat: '19.4° N',
        lon: '71.3° E',
        mapX: 20,
        mapY: 62
      },
      currentTempKelvin: 348,
      intensityPercent: 78,
      persistencePercent: 70,
      recentChangePercent: -15,
      historicalReadings: [90, 88, 85, 84, 82, 80, 78],
      historicalPattern: 'NORMAL',
      contextClassification: 'Offshore Flare Stack Flareoff',
      isAnomaly: false,
      evaluationNote: 'Decreasing flare activity on licensed offshore production platform.',
      wrongSelectionReason: 'Observation Foxtrot is located in open sea waters at a registered offshore oil platform with declining flare emissions.'
    }
  ]
};

export const PYRAVEX_SCENARIOS: ScenarioDefinition[] = [
  PYRAVEX_SCENARIO_01,
  PYRAVEX_SCENARIO_02
];

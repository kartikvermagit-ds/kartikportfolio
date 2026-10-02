import type { DocumentScenario } from '../types/veridexaGame';

export const VERIDEXA_SCENARIO_01: DocumentScenario = {
  id: 'doc-scenario-vx500',
  docCode: 'DOC-VX500-REV-C',
  title: 'INDUSTRIAL IOT EDGE GATEWAY DATASHEET',
  productModel: 'MODEL: VX-500',
  revision: 'REV 3.2 • CONFIDENTIAL SPECIFICATION',
  category: 'Industrial Automation & Edge Computing',
  summary: 'Technical specification sheet detailing mechanical envelope, electrical power constraints, and operating tolerances for industrial automation deployment.',
  fields: [
    {
      id: 'field-power',
      name: 'Power Consumption',
      category: 'ELECTRICAL',
      documentValue: '120W (Max Continuous)',
      normalizedValue: '120.0 Watts',
      pageCoordinate: {
        page: 1,
        box: '[x:142, y:284, w:110, h:24]'
      },
      hasConflict: true, // The intended conflict!
      evidenceSource: {
        id: 'ev-source-b',
        sourceName: 'LAB-TEST-REPORT-88',
        sourceType: 'Third-Party Electrical Bench Testing Lab',
        evidenceValue: '150W (Peak Sustained Load)',
        simulatedConfidence: 94,
        discrepancyNote: 'Severe Discrepancy: Calibrated power analyzer recorded 150.4W sustained under maximum duty cycle and transceiver transmission. The document lists only 120W (25% under-reported).',
        resolutionExplanation: 'Flagged for Engineering Audit: Operating at 150W exceeds standard 120W power supply thermal dissipation headroom, presenting fire and unexpected shutdown risks.'
      },
      status: 'UNEXTRACTED'
    },
    {
      id: 'field-temp',
      name: 'Operating Temperature',
      category: 'ENVIRONMENTAL',
      documentValue: '-20°C to +60°C',
      normalizedValue: '253.15 K to 333.15 K',
      pageCoordinate: {
        page: 1,
        box: '[x:142, y:320, w:125, h:24]'
      },
      hasConflict: false,
      evidenceSource: {
        id: 'ev-source-c',
        sourceName: 'THERMAL-CHAMBER-RUN-04',
        sourceType: 'Environmental Stress Chamber Telemetry',
        evidenceValue: '-20°C to +60°C Operational',
        simulatedConfidence: 98,
        discrepancyNote: 'Verified Match: Thermal chamber step testing validates sustained CPU clock stability between -20°C and +60°C with zero thermal throttling.',
        resolutionExplanation: 'Grounded & Verified: Document value matches physical chamber test logs.'
      },
      status: 'UNEXTRACTED'
    },
    {
      id: 'field-weight',
      name: 'Total Unit Mass',
      category: 'MECHANICAL',
      documentValue: '4.8 kg',
      normalizedValue: '4.80 kg',
      pageCoordinate: {
        page: 1,
        box: '[x:142, y:356, w:95, h:24]'
      },
      hasConflict: false,
      evidenceSource: {
        id: 'ev-source-d',
        sourceName: 'METROLOGY-WEIGH-LOG-2026',
        sourceType: 'Calibrated QA Metrology Log',
        evidenceValue: '4.82 kg (±0.04 kg)',
        simulatedConfidence: 99,
        discrepancyNote: 'Verified Match: Measured unit mass within allowable engineering tolerance (+0.4% deviation).',
        resolutionExplanation: 'Grounded & Verified: Within acceptable physical assembly tolerance.'
      },
      status: 'UNEXTRACTED'
    },
    {
      id: 'field-ip',
      name: 'Ingress Protection',
      category: 'ENVIRONMENTAL',
      documentValue: 'IP65 Enclosure',
      normalizedValue: 'IEC 60529 IP65',
      pageCoordinate: {
        page: 1,
        box: '[x:142, y:392, w:115, h:24]'
      },
      hasConflict: false,
      evidenceSource: {
        id: 'ev-source-e',
        sourceName: 'TUV-INGRESS-CERT-519',
        sourceType: 'TÜV Dust & Spray Certification',
        evidenceValue: 'IP65 Certified (Dust-Tight, Water Jet)',
        simulatedConfidence: 99,
        discrepancyNote: 'Verified Match: Full dust-tight protection and low-pressure water spray resistance independently validated under standard IEC 60529 test conditions.',
        resolutionExplanation: 'Grounded & Verified: Certified standard matches documentation.'
      },
      status: 'UNEXTRACTED'
    },
    {
      id: 'field-material',
      name: 'Housing Chassis',
      category: 'MATERIAL',
      documentValue: 'Aluminium Alloy 6061-T6',
      normalizedValue: 'Al-Mg-Si Alloy (6061-T6)',
      pageCoordinate: {
        page: 1,
        box: '[x:142, y:428, w:140, h:24]'
      },
      hasConflict: false,
      evidenceSource: {
        id: 'ev-source-f',
        sourceName: 'MILL-METALLURGY-MTR',
        sourceType: 'Mill Material Test Report',
        evidenceValue: 'Grade 6061-T6 Anodized Spec',
        simulatedConfidence: 97,
        discrepancyNote: 'Verified Match: Spectrometric metallurgical assay confirms composition and T6 tempering with yield strength of 276 MPa.',
        resolutionExplanation: 'Grounded & Verified: Material metallurgy confirmed.'
      },
      status: 'UNEXTRACTED'
    }
  ]
};

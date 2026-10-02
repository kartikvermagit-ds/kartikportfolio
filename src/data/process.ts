import type { ProcessStage } from '../types';

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    name: 'Problem',
    summary: 'Identify Real Constraint',
    detail: 'Frame clear engineering questions from raw requirements rather than jumping immediately to code.'
  },
  {
    step: '02',
    name: 'Research',
    summary: 'Explore Existing Solutions',
    detail: 'Analyze documentation, telemetry schemas, and algorithmic papers to avoid reinventing wheels.'
  },
  {
    step: '03',
    name: 'Prototype',
    summary: 'Minimal Viable Pipeline',
    detail: 'Build end-to-end trace from data source to output to verify data fidelity and feasibility early.'
  },
  {
    step: '04',
    name: 'Validate',
    summary: 'Stress & Conflict Tests',
    detail: 'Test edge cases, noisy data inputs, unnormalized formats, and deterministic error paths.'
  },
  {
    step: '05',
    name: 'Build',
    summary: 'Modular Implementation',
    detail: 'Implement type-safe APIs, structured databases, clean state machines, and responsive interfaces.'
  },
  {
    step: '06',
    name: 'Deploy',
    summary: 'Cloud & Client Delivery',
    detail: 'Deploy onto reproducible platforms (Render, Vercel, Supabase) with zero cloud credential leaks.'
  },
  {
    step: '07',
    name: 'Iterate',
    summary: 'Performance & Refinement',
    detail: 'Profile bottlenecks, tighten memory footprints, and evolve the architecture based on runtime observations.'
  }
];

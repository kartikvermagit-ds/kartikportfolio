import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Settings,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Code2
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';

interface VeridexaPipelineRevealProps {
  onPlayAgain: () => void;
  reducedMotion?: boolean;
}

export function VeridexaPipelineReveal({
  onPlayAgain,
  reducedMotion = false
}: VeridexaPipelineRevealProps) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const pipelineStages = [
    {
      step: '01',
      title: 'UNSTRUCTURED DOCUMENT',
      subtitle: 'Raw PDF Datasheets',
      desc: 'Ingests vendor engineering spec sheets, multi-page component catalogues, and scanned equipment manuals without manual data entry.',
      tech: 'FastAPI • PyMuPDF Vector Parsing'
    },
    {
      step: '02',
      title: 'LAYOUT EXTRACTION',
      subtitle: 'Bounding Box Recognition',
      desc: 'Isolates tabular grids, headers, and paragraphs while storing precise [page, x, y, width, height] spatial coordinates for complete auditability.',
      tech: 'Spatial Layout Analysis • Table Parsers'
    },
    {
      step: '03',
      title: 'UNIT NORMALIZATION',
      subtitle: 'Deterministic Standard',
      desc: 'Converts unnormalized engineering units (psi to bar, Watts to HP, Celsius to Kelvin) into unified mathematical baselines via strict rule tables.',
      tech: 'Python Deterministic Rule Engine'
    },
    {
      step: '04',
      title: 'CONFLICT DETECTION',
      subtitle: 'Cross-Field Invariance',
      desc: 'Flags physical contradictions and manufacturer discrepancies (e.g. power rating vs bench test, max temp < ambient) before database write.',
      tech: 'Invariance Rules • Discrepancy Scorer'
    },
    {
      step: '05',
      title: 'EVIDENCE CITATIONS',
      subtitle: 'Grounded Coordinate Links',
      desc: 'Binds every extracted attribute to its exact document coordinate bounding box, enabling human auditors to inspect source proof in one click.',
      tech: 'Coordinate Citations • Audit Trail Store'
    },
    {
      step: '06',
      title: 'AI ENRICHMENT',
      subtitle: 'Schema-Constrained LLM',
      desc: 'Applies schema-constrained language models for taxonomy mapping and semantic categorization in strict zero-hallucination mode.',
      tech: 'Pydantic Schemas • Structured Prompting'
    },
    {
      step: '07',
      title: 'PRODUCT INTELLIGENCE',
      subtitle: 'Audit-Ready Knowledge',
      desc: 'Publishes validated, grounded JSON specifications directly into enterprise procurement, ERP catalogs, and comparative engineering pipelines.',
      tech: 'REST API • SQLAlchemy • JSON Schema'
    }
  ];

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      className="p-6 sm:p-8 rounded-3xl bg-[#080D16]/95 border border-purple-500/30 shadow-2xl relative font-mono select-none"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-WORLD SYSTEM ARCHITECTURE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            This is the Idea Behind VERIDEXA.
          </h3>
        </div>

        <button
          type="button"
          onClick={onPlayAgain}
          data-cursor="pointer"
          className="px-4 py-2 rounded-xl bg-[#05070B] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>VERIFY ANOTHER DOCUMENT</span>
        </button>
      </div>

      {/* Distinction Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-[#05070B] border border-slate-800 text-xs text-slate-300 font-sans mb-8 leading-relaxed">
        <strong className="text-white font-mono block mb-1">
          PORTFOLIO SIMULATION vs PRODUCTION VERIDEXA:
        </strong>
        While this interactive experience uses a simplified model document for demonstration, the real <strong>Veridexa</strong> system implements an end-to-end Python/FastAPI pipeline with PyMuPDF layout extraction, deterministic unit conversions, cross-field rule validation, and grounded coordinate citations.
      </div>

      {/* Sequential 7-Stage Pipeline Visualizer */}
      <div className="mb-8">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-3">
          7-STAGE DOCUMENT INTELLIGENCE PIPELINE (CLICK ANY STAGE TO INSPECT)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
          {pipelineStages.map((stage, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                data-cursor="pointer"
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-purple-950/70 border-purple-400 shadow-md shadow-purple-500/20 scale-[1.02]'
                    : 'bg-[#05070B] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[9px] font-bold ${
                      isActive ? 'text-purple-300' : 'text-slate-500'
                    }`}
                  >
                    STAGE {stage.step}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-purple-400' : 'bg-slate-700'
                    }`}
                  />
                </div>
                <div className="text-[11px] font-bold text-white truncate">
                  {stage.title}
                </div>
                <div className="text-[9px] text-slate-400 truncate mt-0.5 font-sans">
                  {stage.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Card */}
        <div className="p-4 rounded-2xl bg-[#05070B] border border-purple-500/30 text-xs">
          <div className="flex items-center justify-between mb-1.5 border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">
                STAGE {pipelineStages[activeStepIdx].step} — {pipelineStages[activeStepIdx].title}
              </span>
              <span className="text-[10px] text-slate-400">({pipelineStages[activeStepIdx].subtitle})</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-mono">
              TECH: {pipelineStages[activeStepIdx].tech}
            </span>
          </div>
          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            {pipelineStages[activeStepIdx].desc}
          </p>
        </div>
      </div>

      {/* Production Links */}
      <div className="p-5 rounded-2xl bg-[#05070B] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-white block">
            Inspect the Verified Codebase
          </span>
          <span className="text-[10px] text-slate-400 font-sans">
            Explore FastAPI endpoints, PyMuPDF parsers, Pydantic schemas, and unit conversion rules on GitHub.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kartikvermagit-ds/Veridexa"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="github"
            className="px-5 py-2.5 rounded-full bg-[#080D16] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-mono text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <GithubIcon className="w-3.5 h-3.5 text-white" />
            <span>View Source Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default VeridexaPipelineReveal;

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Crosshair
} from 'lucide-react';
import type { DocumentScenario, DocumentSpecificationField } from '../../types/veridexaGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface DocumentViewerProps {
  scenario: DocumentScenario;
  extractedFieldIds: string[];
  selectedFieldId: string | null;
  onExtractField: (field: DocumentSpecificationField) => void;
  reducedMotion?: boolean;
}

export function DocumentViewer({
  scenario,
  extractedFieldIds,
  selectedFieldId,
  onExtractField,
  reducedMotion = false
}: DocumentViewerProps) {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#03060B] border border-slate-800 shadow-xl overflow-hidden font-mono select-none">
      {/* Top Document Header Bar */}
      <div className="p-3 bg-[#080D16] border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="font-bold text-slate-200">{scenario.docCode}</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">| {scenario.productModel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase font-semibold">
            TRAINING DOCUMENT • SIMULATION
          </span>
        </div>
      </div>

      {/* Document Body (Simulated Technical PDF Datasheet) */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs bg-[#05080E] relative scrollbar-thin">
        {/* Subtle PDF Scan / Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

        {/* Document Title Banner */}
        <div className="p-3.5 rounded-xl bg-[#080D16]/90 border border-slate-800/90 relative z-10">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            <span>OFFICIAL ENGINEERING SPECIFICATION</span>
            <span className="text-purple-400 font-semibold">{scenario.revision}</span>
          </div>
          <h4 className="text-sm font-heading font-black text-white">
            {scenario.title}
          </h4>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            {scenario.summary}
          </p>
        </div>

        {/* Interactive Specification Table */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span className="uppercase tracking-wider font-semibold">
              SECTION 3.0 // OPERATING RATINGS (CLICK TO EXTRACT)
            </span>
            <span className="text-purple-400 font-bold">
              {extractedFieldIds.length} / {scenario.fields.length} EXTRACTED
            </span>
          </div>

          <div className="space-y-1.5">
            {scenario.fields.map((field, idx) => {
              const isExtracted = extractedFieldIds.includes(field.id);
              const isSelected = selectedFieldId === field.id;

              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => {
                    playPathFeedback('tick');
                    onExtractField(field);
                  }}
                  data-cursor="pointer"
                  aria-label={`Extract ${field.name}: ${field.documentValue}`}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/70 border-purple-400 shadow-md shadow-purple-500/20'
                      : isExtracted
                      ? 'bg-[#080D16] border-slate-700/80 hover:border-slate-500'
                      : 'bg-[#060910] border-slate-800/80 hover:border-purple-500/60 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Extraction indicator pip */}
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                        isExtracted
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-purple-400 group-hover:text-purple-300'
                      }`}
                    >
                      {isExtracted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[10px] font-bold">0{idx + 1}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-200 block group-hover:text-white">
                        {field.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Page {field.pageCoordinate.page} • {field.pageCoordinate.box}
                      </span>
                    </div>
                  </div>

                  {/* Document Raw Value Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                        isSelected
                          ? 'bg-purple-500/20 text-purple-200 border-purple-400/50'
                          : isExtracted
                          ? 'bg-slate-800 text-slate-200 border-slate-700'
                          : 'bg-[#080D16] text-purple-300 border-purple-500/30 group-hover:border-purple-400'
                      }`}
                    >
                      {field.documentValue}
                    </span>

                    {!isExtracted && (
                      <span className="text-[9px] text-purple-400 hidden sm:inline uppercase font-bold tracking-wider">
                        EXTRACT →
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Document Footer Notes */}
        <div className="p-3 rounded-xl bg-[#080D16]/60 border border-slate-850 text-[10px] text-slate-400 leading-relaxed relative z-10">
          <strong className="text-slate-300 font-mono block mb-0.5">
            LEGAL & ENGINEERING NOTICE:
          </strong>
          Specifications listed above represent vendor-declared maximum ratings. Veridexa mandates cross-referencing against verified testing laboratory bench reports and material test certificates prior to production integration.
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;

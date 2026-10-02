import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import type { DocumentSpecificationField, FieldVerificationStatus } from '../../types/veridexaGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ExtractedDataPanelProps {
  fields: DocumentSpecificationField[];
  extractedFieldIds: string[];
  selectedFieldId: string | null;
  onSelectField: (field: DocumentSpecificationField) => void;
  reducedMotion?: boolean;
}

type FilterOption = 'ALL' | 'CONFLICT' | 'VERIFIED' | 'PENDING';

export function ExtractedDataPanel({
  fields,
  extractedFieldIds,
  selectedFieldId,
  onSelectField,
  reducedMotion = false
}: ExtractedDataPanelProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('ALL');

  // Filter logic
  const filteredFields = fields.filter((field) => {
    const isExtracted = extractedFieldIds.includes(field.id);
    if (!isExtracted && activeFilter !== 'ALL') return false;

    if (activeFilter === 'CONFLICT') return field.hasConflict && isExtracted;
    if (activeFilter === 'VERIFIED') return field.status === 'VERIFIED' || field.status === 'FLAGGED';
    if (activeFilter === 'PENDING') return field.status === 'UNVERIFIED' || !isExtracted;
    return true;
  });

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#03060B] border border-slate-800 shadow-xl overflow-hidden font-mono select-none">
      {/* Panel Header */}
      <div className="p-3 bg-[#080D16] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="font-bold text-slate-200">STRUCTURED DATA</span>
          <span className="text-[10px] text-slate-400">
            ({extractedFieldIds.length}/{fields.length})
          </span>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1">
          {(['ALL', 'CONFLICT', 'VERIFIED', 'PENDING'] as FilterOption[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveFilter(tab);
                playPathFeedback('tick');
              }}
              data-cursor="pointer"
              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                activeFilter === tab
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Field Cards Stream */}
      <div className="p-3.5 sm:p-4 overflow-y-auto flex-1 space-y-2.5 bg-[#05080E] scrollbar-thin">
        {extractedFieldIds.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl my-4 text-xs">
            <Layers className="w-6 h-6 text-slate-500 mx-auto mb-2 opacity-60 animate-pulse" />
            <span className="text-slate-300 font-bold block mb-1">
              No Specifications Extracted Yet
            </span>
            <span className="text-[11px] text-slate-400 font-sans block max-w-xs mx-auto">
              Click specification rows inside the left Document Viewer to extract candidate attributes into structured data.
            </span>
          </div>
        ) : (
          filteredFields.map((field) => {
            const isExtracted = extractedFieldIds.includes(field.id);
            const isSelected = selectedFieldId === field.id;

            if (!isExtracted) {
              return (
                <div
                  key={field.id}
                  className="p-2.5 rounded-xl border border-dashed border-slate-800/80 bg-[#060910]/40 text-slate-400 text-xs flex items-center justify-between opacity-50"
                >
                  <span className="text-[11px]">{field.name}</span>
                  <span className="text-[9px] uppercase">Unextracted</span>
                </div>
              );
            }

            return (
              <motion.button
                key={field.id}
                type="button"
                layout={!reducedMotion}
                onClick={() => {
                  playPathFeedback('tick');
                  onSelectField(field);
                }}
                data-cursor="pointer"
                aria-label={`View evidence for ${field.name}`}
                className={`w-full p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-400 shadow-lg shadow-purple-500/20'
                    : field.hasConflict
                    ? 'bg-[#12070A] border-red-500/60 hover:border-red-400 shadow-sm shadow-red-500/10'
                    : 'bg-[#080D16] border-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Card Top: Category & Status */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {field.category}
                  </span>

                  {/* Status Indicator */}
                  {field.status === 'FLAGGED' ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-purple-400" />
                      <span>FLAGGED FOR AUDIT</span>
                    </span>
                  ) : field.hasConflict ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span>CONFLICT DETECTED</span>
                    </span>
                  ) : field.status === 'VERIFIED' ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>VERIFIED & GROUNDED</span>
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>NEEDS EVIDENCE CHECK</span>
                    </span>
                  )}
                </div>

                {/* Field Name & Document Extracted Value */}
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">{field.name}</span>
                  <span className="font-bold text-purple-300 font-mono">
                    {field.documentValue}
                  </span>
                </div>

                {/* Normalized Standard Value & Citation Coordinates */}
                <div className="mt-1 pt-1.5 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-slate-400">
                    Norm: <strong className="text-slate-300">{field.normalizedValue}</strong>
                  </span>
                  <span className="text-emerald-400/80 font-mono text-[9px]">
                    {field.pageCoordinate.box}
                  </span>
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-[#080D16] border-t border-slate-850 text-[10px] text-slate-400 text-center">
        Select a structured attribute to inspect third-party lab evidence →
      </div>
    </div>
  );
}

export default ExtractedDataPanel;

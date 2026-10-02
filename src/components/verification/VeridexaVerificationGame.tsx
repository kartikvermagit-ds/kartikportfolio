import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Layers,
  FileCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  Clock,
  Compass
} from 'lucide-react';
import { VERIDEXA_SCENARIO_01 } from '../../data/veridexaScenario';
import { VerificationMissionIntro } from './VerificationMissionIntro';
import { DocumentViewer } from './DocumentViewer';
import { ExtractedDataPanel } from './ExtractedDataPanel';
import { EvidencePanel } from './EvidencePanel';
import { VerificationResultModal } from './VerificationResultModal';
import { VeridexaPipelineReveal } from './VeridexaPipelineReveal';
import type {
  VerificationGameStatus,
  DocumentSpecificationField,
  DocumentScenario
} from '../../types/veridexaGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface VeridexaVerificationGameProps {
  reducedMotion?: boolean;
}

export function VeridexaVerificationGame({
  reducedMotion = false
}: VeridexaVerificationGameProps) {
  const [scenario] = useState<DocumentScenario>(VERIDEXA_SCENARIO_01);
  const [status, setStatus] = useState<VerificationGameStatus>('INTRO');
  const [fields, setFields] = useState<DocumentSpecificationField[]>(VERIDEXA_SCENARIO_01.fields);
  const [extractedFieldIds, setExtractedFieldIds] = useState<string[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [flaggedConflictField, setFlaggedConflictField] = useState<DocumentSpecificationField | null>(null);
  const [mobileActiveTab, setMobileActiveTab] = useState<'DOC' | 'DATA' | 'EVIDENCE'>('DOC');

  // Start mission
  const handleStartMission = useCallback(() => {
    setStatus('INVESTIGATING');
    setExtractedFieldIds([]);
    setSelectedFieldId(null);
    setFlaggedConflictField(null);
    setMobileActiveTab('DOC');
    setFields(VERIDEXA_SCENARIO_01.fields.map((f) => ({ ...f, status: 'UNEXTRACTED' })));
  }, []);

  // Extract a field from the document
  const handleExtractField = useCallback((field: DocumentSpecificationField) => {
    setExtractedFieldIds((prev) => {
      if (prev.includes(field.id)) return prev;
      return [...prev, field.id];
    });

    setSelectedFieldId(field.id);
    setFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? { ...f, status: f.hasConflict ? 'CONFLICT' : 'UNVERIFIED' }
          : f
      )
    );

    // On mobile, auto-switch to structured data view when extracted
    if (window.innerWidth < 768) {
      setMobileActiveTab('DATA');
    }
  }, []);

  // Select a field from the structured data table
  const handleSelectField = useCallback((field: DocumentSpecificationField) => {
    setSelectedFieldId(field.id);
    if (window.innerWidth < 768) {
      setMobileActiveTab('EVIDENCE');
    }
  }, []);

  // Make verification decision on evidence
  const handleVerifyField = useCallback(
    (field: DocumentSpecificationField, decision: 'ACCEPT' | 'FLAG') => {
      if (decision === 'FLAG' && field.hasConflict) {
        // Successful conflict identification!
        setFields((prev) =>
          prev.map((f) => (f.id === field.id ? { ...f, status: 'FLAGGED' } : f))
        );
        setFlaggedConflictField(field);
        setStatus('SUCCESS');
        playPathFeedback('select');
      } else if (decision === 'ACCEPT' && !field.hasConflict) {
        // Verified normal field
        setFields((prev) =>
          prev.map((f) => (f.id === field.id ? { ...f, status: 'VERIFIED' } : f))
        );
        playPathFeedback('tick');
      }
    },
    []
  );

  // Advance from modal to pipeline explanation
  const handleContinueToPipeline = useCallback(() => {
    setStatus('COMPLETE');
  }, []);

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  return (
    <div className="w-full font-mono select-none">
      {/* 1. MISSION INTRO */}
      {status === 'INTRO' && (
        <VerificationMissionIntro
          onStartMission={handleStartMission}
          reducedMotion={reducedMotion}
        />
      )}

      {/* 2. ACTIVE INVESTIGATION WORKSPACE */}
      {(status === 'INVESTIGATING' || status === 'SUCCESS') && (
        <div className="space-y-4">
          {/* Tactical Workbench HUD Header Bar */}
          <div className="p-4 rounded-2xl bg-[#080D16]/95 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#05070B] border border-purple-500/30">
                <FileCheck className="w-4 h-4 text-purple-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span>VERIDEXA WORKBENCH</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-purple-400 font-bold">{scenario.docCode}</span>
                </div>
                <div className="text-sm font-heading font-black text-white">
                  Specification Verification Engine
                </div>
              </div>
            </div>

            {/* Metrics & Actions */}
            <div className="flex items-center gap-3 text-[11px]">
              <div className="px-3 py-1.5 rounded-xl bg-[#05070B] border border-slate-800 hidden sm:block">
                <span className="text-slate-400 text-[9px] block">EXTRACTIONS</span>
                <span className="font-bold text-white">
                  {extractedFieldIds.length} / {fields.length} FIELDS
                </span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-[#05070B] border border-slate-800">
                <span className="text-slate-400 text-[9px] block">AUDIT STATUS</span>
                <span className="font-bold text-purple-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>UNDER REVIEW</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleStartMission}
                data-cursor="pointer"
                title="Reset simulation"
                aria-label="Reset simulation"
                className="p-2 rounded-xl bg-[#05070B] border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Tabs (visible only on small screens) */}
          <div className="flex md:hidden items-center gap-1 p-1 bg-[#080D16] border border-slate-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setMobileActiveTab('DOC')}
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-all ${
                mobileActiveTab === 'DOC'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. DOCUMENT
            </button>
            <button
              type="button"
              onClick={() => setMobileActiveTab('DATA')}
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-all ${
                mobileActiveTab === 'DATA'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. DATA ({extractedFieldIds.length})
            </button>
            <button
              type="button"
              onClick={() => setMobileActiveTab('EVIDENCE')}
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-all ${
                mobileActiveTab === 'EVIDENCE'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. EVIDENCE
            </button>
          </div>

          {/* 3-Column Desktop Grid / Responsive Stacking */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch min-h-[520px]">
            {/* Column 1: Document Viewer */}
            <div
              className={`md:col-span-4 h-[500px] md:h-auto ${
                mobileActiveTab !== 'DOC' ? 'hidden md:block' : 'block'
              }`}
            >
              <DocumentViewer
                scenario={scenario}
                extractedFieldIds={extractedFieldIds}
                selectedFieldId={selectedFieldId}
                onExtractField={handleExtractField}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Column 2: Extracted Structured Data */}
            <div
              className={`md:col-span-4 h-[500px] md:h-auto ${
                mobileActiveTab !== 'DATA' ? 'hidden md:block' : 'block'
              }`}
            >
              <ExtractedDataPanel
                fields={fields}
                extractedFieldIds={extractedFieldIds}
                selectedFieldId={selectedFieldId}
                onSelectField={handleSelectField}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Column 3: Evidence Cross-Referencing & Audit Resolution */}
            <div
              className={`md:col-span-4 h-[500px] md:h-auto ${
                mobileActiveTab !== 'EVIDENCE' ? 'hidden md:block' : 'block'
              }`}
            >
              <EvidencePanel
                selectedField={selectedField}
                onVerifyField={handleVerifyField}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>

          {/* Quick Helper Notice */}
          <div className="p-3.5 rounded-xl bg-[#080D16]/90 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                Extract attributes from the document, compare against third-party lab evidence, and flag any specification that violates physical operating invariance rules.
              </span>
            </div>
            <span className="text-[9px] text-slate-400 hidden sm:inline uppercase font-bold">
              PORTFOLIO SIMULATION
            </span>
          </div>
        </div>
      )}

      {/* 3. CONFIRMATION SUCCESS MODAL */}
      <AnimatePresence>
        {status === 'SUCCESS' && flaggedConflictField && (
          <VerificationResultModal
            flaggedField={flaggedConflictField}
            allFields={fields}
            onContinueToPipeline={handleContinueToPipeline}
            onReset={handleStartMission}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* 4. POST-GAME VERIDEXA PIPELINE EXPLANATION */}
      {status === 'COMPLETE' && (
        <VeridexaPipelineReveal
          onPlayAgain={handleStartMission}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}

export default VeridexaVerificationGame;

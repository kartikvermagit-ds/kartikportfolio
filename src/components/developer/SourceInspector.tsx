import React from 'react';
import { X, FolderTree, Cpu, Layers, ShieldCheck } from 'lucide-react';

interface SourceInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceInspector: React.FC<SourceInspectorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Source Architecture Inspector"
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#05070B] border border-purple-500/40 rounded-2xl shadow-2xl shadow-black overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900/80 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-100 tracking-wider uppercase">
                SOURCE ARCHITECTURE INSPECTOR
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Conceptual system topology of Kartik's Portfolio
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Source Inspector"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Architecture Tree */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="text-purple-400 font-bold uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>COMPONENT TOPOLOGY TREE</span>
            </div>
            <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto">
{`PORTFOLIO ARCHITECTURE
├── 01 CORE & UI
│   ├── HeroSection (WebGL Intelligence Core + Dynamic Ambient)
│   ├── ChooseYourPathSection (Multi-route Waypoint Graph)
│   ├── RouteIndicator (Persistent Viewport Status)
│   └── KartikOS (Command Palette & Fuzzy Subsystem Registry)
├── 02 3D & GRAPHICS INFRASTRUCTURE
│   ├── Three.js & React Three Fiber (Canvas & Shader Pipeline)
│   ├── Digital Brain Topology & Dynamic Particle Fields
│   └── 3D DSA Graph Topology & Algorithmic Problem Solving
├── 03 INTERACTIVE LABS & WORKBENCHES
│   ├── Code Reactor (Live Algorithm Execution & Reasoning)
│   ├── System Builder (6-Tier Architecture Simulation Canvas)
│   ├── Tech Stack Detective (Forensic Technology Clues)
│   ├── Live System Map (Living Technical Relationship Graph)
│   ├── Pyravex Anomaly Detection (Satellite Thermal Intelligence)
│   ├── Veridexa Document Audit (Coordinate Field Extraction)
│   └── ChronoSat Time Machine (Temporal Frame Interpolation)
└── 04 VERIFIED SYSTEM DATA
    ├── 5 Flagship Project Case Studies
    ├── Synchronized GitHub Telemetry Cache
    └── Local Storage Persistence (Zero Remote Telemetry)`}
            </pre>
          </div>

          {/* Runtime Stack Badges */}
          <div className="space-y-2">
            <div className="text-slate-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>VERIFIED APPLICATION RUNTIME STACK</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'React 19', role: 'UI Framework' },
                { name: 'TypeScript 5', role: 'Strict Typing' },
                { name: 'Vite 8', role: 'Build Engine' },
                { name: 'Tailwind CSS', role: 'Design Tokens' },
                { name: 'Three.js / R3F', role: '3D Graphics' },
                { name: 'Framer Motion', role: 'Animations' }
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 text-[11px]"
                >
                  <span className="text-slate-200 font-semibold block">{tech.name}</span>
                  <span className="text-slate-500 text-[10px] block">{tech.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Integrity Note */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>
              Zero remote telemetry. No personal data collected. 100% client-side execution.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900/50 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-medium transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

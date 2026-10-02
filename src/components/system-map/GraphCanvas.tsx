import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Globe,
  Code2,
  FileCheck,
  Clock,
  GraduationCap,
  ShieldAlert,
  Zap,
  Database,
  Terminal,
  Activity,
  Layers,
  Map,
  Palette,
  Server,
  Monitor,
  Eye,
  FileText,
  FileCode,
  Radio,
  Wind,
  Cloud,
  CloudRain,
  GitBranch,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Lightbulb,
  Wrench
} from 'lucide-react';
import type {
  GraphNode,
  GraphEdge,
  GraphFilterType,
  ProjectArchitecturePath
} from '../../types/systemGraph';
import { playPathFeedback } from '../../utils/audioFeedback';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  selectedEdgeId: string | null;
  onSelectEdge: (edgeId: string) => void;
  focusedNodeId: string | null;
  activeFilter: GraphFilterType;
  searchQuery: string;
  tracedPath: ProjectArchitecturePath | null;
  reducedMotion?: boolean;
}

// Icon dictionary mapped to node iconName
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  Code2,
  FileCheck,
  Clock,
  GraduationCap,
  ShieldAlert,
  Zap,
  Database,
  Terminal,
  Activity,
  Layers,
  Map,
  Palette,
  Server,
  Monitor,
  Eye,
  FileText,
  FileCode,
  Radio,
  Wind,
  Cloud,
  CloudRain,
  GitBranch,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Lightbulb,
  Wrench
};

export function GraphCanvas({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  selectedEdgeId,
  onSelectEdge,
  focusedNodeId,
  activeFilter,
  searchQuery,
  tracedPath,
  reducedMotion = false
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Zoom and Pan states
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map nodes for O(1) lookup
  const nodeMap = useMemo(() => {
    const map: Record<string, GraphNode> = {};
    nodes.forEach((n) => {
      map[n.id] = n;
    });
    return map;
  }, [nodes]);

  // Determine active node (selected or focused or hovered)
  const activeInspectionId = focusedNodeId || selectedNodeId || hoveredNodeId;

  // Determine directly connected node IDs to the active inspection node
  const directlyConnectedNodeIds = useMemo(() => {
    if (!activeInspectionId) return new Set<string>();
    const set = new Set<string>([activeInspectionId]);
    edges.forEach((e) => {
      if (e.source === activeInspectionId) set.add(e.target);
      if (e.target === activeInspectionId) set.add(e.source);
    });
    return set;
  }, [activeInspectionId, edges]);

  // Traced path node IDs set
  const tracedPathNodeIds = useMemo(() => {
    if (!tracedPath) return new Set<string>();
    return new Set<string>(tracedPath.pathNodeIds);
  }, [tracedPath]);

  // Check if a node matches the current filter
  const matchesFilter = (node: GraphNode): boolean => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'PROJECTS') return node.type === 'project';
    if (activeFilter === 'TECH') return node.type === 'technology';
    if (activeFilter === 'CONCEPTS') return node.type === 'concept';
    if (activeFilter === 'TOOLS') return node.type === 'tool';
    return true;
  };

  // Check if a node matches the current search query
  const matchesSearch = (node: GraphNode): boolean => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      node.label.toLowerCase().includes(q) ||
      (node.sublabel && node.sublabel.toLowerCase().includes(q)) ||
      node.description.toLowerCase().includes(q) ||
      node.category.toLowerCase().includes(q)
    );
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.0));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.6));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'svg' && (e.target as HTMLElement).id !== 'map-canvas-bg') {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-full relative overflow-hidden rounded-2xl border border-white/10 bg-[#050811] shadow-2xl select-none"
      style={{ height: '620px', cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background Architectural Grid */}
      <div
        id="map-canvas-bg"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.08),transparent_100%)] pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
      />

      {/* Zoom / Pan HUD Overlay Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg font-mono">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleResetZoom}
          className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Reset Zoom & Pan"
          aria-label="Reset View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Traced Path HUD Banner (if active) */}
      {tracedPath && (
        <div className="absolute top-4 left-4 z-20 max-w-sm p-3 rounded-xl bg-purple-950/80 backdrop-blur-md border border-purple-500/40 font-mono text-xs shadow-xl space-y-1">
          <div className="flex items-center gap-1.5 text-purple-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>ARCHITECTURAL PIPELINE TRACE</span>
          </div>
          <div className="text-[11px] text-slate-200">{tracedPath.projectName}</div>
          <div className="text-[10px] text-purple-300/80 line-clamp-1">{tracedPath.summary}</div>
        </div>
      )}

      {/* SVG Canvas World */}
      <svg
        viewBox="0 0 1000 700"
        className="w-full h-full transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          transformOrigin: '50% 50%'
        }}
      >
        <defs>
          {/* Subtle Radial Glows for Node Types */}
          <radialGradient id="glow-project" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-tech" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-concept" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* 1. EDGES / RELATIONSHIPS */}
        {/* ============================================================== */}
        <g id="system-edges" className="pointer-events-auto">
          {edges.map((edge) => {
            const source = nodeMap[edge.source];
            const target = nodeMap[edge.target];
            if (!source || !target) return null;

            const isSelected = selectedEdgeId === edge.id;
            const isHovered = hoveredEdgeId === edge.id;

            // Connection is in active inspection if either node is in focus
            const isConnectedToActiveNode =
              activeInspectionId &&
              (edge.source === activeInspectionId || edge.target === activeInspectionId);

            // Connection is in traced path
            const isInTracedPath =
              tracedPathNodeIds.has(edge.source) && tracedPathNodeIds.has(edge.target);

            // Calculate subtle curved path
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const cx = (source.x + target.x) / 2 - dy * 0.08;
            const cy = (source.y + target.y) / 2 + dx * 0.08;
            const pathData = `M ${source.x} ${source.y} Q ${cx} ${cy} ${target.x} ${target.y}`;

            // Determine styling
            let strokeColor = 'rgba(255, 255, 255, 0.12)';
            let strokeWidth = 1.2;
            let opacity = 0.7;

            if (isInTracedPath) {
              strokeColor = '#C084FC'; // Purple glow
              strokeWidth = 2.8;
              opacity = 1;
            } else if (isSelected || isHovered) {
              strokeColor = '#60A5FA'; // Bright blue
              strokeWidth = 2.5;
              opacity = 1;
            } else if (isConnectedToActiveNode) {
              strokeColor = '#38BDF8';
              strokeWidth = 2.0;
              opacity = 0.95;
            } else if (focusedNodeId) {
              // Dim unrelated edges when in focus mode
              opacity = 0.1;
            }

            return (
              <g
                key={edge.id}
                onClick={(e) => {
                  e.stopPropagation();
                  playPathFeedback('tick');
                  onSelectEdge(edge.id);
                }}
                onMouseEnter={() => setHoveredEdgeId(edge.id)}
                onMouseLeave={() => setHoveredEdgeId(null)}
                className="cursor-pointer group"
              >
                {/* Transparent wider stroke for comfortable click detection */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  className="cursor-pointer"
                />

                {/* Visible Edge Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  opacity={opacity}
                  strokeDasharray={edge.isDirect ? 'none' : '4 3'}
                  className="transition-all duration-200"
                />

                {/* Animated Data Packet Signal Pulse on Selected / Active / Traced Edges */}
                {(isSelected || isInConnectedPath(edge, isInTracedPath, isConnectedToActiveNode)) &&
                  !reducedMotion && (
                    <circle r={2.5} fill="#60A5FA" opacity={0.9}>
                      <animateMotion
                        path={pathData}
                        dur="2.5s"
                        repeatCount="indefinite"
                        rotate="auto"
                      />
                    </circle>
                  )}
              </g>
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* 2. NODES */}
        {/* ============================================================== */}
        <g id="system-nodes" className="pointer-events-auto">
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isFocused = focusedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isFilterMatch = matchesFilter(node);
            const isSearchMatch = matchesSearch(node);
            const isConnected = directlyConnectedNodeIds.has(node.id);
            const isInPath = tracedPathNodeIds.has(node.id);

            // Determine visibility/dimming
            let nodeOpacity = 1;
            if (!isFilterMatch || !isSearchMatch) {
              nodeOpacity = 0.15;
            } else if (focusedNodeId && !isConnected) {
              nodeOpacity = 0.12;
            } else if (hoveredNodeId && !isConnected) {
              nodeOpacity = 0.25;
            }

            const Icon = ICON_MAP[node.iconName || 'Circle'] || Activity;

            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.type}: ${node.label} (${node.category})`}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  playPathFeedback('select');
                  onSelectNode(node.id);
                }}
                onMouseEnter={() => {
                  playPathFeedback('hover');
                  setHoveredNodeId(node.id);
                }}
                onMouseLeave={() => setHoveredNodeId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playPathFeedback('select');
                    onSelectNode(node.id);
                  }
                }}
                opacity={nodeOpacity}
                className="cursor-pointer transition-opacity duration-200 outline-none focus:outline-none"
              >
                {/* Glowing Aura for Selected / Traced / Focused Nodes */}
                {(isSelected || isFocused || isInPath) && (
                  <circle
                    r={node.radius + 14}
                    fill={node.color}
                    opacity={0.2}
                    className="animate-pulse"
                  />
                )}

                {/* Node Outer Ring & Shape */}
                {node.type === 'project' ? (
                  // Project Node: Large Hexagonal / Dual Ring Badge
                  <>
                    <circle
                      r={node.radius + 4}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={1.5}
                      strokeDasharray="4 2"
                      opacity={0.6}
                    />
                    <circle
                      r={node.radius}
                      fill="#0A0E1A"
                      stroke={isSelected ? '#FFFFFF' : node.color}
                      strokeWidth={isSelected ? 3 : 2}
                      className="shadow-xl"
                    />
                  </>
                ) : (
                  // Tech / Concept / Tool Node: Rounded Badge
                  <circle
                    r={node.radius}
                    fill="#0B0F1C"
                    stroke={isSelected ? '#FFFFFF' : node.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    opacity={0.95}
                  />
                )}

                {/* Node Icon inside center */}
                <foreignObject
                  x={-10}
                  y={-10}
                  width={20}
                  height={20}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{ color: isSelected ? '#FFFFFF' : node.color }}
                    />
                  </div>
                </foreignObject>

                {/* Label text directly below node */}
                <text
                  y={node.radius + 13}
                  textAnchor="middle"
                  fill={isSelected ? '#FFFFFF' : '#E2E8F0'}
                  fontSize={node.type === 'project' ? 12 : 10}
                  fontWeight={node.type === 'project' ? 'bold' : '600'}
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {node.label}
                </text>

                {/* Subtitle / Category Badge (Project & Tech) */}
                {node.sublabel && (node.type === 'project' || isSelected) && (
                  <text
                    y={node.radius + 24}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize={8}
                    fontFamily="monospace"
                    opacity={0.8}
                    className="pointer-events-none uppercase tracking-wider"
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// Helper checking if an edge is part of a connected path
function isInConnectedPath(
  edge: GraphEdge,
  isInTracedPath: boolean,
  isConnectedToActiveNode: boolean | string | null
): boolean {
  return Boolean(isInTracedPath || isConnectedToActiveNode);
}

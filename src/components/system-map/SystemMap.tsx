import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  GraphFilterType,
  ProjectArchitecturePath
} from '../../types/systemGraph';
import { SYSTEM_GRAPH_DATA } from '../../data/systemGraph';
import { MapIntro } from './MapIntro';
import { GraphCanvas } from './GraphCanvas';
import { MapControls } from './MapControls';
import { NodeInspector } from './NodeInspector';
import { ConnectionInspector } from './ConnectionInspector';
import { MapLegend } from './MapLegend';
import { MapMobileView } from './MapMobileView';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SystemMapProps {
  reducedMotion?: boolean;
}

export function SystemMap({ reducedMotion = false }: SystemMapProps) {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<GraphFilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tracedPathProjectId, setTracedPathProjectId] = useState<string | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);

  // Selected Node reference
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  // Selected Edge reference
  const selectedEdge = useMemo(() => {
    if (!selectedEdgeId) return null;
    return SYSTEM_GRAPH_DATA.edges.find((e) => e.id === selectedEdgeId) || null;
  }, [selectedEdgeId]);

  // Direct connections for selected node
  const directEdges = useMemo(() => {
    if (!selectedNodeId) return [];
    return SYSTEM_GRAPH_DATA.edges
      .filter((e) => e.source === selectedNodeId || e.target === selectedNodeId)
      .map((e) => {
        const otherId = e.source === selectedNodeId ? e.target : e.source;
        const otherNode = SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === otherId)!;
        return { edge: e, connectedNode: otherNode };
      })
      .filter((item) => Boolean(item.connectedNode));
  }, [selectedNodeId]);

  // 2-hop indirect connections for selected node (Section 8)
  const twoHopNodes = useMemo(() => {
    if (!selectedNodeId) return [];
    const directSet = new Set<string>([selectedNodeId]);
    directEdges.forEach(({ connectedNode }) => directSet.add(connectedNode.id));

    const twoHopSet = new Set<string>();
    directEdges.forEach(({ connectedNode }) => {
      SYSTEM_GRAPH_DATA.edges.forEach((e) => {
        if (e.source === connectedNode.id && !directSet.has(e.target)) {
          twoHopSet.add(e.target);
        }
        if (e.target === connectedNode.id && !directSet.has(e.source)) {
          twoHopSet.add(e.source);
        }
      });
    });

    return SYSTEM_GRAPH_DATA.nodes.filter((n) => twoHopSet.has(n.id));
  }, [selectedNodeId, directEdges]);

  // Traced architecture path object
  const activeTracedPath: ProjectArchitecturePath | null = useMemo(() => {
    if (!tracedPathProjectId) return null;
    return SYSTEM_GRAPH_DATA.paths[tracedPathProjectId] || null;
  }, [tracedPathProjectId]);

  // Easter Egg check (Section 39): Connection Loop Detected (Project -> Tech -> Project)
  const isLoopDetected = useMemo(() => {
    if (!selectedEdge) return false;
    const source = SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === selectedEdge.source);
    const target = SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === selectedEdge.target);
    if (!source || !target) return false;

    // If one is tech and connects to multiple projects
    if (source.type === 'technology' || target.type === 'technology') {
      const techId = source.type === 'technology' ? source.id : target.id;
      const connectedProjects = SYSTEM_GRAPH_DATA.edges.filter(
        (e) => (e.source === techId || e.target === techId) &&
               (SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === (e.source === techId ? e.target : e.source))?.type === 'project')
      );
      return connectedProjects.length >= 2;
    }
    return false;
  }, [selectedEdge]);

  // Match count for controls
  const matchingCount = useMemo(() => {
    return SYSTEM_GRAPH_DATA.nodes.filter((node) => {
      // Filter check
      if (activeFilter === 'PROJECTS' && node.type !== 'project') return false;
      if (activeFilter === 'TECH' && node.type !== 'technology') return false;
      if (activeFilter === 'CONCEPTS' && node.type !== 'concept') return false;
      if (activeFilter === 'TOOLS' && node.type !== 'tool') return false;

      // Search check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        node.label.toLowerCase().includes(q) ||
        (node.sublabel && node.sublabel.toLowerCase().includes(q)) ||
        node.description.toLowerCase().includes(q)
      );
    }).length;
  }, [activeFilter, searchQuery]);

  // Reset entire map view
  const handleResetMap = useCallback(() => {
    playPathFeedback('tick');
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setFocusedNodeId(null);
    setActiveFilter('ALL');
    setSearchQuery('');
    setTracedPathProjectId(null);
  }, []);

  // Project navigation integration (Section 26)
  const handleViewProject = useCallback((projectId: string) => {
    window.dispatchEvent(new CustomEvent('open-case-study', { detail: { projectId } }));
    const el = document.getElementById(projectId) || document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // System Builder integration (Section 29)
  const handleOpenSystemBuilder = useCallback((presetId?: string) => {
    if (presetId) {
      window.dispatchEvent(new CustomEvent('system-builder-select-preset', { detail: { presetId } }));
    }
    const el = document.getElementById('system-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Tech Stack Detective integration (Section 30)
  const handleOpenTechDetective = useCallback((_techCaseId?: string) => {
    const el = document.getElementById('tech-stack-detective');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Code Reactor navigation integration (Section 31)
  const handleOpenCodeReactor = useCallback((_challengeId?: string) => {
    const el = document.getElementById('code-reactor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Toggle Trace Path for a project
  const handleToggleTracePath = useCallback((projectId: string) => {
    setTracedPathProjectId((curr) => (curr === projectId ? null : projectId));
  }, []);

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="map-intro"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MapIntro
              hasEntered={hasEntered}
              onEnter={() => {
                setHasEntered(true);
                window.dispatchEvent(new CustomEvent('system-map-entered'));
              }}
              onOpenLegend={() => setIsLegendOpen(true)}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        ) : (
          <motion.div
            key="map-workspace"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Top Interactive Controls Toolbar */}
            <MapControls
              filter={activeFilter}
              onFilterChange={(f) => {
                setActiveFilter(f);
                setSelectedNodeId(null);
                setSelectedEdgeId(null);
              }}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
              onClearSearch={() => setSearchQuery('')}
              isFocused={Boolean(focusedNodeId)}
              onToggleFocus={() => {
                if (focusedNodeId) {
                  setFocusedNodeId(null);
                } else if (selectedNodeId) {
                  setFocusedNodeId(selectedNodeId);
                }
              }}
              hasSelectedNode={Boolean(selectedNodeId)}
              selectedNode={selectedNode}
              onTracePath={handleToggleTracePath}
              isTracingPath={Boolean(tracedPathProjectId)}
              onReset={handleResetMap}
              onOpenLegend={() => setIsLegendOpen(true)}
              matchingCount={matchingCount}
              totalCount={SYSTEM_GRAPH_DATA.nodes.length}
            />

            {/* Desktop Layout: Interactive SVG Graph + Inspector Side Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Canvas Area: 8 Columns on Large Screens */}
              <div
                className={`transition-all duration-300 ${
                  selectedNode || selectedEdge ? 'lg:col-span-8' : 'lg:col-span-12'
                }`}
              >
                <GraphCanvas
                  nodes={SYSTEM_GRAPH_DATA.nodes}
                  edges={SYSTEM_GRAPH_DATA.edges}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={(id) => {
                    setSelectedNodeId(id);
                    setSelectedEdgeId(null);
                  }}
                  selectedEdgeId={selectedEdgeId}
                  onSelectEdge={(id) => {
                    setSelectedEdgeId(id);
                  }}
                  focusedNodeId={focusedNodeId}
                  activeFilter={activeFilter}
                  searchQuery={searchQuery}
                  tracedPath={activeTracedPath}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Inspector Column: 4 Columns on Large Screens */}
              {(selectedNode || selectedEdge) && (
                <div className="lg:col-span-4 space-y-4">
                  {selectedNode && (
                    <NodeInspector
                      node={selectedNode}
                      directEdges={directEdges}
                      twoHopNodes={twoHopNodes}
                      onClose={() => setSelectedNodeId(null)}
                      onSelectNode={(id) => setSelectedNodeId(id)}
                      onSelectEdge={(id) => setSelectedEdgeId(id)}
                      onFocusNode={(id) =>
                        setFocusedNodeId((prev) => (prev === id ? null : id))
                      }
                      isFocused={focusedNodeId === selectedNode.id}
                      onTracePath={handleToggleTracePath}
                      isTracingPath={tracedPathProjectId === selectedNode.projectId}
                      onViewProject={handleViewProject}
                      onOpenSystemBuilder={handleOpenSystemBuilder}
                      onOpenTechDetective={handleOpenTechDetective}
                      onOpenCodeReactor={handleOpenCodeReactor}
                      reducedMotion={reducedMotion}
                    />
                  )}

                  {selectedEdge && (
                    <ConnectionInspector
                      edge={selectedEdge}
                      sourceNode={
                        SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === selectedEdge.source) ||
                        null
                      }
                      targetNode={
                        SYSTEM_GRAPH_DATA.nodes.find((n) => n.id === selectedEdge.target) ||
                        null
                      }
                      onClose={() => setSelectedEdgeId(null)}
                      onSelectNode={(id) => setSelectedNodeId(id)}
                      isLoopDetected={isLoopDetected}
                      reducedMotion={reducedMotion}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Mobile Vertical Relationship Flow (Sections 33 & 34) */}
            <MapMobileView
              nodes={SYSTEM_GRAPH_DATA.nodes}
              edges={SYSTEM_GRAPH_DATA.edges}
              selectedNode={selectedNode}
              onSelectNode={(id) => setSelectedNodeId(id)}
              onViewProject={handleViewProject}
              onOpenSystemBuilder={handleOpenSystemBuilder}
              onOpenTechDetective={handleOpenTechDetective}
              onOpenCodeReactor={handleOpenCodeReactor}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Taxonomy Guide Modal */}
      <MapLegend
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

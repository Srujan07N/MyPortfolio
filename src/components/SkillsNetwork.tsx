import React, { useState } from 'react';
import { SKILL_NODES, SkillNode, PROJECTS } from '../data/portfolioData';
import { Network, Server, Database, Wrench, Layers, ArrowUpRight, Sparkles } from 'lucide-react';
import { playKeyClick, playNavClick } from '../lib/sound';

interface SkillsNetworkProps {
  onSelectProject?: (projectId: string) => void;
  selectedTechId?: string;
}

export const SkillsNetwork: React.FC<SkillsNetworkProps> = ({ onSelectProject, selectedTechId }) => {
  const [activeNodeId, setActiveNodeId] = useState<string>(selectedTechId || 'react');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Database' | 'Tools'>('All');

  const activeNode = SKILL_NODES.find((n) => n.id === activeNodeId) || SKILL_NODES[0];

  const filteredNodes = activeCategory === 'All'
    ? SKILL_NODES
    : SKILL_NODES.filter((n) => n.category === activeCategory);

  // Network topology layout for core nodes
  const networkGraphNodes = [
    { id: 'react', label: 'React', x: 50, y: 16, category: 'Frontend' },
    { id: 'nextjs', label: 'Next.js', x: 26, y: 40, category: 'Frontend' },
    { id: 'nodejs', label: 'Node.js', x: 74, y: 40, category: 'Backend' },
    { id: 'express', label: 'Express.js', x: 80, y: 68, category: 'Backend' },
    { id: 'mongodb', label: 'MongoDB', x: 50, y: 84, category: 'Database' },
    { id: 'typescript', label: 'TypeScript', x: 20, y: 68, category: 'Frontend' },
    { id: 'jwt', label: 'JWT & Auth', x: 50, y: 52, category: 'Backend' },
  ];

  const networkConnections = [
    { from: 'react', to: 'nextjs' },
    { from: 'react', to: 'nodejs' },
    { from: 'react', to: 'typescript' },
    { from: 'nodejs', to: 'express' },
    { from: 'express', to: 'mongodb' },
    { from: 'express', to: 'jwt' },
    { from: 'jwt', to: 'mongodb' },
    { from: 'typescript', to: 'nextjs' },
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[var(--border-base)]">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)]">
          {(['All', 'Frontend', 'Backend', 'Database', 'Tools'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playNavClick();
                setActiveCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[var(--accent-base)] text-black font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-[var(--text-secondary)] font-mono flex items-center gap-2">
          <Network className="w-3.5 h-3.5 text-[var(--accent-base)]" />
          <span>Interactive Full Stack Topology</span>
        </div>
      </div>

      {/* Main Grid: Interactive Topology Graph on Left, Node Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual Interactive Network Map */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          {/* Top Label */}
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono mb-4">
            <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-base)] animate-ping"></span>
              CORE MERN STACK ARCHITECTURE
            </span>
            <span>Click any node to inspect</span>
          </div>

          {/* SVG Connection Lines & Interactive Nodes */}
          <div className="relative w-full h-[280px] sm:h-[300px] my-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="copperLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-base)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--border-focus)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {networkConnections.map((conn, idx) => {
                const nodeA = networkGraphNodes.find((n) => n.id === conn.from);
                const nodeB = networkGraphNodes.find((n) => n.id === conn.to);
                if (!nodeA || !nodeB) return null;
                const isHighlight = activeNodeId === conn.from || activeNodeId === conn.to;
                return (
                  <line
                    key={idx}
                    x1={`${nodeA.x}%`}
                    y1={`${nodeA.y}%`}
                    x2={`${nodeB.x}%`}
                    y2={`${nodeB.y}%`}
                    stroke={isHighlight ? 'var(--accent-base)' : 'var(--border-base)'}
                    strokeWidth={isHighlight ? '2' : '1.2'}
                    strokeDasharray={isHighlight ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Interactive Graph Node Buttons */}
            {networkGraphNodes.map((item) => {
              const isActive = activeNodeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playKeyClick();
                    setActiveNodeId(item.id);
                  }}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-200 shadow-md ${
                    isActive
                      ? 'bg-[var(--accent-base)] text-black border-2 border-[var(--accent-hover)] scale-110 shadow-lg shadow-[var(--accent-base)]/30 z-20'
                      : 'bg-[var(--bg-tag)] text-[var(--text-body)] hover:text-[var(--text-primary)] border border-[var(--border-focus)] hover:border-[var(--accent-base)]/60 hover:scale-105 z-10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-black' : 'bg-[var(--accent-base)]'
                      }`}
                    ></span>
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[var(--border-base)] text-[11px] font-mono text-[var(--text-muted)]">
            <span>Full-Duplex Data Flow (Client → Gateway → Database)</span>
            <span className="text-[var(--accent-base)]">Active: {activeNode.name}</span>
          </div>
        </div>

        {/* Right: Detailed Telemetry Card for Selected Technology */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--accent-base)]/40 bg-[var(--bg-panel)] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-base)]/5 rounded-bl-full pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-base)] pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase text-[var(--accent-base)] tracking-wider">
                  {activeNode.category} Specialization
                </span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
                  {activeNode.name}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[var(--bg-element)] border border-[var(--border-focus)] text-[var(--text-secondary)] font-mono">
                {activeNode.role}
              </span>
            </div>

            {/* Context & Role */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-mono text-[var(--text-muted)] tracking-wider">
                Engineering Application
              </span>
              <p className="text-xs md:text-sm text-[var(--text-body)] leading-relaxed">
                {activeNode.context}
              </p>
            </div>

            {/* Related Stack Technologies */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-mono text-[var(--text-muted)] tracking-wider">
                Integrated Stack Synergy
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.related.map((rel) => (
                  <button
                    key={rel}
                    onClick={() => {
                      const found = SKILL_NODES.find((s) => s.name.toLowerCase() === rel.toLowerCase() || s.id === rel.toLowerCase());
                      if (found) {
                        playKeyClick();
                        setActiveNodeId(found.id);
                      }
                    }}
                    className="px-2 py-0.5 rounded bg-[var(--bg-tag)] hover:bg-[var(--border-alt)] border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--accent-base)] text-[11px] font-mono transition-colors"
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Where It Was Used */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-mono text-[var(--text-muted)] tracking-wider">
                Applied In Verified Projects
              </span>
              <div className="space-y-1.5">
                {activeNode.projectsUsedIn.map((projTitle) => {
                  const matchedProject = PROJECTS.find((p) => p.title.toLowerCase() === projTitle.toLowerCase());
                  return (
                    <div
                      key={projTitle}
                      className="flex items-center justify-between p-2 rounded bg-[var(--bg-input)] border border-[var(--border-base)] text-xs"
                    >
                      <span className="text-[var(--text-primary)] font-medium">{projTitle}</span>
                      {matchedProject && onSelectProject ? (
                        <button
                          onClick={() => {
                            playNavClick();
                            onSelectProject(matchedProject.id);
                          }}
                          className="flex items-center gap-1 text-[var(--accent-base)] hover:text-[var(--accent-hover)] font-mono text-[11px] transition-colors"
                        >
                          <span>Inspect Project</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-[var(--text-muted)] font-mono">Production Application</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-base)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
            <span>Verified Portfolio Competency</span>
            <span className="text-[var(--accent-base)]">Zero Fabricated Percentages</span>
          </div>
        </div>
      </div>

      {/* Full Catalog of All Technologies (Segmented by Category) */}
      <div className="rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-5">
        <div className="text-xs uppercase font-mono text-[var(--text-secondary)] tracking-wider mb-4 flex items-center justify-between">
          <span>Complete Technical Inventory ({filteredNodes.length} Verified Technologies)</span>
          <span className="text-[11px] text-[var(--text-muted)]">Click any badge to view synergy</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {filteredNodes.map((tech) => {
            const isSelected = tech.id === activeNodeId;
            return (
              <button
                key={tech.id}
                onClick={() => {
                  playKeyClick();
                  setActiveNodeId(tech.id);
                }}
                className={`p-2.5 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-[var(--accent-base)]/15 border-[var(--accent-base)] text-[var(--text-primary)] font-semibold shadow-sm'
                    : 'bg-[var(--bg-input)] border border-[var(--border-base)] text-[var(--text-body)] hover:text-[var(--text-primary)] hover:border-[var(--border-focus)] hover:bg-[var(--bg-element)]'
                }`}
              >
                <div className="text-xs font-semibold">{tech.name}</div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5 truncate">{tech.role}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

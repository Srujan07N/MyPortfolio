import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ExternalLink, Github, ArrowUpRight, Search, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { playKeyClick, playNavClick } from '../lib/sound';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Full Stack Web App', 'Security & Governance', 'Finance & Management', 'Institutional Web Platform', 'Business Landing Page'];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
    const matchesQuery =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-base)]">
        <div>
          <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
            Verified Engineering Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
            PROJECT ARCHIVE
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Engineered with modern full-stack architecture, clean API contracts, and responsive UI.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or title..."
            className="bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] outline-none font-mono w-full"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playNavClick();
              setFilterCategory(cat);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-[var(--accent-base)] text-black font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)] border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              playNavClick();
              onSelectProject(project);
            }}
            className="group relative rounded-xl border border-[var(--border-base)] hover:border-[var(--accent-base)]/50 bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-alt)] p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[var(--accent-base)]/5"
          >
            <div>
              {/* Top Meta Line */}
              <div className="flex items-center justify-between border-b border-[var(--border-alt)] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[var(--accent-base)] font-bold">
                    {project.number}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">·</span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">{project.category}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] group-hover:text-[var(--accent-hover)] transition-colors">
                  <span>Inspect Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Short Description */}
              <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-hover)] transition-colors tracking-tight">
                {project.title}
              </h3>

              <p className="mt-2 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Visual: Screenshot or Blueprint */}
              {project.image ? (
                <div className="my-5 rounded-lg overflow-hidden border border-[var(--border-subtle)] group-hover:border-[var(--border-element)] transition-colors relative">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-36 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-emerald-300">Live Preview</span>
                  </div>
                </div>
              ) : (
                <div className="my-5 p-3.5 rounded-lg bg-[var(--bg-panel-alt)] border border-[var(--border-subtle)] group-hover:border-[var(--border-element)] transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-base)]"></span>
                      SYSTEM BLUEPRINT
                    </span>
                    <span>MERN STACK</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono py-1">
                    <div className="p-2 rounded bg-[var(--bg-panel)] border border-[var(--border-alt)] text-[var(--text-primary)]">
                      <span className="text-[10px] text-[var(--text-secondary)] block">Client</span>
                      React SPA
                    </div>
                    <div className="p-2 rounded bg-[var(--bg-panel)] border border-[var(--border-alt)] text-[var(--accent-base)]">
                      <span className="text-[10px] text-[var(--text-secondary)] block">Gateway</span>
                      Express / JWT
                    </div>
                    <div className="p-2 rounded bg-[var(--bg-panel)] border border-[var(--border-alt)] text-[var(--text-primary)]">
                      <span className="text-[10px] text-[var(--text-secondary)] block">Storage</span>
                      MongoDB
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: Technologies & Links */}
            <div className="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-base)] text-[11px] font-mono text-[var(--text-body)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playKeyClick();
                    }}
                    className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-[var(--accent-base)]" />
                    <span className="font-mono">Repository</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playKeyClick();
                      }}
                      className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-hover)]" />
                      <span className="font-mono">Live Demo</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] font-mono text-[var(--text-placeholder)]">
                  Status: <span className={project.status === 'Active' ? 'text-emerald-400' : 'text-[var(--text-primary)]'}>{project.status}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

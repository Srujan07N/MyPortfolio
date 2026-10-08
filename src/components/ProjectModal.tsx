import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { playKeyClick, playNavClick } from '../lib/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playKeyClick();
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl border border-[var(--border-focus)] bg-[var(--bg-panel)] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-base)] bg-[var(--bg-panel-alt)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent-base)] px-2 py-0.5 rounded bg-[var(--accent-base)]/10 border border-[var(--accent-base)]/20">
              PROJECT {project.number}
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-mono">{project.category}</span>
          </div>

          <button
            onClick={() => {
              playKeyClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-alt)] transition-colors"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">

          {/* Screenshot Preview Banner */}
          {project.image && (
            <div className="relative -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-2 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-48 md:h-64 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-panel)] via-[var(--bg-panel)]/20 to-transparent pointer-events-none" />
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Title & Overview */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playNavClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-element)] hover:bg-[var(--bg-element-hover)] text-[var(--text-primary)] border border-[var(--border-focus)] text-xs font-medium transition-colors"
            >
              <Github className="w-4 h-4 text-[var(--accent-base)]" />
              <span>Inspect Source on GitHub</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playNavClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-base)] hover:bg-[var(--accent-hover)] text-black font-semibold text-xs transition-colors shadow-lg shadow-[var(--accent-base)]/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Deployment Preview</span>
              </a>
            )}
          </div>

          {/* Technologies Used */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono mb-3">
              Technologies & Stack
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[var(--bg-input)] border border-[var(--border-base)] text-[var(--text-body)] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-panel-alt)] border border-[var(--border-base)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--text-secondary)]">
                <ShieldAlert className="w-4 h-4 text-[var(--accent-base)]" />
                <span>The Challenge / Problem</span>
              </div>
              <p className="text-xs md:text-sm text-[var(--text-body)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-panel-alt)] border border-[var(--border-base)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--text-secondary)]">
                <Cpu className="w-4 h-4 text-[var(--accent-hover)]" />
                <span>Architectural Solution</span>
              </div>
              <p className="text-xs md:text-sm text-[var(--text-body)] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Details */}
          <div className="p-5 rounded-lg bg-[var(--bg-panel-alt)] border border-[var(--border-base)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--accent-base)]">
              <Layers className="w-4 h-4" />
              <span>Full Stack Architecture Implementation</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              {project.architecture}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono mb-3">
              Key Engineering Features
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-panel-alt)] border border-[var(--border-base)] text-xs text-[var(--text-body)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-base)] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[var(--border-base)] bg-[var(--bg-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
          <span>SRUJAN.N PROJECT REGISTRY</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};

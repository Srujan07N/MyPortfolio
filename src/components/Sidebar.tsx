import React from 'react';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  FileDown,
  FolderArchive,
  Github,
  Linkedin,
  Terminal,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { playNavClick, playKeyClick } from '../lib/sound';

interface SidebarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onDownloadResume: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  onDownloadResume,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleItemClick = (id: string) => {
    playNavClick();
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-[var(--bg-panel)] border-r border-[var(--border-base)] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Top: Brand Header */}
        <div>
          <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--border-base)]">
            <button
              onClick={() => handleItemClick('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-7 h-7 rounded-md bg-[var(--bg-input)] border border-[var(--accent-base)]/50 flex items-center justify-center text-[var(--accent-base)] group-hover:border-[var(--accent-base)] transition-colors">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-sm tracking-widest text-[var(--text-primary)] group-hover:text-[var(--accent-hover)] transition-colors">
                  SRUJAN.N
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
                  Developer OS
                </span>
              </div>
            </button>

            <button
              onClick={onCloseMobile}
              className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-placeholder)]">
              Core Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${isActive
                    ? 'bg-[var(--accent-base)]/10 text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tag)]'
                    }`}
                >
                  {/* Copper Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[var(--accent-base)]"></span>
                  )}

                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${isActive ? 'text-[var(--accent-base)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                        }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-base)]"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & Availability */}
        <div className="p-4 border-t border-[var(--border-base)] space-y-3 bg-[var(--bg-panel-alt)]">
          {/* Action Buttons: Resume & Project ZIP */}
          <div className="space-y-1.5">
            <button
              onClick={() => {
                playNavClick();
                onDownloadResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[var(--bg-element)] hover:bg-[var(--border-alt)] border border-[var(--border-element)] hover:border-[var(--accent-base)]/40 text-[var(--text-primary)] text-xs font-medium transition-all group"
            >
              <FileDown className="w-3.5 h-3.5 text-[var(--accent-base)] group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playKeyClick}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-[var(--bg-input)] hover:bg-[var(--bg-element)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-alt)] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">GitHub</span>
            </a>

            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playKeyClick}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-[var(--bg-input)] hover:bg-[var(--bg-element)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-alt)] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">LinkedIn</span>
            </a>
          </div>

          {/* Availability Status */}
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-base)] animate-pulse"></span>
              <span className="text-[var(--accent-base)] font-semibold tracking-wider text-[10px]">
                AVAILABLE FOR WORK
              </span>
            </div>
            <span className="text-[var(--text-placeholder)]">Full Stack</span>
          </div>
        </div>
      </aside>
    </>
  );
};

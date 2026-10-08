import React, { useState, useEffect } from 'react';
import {
  PROFILE_INFO,
  PROJECTS,
  SKILL_NODES,
  EDUCATION_DATA,
  VERIFIED_METRICS,
  Project,
} from '../data/portfolioData';
import { ThreeWorkspace } from './ThreeWorkspace';
import {
  ArrowRight,
  Download,
  Terminal,
  ExternalLink,
  Layers,
  Cpu,
  GraduationCap,
  Sparkles,
  Github,
  CheckCircle2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { playNavClick, playKeyClick } from '../lib/sound';
import meImg from '../assets/me.png';
import idCardImg from '../assets/id-card.jpg';

const TITLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "MERN Stack Developer",
  "DevOps Engineer"
];

interface DashboardHomeProps {
  onNavigate: (section: string) => void;
  onSelectProject: (project: Project) => void;
  onDownloadResume: () => void;
  onSelectTech: (techName: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onNavigate,
  onSelectProject,
  onDownloadResume,
  onSelectTech,
}) => {
  const [greeting, setGreeting] = useState("Good day, I'm Srujan 👋");

  // Typing animation state
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning, I'm Srujan 👋");
    } else if (hour < 18) {
      setGreeting("Good afternoon, I'm Srujan 👋");
    } else {
      setGreeting("Good evening, I'm Srujan 👋");
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = TITLES[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        if (currentText.length <= 1) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }, 30);
    } else {
      if (currentText === currentTitle) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        }, 50);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <div className="space-y-10">
      {/* Hero Greeting Section */}
      <div className="relative rounded-2xl border border-[var(--border-base)] bg-gradient-to-b from-[var(--bg-panel-alt)] to-[var(--bg-panel)] p-6 sm:p-10 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Subtle background copper gradient orb */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent-base)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-element)] border border-[var(--border-element)] text-xs font-mono text-[var(--accent-base)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-base)] animate-ping"></span>
            <span>SRUJAN.N // OPERATING SYSTEM v2.6</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight text-balance leading-tight">
              {greeting}
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--accent-base)] tracking-tight min-h-[32px] sm:min-h-[40px] flex items-center">
              {currentText}
              <span className="w-[3px] h-[1em] bg-[var(--accent-base)] ml-1 animate-pulse"></span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed text-balance">
            {PROFILE_INFO.greeting}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => {
                playNavClick();
                onNavigate('projects');
              }}
              className="px-5 py-2.5 rounded-lg bg-[var(--accent-base)] hover:bg-[var(--accent-hover)] text-black font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-[var(--accent-base)]/20 flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playNavClick();
                onDownloadResume();
              }}
              className="px-5 py-2.5 rounded-lg bg-[var(--bg-element)] hover:bg-[var(--bg-element-hover)] text-[var(--text-primary)] border border-[var(--border-focus)] hover:border-[var(--accent-base)]/40 font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[var(--accent-base)]" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => {
                playNavClick();
                onNavigate('contact');
              }}
              className="px-4 py-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Let&apos;s Connect</span>
              <span className="text-[var(--accent-base)]">→</span>
            </button>
          </div>
        </div>

        {/* College ID Card Image */}
        <div 
          className="relative z-10 shrink-0 group cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <div 
            className="w-44 md:w-56 rounded-2xl overflow-hidden border border-[var(--border-focus)] transition-all duration-300 shadow-2xl ease-out relative"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              e.currentTarget.style.transform = `rotateX(${-y / 10}deg) rotateY(${x / 10}deg) scale3d(1.04, 1.04, 1.04)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            }}
          >
            <img src={idCardImg} alt="Srujan N — College ID Card" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-base)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
          </div>
          {/* Copper glow behind the card on hover */}
          <div 
            className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-2xl -z-10" 
            style={{ background: 'radial-gradient(ellipse at center, var(--accent-base) 0%, transparent 70%)' }}
          ></div>
        </div>
      </div>

      {/* 4 Verified Profile Metrics Cards (Rule 7 & 26 strictly enforced) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Projects */}
        <div
          onClick={() => {
            playNavClick();
            onNavigate('projects');
          }}
          className="group p-5 rounded-xl border border-[var(--border-base)] hover:border-[var(--accent-base)]/40 bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-alt)] transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider">PROJECTS</span>
            <Layers className="w-4 h-4 text-[var(--accent-base)]" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-[var(--text-primary)] tracking-tight tabular-nums">
              0{VERIFIED_METRICS.projectsCount} Verified
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Explore engineering archive</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-[var(--accent-base)] group-hover:text-[var(--accent-hover)] transition-colors pt-2 border-t border-[var(--border-subtle)]">
            <span>View all →</span>
          </div>
        </div>

        {/* Card 2: Tech Stack */}
        <div
          onClick={() => {
            playNavClick();
            onNavigate('skills');
          }}
          className="group p-5 rounded-xl border border-[var(--border-base)] hover:border-[var(--accent-base)]/40 bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-alt)] transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider">TECH STACK</span>
            <Cpu className="w-4 h-4 text-[var(--accent-base)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Full Stack
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">MERN & modern web topology</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-[var(--accent-base)] group-hover:text-[var(--accent-hover)] transition-colors pt-2 border-t border-[var(--border-subtle)]">
            <span>View skills →</span>
          </div>
        </div>

        {/* Card 3: Experience & Education */}
        <div
          onClick={() => {
            playNavClick();
            onNavigate('education');
          }}
          className="group p-5 rounded-xl border border-[var(--border-base)] hover:border-[var(--accent-base)]/40 bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-alt)] transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider">EDUCATION</span>
            <GraduationCap className="w-4 h-4 text-[var(--accent-base)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              MCA
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Shree Devi Inst. (2024 — 2026)</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-[var(--accent-base)] group-hover:text-[var(--accent-hover)] transition-colors pt-2 border-t border-[var(--border-subtle)]">
            <span>View timeline →</span>
          </div>
        </div>

        {/* Card 4: Current Status */}
        <div
          onClick={() => {
            playNavClick();
            onNavigate('contact');
          }}
          className="group p-5 rounded-xl border border-[var(--border-base)] hover:border-[var(--accent-base)]/40 bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-alt)] transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider">CURRENT STATUS</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-base)] animate-pulse"></span>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--accent-base)] tracking-tight">
              Available
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Full-time roles & projects</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-[var(--accent-base)] group-hover:text-[var(--accent-hover)] transition-colors pt-2 border-t border-[var(--border-subtle)]">
            <span>Let&apos;s connect →</span>
          </div>
        </div>
      </div>

      {/* 3D Developer Visualization Centerpiece (Section 8) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
              3D Workspace Simulation
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">Three.js WebGL Engine</span>
        </div>

        <ThreeWorkspace
          onSelectTech={(techName) => {
            onSelectTech(techName);
            onNavigate('skills');
          }}
        />
      </div>

      {/* Featured Projects Highlight Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-base)] pb-3">
          <div>
            <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
              Featured Implementations
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
              Select Projects
            </h3>
          </div>

          <button
            onClick={() => {
              playNavClick();
              onNavigate('projects');
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent-base)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <span>All Projects ({PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.slice(0, 2).map((project) => (
            <div
              key={project.id}
              onClick={() => {
                playNavClick();
                onSelectProject(project);
              }}
              className="p-5 rounded-xl border border-[var(--border-base)] hover:border-[var(--accent-base)]/40 bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-alt)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-base)] font-bold">PROJECT {project.number}</span>
                  <span>{project.category}</span>
                </div>

                <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-hover)] transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {project.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[var(--bg-tag)] text-[10px] font-mono text-[var(--text-body)]">
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono text-[var(--accent-base)] group-hover:translate-x-0.5 transition-transform">
                  Details →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

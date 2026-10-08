import React from 'react';
import { PROFILE_INFO, EDUCATION_DATA, VERIFIED_METRICS } from '../data/portfolioData';
import { User, Terminal, CheckCircle2, ShieldCheck, Cpu, Code2, ArrowRight, Download, Mail } from 'lucide-react';
import { playNavClick } from '../lib/sound';
import meImg from '../assets/me.png';

interface AboutSectionProps {
  onDownloadResume: () => void;
  onContactClick: () => void;
  onViewProjects: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onDownloadResume,
  onContactClick,
  onViewProjects,
}) => {
  const coreStrengths = [
    {
      title: "MERN Stack Engineering",
      desc: "Architecting end-to-end full stack web applications with React on the client, Express.js middleware, Node.js runtimes, and MongoDB databases.",
      icon: Cpu,
    },
    {
      title: "Stateless Security & JWT",
      desc: "Implementing secure authentication pipelines, password hashing with bcrypt, role-based authorization guards, and protected API endpoints.",
      icon: ShieldCheck,
    },
    {
      title: "Database Modeling & Integrity",
      desc: "Designing normalized and document-based schemas with indexed queries, atomic updates, and prevention of race conditions.",
      icon: DatabaseIcon,
    },
    {
      title: "Component Modularity & Clean UX",
      desc: "Writing reusable TypeScript/React components, prioritizing responsive layouts, accessible controls, and smooth micro-interactions.",
      icon: Code2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-[var(--border-base)] pb-4">
        <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
          Developer Profile & Background
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
          ABOUT ME
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          MCA graduate and Full Stack Developer crafting resilient web systems.
        </p>
      </div>

      {/* Main Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Quick Info Card */}
        <div className="lg:col-span-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 space-y-6">
          {/* Avatar representation with 3D animation */}
          <div 
            className="relative mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full group cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div 
              className="w-full h-full rounded-full relative overflow-hidden transition-all duration-300 shadow-xl border-2 border-[var(--border-focus)] ease-out"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(0deg) rotateY(0deg)' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `rotateX(${-y / 5}deg) rotateY(${x / 5}deg) scale3d(1.05, 1.05, 1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
              }}
            >
              <img 
                src={meImg} 
                alt="Srujan N" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-base)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            <div className="absolute -inset-4 bg-[var(--accent-base)]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{PROFILE_INFO.name}</h3>
            <p className="text-xs text-[var(--accent-base)] font-mono font-medium">{PROFILE_INFO.title}</p>
            <p className="text-[11px] text-[var(--text-secondary)] font-mono">{EDUCATION_DATA[0].degree}</p>
          </div>

          {/* Quick Metrics from Verified Data */}
          <div className="space-y-2 pt-2 border-t border-[var(--border-base)] text-xs font-mono">
            <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-input)]">
              <span className="text-[var(--text-secondary)]">Status</span>
              <span className="text-[var(--accent-base)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-base)] animate-pulse"></span>
                Available
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-input)]">
              <span className="text-[var(--text-secondary)]">Institution</span>
              <span className="text-[var(--text-primary)] text-right truncate max-w-[170px]" title="Shree Devi Institute of Technology">
                Shree Devi Inst.
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-input)]">
              <span className="text-[var(--text-secondary)]">Degree Period</span>
              <span className="text-[var(--text-primary)]">{EDUCATION_DATA[0].period}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-input)]">
              <span className="text-[var(--text-secondary)]">Location</span>
              <span className="text-[var(--text-primary)]">{PROFILE_INFO.location}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                playNavClick();
                onDownloadResume();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[var(--accent-base)] hover:bg-[var(--accent-hover)] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => {
                playNavClick();
                onContactClick();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[var(--bg-element)] hover:bg-[var(--bg-element-hover)] text-[var(--text-primary)] border border-[var(--border-focus)] text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--accent-base)]" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Narrative & Career Focus */}
        <div className="lg:col-span-8 space-y-6">
          {/* Narrative Card */}
          <div className="rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--accent-base)]">
              <User className="w-4 h-4" />
              <span>Personal Engineering Narrative</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
              <p>
                I am <strong className="text-[var(--text-primary)] font-semibold">Srujan N</strong>, a Full Stack Developer and MCA graduate from <span className="text-[var(--text-primary)] font-medium">Shree Devi Institute of Technology</span> (2024 — 2026). My technical path centers on transforming real-world operational challenges into clean, resilient, and performant web applications.
              </p>
              <p>
                Specializing in the <strong className="text-[var(--accent-base)]">MERN stack</strong> (MongoDB, Express.js, React, Node.js), I focus on clean separation of concerns: modular frontends with reactive state, robust RESTful APIs with stateless JWT authorization, and normalized or document-based database structures engineered for fast indexing and consistency.
              </p>
              <p>
                Whether building real-time workout trackers, institutional club portals, or tamper-resistant polling mechanisms, I write code with high structural discipline, strict type safety via TypeScript, and an unwavering standard for user experience.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[var(--accent-base)]">
              <button
                onClick={() => {
                  playNavClick();
                  onViewProjects();
                }}
                className="flex items-center gap-1 hover:underline"
              >
                <span>Explore Verified Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Key Strengths & Pillars */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono text-[var(--text-secondary)] tracking-wider block">
              Core Engineering Competencies
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreStrengths.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] space-y-2 hover:border-[var(--border-focus)] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-[var(--bg-element)] border border-[var(--border-element)] text-[var(--accent-base)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">{s.title}</h4>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

import React, { useEffect } from 'react';
import { X, Printer, Download, Check, ExternalLink, Mail, Github, Linkedin, Briefcase, GraduationCap } from 'lucide-react';
import { PROFILE_INFO, EDUCATION_DATA, PROJECTS, SKILL_NODES } from '../data/portfolioData';
import { playKeyClick, playSuccessChime } from '../lib/sound';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playSuccessChime();
    window.print();
  };

  const handleDownloadMarkdown = () => {
    playSuccessChime();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['var(--accent-base)', 'var(--accent-hover)', 'var(--text-primary)'],
      });
    } catch {
      // ignore
    }

    const markdownContent = `# ${PROFILE_INFO.name}
**${PROFILE_INFO.title}**
Email: ${PROFILE_INFO.email}
GitHub: ${PROFILE_INFO.github}
LinkedIn: ${PROFILE_INFO.linkedin}
Location: ${PROFILE_INFO.location}

---

## PROFESSIONAL SUMMARY
${PROFILE_INFO.bio}

---

## EDUCATION
${EDUCATION_DATA.map((e) => `### ${e.degree}
**${e.institution}** | ${e.period}
${e.description}
Key Highlights:
${e.highlights.map((h) => `- ${h}`).join('\n')}
`).join('\n')}

---

## CORE TECHNICAL SKILLS
- **Frontend**: React, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, React Native
- **Backend**: Node.js, Express.js, REST APIs, JWT & Authentication
- **Databases**: MongoDB, MySQL
- **Developer Tools**: Git, GitHub, Postman, Vite, VS Code

---

## VERIFIED PROJECTS
${PROJECTS.map((p) => `### ${p.title} (${p.category})
Technologies: ${p.technologies.join(', ')}
Repository: ${p.githubUrl}
${p.liveUrl ? `Live URL: ${p.liveUrl}` : ''}
${p.shortDescription}

Key Features:
${p.features.map((f) => `- ${f}`).join('\n')}
`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Srujan_N_Resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-xl border border-[var(--border-focus)] bg-[var(--bg-panel)] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-base)] bg-[var(--bg-panel-alt)]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-base)]"></span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Srujan N · Verified Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-element)] hover:bg-[var(--bg-element-hover)] text-[var(--text-primary)] border border-[var(--border-focus)] text-xs font-medium transition-colors"
              title="Print Resume or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[var(--accent-base)]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-base)] hover:bg-[var(--accent-hover)] text-black text-xs font-semibold transition-colors shadow-md shadow-[var(--accent-base)]/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => {
                playKeyClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-alt)] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Surface */}
        <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto space-y-8 bg-[var(--bg-subtle)] text-[var(--text-body)] font-sans print:bg-white print:text-black print:p-0">
          {/* Header */}
          <div className="border-b border-[var(--border-base)] pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] print:text-black">
                  {PROFILE_INFO.name}
                </h1>
                <p className="text-base text-[var(--accent-base)] font-medium mt-1">
                  {PROFILE_INFO.title} · {EDUCATION_DATA[0].degree}
                </p>
              </div>

              <div className="text-xs text-[var(--text-secondary)] space-y-1 font-mono">
                <div>Email: <a href={`mailto:${PROFILE_INFO.email}`} className="text-[var(--text-primary)] hover:underline">{PROFILE_INFO.email}</a></div>
                <div>Location: {PROFILE_INFO.location}</div>
                <div>Status: <span className="text-[var(--accent-base)]">Available for Work</span></div>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed pt-2">
              {PROFILE_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-base)]">
              <GraduationCap className="w-4 h-4" />
              <span>Education Background</span>
            </div>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] print:text-black">{edu.degree}</h3>
                    <span className="text-xs font-mono text-[var(--accent-base)]">{edu.period}</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium">{edu.institution}</div>
                  <p className="text-xs text-[var(--text-body)] leading-relaxed">{edu.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs text-[var(--text-secondary)]">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[var(--accent-base)]">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Competencies */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent-base)]">
              Technical Skills Matrix
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] space-y-1">
                <span className="font-semibold text-[var(--text-primary)]">Frontend</span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  React, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, React Native
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] space-y-1">
                <span className="font-semibold text-[var(--text-primary)]">Backend</span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Node.js, Express.js, REST APIs, JWT, Authentication & Route Guards
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] space-y-1">
                <span className="font-semibold text-[var(--text-primary)]">Databases</span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  MongoDB (Mongoose, Aggregations), MySQL (Relational Schema Design)
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] space-y-1">
                <span className="font-semibold text-[var(--text-primary)]">Developer Tools</span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Git, GitHub, Postman, Vite, VS Code, Linux Shell
                </p>
              </div>
            </div>
          </div>

          {/* Verified Projects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-base)]">
              <Briefcase className="w-4 h-4" />
              <span>Verified Engineering Projects</span>
            </div>

            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-base)] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] print:text-black">
                      {proj.number}. {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-[var(--text-secondary)]">{proj.category}</span>
                  </div>

                  <p className="text-xs text-[var(--text-body)] leading-relaxed">
                    {proj.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[var(--bg-element)] text-[10px] font-mono text-[var(--text-secondary)]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 text-xs font-mono text-[var(--accent-base)] flex items-center gap-4">
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      <span>Source Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[var(--border-base)] bg-[var(--bg-panel-alt)] text-[11px] font-mono text-[var(--text-muted)]">
          <span>VERIFIED BY SRUJAN N · ZERO FABRICATED DATA</span>
          <span>SRUJAN.N PORTFOLIO OS</span>
        </div>
      </div>
    </div>
  );
};

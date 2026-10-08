import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
          Engineering Trajectory
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
          EXPERIENCE
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          Hands-on software development and engineering work.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[var(--accent-base)] before:via-[var(--border-base)] before:to-transparent">
        {EXPERIENCE_DATA.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node marker */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--accent-base)] flex items-center justify-center -translate-x-1/2">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[var(--accent-hover)]"></span>
            </div>

            <div className="rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 space-y-4 hover:border-[var(--accent-base)]/40 transition-colors shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-alt)] pb-3">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">{exp.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                    <span>{exp.context}</span>
                    {exp.location && (
                      <>
                        <span className="hidden sm:inline text-[var(--text-divider)]">|</span>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 mt-1 sm:mt-0 hover:text-[var(--accent-base)] transition-colors group/link cursor-pointer"
                        >
                          <MapPin className="w-3 h-3 text-[var(--accent-base)] shrink-0 group-hover/link:scale-110 transition-transform" />
                          <span className="truncate" title={exp.location}>{exp.location}</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <span className="text-xs font-mono text-[var(--accent-base)] bg-[var(--bg-element)] px-2.5 py-1 rounded border border-[var(--border-element)] self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                {exp.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] uppercase font-mono text-[var(--text-muted)] tracking-wider block mb-2">
                  Core Technology Applied
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-base)] text-[11px] font-mono text-[var(--text-body)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {exp.image && (
                <div className="pt-4 border-t border-[var(--border-alt)] mt-4">
                  <span className="text-[11px] uppercase font-mono text-[var(--text-muted)] tracking-wider block mb-3">
                    Experience Letter
                  </span>
                  <a 
                    href={exp.imageLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full max-w-sm rounded-lg overflow-hidden border border-[var(--border-base)] hover:border-[var(--accent-base)] transition-colors shadow-sm"
                  >
                    <img 
                      src={exp.image} 
                      alt={`${exp.role} at ${exp.context}`} 
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-subtle)] text-xs font-mono text-[var(--text-muted)] text-center">
        Chronological engineering timeline strictly derived from authentic project and professional records.
      </div>
    </div>
  );
};

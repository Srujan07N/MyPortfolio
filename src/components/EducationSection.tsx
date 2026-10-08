import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, CheckCircle, Award } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
          Academic Trajectory
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
          EDUCATION
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          Verified academic credentials from Shree Devi Institute of Technology.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {EDUCATION_DATA.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 space-y-4 hover:border-[var(--accent-base)]/40 transition-colors shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-alt)] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-base)]/10 border border-[var(--accent-base)]/30 flex items-center justify-center text-[var(--accent-base)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">{item.degree}</h3>
                  <div className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">{item.institution}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-base)] bg-[var(--bg-element)] px-3 py-1.5 rounded-md border border-[var(--border-element)] self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
              {item.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] uppercase font-mono text-[var(--text-muted)] tracking-wider block">
                Key Academic Areas & Focus
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2 p-2.5 rounded bg-[var(--bg-panel-alt)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-base)] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[var(--accent-base)]" />
          <span>Verified Degree Enrollment: Shree Devi Institute of Technology</span>
        </div>
        <span className="text-[var(--accent-base)]">Zero Fabricated Credentials</span>
      </div>
    </div>
  );
};

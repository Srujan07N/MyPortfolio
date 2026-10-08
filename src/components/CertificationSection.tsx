import React from 'react';
import { CERTIFICATION_DATA } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export const CertificationSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
          Verified Credentials
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
          CERTIFICATIONS
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          Professional certifications and continuous learning achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATION_DATA.map((cert) => (
          <a
            key={cert.id}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] overflow-hidden hover:border-[var(--accent-base)]/50 transition-all duration-300 shadow-lg hover:shadow-[var(--accent-base)]/10 hover:-translate-y-1"
          >
            <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--border-alt)] bg-[var(--bg-element)]">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-base)] transition-colors line-clamp-2">
                {cert.title}
              </h3>
              <div className="flex items-center justify-between mt-auto pt-4 text-xs font-mono">
                <span className="text-[var(--text-secondary)]">{cert.issuer}</span>
                <span className="text-[var(--accent-base)] bg-[var(--bg-element)] px-2 py-0.5 rounded border border-[var(--border-element)]">
                  {cert.date}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-subtle)] text-xs font-mono text-[var(--text-muted)] text-center mt-8">
        Click on any certificate to view its authenticity and details on LinkedIn.
      </div>
    </div>
  );
};

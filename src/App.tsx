import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardHome } from './components/DashboardHome';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsNetwork } from './components/SkillsNetwork';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationSection } from './components/CertificationSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { PROJECTS, Project, PROFILE_INFO } from './data/portfolioData';
import { playNavClick } from './lib/sound';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [selectedTechId, setSelectedTechId] = useState<string>('react');
  const [isSystemLoading, setIsSystemLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(10);
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initial fast loader simulation (disappears quickly under 600ms)
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingProgress(65), 180);
    const timer2 = setTimeout(() => setLoadingProgress(100), 380);
    const timer3 = setTimeout(() => setIsSystemLoading(false), 560);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTech = (techName: string) => {
    setSelectedTechId(techName.toLowerCase().replace(/[^a-z0-9]/g, ''));
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  // Initial Boot Loader
  if (isSystemLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-base)] text-[var(--text-primary)] font-mono p-6 select-none">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-bold tracking-widest">SRUJAN.N</span>
            <span className="text-[var(--accent-base)]">OS BOOT</span>
          </div>

          <div className="h-1.5 w-full bg-[var(--bg-element)] rounded-full overflow-hidden border border-[var(--border-base)]">
            <div
              className="h-full bg-[var(--accent-base)] transition-all duration-200 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>INITIALIZING SYSTEM WORKSPACE...</span>
            <span className="text-[var(--accent-base)] tabular-nums">{loadingProgress}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col antialiased selection:bg-[var(--accent-base)]/30 selection:text-[var(--text-primary)]">
      {/* Fixed Sidebar for Navigation */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onDownloadResume={() => setIsResumeOpen(true)}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="md:pl-[260px] flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopHeader
          currentSection={currentSection}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />

        {/* Dynamic Section Viewport */}
        <main className="flex-1 w-full max-w-[1500px] mx-auto p-4 sm:p-6 md:p-8 lg:p-10 space-y-10">
          {/* Subtle copper accent transition indicator */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--accent-base)]/30 to-transparent -mt-2 mb-6" />

          {currentSection === 'dashboard' && (
            <DashboardHome
              onNavigate={handleNavigate}
              onSelectProject={(project) => setSelectedProject(project)}
              onDownloadResume={() => setIsResumeOpen(true)}
              onSelectTech={handleSelectTech}
            />
          )}

          {currentSection === 'about' && (
            <AboutSection
              onDownloadResume={() => setIsResumeOpen(true)}
              onContactClick={() => handleNavigate('contact')}
              onViewProjects={() => handleNavigate('projects')}
            />
          )}

          {currentSection === 'projects' && (
            <ProjectsSection
              onSelectProject={(project) => setSelectedProject(project)}
            />
          )}

          {currentSection === 'skills' && (
            <SkillsNetwork
              onSelectProject={handleSelectProjectById}
              selectedTechId={selectedTechId}
            />
          )}

          {currentSection === 'experience' && (
            <ExperienceSection />
          )}

          {currentSection === 'education' && (
            <EducationSection />
          )}

          {currentSection === 'certifications' && (
            <CertificationSection />
          )}

          {currentSection === 'contact' && (
            <ContactSection />
          )}
        </main>

        {/* Quiet Minimal Footer */}
        <footer className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 border-t border-[var(--border-subtle)] mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-primary)] font-medium">SRUJAN.N</span>
            <span>·</span>
            <span>Srujan N · Full Stack Developer</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>MCA Shree Devi Institute of Technology</span>
            <span>·</span>
            <span className="text-[var(--accent-base)]">● Available for Work</span>
          </div>
        </footer>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume Viewer / Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onDownloadResume={() => {
          setIsCommandPaletteOpen(false);
          setIsResumeOpen(true);
        }}
      />
    </div>
  );
}

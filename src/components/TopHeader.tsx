import React, { useState, useEffect } from 'react';
import { Search, Github, Linkedin, Volume2, VolumeX, Menu, Clock, Sparkles, Moon, Sun } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { toggleSound, isSoundEnabled, playKeyClick, playNavClick } from '../lib/sound';

interface TopHeaderProps {
  currentSection: string;
  onOpenCommandPalette: () => void;
  onToggleMobileNav: () => void;
  onNavigate: (section: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of my developer profile & architecture',
  },
  about: {
    title: 'About Me',
    subtitle: 'MCA Graduate · Full Stack Engineering Profile',
  },
  projects: {
    title: 'Projects Archive',
    subtitle: 'Verified Full-Stack & MERN Applications',
  },
  skills: {
    title: 'Technical Network',
    subtitle: 'Interactive Full Stack Topology & Tooling',
  },
  experience: {
    title: 'Experience & Education',
    subtitle: 'Verified Timeline & Academic Credentials',
  },
  education: {
    title: 'Academic Credentials',
    subtitle: 'MCA Shree Devi Institute of Technology',
  },
  contact: {
    title: 'Contact & Transmissions',
    subtitle: 'Direct Lines & Interactive Terminal',
  },
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentSection,
  onOpenCommandPalette,
  onToggleMobileNav,
  onNavigate,
  isDark,
  onToggleTheme,
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentInfo = sectionTitles[currentSection] || {
    title: 'Dashboard',
    subtitle: 'Developer Workspace',
  };

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playKeyClick();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-[var(--border-base)] bg-[var(--bg-base)]/90 backdrop-blur-md">
      {/* Left: Mobile Nav Toggle + Current Section Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            playKeyClick();
            onToggleMobileNav();
          }}
          className="p-2 -ml-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)] md:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base font-bold text-[var(--text-primary)] tracking-tight">
              {currentInfo.title}
            </span>
            <span className="hidden sm:inline-block text-[var(--border-focus)]">/</span>
            <span className="hidden sm:inline-block text-xs font-mono text-[var(--text-secondary)] truncate max-w-xs md:max-w-md">
              {currentInfo.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Quick Search Button + Audio Toggle + Social Links + Profile Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time System Clock */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-panel)] border border-[var(--border-base)] text-[11px] font-mono text-[var(--text-secondary)]">
          <Clock className="w-3 h-3 text-[var(--accent-base)]" />
          <span>{timeString}</span>
        </div>

        {/* Command Palette Trigger */}
        <button
          onClick={() => {
            playNavClick();
            onOpenCommandPalette();
          }}
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-element)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-base)] text-xs font-mono transition-colors shadow-sm"
          title="Search or execute commands (Ctrl + K)"
        >
          <Search className="w-3.5 h-3.5 text-[var(--accent-base)]" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-[var(--border-alt)] border border-[var(--border-focus)] rounded text-[10px] text-[var(--text-muted)]">
            ⌘K
          </kbd>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={handleSoundToggle}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)] border border-[var(--border-base)] transition-colors"
          title={soundOn ? 'Mute feedback sounds' : 'Enable feedback sounds'}
          aria-label="Sound toggle"
        >
          {soundOn ? (
            <Volume2 className="w-3.5 h-3.5 text-[var(--accent-base)]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            playKeyClick();
            onToggleTheme();
          }}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)] border border-[var(--border-base)] transition-colors"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Theme toggle"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-[var(--accent-base)]" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-[var(--accent-base)]" />
          )}
        </button>

        {/* GitHub */}
        <a
          href={PROFILE_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playKeyClick}
          className="hidden sm:flex p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)] border border-[var(--border-base)] transition-colors"
          title="Srujan's GitHub profile"
        >
          <Github className="w-3.5 h-3.5" />
        </a>

        {/* LinkedIn */}
        <a
          href={PROFILE_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playKeyClick}
          className="hidden sm:flex p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-element)] border border-[var(--border-base)] transition-colors"
          title="Srujan's LinkedIn profile"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>

        {/* Profile Avatar Badge */}
        <button
          onClick={() => {
            playNavClick();
            onNavigate('about');
          }}
          className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[var(--border-base)] text-left group"
          title="View Srujan's full profile"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-input)] border border-[var(--accent-base)]/40 group-hover:border-[var(--accent-base)] flex items-center justify-center font-mono font-bold text-xs text-[var(--text-primary)] transition-colors">
            SN
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-hover)] transition-colors leading-tight">
              {PROFILE_INFO.name}
            </span>
            <span className="text-[10px] font-mono text-[var(--accent-base)] leading-tight">
              ● Online
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

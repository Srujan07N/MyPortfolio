import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
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
  Copy,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { playKeyClick, playNavClick, playSuccessChime } from '../lib/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onDownloadResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Social';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onDownloadResume,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      category: 'Navigation',
      icon: LayoutDashboard,
      action: () => onNavigate('dashboard'),
      shortcut: '1',
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      category: 'Navigation',
      icon: User,
      action: () => onNavigate('about'),
      shortcut: '2',
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      category: 'Navigation',
      icon: Briefcase,
      action: () => onNavigate('projects'),
      shortcut: '3',
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills & Tech Network',
      category: 'Navigation',
      icon: Code2,
      action: () => onNavigate('skills'),
      shortcut: '4',
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience',
      category: 'Navigation',
      icon: Briefcase,
      action: () => onNavigate('experience'),
      shortcut: '5',
    },
    {
      id: 'nav-education',
      title: 'Go to Education',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => onNavigate('education'),
      shortcut: '6',
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      category: 'Navigation',
      icon: Mail,
      action: () => onNavigate('contact'),
      shortcut: '7',
    },
    {
      id: 'action-resume',
      title: 'Download Resume (PDF / Preview)',
      category: 'Actions',
      icon: FileDown,
      action: onDownloadResume,
    },
    {
      id: 'action-zip',
      title: 'Download Project ZIP (Complete Source Archive)',
      category: 'Actions',
      icon: FolderArchive,
      action: () => {
        const link = document.createElement('a');
        link.href = '/srujan-dev-portfolio.zip';
        link.download = 'srujan-dev-portfolio.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
    {
      id: 'action-email',
      title: `Copy Email (${PROFILE_INFO.email})`,
      category: 'Actions',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(PROFILE_INFO.email);
        setCopiedEmail(true);
        playSuccessChime();
        setTimeout(() => setCopiedEmail(false), 2000);
      },
    },
    {
      id: 'social-github',
      title: 'Open GitHub Profile',
      category: 'Social',
      icon: Github,
      action: () => window.open(PROFILE_INFO.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'social-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Social',
      icon: Linkedin,
      action: () => window.open(PROFILE_INFO.linkedin, '_blank', 'noopener,noreferrer'),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        playKeyClick();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playKeyClick();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          playNavClick();
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-xl border border-[var(--border-focus)] bg-[var(--bg-panel)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-base)] bg-[var(--bg-panel-alt)]">
          <Search className="w-4 h-4 text-[var(--accent-base)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-element)] border border-[var(--border-focus)] rounded">
            ESC to close
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--text-secondary)] font-mono">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    playNavClick();
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${isSelected
                      ? 'bg-[var(--accent-base)]/15 text-[var(--text-primary)] font-semibold border border-[var(--accent-base)]/40'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[var(--accent-hover)]' : 'text-[var(--text-muted)]'}`} />
                    <span className="text-sm font-medium">{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">{cmd.category}</span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-base)]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-base)] bg-[var(--bg-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>↵ Select</span>
          </div>
          <span className="text-[var(--accent-base)]">SRUJAN.N COMMAND CENTER</span>
        </div>
      </div>
    </div>
  );
};

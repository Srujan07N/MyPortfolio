import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';
import { PROFILE_INFO, PROJECTS, SKILL_NODES, EDUCATION_DATA } from '../data/portfolioData';
import { playKeyClick, playSuccessChime } from '../lib/sound';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: `${PROFILE_INFO.name} — ${PROFILE_INFO.title}`,
    },
    {
      command: 'role',
      output: `${PROFILE_INFO.title} (Specializing in MERN Architecture & Modern Web Systems)`,
    },
    {
      command: 'stack',
      output: 'React / Next.js / Node.js / Express / MongoDB / TypeScript',
    },
    {
      command: 'status',
      output: '● Available for work · Open for engineering roles and collaborations',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleExecute = (cmdToRun: string) => {
    const raw = cmdToRun.trim().toLowerCase();
    playKeyClick();
    if (!raw) return;

    let result: string | React.ReactNode = '';

    switch (raw) {
      case 'whoami':
        result = `${PROFILE_INFO.name} — Full Stack Developer & MCA graduate from Shree Devi Institute of Technology. Building scalable, production-grade applications with clean architecture.`;
        break;
      case 'role':
        result = `${PROFILE_INFO.title} · MERN Stack Architect (Frontend, Backend, REST APIs, Security).`;
        break;
      case 'stack':
        result = `Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express.js, REST APIs, JWT\nDatabase: MongoDB, MySQL\nTools: Git, GitHub, Postman, Vite, VS Code`;
        break;
      case 'status':
        result = `● AVAILABLE FOR WORK · Location: ${PROFILE_INFO.location} · Email: ${PROFILE_INFO.email}`;
        break;
      case 'projects':
        result = (
          <div className="space-y-1 my-1">
            <p className="text-[var(--accent-base)]">Verified Portfolio Projects:</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="text-xs text-[var(--text-secondary)] pl-2">
                <span className="text-[var(--text-primary)] font-medium">{p.number}. {p.title}</span> — {p.technologies.slice(0, 3).join(', ')}
              </div>
            ))}
          </div>
        );
        break;
      case 'education':
        result = `${EDUCATION_DATA[0].degree} @ ${EDUCATION_DATA[0].institution} (${EDUCATION_DATA[0].period})`;
        break;
      case 'contact':
        result = `Email: ${PROFILE_INFO.email} | GitHub: ${PROFILE_INFO.github} | LinkedIn: ${PROFILE_INFO.linkedin}`;
        break;
      case 'zip':
      case 'download':
        {
          const link = document.createElement('a');
          link.href = '/srujan-dev-portfolio.zip';
          link.download = 'srujan-dev-portfolio.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          result = `Initiated download of 'srujan-dev-portfolio.zip' containing complete source code and documentation.`;
        }
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'help':
        result = `Available commands: whoami, role, stack, status, projects, education, contact, zip, clear, help`;
        break;
      default:
        result = `Command not recognized: '${raw}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmdToRun, output: result }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputVal);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] overflow-hidden flex flex-col font-mono text-xs shadow-2xl ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-panel-alt)] border-b border-[var(--border-base)]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-base)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-base)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-base)]"></span>
          </div>
          <span className="text-[var(--text-secondary)] text-[11px] ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon className="w-3 h-3 text-[var(--accent-base)]" />
            srujan@dev:~$
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyEmail}
            className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Copy Srujan's email"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[var(--accent-base)]" />
                <span className="text-[var(--accent-base)]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Console */}
      <div
        className="p-4 space-y-3 overflow-y-auto max-h-[300px] text-[var(--text-secondary)] selection:bg-[var(--accent-base)]/30"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-[var(--text-muted)] text-[11px] pb-1 border-b border-[var(--border-base)]/60">
          SRUJAN OS v2.6 · Interactive Shell initialized. Type <span className="text-[var(--accent-base)]">help</span> or click command shortcuts below.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
              <span className="text-[var(--accent-base)]">$</span>
              <span>{item.command}</span>
            </div>
            <div className="text-[var(--text-body)] pl-3.5 whitespace-pre-line leading-relaxed">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <div className="p-3 bg-[var(--bg-input)] border-t border-[var(--border-base)] flex items-center gap-2">
        <span className="text-[var(--accent-base)] font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. whoami, stack, projects, status)..."
          className="flex-1 bg-transparent text-[var(--text-primary)] outline-none border-none text-xs placeholder:text-[var(--text-placeholder)] font-mono"
        />
        <button
          onClick={() => handleExecute(inputVal)}
          disabled={!inputVal.trim()}
          className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent-base)] disabled:opacity-30 transition-colors"
          title="Run command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Clickable Quick Command Chips */}
      <div className="px-3 py-2 bg-[var(--bg-panel-alt)] border-t border-[var(--border-base)] flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-[var(--text-muted)] shrink-0 text-[10px] uppercase font-mono mr-1">Quick:</span>
        {['whoami', 'role', 'stack', 'status', 'projects', 'education', 'contact', 'zip'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleExecute(cmd)}
            className="px-2 py-0.5 rounded bg-[var(--bg-element)] hover:bg-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-base)] whitespace-nowrap"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={() => handleExecute('clear')}
          className="px-2 py-0.5 rounded bg-[var(--bg-element)] hover:bg-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-base)] ml-auto whitespace-nowrap"
        >
          clear
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check, Github, Linkedin, MessageSquare, Terminal as TerminalIcon } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { playKeyClick, playSuccessChime } from '../lib/sound';
import { Terminal } from './Terminal';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playSuccessChime();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['var(--accent-base)', 'var(--accent-hover)', 'var(--text-primary)'],
      });
    } catch {
      // ignore
    }

    // Also trigger mailto so it sends to Srujan's email directly
    const mailtoUrl = `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
      subject || `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

    // Open mailto link after slight pause
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setIsCopied(true);
    playSuccessChime();
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-[var(--border-base)] pb-4">
        <span className="text-xs uppercase font-mono text-[var(--accent-base)] tracking-wider">
          Direct Transmission Line
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-1">
          LET&apos;S BUILD SOMETHING
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Have an idea, opportunity, or project? Let&apos;s talk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-6 rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] p-6 space-y-6">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-base)]/10 border border-[var(--accent-base)]/30 flex items-center justify-center mx-auto text-[var(--accent-base)]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Transmission Prepared</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. Your client mail application is launching with your message directed to{' '}
                <span className="text-[var(--text-primary)] font-mono">{PROFILE_INFO.email}</span>.
              </p>
              <button
                onClick={() => {
                  playKeyClick();
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="px-4 py-2 rounded-lg bg-[var(--bg-element)] hover:bg-[var(--bg-element-hover)] text-[var(--text-primary)] text-xs font-mono border border-[var(--border-focus)] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] block">
                    Your Name <span className="text-[var(--accent-base)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-base)] focus:border-[var(--accent-base)] focus:ring-1 focus:ring-[var(--accent-base)] text-[var(--text-primary)] text-xs outline-none transition-all placeholder:text-[var(--text-placeholder)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] block">
                    Your Email <span className="text-[var(--accent-base)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-base)] focus:border-[var(--accent-base)] focus:ring-1 focus:ring-[var(--accent-base)] text-[var(--text-primary)] text-xs outline-none transition-all placeholder:text-[var(--text-placeholder)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)] block">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Opportunity / Collaboration / Project Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-base)] focus:border-[var(--accent-base)] focus:ring-1 focus:ring-[var(--accent-base)] text-[var(--text-primary)] text-xs outline-none transition-all placeholder:text-[var(--text-placeholder)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)] block">
                  Message <span className="text-[var(--accent-base)]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, team requirements, or schedule..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-base)] focus:border-[var(--accent-base)] focus:ring-1 focus:ring-[var(--accent-base)] text-[var(--text-primary)] text-xs outline-none transition-all placeholder:text-[var(--text-placeholder)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-[var(--accent-base)] hover:bg-[var(--accent-hover)] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[var(--accent-base)]/20 flex items-center justify-center gap-2"
              >
                <span>SEND MESSAGE →</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Direct channels */}
          <div className="pt-4 border-t border-[var(--border-base)] space-y-3">
            <span className="text-[11px] uppercase font-mono text-[var(--text-muted)] tracking-wider block">
              Direct Contact Lines
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-base)]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--accent-base)]" />
                <span className="text-xs font-mono text-[var(--text-primary)] select-all">{PROFILE_INFO.email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2 py-1 rounded bg-[var(--border-alt)] hover:bg-[var(--border-element)] transition-colors self-start sm:self-auto"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-[var(--accent-base)]" />
                    <span className="text-[var(--accent-base)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playKeyClick}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-element)] border border-[var(--border-base)] text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Github className="w-4 h-4 text-[var(--accent-base)]" />
                <span className="font-mono">GitHub Profile</span>
              </a>

              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playKeyClick}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-element)] border border-[var(--border-base)] text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[var(--accent-base)]" />
                <span className="font-mono">LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Terminal */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs uppercase font-mono text-[var(--text-secondary)] tracking-wider flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent-base)]" />
            <span>Developer Shell Session</span>
          </div>

          <Terminal />

          <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-panel)] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-base)]"></span>
              <span className="text-[var(--text-primary)]">STATUS: AVAILABLE FOR WORK</span>
            </div>
            <span className="text-[var(--text-secondary)]">{PROFILE_INFO.timezone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

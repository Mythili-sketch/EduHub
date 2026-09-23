import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Download, 
  Layers, 
  Cpu, 
  BookOpen
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenPlayground: () => void;
  totalSkillsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onOpenPlayground,
  totalSkillsCount
}) => {
  const [activeCliTab, setActiveCliTab] = useState<'deeptutor' | 'npx' | 'claude' | 'gui'>('deeptutor');
  const [copied, setCopied] = useState(false);

  const getCliCommand = () => {
    switch (activeCliTab) {
      case 'deeptutor':
        return 'deeptutor skill install socratic-math-tutor';
      case 'npx':
        return 'npx eduhub install socratic-math-tutor';
      case 'claude':
        return 'claude skill install eduhub:socratic-math-tutor';
      case 'gui':
        return 'DeepTutor GUI: Learning Space → Skills → Import from EduHub';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCliCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-[#0B0F19] via-slate-950/60 to-[#0B0F19]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-10 w-[350px] h-[250px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">EduHub v0.4.2</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">DeepTutor Agent-Skills Ecosystem</span>
            <span className="text-indigo-400 font-medium hover:underline cursor-pointer flex items-center gap-0.5">
              Paper on arXiv <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Open Registry for{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              AI Tutoring Skills
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Portable, safety-verified teaching behaviors for{' '}
            <span className="text-white font-semibold">DeepTutor</span>,{' '}
            <span className="text-white font-semibold">Claude Code</span>, and{' '}
            <span className="text-white font-semibold">Codex</span>. Empowering agents with Socratic scaffolding, active recall, and pedagogical guardrails.
          </p>
        </div>

        {/* Interactive CLI Install Command Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-2 shadow-2xl shadow-indigo-950/30 backdrop-blur-xl">
            {/* Tabs for CLI targets */}
            <div className="flex items-center justify-between border-b border-slate-800/80 px-2 pb-2 mb-2">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setActiveCliTab('deeptutor')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeCliTab === 'deeptutor'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  deeptutor CLI
                </button>
                <button
                  onClick={() => setActiveCliTab('npx')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeCliTab === 'npx'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  npx eduhub
                </button>
                <button
                  onClick={() => setActiveCliTab('claude')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeCliTab === 'claude'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  claude code
                </button>
                <button
                  onClick={() => setActiveCliTab('gui')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeCliTab === 'gui'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  GUI Workspace
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Safety Gate Verified</span>
              </div>
            </div>

            {/* Code Box */}
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/90 font-mono text-xs sm:text-sm text-slate-200 border border-slate-800">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-indigo-400 select-none">$</span>
                <span className="text-slate-200 font-medium tracking-wide">
                  {getCliCommand()}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="ml-3 shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-all active:scale-95"
                title="Copy install command"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Explore {totalSkillsCount} Skills</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenPlayground}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white font-medium text-sm border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Launch Live Tutor Sandbox</span>
          </button>
        </div>

        {/* Ecosystem Key Metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/60">
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-2xl font-extrabold text-white">120+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Portable Skills</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-2xl font-extrabold text-indigo-400">45,800+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Workspace Installs</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-2xl font-extrabold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Safety Sandbox Audited</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-2xl font-extrabold text-purple-400">18.9k ★</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">DeepTutor GitHub Stars</div>
          </div>
        </div>

      </div>
    </div>
  );
};

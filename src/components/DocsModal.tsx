import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  BookOpen, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">EduHub Specification & CLI Documentation</h2>
              <p className="text-xs text-slate-400">Open agent-skills registry and teaching behaviors standard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* Section 1: Overview */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>What is EduHub?</span>
            </h3>
            <p className="text-slate-300">
              <strong>EduHub</strong> (developed by the HKUDS Group at the University of Hong Kong) is the official community skill registry for <strong>DeepTutor</strong>, an open-source, agent-native learning workspace.
            </p>
            <p className="text-slate-400">
              Unlike generic tool marketplaces, EduHub specializes exclusively in <strong>teaching-oriented agent behaviors</strong>. These skills encode cognitive scaffolding, Socratic inquiry protocols, diagnostic question generators, and metacognitive prompts that turn any compliant AI model into a personalized, patient tutor.
            </p>
          </section>

          {/* Section 2: DeepTutor Architecture */}
          <section className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>DeepTutor 8 Integrated Surfaces</span>
            </h3>
            <p className="text-xs text-slate-400">
              DeepTutor unifies 8 surfaces for an end-to-end self-hosted learning platform:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                1. Chat Workspace
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                2. AI Partners
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                3. Co-Writing Studio
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                4. Learning Spaces
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                5. Question Notebook
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                6. Knowledge Graphs
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-indigo-300 border-indigo-500/30">
                7. EduHub Skills
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200">
                8. Diagnostic Exams
              </div>
            </div>
          </section>

          {/* Section 3: CLI Commands */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>EduHub & DeepTutor CLI Reference</span>
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                <div>
                  <span className="text-slate-500"># Install skill in DeepTutor</span>
                  <div className="text-indigo-400 mt-0.5">deeptutor skill install &lt;slug&gt;</div>
                </div>
                <button
                  onClick={() => handleCopy('deeptutor skill install socratic-math-tutor', 'cmd-1')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {copiedSnippet === 'cmd-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                <div>
                  <span className="text-slate-500"># Run without installing DeepTutor</span>
                  <div className="text-indigo-400 mt-0.5">npx eduhub install &lt;slug&gt;</div>
                </div>
                <button
                  onClick={() => handleCopy('npx eduhub install socratic-math-tutor', 'cmd-2')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {copiedSnippet === 'cmd-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                <div>
                  <span className="text-slate-500"># Install into Claude Code</span>
                  <div className="text-indigo-400 mt-0.5">claude skill install eduhub:&lt;slug&gt;</div>
                </div>
                <button
                  onClick={() => handleCopy('claude skill install eduhub:socratic-math-tutor', 'cmd-3')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {copiedSnippet === 'cmd-3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </section>

          {/* Section 4: SKILL.md Spec */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-pink-400" />
              <span>The Open SKILL.md Specification</span>
            </h3>
            <p className="text-xs text-slate-400">
              Every skill in EduHub is stored as a folder containing a <code>SKILL.md</code> playbook with structured YAML frontmatter:
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
{`---
name: socratic-math-tutor
version: 1.4.0
author: hkuds-core
track: stem-coding
compatible_agents: [deeptutor, claude-code, codex]
safety_level: sandbox-verified
description: Enforce step-wise Socratic math guidance.
---

# Behavioral Playbook
1. Never output numerical answers on the first 3 turns.
2. Probe learner intuition before formulas.
3. Guide arithmetic verification rather than direct correction.`}
            </pre>
          </section>

          {/* Section 5: Safety Gate */}
          <section className="space-y-2 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>EduHub Safety Verification Gate</span>
            </h3>
            <p className="text-xs text-slate-300">
              All skills imported into DeepTutor workspaces pass through an automated static AST analyzer and adversarial prompt-injection scanner. Skills cannot execute arbitrary shell commands, access unauthorized environment tokens, or facilitate academic dishonesty (ghostwriting).
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

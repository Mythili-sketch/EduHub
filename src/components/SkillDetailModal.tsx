import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Star, 
  ShieldCheck, 
  Play, 
  FileCode2, 
  BookOpen, 
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { EduSkill } from '../types/skill';

interface SkillDetailModalProps {
  skill: EduSkill | null;
  onClose: () => void;
  onTryInPlayground: (skill: EduSkill) => void;
  onToggleStar: (skillId: string) => void;
  isStarred: boolean;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  onClose,
  onTryInPlayground,
  onToggleStar,
  isStarred,
}) => {
  const [activeTab, setActiveTab] = useState<'playbook' | 'install' | 'safety' | 'pedagogy'>('playbook');
  const [viewRaw, setViewRaw] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!skill) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownloadMd = () => {
    const element = document.createElement("a");
    const file = new Blob([skill.rawSkillMd], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${skill.slug}.SKILL.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-start justify-between gap-4">
            
            <div className="flex items-start gap-4">
              <img 
                src={skill.author.avatar} 
                alt={skill.author.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md shrink-0" 
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {skill.name}
                  </h2>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    v{skill.version}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Safety Gate Verified</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-indigo-400 font-semibold">{skill.slug}</span>
                  <span>•</span>
                  <span>by @{skill.author.handle}</span>
                  {skill.author.institution && (
                    <>
                      <span>•</span>
                      <span className="text-slate-300 font-sans">{skill.author.institution}</span>
                    </>
                  )}
                  <span>•</span>
                  <span className="text-slate-500">License: Apache-2.0</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Subtitle */}
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {skill.description}
          </p>

          {/* Stats Bar and Quick Actions */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 text-xs">
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-200">{skill.installs.toLocaleString()}</span> installs
              </span>
              <button
                onClick={() => onToggleStar(skill.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  isStarred ? 'text-amber-400 font-semibold' : 'hover:text-amber-400'
                }`}
              >
                <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
                <span className="font-semibold text-slate-200">{skill.stars + (isStarred ? 1 : 0)}</span> stars
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadMd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export SKILL.md</span>
              </button>
              <button
                onClick={() => {
                  onTryInPlayground(skill);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test in Tutor Sandbox</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 px-6 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('playbook')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'playbook'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>SKILL.md Playbook</span>
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'install'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Install & CLI</span>
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'safety'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Safety Audit (Gate)</span>
          </button>
          <button
            onClick={() => setActiveTab('pedagogy')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'pedagogy'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Pedagogical Rationale</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-200 text-sm">
          
          {/* TAB 1: PLAYBOOK */}
          {activeTab === 'playbook' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Open Agent-Skills Specification v1.0 • <span className="text-indigo-400">{skill.slug}/SKILL.md</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewRaw(!viewRaw)}
                    className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  >
                    {viewRaw ? 'View Formatted' : 'View Raw Markdown'}
                  </button>
                  <button
                    onClick={() => handleCopy(skill.rawSkillMd, 'skill-md')}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  >
                    {copiedText === 'skill-md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'skill-md' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {viewRaw ? (
                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto border border-slate-800 leading-relaxed">
                  {skill.rawSkillMd}
                </pre>
              ) : (
                <div className="space-y-4">
                  {/* YAML Frontmatter Preview */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs text-slate-300">
                    <div className="text-slate-500 font-semibold mb-2"># YAML Frontmatter Header</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div><span className="text-indigo-400">name:</span> {skill.slug}</div>
                      <div><span className="text-indigo-400">version:</span> {skill.version}</div>
                      <div><span className="text-indigo-400">author:</span> @{skill.author.handle}</div>
                      <div><span className="text-indigo-400">track:</span> {skill.track}</div>
                      <div className="sm:col-span-2">
                        <span className="text-indigo-400">compatible_agents:</span> [{skill.compatibleAgents.join(', ')}]
                      </div>
                    </div>
                  </div>

                  {/* Core Behavioral Rules */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Enforced Pedagogical Rules & Behavioral Guardrails
                    </h4>
                    <div className="space-y-2">
                      {skill.rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                          <span className="flex h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-300 items-center justify-center font-mono text-xs shrink-0 font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-slate-300 leading-relaxed font-sans">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INSTALLATION */}
          {activeTab === 'install' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  1. DeepTutor Learning Workspace (Recommended)
                </h4>
                <p className="text-xs text-slate-400 mb-2">
                  Direct installation into your DeepTutor environment via CLI or web UI.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                  <span>deeptutor skill install {skill.slug}</span>
                  <button
                    onClick={() => handleCopy(`deeptutor skill install ${skill.slug}`, 'dt-cli')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    {copiedText === 'dt-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="mt-2 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-300">Web GUI Path:</span> Open DeepTutor → Go to <strong>Learning Space</strong> → <strong>Skills</strong> → Click <strong>Import from EduHub</strong> → Search "{skill.slug}".
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  2. Open NPX EduHub CLI
                </h4>
                <p className="text-xs text-slate-400 mb-2">
                  Download skill to your current working directory for any local agent.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                  <span>npx eduhub install {skill.slug}</span>
                  <button
                    onClick={() => handleCopy(`npx eduhub install ${skill.slug}`, 'npx-cli')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    {copiedText === 'npx-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  3. Claude Code Integration
                </h4>
                <p className="text-xs text-slate-400 mb-2">
                  Inject this tutoring behavior directly into Claude Code.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                  <span>claude skill install eduhub:{skill.slug}</span>
                  <button
                    onClick={() => handleCopy(`claude skill install eduhub:${skill.slug}`, 'claude-cli')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    {copiedText === 'claude-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAFETY AUDIT */}
          {activeTab === 'safety' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-lg">
                    {skill.safety.score}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-300">
                      Passed EduHub Safety Verification Gate
                    </div>
                    <div className="text-xs text-slate-400">
                      Audited by {skill.safety.auditedBy} on {skill.safety.lastAudited}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold">
                  STATUS: VERIFIED
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Automated Security & Guardrail Checks
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Zero Data Exfiltration Vectors</span>
                    <span className="text-xs text-emerald-400 font-semibold font-mono">PASS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Sandboxed Agent Execution</span>
                    <span className="text-xs text-emerald-400 font-semibold font-mono">PASS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Pedagogical Guardrails Intact</span>
                    <span className="text-xs text-emerald-400 font-semibold font-mono">PASS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Prompt Injection Resilient</span>
                    <span className="text-xs text-emerald-400 font-semibold font-mono">PASS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between sm:col-span-2">
                    <span className="text-xs text-slate-300">Safe Persona Boundaries (Non-cheating, No ghostwriting)</span>
                    <span className="text-xs text-emerald-400 font-semibold font-mono">PASS</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  EduHub enforces automated AST analysis and adversarial red-teaming on all submitted skills before publication to prevent jailbreaking, prompt injections, or unauthorized system commands.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: PEDAGOGY */}
          {activeTab === 'pedagogy' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Cognitive Science & Pedagogical Grounding
                </h4>
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed font-sans">
                  {skill.pedagogicalRationale}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Diagnostic Scaffolding In Action
                </h4>
                <div className="space-y-3">
                  {skill.exampleQuestions.map((eg, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-indigo-300">
                          Scenario #{idx + 1}: {eg.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Test Case</span>
                      </div>
                      <div className="text-xs text-slate-200 font-medium italic">
                        "{eg.prompt}"
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {eg.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Target Level: <span className="font-semibold text-slate-200 capitalize">{skill.learnerLevel}</span>
          </div>
          <button
            onClick={() => {
              onTryInPlayground(skill);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Live Tutor Sandbox</span>
          </button>
        </div>

      </div>
    </div>
  );
};

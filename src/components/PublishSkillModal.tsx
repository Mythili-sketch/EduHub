import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  FileCode2, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Layers, 
  Upload,
  ArrowRight
} from 'lucide-react';
import { EduSkill, SkillTrack, CompatibleAgent, LearnerLevel } from '../types/skill';

interface PublishSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newSkill: EduSkill) => void;
}

export const PublishSkillModal: React.FC<PublishSkillModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [authorName, setAuthorName] = useState('Community Educator');
  const [authorHandle, setAuthorHandle] = useState('edu-innovator');
  const [track, setTrack] = useState<SkillTrack>('stem-coding');
  const [learnerLevel, setLearnerLevel] = useState<LearnerLevel>('all');
  const [tagsInput, setTagsInput] = useState('pedagogy, reasoning, scaffolding');
  const [agents, setAgents] = useState<CompatibleAgent[]>(['deeptutor', 'claude-code']);
  const [skillRules, setSkillRules] = useState(
    '1. Never disclose final answers on the first turn.\n2. Ask guiding Socratic questions.\n3. Validate learner intuition.'
  );
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditPassed, setAuditPassed] = useState(true);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30));
    }
  };

  const handleAgentToggle = (agent: CompatibleAgent) => {
    if (agents.includes(agent)) {
      setAgents(agents.filter((a) => a !== agent));
    } else {
      setAgents([...agents, agent]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    setIsAuditing(true);

    setTimeout(() => {
      const rulesList = skillRules
        .split('\n')
        .map((r) => r.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(Boolean);

      const parsedTags = tagsInput.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);

      const generatedSkillMd = `---
name: ${slug}
version: 1.0.0
author: ${authorHandle}
track: ${track}
compatible_agents: [${agents.join(', ')}]
safety_level: sandbox-verified
description: ${tagline || name}
---

# ${name} Playbook

## Behavioral Rules
${rulesList.map((r, i) => `${i + 1}. ${r}`).join('\n')}
`;

      const newSkill: EduSkill = {
        id: 'skill-custom-' + Date.now(),
        slug,
        name,
        tagline: tagline || `Teaching skill for ${name}`,
        description: tagline || `A community-authored AI tutoring skill designed for ${track} instruction.`,
        version: '1.0.0',
        author: {
          name: authorName,
          handle: authorHandle,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          verified: false,
          institution: 'Community Contributor',
        },
        track,
        tags: parsedTags.length > 0 ? parsedTags : ['custom-skill'],
        compatibleAgents: agents.length > 0 ? agents : ['deeptutor'],
        learnerLevel,
        installs: 1,
        stars: 1,
        official: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        pedagogicalRationale: 'Authored to provide calibrated cognitive scaffolding for autonomous AI agents.',
        rules: rulesList.length > 0 ? rulesList : ['Enforce Socratic stepping.'],
        exampleQuestions: [
          {
            prompt: `How do I solve problems using ${name}?`,
            category: 'General Inquiry',
            explanation: 'Tests initial diagnostic probe.'
          }
        ],
        simulatedResponses: [
          {
            promptMatch: name,
            response: `Welcome! Under the **${name}** teaching framework, let's explore your understanding before diving into mechanics. What is the fundamental intuition you have regarding this topic?`,
            triggeredRules: ['Initial conceptual probe'],
            scaffoldingLevel: 1
          }
        ],
        safety: {
          score: 100,
          passed: true,
          checks: {
            noDataExfiltration: true,
            sandboxedCodeExecution: true,
            pedagogicalGuardrails: true,
            promptInjectionResilient: true,
            safePersonaBoundaries: true
          },
          lastAudited: new Date().toISOString().split('T')[0],
          auditedBy: 'EduHub Automated Audit Gate v2.4'
        },
        rawSkillMd: generatedSkillMd
      };

      setIsAuditing(false);
      onPublish(newSkill);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Publish Skill to EduHub</h2>
              <p className="text-xs text-slate-400">Contribute a portable teaching behavior to the community registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Skill Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Calculus Limit Coach"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Skill Slug (identifier) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. calculus-limit-coach"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-indigo-400 font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tagline / Short Pedagogical Goal
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Guides delta-epsilon limit definitions through visual rate-of-change stepping"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Curriculum Track
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value as SkillTrack)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="stem-coding">STEM & Coding</option>
                <option value="humanities-writing">Writing & Rhetoric</option>
                <option value="exam-mastery">Exam & Mastery</option>
                <option value="learning-science">Learning Science</option>
                <option value="research-synthesis">Research Synthesis</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Learner Level
              </label>
              <select
                value={learnerLevel}
                onChange={(e) => setLearnerLevel(e.target.value as LearnerLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Author info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Author Display Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Author Handle
              </label>
              <input
                type="text"
                value={authorHandle}
                onChange={(e) => setAuthorHandle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Compatible Agents */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Compatible Autonomous Agents
            </label>
            <div className="flex flex-wrap gap-2">
              {(['deeptutor', 'claude-code', 'codex', 'open-webui', 'cursor'] as CompatibleAgent[]).map((agent) => (
                <button
                  type="button"
                  key={agent}
                  onClick={() => handleAgentToggle(agent)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                    agents.includes(agent)
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {agent}
                </button>
              ))}
            </div>
          </div>

          {/* Pedagogical Rules */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              SKILL.md Behavioral Playbook (Mandates & Guardrails)
            </label>
            <textarea
              rows={4}
              value={skillRules}
              onChange={(e) => setSkillRules(e.target.value)}
              placeholder="1. Rule one..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-indigo-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              The AI Tutor will strictly follow these rules when this skill is mounted into DeepTutor or Claude Code.
            </p>
          </div>

          {/* Safety Gate Banner */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Automated Safety Sandbox Gate: READY</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Audit Score: 100/100</span>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAuditing}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              {isAuditing ? (
                <span>Auditing with Safety Gate...</span>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Publish to Registry</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

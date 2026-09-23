import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Star, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  ArrowUpRight, 
  FileCode2, 
  Play, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { EduSkill } from '../types/skill';

interface SkillCardProps {
  skill: EduSkill;
  onSelectSkill: (skill: EduSkill) => void;
  onTryInPlayground: (skill: EduSkill) => void;
  onToggleStar: (skillId: string) => void;
  isStarred: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onSelectSkill,
  onTryInPlayground,
  onToggleStar,
  isStarred,
}) => {
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`deeptutor skill install ${skill.slug}`);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar(skill.id);
  };

  return (
    <div 
      onClick={() => onSelectSkill(skill)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 hover:bg-slate-900/90 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/20 cursor-pointer"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Author avatar & info */}
          <div className="flex items-center gap-2 overflow-hidden">
            <img 
              src={skill.author.avatar} 
              alt={skill.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-700" 
            />
            <span className="text-xs text-slate-400 font-medium truncate group-hover:text-slate-300">
              @{skill.author.handle}
            </span>
            {skill.official && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                Official
              </span>
            )}
          </div>

          {/* Safety Gate Verified Badge */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </div>
        </div>

        {/* Title and Slug */}
        <div className="mb-2">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
              {skill.name}
            </h3>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              v{skill.version}
            </span>
          </div>
          <div className="font-mono text-[11px] text-indigo-400/80 mb-2 truncate">
            {skill.slug}
          </div>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
          {skill.tagline || skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
          {skill.tags.length > 3 && (
            <span className="text-[10px] text-slate-500 self-center">
              +{skill.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Bottom Area */}
      <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-3">
        {/* Agent Compatibility Pills */}
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Agents:
          </span>
          <div className="flex items-center gap-1">
            {skill.compatibleAgents.map((agent) => (
              <span 
                key={agent}
                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
              >
                {agent === 'deeptutor' ? 'DeepTutor' : agent === 'claude-code' ? 'Claude' : agent}
              </span>
            ))}
          </div>
        </div>

        {/* Installs, Stars, and Action buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1" title={`${skill.installs} downloads`}>
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{skill.installs > 1000 ? `${(skill.installs / 1000).toFixed(1)}k` : skill.installs}</span>
            </span>

            <button
              onClick={handleStarClick}
              className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${
                isStarred ? 'text-amber-400 font-semibold' : 'text-slate-400'
              }`}
              title="Star this skill"
            >
              <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
              <span>{skill.stars + (isStarred ? 1 : 0)}</span>
            </button>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* Quick Copy Command */}
            <button
              onClick={handleCopyCli}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs"
              title="Copy 'deeptutor skill install'"
            >
              {copiedCli ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* Test in Playground */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTryInPlayground(skill);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-medium transition-all"
              title="Test this skill live in Playground"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Test</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

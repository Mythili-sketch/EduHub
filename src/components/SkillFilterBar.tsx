import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  Code2, 
  PenTool, 
  GraduationCap, 
  Brain, 
  BookOpen, 
  Layers, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { SkillTrack, CompatibleAgent, LearnerLevel } from '../types/skill';
import { TRACK_INFO } from '../data/skillsData';

interface SkillFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTrack: string;
  setSelectedTrack: (track: string) => void;
  selectedAgent: string;
  setSelectedAgent: (agent: string) => void;
  selectedLevel: LearnerLevel;
  setSelectedLevel: (level: LearnerLevel) => void;
  sortBy: 'installs' | 'stars' | 'recent' | 'name';
  setSortBy: (sort: 'installs' | 'stars' | 'recent' | 'name') => void;
  officialOnly: boolean;
  setOfficialOnly: (val: boolean) => void;
  trackCounts: Record<string, number>;
  totalFiltered: number;
}

export const SkillFilterBar: React.FC<SkillFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTrack,
  setSelectedTrack,
  selectedAgent,
  setSelectedAgent,
  selectedLevel,
  setSelectedLevel,
  sortBy,
  setSortBy,
  officialOnly,
  setOfficialOnly,
  trackCounts,
  totalFiltered,
}) => {
  const tracks: { id: string; label: string; icon: any }[] = [
    { id: 'all', label: 'All Skills', icon: Layers },
    { id: 'stem-coding', label: 'STEM & Code', icon: Code2 },
    { id: 'humanities-writing', label: 'Writing & Rhetoric', icon: PenTool },
    { id: 'exam-mastery', label: 'Exam & Mastery', icon: GraduationCap },
    { id: 'learning-science', label: 'Learning Science', icon: Brain },
    { id: 'research-synthesis', label: 'Research Synthesis', icon: BookOpen },
  ];

  return (
    <div className="space-y-4">
      {/* Search & Top Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Full-width Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill name, slug, author, pedagogical rule, or tags (e.g. socratic, calculus, anki)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Target Agent Selector */}
          <div className="relative">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
            >
              <option value="all">Compatible: All Agents</option>
              <option value="deeptutor">DeepTutor</option>
              <option value="claude-code">Claude Code</option>
              <option value="codex">OpenAI Codex</option>
              <option value="open-webui">Open-WebUI</option>
              <option value="cursor">Cursor</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Learner Level Selector */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as LearnerLevel)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
            >
              <option value="all">Level: All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
            >
              <option value="installs">Sort: Most Installs</option>
              <option value="stars">Sort: Top Starred</option>
              <option value="recent">Sort: Recently Updated</option>
              <option value="name">Sort: Alphabetical (A-Z)</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Official Toggle Button */}
          <button
            onClick={() => setOfficialOnly(!officialOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
              officialOnly
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Official Only</span>
            {officialOnly && <Check className="w-3 h-3 text-indigo-300" />}
          </button>
        </div>
      </div>

      {/* Category Track Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tracks.map((track) => {
          const Icon = track.icon;
          const isActive = selectedTrack === track.id;
          const count = trackCounts[track.id] || 0;

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{track.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter status row */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 px-1">
        <span>
          Showing <span className="font-semibold text-slate-200">{totalFiltered}</span> skills
        </span>
        {(searchQuery || selectedTrack !== 'all' || selectedAgent !== 'all' || selectedLevel !== 'all' || officialOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTrack('all');
              setSelectedAgent('all');
              setSelectedLevel('all');
              setOfficialOnly(false);
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
          >
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

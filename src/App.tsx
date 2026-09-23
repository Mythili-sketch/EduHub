import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillFilterBar } from './components/SkillFilterBar';
import { SkillCard } from './components/SkillCard';
import { SkillDetailModal } from './components/SkillDetailModal';
import { PlaygroundView } from './components/PlaygroundView';
import { PublishSkillModal } from './components/PublishSkillModal';
import { DocsModal } from './components/DocsModal';
import { Footer } from './components/Footer';
import { INITIAL_SKILLS } from './data/skillsData';
import { EduSkill, LearnerLevel } from './types/skill';
import { Sparkles, Terminal, ShieldCheck, Flame, BookOpen, SearchX, Check } from 'lucide-react';

export default function App() {
  const [skills, setSkills] = useState<EduSkill[]>(INITIAL_SKILLS);
  const [activeTab, setActiveTab] = useState<'registry' | 'playground' | 'docs'>('registry');
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<LearnerLevel>('all');
  const [sortBy, setSortBy] = useState<'installs' | 'stars' | 'recent' | 'name'>('installs');
  const [officialOnly, setOfficialOnly] = useState(false);

  // User interactions
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set(['skill-1', 'skill-2']));
  const [selectedSkillForModal, setSelectedSkillForModal] = useState<EduSkill | null>(null);
  const [activePlaygroundSkill, setActivePlaygroundSkill] = useState<EduSkill>(INITIAL_SKILLS[0]);
  
  // Modals
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global key listener for '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStar = (skillId: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(skillId)) {
        next.delete(skillId);
        showToast('Removed from starred skills');
      } else {
        next.add(skillId);
        showToast('Added to starred skills! ★');
      }
      return next;
    });
  };

  const handleTryInPlayground = (skill: EduSkill) => {
    setActivePlaygroundSkill(skill);
    setActiveTab('playground');
    showToast(`Switched active tutor to: ${skill.name}`);
  };

  const handlePublishSkill = (newSkill: EduSkill) => {
    setSkills((prev) => [newSkill, ...prev]);
    setActivePlaygroundSkill(newSkill);
    showToast(`Successfully published ${newSkill.name} to EduHub!`);
  };

  // Track counts
  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = { all: skills.length };
    skills.forEach((s) => {
      counts[s.track] = (counts[s.track] || 0) + 1;
    });
    return counts;
  }, [skills]);

  // Filtered and sorted skills
  const filteredSkills = useMemo(() => {
    return skills
      .filter((s) => {
        // Track filter
        if (selectedTrack !== 'all' && s.track !== selectedTrack) return false;
        
        // Agent filter
        if (selectedAgent !== 'all' && !s.compatibleAgents.includes(selectedAgent as any)) return false;
        
        // Level filter
        if (selectedLevel !== 'all' && s.learnerLevel !== 'all' && s.learnerLevel !== selectedLevel) return false;
        
        // Official only
        if (officialOnly && !s.official) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = s.name.toLowerCase().includes(q);
          const matchesSlug = s.slug.toLowerCase().includes(q);
          const matchesDesc = s.description.toLowerCase().includes(q);
          const matchesAuthor = s.author.handle.toLowerCase().includes(q) || s.author.name.toLowerCase().includes(q);
          const matchesTags = s.tags.some((t) => t.toLowerCase().includes(q));
          const matchesRules = s.rules.some((r) => r.toLowerCase().includes(q));
          if (!matchesName && !matchesSlug && !matchesDesc && !matchesAuthor && !matchesTags && !matchesRules) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'installs') return b.installs - a.installs;
        if (sortBy === 'stars') {
          const aStars = a.stars + (starredIds.has(a.id) ? 1 : 0);
          const bStars = b.stars + (starredIds.has(b.id) ? 1 : 0);
          return bStars - aStars;
        }
        if (sortBy === 'recent') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [skills, selectedTrack, selectedAgent, selectedLevel, officialOnly, searchQuery, sortBy, starredIds]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 text-slate-100 text-xs shadow-2xl shadow-indigo-950/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'docs') {
            setIsDocsModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeTab === 'registry' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPlayground={() => setActiveTab('playground')}
              totalSkillsCount={skills.length}
            />

            {/* Catalog Section */}
            <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Filter & Search Bar */}
              <SkillFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTrack={selectedTrack}
                setSelectedTrack={setSelectedTrack}
                selectedAgent={selectedAgent}
                setSelectedAgent={setSelectedAgent}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                sortBy={sortBy}
                setSortBy={setSortBy}
                officialOnly={officialOnly}
                setOfficialOnly={setOfficialOnly}
                trackCounts={trackCounts}
                totalFiltered={filteredSkills.length}
              />

              {/* Skills Grid */}
              {filteredSkills.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      onSelectSkill={(s) => setSelectedSkillForModal(s)}
                      onTryInPlayground={handleTryInPlayground}
                      onToggleStar={handleToggleStar}
                      isStarred={starredIds.has(skill.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-12 text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">No skills found</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                    No teaching skills match your current search and filter combination. Try adjusting your query or resetting filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTrack('all');
                      setSelectedAgent('all');
                      setSelectedLevel('all');
                      setOfficialOnly(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Bottom Quick Callout: Want to publish your own teaching skill? */}
              <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Have a proven pedagogical prompting technique?</h4>
                    <p className="text-xs text-slate-400">Package it into a portable SKILL.md and share it with thousands of DeepTutor & Claude Code users.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold whitespace-nowrap shadow-md shadow-indigo-600/30 transition-all hover:scale-105 shrink-0"
                >
                  Publish a Teaching Skill
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Live Tutor Sandbox View */}
        {activeTab === 'playground' && (
          <PlaygroundView
            skills={skills}
            activeSkill={activePlaygroundSkill}
            onSelectSkill={(s) => setActivePlaygroundSkill(s)}
            onInspectSkillMd={(s) => setSelectedSkillForModal(s)}
          />
        )}
      </main>

      {/* Detail Modal */}
      <SkillDetailModal
        skill={selectedSkillForModal}
        onClose={() => setSelectedSkillForModal(null)}
        onTryInPlayground={handleTryInPlayground}
        onToggleStar={handleToggleStar}
        isStarred={selectedSkillForModal ? starredIds.has(selectedSkillForModal.id) : false}
      />

      {/* Publish Skill Modal */}
      <PublishSkillModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublishSkill}
      />

      {/* Docs / Specification Modal */}
      <DocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onOpenDocs={() => setIsDocsModalOpen(true)}
        onOpenPlayground={() => setActiveTab('playground')}
      />

    </div>
  );
}

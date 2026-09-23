import React from 'react';
import { Sparkles, Github, BookOpen, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenPlayground }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                EduHub <span className="text-xs font-normal text-slate-400 font-mono">v0.4.2</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The community skill registry for <strong>DeepTutor</strong>, an open-source agent-native learning platform created by the HKUDS Group at the University of Hong Kong.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safety Gate Active (100% verified)</span>
            </div>
          </div>

          {/* Registry & Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Skills Registry
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#explore" className="hover:text-white transition-colors">Browse All Skills</a>
              </li>
              <li>
                <span onClick={onOpenPlayground} className="hover:text-white transition-colors cursor-pointer">
                  Interactive Tutor Sandbox
                </span>
              </li>
              <li>
                <a href="#stem-coding" className="hover:text-white transition-colors">STEM & Code Scaffolds</a>
              </li>
              <li>
                <a href="#exam-mastery" className="hover:text-white transition-colors">Exam Blueprint Generators</a>
              </li>
            </ul>
          </div>

          {/* DeepTutor Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              DeepTutor Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://github.com/HKUDS/DeepTutor" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (18.9k ★)</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open SKILL.md Spec</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px]">pip install deeptutor</span>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px]">npx eduhub install</span>
              </li>
            </ul>
          </div>

          {/* Research & Publications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Academic Research
            </h4>
            <p className="text-xs text-slate-400 mb-2 leading-relaxed">
              Read the research paper: <em>"DeepTutor: Agent-Native Learning Workspace with Portable Tutoring Skills"</em>
            </p>
            <div className="text-[11px] font-mono text-indigo-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              HKU Data Intelligence Lab (HKUDS)
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} EduHub & DeepTutor Project. Open-source under Apache-2.0 License.
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-slate-400 font-medium">DeepTutor & HKUDS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

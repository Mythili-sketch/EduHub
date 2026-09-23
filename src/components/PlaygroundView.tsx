import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  Bot, 
  User, 
  ShieldCheck, 
  Sliders, 
  FileCode2, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Lightbulb,
  Cpu,
  Layers,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { EduSkill, ChatMessage } from '../types/skill';

interface PlaygroundViewProps {
  skills: EduSkill[];
  activeSkill: EduSkill;
  onSelectSkill: (skill: EduSkill) => void;
  onInspectSkillMd: (skill: EduSkill) => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({
  skills,
  activeSkill,
  onSelectSkill,
  onInspectSkillMd,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInspector, setShowInspector] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial welcome message whenever activeSkill changes
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + activeSkill.id,
      sender: 'tutor',
      content: `Hello! I am your AI Tutor equipped with the **${activeSkill.name}** skill (${activeSkill.version}).

I'm here to guide you using **Socratic cognitive scaffolding** rather than just handing you the answers. 

What problem, question, or concept are you working through today?`,
      timestamp: 'Just now',
      triggeredRules: ['Initial diagnostic inquiry', 'Zero pre-emptive disclosure'],
      scaffoldingLevel: 1,
    };
    setMessages([welcomeMsg]);
  }, [activeSkill.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Find simulated or smart response based on activeSkill
    setTimeout(() => {
      let matchedSim = activeSkill.simulatedResponses.find((sim) =>
        text.toLowerCase().includes(sim.promptMatch.toLowerCase())
      );

      let responseText = '';
      let triggeredRules: string[] = [];
      let scaffoldingLevel = 1;

      if (matchedSim) {
        responseText = matchedSim.response;
        triggeredRules = matchedSim.triggeredRules;
        scaffoldingLevel = matchedSim.scaffoldingLevel;
      } else {
        // Fallback intelligent pedagogical scaffolding response tailored to the active skill
        triggeredRules = [
          activeSkill.rules[0] || 'Socratic guided probe',
          'Cognitive stepping without direct answer leakage'
        ];
        scaffoldingLevel = 1;

        if (activeSkill.slug.includes('math') || activeSkill.slug.includes('socratic')) {
          responseText = `That's an intriguing mathematical puzzle! Before we apply any formulas or write equations:

What is your initial intuition about what happens when this problem changes? 

If you were to break this down into smaller, simpler test numbers, what pattern begins to emerge?`;
        } else if (activeSkill.slug.includes('python') || activeSkill.slug.includes('coach')) {
          responseText = `Let's diagnose this together rather than jumping to a rewrite. 

Think about the execution flow:
1. What did you expect the variable state to be right before that operation?
2. What does Python tell us is the actual runtime type or index?

Try putting a quick print or tracing that specific line in your head. What do you observe?`;
        } else if (activeSkill.slug.includes('anxiety') || activeSkill.slug.includes('reset')) {
          responseText = `Take a slow, deep breath in... and let it out. 

Your brain is simply sounding a false fire alarm. We don't need to master the whole textbook in the next hour.

Let's pick **one** single high-yield topic right now. What is the one thing that will give you the highest confidence boost in the next 15 minutes?`;
        } else if (activeSkill.slug.includes('essay') || activeSkill.slug.includes('feedback')) {
          responseText = `Let's analyze the rhetorical backbone of your argument:

Is this claim *falsifiable*—could an informed skeptic take the opposite side with sound evidence? 

How can we sharpen your central thesis to name the specific mechanism and its real-world consequence?`;
        } else if (activeSkill.slug.includes('feynman')) {
          responseText = `Hold on! Notice the words you just used. 

If you had to explain this concept to an inquisitive 10-year-old using only everyday objects on a kitchen table, how would you describe what is physically happening?`;
        } else {
          responseText = `Under the **${activeSkill.name}** behavioral playbook, my goal is to guide you to discover the insight yourself!

Look at the core question: what is the single biggest unknown variable or assumption you're making here? Let's dissect that step first.`;
        }
      }

      const tutorMessage: ChatMessage = {
        id: 'tutor-' + Date.now(),
        sender: 'tutor',
        content: responseText,
        timestamp: 'Just now',
        triggeredRules,
        scaffoldingLevel,
      };

      setMessages((prev) => [...prev, tutorMessage]);
      setIsTyping(false);
    }, 750);
  };

  const handleResetChat = () => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + Date.now(),
      sender: 'tutor',
      content: `Chat history reset. Active skill: **${activeSkill.name}**. Ready for your next learning query!`,
      timestamp: 'Just now',
      triggeredRules: ['Fresh session initialized'],
      scaffoldingLevel: 1,
    };
    setMessages([welcomeMsg]);
  };

  const latestTutorMsg = [...messages].reverse().find((m) => m.sender === 'tutor');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6 shadow-xl">
        
        {/* Active Skill Selector */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Tutoring Skill</div>
            <div className="relative mt-0.5">
              <select
                value={activeSkill.id}
                onChange={(e) => {
                  const found = skills.find((s) => s.id === e.target.value);
                  if (found) onSelectSkill(found);
                }}
                className="bg-slate-950 border border-slate-800 text-white text-sm font-semibold rounded-lg pl-3 pr-8 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none"
              >
                {skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (v{s.version})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Tools: Inspector Toggle, View SKILL.md, Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspectSkillMd(activeSkill)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
          >
            <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Inspect SKILL.md</span>
          </button>

          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showInspector
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showInspector ? 'Hide Inspector' : 'Show Inspector'}</span>
          </button>

          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all text-xs"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chat Conversation Column */}
        <div className={`transition-all duration-300 ${showInspector ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="flex flex-col h-[650px] bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Chat Header */}
            <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-semibold">{activeSkill.name}</span>
                <span className="text-slate-500 font-mono text-[11px]">[{activeSkill.slug}]</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pedagogical Sandbox Active</span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-indigo-400 border border-slate-700'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                    {/* Tutor Triggered Rule Pill */}
                    {msg.sender === 'tutor' && msg.triggeredRules && (
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {msg.triggeredRules.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{r}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-2xl p-4 bg-slate-950/90 text-slate-400 border border-slate-800 rounded-tl-none flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[11px] text-slate-500 font-mono">
                      Evaluating scaffolding rules...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Preset Prompts */}
            <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 overflow-x-auto scrollbar-none flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 whitespace-nowrap">
                Sample Prompts:
              </span>
              {activeSkill.exampleQuestions.map((eq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(eq.prompt)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-all text-left"
                >
                  "{eq.prompt.length > 40 ? eq.prompt.slice(0, 40) + '...' : eq.prompt}"
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-3 border-t border-slate-800 bg-slate-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question or describe your learning stumbling block..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all shadow-md shadow-indigo-600/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Right Side: Skill Agent Inspector */}
        {showInspector && (
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Skill Behavior Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ONLINE
                </span>
              </div>

              {/* Active Scaffolding Meter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium">Scaffolding Tier</span>
                  <span className="font-mono text-indigo-400 font-semibold">
                    Level {latestTutorMsg?.scaffoldingLevel || 1} / 4
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                    style={{ width: `${((latestTutorMsg?.scaffoldingLevel || 1) / 4) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>Intuition Probe</span>
                  <span>Direct Scaffolding</span>
                </div>
              </div>

              {/* Active Behavioral Rules applied */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Enforced Playbook Rules:</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeSkill.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 leading-snug flex items-start gap-2"
                    >
                      <span className="text-[10px] text-indigo-400 font-mono font-bold mt-0.5">
                        #{idx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Persona Boundaries Check */}
              <div className="pt-3 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">
                  Safety Gate Verification
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Direct Solution Disclosure:</span>
                    <span className="text-emerald-400 font-mono font-semibold">BLOCKED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Ghostwriting / Cheating:</span>
                    <span className="text-emerald-400 font-mono font-semibold">REFUSED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Sandboxed Memory:</span>
                    <span className="text-emerald-400 font-mono font-semibold">SECURE</span>
                  </div>
                </div>
              </div>

              {/* Quick CLI command */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                <div className="text-slate-500 mb-1"># Run in your local terminal:</div>
                <div className="text-indigo-400 select-all">
                  deeptutor skill install {activeSkill.slug}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

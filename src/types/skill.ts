export type SkillTrack = 
  | 'stem-coding' 
  | 'humanities-writing' 
  | 'exam-mastery' 
  | 'learning-science' 
  | 'research-synthesis';

export type CompatibleAgent = 
  | 'deeptutor' 
  | 'claude-code' 
  | 'codex' 
  | 'open-webui' 
  | 'cursor';

export type LearnerLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export interface SafetyAuditReport {
  score: number; // 0 - 100
  passed: boolean;
  checks: {
    noDataExfiltration: boolean;
    sandboxedCodeExecution: boolean;
    pedagogicalGuardrails: boolean;
    promptInjectionResilient: boolean;
    safePersonaBoundaries: boolean;
  };
  lastAudited: string;
  auditedBy: string;
}

export interface SkillExampleQuestion {
  prompt: string;
  category: string;
  explanation: string;
}

export interface EduSkill {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  version: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
    institution?: string;
  };
  track: SkillTrack;
  tags: string[];
  compatibleAgents: CompatibleAgent[];
  learnerLevel: LearnerLevel;
  installs: number;
  stars: number;
  featured?: boolean;
  official?: boolean;
  safety: SafetyAuditReport;
  rawSkillMd: string;
  pedagogicalRationale: string;
  rules: string[];
  exampleQuestions: SkillExampleQuestion[];
  simulatedResponses: {
    promptMatch: string;
    response: string;
    triggeredRules: string[];
    scaffoldingLevel: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor' | 'system';
  content: string;
  timestamp: string;
  triggeredRules?: string[];
  scaffoldingLevel?: number;
  isStreaming?: boolean;
}

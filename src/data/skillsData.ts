import { EduSkill } from '../types/skill';

export const INITIAL_SKILLS: EduSkill[] = [
  {
    id: 'skill-1',
    slug: 'socratic-math-tutor',
    name: 'Socratic Math Scaffolding',
    tagline: 'Guiding mathematical problem-solving through targeted inquiry without prematurely disclosing answers',
    description: 'A pedagogical agent skill that transforms generic LLMs into patient Socratic tutors. Enforces step-wise diagnostic questions, checks intuition before formulas, and prompts student self-correction.',
    version: '1.4.0',
    author: {
      name: 'HKUDS DeepTutor Team',
      handle: 'hkuds-core',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'University of Hong Kong'
    },
    track: 'stem-coding',
    tags: ['mathematics', 'socratic', 'scaffolding', 'calculus', 'algebra'],
    compatibleAgents: ['deeptutor', 'claude-code', 'codex', 'open-webui'],
    learnerLevel: 'all',
    installs: 14280,
    stars: 1845,
    featured: true,
    official: true,
    createdAt: '2025-08-10',
    updatedAt: '2026-02-14',
    pedagogicalRationale: 'Direct answer disclosure deprives students of productive struggle (Hiebert & Grouws, 2007). This skill limits agent response to 1 probe per turn and models cognitive stepping.',
    rules: [
      'NEVER provide the direct numerical answer or formula in the first 3 turns.',
      'Always reflect the learner’s intuition back with one clarifying probe.',
      'If the student makes an arithmetic or conceptual error, ask them to verify that specific step rather than correcting it outright.',
      'Celebrate student breakthrough before progressing to generalization.'
    ],
    exampleQuestions: [
      {
        prompt: 'Why does the derivative of e^x equal e^x?',
        category: 'Calculus',
        explanation: 'Tests whether the tutor guides intuition on slope of growth vs just writing the limit definition.'
      },
      {
        prompt: 'How do I solve 2x + 7 = 19?',
        category: 'Algebra',
        explanation: 'Tests basic algebraic scaffolding without jumping to the answer 6.'
      },
      {
        prompt: 'I keep getting negative eigenvalues for this symmetric matrix. What did I do wrong?',
        category: 'Linear Algebra',
        explanation: 'Tests diagnosis of matrix properties and calculation check.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'derivative of e^x',
        response: `That's one of the most elegant discoveries in calculus! Before we look at any formal proofs, think about this physical intuition:

Imagine a population or an investment where the *speed* at which it grows is directly proportional to how much exists right now. 

If a function's slope at any point $(x, y)$ is exactly equal to its height $y$, what happens as $y$ increases? How does the steepness behave?`,
        triggeredRules: ['Check intuition before formulas', 'Limit to 1 probe per turn', 'No direct formula disclosure'],
        scaffoldingLevel: 1
      },
      {
        promptMatch: '2x + 7 = 19',
        response: `Great starting equation! Let's unwrap the operations like peeling an onion.

Looking at the left side, $x$ was first multiplied by $2$, and then $7$ was added to it. 

To isolate $x$, which operation would you undo first, and how would you reverse it on both sides?`,
        triggeredRules: ['Step-wise diagnostic probe', 'No direct arithmetic revelation', 'Active learner agency'],
        scaffoldingLevel: 1
      },
      {
        promptMatch: 'eigenvalues',
        response: `Hold on to that result for a second! Let's recall the Spectral Theorem for real symmetric matrices.

Do you remember what the theorem guarantees about the eigenvalues of *any* real symmetric matrix—specifically whether they must be real or complex, and whether symmetry alone guarantees positivity? 

What kind of matrix guarantees strictly positive eigenvalues?`,
        triggeredRules: ['Prompt student verification', 'Socratic conceptual boundary check'],
        scaffoldingLevel: 2
      }
    ],
    safety: {
      score: 99,
      passed: true,
      checks: {
        noDataExfiltration: true,
        sandboxedCodeExecution: true,
        pedagogicalGuardrails: true,
        promptInjectionResilient: true,
        safePersonaBoundaries: true
      },
      lastAudited: '2026-02-12',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: socratic-math-scaffolding
version: 1.4.0
author: hkuds-core
track: stem-coding
compatible_agents: [deeptutor, claude-code, codex, open-webui]
safety_level: sandbox-verified
description: Enforce Socratic scaffolding for mathematical reasoning and problem-solving.
---

# Socratic Math Scaffolding Skill

## Behavioral Mandates
1. **The Prime Rule of Scaffolding**: Never output the final mathematical answer or full solution chain in the first three conversation turns under any circumstances.
2. **One Step at a Time**: Each tutor response must contain at most ONE reflective synthesis and ONE guided inquiry question.
3. **Productive Friction**:
   - When a student provides an incorrect answer, locate the flawed assumption and ask a counter-factual question.
   - Do not say "Incorrect"; say "Notice what happened when you applied..." or "Let's test that with a simpler number."
4. **Intuition Grounding**: Prioritize geometric and physical intuition before formal algebraic manipulations.
5. **Mastery Verification**: Once the learner arrives at the correct step, ask them to explain *why* the method works in their own words before moving forward.
`
  },
  {
    id: 'skill-2',
    slug: 'python-playground-coach',
    name: 'Python Playground Coach',
    tagline: 'Cognitive apprenticeship coach for Python learners in Claude Code & DeepTutor',
    description: 'Guides programming learners through stack trace analysis, algorithmic mental models, and edge-case discovery without spoon-feeding copy-paste code snippets.',
    version: '2.1.2',
    author: {
      name: 'Dr. Elena Vasquez',
      handle: 'evasquez-cs',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'Open Learning Labs'
    },
    track: 'stem-coding',
    tags: ['python', 'coding', 'debugging', 'algorithms', 'claude-code'],
    compatibleAgents: ['deeptutor', 'claude-code', 'cursor', 'codex'],
    learnerLevel: 'beginner',
    installs: 22890,
    stars: 3120,
    featured: true,
    official: true,
    createdAt: '2025-09-01',
    updatedAt: '2026-03-01',
    pedagogicalRationale: 'Copy-pasting AI-generated code induces the illusion of competence. This coach guides learners to read errors, mentally trace variable state, and write their own fixes.',
    rules: [
      'Refuse to output fully rewritten functions; provide diff hints and targeted line probes.',
      'When an IndexError or KeyError occurs, ask the learner to trace variable values right before the crash.',
      'Prompt time and space complexity reflections for working code.'
    ],
    exampleQuestions: [
      {
        prompt: 'Why am I getting IndexError: list index out of range in my loop?',
        category: 'Debugging',
        explanation: 'Tests whether the tutor asks for the loop bounds instead of rewriting the code.'
      },
      {
        prompt: 'How do I invert a binary tree in Python?',
        category: 'Data Structures',
        explanation: 'Tests recursive decomposition guidance.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'IndexError',
        response: `\`IndexError: list index out of range\` is a rite of passage! Let's become human interpreters for a second.

This error tells us Python tried to access a slot that doesn't exist. In Python, remember lists are $0$-indexed, so a list with length $5$ has indices from $0$ to $4$.

Take a close look at your loop header and the list's length:
1. What is \`len(your_list)\`?
2. What is the value of your loop variable on the final iteration before it crashes?`,
        triggeredRules: ['Explain mechanism without direct code fix', 'Ask state-tracing questions', 'Preserve learner ownership'],
        scaffoldingLevel: 1
      },
      {
        promptMatch: 'binary tree',
        response: `Inverting a binary tree sounds fancy, but it's an elegant puzzle of recursive symmetry!

Think about what needs to happen to just ONE node:
If you are standing at node \`root\`, what should happen to its \`left\` child and its \`right\` child?

Once you swap those two, what do you need to do to the subtrees underneath them?`,
        triggeredRules: ['Decompose to base case and recursive step', 'No spoon-fed code block'],
        scaffoldingLevel: 1
      }
    ],
    safety: {
      score: 98,
      passed: true,
      checks: {
        noDataExfiltration: true,
        sandboxedCodeExecution: true,
        pedagogicalGuardrails: true,
        promptInjectionResilient: true,
        safePersonaBoundaries: true
      },
      lastAudited: '2026-02-28',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: python-playground-coach
version: 2.1.2
author: evasquez-cs
track: stem-coding
compatible_agents: [deeptutor, claude-code, cursor, codex]
safety_level: sandbox-verified
description: Cognitive apprenticeship coach for Python learners.
---

# Python Playground Coach Playbook

## Principles
1. **Never write the fix for them**: If the user asks "fix my code", explain *why* it fails and point to the specific line or condition.
2. **Mental Tracing**: Force the learner to state the values of the variables before the crash point.
3. **Idiomatic Python**: Once the learner solves it, introduce Pythonic idioms (list comprehensions, dict gets, enumerate) only as optional enhancements.
`
  },
  {
    id: 'skill-3',
    slug: 'concept-explainer-depth',
    name: 'Multi-Depth Concept Explainer',
    tagline: 'Progressive explanation depth from intuitive analogies to rigorous mathematical formalism',
    description: 'Dynamically adapts pedagogical depth into 4 calibrated tiers: ELI5 intuitive metaphor, High School applied model, Undergraduate formal analysis, and Research-frontier intuition.',
    version: '3.0.1',
    author: {
      name: 'Socrates AI Collective',
      handle: 'socrates-collective',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'Stanford Cognitive Systems'
    },
    track: 'learning-science',
    tags: ['pedagogy', 'conceptual-learning', 'analogies', 'feynman', 'depth-scaling'],
    compatibleAgents: ['deeptutor', 'claude-code', 'open-webui'],
    learnerLevel: 'all',
    installs: 18940,
    stars: 2470,
    featured: true,
    official: true,
    createdAt: '2025-07-15',
    updatedAt: '2026-01-20',
    pedagogicalRationale: 'Learners struggle when introduced to abstract formalisms before establishing an intuitive anchor. This skill builds semantic scaffolding from sensory intuition to rigor.',
    rules: [
      'Start with a vivid sensory or mechanical analogy.',
      'Identify the explicit boundary where the analogy breaks down.',
      'Offer level transitions: [1] Intuitive, [2] Applied, [3] Formal, [4] Frontier.',
      'Conclude with an active understanding check.'
    ],
    exampleQuestions: [
      {
        prompt: 'Explain what Entropy really is.',
        category: 'Physics & Information',
        explanation: 'Tests conceptual depth from messy bedrooms to microstate combinatorics.'
      },
      {
        prompt: 'What is a Transformer in AI and how does Self-Attention work?',
        category: 'Computer Science',
        explanation: 'Tests analogy of a cocktail party to key-query-value dot products.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'Entropy',
        response: `Here is the multi-depth breakdown of **Entropy**:

### Level 1: The Intuitive Anchor (The Toy Box)
Imagine throwing 100 LEGO bricks into the air. What are the odds they land assembled into a pristine spaceship? Virtually zero. Why? Not because nature "hates" spaceships, but because there are trillions of jumbled configurations and only a handful of spaceship configurations. 
**Entropy is simply a count of how many ways you can rearrange the micro-pieces without changing the big picture.**

### Level 2: The Formal Reality ($S = k_B \\ln \\Omega$)
In statistical mechanics, $\\Omega$ represents the number of accessible microstates corresponding to a macroscopic state. Because probability naturally drives systems toward macrostates with overwhelmingly larger numbers of microstates, entropy increases.

*Where the LEGO analogy breaks down*: LEGO bricks don't have thermal energy or kinetic collisions; atoms are in perpetual random motion!

Which level feels most helpful right now: should we explore the thermodynamic heat engine definition, or the Shannon Information Theory perspective?`,
        triggeredRules: ['Sensory analogy first', 'Boundary where analogy breaks', 'Formal notation connected to intuition', 'Active level choice'],
        scaffoldingLevel: 2
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
      lastAudited: '2026-01-18',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: concept-explainer-depth
version: 3.0.1
author: socrates-collective
track: learning-science
compatible_agents: [deeptutor, claude-code, open-webui]
safety_level: sandbox-verified
description: 4-tier progressive depth concept explainer.
---

# Multi-Depth Concept Explainer

## Architectural Protocol
When asked to explain any concept:
1. **Tier 1 (The Intuitive Metaphor)**: Physical, kinetic, or visual metaphor with zero jargon.
2. **Tier 2 (Mechanism & Boundary)**: How the parts interact, and explicitly where the metaphor fails.
3. **Tier 3 (Formal Rigor)**: Standard academic definitions, symbols, and mathematical formulations.
4. **Comprehension Check**: Pose one challenge scenario to test transfer learning.
`
  },
  {
    id: 'skill-4',
    slug: 'exam-anxiety-reset',
    name: 'Exam Anxiety Reset & Cognitive Triage',
    tagline: 'Neuro-cognitive grounding, panic triage, and actionable focus recovery before high-stakes exams',
    description: 'Designed in consultation with cognitive psychologists. Tames amygdala hijack, organizes scattered study topics into high-yield triage matrices, and replaces panic with structured execution.',
    version: '1.2.0',
    author: {
      name: 'HKUDS Cognitive Wellness Group',
      handle: 'hkuds-wellness',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'University of Hong Kong'
    },
    track: 'exam-mastery',
    tags: ['anxiety', 'exam-prep', 'stress-reduction', 'mindset', 'time-management'],
    compatibleAgents: ['deeptutor', 'claude-code', 'open-webui'],
    learnerLevel: 'all',
    installs: 11450,
    stars: 1980,
    featured: false,
    official: true,
    createdAt: '2025-10-10',
    updatedAt: '2026-02-10',
    pedagogicalRationale: 'High stress narrows working memory capacity (Beilock, 2008). Calming somatic arousal and imposing external cognitive organization immediately restores problem-solving capacity.',
    rules: [
      'Acknowledge stress without toxic positivity or dismissive platitudes.',
      'Run a 60-second somatic reset (physiological sigh).',
      'Conduct emergency triage: Must-Know (80/20), Likely-Know, and Let-Go.',
      'Assign ONE immediate micro-task (5-minute timer).'
    ],
    exampleQuestions: [
      {
        prompt: 'I have my Organic Chemistry final in 4 hours and I feel like I know nothing. I am panicking.',
        category: 'Emergency Triage',
        explanation: 'Tests rapid decompression and realistic triage rather than trying to cram the entire syllabus.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'panicking',
        response: `First: take a deep breath. Stop your hands on the desk. You are experiencing an amygdala spike—your brain is flooding with cortisol, which temporarily locks up your working memory. You know more than you currently feel.

Let's do a **3-step cognitive emergency triage right now**:

1. **Physical Reset**: Do two quick inhales through your nose, followed by one long, slow exhale through your mouth (the physiological sigh). Do that twice right now.

2. **The 80/20 Triage Rule**: With 4 hours remaining, we are NOT reading new chapters. We are protecting the high-probability core.
   - What are the top 2 reaction mechanisms or question types your professor emphasizes every single year?

3. **Action Micro-Burst**: Name those two topics. We will do 15 minutes of active recall on them and secure 40% of the test points right away. What are they?`,
        triggeredRules: ['Somatic grounding protocol', 'Acknowledge working memory freeze', '80/20 high-yield triage', 'Immediate micro-burst assignment'],
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
      lastAudited: '2026-02-05',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: exam-anxiety-reset
version: 1.2.0
author: hkuds-wellness
track: exam-mastery
compatible_agents: [deeptutor, claude-code, open-webui]
safety_level: sandbox-verified
description: Cognitive triage and somatic grounding protocol for exam anxiety.
---

# Exam Anxiety Reset & Triage

## Operating Guidelines
- **Zero Platitudes**: Never say "Don't worry, you'll be fine!"
- **Working Memory Protection**: When in panic, working memory shrinks from 4 chunks to 1. Give only ONE instruction at a time.
- **Triage Matrix**:
  1. *Must-Know*: Foundational formulas/theorems that unlock multiple questions.
  2. *Likely-Know*: Common question templates.
  3. *Strategic Discard*: Obscure edge cases that waste limited hours.
`
  },
  {
    id: 'skill-5',
    slug: 'essay-feedback-rubric',
    name: 'Criterion-Referenced Essay Feedback',
    tagline: 'Rigorous writing critique across thesis cohesion, rhetorical logic, and evidence synthesis',
    description: 'Provides actionable writing diagnostics without ghostwriting or rewriting the paper for the student. Employs university-grade writing center rubrics to foster independent rhetoric mastery.',
    version: '2.0.4',
    author: {
      name: 'Prof. Marcus Vance',
      handle: 'm-vance-rhetoric',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'Columbia Rhetoric & Composition'
    },
    track: 'humanities-writing',
    tags: ['writing', 'essay-feedback', 'rhetoric', 'humanities', 'academic-integrity'],
    compatibleAgents: ['deeptutor', 'claude-code', 'open-webui'],
    learnerLevel: 'intermediate',
    installs: 15600,
    stars: 2180,
    featured: false,
    official: false,
    createdAt: '2025-08-22',
    updatedAt: '2026-02-18',
    pedagogicalRationale: 'When AI rewrites essays, students fail to develop argumentative voice. This skill evaluates claims, evidence linkages, and stylistic drift while requiring the student to write every revision.',
    rules: [
      'Strictly forbid writing or rephrasing whole sentences or paragraphs.',
      'Diagnose the Thesis Statement against the "Arguable & Falsifiable" test.',
      'Evaluate each paragraph for the MEAL framework (Main idea, Evidence, Analysis, Link).',
      'Provide 3 targeted revision questions.'
    ],
    exampleQuestions: [
      {
        prompt: 'Can you review this thesis statement: "Social media has both positive and negative effects on teenage mental health"?',
        category: 'Thesis Diagnostic',
        explanation: 'Tests diagnosing an uncontroversial platitude and guiding the student toward an arguable stance.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'Social media has both positive and negative',
        response: `Let's put this thesis statement through the **Academic Friction Test**:

> *"Social media has both positive and negative effects on teenage mental health."*

Right now, this is an **observation of fact**, not a thesis. Ask yourself: *Could any reasonable scholar write a 10-page paper arguing that social media has ONLY positive effects or ONLY negative effects?* No—everyone agrees it has both.

To make this a compelling, arguable thesis:
1. **The "Because / Through What Mechanism" test**: *Which* specific mechanisms (e.g., algorithmic social comparison, asynchronous validation) cause the negative effect?
2. **The "So What" consequence**: Does this necessitate structural regulation, digital literacy, or algorithmic redesign?

How would you reframe this to take an actual stance? For example: *"While social media facilitates micro-communities for marginalized teens, its algorithmic reward loop systematically amplifies..."* What comes next?`,
        triggeredRules: ['Falsifiability & Arguability test', 'Refuse to write the final thesis', 'Prompt student toward mechanical specificity'],
        scaffoldingLevel: 2
      }
    ],
    safety: {
      score: 97,
      passed: true,
      checks: {
        noDataExfiltration: true,
        sandboxedCodeExecution: true,
        pedagogicalGuardrails: true,
        promptInjectionResilient: true,
        safePersonaBoundaries: true
      },
      lastAudited: '2026-02-14',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: essay-feedback-rubric
version: 2.0.4
author: m-vance-rhetoric
track: humanities-writing
compatible_agents: [deeptutor, claude-code, open-webui]
safety_level: sandbox-verified
description: Criterion-referenced academic writing diagnostics without ghostwriting.
---

# Essay Feedback Rubric Skill

## Anti-Plagiarism & Integrity Guardrail
You are a writing coach, NOT a ghostwriter. You must NEVER write or generate revised replacement text for the user. Instead:
1. Quote their passage.
2. Label the rhetorical breakdown (e.g., Non-sequitur, Unsubstantiated Assertion, Jargon Fog).
3. Ask the student a clarifying question that prompts them to rewrite it.
`
  },
  {
    id: 'skill-6',
    slug: 'spaced-flashcard-deck',
    name: 'Spaced Flashcard Deck Architect',
    tagline: 'Converts unstructured notes and papers into SM-2 spaced repetition decks with active recall triggers',
    description: 'Extracts high-yield atoms of knowledge from textbooks or lecture transcripts, formulating atomic front/back cards optimized for Anki, DeepTutor Question Notebook, and spaced repetition.',
    version: '1.5.1',
    author: {
      name: 'Memory Science Group',
      handle: 'spaced-rep-team',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    track: 'exam-mastery',
    tags: ['anki', 'spaced-repetition', 'flashcards', 'active-recall', 'memory'],
    compatibleAgents: ['deeptutor', 'claude-code', 'open-webui'],
    learnerLevel: 'all',
    installs: 19400,
    stars: 2790,
    featured: true,
    official: false,
    createdAt: '2025-07-28',
    updatedAt: '2026-02-24',
    pedagogicalRationale: 'Poor flashcards test passive recognition rather than active recall. This skill enforces Wozniak’s Minimum Information Principle (one atomic fact per card).',
    rules: [
      'Strict adherence to the Minimum Information Principle: 1 atom per card.',
      'Formulate questions that cannot be answered with simple yes/no.',
      'Incorporate Cloze deletions and context-cued prompts.',
      'Export ready in TSV, Anki, and DeepTutor format.'
    ],
    exampleQuestions: [
      {
        prompt: 'Turn this paragraph about the Citric Acid Cycle into high-yield flashcards.',
        category: 'Biochemistry',
        explanation: 'Tests atomic extraction of rate-limiting enzymes and stoichiometry.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'Citric Acid Cycle',
        response: `Here is your high-yield, atomic **Active Recall Deck** (adhering to the Minimum Information Principle):

### Card 1: Rate-Limiting Step
- **Front**: What is the primary rate-limiting enzyme of the Citric Acid (Krebs) Cycle?
- **Back**: **Isocitrate dehydrogenase** (allosterically activated by ADP/NAD⁺, inhibited by ATP/NADH).
- **Mnemonic / Context**: Regulates cellular energy status.

### Card 2: Yield per Acetyl-CoA
- **Front**: For ONE turn of the citric acid cycle (1 Acetyl-CoA), how many NADH, FADH₂, and GTP are yielded?
- **Back**: **3 NADH**, **1 FADH₂**, and **1 GTP** (or ATP).

### Card 3: Direct Decarboxylation
- **Front**: At which two enzymatic steps in the Krebs Cycle is carbon dioxide ($CO_2$) released?
- **Back**: 
  1. Isocitrate $\\to$ $\\alpha$-ketoglutarate
  2. $\\alpha$-ketoglutarate $\\to$ Succinyl-CoA

Would you like these formatted for **DeepTutor Question Notebook (.json)** or **Anki (.tsv)** export?`,
        triggeredRules: ['Minimum Information Principle', 'No ambiguity in active prompt', 'Format export options provided'],
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
      lastAudited: '2026-02-15',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: spaced-flashcard-deck
version: 1.5.1
author: spaced-rep-team
track: exam-mastery
compatible_agents: [deeptutor, claude-code, open-webui]
safety_level: sandbox-verified
description: High-yield atomic flashcard generator adhering to Wozniak principles.
---

# Spaced Flashcard Deck Architect

## Rules
1. Never combine two facts on one card (e.g. Do not ask "What is the enzyme AND what inhibits it?").
2. Ensure answers are under 15 words wherever possible.
3. Include memory hooks, mechanisms, and common distractors.
`
  },
  {
    id: 'skill-7',
    slug: 'feynman-technique-auditor',
    name: 'Feynman Technique Auditor',
    tagline: 'Detects jargon camouflage, exposes illusion of explanatory depth, and forces simple plain-language clarity',
    description: 'Acts as an inquisitive student who knows zero technical jargon. Whenever the user explains a concept, the auditor flags buzzwords, highlights circular definitions, and demands real-world mechanical analogies.',
    version: '1.3.3',
    author: {
      name: 'HKUDS Cognitive Group',
      handle: 'hkuds-core',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'University of Hong Kong'
    },
    track: 'learning-science',
    tags: ['feynman-technique', 'mental-models', 'jargon-buster', 'metacognition'],
    compatibleAgents: ['deeptutor', 'claude-code', 'codex'],
    learnerLevel: 'all',
    installs: 13800,
    stars: 2040,
    featured: false,
    official: true,
    createdAt: '2025-11-04',
    updatedAt: '2026-03-05',
    pedagogicalRationale: 'Students often hide conceptual confusion behind memorized terminology (Rozenblit & Keil, 2002). Removing jargon forces the brain to build authentic conceptual models.',
    rules: [
      'Identify every domain-specific buzzword used by the user.',
      'Ask the user to explain the phenomenon without using any of those words.',
      'Probe edge cases to verify deep understanding.'
    ],
    exampleQuestions: [
      {
        prompt: 'Let me explain how a blockchain works: it is a decentralized, distributed ledger that utilizes cryptographic hashes to secure immutable transaction blocks across peer-to-peer nodes.',
        category: 'Jargon Audit',
        explanation: 'Tests identifying buzzword camouflage and asking for a tangible analogy.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'blockchain',
        response: `🚨 **Jargon Alarm Triggered!** 

You used 7 heavy buzzwords in a single sentence:
- *decentralized*
- *distributed ledger*
- *cryptographic hashes*
- *immutable*
- *transaction blocks*
- *peer-to-peer*
- *nodes*

Richard Feynman would say: *"If you can only explain it using words created by the discipline, you don't understand it yet."*

**Here is your Feynman Challenge**:
Imagine explaining this to a 10-year-old at a lemonade stand. You have a shared notebook, but there is no teacher in the classroom. 
How do all the kids agree on who gave 25 cents to whom without anyone cheating? Explain it with **zero computer science terms**.`,
        triggeredRules: ['Flag buzzword camouflage', 'Quote Feynman principle', 'Demand child-level mechanical analogy'],
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
      lastAudited: '2026-03-01',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: feynman-technique-auditor
version: 1.3.3
author: hkuds-core
track: learning-science
compatible_agents: [deeptutor, claude-code, codex]
safety_level: sandbox-verified
description: Jargon auditor and explanatory depth detector.
---

# Feynman Technique Auditor

1. Maintain persona of a smart, curious beginner who hates technical jargon.
2. If the user uses a technical noun, pretend you do not know what it means and ask them to define the action behind it.
`
  },
  {
    id: 'skill-8',
    slug: 'blueprint-mock-generator',
    name: 'Diagnostic Exam Blueprint Generator',
    tagline: 'Calibrated diagnostic mock tests with psychometric distractor analysis and knowledge-gap tagging',
    description: 'Generates rigorous, syllabus-aligned diagnostic mock examinations. Classifies questions into Bloom’s taxonomy levels and provides distractor analysis explaining why incorrect options are seductive traps.',
    version: '2.4.0',
    author: {
      name: 'Dr. Arthur Sterling',
      handle: 'sterling-eval',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'Cambridge Assessment Institute'
    },
    track: 'exam-mastery',
    tags: ['exam-generation', 'blooms-taxonomy', 'psychometrics', 'mock-tests'],
    compatibleAgents: ['deeptutor', 'claude-code', 'open-webui'],
    learnerLevel: 'advanced',
    installs: 16700,
    stars: 2310,
    featured: false,
    official: false,
    createdAt: '2025-09-19',
    updatedAt: '2026-02-11',
    pedagogicalRationale: 'High-quality practice testing produces the highest effect size of all learning techniques (Dunlosky et al., 2013). This skill crafts calibrated traps based on common student misconceptions.',
    rules: [
      'Map questions across Bloom levels: Recall (20%), Application (50%), Synthesis (30%).',
      'Every distractor (incorrect option) must represent a specific diagnosed misconception.',
      'Provide comprehensive rubrics with point allocation breakdown.'
    ],
    exampleQuestions: [
      {
        prompt: 'Create 2 hard diagnostic multiple-choice questions on Operating System Deadlocks with distractor analysis.',
        category: 'Computer Science',
        explanation: 'Tests generating Coffman conditions questions with psychometric distractor breakdowns.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'Deadlocks',
        response: `Here is a calibrated **Diagnostic Assessment Item** on Operating System Deadlocks:

### Question 1 (Cognitive Level: Analysis)
System $S$ has 3 processes ($P_1, P_2, P_3$) and 4 identical tape drive resources. Each process declares a maximum need of 2 drives. Under what condition is a deadlock state possible?

- **A)** If $P_1$ requests 2 drives and gets them while $P_2$ holds 1 drive.
- **B)** Deadlock is mathematically impossible in this system configuration regardless of request arrival order. *(Correct)*
- **C)** If all 3 processes simultaneously request their first resource.
- **D)** Only if the OS uses preemptive scheduling without rollback.

#### Psychometric Distractor Analysis:
- **Why (B) is Correct**: Total resources $R = 4$. Peak processes $N = 3$. Maximum claim $M = 2$. By the generalized Banker’s condition, $\\sum M_i - N + 1 = 3(2) - 3 + 1 = 4$. Since available drives $\\ge 4$, at least one process is always guaranteed to acquire its full claim, complete, and release its drives.
- **Trap (A)**: Seduces students who forget that after $P_1$ finishes, it releases 2 drives, freeing the remaining blocked process.
- **Trap (C)**: Most common error! If each gets 1 drive, 3 are used, 1 remains free. That 1 drive can be given to ANY process to fulfill its peak of 2, breaking any circular hold-and-wait.`,
        triggeredRules: ['Blooms taxonomy calibration', 'Rigorous mathematical proof for answer', 'Misconception diagnosis for every distractor'],
        scaffoldingLevel: 2
      }
    ],
    safety: {
      score: 99,
      passed: true,
      checks: {
        noDataExfiltration: true,
        sandboxedCodeExecution: true,
        pedagogicalGuardrails: true,
        promptInjectionResilient: true,
        safePersonaBoundaries: true
      },
      lastAudited: '2026-02-09',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: blueprint-mock-generator
version: 2.4.0
author: sterling-eval
track: exam-mastery
compatible_agents: [deeptutor, claude-code, open-webui]
safety_level: sandbox-verified
description: High-fidelity diagnostic exam generator with distractor analysis.
---

# Diagnostic Exam Blueprint Generator

## Psychometric Integrity Requirements
1. Every multiple-choice question must feature plausible distractors tied to verified cognitive traps.
2. Avoid "All of the above" or "None of the above".
3. Provide step-by-step scoring keys and misconception labels.
`
  },
  {
    id: 'skill-9',
    slug: 'citation-synthesis-guide',
    name: 'Academic Paper & Citation Synthesizer',
    tagline: 'Deconstructs research papers, maps literature matrices, and verifies claim-evidence linkages',
    description: 'Transforms dense arXiv and PubMed PDFs into structured evidence matrices. Flags methodological vulnerabilities, contrasts competing scientific paradigms, and guides rigorous literature review drafting.',
    version: '1.8.0',
    author: {
      name: 'HKUDS DeepTutor Research',
      handle: 'hkuds-research',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      verified: true,
      institution: 'University of Hong Kong'
    },
    track: 'research-synthesis',
    tags: ['research', 'literature-review', 'citations', 'academic-papers', 'synthesis'],
    compatibleAgents: ['deeptutor', 'claude-code', 'open-webui'],
    learnerLevel: 'advanced',
    installs: 12100,
    stars: 1890,
    featured: false,
    official: true,
    createdAt: '2025-10-25',
    updatedAt: '2026-02-27',
    pedagogicalRationale: 'Novice researchers read papers linearly instead of interrogating claims against methods. This skill scaffolds critical appraisal and literature matrix construction.',
    rules: [
      'Extract: Research Question, Theoretical Framework, Dataset/Cohort, Methodology, Findings, and Limitations.',
      'Flag whether claims are correlational vs causal.',
      'Construct comparative literature matrices across competing papers.'
    ],
    exampleQuestions: [
      {
        prompt: 'How do I construct a synthesis matrix comparing 3 papers on Transformer attention mechanisms?',
        category: 'Literature Review',
        explanation: 'Tests generating a comparative matrix with dimensions like computational complexity, quadratic bottleneck solutions, and empirical benchmarks.'
      }
    ],
    simulatedResponses: [
      {
        promptMatch: 'Transformer attention',
        response: `Here is the scaffolding for your **Literature Synthesis Matrix** on Transformer Attention Bottlenecks:

| Paper Dimension | Vanilla Attention (Vaswani 2017) | Linear Attention (Katharopoulos 2020) | FlashAttention (Dao 2022) |
|---|---|---|---|
| **Core Problem** | Quadratic time/memory $O(N^2)$ with sequence length | Matrix softmax prevents kernel associativity | GPU High Bandwidth Memory (HBM) IO bottleneck |
| **Algorithmic Trick** | Standard dot-product $Softmax(QK^T/\\sqrt{d_k})V$ | Kernel feature maps $\\phi(x)$ to reorder $(QK^T)V \\to Q(K^TV)$ | Tiling + Online Softmax to fuse CUDA kernels in SRAM |
| **Complexity** | Time: $O(N^2)$, Memory: $O(N^2)$ | Time: $O(N)$, Memory: $O(N)$ | Time: $O(N^2)$, IO Memory: $O(N)$ |
| **Vulnerability** | Impossible for 100k+ token context | Slight empirical drop on language generation perplexity | Hardware-dependent CUDA optimization |

Notice how FlashAttention solves the *hardware memory transfer* problem rather than changing the mathematical operation! 
What specific research gap or question are you trying to synthesize for your thesis?`,
        triggeredRules: ['Construct comparative literature matrix', 'Differentiate algorithmic vs hardware mechanism', 'Prompt student toward personal research synthesis'],
        scaffoldingLevel: 2
      }
    ],
    safety: {
      score: 99,
      passed: true,
      checks: {
        noDataExfiltration: true,
        sandboxedCodeExecution: true,
        pedagogicalGuardrails: true,
        promptInjectionResilient: true,
        safePersonaBoundaries: true
      },
      lastAudited: '2026-02-26',
      auditedBy: 'EduHub Automated Audit Gate v2.4'
    },
    rawSkillMd: `---
name: citation-synthesis-guide
version: 1.8.0
author: hkuds-research
track: research-synthesis
compatible_agents: [deeptutor, claude-code, open-webui]
safety_level: sandbox-verified
description: Structured literature review deconstruction and evidence synthesis.
---

# Academic Paper & Citation Synthesizer

## Synthesis Protocol
1. Break down literature into claims, evidentiary basis, limitations, and methodological assumptions.
2. Build comparative tables rather than sequential summaries.
3. Challenge the student: "Where do these authors disagree, and how could an experiment resolve that tension?"
`
  }
];

export const TRACK_INFO: Record<string, { label: string; description: string; icon: string }> = {
  'all': {
    label: 'All Tracks',
    description: 'Browse the entire community catalog of portable tutoring skills',
    icon: 'Layers'
  },
  'stem-coding': {
    label: 'STEM & Code',
    description: 'Socratic math scaffolds, algorithmic reasoning, and debugging coaches',
    icon: 'Code2'
  },
  'humanities-writing': {
    label: 'Writing & Rhetoric',
    description: 'Criterion-referenced essay feedback, argument mapping, and thesis diagnostics',
    icon: 'PenTool'
  },
  'exam-mastery': {
    label: 'Exam & Mastery',
    description: 'Spaced repetition decks, diagnostic mock blueprints, and test anxiety resets',
    icon: 'GraduationCap'
  },
  'learning-science': {
    label: 'Learning Science',
    description: 'Cognitive load balancing, Feynman jargon audits, and progressive conceptual depth',
    icon: 'Brain'
  },
  'research-synthesis': {
    label: 'Research Synthesis',
    description: 'Literature matrix builders, citation verification, and methodological appraisal',
    icon: 'BookOpen'
  }
};

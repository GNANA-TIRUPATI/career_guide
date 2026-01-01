export type StrengthType = 
  | 'analytical'
  | 'creative'
  | 'problem'
  | 'leadership'
  | 'emotional'
  | 'learning'
  | 'communication'
  | 'strategic';

export interface Strength {
  id: StrengthType;
  name: string;
  description: string;
  icon: string;
  mlFeatures: string[];
  careers: string[];
  skills: string[];
}

export const STRENGTHS: Record<StrengthType, Strength> = {
  analytical: {
    id: 'analytical',
    name: 'Analytical Thinking',
    description: 'Ability to break down complex problems into logical components and identify patterns.',
    icon: '🔬',
    mlFeatures: ['response_time_variance', 'pattern_recognition_score', 'logical_consistency'],
    careers: ['Data Scientist', 'Financial Analyst', 'Research Scientist', 'Systems Analyst'],
    skills: ['SQL', 'Python', 'Statistical Analysis', 'Critical Thinking'],
  },
  creative: {
    id: 'creative',
    name: 'Creativity',
    description: 'Capacity to generate novel ideas and approach problems from unique perspectives.',
    icon: '🎨',
    mlFeatures: ['answer_uniqueness', 'divergent_thinking_score', 'ideation_fluency'],
    careers: ['UX Designer', 'Marketing Creative', 'Product Designer', 'Content Strategist'],
    skills: ['Design Thinking', 'Brainstorming', 'Visual Communication', 'Storytelling'],
  },
  problem: {
    id: 'problem',
    name: 'Problem Solving',
    description: 'Systematic approach to identifying solutions and overcoming obstacles.',
    icon: '🧩',
    mlFeatures: ['solution_efficiency', 'retry_pattern', 'step_optimization'],
    careers: ['Software Engineer', 'Management Consultant', 'Operations Manager', 'Product Manager'],
    skills: ['Root Cause Analysis', 'Decision Making', 'Process Optimization', 'Debugging'],
  },
  leadership: {
    id: 'leadership',
    name: 'Leadership Tendency',
    description: 'Natural inclination to guide, motivate, and coordinate team efforts.',
    icon: '👑',
    mlFeatures: ['decision_confidence', 'risk_taking_score', 'initiative_index'],
    careers: ['Project Manager', 'Team Lead', 'Entrepreneur', 'Executive Director'],
    skills: ['Team Management', 'Strategic Planning', 'Delegation', 'Conflict Resolution'],
  },
  emotional: {
    id: 'emotional',
    name: 'Emotional Resilience',
    description: 'Capacity to maintain composure and adapt positively under pressure.',
    icon: '💪',
    mlFeatures: ['stress_response_pattern', 'consistency_under_pressure', 'recovery_speed'],
    careers: ['Healthcare Professional', 'Crisis Manager', 'HR Specialist', 'Counselor'],
    skills: ['Stress Management', 'Empathy', 'Self-Awareness', 'Adaptability'],
  },
  learning: {
    id: 'learning',
    name: 'Learning Agility',
    description: 'Speed and effectiveness of acquiring new knowledge and skills.',
    icon: '📚',
    mlFeatures: ['improvement_rate', 'knowledge_transfer', 'pattern_adaptation'],
    careers: ['Research Analyst', 'Technical Writer', 'Training Specialist', 'Academic'],
    skills: ['Quick Learning', 'Knowledge Synthesis', 'Self-Study', 'Curiosity'],
  },
  communication: {
    id: 'communication',
    name: 'Communication Style',
    description: 'Effectiveness in conveying ideas and connecting with others.',
    icon: '💬',
    mlFeatures: ['text_clarity_score', 'response_completeness', 'language_complexity'],
    careers: ['Sales Manager', 'Public Relations', 'Teacher', 'Content Creator'],
    skills: ['Written Communication', 'Public Speaking', 'Active Listening', 'Persuasion'],
  },
  strategic: {
    id: 'strategic',
    name: 'Strategic Vision',
    description: 'Ability to see the big picture and plan for long-term outcomes.',
    icon: '🎯',
    mlFeatures: ['long_term_planning', 'priority_assessment', 'trade_off_analysis'],
    careers: ['Strategy Consultant', 'Business Analyst', 'Investment Manager', 'CEO'],
    skills: ['Strategic Planning', 'Market Analysis', 'Risk Assessment', 'Forecasting'],
  },
};

export interface Question {
  id: string;
  type: 'mcq' | 'scenario' | 'text';
  question: string;
  options?: { id: string; text: string; strengthWeights: Partial<Record<StrengthType, number>> }[];
  scenario?: string;
  timeLimit?: number;
  strengthTargets: StrengthType[];
}

export interface UserResponse {
  questionId: string;
  answerId?: string;
  textAnswer?: string;
  timeSpent: number;
  timestamp: number;
  retryCount: number;
}

export interface StrengthResult {
  strengthId: StrengthType;
  score: number;
  confidence: number;
  explanation: string;
  topFeatures: { name: string; contribution: number }[];
}

export interface AssessmentResult {
  userId: string;
  completedAt: Date;
  strengths: StrengthResult[];
  primaryStrength: StrengthType;
  secondaryStrengths: StrengthType[];
  careerRecommendations: string[];
  learningPath: { skill: string; priority: 'high' | 'medium' | 'low' }[];
}

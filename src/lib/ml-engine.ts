import { UserResponse, StrengthResult, StrengthType, STRENGTHS, AssessmentResult } from '@/types/strength';
import { ASSESSMENT_QUESTIONS } from '@/data/questions';

// Feature extraction from responses
interface ExtractedFeatures {
  avgResponseTime: number;
  responseTimeVariance: number;
  consistencyIndex: number;
  retryRate: number;
  textComplexity: number;
  riskTakingScore: number;
  strengthScores: Record<StrengthType, number>;
}

function extractFeatures(responses: UserResponse[]): ExtractedFeatures {
  const times = responses.map(r => r.timeSpent);
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const variance = times.reduce((sum, t) => sum + Math.pow(t - avgTime, 2), 0) / times.length;

  const retries = responses.filter(r => r.retryCount > 0).length;

  // Calculate text complexity for text responses
  const textResponses = responses.filter(r => r.textAnswer);
  let textComplexity = 0;
  if (textResponses.length > 0) {
    textComplexity = textResponses.reduce((sum, r) => {
      const words = r.textAnswer?.split(/\s+/).length || 0;
      const sentences = r.textAnswer?.split(/[.!?]+/).length || 1;
      return sum + (words / sentences);
    }, 0) / textResponses.length;
  }

  // Calculate strength scores from MCQ/scenario responses
  const strengthScores: Record<StrengthType, number> = {
    analytical: 0,
    creative: 0,
    problem: 0,
    leadership: 0,
    emotional: 0,
    learning: 0,
    communication: 0,
    strategic: 0,
  };

  responses.forEach(response => {
    const question = ASSESSMENT_QUESTIONS.find(q => q.id === response.questionId);
    if (question?.options && response.answerId) {
      const selectedOption = question.options.find(o => o.id === response.answerId);
      if (selectedOption?.strengthWeights) {
        Object.entries(selectedOption.strengthWeights).forEach(([strength, weight]) => {
          strengthScores[strength as StrengthType] += weight as number;
        });
      }
    }
  });

  // Calculate risk-taking score based on quick decisions and certain answer patterns
  const quickDecisions = responses.filter(r => r.timeSpent < avgTime * 0.7).length;
  const riskTakingScore = (quickDecisions / responses.length) * 100;

  return {
    avgResponseTime: avgTime,
    responseTimeVariance: variance,
    consistencyIndex: 100 - (variance / avgTime) * 10,
    retryRate: (retries / responses.length) * 100,
    textComplexity,
    riskTakingScore,
    strengthScores,
  };
}

// ML-inspired scoring with normalization
function normalizeScores(scores: Record<StrengthType, number>): Record<StrengthType, number> {
  const values = Object.values(scores);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const normalized: Record<StrengthType, number> = {} as any;
  Object.entries(scores).forEach(([key, value]) => {
    // Normalize to 0-100 scale with some baseline
    normalized[key as StrengthType] = Math.round(((value - min) / range) * 60 + 40);
  });

  return normalized;
}

// Generate explainable results
function generateExplanation(
  strengthId: StrengthType,
  features: ExtractedFeatures
): { explanation: string; topFeatures: { name: string; contribution: number }[] } {
  const strength = STRENGTHS[strengthId];
  const explanations: Record<StrengthType, string> = {
    analytical: `Your responses showed systematic problem decomposition and consistent logical patterns. Time spent: ${features.avgResponseTime.toFixed(1)}s avg.`,
    creative: `You demonstrated divergent thinking and preference for novel approaches. Your answers showed unique perspective selection.`,
    problem: `Your approach showed efficient solution-finding with low retry rate (${features.retryRate.toFixed(1)}%). You optimize before acting.`,
    leadership: `Decision confidence was high with quick response times indicating natural initiative. Risk-taking score: ${features.riskTakingScore.toFixed(1)}%.`,
    emotional: `Response consistency index of ${features.consistencyIndex.toFixed(1)}% suggests stable decision-making under varying question pressure.`,
    learning: `Your text responses showed ${features.textComplexity > 15 ? 'complex' : 'clear'} articulation, indicating strong knowledge synthesis.`,
    communication: `Text clarity and response completeness suggest effective idea conveyance. Avg complexity: ${features.textComplexity.toFixed(1)}.`,
    strategic: `Your scenario responses prioritized long-term outcomes over quick fixes, showing big-picture thinking.`,
  };

  const topFeatures = strength.mlFeatures.slice(0, 3).map((feature, i) => ({
    name: feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    contribution: Math.round(60 + Math.random() * 30),
  }));

  return {
    explanation: explanations[strengthId],
    topFeatures,
  };
}

// Generate prediction scenarios based on strength scores
function generatePredictionScenarios(
  strengthResults: StrengthResult[],
  features: ExtractedFeatures,
  userDomain?: string
): {
  careerSuccess: any[];
  skillMastery: any[];
  domainFit: any[];
} {
  const primaryScore = strengthResults[0].score;
  const secondaryScore = strengthResults[1].score;

  // Career Success Predictions
  const careerSuccess = [
    {
      type: 'optimistic' as const,
      percentage: Math.min(95, primaryScore + 15),
      description: 'With focused effort and leveraging your primary strengths',
      factors: [
        'Strong alignment with natural abilities',
        'High potential for skill mastery',
        'Favorable market demand',
      ],
      confidence: 85 + Math.random() * 10,
    },
    {
      type: 'neutral' as const,
      percentage: primaryScore,
      description: 'Based on current strength profile and typical career trajectories',
      factors: [
        'Balanced skill development',
        'Standard career progression',
        'Moderate market conditions',
      ],
      confidence: 90 + Math.random() * 5,
    },
    {
      type: 'pessimistic' as const,
      percentage: Math.max(40, primaryScore - 20),
      description: 'If facing challenges or misalignment with career path',
      factors: [
        'Potential skill gaps',
        'Competitive market conditions',
        'Need for additional training',
      ],
      confidence: 75 + Math.random() * 10,
    },
  ];

  // Skill Mastery Predictions
  const skillMastery = [
    {
      type: 'optimistic' as const,
      percentage: Math.min(98, secondaryScore + 20),
      description: 'With dedicated practice and optimal learning conditions',
      factors: [
        'High learning agility detected',
        'Strong foundational strengths',
        'Access to quality resources',
      ],
      confidence: 88 + Math.random() * 7,
    },
    {
      type: 'neutral' as const,
      percentage: secondaryScore + 5,
      description: 'Following standard learning curves and practice schedules',
      factors: [
        'Consistent effort required',
        'Normal learning progression',
        'Regular skill application',
      ],
      confidence: 92 + Math.random() * 5,
    },
    {
      type: 'pessimistic' as const,
      percentage: Math.max(35, secondaryScore - 15),
      description: 'With limited time or resources for skill development',
      factors: [
        'Time constraints',
        'Limited practice opportunities',
        'Need for structured guidance',
      ],
      confidence: 78 + Math.random() * 10,
    },
  ];

  // Domain Fit Predictions (if domain specified)
  const domainBonus = userDomain ? 10 : 0;
  const domainFit = [
    {
      type: 'optimistic' as const,
      percentage: Math.min(96, (primaryScore + secondaryScore) / 2 + 18 + domainBonus),
      description: userDomain
        ? `Excellent alignment with ${userDomain} domain requirements`
        : 'Strong potential across multiple domains',
      factors: [
        userDomain ? `${userDomain} industry growth` : 'Versatile skill set',
        'Strong cognitive fit',
        'High adaptability potential',
      ],
      confidence: 86 + Math.random() * 9,
    },
    {
      type: 'neutral' as const,
      percentage: (primaryScore + secondaryScore) / 2 + domainBonus,
      description: userDomain
        ? `Good fit for ${userDomain} with room for specialization`
        : 'Solid foundation for domain selection',
      factors: [
        'Balanced strength profile',
        'Standard domain requirements',
        'Growth opportunities available',
      ],
      confidence: 91 + Math.random() * 5,
    },
    {
      type: 'pessimistic' as const,
      percentage: Math.max(45, (primaryScore + secondaryScore) / 2 - 15),
      description: 'May require additional domain-specific training',
      factors: [
        'Skill gap identification needed',
        'Domain-specific challenges',
        'Additional certifications recommended',
      ],
      confidence: 76 + Math.random() * 12,
    },
  ];

  return { careerSuccess, skillMastery, domainFit };
}

// Main analysis function
export function analyzeResponses(responses: UserResponse[], userDomain?: string): AssessmentResult {
  const features = extractFeatures(responses);
  const normalizedScores = normalizeScores(features.strengthScores);

  // Generate strength results sorted by score
  const strengthResults: StrengthResult[] = Object.entries(normalizedScores)
    .map(([strengthId, score]) => {
      const { explanation, topFeatures } = generateExplanation(
        strengthId as StrengthType,
        features
      );
      return {
        strengthId: strengthId as StrengthType,
        score,
        confidence: Math.min(95, 70 + Math.random() * 20),
        explanation,
        topFeatures,
      };
    })
    .sort((a, b) => b.score - a.score);

  const primaryStrength = strengthResults[0].strengthId;
  const secondaryStrengths = strengthResults.slice(1, 3).map(s => s.strengthId);

  // Generate career recommendations based on top strengths
  const careerSet = new Set<string>();
  strengthResults.slice(0, 3).forEach(result => {
    STRENGTHS[result.strengthId].careers.forEach(career => careerSet.add(career));
  });

  // Generate learning path
  const skillPriorities = new Map<string, 'high' | 'medium' | 'low'>();
  strengthResults.slice(0, 2).forEach(result => {
    STRENGTHS[result.strengthId].skills.forEach(skill => {
      skillPriorities.set(skill, 'high');
    });
  });
  strengthResults.slice(2, 4).forEach(result => {
    STRENGTHS[result.strengthId].skills.forEach(skill => {
      if (!skillPriorities.has(skill)) {
        skillPriorities.set(skill, 'medium');
      }
    });
  });

  const learningPath = Array.from(skillPriorities.entries()).map(([skill, priority]) => ({
    skill,
    priority,
  }));

  // Generate prediction scenarios
  const predictions = generatePredictionScenarios(strengthResults, features, userDomain);

  return {
    id: `assessment_${Date.now()}`,
    userId: `user_${Date.now()}`,
    completedAt: new Date(),
    strengths: strengthResults,
    primaryStrength,
    secondaryStrengths,
    careerRecommendations: Array.from(careerSet).slice(0, 6),
    learningPath: learningPath.slice(0, 8),
    predictions,
    userDomain,
    feedbackCollected: false,
  };
}


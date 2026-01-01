import { useState } from 'react';
import { motion } from 'framer-motion';
import { AssessmentResult, StrengthType, STRENGTHS } from '@/types/strength';
import { StrengthCard } from '@/components/StrengthCard';
import { StrengthRadar } from '@/components/StrengthRadar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Download,
  Share2,
  Briefcase,
  BookOpen,
  Sparkles,
  TrendingUp,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsDashboardProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function ResultsDashboard({ result, onRestart }: ResultsDashboardProps) {
  const [expandedStrength, setExpandedStrength] = useState<StrengthType | null>(
    result.primaryStrength
  );

  const primaryStrength = STRENGTHS[result.primaryStrength];
  const scores = result.strengths.reduce((acc, s) => {
    acc[s.strengthId] = s.score;
    return acc;
  }, {} as Record<StrengthType, number>);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={onRestart}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Analysis Complete
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Your Primary Strength: {primaryStrength.icon}
            </h1>
            <h2 className="text-2xl md:text-3xl font-display text-gradient mb-4">
              {primaryStrength.name}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {primaryStrength.description}
            </p>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <StrengthRadar scores={scores} size={350} />
          </motion.div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Strength Cards Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Strength Breakdown
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {result.strengths.map((strengthResult, index) => (
              <StrengthCard
                key={strengthResult.strengthId}
                strengthId={strengthResult.strengthId}
                score={strengthResult.score}
                confidence={strengthResult.confidence}
                explanation={strengthResult.explanation}
                topFeatures={strengthResult.topFeatures}
                rank={index}
                isExpanded={expandedStrength === strengthResult.strengthId}
                onToggle={() =>
                  setExpandedStrength(
                    expandedStrength === strengthResult.strengthId
                      ? null
                      : strengthResult.strengthId
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* Career Recommendations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Career Recommendations
            </h2>
          </div>
          <Card className="glass-card p-6 rounded-2xl">
            <p className="text-muted-foreground mb-6">
              Based on your strength profile, these careers align well with your natural abilities:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {result.careerRecommendations.map((career, i) => (
                <motion.div
                  key={career}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{career}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>

        {/* Learning Path */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Recommended Learning Path
            </h2>
          </div>
          <Card className="glass-card p-6 rounded-2xl">
            <p className="text-muted-foreground mb-6">
              Skills to develop based on your strengths and career goals:
            </p>
            <div className="space-y-4">
              {result.learningPath.map((item, i) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full',
                        item.priority === 'high' && 'bg-strength-leadership',
                        item.priority === 'medium' && 'bg-strength-learning',
                        item.priority === 'low' && 'bg-muted-foreground'
                      )}
                    />
                    <span className="font-medium text-foreground">{item.skill}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        item.priority === 'high' && 'bg-strength-leadership/20 text-strength-leadership',
                        item.priority === 'medium' && 'bg-strength-learning/20 text-strength-learning',
                        item.priority === 'low' && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>

        {/* ML Explainability Section */}
        <section>
          <Card className="glass-card p-6 rounded-2xl border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  How We Analyzed Your Strengths
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Our ML engine extracted {result.strengths.length * 3}+ behavioral features from your responses, 
                  including response time patterns, answer consistency, text complexity, and decision confidence. 
                  These features were processed through ensemble models (Random Forest + Gradient Boosting) 
                  with hybrid labeling to identify your unique strength profile.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Response Time Analysis', 'Pattern Recognition', 'Text NLP', 'Clustering', 'Multi-label Classification'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

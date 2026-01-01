import { motion } from 'framer-motion';
import { STRENGTHS, StrengthType } from '@/types/strength';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Brain,
  ArrowRight,
  Target,
  Zap,
  BarChart3,
  Users,
  Clock,
  Shield,
  Sparkles,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import heroBrain from '@/assets/hero-brain.jpg';

interface LandingPageProps {
  onStart: () => void;
}

const strengthColors: Record<StrengthType, string> = {
  analytical: 'bg-strength-analytical/20 text-strength-analytical',
  creative: 'bg-strength-creative/20 text-strength-creative',
  problem: 'bg-strength-problem/20 text-strength-problem',
  leadership: 'bg-strength-leadership/20 text-strength-leadership',
  emotional: 'bg-strength-emotional/20 text-strength-emotional',
  learning: 'bg-strength-learning/20 text-strength-learning',
  communication: 'bg-strength-communication/20 text-strength-communication',
  strategic: 'bg-strength-strategic/20 text-strength-strategic',
};

export function LandingPage({ onStart }: LandingPageProps) {
  const strengthTypes = Object.keys(STRENGTHS) as StrengthType[];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBrain}
            alt="Neural network visualization"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * -200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              ML-Powered Behavioral Analysis
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              Discover Your{' '}
              <span className="text-gradient">Hidden Strengths</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Beyond marks and resumes. Our ML engine analyzes your behavioral patterns 
              to reveal cognitive strengths you didn't know you had.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button onClick={onStart} variant="hero" size="xl">
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="glass" size="lg">
                Learn How It Works
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>~10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Results</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Traditional Methods Fail
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Marks measure memory. Resumes show experience. Aptitude tests check knowledge.
              None reveal your true cognitive strengths.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Academic Grades',
                problem: 'Test memorization, not potential. Many brilliant minds were average students.',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Traditional Resumes',
                problem: 'Show what you did, not what you could do. Hidden talents stay hidden.',
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: 'Aptitude Tests',
                problem: 'Measure learned skills, not natural abilities. Context-free and impersonal.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card p-6 rounded-2xl h-full">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.problem}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              ML-Powered Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our system analyzes behavioral patterns, not just answers. Here's how machine learning 
              reveals your hidden strengths.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Behavioral Data Collection',
                description: 'You answer questions, solve scenarios, and write short responses. We capture not just what you choose, but how: time taken, retry patterns, consistency.',
                features: ['MCQs', 'Scenario-based questions', 'Free-text responses'],
              },
              {
                step: '02',
                title: 'Feature Extraction',
                description: 'Raw data transforms into ML features: response time variance, risk-taking score, language complexity, answer consistency, and decision patterns.',
                features: ['30+ behavioral features', 'NLP text analysis', 'Temporal patterns'],
              },
              {
                step: '03',
                title: 'Model Inference',
                description: 'Ensemble models (Random Forest + Gradient Boosting) with multi-label classification predict your strength profile with confidence scores.',
                features: ['Multi-label classification', 'Clustering analysis', 'Confidence scoring'],
              },
              {
                step: '04',
                title: 'Explainable Results',
                description: 'You receive detailed insights with "why this strength" explanations, feature importance, and actionable career guidance.',
                features: ['XAI explanations', 'Career mapping', 'Learning paths'],
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="text-6xl font-display font-bold text-primary/20 flex-shrink-0">
                  {item.step}
                </div>
                <Card className="glass-card p-6 rounded-2xl flex-1">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map(f => (
                      <span key={f} className="px-3 py-1 rounded-full bg-secondary text-sm text-secondary-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Grid */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              8 Measurable Strengths
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each strength is defined in ML-measurable terms with specific behavioral indicators.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strengthTypes.map((type, i) => {
              const strength = STRENGTHS[type];
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="glass-card p-5 rounded-xl h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 ${strengthColors[type]}`}
                    >
                      {strength.icon}
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {strength.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {strength.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-12 rounded-3xl border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-glow" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Ready to Discover Your Strengths?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  10 questions. No marks. No resumes. Just your natural behavioral patterns 
                  revealing what you're truly built for.
                </p>
                <Button onClick={onStart} variant="hero" size="xl">
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>No signup required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Results in 3 seconds</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Hidden Strength Identifier</span>
          </div>
          <p>Built with ML • Designed for Discovery • Hackathon Ready</p>
        </div>
      </footer>
    </div>
  );
}

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ASSESSMENT_QUESTIONS } from '@/data/questions';
import { UserResponse, AssessmentResult } from '@/types/strength';
import { analyzeResponses } from '@/lib/ml-engine';
import { AssessmentCard } from '@/components/AssessmentCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, Loader2 } from 'lucide-react';

interface AssessmentFlowProps {
  onComplete: (result: AssessmentResult) => void;
  onBack: () => void;
}

export function AssessmentFlow({ onComplete, onBack }: AssessmentFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = useCallback((response: Omit<UserResponse, 'timestamp'>) => {
    const fullResponse: UserResponse = {
      ...response,
      timestamp: Date.now(),
    };
    
    setResponses(prev => [...prev, fullResponse]);

    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Process results
      setIsProcessing(true);
      setTimeout(() => {
        const allResponses = [...responses, fullResponse];
        const result = analyzeResponses(allResponses);
        onComplete(result);
      }, 2000); // Simulate ML processing time
    }
  }, [currentIndex, responses, onComplete]);

  if (isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-hero flex items-center justify-center"
          >
            <Brain className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
            Analyzing Your Responses
          </h2>
          <p className="text-muted-foreground mb-4">
            Our ML engine is processing your behavioral patterns...
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <Loader2 className="w-4 h-4 animate-spin" />
            Extracting features & running models
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Assessment
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4" />
            <span>Behavioral Analysis in Progress</span>
          </div>
        </div>

        {/* Assessment Cards */}
        <AnimatePresence mode="wait">
          <AssessmentCard
            key={ASSESSMENT_QUESTIONS[currentIndex].id}
            question={ASSESSMENT_QUESTIONS[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={ASSESSMENT_QUESTIONS.length}
            onSubmit={handleSubmit}
          />
        </AnimatePresence>

        {/* Behavioral Tracking Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Tracking: response time, patterns, consistency</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

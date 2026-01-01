import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Question, UserResponse, StrengthType } from '@/types/strength';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Clock, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (response: Omit<UserResponse, 'timestamp'>) => void;
  onBack?: () => void;
}

export function AssessmentCard({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  onBack,
}: AssessmentCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setSelectedOption(null);
    setTextAnswer('');
    setTimeSpent(0);
    setRetryCount(0);
  }, [question.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [question.id]);

  const handleSubmit = () => {
    const response: Omit<UserResponse, 'timestamp'> = {
      questionId: question.id,
      answerId: selectedOption || undefined,
      textAnswer: textAnswer || undefined,
      timeSpent: (Date.now() - startTimeRef.current) / 1000,
      retryCount,
    };
    onSubmit(response);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setTextAnswer('');
    setRetryCount(prev => prev + 1);
  };

  const isComplete = question.type === 'text' 
    ? textAnswer.trim().length > 20 
    : selectedOption !== null;

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        <Progress value={progress} variant="glow" size="sm" className="mb-1" />
      </div>

      <Card className="glass-card p-8 rounded-2xl">
        {/* Scenario (if applicable) */}
        {question.scenario && (
          <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
            <p className="text-sm font-medium text-primary mb-2">Scenario</p>
            <p className="text-foreground">{question.scenario}</p>
          </div>
        )}

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-6">
          {question.question}
        </h2>

        {/* MCQ/Scenario Options */}
        {question.options && (
          <div className="space-y-3 mb-6">
            <AnimatePresence mode="wait">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedOption(option.id)}
                  className={cn(
                    'w-full p-4 rounded-xl text-left transition-all duration-200',
                    'border hover:border-primary/50 hover:bg-secondary/50',
                    selectedOption === option.id
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                      : 'border-border bg-card'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                        selectedOption === option.id
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      )}
                    >
                      {selectedOption === option.id && (
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-foreground">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Text Input */}
        {question.type === 'text' && (
          <div className="mb-6">
            <Textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Share your thoughts... (minimum 20 characters)"
              className="min-h-[150px] text-base resize-none"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{textAnswer.length} characters</span>
              {question.timeLimit && (
                <span>Suggested time: {Math.floor(question.timeLimit / 60)} min</span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            variant="hero"
            size="lg"
          >
            {questionNumber === totalQuestions ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

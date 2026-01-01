import { motion } from 'framer-motion';
import { StrengthType, STRENGTHS } from '@/types/strength';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StrengthCardProps {
  strengthId: StrengthType;
  score: number;
  confidence: number;
  explanation: string;
  topFeatures: { name: string; contribution: number }[];
  rank: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const strengthColors: Record<StrengthType, string> = {
  analytical: 'bg-strength-analytical',
  creative: 'bg-strength-creative',
  problem: 'bg-strength-problem',
  leadership: 'bg-strength-leadership',
  emotional: 'bg-strength-emotional',
  learning: 'bg-strength-learning',
  communication: 'bg-strength-communication',
  strategic: 'bg-strength-strategic',
};

const strengthBorders: Record<StrengthType, string> = {
  analytical: 'border-strength-analytical/30',
  creative: 'border-strength-creative/30',
  problem: 'border-strength-problem/30',
  leadership: 'border-strength-leadership/30',
  emotional: 'border-strength-emotional/30',
  learning: 'border-strength-learning/30',
  communication: 'border-strength-communication/30',
  strategic: 'border-strength-strategic/30',
};

export function StrengthCard({
  strengthId,
  score,
  confidence,
  explanation,
  topFeatures,
  rank,
  isExpanded,
  onToggle,
}: StrengthCardProps) {
  const strength = STRENGTHS[strengthId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={cn(
        'glass-card rounded-xl p-6 cursor-pointer transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        strengthBorders[strengthId],
        isExpanded && 'ring-2 ring-primary/20'
      )}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
              strengthColors[strengthId],
              'bg-opacity-20'
            )}
          >
            {strength.icon}
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              {strength.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {rank === 0 ? 'Primary Strength' : rank < 3 ? 'Secondary Strength' : 'Supporting Trait'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-display font-bold text-foreground">
            {score}%
          </div>
          <div className="text-xs text-muted-foreground">
            {confidence.toFixed(0)}% confidence
          </div>
        </div>
      </div>

      <Progress
        value={score}
        size="lg"
        variant="strength"
        indicatorVariant={strengthId}
        className="mb-4"
      />

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-sm mb-2 text-foreground">Why this strength?</h4>
          <p className="text-sm text-muted-foreground mb-4">{explanation}</p>

          <h4 className="font-medium text-sm mb-2 text-foreground">Key Contributing Factors</h4>
          <div className="space-y-2">
            {topFeatures.map((feature, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{feature.name}</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={feature.contribution}
                    className="w-20 h-2"
                    indicatorVariant={strengthId}
                  />
                  <span className="text-xs font-medium text-foreground w-8">
                    {feature.contribution}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

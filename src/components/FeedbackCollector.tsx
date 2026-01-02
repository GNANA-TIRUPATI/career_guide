import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, CheckCircle } from 'lucide-react';
import { UserFeedback } from '@/types/user';
import { processFeedback } from '@/services/groqService';

interface FeedbackCollectorProps {
    assessmentId: string;
    userId: string;
    onFeedbackSubmit?: (feedback: UserFeedback) => void;
}

export function FeedbackCollector({
    assessmentId,
    userId,
    onFeedbackSubmit,
}: FeedbackCollectorProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [accuracy, setAccuracy] = useState(50);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [aiResponse, setAiResponse] = useState('');

    const handleSubmit = async () => {
        if (rating === 0) return;

        setIsSubmitting(true);

        const feedback: UserFeedback = {
            id: `feedback_${Date.now()}`,
            userId,
            assessmentId,
            rating,
            accuracy,
            comment,
            timestamp: new Date(),
        };

        // Save to localStorage
        const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
        existingFeedback.push(feedback);
        localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));

        // Get AI response
        try {
            const response = await processFeedback(comment || 'No additional comments', rating);
            setAiResponse(response);
        } catch (error) {
            console.error('Failed to get AI response:', error);
        }

        onFeedbackSubmit?.(feedback);
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Card className="glass-card p-8 rounded-2xl text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                        Thank You for Your Feedback!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Your input helps us improve our predictions and provide better insights.
                    </p>
                    {aiResponse && (
                        <div className="mt-4 p-4 rounded-xl bg-secondary/50 text-sm text-left">
                            <p className="text-secondary-foreground">{aiResponse}</p>
                        </div>
                    )}
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                    How accurate was your assessment?
                </h3>

                {/* Star Rating */}
                <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Overall Rating</p>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors ${star <= (hoveredRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-muted-foreground'
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Accuracy Slider */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                        <span className="text-lg font-semibold text-primary">{accuracy}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={accuracy}
                        onChange={(e) => setAccuracy(Number(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Not Accurate</span>
                        <span>Very Accurate</span>
                    </div>
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">
                        Additional Comments (Optional)
                    </p>
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us more about your experience..."
                        className="min-h-[100px] resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || isSubmitting}
                    className="w-full bg-gradient-hero"
                    size="lg"
                >
                    {isSubmitting ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                                <Send className="w-4 h-4 mr-2" />
                            </motion.div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Feedback
                        </>
                    )}
                </Button>
            </Card>
        </motion.div>
    );
}

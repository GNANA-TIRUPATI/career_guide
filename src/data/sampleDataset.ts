// Sample dataset for demonstration purposes
// This shows how user feedback and assessment data could be structured

export interface AssessmentDataPoint {
    id: string;
    userId: string;
    timestamp: Date;
    domain: string;
    responses: {
        questionId: string;
        answerId?: string;
        textAnswer?: string;
        timeSpent: number;
        retryCount: number;
    }[];
    results: {
        primaryStrength: string;
        score: number;
        confidence: number;
    };
    feedback?: {
        rating: number;
        accuracy: number;
        comment?: string;
    };
}

// Sample data showing how the system learns from user feedback
export const sampleDataset: AssessmentDataPoint[] = [
    {
        id: 'sample_001',
        userId: 'user_demo_001',
        timestamp: new Date('2024-01-15'),
        domain: 'tech',
        responses: [
            {
                questionId: 'q1',
                answerId: 'a1',
                timeSpent: 12.5,
                retryCount: 0,
            },
            // ... more responses
        ],
        results: {
            primaryStrength: 'analytical',
            score: 87,
            confidence: 92,
        },
        feedback: {
            rating: 5,
            accuracy: 90,
            comment: 'Very accurate! Matches my career path perfectly.',
        },
    },
    {
        id: 'sample_002',
        userId: 'user_demo_002',
        timestamp: new Date('2024-01-16'),
        domain: 'creative',
        responses: [
            {
                questionId: 'q1',
                answerId: 'a2',
                timeSpent: 8.3,
                retryCount: 1,
            },
            // ... more responses
        ],
        results: {
            primaryStrength: 'creative',
            score: 92,
            confidence: 88,
        },
        feedback: {
            rating: 4,
            accuracy: 85,
            comment: 'Good insights, helped me understand my strengths better.',
        },
    },
    // Add more sample data points as needed
];

// Function to export user data for analysis
export function exportUserData(): string {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const feedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');

    const exportData = {
        assessments,
        feedback,
        exportedAt: new Date().toISOString(),
        totalAssessments: assessments.length,
        totalFeedback: feedback.length,
    };

    return JSON.stringify(exportData, null, 2);
}

// Function to import sample data for testing
export function importSampleData(): void {
    localStorage.setItem('sampleDataset', JSON.stringify(sampleDataset));
    console.log('Sample dataset imported successfully');
}

// Function to calculate feedback statistics
export function getFeedbackStats() {
    const feedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');

    if (feedback.length === 0) {
        return {
            averageRating: 0,
            averageAccuracy: 0,
            totalFeedback: 0,
        };
    }

    const totalRating = feedback.reduce((sum: number, f: any) => sum + f.rating, 0);
    const totalAccuracy = feedback.reduce((sum: number, f: any) => sum + f.accuracy, 0);

    return {
        averageRating: (totalRating / feedback.length).toFixed(2),
        averageAccuracy: (totalAccuracy / feedback.length).toFixed(2),
        totalFeedback: feedback.length,
    };
}

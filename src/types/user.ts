// User types for authentication and personalization

export type UserDomain = 'tech' | 'finance' | 'health' | 'education' | 'creative' | 'business';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  domain?: UserDomain;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserPreferences {
  userId: string;
  domain: UserDomain;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  savedAssessments: string[];
}

export interface UserFeedback {
  id: string;
  userId: string;
  assessmentId: string;
  rating: number; // 1-5
  accuracy: number; // 1-100
  comment?: string;
  timestamp: Date;
}

export interface PredictionScenario {
  type: 'optimistic' | 'neutral' | 'pessimistic';
  percentage: number;
  description: string;
  factors: string[];
}

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from '@/components/LandingPage';
import { AssessmentFlow } from '@/components/AssessmentFlow';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { AssessmentResult } from '@/types/strength';
import { Helmet } from 'react-helmet-async';

type AppState = 'landing' | 'assessment' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStartAssessment = () => {
    setAppState('assessment');
  };

  const handleAssessmentComplete = (assessmentResult: AssessmentResult) => {
    setResult(assessmentResult);
    setAppState('results');
  };

  const handleRestart = () => {
    setResult(null);
    setAppState('landing');
  };

  return (
    <>
      <Helmet>
        <title>Hidden Strength Identifier | ML-Powered Behavioral Analysis</title>
        <meta 
          name="description" 
          content="Discover your hidden cognitive strengths through ML-powered behavioral analysis. No marks, no resumes - just your natural patterns revealing what you're truly built for." 
        />
        <meta name="keywords" content="strength finder, behavioral analysis, ML assessment, career guidance, cognitive strengths" />
        <link rel="canonical" href="/" />
      </Helmet>

      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <LandingPage key="landing" onStart={handleStartAssessment} />
        )}
        {appState === 'assessment' && (
          <AssessmentFlow
            key="assessment"
            onComplete={handleAssessmentComplete}
            onBack={handleRestart}
          />
        )}
        {appState === 'results' && result && (
          <ResultsDashboard
            key="results"
            result={result}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;

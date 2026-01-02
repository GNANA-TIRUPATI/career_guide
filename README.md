# 🧠 Hidden Strength Identifier - Enhanced Edition

An AI-powered behavioral analysis platform that discovers your hidden cognitive strengths through ML-powered assessment.

## ✨ New Features

### 1️⃣ **Free AI Chatbot (Groq)**
- Context-aware conversation powered by Llama 3.3 70B
- Assists with predictions, career advice, and feedback
- Floating widget accessible throughout the app
- Personalized responses based on user domain

### 2️⃣ **Google OAuth Login** (Optional)
- Sign in with Google for personalized experience
- Saves preferences and assessment history
- Works seamlessly without login (guest mode)
- Persistent user data across sessions

### 3️⃣ **Advanced Prediction System**
- **Percentage-based predictions** with multiple scenarios:
  - **Optimistic**: Best-case success probability
  - **Neutral**: Realistic trajectory
  - **Pessimistic**: Conservative estimate
- Three prediction categories:
  - Career Success
  - Skill Mastery
  - Domain Fit
- Animated progress bars and circular gauges
- Confidence scores for each prediction

### 4️⃣ **Feedback Loop**
- Star rating system (1-5 stars)
- Accuracy slider (0-100%)
- Optional text comments
- AI-powered feedback acknowledgment
- Improves future predictions

### 5️⃣ **Professional Animations**
- Smooth page transitions with Framer Motion
- Scroll-based reveals
- Hover effects on interactive elements
- Chart animations
- Loading states with branded spinners

### 6️⃣ **Deep Personalization**
- **Domain Selection**: Tech, Finance, Health, Education, Creative, Business
- Domain-specific predictions (+10% bonus)
- Personalized chatbot responses
- Tailored career recommendations
- Session-based for guests, persistent for logged-in users

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   cd strength-compass-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The `.env` file is already configured with:
   - Groq API Key (devbot)
   - Google OAuth Client ID
   
   **No additional configuration needed!**

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **AI**: Groq SDK (Llama 3.3 70B)
- **Auth**: @react-oauth/google
- **Charts**: Recharts
- **State**: React Context API
- **Storage**: localStorage

## 🎯 User Flow

1. **Landing Page** → View features and benefits
2. **Login (Optional)** → Sign in with Google or continue as guest
3. **Domain Selection** → Choose your area of interest
4. **Assessment** → Answer 10 behavioral questions
5. **Results** → View:
   - Strength breakdown with radar chart
   - Prediction scenarios (optimistic/neutral/pessimistic)
   - Career recommendations
   - Learning path
   - Feedback form
6. **AI Chatbot** → Ask questions anytime via floating widget

## 🔐 Security

- API keys stored in environment variables
- No hardcoded credentials
- Client-side OAuth flow
- localStorage for non-sensitive data only

## 📊 Features Breakdown

### ML Engine Enhancements
- Multi-scenario predictions
- Domain-specific adjustments
- Confidence scoring
- Feature extraction from behavioral patterns

### UI/UX Improvements
- Glassmorphism design
- Dark mode support (via next-themes)
- Responsive across all devices
- Accessibility-first approach

### Data Persistence
- Assessment history (localStorage)
- User preferences
- Feedback collection
- Session management

## 🎨 Design Philosophy

- **Premium & Professional**: High-end corporate aesthetics
- **Animated but Performant**: Smooth transitions without lag
- **User-Centric**: Clear CTAs and intuitive navigation
- **Trustworthy**: Transparent ML explanations

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📝 Environment Variables

```env
# Groq AI API Key
VITE_GROQ_API_KEY=your_groq_api_key_here

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=927696161358-6l5ec49g13kb1ckf0u440sq0a9vdqgg0.apps.googleusercontent.com
VITE_GOOGLE_APP_NAME=GNANA
```

## 🌟 Key Components

- `AIChatbot.tsx` - Floating AI assistant
- `AuthWidget.tsx` - Google OAuth login
- `DomainSelector.tsx` - User domain selection
- `PredictionCard.tsx` - Scenario-based predictions
- `FeedbackCollector.tsx` - User feedback system
- `ResultsDashboard.tsx` - Enhanced results display

## 🎓 ML Features

- Response time analysis
- Pattern recognition
- Text complexity (NLP)
- Decision confidence scoring
- Multi-label classification
- Ensemble modeling simulation

## 📱 Responsive Design

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large screens: 1440px+

## 🚀 Deployment

### Replit (Recommended)
1. Import project to Replit
2. Environment variables auto-detected from `.env`
3. Run `npm install && npm run dev`

### Vercel/Netlify
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Build command: `npm run build`
4. Output directory: `dist`

## 🤝 Support

For issues or questions:
- Check the AI chatbot in-app
- Review console logs for errors
- Ensure environment variables are set

## 📄 License

This project is built for educational and demonstration purposes.

---

**Built with ❤️ using React, TypeScript, and AI**

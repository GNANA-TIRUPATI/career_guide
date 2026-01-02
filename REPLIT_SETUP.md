# 🚀 Replit Setup Guide

## Quick Start (3 Steps)

### 1. Import to Replit
- Click "Import from GitHub" in Replit
- Paste repository URL
- Wait for import to complete

### 2. Environment Variables
Replit should auto-detect the `.env` file. If not, add these in Secrets:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GOOGLE_CLIENT_ID=927696161358-6l5ec49g13kb1ckf0u440sq0a9vdqgg0.apps.googleusercontent.com
VITE_GOOGLE_APP_NAME=GNANA
```

### 3. Run
Click the "Run" button or execute:
```bash
npm install
npm run dev
```

## ✅ Verification

Once running, you should see:
- Landing page with auth widget (top-right)
- Floating chat button (bottom-right)
- "Start Assessment" button

## 🎯 Testing the Features

### Test AI Chatbot
1. Click floating chat button (bottom-right)
2. Type: "What can you help me with?"
3. Should get AI response in ~2 seconds

### Test Google Login
1. Click Google sign-in (top-right)
2. Select Google account
3. Should see avatar after login

### Test Assessment Flow
1. Click "Start Assessment"
2. Select a domain (e.g., "Technology")
3. Answer 10 questions
4. View results with predictions

### Test Predictions
Results page should show:
- 3 prediction cards (Career, Skills, Domain)
- Each with 3 scenarios (Optimistic/Neutral/Pessimistic)
- Animated percentage bars

### Test Feedback
1. Scroll to feedback section on results
2. Rate with stars
3. Adjust accuracy slider
4. Submit feedback
5. Should see AI acknowledgment

## 🔧 Troubleshooting

### Issue: Groq API Error
**Solution**: Check that `VITE_GROQ_API_KEY` is set correctly

### Issue: Google Login Fails
**Solution**: Ensure `VITE_GOOGLE_CLIENT_ID` matches the OAuth app

### Issue: Build Errors
**Solution**: Run `npm install` again to ensure all dependencies are installed

### Issue: Port Already in Use
**Solution**: Replit will auto-assign a port, no action needed

## 📱 Mobile Testing

Replit provides a mobile preview URL. Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet

## 🎨 Customization

### Change Domain Options
Edit `src/components/DomainSelector.tsx`

### Modify Predictions
Edit `src/lib/ml-engine.ts` → `generatePredictionScenarios()`

### Update Chatbot Personality
Edit `src/services/groqService.ts` → `generateSystemPrompt()`

## 📊 Monitoring

Check browser console for:
- API call logs
- Error messages
- Performance metrics

## 🚀 Deployment

### From Replit
1. Click "Deploy" button
2. Choose deployment type
3. Replit handles the rest!

### Custom Domain
1. Go to Replit project settings
2. Add custom domain
3. Update DNS records

## 💡 Tips

- **Faster Development**: Use Replit's hot reload
- **Debugging**: Open browser DevTools (F12)
- **Collaboration**: Share Replit link with team
- **Version Control**: Replit auto-commits to GitHub

## 🎓 Demo Script

For presentations:

1. **Landing** (10s): "This is an ML-powered strength assessment platform"
2. **Login** (5s): "Optional Google login for personalization"
3. **Domain** (5s): "Select your area of interest"
4. **Assessment** (30s): "Answer behavioral questions"
5. **Results** (20s): "View comprehensive analysis"
6. **Predictions** (15s): "See success probabilities in 3 scenarios"
7. **Chatbot** (10s): "Ask AI anything about your results"
8. **Feedback** (10s): "Rate accuracy to improve system"

**Total Demo Time**: ~2 minutes

## ✅ Success Criteria

Your deployment is successful if:
- [ ] Landing page loads without errors
- [ ] Auth widget visible and functional
- [ ] Domain selection works
- [ ] Assessment completes
- [ ] Results display with predictions
- [ ] Chatbot responds
- [ ] Feedback submits
- [ ] Mobile responsive

---

**Need Help?** Check the AI chatbot in the app or review console logs!

# Groq API Setup Guide

## Overview
This project uses **Groq API** for the AI-powered chatbot feature ("Personal Guider"). The chatbot helps users understand their assessment results and provides career guidance.

### Components Using Groq API
- **[src/services/groqService.ts](src/services/groqService.ts)** — Core service that communicates with Groq
- **[src/components/AIChatbot.tsx](src/components/AIChatbot.tsx)** — Floating chatbot UI component

---

## Step 1: Obtain Groq API Key

1. Visit **[Groq Console](https://console.groq.com/keys)** (sign up if needed)
2. Click **"Create API Key"**
3. Name it (e.g., "Hidden Strength Identifier")
4. Copy the generated key (format: `gsk_...`)

---

## Step 2: Add API Key Locally

1. Create/open `.env` file in the project root:
   ```bash
   touch .env  # or create it in your editor
   ```

2. Add your Groq API key:
   ```env
   # Groq AI API Key
   VITE_GROQ_API_KEY=gsk_YourActualKeyHere
   
   # Google OAuth (if using)
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GOOGLE_APP_NAME=GNANA
   
   # App settings
   VITE_APP_NAME=Hidden Strength Identifier
   VITE_ENABLE_ANALYTICS=false
   ```

3. **Do NOT commit `.env`** to Git — it's in `.gitignore` for security

---

## Step 3: Test the Chatbot Locally

1. Restart the dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Click the floating chat icon (bottom-right) to open the chatbot

4. Send a message — the chatbot should respond with AI-generated text

---

## Step 4: For Production/Deployment

### Option A: GitHub Actions (CI/CD)
Store the API key as a **GitHub Secret**:

1. Go to your repo: **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Name: `VITE_GROQ_API_KEY`
4. Value: Your actual Groq API key
5. In your GitHub Actions workflow (`.github/workflows/deploy.yml`), reference it:
   ```yaml
   env:
     VITE_GROQ_API_KEY: ${{ secrets.VITE_GROQ_API_KEY }}
   ```

### Option B: Vercel / Netlify
1. Go to **Settings → Environment Variables**
2. Add `VITE_GROQ_API_KEY` with your API key
3. Redeploy

### Option C: Replit
1. Click **"Secrets"** (lock icon)
2. Add `VITE_GROQ_API_KEY` with your key
3. Redeploy

---

## Groq Model Used

The chatbot uses: **`llama-3.3-70b-versatile`**
- Fast inference
- Good for conversational AI
- Free tier available on Groq (with rate limits)

To change the model, edit [src/services/groqService.ts](src/services/groqService.ts):
```typescript
const completion = await groq.chat.completions.create({
    messages: allMessages,
    model: 'llama-3.3-70b-versatile',  // ← Change this
    // ... other options
});
```

Available models at: https://console.groq.com/docs/models

---

## Troubleshooting

### "Chatbot not responding"
- Check that `.env` has the correct API key
- Restart the dev server: `npm run dev`
- Open browser DevTools → Console for error messages

### "Invalid API key"
- Verify the key starts with `gsk_`
- Check for extra spaces in `.env`
- Regenerate the key from Groq Console if needed

### "Rate limit exceeded"
- Groq has rate limits on free tier
- Wait a few minutes and try again
- Upgrade your Groq plan for higher limits

### "CORS error"
- This is expected in browser — the service uses `dangerouslyAllowBrowser: true`
- Production backends should use a Node.js server instead

---

## Security Best Practices

✅ **Do:**
- Store API keys in `.env` locally
- Use GitHub Secrets for production
- Regenerate keys if accidentally exposed
- Rotate keys periodically

❌ **Don't:**
- Commit `.env` to Git (it's in `.gitignore`)
- Share API keys in messages or docs
- Use same key for multiple projects
- Leave keys in browser console logs

---

## Additional Resources

- **Groq Docs:** https://console.groq.com/docs/chat-completions
- **API Status:** https://status.groq.com/
- **Community:** https://discord.gg/groq

---

## Support

If the chatbot isn't working:
1. Check the `.env` file has `VITE_GROQ_API_KEY` set
2. Check browser console for errors (F12 → Console tab)
3. Verify Groq API status
4. Test with a fresh API key from Groq Console

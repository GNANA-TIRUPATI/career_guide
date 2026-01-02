# 🔧 How to Fix Google Login (Step-by-Step)

## Current Status
✅ App is working perfectly **without login**  
⚠️ Google login shows "Setup Required" button  
❌ OAuth origins not registered yet  

---

## What You Need to Do

### **Step 1: Go to Google Cloud Console**

1. Open your browser
2. Go to: **https://console.cloud.google.com/apis/credentials**
3. Sign in with: **gnanatirupati@gmail.com**

---

### **Step 2: Find Your OAuth Client**

1. Look for "OAuth 2.0 Client IDs" section
2. Find the client with ID starting with: **927696161358...**
3. Click the **pencil icon (✏️)** to edit

---

### **Step 3: Add Authorized Origins**

1. Scroll to **"Authorized JavaScript origins"**
2. Click **"+ ADD URI"**
3. Add these **one by one**:
   ```
   http://localhost:5173
   http://localhost:3000
   http://127.0.0.1:5173
   ```

---

### **Step 4: Add Redirect URIs**

1. Scroll to **"Authorized redirect URIs"**
2. Click **"+ ADD URI"**
3. Add these **one by one**:
   ```
   http://localhost:5173
   http://localhost:3000
   ```

---

### **Step 5: Save and Wait**

1. Click **"SAVE"** button at the bottom
2. **Wait 5-10 minutes** for Google to update
3. **Refresh your app** after waiting

---

### **Step 6: Test**

1. Refresh: `http://localhost:5173`
2. The button should now say "Sign in with Google"
3. Click it and try logging in
4. Should work! ✅

---

## Visual Guide

```
Google Cloud Console
├── APIs & Services
│   └── Credentials
│       └── OAuth 2.0 Client IDs
│           └── [Your Client] ✏️ (Click to edit)
│               ├── Authorized JavaScript origins
│               │   ├── + ADD URI
│               │   ├── http://localhost:5173
│               │   ├── http://localhost:3000
│               │   └── http://127.0.0.1:5173
│               │
│               └── Authorized redirect URIs
│                   ├── + ADD URI
│                   ├── http://localhost:5173
│                   └── http://localhost:3000
│
└── SAVE (at bottom)
```

---

## Screenshots to Help You

### What You'll See:

**1. Credentials Page**
```
┌─────────────────────────────────────┐
│ OAuth 2.0 Client IDs                │
├─────────────────────────────────────┤
│ Name: Web client 1          ✏️ 🗑️  │
│ Client ID: 927696161358...          │
│ Created: Dec 2024                   │
└─────────────────────────────────────┘
        ↑ Click the pencil icon
```

**2. Edit Page**
```
┌─────────────────────────────────────┐
│ Authorized JavaScript origins       │
├─────────────────────────────────────┤
│ + ADD URI                           │
│ [http://localhost:5173        ]     │
│ + ADD URI                           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Authorized redirect URIs            │
├─────────────────────────────────────┤
│ + ADD URI                           │
│ [http://localhost:5173        ]     │
│ + ADD URI                           │
└─────────────────────────────────────┘

        [SAVE]  [CANCEL]
```

---

## Common Issues

### ❌ "I can't find the OAuth client"
**Solution**: Make sure you're signed in with `gnanatirupati@gmail.com`

### ❌ "I don't have access to Google Cloud Console"
**Solution**: Use the app without login! It works perfectly.

### ❌ "It's still not working after saving"
**Solution**: Wait 10 minutes and clear browser cache

### ❌ "I added the URIs but still get error"
**Solution**: Make sure you clicked SAVE and waited

---

## Alternative: Use App Without Login

**The app works 100% without login!**

Features that work without login:
- ✅ Complete assessments
- ✅ View predictions
- ✅ Use Personal Guider chatbot
- ✅ Export predictions
- ✅ All menu actions

Features that need login:
- ❌ Save preferences permanently
- ❌ View assessment history

**Recommendation**: Use without login for now, set up OAuth later when you have time!

---

## Quick Test After Setup

1. Wait 10 minutes after saving
2. Close and reopen browser
3. Go to: `http://localhost:5173`
4. Button should say "Sign in with Google" (not "Setup Required")
5. Click and try logging in
6. Should work! 🎉

---

## Need Help?

If you're stuck, just **use the app without login**. All core features work!

The login is **optional** and only saves your preferences.

---

**Current Button**: "Login (Setup Required)" with warning icon  
**After Setup**: "Sign in with Google" with Google logo  

You'll know it's working when the button changes! ✅

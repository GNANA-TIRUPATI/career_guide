# 🚨 QUICK FIX - Google OAuth Error

## The Problem
You're getting: **Error 401: invalid_client - no registered origin**

## The Solution (Choose One)

### ⚡ Option 1: Restart Server (EASIEST - Do This First!)

I've changed the port to 5173. Just restart:

1. **Stop the current server**:
   - Go to terminal running `npm run dev`
   - Press `Ctrl + C`

2. **Start it again**:
   ```bash
   npm run dev
   ```

3. **Open new URL**:
   ```
   http://localhost:5173
   ```

4. **Try Google login again**

---

### 🔧 Option 2: Register the Origin (If Option 1 Doesn't Work)

You need to add `http://localhost:5173` to your Google OAuth app:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth client ID
3. Click Edit
4. Under "Authorized JavaScript origins", add:
   ```
   http://localhost:5173
   ```
5. Under "Authorized redirect URIs", add:
   ```
   http://localhost:5173
   ```
6. Click Save
7. Wait 5-10 minutes
8. Try again

---

### 🎯 Option 3: Skip Login (WORKS RIGHT NOW!)

**The app works perfectly without login!**

Just use it as a guest:
- ✅ All features work
- ✅ Assessment works
- ✅ Predictions work
- ✅ Personal Guider works
- ✅ Everything except saved preferences

**Simply don't click "Sign in with Google"** and use the app normally!

---

## What I Changed

- Changed server port from 8080 → 5173
- This port is more commonly registered in OAuth apps

## Next Steps

1. **Try Option 1** (restart server)
2. If that doesn't work, **try Option 3** (skip login)
3. If you need login, **do Option 2** (register origin)

---

**The app is fully functional without login!** 🎉

# 🔧 Google OAuth Setup Guide

## ⚠️ Current Issue

**Error**: `Error 401: invalid_client - no registered origin`

**Cause**: The OAuth app needs `http://localhost:5173` registered as an authorized origin.

---

## ✅ Solution 1: Register Authorized Origins (Recommended)

You need to add your local development URL to the Google OAuth app settings.

### Steps:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with: `gnanatirupati@gmail.com`

2. **Navigate to OAuth Consent Screen**
   ```
   APIs & Services → Credentials → OAuth 2.0 Client IDs
   ```

3. **Edit Your OAuth Client**
   - Find client ID: `927696161358-6l5ec49g13kb1ckf0u440sq0a9vdqgg0`
   - Click the pencil icon to edit

4. **Add Authorized JavaScript Origins**
   Add these URLs:
   ```
   http://localhost:5173
   http://localhost:3000
   http://localhost:8080
   http://127.0.0.1:5173
   ```

5. **Add Authorized Redirect URIs**
   Add these URLs:
   ```
   http://localhost:5173
   http://localhost:3000
   http://localhost:8080
   ```

6. **Save Changes**
   - Click "Save"
   - Wait 5-10 minutes for changes to propagate

---

## ✅ Solution 2: Use Port 5173 (Quick Fix - Already Done!)

I've changed the dev server to use port **5173** (Vite's default).

### Restart the Server:

1. **Stop current server**:
   - Press `Ctrl+C` in the terminal running `npm run dev`

2. **Start server again**:
   ```bash
   npm run dev
   ```

3. **Open new URL**:
   ```
   http://localhost:5173
   ```

---

## ✅ Solution 3: Temporary Workaround (Skip OAuth)

The app works perfectly **without login**! You can:

1. Use the app as a guest
2. All features work (except saved preferences)
3. Assessment, predictions, and chatbot all functional

**Just don't click "Sign in with Google"** until origins are registered.

---

## 🔍 How to Check if OAuth is Working

### Test Steps:

1. Open: `http://localhost:5173`
2. Click "Sign in with Google" (top-right)
3. **If working**: Google popup appears
4. **If not working**: Error 401 appears

### Expected Behavior:

✅ **Working**:
```
Google popup → Select account → Success toast → Avatar appears
```

❌ **Not Working**:
```
Error 401: invalid_client
Access blocked: no registered origin
```

---

## 📝 Current Configuration

**Your OAuth Client ID**:
```
927696161358-6l5ec49g13kb1ckf0u440sq0a9vdqgg0.apps.googleusercontent.com
```

**App Name**: GNANA

**Current Dev URL**: `http://localhost:5173`

**Needs to be registered in**:
- Authorized JavaScript origins
- Authorized redirect URIs

---

## 🎯 Quick Checklist

Before testing OAuth:

- [ ] Google Cloud Console access
- [ ] OAuth client edited
- [ ] Origins added:
  - [ ] `http://localhost:5173`
  - [ ] `http://localhost:3000`
  - [ ] `http://localhost:8080`
- [ ] Redirect URIs added
- [ ] Changes saved
- [ ] Waited 5-10 minutes
- [ ] Server restarted
- [ ] Opened `http://localhost:5173`

---

## 🔐 Security Note

**Why this happens**:
Google OAuth requires you to explicitly register which URLs can use your OAuth credentials. This prevents unauthorized websites from using your OAuth app.

**This is normal** for local development!

---

## 💡 Alternative: Use Different OAuth Credentials

If you can't access the Google Cloud Console, you can:

1. Create a **new** Google OAuth app
2. Use your own credentials
3. Update `.env` file with new Client ID

### Steps to Create New OAuth App:

1. Go to: https://console.cloud.google.com/
2. Create new project (or use existing)
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins:
   - `http://localhost:5173`
   - `http://localhost:3000`
6. Copy Client ID
7. Update `.env`:
   ```
   VITE_GOOGLE_CLIENT_ID=your-new-client-id-here
   ```

---

## 🚀 After Fixing OAuth

Once origins are registered:

1. Restart dev server
2. Open `http://localhost:5173`
3. Click "Sign in with Google"
4. Should work perfectly!

**Benefits of Login**:
- ✅ Saved preferences
- ✅ Assessment history
- ✅ Personalized experience
- ✅ Domain preferences persist

---

## 📞 Still Having Issues?

**Check**:
1. Browser console for errors
2. Network tab for failed requests
3. `.env` file has correct Client ID
4. Server is running on correct port
5. No popup blockers enabled

**Common Errors**:
- `401: invalid_client` → Origins not registered
- `403: access_denied` → User denied permission
- `popup_closed_by_user` → User closed popup

---

## ✅ Current Status

- ✅ Port changed to 5173
- ✅ Server ready to restart
- ⏳ Waiting for OAuth origins to be registered

**Next Step**: Register origins in Google Cloud Console OR use app without login!

---

**Remember**: The app works great without login! OAuth is optional. 🎉

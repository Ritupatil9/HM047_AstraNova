# How to Get Firebase Service Account for Backend

## Step-by-Step Instructions

### 1. Go to Firebase Console
```
https://console.firebase.google.com/project/creditup-fbb1c/settings/serviceaccounts/adminsdk
```

Or manually:
- Open https://console.firebase.google.com
- Select **creditup-fbb1c** project
- Click **⚙️ Settings** (gear icon, top left)
- Go to **Service Accounts** tab
- Select **Node.js** in the dropdown

### 2. Generate Private Key
```
Click the "Generate New Private Key" button
This downloads a JSON file that looks like:
```

```json
{
  "type": "service_account",
  "project_id": "creditup-fbb1c",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xyz@creditup-fbb1c.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/certificates/...",
  "universe_domain": "googleapis.com"
}
```

### 3. Update Backend .env File
Open: `d:\CreditUp\credit-companion\backend\.env`

Replace the `FIREBASE_SERVICE_ACCOUNT_JSON={}` line with:

```env
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"creditup-fbb1c","private_key_id":"your-key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR-ENTIRE-KEY-HERE\n-----END PRIVATE KEY-----\n","client_email":"your-email@creditup-fbb1c.iam.gserviceaccount.com","client_id":"your-client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"your-url","universe_domain":"googleapis.com"}
```

**IMPORTANT:** Keep it ALL on ONE LINE (no line breaks except \n within the private_key)

### 4. Test the Backend
```bash
cd d:\CreditUp\credit-companion\backend
npm run dev
```

Should see:
```
✓ Server running on port 5000
✓ Firebase initialized
✓ GET /api/health → 200 OK
```

## ⚠️ Common Mistakes

### ❌ Multi-line JSON
```env
# WRONG - JSON split across multiple lines
FIREBASE_SERVICE_ACCOUNT_JSON={
  "type": "service_account",
  ...
}
```

### ✅ Single Line JSON
```env
# RIGHT - Everything on one line
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

### ❌ Missing Quotes
```env
# WRONG
FIREBASE_SERVICE_ACCOUNT_JSON={"type":service_account}
```

### ✅ Proper Quotes
```env
# RIGHT
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account"}
```

### ❌ Exposed Private Keys
```bash
# NEVER commit .env to git
# NEVER push it to GitHub
# DELETE if you accidentally expose it and regenerate new key
```

## 🔒 Safety Checklist

- [ ] Private key is in .env, NOT in code
- [ ] .env is in .gitignore (already is)
- [ ] Private key is not printed in console
- [ ] Only .env.example is in git (with placeholders)
- [ ] .env.local and .env are in .gitignore

## 🆘 Still Getting Error?

If you still see: `Service account object must contain a string "project_id" property`

**It means:** The JSON is empty `{}`

**Solution:**
1. Go to Firebase Console again
2. Download the service account JSON file again
3. Open the file with a text editor
4. Copy the ENTIRE content
5. Paste it into .env replacing `{}`
6. Make sure it's all on ONE line
7. Restart backend: `npm run dev`

## ✅ Success Signs

After updating .env and running `npm run dev`:

```
D:\CreditUp\credit-companion\backend> npm run dev

> credit-companion-backend@1.0.0 dev
> node --watch src/index.js

Node.js is watching your files for changes...

✓ Server running on port 5000
✓ Firebase initialized successfully
✓ Health check endpoint available at GET /api/health
```

Then test:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","message":"API is running"}
```

## 📝 Example .env (with real but redacted values)

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
FIREBASE_PROJECT_ID=creditup-fbb1c
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"creditup-fbb1c","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...[truncated]\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xyz@creditup-fbb1c.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/certificates/...","universe_domain":"googleapis.com"}
FIREBASE_USE_EMULATOR=false
```

---

**Once you add the service account JSON, everything will work!**

# Deployment Guide — Render + Vercel

## Overview

| Service | What gets deployed | URL |
|---|---|---|
| Render | Backend (Node.js API) | https://your-app.onrender.com |
| Vercel | Frontend (React User App) | https://your-app.vercel.app |
| Vercel | Dashboard (React Admin) | https://your-dashboard.vercel.app |
| MongoDB Atlas | Database | cloud.mongodb.com |

All completely FREE tier 🎉

---

## Step 1 — Push Project to GitHub

First your project must be on GitHub.

```bash
# In root project folder
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stock-trading-platform.git
git push -u origin main
```

---

## Step 2 — Deploy Backend on Render

### 2.1 — Create Render Account
Go to https://render.com and sign up with GitHub.

### 2.2 — Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account
3. Select your **stock-trading-platform** repo
4. Fill in the settings:

| Field | Value |
|---|---|
| Name | stock-trading-backend |
| Root Directory | backend |
| Runtime | Node |
| Build Command | npm install |
| Start Command | node server.js |
| Instance Type | Free |

### 2.3 — Add Environment Variables
Click **"Environment"** tab and add these one by one:

```
PORT                = 5000
MONGO_URI           = mongodb+srv://kushagra9926:Kushu%401234@cluster0.oewab4l.mongodb.net/stocktrading?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET          = mysecretkey123456
JWT_EXPIRE          = 7d
NODE_ENV            = production
```

### 2.4 — Deploy
Click **"Create Web Service"**. Wait 2-3 minutes.

Your backend URL will be:
```
https://stock-trading-backend.onrender.com
```

Copy this URL — you need it for frontend deployment.

---

## Step 3 — Deploy Frontend on Vercel

### 3.1 — Create Vercel Account
Go to https://vercel.com and sign up with GitHub.

### 3.2 — Import Project
1. Click **"Add New Project"**
2. Import your **stock-trading-platform** repo
3. Fill in settings:

| Field | Value |
|---|---|
| Root Directory | frontend |
| Framework Preset | Create React App |
| Build Command | npm run build |
| Output Directory | build |

### 3.3 — Add Environment Variable
Click **"Environment Variables"** and add:

```
REACT_APP_API_URL = https://stock-trading-backend.onrender.com
```

### 3.4 — Deploy
Click **"Deploy"**. Wait 1-2 minutes.

Your frontend URL will be:
```
https://stock-trading-frontend.vercel.app
```

---

## Step 4 — Deploy Dashboard on Vercel

### 4.1 — Add New Project (again on Vercel)
1. Click **"Add New Project"**
2. Import the **same repo** again
3. Fill in settings:

| Field | Value |
|---|---|
| Root Directory | dashboard |
| Framework Preset | Create React App |
| Build Command | npm run build |
| Output Directory | build |

### 4.2 — Add Environment Variable

```
REACT_APP_API_URL = https://stock-trading-backend.onrender.com
```

### 4.3 — Deploy
Your dashboard URL will be:
```
https://stock-trading-dashboard.vercel.app
```

---

## Step 5 — Update Backend CORS for Production

After getting your Vercel URLs, update your backend to allow those origins.
Edit `backend/server.js` and replace the cors line:

```js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://stock-trading-frontend.vercel.app',
    'https://stock-trading-dashboard.vercel.app'
  ],
  credentials: true
}));
```

Then push to GitHub — Render will auto-redeploy.

---

## Final URLs Summary

```
Backend API  →  https://stock-trading-backend.onrender.com
Frontend     →  https://stock-trading-frontend.vercel.app
Dashboard    →  https://stock-trading-dashboard.vercel.app
```

---

## Cost — 100% Free

| Service | Free Tier Limits |
|---|---|
| Render | 750 hrs/month, sleeps after 15 min inactivity |
| Vercel | Unlimited static deploys |
| MongoDB Atlas | 512MB storage |

> Note: Render free tier "sleeps" after 15 minutes of inactivity.
> First request after sleep takes ~30 seconds to wake up. This is normal for free tier.

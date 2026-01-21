# CardFlip Pro - Deployment Guide

## Quick Start (10 minutes)

### Step 1: Get Your Ximilar API Token

1. Go to **[app.ximilar.com](https://app.ximilar.com)** and create a free account
2. After logging in, click **Settings** (gear icon) → **API**
3. Copy your API token (looks like: `a1b2c3d4e5f6...`)

### Step 2: Deploy to Vercel (Free)

**Option A: One-Click Deploy (Easiest)**

1. Push this folder to a GitHub repository
2. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repo
5. Before deploying, click **"Environment Variables"** and add:
   - Name: `XIMILAR_API_TOKEN`
   - Value: (paste your token from Step 1)
6. Click **Deploy**

**Option B: Command Line**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (it will ask questions - just press Enter for defaults)
vercel

# When asked about environment variables, add:
# XIMILAR_API_TOKEN = your_token_here

# Deploy to production
vercel --prod
```

### Step 3: Test It

1. Open your Vercel URL (something like `cardflip-pro.vercel.app`)
2. Take a photo of any sports card
3. See the magic happen!

---

## File Structure

```
cardflip-deploy/
├── api/
│   └── analyze.js      # Serverless function that calls Ximilar
├── public/
│   └── index.html      # The app frontend
├── package.json
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

---

## How It Works

```
User takes photo → Frontend sends to /api/analyze → 
Serverless function calls Ximilar API → Returns card data → 
Frontend displays results
```

The serverless function is needed because:
- Browsers block direct API calls to other domains (CORS)
- It keeps your API token secret (not exposed in browser)

---

## Costs

| Service | Cost |
|---------|------|
| Vercel Hosting | Free (100GB bandwidth/month) |
| Ximilar Free Tier | Free (1,000 credits/month) |
| **Total to start** | **$0** |

When you're ready to scale:
- Ximilar Business 100K: $64/month (~3,300 scans)
- Vercel Pro: $20/month (if you exceed free tier)

---

## Adding Your Own Domain

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your domain (e.g., `cardflip.app`)
3. Update your DNS as instructed

---

## Troubleshooting

**"Failed to analyze card" error:**
- Check your API token is correct
- Make sure you added it as an environment variable in Vercel
- Check Vercel logs: Dashboard → Your Project → Deployments → View Logs

**Card not recognized:**
- Try a clearer, well-lit photo
- Make sure the full card is visible
- Ximilar works best with front-facing photos

**API credits running out:**
- Check usage at app.ximilar.com → Dashboard
- Upgrade to a paid plan if needed

---

## Next Steps

1. **Add user accounts** - Use Vercel's built-in auth or add Firebase
2. **Add payments** - Integrate Stripe to charge for premium features
3. **Add price alerts** - Store user watchlists and send notifications
4. **Go native** - Wrap in React Native for App Store/Play Store

---

## Support

Questions? Issues? The code is yours - modify however you want.

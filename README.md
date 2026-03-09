# Survey Auto-Filler Web App

## Run locally
1. Install Node.js 18+
2. Install deps: `npm install`
3. Install Playwright browsers: `npx playwright install`
4. Start: `npm start`
5. Open http://localhost:3000

## Deploy to Render (recommended)
1. Zip this folder
2. Go to https://dashboard.render.com → New → Web Service
3. Upload ZIP (Environment: Docker auto-detected)
4. Deploy, then open the public URL

## Deploy to Railway
1. Go to https://railway.app → New Project → Deploy from repo/ZIP
2. It auto-detects Dockerfile → Deploy

## Deploy to Azure App Service
1. Create Web App (Linux) with Docker
2. Deploy this folder as a container
3. Open the assigned URL

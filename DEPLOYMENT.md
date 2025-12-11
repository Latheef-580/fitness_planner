# Deployment Guide for Fitness Planner

This guide covers deploying your Fitness Planner application to various platforms.

## Prerequisites

1. Build the project locally to ensure everything works:
   ```bash
   npm install
   npm run build
   ```

2. The build output will be in the `dist` folder.

## Important: Backend Configuration

⚠️ **Note**: This app currently uses `json-server` for development, which is not suitable for production. You have two options:

### Option 1: Deploy Backend Separately (Recommended)
- Deploy `json-server` to a service like [Railway](https://railway.app), [Render](https://render.com), or [Heroku](https://heroku.com)
- Update the `VITE_API_URL` environment variable to point to your deployed backend

### Option 2: Use a Real Backend
- Replace `json-server` with a proper backend (Node.js/Express, Python/Django, etc.)
- Deploy the backend separately
- Update the API URL accordingly

## Deployment Options

### 1. Vercel (Recommended for Frontend)

Vercel is excellent for React/Vite applications with automatic deployments.

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts. When asked for environment variables, add:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app`)

3. **Deploy via GitHub** (Recommended):
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variable: `VITE_API_URL` = your backend URL
   - Deploy!

4. **Configure Environment Variables**:
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

The `vercel.json` file is already configured for your project.

---

### 2. Netlify

Netlify is another great option for static site hosting.

#### Steps:

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy via CLI**:
   ```bash
   netlify deploy --prod
   ```

3. **Deploy via GitHub**:
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL` = your backend URL
   - Deploy!

The `netlify.toml` file is already configured.

---

### 3. GitHub Pages

Free hosting directly from your GitHub repository.

#### Steps:

1. **Update `vite.config.js`** to include base path:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/fitness-planner-professional/', // Your repo name
     server: {
       port: 5173
     }
   })
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

### 4. Render

#### Steps:

1. Go to [render.com](https://render.com)
2. Create a new "Static Site"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy!

---

## Backend Deployment (json-server)

If you want to deploy json-server for now:

### Railway

1. Create a `railway.json` or use Railway's dashboard
2. Set start command: `npx json-server db.json --port $PORT`
3. Deploy `db.json` file
4. Get the URL and use it as `VITE_API_URL`

### Render

1. Create a new "Web Service"
2. Build command: `npm install -g json-server`
3. Start command: `json-server db.json --port $PORT`
4. Upload `db.json` file
5. Get the URL and use it as `VITE_API_URL`

---

## Environment Variables

For all platforms, you need to set:

- **`VITE_API_URL`**: Your backend API URL
  - Development: `http://localhost:3000`
  - Production: `https://your-backend-url.com`

---

## Testing Your Deployment

1. Build locally: `npm run build`
2. Preview: `npm run preview`
3. Test the production build before deploying

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (check `.nvmrc` if present)

### API Calls Fail
- Verify `VITE_API_URL` is set correctly
- Check CORS settings on your backend
- Ensure backend is deployed and accessible

### Routing Issues
- Make sure redirect rules are configured (already done in `vercel.json` and `netlify.toml`)
- For GitHub Pages, ensure base path is set correctly

---

## Quick Deploy Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

## Next Steps

1. Choose a deployment platform
2. Deploy your backend (or use a real backend service)
3. Set the `VITE_API_URL` environment variable
4. Deploy the frontend
5. Test everything works!

Good luck with your deployment! 🚀


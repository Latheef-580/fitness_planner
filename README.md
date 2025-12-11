# Fitness Planner

React + Vite frontend with Tailwind CSS for UI. Uses JSON-Server as a fake REST API with Axios for HTTP calls.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start JSON server (runs on port 3000):
   ```
   npm run serve:json
   ```

3. In a new terminal, start the frontend (Vite dev server):
   ```
   npm run dev
   ```

4. Open http://localhost:5173

## Features implemented
- Workouts: list, add, edit, delete (full CRUD via Axios + JSON-Server)
- Meals: list, add, edit, delete (full CRUD)
- Responsive Tailwind UI
- React Router DOM for navigation

## Deployment

This project is ready for deployment! 

### 🚀 Deploy to Render (Full Stack - Recommended)

**Deploy both frontend and backend on Render**: See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for step-by-step instructions.

Quick steps:
1. Deploy backend as Web Service (json-server API)
2. Deploy frontend as Static Site
3. Set `VITE_API_URL` environment variable to your backend URL

### Other Deployment Options:

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- **Vercel**: `vercel --prod` or connect via GitHub
- **Netlify**: `netlify deploy --prod` or connect via GitHub
- **GitHub Pages**: Static site deployment

### Environment Variables:
- `VITE_API_URL`: Your backend API URL (defaults to `http://localhost:3000` for development)

### Important:
- The app uses `json-server` for the backend. For production on Render, both services are deployed separately.
- Set the `VITE_API_URL` environment variable in your frontend deployment to point to your backend URL.

## Team contribution suggestion
- Member 1: UI & Tailwind styling
- Member 2: Routing & pages
- Member 3: API integration (Axios + JSON-Server)
- Member 4: Documentation, testing, README & presentation


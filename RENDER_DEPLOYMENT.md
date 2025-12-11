# Deploying Fitness Planner to Render

This guide will help you deploy both the frontend and backend of your Fitness Planner application to Render.

## Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Render account (sign up at [render.com](https://render.com) - free tier available)

## Deployment Steps

### Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Deploy the Backend (json-server API)

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Your Repository**
   - Connect your GitHub account if not already connected
   - Select your `fitness-planner-professional` repository

3. **Configure Backend Service**
   - **Name**: `fitness-planner-api` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:api`
   - **Plan**: Free (or choose a paid plan)

4. **Environment Variables** (Optional)
   - Add if needed: `NODE_ENV=production`

5. **Click "Create Web Service"**
   - Render will start building and deploying your backend
   - Wait for deployment to complete (usually 2-5 minutes)
   - **IMPORTANT**: Copy the service URL (e.g., `https://fitness-planner-api.onrender.com`)

### Step 3: Deploy the Frontend (React App)

1. **Create New Static Site**
   - In Render Dashboard, click "New +" → "Static Site"

2. **Connect Your Repository**
   - Select the same repository: `fitness-planner-professional`

3. **Configure Frontend Service**
   - **Name**: `fitness-planner-frontend` (or any name you prefer)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. **Environment Variables**
   - Click "Add Environment Variable"
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 2 (e.g., `https://fitness-planner-api.onrender.com`)
   - **Important**: Make sure to use `https://` and include the full URL

5. **Click "Create Static Site"**
   - Render will build and deploy your frontend
   - Wait for deployment to complete

### Step 4: Configure CORS (if needed)

If you encounter CORS errors, you may need to create a simple server wrapper for json-server. However, json-server should work out of the box on Render.

If you do encounter CORS issues, create a file `server.js`:

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
```

Then update `package.json` start command:
```json
"start:api": "node server.js"
```

### Step 5: Test Your Deployment

1. Visit your frontend URL (e.g., `https://fitness-planner-frontend.onrender.com`)
2. Test login/registration
3. Test creating workouts and meals
4. Verify all API calls work correctly

## Using render.yaml (Alternative Method)

If you prefer to use the `render.yaml` file:

1. **Ensure render.yaml is in your repository root**

2. **In Render Dashboard**
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect `render.yaml`
   - Review the services and click "Apply"

3. **Set Environment Variables**
   - After deployment, go to the frontend service
   - Add `VITE_API_URL` environment variable
   - Set it to your backend service URL

4. **Redeploy** if needed after setting environment variables

## Important Notes

### Free Tier Limitations

- **Spinning Down**: Free services spin down after 15 minutes of inactivity
- **Cold Start**: First request after spin-down may take 30-60 seconds
- **Upgrade**: Consider upgrading to paid plan for always-on services

### Environment Variables

- **VITE_API_URL**: Must be set in the frontend service
- Use the full backend URL including `https://`
- Example: `https://fitness-planner-api.onrender.com`

### Database Persistence

- **Important**: json-server uses `db.json` file
- Changes are stored in memory on Render
- Data will reset on each deployment
- For production, consider migrating to a real database (MongoDB, PostgreSQL, etc.)

### Updating Your Deployment

1. Push changes to GitHub
2. Render automatically detects changes and redeploys
3. Frontend will rebuild with new code
4. Backend will restart with new code

## Troubleshooting

### Backend Issues

**Problem**: Backend fails to start
- **Solution**: Check logs in Render dashboard
- Ensure `db.json` is in the repository root
- Verify `start:api` script in package.json

**Problem**: Port binding error
- **Solution**: Ensure start command uses `${PORT}` or `$PORT` environment variable
- Render provides PORT automatically

### Frontend Issues

**Problem**: API calls fail
- **Solution**: 
  - Verify `VITE_API_URL` is set correctly
  - Check backend URL is accessible
  - Ensure backend service is running (not spun down)

**Problem**: Build fails
- **Solution**: 
  - Check build logs in Render dashboard
  - Ensure all dependencies are in `package.json`
  - Verify Node.js version compatibility

**Problem**: Routing doesn't work
- **Solution**: 
  - Render Static Sites handle routing automatically
  - If issues persist, check `render.yaml` routes configuration

### CORS Errors

If you see CORS errors:
1. Check backend allows requests from your frontend domain
2. Consider creating `server.js` wrapper (see Step 4 above)
3. Verify `VITE_API_URL` uses correct protocol (`https://`)

## Next Steps

1. **Monitor**: Check Render dashboard for service health
2. **Logs**: Use Render logs to debug issues
3. **Upgrade**: Consider paid plan for production use
4. **Database**: Plan migration to real database for data persistence
5. **Custom Domain**: Add custom domain in Render settings

## Quick Reference

### Backend Service
- **Type**: Web Service
- **Build**: `npm install`
- **Start**: `npm run start:api`
- **Port**: Auto-assigned by Render

### Frontend Service
- **Type**: Static Site
- **Build**: `npm install && npm run build`
- **Publish**: `dist`
- **Env Var**: `VITE_API_URL` = backend URL

## Support

- Render Documentation: [render.com/docs](https://render.com/docs)
- Render Community: [community.render.com](https://community.render.com)

Happy deploying! 🚀


# Deploying to Vercel

Your monitoring dashboard is ready to deploy! Follow these steps:

## Quick Deploy (5 minutes)

### Step 1: Push to GitHub
```bash
# If you haven't already, initialize git and push to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up/Login** with your GitHub account
3. **Click** "Add New Project"
4. **Import** your GitHub repository
5. **Configure** (Vercel auto-detects settings):
   - Framework Preset: **Vite**
   - Build Command: `pnpm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `pnpm install` (auto-detected)
6. **Click** "Deploy"

### Step 3: Done! 🎉

Your site will be live at `https://your-project-name.vercel.app` in about 1-2 minutes.

## Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS instructions

## Environment Variables (If needed later)

If you add backend functionality or API keys:
1. Go to Project Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_KEY`)
3. Redeploy

## Local Development

To run locally:
```bash
pnpm install
pnpm run dev
```

To build locally:
```bash
pnpm run build
```

## Project Structure

- `src/app/App.tsx` - Main application component
- `src/app/routes.tsx` - React Router configuration
- `src/app/components/` - All React components
- `src/styles/` - Global styles and theme
- `vercel.json` - Vercel configuration for client-side routing

## Notes

- The `vercel.json` file ensures client-side routing works correctly
- All routes (/, /domains, /domains/:id) will work properly
- Build time: ~6-8 seconds
- Bundle size: ~867 KB (optimized for production)

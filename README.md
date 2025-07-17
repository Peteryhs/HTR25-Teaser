# HTR25 Teaser - Color Shifting Gradient Display

A beautiful teaser website for Hack the Ridge 2025 featuring animated gradients, typewriter effects, and color-shifting animations.

## Live Demo

Visit the live site: [https://Peteryhs.github.io/HTR25-Teaser](https://Peteryhs.github.io/HTR25-Teaser)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (if using AI features)

3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. Push your changes to the `main` branch
2. The GitHub Action will automatically build and deploy to GitHub Pages

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Project Structure

- `App.tsx` - Main application component with animations and layout
- `components/` - React components including GradientDisplay
- `assets/` - Static assets like logo and fonts
- `fonts/` - Custom font files
- `.github/workflows/` - GitHub Actions for automated deployment

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS (via CDN)
- GitHub Pages for hosting

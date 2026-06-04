# Stage 2 + 3 Skill Hub

Static GitHub Pages app for Stage 2 and Stage 3 practice across spelling, maths, English, and science.

## Pages

- `index.html` - subject menu
- `spelling.html` - original spelling trainer
- `maths.html` - maths skill practice
- `english.html` - English skill practice
- `science.html` - science skill practice

The subject pages save simple progress in browser local storage and can call `/api/coach` for an OpenAI-powered hint when deployed with a backend that supports serverless functions.

## Quick deploy

1. Create a public GitHub repository named `spell`.
2. Upload the HTML, CSS, JS, and `.nojekyll` files to the repository root.
3. In GitHub, go to Settings -> Pages.
4. Set Source to "Deploy from a branch", Branch to `main`, Folder to `/(root)`, then Save.
5. Open: https://learntospeak.github.io/spell/

No build tools or installation required.

## Optional AI coach

The included `api/coach.js` example is for hosts such as Vercel that can run serverless functions. Set `OPENAI_API_KEY` privately on the host. Do not put an OpenAI API key in browser JavaScript.

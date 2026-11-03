# Dwiky A - Editorial Portfolio

This repository contains the editorial portfolio from https://dwiky-a-portfolio.oakencrown1024.chatgpt.site/. It uses HTML, inline CSS and JavaScript, hash routing, and 18 project records. Assets are in assets/. Email and phone details are omitted from this public GitHub version and its PDF CV.

## Local development
Install Node.js 20+ (recommended 22), open this folder in VS Code/Codex, then run npm start. Open http://127.0.0.1:8000/. No npm install is necessary.

## Build / deploy
npm run build prepares dist/. npm run preview serves that output. GitHub Actions deploys dist/ to GitHub Pages on pushes to main. Repository Settings > Pages uses GitHub Actions. Asset URLs are relative so the site works under the repository subpath. Google Fonts needs internet.

## Editing
Main source: index.html. Preserve the 18 projects, original artwork, editorial layout, blue accent, animation, and reduced-motion behavior. Historical pixel-room files are no longer part of the deployment.
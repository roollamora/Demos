#!/bin/bash

# Simple script to prepare files for deployment
# No interactive prompts - just copies files

echo "📦 Preparing files for GitHub Pages deployment..."

# Copy dashboard files to root
cp -r project-dashboard-web/* .

# Create .nojekyll file
touch .nojekyll

echo "✅ Files prepared!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Run these commands:"
echo ""
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Deploy dashboard'"
echo "   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages in repository Settings → Pages"
echo ""
echo "🔐 Password: @ntiDictatorNeverDie5"

#!/bin/bash

# Deploy Digital Democracy Dashboard to GitHub Pages
# Password: @ntiDictatorNeverDie5

echo "🚀 Deploying Digital Democracy Dashboard to GitHub Pages"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo ""
fi

# Check if we're in the right directory
if [ ! -d "project-dashboard-web" ]; then
    echo "❌ Error: project-dashboard-web folder not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Get GitHub username and repo name
echo "Please enter your GitHub username:"
read GITHUB_USER

echo "Please enter your repository name (e.g., democracy-dashboard):"
read REPO_NAME

echo ""
echo "📝 Configuration:"
echo "   GitHub User: $GITHUB_USER"
echo "   Repository: $REPO_NAME"
echo "   URL will be: https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

# Create a temporary branch for deployment
echo "🔧 Preparing deployment..."

# Copy dashboard files to root for GitHub Pages
cp -r project-dashboard-web/* .

# Create .nojekyll to prevent Jekyll processing
touch .nojekyll

# Add all files
git add .

# Commit
git commit -m "Deploy Digital Democracy Dashboard with password protection"

# Add remote if not exists
if ! git remote | grep -q origin; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo "2. Under 'Source', select 'Deploy from a branch'"
echo "3. Select 'main' branch and '/ (root)' folder"
echo "4. Click 'Save'"
echo ""
echo "🌐 Your dashboard will be live at:"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "🔐 Password: @ntiDictatorNeverDie5"
echo ""
echo "⏱️  Note: It may take 2-5 minutes for GitHub Pages to build and deploy."

# 🚀 Quick Start: Deploy to GitHub in 5 Minutes

## Password: `@ntiDictatorNeverDie5`

## Step-by-Step Guide

### 1. Create GitHub Repository (1 minute)

1. Go to https://github.com/new
2. Repository name: `democracy-dashboard` (or any name you want)
3. Description: "Digital Democracy Project Dashboard"
4. Choose Public or Private
5. **Don't** check "Add a README file"
6. Click "Create repository"

### 2. Deploy from Terminal (2 minutes)

Open terminal in your project folder and run:

```bash
# Copy dashboard files to root
cp -r project-dashboard-web/* .

# Create .nojekyll file
touch .nojekyll

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Deploy dashboard"

# Add your GitHub repo (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages (1 minute)

1. Go to your repository on GitHub
2. Click `Settings` (top menu)
3. Click `Pages` (left sidebar)
4. Under "Source":
   - Select `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Click `Save`

### 4. Access Your Dashboard (1 minute)

1. Wait 2-5 minutes for GitHub to build
2. Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO/`
3. You'll see a login page
4. Enter password: `@ntiDictatorNeverDie5`
5. Click "Access Dashboard"
6. You're in! 🎉

## 🎯 What You Get

- ✅ Password-protected dashboard
- ✅ 119 subtasks with checkboxes
- ✅ Interactive network graph
- ✅ Progress tracking
- ✅ Auto-save to browser
- ✅ Export to CSV
- ✅ 24-hour login session
- ✅ Logout button

## 🔐 Security

- Password: `@ntiDictatorNeverDie5`
- Session: 24 hours
- Logout: Click logout button in top right

## 📱 Share with Team

Send them:
1. URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/`
2. Password: `@ntiDictatorNeverDie5`

## 🔧 Update Dashboard

To make changes:

```bash
# Edit files in project-dashboard-web/
# Then:
cp -r project-dashboard-web/* .
git add .
git commit -m "Update dashboard"
git push origin main
# Wait 2-5 minutes for changes to appear
```

## 🆘 Troubleshooting

**Can't access dashboard?**
- Wait 5 minutes after pushing
- Check GitHub Pages is enabled
- Try hard refresh: Ctrl+Shift+R

**Password not working?**
- Use exactly: `@ntiDictatorNeverDie5`
- No extra spaces
- Case-sensitive

**Need help?**
- Check GITHUB-DEPLOYMENT.md for detailed instructions
- Check browser console (F12) for errors

---

**That's it!** Your password-protected dashboard is now live on GitHub Pages.

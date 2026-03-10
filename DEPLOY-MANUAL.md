# 🚀 Manual Deployment to GitHub Pages

## Password: `@ntiDictatorNeverDie5`

## Simple Copy-Paste Commands

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `democracy-dashboard` (or your choice)
3. Make it Public
4. **Don't** check any boxes
5. Click "Create repository"
6. **Copy the repository URL** (looks like: `https://github.com/YOUR-USERNAME/democracy-dashboard.git`)

### Step 2: Run These Commands

Open a **NEW terminal window** and run these commands one by one:

```bash
# Navigate to your project folder
cd ~/Projects/parcham

# Copy dashboard files to root
cp -r project-dashboard-web/* .

# Create .nojekyll file
touch .nojekyll

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Deploy Digital Democracy Dashboard"

# Add your GitHub repository (REPLACE WITH YOUR URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important**: Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual GitHub username and repository name!

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

### Step 4: Access Your Dashboard

1. Wait 2-5 minutes for GitHub to build
2. GitHub will show you the URL (looks like: `https://YOUR-USERNAME.github.io/YOUR-REPO/`)
3. Visit that URL
4. You'll see a login page
5. Enter password: `@ntiDictatorNeverDie5`
6. Click "Access Dashboard"
7. Done! 🎉

## Example with Real Values

If your GitHub username is `roulla` and repo is `democracy-dashboard`:

```bash
cd ~/Projects/parcham
cp -r project-dashboard-web/* .
touch .nojekyll
git init
git add .
git commit -m "Deploy Digital Democracy Dashboard"
git remote add origin https://github.com/roulla/democracy-dashboard.git
git branch -M main
git push -u origin main
```

Your dashboard URL will be: `https://roulla.github.io/democracy-dashboard/`

## If You Get Errors

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

### "failed to push"
```bash
git push -u origin main --force
```

### "Permission denied"
You need to authenticate with GitHub. Options:
1. Use GitHub Desktop app (easier)
2. Set up SSH keys
3. Use personal access token

## Alternative: Use GitHub Desktop (Easier)

1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → New Repository
4. Name: `democracy-dashboard`
5. Local Path: Choose your `parcham` folder
6. Click "Create Repository"
7. Copy files: `cp -r project-dashboard-web/* .`
8. In GitHub Desktop, you'll see changes
9. Write commit message: "Deploy dashboard"
10. Click "Commit to main"
11. Click "Publish repository"
12. Go to GitHub.com → Settings → Pages
13. Enable Pages (main branch, root folder)

## What You Get

- ✅ Password-protected dashboard
- ✅ 119 subtasks with tracking
- ✅ Interactive network graph
- ✅ Auto-save progress
- ✅ Export to CSV
- ✅ 24-hour login session

## Share with Team

Send them:
- **URL**: `https://YOUR-USERNAME.github.io/YOUR-REPO/`
- **Password**: `@ntiDictatorNeverDie5`

---

**Need help?** Open a new terminal window and try the commands above one at a time.

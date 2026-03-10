# 🚀 Deploy to GitHub Pages with Password Protection

## Password: `@ntiDictatorNeverDie5`

## Quick Deploy (Automated)

### Option 1: Using the Deploy Script

```bash
./deploy-to-github.sh
```

Follow the prompts to enter your GitHub username and repository name.

### Option 2: Manual Deployment

1. **Create a new GitHub repository**
   - Go to https://github.com/new
   - Name it (e.g., `democracy-dashboard`)
   - Make it Public or Private (both work with GitHub Pages)
   - Don't initialize with README

2. **Deploy from terminal**

```bash
# Initialize git (if not already done)
git init

# Copy dashboard files to root
cp -r project-dashboard-web/* .

# Create .nojekyll file (prevents Jekyll processing)
touch .nojekyll

# Add all files
git add .

# Commit
git commit -m "Deploy Digital Democracy Dashboard"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Under "Source", select `Deploy from a branch`
   - Select `main` branch and `/ (root)` folder
   - Click `Save`

4. **Access your dashboard**
   - Wait 2-5 minutes for deployment
   - Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO/`
   - Enter password: `@ntiDictatorNeverDie5`

## 🔐 How Password Protection Works

### Client-Side Authentication
- Password is checked in the browser using JavaScript
- No server-side authentication (GitHub Pages is static hosting)
- Session stored in browser for 24 hours
- Logout button clears session

### Security Notes
- ⚠️ This is **basic protection** suitable for low-security scenarios
- Password is visible in source code (obfuscated but not encrypted)
- For high-security needs, use a backend service or private repository

### Files Structure
```
project-dashboard-web/
├── index.html          # Redirects to auth.html
├── auth.html           # Login page with password check
├── dashboard.html      # Main dashboard (requires auth)
├── styles.css          # Styling
├── data.js             # All 119 subtasks
├── app.js              # Application logic
└── .nojekyll           # Prevents Jekyll processing
```

## 🎯 What Users See

1. **First Visit**: Redirected to login page
2. **Enter Password**: `@ntiDictatorNeverDie5`
3. **Access Dashboard**: Full dashboard with both tabs
4. **Session**: Stays logged in for 24 hours
5. **Logout**: Click logout button to end session

## 🔧 Customization

### Change Password

Edit `project-dashboard-web/auth.html`, line 95:

```javascript
if (password === '@ntiDictatorNeverDie5') {
```

Change to your new password:

```javascript
if (password === 'YourNewPassword123') {
```

### Change Session Duration

Edit `project-dashboard-web/auth.html`, line 109:

```javascript
if (now - authTime < 24 * 60 * 60 * 1000) {  // 24 hours
```

Change to desired duration (in milliseconds):
- 1 hour: `1 * 60 * 60 * 1000`
- 12 hours: `12 * 60 * 60 * 1000`
- 7 days: `7 * 24 * 60 * 60 * 1000`

## 🌐 Alternative Hosting Options

### Netlify (with better password protection)

1. Go to https://app.netlify.com/drop
2. Drag `project-dashboard-web` folder
3. Go to Site Settings → Access Control
4. Enable password protection (paid feature)

### Vercel (with better password protection)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `cd project-dashboard-web && vercel`
3. Add password protection via Vercel dashboard (paid feature)

### Private GitHub Repository

1. Make repository private
2. Only invited collaborators can access
3. No password needed (GitHub authentication)

## 📊 What's Included

- ✅ 119 subtasks from Detailed-Task-Breakdown.md
- ✅ Status tracking with checkboxes
- ✅ Network graph visualization
- ✅ Password protection
- ✅ 24-hour session
- ✅ Logout functionality
- ✅ Mobile responsive
- ✅ Auto-save progress

## 🆘 Troubleshooting

**Dashboard not loading?**
- Wait 5 minutes after pushing to GitHub
- Check GitHub Pages is enabled in Settings
- Verify `.nojekyll` file exists
- Check browser console for errors

**Password not working?**
- Ensure you're using: `@ntiDictatorNeverDie5`
- Check for extra spaces
- Try different browser
- Clear browser cache

**Changes not showing?**
- GitHub Pages caching can take 5-10 minutes
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

**Want to update dashboard?**
```bash
# Make changes to files
git add .
git commit -m "Update dashboard"
git push origin main
# Wait 2-5 minutes for GitHub Pages to rebuild
```

## 🔒 Security Recommendations

For production use with sensitive data:

1. **Use Private Repository** - Only invited users can access
2. **Use Backend Authentication** - Deploy to Heroku/Railway with proper auth
3. **Use Netlify/Vercel Password Protection** - Paid feature, more secure
4. **Use VPN** - Restrict access to specific IP addresses
5. **Use OAuth** - Integrate with Google/GitHub authentication

## 📝 Notes

- GitHub Pages is free for public repositories
- GitHub Pages is free for private repositories (with GitHub Pro/Team)
- Custom domains supported (configure in Settings → Pages)
- HTTPS enabled by default
- No backend/database - all data in browser localStorage

---

**Ready to deploy?** Run `./deploy-to-github.sh` or follow manual steps above!

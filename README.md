# Digital Democracy Project Dashboard

A self-contained web application for tracking project progress with interactive visualizations.

## 📁 Files

- `index.html` - Main HTML structure
- `styles.css` - All styling
- `data.js` - Project data (27 tasks across 6 milestones)
- `app.js` - Application logic and D3.js network graph
- `README.md` - This file

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a new GitHub repository
2. Upload all files from this folder
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your site will be live at: `https://yourusername.github.io/repo-name/`

### Option 2: Netlify (Free)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this entire folder
3. Your site will be live instantly with a URL like: `https://random-name.netlify.app`
4. Optional: Configure custom domain

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Import this folder or connect GitHub repo
3. Deploy with one click
4. Live at: `https://your-project.vercel.app`

### Option 4: Any Web Host

Upload all files to any web hosting service (shared hosting, VPS, etc.) and access via your domain.

## 💻 Local Testing

Open `index.html` directly in your browser, or run a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## ✨ Features

### Status & Checklist Tab
- 27 tasks across 6 milestones
- Real-time progress tracking
- Task status management (Not Started / In Progress / Completed)
- Search and filter capabilities
- Project velocity and completion projections
- Auto-save to browser localStorage
- Export to CSV

### Network Graph Tab
- Interactive D3.js visualization
- Tasks as circles (nodes) connected by lines (edges)
- Direct dependencies (solid lines) and indirect connections (dotted lines)
- Color-coded by milestone
- Critical path highlighted with red borders
- Drag nodes, zoom, pan
- Search and filter by milestone/agent
- Hover tooltips with task details

## 🔧 Customization

### Adding/Editing Tasks

Edit `data.js` and modify the `PROJECT_DATA` object:

```javascript
{
    id: "1.5",
    name: "New Task",
    agent: "DEV",
    hours: 20,
    week: 2,
    critical: false,
    status: "not-started",
    dependencies: ["1.1", "1.2"]
}
```

### Changing Colors

Edit `data.js` milestone colors or modify `styles.css` for theme changes.

### Changing Start Date

Edit `startDate` in `data.js`:

```javascript
startDate: "2026-03-10"
```

## 📊 Data Persistence

Progress is automatically saved to browser localStorage. Data persists across sessions but is browser-specific. Use "Export CSV" for backups.

## 🌐 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design

## 📝 Notes

- No backend required - fully client-side
- No build process needed
- Works offline after first load
- D3.js loaded from CDN (requires internet for first load)

## 🔒 Privacy

All data stays in your browser. Nothing is sent to external servers except the D3.js library CDN.

## 📄 License

Free to use and modify for your project.

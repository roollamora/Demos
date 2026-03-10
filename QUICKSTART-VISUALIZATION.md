# Quick Start - WBS Visualizations

## Problem: "wbs-complete-network.html not accessible"

This happens because browsers block loading external JavaScript files from local HTML files for security reasons.

## Solution: Use Local Web Server

### Option 1: Use the provided script (Easiest)

```bash
./serve-visualization.sh
```

Then open your browser to:
- **Complete Network:** http://localhost:8000/wbs-complete-network.html
- **Simple Network:** http://localhost:8000/wbs-network-graph.html  
- **Timeline Dashboard:** http://localhost:8000/wbs-visualization.html

### Option 2: Manual Python server

```bash
python3 -m http.server 8000
```

Then navigate to: http://localhost:8000/

### Option 3: Use simple visualizations (No server needed)

These work by double-clicking:
- `wbs-network-graph.html` - Simple network (25 parent tasks)
- `wbs-visualization.html` - Timeline dashboard

## Which Visualization Should I Use?

### For Quick Overview
✅ **Use:** `wbs-network-graph.html`
- Double-click to open (no server needed)
- Shows 25 parent tasks
- Fast and simple

### For Detailed Analysis
✅ **Use:** `wbs-complete-network.html` (requires server)
- Shows all 380+ subtasks
- Direct and indirect connections
- Most comprehensive view

### For Timeline View
✅ **Use:** `wbs-visualization.html`
- Double-click to open (no server needed)
- Gantt chart style
- Filter by milestone

### For Professional Reports
✅ **Use:** Tableau files
- Import `tableau-tasks.csv` into Tableau
- Create custom dashboards
- Export to PDF

## Troubleshooting

### "Connection refused" or "Cannot connect"
- Make sure the server is running (`./serve-visualization.sh`)
- Check that port 8000 is not in use
- Try a different port: `python3 -m http.server 8080`

### "Page is blank" or "No data"
- Check browser console for errors (F12 or Cmd+Option+I)
- Verify `wbs-complete-data.js` exists in the same directory
- Try refreshing the page (Cmd+R or Ctrl+R)

### "Script doesn't execute"
- Make it executable: `chmod +x serve-visualization.sh`
- Or run directly: `bash serve-visualization.sh`

### "Python not found"
- Install Python 3: `brew install python3`
- Or use Python 2: `python -m SimpleHTTPServer 8000`

## Quick Commands

```bash
# Start server
./serve-visualization.sh

# Stop server
# Press Ctrl+C in the terminal

# Regenerate data
python3 generate-complete-network-data.py

# Convert to PDF
./convert-planning-docs-to-pdf.sh
```

## File Overview

| File | Purpose | Requires Server? |
|------|---------|------------------|
| `wbs-complete-network.html` | All 380+ tasks with dependencies | ✅ Yes |
| `wbs-network-graph.html` | Simple 25-task overview | ❌ No |
| `wbs-visualization.html` | Timeline dashboard | ❌ No |
| `wbs-complete-data.js` | Data file for complete network | N/A |
| `serve-visualization.sh` | Start local server | N/A |

## Next Steps

1. **Start the server:** `./serve-visualization.sh`
2. **Open browser:** http://localhost:8000/wbs-complete-network.html
3. **Explore:** Use filters and controls to navigate
4. **Share:** Send HTML files to team (they'll need to run server too)

## Alternative: Host on Web Server

If you want to share with team without everyone running a local server:

1. Upload files to web server (GitHub Pages, Netlify, etc.)
2. Share the URL
3. Everyone can access without local setup

### GitHub Pages Example:
```bash
# Create gh-pages branch
git checkout -b gh-pages

# Add visualization files
git add *.html *.js *.css

# Commit and push
git commit -m "Add WBS visualizations"
git push origin gh-pages

# Access at: https://yourusername.github.io/yourrepo/wbs-complete-network.html
```

---

**Still having issues?** Check the full README-VISUALIZATION.md for detailed troubleshooting.

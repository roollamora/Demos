# Project Status Page Guide

## Quick Start

Simply **double-click** `status.html` or run:
```bash
open status.html
```

The page works completely offline - no server needed!

## Features

### Real-Time Statistics
- Total tasks, completed tasks, in-progress tasks
- Total hours and completed hours
- Updates automatically as you change task status

### Task Management
- **Checkbox**: Quick toggle between Not Started ↔ Completed
- **Status Dropdown**: Choose from Not Started / In Progress / Completed
- **Color Coding**:
  - Blue border = Normal task
  - Red border = Critical path task
  - Faded = Completed task
  - Pink border = In progress task

### Search & Filter
- **Search box**: Find tasks by ID or name
- **Status filter**: Show only tasks with specific status

### Project Projection
- **Progress bar**: Visual representation of completion
- **Estimated completion date**: Based on current velocity
- **Days remaining**: Calculated from current progress
- **Velocity**: Hours completed per week
- **On track indicator**: Shows if project is on schedule (12 weeks total)

### Data Persistence
- **Save Progress**: Saves to browser localStorage (automatic on changes)
- **Export CSV**: Download current status as CSV file
- **Reset All**: Clear all progress and start fresh

## How It Works

1. **27 parent tasks** across 6 milestones (Foundation, Platform Customization, Cryptographic Voting, Censorship Resistance, Security & Testing, Documentation & Launch)

2. **Each task shows**:
   - Task ID (e.g., 1.1, 2.3)
   - Task name
   - Agent responsible (DEV, ARCH, CRYPTO, etc.)
   - Estimated hours
   - Status dropdown

3. **Progress tracking**:
   - Changes are saved automatically to browser localStorage
   - Reload the page anytime - your progress persists
   - Export to CSV for external tracking

4. **Projection calculation**:
   - Tracks weeks elapsed since start date (March 10, 2026)
   - Calculates velocity (hours completed per week)
   - Projects completion date based on remaining hours and current velocity
   - Compares against 12-week target timeline

## Tips

- Mark tasks as "In Progress" when you start them
- Mark as "Completed" when done
- Use the search to quickly find specific tasks
- Export CSV regularly for backup
- Critical path tasks (red border) are essential for timeline

## Troubleshooting

**Page doesn't load?**
- Make sure you're opening `status.html` (not the old `project-status.html`)
- Try a different browser (Chrome, Firefox, Safari)
- Check browser console for errors (F12 or Cmd+Option+I)

**Progress not saving?**
- Click "Save Progress" button manually
- Check if browser allows localStorage
- Try exporting to CSV as backup

**Need to add/remove tasks?**
- Edit the `PROJECT_DATA` object in the `<script>` section of `status.html`
- Follow the existing task format
- Save and reload the page

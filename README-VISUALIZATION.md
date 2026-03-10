# WBS Visualization Guide

## Available Visualization Formats

I've created multiple formats for visualizing the Work Breakdown Structure:

### 1. **Network Graph - Task Dependencies** (⭐ NEW - Recommended)
**File:** `wbs-network-graph.html`

**Features:**
- Tasks as circles (nodes) sized by hours
- Dependencies as connecting lines (edges)
- Agent and time information on connections
- Interactive drag-and-drop nodes
- Zoom and pan
- Filter by milestone, agent, or critical path
- Click nodes for detailed information
- Color-coded by milestone
- Real-time statistics

**How to Use:**
```bash
open wbs-network-graph.html
```

**Interactions:**
- **Drag nodes** to rearrange the graph
- **Click nodes** to see task details
- **Zoom** with mouse wheel or trackpad
- **Pan** by dragging the background
- **Filter** using controls on the left
- **Hover** over connections to see agent and hours

**What You'll See:**
- Circles = Tasks (color = milestone, size = hours)
- Lines = Dependencies (thickness = critical path)
- Labels on lines = Agent + Hours
- Red borders = Critical path tasks

---

### 2. **Interactive HTML Dashboard** (Timeline View)
**File:** `wbs-visualization.html`

**Features:**
- Interactive Gantt chart
- Filterable task list (all tasks, critical path, by milestone)
- Color-coded milestones
- Real-time statistics
- Mobile responsive

**How to Use:**
```bash
open wbs-visualization.html
```
Or double-click the file in Finder.

---

### 3. **CSV for Excel/Google Sheets**
**File:** `wbs-tasks.csv`

**Features:**
- 115 tasks with all details
- Import into Excel, Google Sheets, or Numbers
- Sortable and filterable columns
- Ready for pivot tables

**How to Use:**
1. Open Excel or Google Sheets
2. File > Import > Select `wbs-tasks.csv`
3. Create pivot tables for analysis
4. Use conditional formatting for critical path

**Columns:**
- Task_ID, Task_Name, Milestone
- Week_Start, Week_End, Duration_Days
- Agent_Vector, Critical_Path
- Dependencies, Estimated_Hours
- Parallel_Group, Status

---

### 4. **Tableau Data Files** (Best for Advanced Visualization)
**Files:** 
- `tableau-tasks.csv` - Task hierarchy with dates
- `tableau-agents.csv` - Agent workload distribution
- `tableau-timeline.csv` - Week-by-week breakdown

**How to Use:**

#### Step 1: Import into Tableau
```
1. Open Tableau Desktop
2. Connect to Data > Text File
3. Select tableau-tasks.csv
4. Add tableau-agents.csv as additional data source
5. Add tableau-timeline.csv as additional data source
```

#### Step 2: Create Relationships
```
- Link tableau-tasks to tableau-agents via Agent_Vector
- Link tableau-tasks to tableau-timeline via Week_Start
```

#### Step 3: Recommended Visualizations

**A. Gantt Chart (Timeline View)**
- Rows: Task_Name
- Columns: Start_Date (continuous)
- Color: Milestone
- Size: Estimated_Hours
- Filter: Critical_Path = Yes (optional)

**B. Agent Workload (Resource Allocation)**
- Rows: Agent
- Columns: Total_Hours
- Color: Critical_Hours vs Non-Critical
- Add reference line for average

**C. Critical Path Highlight**
- Rows: Task_ID
- Columns: Week_Start to Week_End
- Color: Critical_Path (Red for Yes, Gray for No)
- Filter: Show only critical tasks

**D. Milestone Progress**
- Rows: Milestone
- Columns: Status (Not Started, In Progress, Complete)
- Color: Status
- Size: Count of Tasks

**E. Weekly Workload**
- Rows: Week
- Columns: Estimated_Hours
- Color: Milestone
- Add trend line

---

### 5. **JSON Data** (For Programmatic Use)
**File:** `wbs-data.json`

**Features:**
- Structured data for custom applications
- Import into JavaScript visualizations
- Use with D3.js, Chart.js, or custom tools

**Structure:**
```json
{
  "project": { ... },
  "tasks": [ ... ],
  "agents": [ ... ],
  "timeline": [ ... ]
}
```

**How to Use:**
```javascript
// Load in JavaScript
fetch('wbs-data.json')
  .then(response => response.json())
  .then(data => {
    // Create custom visualizations
    console.log(data.tasks);
  });
```

---

## Visualization Recommendations by Use Case

### For Project Managers
✅ **Use:** Interactive HTML Dashboard + Tableau
- Quick overview of timeline
- Filter by critical path
- Track progress by milestone

### For Developers
✅ **Use:** CSV in Excel/Google Sheets
- Sort by agent to see your tasks
- Filter by week to see current work
- Track hours and dependencies

### For Stakeholders
✅ **Use:** Tableau Dashboards
- Professional visualizations
- Export to PDF for presentations
- Interactive exploration

### For Technical Teams
✅ **Use:** JSON + Custom Tools
- Integrate with project management software
- Build custom dashboards
- Automate reporting

---

## Quick Start Examples

### Excel Pivot Table
1. Open `wbs-tasks.csv` in Excel
2. Insert > PivotTable
3. Rows: Milestone, Task_Name
4. Values: Sum of Estimated_Hours
5. Filter: Critical_Path = Yes

### Google Sheets Gantt Chart
1. Import `wbs-tasks.csv`
2. Select columns: Task_Name, Week_Start, Week_End
3. Insert > Chart > Timeline chart
4. Customize colors by Milestone

### Tableau Quick Dashboard
1. Import `tableau-tasks.csv`
2. Drag Start_Date to Columns
3. Drag Task_Name to Rows
4. Drag Milestone to Color
5. Right-click Start_Date > Gantt Bar

---

## Regenerating Data

If you need to update the data:

```bash
# Regenerate Tableau files
python3 generate-tableau-script.py

# This creates:
# - tableau-tasks.csv
# - tableau-agents.csv
# - tableau-timeline.csv
# - wbs-data.json
```

---

## Visualization Tips

### Color Coding
- 🔴 Red: Critical path tasks
- 🟢 Green: Completed tasks
- 🟡 Yellow: In progress
- ⚪ Gray: Not started

### Filtering Strategies
1. **By Week:** Focus on current sprint
2. **By Agent:** See individual workload
3. **By Critical Path:** Identify bottlenecks
4. **By Milestone:** Track phase progress

### Key Metrics to Track
- **Critical Path Duration:** 10 weeks
- **Total Hours:** 2,370 hours
- **Parallel Streams:** 6 concurrent work streams
- **Team Size:** 2-7 agents (depending on volunteers)

---

## Troubleshooting

### CSV not opening correctly
- Ensure UTF-8 encoding
- Use "Import" instead of "Open"
- Check delimiter is comma (,)

### Tableau relationships not working
- Verify field names match exactly
- Check data types (dates, numbers, text)
- Use "Edit Relationships" to manually link

### HTML dashboard not loading
- Open in modern browser (Chrome, Firefox, Safari)
- Check JavaScript is enabled
- View in browser, not text editor

---

## Next Steps

1. **Choose your visualization tool** based on use case
2. **Import the data** using instructions above
3. **Create dashboards** for your team
4. **Share visualizations** with stakeholders
5. **Update regularly** as project progresses

---

## Questions?

For custom visualizations or additional formats, let me know what tool you prefer:
- Power BI
- Notion
- Monday.com
- Jira
- Asana
- Custom web dashboard

I can generate compatible formats for any project management tool!


---

## Complete Network Graph (All Subtasks)

### File: `wbs-complete-network.html`

This is the most comprehensive visualization showing ALL 380+ subtasks with their dependencies.

**Features:**
- **All subtasks included** (not just parent tasks)
- **Two types of connections:**
  - **Solid lines** = Direct dependencies (task A must finish before B starts)
  - **Dotted lines** = Indirect connections (same agent, related work, data flow)
- **Interactive controls:**
  - Search tasks by ID or name
  - Filter by milestone or agent
  - Toggle connection types (direct/indirect/critical)
  - Adjust node size and force strength
  - Zoom and pan
- **Hierarchical structure:**
  - Larger circles = Parent tasks
  - Smaller circles = Subtasks
  - Color = Milestone
  - Red border = Critical path

**How to Use:**

Due to browser security restrictions with loading external JavaScript files, you need to serve the files via a local web server:

```bash
./serve-visualization.sh
```

Then open your browser to: `http://localhost:8000/wbs-complete-network.html`

**Alternative (if script doesn't work):**
```bash
python3 -m http.server 8000
```
Then navigate to: `http://localhost:8000/wbs-complete-network.html`

**Understanding the Graph:**

1. **Nodes (Circles)**
   - Size: Larger = parent task, smaller = subtask
   - Color: Milestone (6 colors)
   - Border: Red = critical path, white = normal

2. **Connections (Lines)**
   - Solid line = Direct dependency (must complete first)
   - Dotted line = Indirect connection (same agent, related work)
   - Thick red line = Critical path dependency
   - Labels show: Agent + Hours

3. **Interactions**
   - **Drag nodes** to rearrange
   - **Click nodes** for detailed info
   - **Search** to find specific tasks
   - **Filter** to focus on specific areas
   - **Zoom** to see details or overview

**Performance Note:**
With 380+ tasks and connections, the initial layout may take a few seconds. Use filters to focus on specific milestones or agents for better performance.

**Regenerating Data:**
If you need to update the task data:
```bash
python3 generate-complete-network-data.py
```

This regenerates `wbs-complete-data.js` with the latest task information.

---

## Comparison of Visualizations

| Feature | Network Graph (Simple) | Complete Network | Timeline Dashboard | Tableau |
|---------|----------------------|------------------|-------------------|---------|
| **Tasks Shown** | 25 parent tasks | 380+ all tasks | 115 tasks | Customizable |
| **Dependencies** | Direct only | Direct + Indirect | None | Customizable |
| **Interactivity** | High | Very High | Medium | Very High |
| **Best For** | Quick overview | Detailed analysis | Timeline view | Professional reports |
| **Load Time** | Instant | 2-3 seconds | Instant | Depends on data |
| **Complexity** | Low | High | Medium | Medium-High |

---

## Tips for Using Complete Network Graph

### 1. Start with Filters
Don't try to view all 380+ tasks at once. Start with:
- Single milestone view
- Critical path only
- Specific agent

### 2. Use Search
Type task IDs or keywords to highlight specific tasks:
- "2.4" = All biometric tasks
- "Helios" = All Helios-related tasks
- "DEV" = All development tasks

### 3. Understand Connection Types
- **Solid lines** = "This task MUST complete before the next one"
- **Dotted lines** = "These tasks are related (same agent, similar work)"
- Use checkboxes to toggle connection types

### 4. Adjust Layout
- Increase "Force Strength" to spread nodes apart
- Increase "Link Distance" for more space
- Decrease "Node Size" to fit more on screen

### 5. Focus on Critical Path
- Check "Critical Path Only" to see the longest chain
- These tasks determine project duration
- Any delay here delays the entire project

---

## Exporting Visualizations

### Save as Image
1. Open the HTML file in browser
2. Right-click on the visualization
3. "Save Image As..." or take screenshot
4. Use for presentations or documentation

### Print to PDF
1. Open HTML file
2. File > Print
3. Select "Save as PDF"
4. Adjust margins and scale

### Share Interactive Version
1. Host HTML files on web server
2. Share URL with team
3. Everyone can interact with live data
4. No installation required

---

## Troubleshooting

### Graph is too crowded
- Use milestone filters to show one section at a time
- Increase force strength to spread nodes
- Hide indirect connections
- Zoom in to focus on specific area

### Nodes overlap
- Drag nodes manually to separate them
- Increase collision force
- Reduce node size
- Filter to show fewer tasks

### Performance is slow
- Filter to show fewer tasks (< 100 recommended)
- Hide indirect connections
- Use parent tasks view instead of all subtasks
- Close other browser tabs

### Can't find specific task
- Use search box (top of controls)
- Type task ID (e.g., "3.2.1")
- Type task name (e.g., "Helios")
- Matching tasks will be highlighted

---

## Next Steps

1. **Explore the visualizations** - Try each one to see which fits your needs
2. **Share with team** - Send HTML files or host on web server
3. **Use for planning** - Identify dependencies and critical path
4. **Track progress** - Update task status and regenerate
5. **Present to stakeholders** - Export images or PDFs for reports

The complete network graph is particularly useful for:
- Understanding task dependencies
- Identifying parallel work opportunities
- Seeing how agent workload is distributed
- Finding bottlenecks in the critical path
- Planning resource allocation

Enjoy exploring your project structure! 🚀

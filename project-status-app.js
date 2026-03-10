// Project Status Application Logic

let projectData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderMilestones();
    updateStats();
    updateProjection();
});

// Load data from localStorage or use default
function loadData() {
    const saved = localStorage.getItem('projectStatus');
    if (saved) {
        projectData = JSON.parse(saved);
    } else {
        projectData = window.PROJECT_DATA;
    }
}

// Save data to localStorage
function saveProgress() {
    localStorage.setItem('projectStatus', JSON.stringify(projectData));
    alert('✅ Progress saved!');
}

// Render all milestones
function renderMilestones() {
    const container = document.getElementById('milestones');
    container.innerHTML = '';
    
    projectData.milestones.forEach(milestone => {
        const milestoneEl = document.createElement('div');
        milestoneEl.className = 'milestone';
        milestoneEl.innerHTML = `
            <div class="milestone-header" style="background: ${milestone.color};" onclick="toggleMilestone(${milestone.id})">
                <div>
                    <strong>Milestone ${milestone.id}: ${milestone.name}</strong>
                    <span style="opacity: 0.8; margin-left: 15px;">Weeks ${milestone.weeks}</span>
                </div>
                <div>${milestone.tasks.length} tasks</div>
            </div>
            <div class="milestone-content" id="milestone-${milestone.id}">
                ${milestone.tasks.map(task => renderTask(task, milestone.id)).join('')}
                <button class="btn btn-primary" style="margin-top: 15px;" onclick="showAddTaskForm(${milestone.id})">+ Add Task</button>
                <div class="add-task-form" id="add-task-form-${milestone.id}">
                    <div class="form-grid">
                        <input type="text" id="new-task-id-${milestone.id}" placeholder="Task ID (e.g., ${milestone.id}.${milestone.tasks.length + 1})">
                        <input type="text" id="new-task-name-${milestone.id}" placeholder="Task Name">
                        <input type="text" id="new-task-agent-${milestone.id}" placeholder="Agent (e.g., DEV)">
                        <input type="number" id="new-task-hours-${milestone.id}" placeholder="Hours">
                        <input type="number" id="new-task-week-${milestone.id}" placeholder="Week">
                        <select id="new-task-critical-${milestone.id}">
                            <option value="false">Normal</option>
                            <option value="true">Critical</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary" onclick="addTask(${milestone.id})">Add Task</button>
                    <button class="btn" onclick="hideAddTaskForm(${milestone.id})">Cancel</button>
                </div>
            </div>
        `;
        container.appendChild(milestoneEl);
    });
}

// Render single task
function renderTask(task, milestoneId) {
    const statusClass = task.status.replace('-', '');
    return `
        <div class="task ${statusClass} ${task.critical ? 'critical' : ''}" data-task-id="${task.id}" data-milestone="${milestoneId}">
            <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}', ${milestoneId})">
            <div class="task-id">${task.id}</div>
            <div class="task-name">${task.name}</div>
            <div class="task-agent">${task.agent}</div>
            <div class="task-hours">${task.hours}h</div>
            <select class="task-status status-${task.status}" onchange="changeTaskStatus('${task.id}', ${milestoneId}, this.value)">
                <option value="not-started" ${task.status === 'not-started' ? 'selected' : ''}>Not Started</option>
                <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
            <button class="delete-btn" onclick="deleteTask('${task.id}', ${milestoneId})">×</button>
        </div>
    `;
}

// Toggle milestone visibility
function toggleMilestone(id) {
    const content = document.getElementById(`milestone-${id}`);
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

// Toggle task status via checkbox
function toggleTaskStatus(taskId, milestoneId) {
    const milestone = projectData.milestones.find(m => m.id === milestoneId);
    const task = milestone.tasks.find(t => t.id === taskId);
    task.status = task.status === 'completed' ? 'not-started' : 'completed';
    renderMilestones();
    updateStats();
    updateProjection();
}

// Change task status via dropdown
function changeTaskStatus(taskId, milestoneId, newStatus) {
    const milestone = projectData.milestones.find(m => m.id === milestoneId);
    const task = milestone.tasks.find(t => t.id === taskId);
    task.status = newStatus;
    renderMilestones();
    updateStats();
    updateProjection();
}

// Show add task form
function showAddTaskForm(milestoneId) {
    document.getElementById(`add-task-form-${milestoneId}`).classList.add('active');
}

// Hide add task form
function hideAddTaskForm(milestoneId) {
    document.getElementById(`add-task-form-${milestoneId}`).classList.remove('active');
}

// Add new task
function addTask(milestoneId) {
    const id = document.getElementById(`new-task-id-${milestoneId}`).value;
    const name = document.getElementById(`new-task-name-${milestoneId}`).value;
    const agent = document.getElementById(`new-task-agent-${milestoneId}`).value;
    const hours = parseInt(document.getElementById(`new-task-hours-${milestoneId}`).value);
    const week = parseInt(document.getElementById(`new-task-week-${milestoneId}`).value);
    const critical = document.getElementById(`new-task-critical-${milestoneId}`).value === 'true';
    
    if (!id || !name || !agent || !hours || !week) {
        alert('Please fill all fields');
        return;
    }
    
    const milestone = projectData.milestones.find(m => m.id === milestoneId);
    milestone.tasks.push({
        id, name, agent, hours, week, critical,
        status: 'not-started',
        deps: []
    });
    
    hideAddTaskForm(milestoneId);
    renderMilestones();
    updateStats();
}

// Delete task
function deleteTask(taskId, milestoneId) {
    if (!confirm(`Delete task ${taskId}?`)) return;
    
    const milestone = projectData.milestones.find(m => m.id === milestoneId);
    milestone.tasks = milestone.tasks.filter(t => t.id !== taskId);
    
    renderMilestones();
    updateStats();
    updateProjection();
}

// Update statistics
function updateStats() {
    let totalTasks = 0;
    let completedTasks = 0;
    let inProgressTasks = 0;
    let totalHours = 0;
    let completedHours = 0;
    
    projectData.milestones.forEach(milestone => {
        milestone.tasks.forEach(task => {
            totalTasks++;
            totalHours += task.hours;
            if (task.status === 'completed') {
                completedTasks++;
                completedHours += task.hours;
            } else if (task.status === 'in-progress') {
                inProgressTasks++;
            }
        });
    });
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('inProgressTasks').textContent = inProgressTasks;
    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('completedHours').textContent = completedHours;
}

// Update project projection
function updateProjection() {
    let totalTasks = 0;
    let completedTasks = 0;
    let totalHours = 0;
    let completedHours = 0;
    
    projectData.milestones.forEach(milestone => {
        milestone.tasks.forEach(task => {
            totalTasks++;
            totalHours += task.hours;
            if (task.status === 'completed') {
                completedTasks++;
                completedHours += task.hours;
            }
        });
    });
    
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    document.getElementById('overallProgress').style.width = progress + '%';
    document.getElementById('overallProgress').textContent = progress + '%';
    
    // Calculate estimated completion
    const startDate = new Date(projectData.startDate);
    const today = new Date();
    const weeksElapsed = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));
    const velocity = weeksElapsed > 0 ? completedHours / weeksElapsed : 0;
    const remainingHours = totalHours - completedHours;
    const weeksRemaining = velocity > 0 ? Math.ceil(remainingHours / velocity) : 0;
    const estimatedCompletion = new Date(today.getTime() + weeksRemaining * 7 * 24 * 60 * 60 * 1000);
    
    document.getElementById('estimatedCompletion').textContent = estimatedCompletion.toLocaleDateString();
    document.getElementById('daysRemaining').textContent = weeksRemaining * 7;
    document.getElementById('velocity').textContent = velocity.toFixed(1);
    
    const plannedWeeks = 12;
    const onTrack = weeksRemaining <= (plannedWeeks - weeksElapsed);
    document.getElementById('onTrack').textContent = onTrack ? '✅ Yes' : '⚠️ Behind Schedule';
    document.getElementById('onTrack').style.color = onTrack ? '#43e97b' : '#f5576c';
}

// Filter tasks
function filterTasks() {
    const search = document.getElementById('searchBox').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;
    const milestone = document.getElementById('filterMilestone').value;
    
    document.querySelectorAll('.task').forEach(taskEl => {
        const taskId = taskEl.dataset.taskId;
        const taskMilestone = taskEl.dataset.milestone;
        const taskName = taskEl.querySelector('.task-name').textContent.toLowerCase();
        const taskStatus = taskEl.querySelector('.task-status').value;
        
        let show = true;
        
        if (search && !taskId.includes(search) && !taskName.includes(search)) {
            show = false;
        }
        
        if (status !== 'all' && taskStatus !== status) {
            show = false;
        }
        
        if (milestone !== 'all' && taskMilestone !== milestone) {
            show = false;
        }
        
        taskEl.style.display = show ? 'grid' : 'none';
    });
}

// Export data as CSV
function exportData() {
    let csv = 'Milestone,Task ID,Task Name,Agent,Hours,Week,Critical,Status\n';
    
    projectData.milestones.forEach(milestone => {
        milestone.tasks.forEach(task => {
            csv += `"${milestone.name}","${task.id}","${task.name}","${task.agent}",${task.hours},${task.week},${task.critical},${task.status}\n`;
        });
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-status-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
}

// Reset all data
function resetAll() {
    if (!confirm('Reset all progress? This cannot be undone.')) return;
    
    localStorage.removeItem('projectStatus');
    projectData = window.PROJECT_DATA;
    renderMilestones();
    updateStats();
    updateProjection();
}

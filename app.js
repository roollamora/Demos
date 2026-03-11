// Global state
let projectData = null;
let currentTab = 'status';
let svg, simulation, link, linkLabel, node, tooltip;
let graphData = { nodes: [], links: [] };

// Tab Switching
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'status') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.getElementById('status-view').classList.add('active');
    } else {
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('network-view').classList.add('active');
        if (!window.graphInitialized) {
            initGraph();
            window.graphInitialized = true;
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('projectStatus');
    projectData = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(PROJECT_DATA));
    renderMilestones();
    updateStats();
    updateProjection();
});

// ===== STATUS VIEW FUNCTIONS =====

function renderMilestones() {
    const container = document.getElementById('milestones');
    container.innerHTML = projectData.milestones.map(m => `
        <div class="milestone">
            <div class="milestone-header" style="background: ${m.color};">
                <div><strong>Milestone ${m.id}: ${m.name}</strong> <span style="opacity: 0.8; margin-left: 15px;">Weeks ${m.weeks}</span></div>
                <div>${m.tasks.length} tasks</div>
            </div>
            <div class="milestone-content">
                ${m.tasks.map(t => `
                    <div class="task ${t.status.replace('-', '')} ${t.critical ? 'critical' : ''}" data-task-id="${t.id}" data-milestone="${m.id}" data-ai="${t.aiCapability || 3}">
                        <input type="checkbox" ${t.status === 'completed' ? 'checked' : ''} onchange="toggleTask('${t.id}', ${m.id})">
                        <div class="task-id">${t.id}</div>
                        <div class="task-name">${t.name}</div>
                        <div class="task-agent">${t.agent}</div>
                        <div class="task-hours">${t.hours}h</div>
                        <div class="task-ai">
                            <span class="ai-rating ai-${t.aiCapability || 3}">${t.aiCapability || 3}</span>
                        </div>
                        <select class="task-status" onchange="changeStatus('${t.id}', ${m.id}, this.value)">
                            <option value="not-started" ${t.status === 'not-started' ? 'selected' : ''}>Not Started</option>
                            <option value="in-progress" ${t.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                            <option value="completed" ${t.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function toggleTask(taskId, milestoneId) {
    const m = projectData.milestones.find(x => x.id === milestoneId);
    const t = m.tasks.find(x => x.id === taskId);
    t.status = t.status === 'completed' ? 'not-started' : 'completed';
    renderMilestones();
    updateStats();
    updateProjection();
    saveProgress();
}

function changeStatus(taskId, milestoneId, newStatus) {
    const m = projectData.milestones.find(x => x.id === milestoneId);
    const t = m.tasks.find(x => x.id === taskId);
    t.status = newStatus;
    renderMilestones();
    updateStats();
    updateProjection();
    saveProgress();
}

function updateStats() {
    let total = 0, completed = 0, inProgress = 0, totalH = 0, completedH = 0;
    projectData.milestones.forEach(m => {
        m.tasks.forEach(t => {
            total++;
            totalH += t.hours;
            if (t.status === 'completed') { 
                completed++; 
                completedH += t.hours; 
            } else if (t.status === 'in-progress') {
                inProgress++;
            }
        });
    });
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('inProgressTasks').textContent = inProgress;
    document.getElementById('totalHours').textContent = totalH;
    document.getElementById('completedHours').textContent = completedH;
}

function updateProjection() {
    let total = 0, completed = 0, totalH = 0, completedH = 0;
    projectData.milestones.forEach(m => {
        m.tasks.forEach(t => {
            total++;
            totalH += t.hours;
            if (t.status === 'completed') { 
                completed++; 
                completedH += t.hours; 
            }
        });
    });
    
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById('overallProgress').style.width = progress + '%';
    document.getElementById('overallProgress').textContent = progress + '%';
    
    const start = new Date(projectData.startDate);
    const today = new Date();
    const weeksElapsed = Math.floor((today - start) / (7 * 24 * 60 * 60 * 1000));
    const velocity = weeksElapsed > 0 ? completedH / weeksElapsed : 0;
    const remainingH = totalH - completedH;
    const weeksRemaining = velocity > 0 ? Math.ceil(remainingH / velocity) : 0;
    const estimated = new Date(today.getTime() + weeksRemaining * 7 * 24 * 60 * 60 * 1000);
    
    document.getElementById('estimatedCompletion').textContent = estimated.toLocaleDateString();
    document.getElementById('daysRemaining').textContent = weeksRemaining * 7;
    document.getElementById('velocity').textContent = velocity.toFixed(1);
    
    const onTrack = weeksRemaining <= (12 - weeksElapsed);
    document.getElementById('onTrack').textContent = onTrack ? '✅ Yes' : '⚠️ Behind';
    document.getElementById('onTrack').style.color = onTrack ? '#43e97b' : '#f5576c';
}

function filterTasks() {
    const search = document.getElementById('searchBox').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;
    const aiLevel = document.getElementById('filterAI').value;
    document.querySelectorAll('.task').forEach(el => {
        const id = el.dataset.taskId;
        const name = el.querySelector('.task-name').textContent.toLowerCase();
        const taskStatus = el.querySelector('.task-status').value;
        const taskAI = el.dataset.ai;
        let show = true;
        if (search && !id.includes(search) && !name.includes(search)) show = false;
        if (status !== 'all' && taskStatus !== status) show = false;
        if (aiLevel !== 'all' && taskAI !== aiLevel) show = false;
        el.style.display = show ? 'grid' : 'none';
    });
}

function saveProgress() {
    localStorage.setItem('projectStatus', JSON.stringify(projectData));
}

function exportData() {
    let csv = 'Milestone,Task ID,Task Name,Agent,Hours,Week,Critical,Status\n';
    projectData.milestones.forEach(m => {
        m.tasks.forEach(t => {
            csv += `"${m.name}","${t.id}","${t.name}","${t.agent}",${t.hours},${t.week},${t.critical},${t.status}\n`;
        });
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-status-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
}

function resetAll() {
    if (!confirm('Reset all progress? This will clear all task statuses.')) return;
    localStorage.removeItem('projectStatus');
    projectData = JSON.parse(JSON.stringify(PROJECT_DATA));
    renderMilestones();
    updateStats();
    updateProjection();
}

// ===== NETWORK GRAPH FUNCTIONS =====

function initGraph() {
    // Prepare graph data
    graphData.nodes = [];
    graphData.links = [];
    
    projectData.milestones.forEach(m => {
        m.tasks.forEach(t => {
            graphData.nodes.push({
                id: t.id,
                name: t.name,
                agent: t.agent,
                hours: t.hours,
                milestone: m.id,
                milestoneName: m.name,
                color: m.color,
                critical: t.critical,
                status: t.status,
                dependencies: t.dependencies || []
            });
        });
    });

    // Create direct dependency links
    graphData.nodes.forEach(node => {
        node.dependencies.forEach(depId => {
            graphData.links.push({
                source: depId,
                target: node.id,
                type: 'direct',
                agent: node.agent,
                hours: node.hours
            });
        });
    });

    // Create indirect links (same agent, related work)
    graphData.nodes.forEach((n1, i) => {
        graphData.nodes.forEach((n2, j) => {
            if (i < j && n1.agent === n2.agent && Math.abs(n1.milestone - n2.milestone) <= 1) {
                // Check if not already connected
                const alreadyConnected = graphData.links.some(l => 
                    (l.source === n1.id && l.target === n2.id) || 
                    (l.source === n2.id && l.target === n1.id)
                );
                if (!alreadyConnected) {
                    graphData.links.push({
                        source: n1.id,
                        target: n2.id,
                        type: 'indirect',
                        agent: n1.agent,
                        hours: 0
                    });
                }
            }
        });
    });

    renderGraph();
}

function renderGraph() {
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear existing
    d3.select('#graph').selectAll('*').remove();

    svg = d3.select('#graph')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    // Create force simulation
    simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(40));

    // Create links
    link = g.append('g')
        .selectAll('line')
        .data(graphData.links)
        .enter().append('line')
        .attr('class', d => `link ${d.type}`)
        .style('stroke', d => d.type === 'direct' ? '#667eea' : '#aaa')
        .style('stroke-dasharray', d => d.type === 'direct' ? 'none' : '5,5')
        .style('stroke-opacity', d => d.type === 'direct' ? 0.6 : 0.3);

    // Create link labels
    linkLabel = g.append('g')
        .selectAll('text')
        .data(graphData.links.filter(d => d.type === 'direct'))
        .enter().append('text')
        .attr('class', 'link-label')
        .text(d => `${d.agent} (${d.hours}h)`);

    // Create nodes
    const nodeGroup = g.append('g')
        .selectAll('g')
        .data(graphData.nodes)
        .enter().append('g')
        .attr('class', d => `node ${d.critical ? 'critical' : ''}`)
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded))
        .on('mouseover', showTooltip)
        .on('mouseout', hideTooltip);

    nodeGroup.append('circle')
        .attr('r', 25)
        .attr('fill', d => d.color);

    nodeGroup.append('text')
        .attr('dy', 4)
        .text(d => d.id);

    node = nodeGroup;

    // Tooltip
    tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // Update positions on tick
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        linkLabel
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
}

function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function showTooltip(event, d) {
    tooltip.transition().duration(200).style('opacity', 1);
    tooltip.html(`
        <strong>${d.id}: ${d.name}</strong><br>
        Milestone: ${d.milestoneName}<br>
        Agent: ${d.agent}<br>
        Hours: ${d.hours}<br>
        Status: ${d.status}<br>
        Critical: ${d.critical ? 'Yes' : 'No'}
    `)
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY - 10) + 'px');
}

function hideTooltip() {
    tooltip.transition().duration(200).style('opacity', 0);
}

function searchGraph() {
    const query = document.getElementById('graphSearch').value.toLowerCase();
    node.style('opacity', d => {
        if (!query) return 1;
        return d.id.toLowerCase().includes(query) || d.name.toLowerCase().includes(query) ? 1 : 0.2;
    });
}

function filterGraph() {
    const milestone = document.getElementById('milestoneFilter').value;
    const agent = document.getElementById('agentFilter').value;
    const criticalOnly = document.getElementById('showCritical').checked;

    node.style('opacity', d => {
        let show = true;
        if (milestone !== 'all' && d.milestone !== parseInt(milestone)) show = false;
        if (agent !== 'all' && !d.agent.includes(agent)) show = false;
        if (criticalOnly && !d.critical) show = false;
        return show ? 1 : 0.1;
    });

    link.style('opacity', l => {
        const sourceNode = graphData.nodes.find(n => n.id === l.source.id);
        const targetNode = graphData.nodes.find(n => n.id === l.target.id);
        let show = true;
        if (milestone !== 'all' && sourceNode.milestone !== parseInt(milestone) && targetNode.milestone !== parseInt(milestone)) show = false;
        if (agent !== 'all' && !sourceNode.agent.includes(agent) && !targetNode.agent.includes(agent)) show = false;
        if (criticalOnly && !sourceNode.critical && !targetNode.critical) show = false;
        return show ? (l.type === 'direct' ? 0.6 : 0.3) : 0.05;
    });
}

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

// Curated indirect connections (19 cross-branch thematic relationships)
const INDIRECT_CONNECTIONS = [
    ["2.4.5","3.5.4","Both deal with privacy architecture — biometric privacy design should align with vote privacy policy"],
    ["2.4.4","5.2.4","Duplicate detection design directly affects duplicate detection testing accuracy thresholds"],
    ["2.4.2","5.2.2","Liveness detection implementation determines what video spoofing tests should target"],
    ["1.3.3","4.1.1","Tor hidden service config and Tor optimization share the same torrc — changes affect both"],
    ["2.2.3","3.5.2","Social vouching DB schema and identity-vote DB separation both affect user anonymity design"],
    ["3.2.4","5.1.2","ElGamal parameters directly affect what crypto implementation review should verify"],
    ["1.2.2","3.1.1","Cryptographic library selection determines Helios integration approach"],
    ["1.2.3","2.4.1","Biometric library selection determines face detection implementation"],
    ["4.2.4","4.1.3","Censorship circumvention testing and Tor browser testing share test infrastructure"],
    ["5.1.3","2.3.4","Auth testing should specifically verify the 2FA login flow implementation"],
    ["5.1.4","2.4.5","Info leakage testing should check privacy-preserving biometric architecture"],
    ["3.3.3","5.3.3","Vote casting endpoint implementation determines vote casting load test design"],
    ["6.3.3","5.1.1","Threat model documentation should reference OWASP testing findings"],
    ["1.3.4","3.5.2","Database setup configuration affects identity-vote database separation design"],
    ["4.4.1","4.1.3","Circumvention tool research findings inform Tor browser compatibility requirements"],
    ["6.5.3","6.3.3","Incident response plan should reference threat model documentation"],
    ["3.4.6","5.4.3","Mobile responsive design issues found in browser compatibility testing"],
    ["2.2.6","6.1.1","User profile features need to be documented in user guide"],
    ["1.1.3","5.4.4","CI/CD pipeline setup and continuous testing setup share the same GitHub Actions config"]
];

// Dependency reasons for direct edges
const DEPENDENCY_REASONS = {
"1.1.1>1.1.2":"Need repository before configuring development environment",
"1.1.2>1.4.2":"Docker dev environment needed for local CONSUL setup",
"1.1.3>1.3.1":"CI/CD pipeline informs VPS requirements and deployment target",
"1.1.4>1.2.1":"Documentation structure guides platform evaluation criteria",
"1.2.1>1.2.2":"Platform choice determines which crypto libraries are compatible",
"1.2.2>1.2.3":"Crypto library choice constrains biometric library options",
"1.2.3>1.2.4":"All library selections must be finalized before architecture docs",
"1.2.4>1.4.1":"Architecture must be documented before forking and customizing CONSUL",
"1.3.1>1.3.2":"VPS must be provisioned before OS can be hardened",
"1.3.2>1.3.3":"OS must be hardened before exposing Tor service",
"1.3.3>1.3.4":"Tor config affects database network access settings",
"1.3.4>1.3.5":"Database must be running before configuring SSL for web layer",
"1.3.5>4.1.1":"SSL/TLS must be configured before optimizing Tor hidden service",
"1.4.1>1.4.2":"Must fork repo before setting up local development",
"1.4.2>1.4.3":"Local setup must work before running test suite",
"1.4.3>1.4.4":"Test results inform customization planning decisions",
"1.4.4>2.1.1":"Customization plan must exist before starting localization",
"2.1.1>2.1.3":"Persian language pack needed before simplifying UI (RTL affects layout)",
"2.1.2>2.1.3":"Theme must exist before UI simplification can be applied",
"2.1.3>2.2.1":"Simplified UI framework needed before building registration forms",
"2.2.1>2.2.2":"Registration form must exist before adding email verification",
"2.2.2>2.2.3":"Email verification flow informs vouching schema design",
"2.2.3>2.2.4":"Vouching DB schema must exist before building request system",
"2.2.4>2.2.5":"Vouching request system must work before building admin oversight",
"2.2.5>2.3.1":"Vouching oversight complete before adding 2FA layer",
"2.2.6>2.3.1":"User profiles must exist before 2FA can be attached to accounts",
"2.3.1>2.3.2":"TOTP library must be integrated before generating QR codes",
"2.3.2>2.3.3":"QR setup flow must work before adding backup codes alternative",
"2.3.3>2.3.4":"Backup codes must exist as fallback before building 2FA login flow",
"2.3.4>5.1.1":"2FA login flow must be complete before security audit can test it",
"2.4.1>2.4.2":"Face detection must work before adding liveness challenges",
"2.4.2>2.4.3":"Liveness detection validates face before generating embeddings",
"2.4.3>2.4.4":"Face embeddings must be generated before duplicate detection",
"2.4.4>2.4.5":"Duplicate detection design informs privacy architecture decisions",
"2.4.5>2.4.6":"Privacy architecture must be defined before building signup flow",
"2.4.6>5.2.1":"Biometric signup must be complete before spoofing tests",
"3.1.1>3.1.2":"Helios analysis informs API bridge design decisions",
"3.1.2>3.1.3":"API bridge design determines data flow requirements",
"3.1.3>3.1.4":"Data flow mapping reveals key management requirements",
"3.1.4>3.2.1":"Key management plan needed before Helios deployment",
"3.2.1>3.2.2":"Helios must be installed before containerizing it",
"3.2.2>3.2.3":"Containerized Helios needed before configuring trustees",
"3.2.3>3.2.4":"Trustee setup must work before configuring ElGamal params",
"3.2.4>3.2.5":"ElGamal params must be set before running test election",
"3.2.5>3.3.1":"Test election validates Helios before building API bridge",
"3.3.1>3.3.2":"API auth layer must exist before vote creation endpoint",
"3.3.2>3.3.3":"Vote creation must work before vote casting can be built",
"3.3.3>3.3.4":"Vote casting must work before verification endpoint",
"3.3.4>3.3.5":"Verification must work before tallying trigger",
"3.3.5>3.3.6":"Core API must work before adding error handling layer",
"3.3.6>3.4.1":"API must be stable with error handling before building UI",
"3.4.1>3.4.2":"Vote creation UI informs vote listing page design",
"3.4.2>3.4.3":"Vote listing must exist before ballot interface",
"3.4.3>3.4.4":"Ballot interface must work before verification page",
"3.4.4>3.4.5":"Verification page must exist before results dashboard",
"3.4.5>3.5.1":"Results dashboard complete before anonymization design",
"3.4.6>3.5.1":"Mobile responsive issues inform anonymization UI design",
"3.5.1>3.5.2":"Anonymization architecture must be designed before DB separation",
"3.5.2>3.5.3":"DB separation must be done before audit log implementation",
"3.5.3>5.1.1":"Audit log must exist before security audit can review it",
"3.5.4>6.3.1":"Privacy policy docs feed into formal privacy policy writing",
"4.1.1>4.1.2":"Tor config must be optimized before adding DoS protection",
"4.1.2>4.1.4":"DoS protection must be in place before publishing onion address",
"4.1.3>4.1.4":"Browser compatibility must be verified before publishing address",
"4.1.4>4.2.1":"Onion address published before setting up domain fronting alternative",
"4.2.1>4.2.2":"Cloudflare account needed before domain fronting config",
"4.2.2>4.2.3":"Domain fronting must work before CDN optimization",
"4.2.3>4.3.1":"CDN setup informs IPFS node configuration",
"4.2.4>4.3.1":"Circumvention test results inform IPFS deployment strategy",
"4.3.1>4.3.2":"IPFS node must be running before uploading assets",
"4.3.2>4.3.3":"Assets must be on IPFS before configuring gateway",
"4.3.3>4.3.4":"Gateway must work before platform integration",
"4.3.4>4.3.5":"Platform integration must work before pinning strategy",
"4.3.5>6.5.1":"IPFS pinning must be configured before production finalization",
"4.4.1>4.4.2":"Tool research must be done before writing Persian guide",
"4.4.2>4.4.3":"Persian guide must exist before English translation",
"4.4.3>6.1.1":"Circumvention guides must exist before user guide references them",
"5.1.1>5.1.2":"OWASP testing must be done before crypto review",
"5.1.2>5.1.3":"Crypto review before auth testing (crypto informs auth)",
"5.1.3>5.1.4":"Auth testing before info leakage testing",
"5.1.4>5.1.5":"All vulnerability findings needed before remediation",
"5.1.5>5.1.6":"Remediation must be done before writing audit report",
"5.1.6>5.4.1":"Audit report must exist before E2E test suite development",
"5.2.1>5.2.2":"Photo spoofing tests before video spoofing tests",
"5.2.2>5.2.3":"Video spoofing results inform liveness detection tuning",
"5.2.3>5.2.4":"Liveness effectiveness informs duplicate detection thresholds",
"5.2.4>5.4.1":"Biometric testing complete before E2E test suite",
"5.3.1>5.3.2":"Load test environment must be set up before running simulations",
"5.3.2>5.3.3":"Concurrent user results inform vote casting load test design",
"5.3.3>5.3.4":"Load test results reveal which DB queries need optimization",
"5.3.4>5.4.1":"DB optimization must be done before E2E testing",
"5.4.1>5.4.2":"Test suite must exist before edge case testing",
"5.4.2>5.4.3":"Edge cases must be tested before browser compatibility",
"5.4.3>5.4.5":"Browser compat issues must be found before bug tracking setup",
"5.4.4>6.5.1":"CI/CD testing setup must be done before production finalization",
"5.4.5>6.1.1":"Bug tracking must be set up before writing user guide (known issues)",
"6.1.1>6.1.2":"Persian user guide must exist before English translation",
"6.1.2>6.4.2":"English guide needed for beta onboarding materials",
"6.1.3>6.4.2":"Video tutorials needed for beta onboarding",
"6.1.4>6.4.1":"FAQ must exist before recruiting beta testers (they need resources)",
"6.2.1>6.2.2":"Admin manual must exist before deployment guide",
"6.2.2>6.2.3":"Deployment guide informs troubleshooting guide content",
"6.2.3>6.2.4":"Troubleshooting guide informs backup/recovery docs",
"6.2.4>6.5.5":"Backup docs must exist before pre-launch checklist",
"6.3.1>6.3.2":"Privacy policy must exist before security whitepaper references it",
"6.3.2>6.3.3":"Whitepaper informs threat model documentation",
"6.3.3>6.3.4":"Threat model must exist before transparency report template",
"6.3.4>6.5.5":"Transparency report template needed for pre-launch checklist",
"6.4.1>6.4.2":"Beta testers must be recruited before onboarding them",
"6.4.2>6.4.3":"Onboarding must be done before test vote execution",
"6.4.3>6.4.4":"Test votes must be executed before collecting feedback",
"6.4.4>6.4.5":"Feedback must be collected before fixing bugs",
"6.4.5>6.5.1":"Beta bug fixes must be done before production finalization",
"6.5.1>6.5.2":"Production env must be finalized before monitoring setup",
"6.5.2>6.5.5":"Monitoring must be active before pre-launch checklist",
"6.5.3>6.5.5":"Incident response plan needed for pre-launch checklist",
"6.5.4>6.5.5":"Launch announcement must be ready for pre-launch checklist",
"6.5.5>6.5.6":"Pre-launch checklist must pass before launch execution"
};

let showIndirectGraph = false;
let graphNodeMap = new Map();

function initGraph() {
    graphData.nodes = [];
    graphData.links = [];
    graphNodeMap.clear();
    
    projectData.milestones.forEach(m => {
        m.tasks.forEach(t => {
            const n = {
                id: t.id, name: t.name, agent: t.agent, hours: t.hours,
                milestone: m.id, milestoneName: m.name, color: m.color,
                critical: t.critical, status: t.status, parent: t.parent,
                dependencies: t.dependencies || []
            };
            graphData.nodes.push(n);
            graphNodeMap.set(t.id, n);
        });
    });

    // Direct dependency links
    graphData.nodes.forEach(node => {
        node.dependencies.forEach(depId => {
            graphData.links.push({ source: depId, target: node.id, type: 'direct' });
        });
    });

    // Curated indirect links
    INDIRECT_CONNECTIONS.forEach(ic => {
        graphData.links.push({ source: ic[0], target: ic[1], type: 'indirect', reason: ic[2] });
    });

    renderGraph();
}

function renderGraph() {
    const container = document.getElementById('graph');
    const width = container.clientWidth || window.innerWidth - 300;
    const height = container.clientHeight || window.innerHeight - 60;

    d3.select('#graph').selectAll('*').remove();
    // Remove old tooltip if any
    d3.selectAll('.graph-tooltip').remove();

    svg = d3.select('#graph').attr('width', width).attr('height', height);
    const g = svg.append('g');

    const zoom = d3.zoom().scaleExtent([0.1, 5]).on('zoom', e => g.attr('transform', e.transform));
    svg.call(zoom);

    // Arrow markers
    const defs = svg.append('defs');
    [['direct','#667eea'],['indirect','#f0883e'],['highlight','#58a6ff'],['critical','#f5576c']].forEach(([id,color]) => {
        defs.append('marker').attr('id','arr-'+id).attr('viewBox','0 0 10 6').attr('refX',10).attr('refY',3)
            .attr('markerWidth',8).attr('markerHeight',6).attr('orient','auto')
            .append('path').attr('d','M0,0L10,3L0,6Z').attr('fill',color);
    });

    const directLinks = graphData.links.filter(l => l.type === 'direct');
    const indirectLinksData = graphData.links.filter(l => l.type === 'indirect');

    simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(directLinks).id(d => d.id).distance(100).strength(0.4))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX(d => (d.milestone - 1) * width / 6 + width / 12).strength(0.12))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force('collision', d3.forceCollide(25))
        .alphaDecay(0.02);

    // Indirect links (hidden by default)
    const indLinkG = g.append('g').attr('class','ind-links').style('display','none');
    const indLinkSel = indLinkG.selectAll('line').data(indirectLinksData).join('line')
        .attr('stroke','#f0883e').attr('stroke-width',1.5).attr('stroke-dasharray','6,4')
        .attr('opacity',0.6).attr('marker-end','url(#arr-indirect)')
        .style('cursor','pointer')
        .on('click',(ev,d) => { ev.stopPropagation(); showGraphLinkInfo(d, 'indirect'); });

    // Direct links
    link = g.append('g').selectAll('line').data(directLinks).join('line')
        .attr('stroke','#667eea').attr('stroke-width',1.5).attr('stroke-opacity',0.5)
        .attr('marker-end','url(#arr-direct)')
        .style('cursor','pointer')
        .on('click',(ev,d) => { ev.stopPropagation(); showGraphLinkInfo(d, 'direct'); });

    // Nodes
    const nodeGroup = g.append('g').selectAll('g').data(graphData.nodes).join('g')
        .style('cursor','pointer')
        .call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded));

    nodeGroup.append('circle').attr('r', 18).attr('fill', d => d.color)
        .attr('stroke','#0d1117').attr('stroke-width',1.5);

    nodeGroup.append('text').attr('dy', 4).attr('text-anchor','middle')
        .attr('fill','#fff').attr('font-size','8px').attr('font-weight','bold')
        .text(d => d.id);

    // Hover: highlight ancestors/descendants
    nodeGroup.on('mouseenter',(ev,d) => {
        const anc = getGraphAncestors(d.id), desc = getGraphDescendants(d.id);
        const related = new Set([d.id, ...anc, ...desc]);
        nodeGroup.attr('opacity', n => related.has(n.id) ? 1 : 0.15);
        link.attr('opacity', l => {
            const s = l.source.id || l.source, t = l.target.id || l.target;
            return related.has(s) && related.has(t) ? 0.8 : 0.05;
        });
    }).on('mouseleave',() => {
        nodeGroup.attr('opacity', 1);
        link.attr('opacity', 0.5);
    });

    // Click: show info panel
    nodeGroup.on('click',(ev,d) => { ev.stopPropagation(); showGraphNodeInfo(d); });
    svg.on('click',() => { hideGraphInfo(); });

    node = nodeGroup;

    // Tooltip
    tooltip = d3.select('body').selectAll('.graph-tooltip').data([0]).join('div')
        .attr('class','graph-tooltip tooltip').style('opacity',0);

    // Tick
    simulation.on('tick', () => {
        link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y)
            .attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
        indLinkSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y)
            .attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Store references for toggle
    window._indLinkG = indLinkG;
    window._link = link;
    window._node = node;
    window._nodeGroup = nodeGroup;
}

// Graph helpers
function getGraphAncestors(id) {
    const s = new Set(), q = [id];
    const directEdges = graphData.links.filter(l => l.type === 'direct');
    while(q.length) {
        const c = q.pop();
        directEdges.forEach(e => {
            const src = e.source.id || e.source;
            const tgt = e.target.id || e.target;
            if(tgt === c && !s.has(src)) { s.add(src); q.push(src); }
        });
    }
    return s;
}
function getGraphDescendants(id) {
    const s = new Set(), q = [id];
    const directEdges = graphData.links.filter(l => l.type === 'direct');
    while(q.length) {
        const c = q.pop();
        directEdges.forEach(e => {
            const src = e.source.id || e.source;
            const tgt = e.target.id || e.target;
            if(src === c && !s.has(tgt)) { s.add(tgt); q.push(tgt); }
        });
    }
    return s;
}

// Critical path (longest path)
function graphCriticalPathTo(targetId) {
    const directEdges = graphData.links.filter(l => l.type === 'direct');
    const dist = new Map(), prev = new Map();
    graphData.nodes.forEach(n => dist.set(n.id, -Infinity));
    const starts = graphData.nodes.filter(n => !directEdges.some(e => (e.target.id||e.target) === n.id));
    starts.forEach(s => dist.set(s.id, s.hours));
    // Topological sort
    const inDeg = new Map();
    graphData.nodes.forEach(n => inDeg.set(n.id, 0));
    directEdges.forEach(e => { const t = e.target.id||e.target; inDeg.set(t, (inDeg.get(t)||0)+1); });
    const q = [];
    graphData.nodes.forEach(n => { if(inDeg.get(n.id)===0) q.push(n.id); });
    const order = [];
    while(q.length) {
        const u = q.shift(); order.push(u);
        directEdges.forEach(e => {
            const s=e.source.id||e.source, t=e.target.id||e.target;
            if(s===u) { inDeg.set(t, inDeg.get(t)-1); if(inDeg.get(t)===0) q.push(t); }
        });
    }
    order.forEach(u => {
        directEdges.forEach(e => {
            const s=e.source.id||e.source, t=e.target.id||e.target;
            if(s===u) {
                const nd = graphNodeMap.get(t);
                const w = dist.get(u) + (nd ? nd.hours : 0);
                if(w > dist.get(t)) { dist.set(t, w); prev.set(t, u); }
            }
        });
    });
    const path = [targetId]; let cur = targetId;
    while(prev.has(cur)) { cur = prev.get(cur); path.unshift(cur); }
    return path;
}

// Show node info in the graph legend area
function showGraphNodeInfo(d) {
    const directEdges = graphData.links.filter(l => l.type === 'direct');
    const parents = directEdges.filter(e => (e.target.id||e.target) === d.id).map(e => e.source.id||e.source);
    const children = directEdges.filter(e => (e.source.id||e.source) === d.id).map(e => e.target.id||e.target);
    const indConn = INDIRECT_CONNECTIONS.filter(ic => ic[0]===d.id || ic[1]===d.id);

    const inReasons = parents.map(p => {
        const k = p+'>'+d.id;
        return '<span style="color:#667eea">'+p+'</span>: '+(DEPENDENCY_REASONS[k]||'—');
    }).join('<br>');
    const outReasons = children.map(c => {
        const k = d.id+'>'+c;
        return '→ <span style="color:#667eea">'+c+'</span>: '+(DEPENDENCY_REASONS[k]||'—');
    }).join('<br>');

    const legend = document.querySelector('.graph-legend');
    legend.innerHTML = `
        <h3 style="color:#667eea">${d.id}: ${d.name}</h3>
        <div style="margin:4px 0"><span style="color:#aaa">Milestone:</span> ${d.milestone} — ${d.milestoneName}</div>
        <div style="margin:4px 0"><span style="color:#aaa">Parent:</span> [${d.parent}]</div>
        <div style="margin:4px 0"><span style="color:#aaa">Agent:</span> ${d.agent}</div>
        <div style="margin:4px 0"><span style="color:#aaa">Hours:</span> ${d.hours}h</div>
        <div style="margin:4px 0"><span style="color:#aaa">Status:</span> ${d.status}</div>
        <div style="margin:4px 0"><span style="color:#aaa">Critical:</span> ${d.critical?'Yes':'No'}</div>
        <hr style="border-color:#333;margin:6px 0">
        <div style="margin:4px 0"><span style="color:#aaa">Predecessors (${parents.length}):</span><br>${inReasons||'<i>None (start node)</i>'}</div>
        <hr style="border-color:#333;margin:6px 0">
        <div style="margin:4px 0"><span style="color:#aaa">Successors (${children.length}):</span><br>${outReasons||'<i>None (end node)</i>'}</div>
        ${indConn.length?`<hr style="border-color:#333;margin:6px 0"><div style="margin:4px 0"><span style="color:#aaa">Indirect (${indConn.length}):</span><br>${indConn.map(ic=>{
            const other=ic[0]===d.id?ic[1]:ic[0];
            return '<span style="color:#f0883e">↔ '+other+'</span>: '+ic[2];
        }).join('<br>')}</div>`:''}
        <hr style="border-color:#333;margin:6px 0">
        <button onclick="highlightGraphCritical('${d.id}')" style="background:#667eea;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin:2px">Critical Path</button>
        <button onclick="hideGraphInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin:2px">Close</button>
    `;
}

function showGraphLinkInfo(l, type) {
    const s = l.source.id||l.source, t = l.target.id||l.target;
    const legend = document.querySelector('.graph-legend');
    if(type === 'direct') {
        const k = s+'>'+t;
        legend.innerHTML = `
            <h3 style="color:#667eea">Edge: ${s} → ${t}</h3>
            <div style="margin:4px 0"><span style="color:#aaa">From:</span> ${s}: ${graphNodeMap.get(s)?.name||'?'}</div>
            <div style="margin:4px 0"><span style="color:#aaa">To:</span> ${t}: ${graphNodeMap.get(t)?.name||'?'}</div>
            <div style="margin:4px 0"><span style="color:#aaa">Reason:</span> ${DEPENDENCY_REASONS[k]||'—'}</div>
            <button onclick="hideGraphInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin-top:6px">Close</button>`;
    } else {
        legend.innerHTML = `
            <h3 style="color:#f0883e">Indirect: ${s} ↔ ${t}</h3>
            <div style="margin:4px 0"><span style="color:#aaa">From:</span> ${s}: ${graphNodeMap.get(s)?.name||'?'}</div>
            <div style="margin:4px 0"><span style="color:#aaa">To:</span> ${t}: ${graphNodeMap.get(t)?.name||'?'}</div>
            <div style="margin:4px 0"><span style="color:#aaa">Reason:</span> ${l.reason||'—'}</div>
            <button onclick="hideGraphInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin-top:6px">Close</button>`;
    }
}

function highlightGraphCritical(id) {
    const path = graphCriticalPathTo(id);
    const pathSet = new Set(path);
    const pathEdges = new Set();
    for(let i=0;i<path.length-1;i++) pathEdges.add(path[i]+'>'+path[i+1]);
    
    window._node.attr('opacity', n => pathSet.has(n.id) ? 1 : 0.1);
    window._node.select('circle').attr('stroke', n => pathSet.has(n.id) ? '#f5576c' : '#0d1117')
        .attr('stroke-width', n => pathSet.has(n.id) ? 3 : 1.5);
    window._link.attr('opacity', l => {
        const s=l.source.id||l.source, t=l.target.id||l.target;
        return pathEdges.has(s+'>'+t) ? 1 : 0.03;
    }).attr('stroke', l => {
        const s=l.source.id||l.source, t=l.target.id||l.target;
        return pathEdges.has(s+'>'+t) ? '#f5576c' : '#667eea';
    }).attr('stroke-width', l => {
        const s=l.source.id||l.source, t=l.target.id||l.target;
        return pathEdges.has(s+'>'+t) ? 3 : 1.5;
    });

    const totalH = path.reduce((s,nid) => s + (graphNodeMap.get(nid)?.hours||0), 0);
    const legend = document.querySelector('.graph-legend');
    legend.innerHTML = `
        <h3 style="color:#f5576c">Critical Path to ${id} (${path.length} nodes, ${totalH}h)</h3>
        <div style="font-size:11px;line-height:1.8">${path.map(nid => '<span style="color:'+graphNodeMap.get(nid)?.color+'">'+nid+'</span>').join(' → ')}</div>
        <button onclick="hideGraphInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin-top:6px">Clear</button>`;
}

function hideGraphInfo() {
    if(window._node) { window._node.attr('opacity',1); window._node.select('circle').attr('stroke','#0d1117').attr('stroke-width',1.5); }
    if(window._link) { window._link.attr('opacity',0.5).attr('stroke','#667eea').attr('stroke-width',1.5); }
    // Restore legend
    const legend = document.querySelector('.graph-legend');
    if(legend) legend.innerHTML = `<h3>Legend</h3>
        <div class="legend-item"><div class="legend-color" style="background:#667eea"></div><span>Foundation & Setup</span></div>
        <div class="legend-item"><div class="legend-color" style="background:#764ba2"></div><span>Platform Customization</span></div>
        <div class="legend-item"><div class="legend-color" style="background:#f093fb"></div><span>Cryptographic Voting</span></div>
        <div class="legend-item"><div class="legend-color" style="background:#4facfe"></div><span>Censorship Resistance</span></div>
        <div class="legend-item"><div class="legend-color" style="background:#43e97b"></div><span>Security & Testing</span></div>
        <div class="legend-item"><div class="legend-color" style="background:#f5576c"></div><span>Documentation & Launch</span></div>
        <div class="legend-item" style="margin-top:10px"><div style="width:30px;height:2px;background:#667eea;margin-right:10px"></div><span>Direct Dependency</span></div>
        <div class="legend-item"><div style="width:30px;height:2px;background:#f0883e;margin-right:10px;border-top:2px dashed #f0883e"></div><span>Indirect Connection</span></div>
        <div style="margin-top:8px;font-size:11px;color:#aaa">Nodes: ${graphData.nodes.length} | Direct: ${graphData.links.filter(l=>l.type==='direct').length} | Indirect: ${INDIRECT_CONNECTIONS.length}</div>`;
}

function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function toggleGraphIndirect() {
    showIndirectGraph = document.getElementById('showIndirectGraph').checked;
    if(window._indLinkG) window._indLinkG.style('display', showIndirectGraph ? null : 'none');
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

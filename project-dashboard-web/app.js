// Global state
let projectData = null;
let currentTab = 'status';
let svg, simulation, link, node, tooltip;
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
        if (!window.graphInitialized) { initGraph(); window.graphInitialized = true; }
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
                <div><strong>Milestone ${m.id}: ${m.name}</strong> <span style="opacity:0.8;margin-left:15px">Weeks ${m.weeks}</span></div>
                <div>${m.tasks.length} tasks</div>
            </div>
            <div class="milestone-content">
                ${m.tasks.map(t => `
                    <div class="task ${t.status.replace('-','')} ${t.critical?'critical':''}" data-task-id="${t.id}" data-milestone="${m.id}" data-ai="${t.aiCapability||3}">
                        <input type="checkbox" ${t.status==='completed'?'checked':''} onchange="toggleTask('${t.id}',${m.id})">
                        <div class="task-id">${t.id}</div>
                        <div class="task-name">${t.name}</div>
                        <div class="task-agent">${t.agent}</div>
                        <div class="task-hours">${t.hours}h</div>
                        <div class="task-ai"><span class="ai-rating ai-${t.aiCapability||3}">${t.aiCapability||3}</span></div>
                        <select class="task-status" onchange="changeStatus('${t.id}',${m.id},this.value)">
                            <option value="not-started" ${t.status==='not-started'?'selected':''}>Not Started</option>
                            <option value="in-progress" ${t.status==='in-progress'?'selected':''}>In Progress</option>
                            <option value="completed" ${t.status==='completed'?'selected':''}>Completed</option>
                        </select>
                    </div>`).join('')}
            </div>
        </div>`).join('');
}

function toggleTask(taskId, milestoneId) {
    const m = projectData.milestones.find(x => x.id === milestoneId);
    const t = m.tasks.find(x => x.id === taskId);
    t.status = t.status === 'completed' ? 'not-started' : 'completed';
    renderMilestones(); updateStats(); updateProjection(); saveProgress();
}
function changeStatus(taskId, milestoneId, newStatus) {
    const m = projectData.milestones.find(x => x.id === milestoneId);
    const t = m.tasks.find(x => x.id === taskId);
    t.status = newStatus;
    renderMilestones(); updateStats(); updateProjection(); saveProgress();
}
function updateStats() {
    let total=0,completed=0,inProgress=0,totalH=0,completedH=0;
    projectData.milestones.forEach(m=>{m.tasks.forEach(t=>{total++;totalH+=t.hours;if(t.status==='completed'){completed++;completedH+=t.hours}else if(t.status==='in-progress')inProgress++})});
    document.getElementById('totalTasks').textContent=total;
    document.getElementById('completedTasks').textContent=completed;
    document.getElementById('inProgressTasks').textContent=inProgress;
    document.getElementById('totalHours').textContent=totalH;
    document.getElementById('completedHours').textContent=completedH;
}
function updateProjection() {
    let total=0,completed=0,totalH=0,completedH=0;
    projectData.milestones.forEach(m=>{m.tasks.forEach(t=>{total++;totalH+=t.hours;if(t.status==='completed'){completed++;completedH+=t.hours}})});
    const progress=total>0?Math.round((completed/total)*100):0;
    document.getElementById('overallProgress').style.width=progress+'%';
    document.getElementById('overallProgress').textContent=progress+'%';
    const start=new Date(projectData.startDate),today=new Date();
    const weeksElapsed=Math.floor((today-start)/(7*24*60*60*1000));
    const velocity=weeksElapsed>0?completedH/weeksElapsed:0;
    const remainingH=totalH-completedH;
    const weeksRemaining=velocity>0?Math.ceil(remainingH/velocity):0;
    const estimated=new Date(today.getTime()+weeksRemaining*7*24*60*60*1000);
    document.getElementById('estimatedCompletion').textContent=estimated.toLocaleDateString();
    document.getElementById('daysRemaining').textContent=weeksRemaining*7;
    document.getElementById('velocity').textContent=velocity.toFixed(1);
    const onTrack=weeksRemaining<=(12-weeksElapsed);
    document.getElementById('onTrack').textContent=onTrack?'✅ Yes':'⚠️ Behind';
    document.getElementById('onTrack').style.color=onTrack?'#43e97b':'#f5576c';
}
function filterTasks() {
    const search=document.getElementById('searchBox').value.toLowerCase();
    const status=document.getElementById('filterStatus').value;
    const aiLevel=document.getElementById('filterAI').value;
    document.querySelectorAll('.task').forEach(el=>{
        const id=el.dataset.taskId,name=el.querySelector('.task-name').textContent.toLowerCase();
        const taskStatus=el.querySelector('.task-status').value,taskAI=el.dataset.ai;
        let show=true;
        if(search&&!id.includes(search)&&!name.includes(search))show=false;
        if(status!=='all'&&taskStatus!==status)show=false;
        if(aiLevel!=='all'&&taskAI!==aiLevel)show=false;
        el.style.display=show?'grid':'none';
    });
}
function saveProgress(){localStorage.setItem('projectStatus',JSON.stringify(projectData))}
function exportData() {
    let csv='Milestone,Task ID,Task Name,Agent,Hours,Critical,Status\n';
    projectData.milestones.forEach(m=>{m.tasks.forEach(t=>{csv+=`"${m.name}","${t.id}","${t.name}","${t.agent}",${t.hours},${t.critical},${t.status}\n`})});
    const blob=new Blob([csv],{type:'text/csv'});const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='project-status-'+new Date().toISOString().split('T')[0]+'.csv';a.click();
}
function resetAll() {
    if(!confirm('Reset all progress?'))return;
    localStorage.removeItem('projectStatus');
    projectData=JSON.parse(JSON.stringify(PROJECT_DATA));
    renderMilestones();updateStats();updateProjection();
}

// ===== NETWORK GRAPH =====
const INDIRECT=[
["2.4.5","3.5.4","Biometric privacy design should align with vote privacy policy"],
["2.4.4","5.2.4","Duplicate detection design affects testing accuracy thresholds"],
["2.4.2","5.2.2","Liveness detection determines what video spoofing tests target"],
["1.3.3","4.1.1","Tor hidden service config and Tor optimization share torrc"],
["2.2.3","3.5.2","Vouching DB schema and identity-vote DB separation affect anonymity"],
["3.2.4","5.1.2","ElGamal parameters affect crypto implementation review"],
["1.2.2","3.1.1","Crypto library selection determines Helios integration approach"],
["1.2.3","2.4.1","Biometric library selection determines face detection implementation"],
["4.2.4","4.1.3","Circumvention testing and Tor browser testing share infrastructure"],
["5.1.3","2.3.4","Auth testing should verify the 2FA login flow"],
["5.1.4","2.4.5","Info leakage testing should check biometric privacy architecture"],
["3.3.3","5.3.3","Vote casting endpoint determines load test design"],
["6.3.3","5.1.1","Threat model should reference OWASP testing findings"],
["1.3.4","3.5.2","Database setup affects identity-vote DB separation design"],
["4.4.1","4.1.3","Circumvention research informs Tor browser compatibility"],
["6.5.3","6.3.3","Incident response plan should reference threat model"],
["3.4.6","5.4.3","Mobile responsive issues found in browser compat testing"],
["2.2.6","6.1.1","User profile features need documenting in user guide"],
["1.1.3","5.4.4","CI/CD and continuous testing share GitHub Actions config"]
];
const DR={
"1.1.1>1.1.2":"Need repository before configuring dev environment",
"1.1.2>1.4.2":"Docker dev environment needed for local CONSUL setup",
"1.1.3>1.3.1":"CI/CD pipeline informs VPS requirements",
"1.1.4>1.2.1":"Documentation structure guides platform evaluation",
"1.2.1>1.2.2":"Platform choice determines compatible crypto libraries",
"1.2.2>1.2.3":"Crypto library constrains biometric library options",
"1.2.3>1.2.4":"All library selections finalized before architecture docs",
"1.2.4>1.4.1":"Architecture documented before forking CONSUL",
"1.3.1>1.3.2":"VPS provisioned before OS hardening",
"1.3.2>1.3.3":"OS hardened before exposing Tor service",
"1.3.3>1.3.4":"Tor config affects database network access",
"1.3.4>1.3.5":"Database running before configuring SSL",
"1.3.5>4.1.1":"SSL configured before optimizing Tor hidden service",
"1.4.1>1.4.2":"Fork repo before local development setup",
"1.4.2>1.4.3":"Local setup works before running test suite",
"1.4.3>1.4.4":"Test results inform customization planning",
"1.4.4>2.1.1":"Customization plan before starting localization",
"2.1.1>2.1.3":"Persian pack needed before UI simplification (RTL)",
"2.1.2>2.1.3":"Theme exists before UI simplification",
"2.1.3>2.2.1":"Simplified UI before building registration forms",
"2.2.1>2.2.2":"Registration form before email verification",
"2.2.2>2.2.3":"Email verification informs vouching schema",
"2.2.3>2.2.4":"Vouching schema before request system",
"2.2.4>2.2.5":"Vouching requests before admin oversight",
"2.2.5>2.3.1":"Vouching oversight before 2FA layer",
"2.2.6>2.3.1":"User profiles before 2FA attachment",
"2.3.1>2.3.2":"TOTP integrated before QR codes",
"2.3.2>2.3.3":"QR setup before backup codes",
"2.3.3>2.3.4":"Backup codes before 2FA login flow",
"2.3.4>5.1.1":"2FA login complete before security audit",
"2.4.1>2.4.2":"Face detection before liveness challenges",
"2.4.2>2.4.3":"Liveness validates face before embeddings",
"2.4.3>2.4.4":"Embeddings generated before duplicate detection",
"2.4.4>2.4.5":"Duplicate detection informs privacy architecture",
"2.4.5>2.4.6":"Privacy architecture before signup flow",
"2.4.6>5.2.1":"Biometric signup complete before spoofing tests",
"3.1.1>3.1.2":"Helios analysis informs API bridge design",
"3.1.2>3.1.3":"API bridge design determines data flow",
"3.1.3>3.1.4":"Data flow reveals key management requirements",
"3.1.4>3.2.1":"Key management plan before Helios deployment",
"3.2.1>3.2.2":"Helios installed before containerizing",
"3.2.2>3.2.3":"Containerized Helios before configuring trustees",
"3.2.3>3.2.4":"Trustee setup before ElGamal params",
"3.2.4>3.2.5":"ElGamal params before test election",
"3.2.5>3.3.1":"Test election validates Helios before API bridge",
"3.3.1>3.3.2":"API auth before vote creation endpoint",
"3.3.2>3.3.3":"Vote creation before vote casting",
"3.3.3>3.3.4":"Vote casting before verification endpoint",
"3.3.4>3.3.5":"Verification before tallying trigger",
"3.3.5>3.3.6":"Core API before error handling layer",
"3.3.6>3.4.1":"API stable before building UI",
"3.4.1>3.4.2":"Vote creation UI informs listing page",
"3.4.2>3.4.3":"Vote listing before ballot interface",
"3.4.3>3.4.4":"Ballot interface before verification page",
"3.4.4>3.4.5":"Verification page before results dashboard",
"3.4.5>3.5.1":"Results dashboard before anonymization design",
"3.4.6>3.5.1":"Mobile responsive informs anonymization UI",
"3.5.1>3.5.2":"Anonymization architecture before DB separation",
"3.5.2>3.5.3":"DB separation before audit log",
"3.5.3>5.1.1":"Audit log before security audit",
"3.5.4>6.3.1":"Privacy policy docs feed formal policy writing",
"4.1.1>4.1.2":"Tor config optimized before DoS protection",
"4.1.2>4.1.4":"DoS protection before publishing onion address",
"4.1.3>4.1.4":"Browser compat verified before publishing address",
"4.1.4>4.2.1":"Onion published before domain fronting setup",
"4.2.1>4.2.2":"Cloudflare account before domain fronting config",
"4.2.2>4.2.3":"Domain fronting before CDN optimization",
"4.2.3>4.3.1":"CDN setup informs IPFS node config",
"4.2.4>4.3.1":"Circumvention results inform IPFS strategy",
"4.3.1>4.3.2":"IPFS node running before uploading assets",
"4.3.2>4.3.3":"Assets on IPFS before configuring gateway",
"4.3.3>4.3.4":"Gateway works before platform integration",
"4.3.4>4.3.5":"Platform integration before pinning strategy",
"4.3.5>6.5.1":"IPFS pinning before production finalization",
"4.4.1>4.4.2":"Tool research before Persian guide",
"4.4.2>4.4.3":"Persian guide before English translation",
"4.4.3>6.1.1":"Circumvention guides before user guide",
"5.1.1>5.1.2":"OWASP testing before crypto review",
"5.1.2>5.1.3":"Crypto review before auth testing",
"5.1.3>5.1.4":"Auth testing before info leakage testing",
"5.1.4>5.1.5":"All findings before remediation",
"5.1.5>5.1.6":"Remediation before audit report",
"5.1.6>5.4.1":"Audit report before E2E test suite",
"5.2.1>5.2.2":"Photo spoofing before video spoofing",
"5.2.2>5.2.3":"Video spoofing informs liveness tuning",
"5.2.3>5.2.4":"Liveness effectiveness informs duplicate thresholds",
"5.2.4>5.4.1":"Biometric testing before E2E suite",
"5.3.1>5.3.2":"Load test env before simulations",
"5.3.2>5.3.3":"Concurrent user results inform vote load test",
"5.3.3>5.3.4":"Load results reveal slow DB queries",
"5.3.4>5.4.1":"DB optimization before E2E testing",
"5.4.1>5.4.2":"Test suite before edge case testing",
"5.4.2>5.4.3":"Edge cases before browser compatibility",
"5.4.3>5.4.5":"Browser compat before bug tracking setup",
"5.4.4>6.5.1":"CI/CD testing before production finalization",
"5.4.5>6.1.1":"Bug tracking before user guide (known issues)",
"6.1.1>6.1.2":"Persian guide before English translation",
"6.1.2>6.4.2":"English guide for beta onboarding",
"6.1.3>6.4.2":"Video tutorials for beta onboarding",
"6.1.4>6.4.1":"FAQ before recruiting beta testers",
"6.2.1>6.2.2":"Admin manual before deployment guide",
"6.2.2>6.2.3":"Deployment guide informs troubleshooting",
"6.2.3>6.2.4":"Troubleshooting informs backup/recovery docs",
"6.2.4>6.5.5":"Backup docs before pre-launch checklist",
"6.3.1>6.3.2":"Privacy policy before security whitepaper",
"6.3.2>6.3.3":"Whitepaper informs threat model",
"6.3.3>6.3.4":"Threat model before transparency report",
"6.3.4>6.5.5":"Transparency template for pre-launch checklist",
"6.4.1>6.4.2":"Recruit testers before onboarding",
"6.4.2>6.4.3":"Onboarding before test vote execution",
"6.4.3>6.4.4":"Test votes before collecting feedback",
"6.4.4>6.4.5":"Feedback before fixing bugs",
"6.4.5>6.5.1":"Beta fixes before production finalization",
"6.5.1>6.5.2":"Production finalized before monitoring setup",
"6.5.2>6.5.5":"Monitoring active before pre-launch checklist",
"6.5.3>6.5.5":"Incident response for pre-launch checklist",
"6.5.4>6.5.5":"Launch announcement for pre-launch checklist",
"6.5.5>6.5.6":"Pre-launch checklist before launch execution"
};

let gNodeMap=new Map(), gIndLinkG, gLink, gNode;

function initGraph() {
    graphData.nodes=[];graphData.links=[];gNodeMap.clear();
    projectData.milestones.forEach(m=>{m.tasks.forEach(t=>{
        const n={id:t.id,name:t.name,agent:t.agent,hours:t.hours,milestone:m.id,
            milestoneName:m.name,color:m.color,critical:t.critical,status:t.status,
            parent:t.parent,dependencies:t.dependencies||[]};
        graphData.nodes.push(n);gNodeMap.set(t.id,n);
    })});
    // Direct links from dependencies
    graphData.nodes.forEach(n=>{n.dependencies.forEach(d=>{
        graphData.links.push({source:d,target:n.id,type:'direct'});
    })});
    // Indirect links
    INDIRECT.forEach(ic=>{graphData.links.push({source:ic[0],target:ic[1],type:'indirect',reason:ic[2]})});
    renderGraph();
}

function renderGraph() {
    const container=document.getElementById('graph');
    const W=container.clientWidth||window.innerWidth-300;
    const H=container.clientHeight||window.innerHeight-60;
    d3.select('#graph').selectAll('*').remove();
    d3.selectAll('.graph-tooltip').remove();

    svg=d3.select('#graph').attr('width',W).attr('height',H);
    const g=svg.append('g');
    svg.call(d3.zoom().scaleExtent([0.1,5]).on('zoom',e=>g.attr('transform',e.transform)));

    // Markers
    const defs=svg.append('defs');
    [['direct','#667eea'],['indirect','#f0883e'],['critical','#f5576c']].forEach(([id,c])=>{
        defs.append('marker').attr('id','a-'+id).attr('viewBox','0 0 10 6').attr('refX',10).attr('refY',3)
            .attr('markerWidth',8).attr('markerHeight',6).attr('orient','auto')
            .append('path').attr('d','M0,0L10,3L0,6Z').attr('fill',c);
    });

    const directLinks=graphData.links.filter(l=>l.type==='direct');
    const indirectLinks=graphData.links.filter(l=>l.type==='indirect');

    simulation=d3.forceSimulation(graphData.nodes)
        .force('link',d3.forceLink(directLinks).id(d=>d.id).distance(90).strength(0.4))
        .force('charge',d3.forceManyBody().strength(-280))
        .force('center',d3.forceCenter(W/2,H/2))
        .force('x',d3.forceX(d=>(d.milestone-1)*W/6+W/12).strength(0.12))
        .force('y',d3.forceY(H/2).strength(0.05))
        .force('collision',d3.forceCollide(22)).alphaDecay(0.02);

    // Indirect links (hidden by default)
    gIndLinkG=g.append('g').style('display','none');
    gIndLinkG.selectAll('line').data(indirectLinks).join('line')
        .attr('stroke','#f0883e').attr('stroke-width',1.5).attr('stroke-dasharray','6,4')
        .attr('opacity',0.5).attr('marker-end','url(#a-indirect)')
        .style('cursor','pointer')
        .on('click',(ev,d)=>{ev.stopPropagation();showEdgeInfo(d,'indirect')});

    // Direct links
    gLink=g.append('g').selectAll('line').data(directLinks).join('line')
        .attr('stroke','#667eea').attr('stroke-width',1.5).attr('stroke-opacity',0.5)
        .attr('marker-end','url(#a-direct)').style('cursor','pointer')
        .on('click',(ev,d)=>{ev.stopPropagation();showEdgeInfo(d,'direct')});

    // Nodes
    gNode=g.append('g').selectAll('g').data(graphData.nodes).join('g')
        .style('cursor','pointer')
        .call(d3.drag().on('start',(ev,d)=>{if(!ev.active)simulation.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y})
            .on('drag',(ev,d)=>{d.fx=ev.x;d.fy=ev.y})
            .on('end',(ev,d)=>{if(!ev.active)simulation.alphaTarget(0);d.fx=null;d.fy=null}));

    gNode.append('circle').attr('r',18).attr('fill',d=>d.color).attr('stroke','#0d1117').attr('stroke-width',1.5);
    gNode.append('text').attr('dy',4).attr('text-anchor','middle').attr('fill','#fff').attr('font-size','8px').attr('font-weight','bold').text(d=>d.id);

    // Hover: highlight ancestors/descendants
    gNode.on('mouseenter',(ev,d)=>{
        const anc=getAnc(d.id),desc=getDesc(d.id),rel=new Set([d.id,...anc,...desc]);
        gNode.attr('opacity',n=>rel.has(n.id)?1:0.12);
        gLink.attr('opacity',l=>{const s=l.source.id||l.source,t=l.target.id||l.target;return rel.has(s)&&rel.has(t)?0.8:0.04});
    }).on('mouseleave',()=>{gNode.attr('opacity',1);gLink.attr('opacity',0.5)});

    // Click: info panel
    gNode.on('click',(ev,d)=>{ev.stopPropagation();showNodeInfo(d)});
    svg.on('click',()=>closeInfo());

    // Tick
    simulation.on('tick',()=>{
        gLink.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
        gIndLinkG.selectAll('line').attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
        gNode.attr('transform',d=>`translate(${d.x},${d.y})`);
    });
}

// Ancestors/descendants
function getAnc(id){const s=new Set(),q=[id],dl=graphData.links.filter(l=>l.type==='direct');while(q.length){const c=q.pop();dl.forEach(e=>{const src=e.source.id||e.source,tgt=e.target.id||e.target;if(tgt===c&&!s.has(src)){s.add(src);q.push(src)}})}return s}
function getDesc(id){const s=new Set(),q=[id],dl=graphData.links.filter(l=>l.type==='direct');while(q.length){const c=q.pop();dl.forEach(e=>{const src=e.source.id||e.source,tgt=e.target.id||e.target;if(src===c&&!s.has(tgt)){s.add(tgt);q.push(tgt)}})}return s}

// Critical path to node (longest path from any start)
function critPath(targetId){
    const dl=graphData.links.filter(l=>l.type==='direct');
    const dist=new Map(),prev=new Map();
    graphData.nodes.forEach(n=>dist.set(n.id,-Infinity));
    // Start nodes = no incoming direct
    const hasIncoming=new Set();dl.forEach(e=>hasIncoming.add(e.target.id||e.target));
    graphData.nodes.filter(n=>!hasIncoming.has(n.id)).forEach(n=>dist.set(n.id,n.hours));
    // Topo sort
    const inDeg=new Map();graphData.nodes.forEach(n=>inDeg.set(n.id,0));
    dl.forEach(e=>{const t=e.target.id||e.target;inDeg.set(t,(inDeg.get(t)||0)+1)});
    const q=[];graphData.nodes.forEach(n=>{if(inDeg.get(n.id)===0)q.push(n.id)});
    const order=[];
    while(q.length){const u=q.shift();order.push(u);dl.forEach(e=>{const s=e.source.id||e.source,t=e.target.id||e.target;if(s===u){inDeg.set(t,inDeg.get(t)-1);if(inDeg.get(t)===0)q.push(t)}})}
    order.forEach(u=>{dl.forEach(e=>{const s=e.source.id||e.source,t=e.target.id||e.target;if(s===u){const nd=gNodeMap.get(t);const w=dist.get(u)+(nd?nd.hours:0);if(w>dist.get(t)){dist.set(t,w);prev.set(t,u)}}})});
    const path=[targetId];let cur=targetId;while(prev.has(cur)){cur=prev.get(cur);path.unshift(cur)}
    return path;
}

// Show node info
function showNodeInfo(d){
    const dl=graphData.links.filter(l=>l.type==='direct');
    const parents=dl.filter(e=>(e.target.id||e.target)===d.id).map(e=>e.source.id||e.source);
    const children=dl.filter(e=>(e.source.id||e.source)===d.id).map(e=>e.target.id||e.target);
    const ind=INDIRECT.filter(ic=>ic[0]===d.id||ic[1]===d.id);
    const inR=parents.map(p=>`<span style="color:#667eea">${p}</span>: ${DR[p+'>'+d.id]||'—'}`).join('<br>');
    const outR=children.map(c=>`→ <span style="color:#667eea">${c}</span>: ${DR[d.id+'>'+c]||'—'}`).join('<br>');
    const ip=document.getElementById('graph-info');
    ip.innerHTML=`<h3 style="color:#667eea;margin:0 0 6px">${d.id}: ${d.name}</h3>
        <div style="margin:3px 0"><span style="color:#aaa">Milestone:</span> ${d.milestone} — ${d.milestoneName}</div>
        <div style="margin:3px 0"><span style="color:#aaa">Parent:</span> [${d.parent}]</div>
        <div style="margin:3px 0"><span style="color:#aaa">Agent:</span> ${d.agent} | <span style="color:#aaa">Hours:</span> ${d.hours}h</div>
        <div style="margin:3px 0"><span style="color:#aaa">Status:</span> ${d.status} | <span style="color:#aaa">Critical:</span> ${d.critical?'Yes':'No'}</div>
        <hr style="border-color:#333;margin:6px 0">
        <div><span style="color:#aaa">Predecessors (${parents.length}):</span><br>${inR||'<i style="color:#666">None (start node)</i>'}</div>
        <hr style="border-color:#333;margin:6px 0">
        <div><span style="color:#aaa">Successors (${children.length}):</span><br>${outR||'<i style="color:#666">None (end node)</i>'}</div>
        ${ind.length?`<hr style="border-color:#333;margin:6px 0"><div><span style="color:#aaa">Indirect (${ind.length}):</span><br>${ind.map(ic=>{const o=ic[0]===d.id?ic[1]:ic[0];return '<span style="color:#f0883e">↔ '+o+'</span>: '+ic[2]}).join('<br>')}</div>`:''}
        <hr style="border-color:#333;margin:6px 0">
        <button onclick="highlightCrit('${d.id}')" style="background:#667eea;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin:2px">Critical Path</button>
        <button onclick="closeInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin:2px">Close</button>`;
    ip.style.display='block';
}

function showEdgeInfo(l,type){
    const s=l.source.id||l.source,t=l.target.id||l.target;
    const ip=document.getElementById('graph-info');
    if(type==='direct'){
        ip.innerHTML=`<h3 style="color:#667eea;margin:0 0 6px">Edge: ${s} → ${t}</h3>
            <div><span style="color:#aaa">From:</span> ${s}: ${gNodeMap.get(s)?.name||'?'}</div>
            <div><span style="color:#aaa">To:</span> ${t}: ${gNodeMap.get(t)?.name||'?'}</div>
            <div style="margin-top:4px"><span style="color:#aaa">Reason:</span> ${DR[s+'>'+t]||'—'}</div>
            <button onclick="closeInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin-top:6px">Close</button>`;
    } else {
        ip.innerHTML=`<h3 style="color:#f0883e;margin:0 0 6px">Indirect: ${s} ↔ ${t}</h3>
            <div><span style="color:#aaa">From:</span> ${s}: ${gNodeMap.get(s)?.name||'?'}</div>
            <div><span style="color:#aaa">To:</span> ${t}: ${gNodeMap.get(t)?.name||'?'}</div>
            <div style="margin-top:4px"><span style="color:#aaa">Reason:</span> ${l.reason||'—'}</div>
            <button onclick="closeInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin-top:6px">Close</button>`;
    }
    ip.style.display='block';
}

function highlightCrit(id){
    const path=critPath(id);
    const ps=new Set(path),pe=new Set();
    for(let i=0;i<path.length-1;i++)pe.add(path[i]+'>'+path[i+1]);
    gNode.attr('opacity',n=>ps.has(n.id)?1:0.08);
    gNode.select('circle').attr('stroke',n=>ps.has(n.id)?'#f5576c':'#0d1117').attr('stroke-width',n=>ps.has(n.id)?3:1.5);
    gLink.attr('opacity',l=>{const s=l.source.id||l.source,t=l.target.id||l.target;return pe.has(s+'>'+t)?1:0.03})
        .attr('stroke',l=>{const s=l.source.id||l.source,t=l.target.id||l.target;return pe.has(s+'>'+t)?'#f5576c':'#667eea'})
        .attr('stroke-width',l=>{const s=l.source.id||l.source,t=l.target.id||l.target;return pe.has(s+'>'+t)?3:1.5})
        .attr('marker-end',l=>{const s=l.source.id||l.source,t=l.target.id||l.target;return pe.has(s+'>'+t)?'url(#a-critical)':'url(#a-direct)'});
    const totalH=path.reduce((s,nid)=>s+(gNodeMap.get(nid)?.hours||0),0);
    const ip=document.getElementById('graph-info');
    ip.innerHTML=`<h3 style="color:#f5576c;margin:0 0 6px">Critical Path to ${id} (${path.length} nodes, ${totalH}h)</h3>
        <div style="font-size:11px;line-height:1.8">${path.map(nid=>'<span style="color:'+(gNodeMap.get(nid)?.color||'#fff')+'">'+nid+'</span>').join(' → ')}</div>
        <button onclick="closeInfo()" style="background:#333;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;margin-top:6px">Clear</button>`;
    ip.style.display='block';
}

function closeInfo(){
    document.getElementById('graph-info').style.display='none';
    if(gNode){gNode.attr('opacity',1);gNode.select('circle').attr('stroke','#0d1117').attr('stroke-width',1.5)}
    if(gLink){gLink.attr('opacity',0.5).attr('stroke','#667eea').attr('stroke-width',1.5).attr('marker-end','url(#a-direct)')}
}

function toggleIndirectLinks(){
    const on=document.getElementById('showIndirect').checked;
    if(gIndLinkG)gIndLinkG.style('display',on?null:'none');
}

function searchGraph(){
    const q=document.getElementById('graphSearch').value.toLowerCase();
    if(!gNode)return;
    gNode.attr('opacity',d=>(!q||d.id.toLowerCase().includes(q)||d.name.toLowerCase().includes(q))?1:0.12);
    if(!q&&gLink)gLink.attr('opacity',0.5);
}

function filterGraph(){
    if(!gNode||!gLink)return;
    const ms=document.getElementById('milestoneFilter').value;
    const ag=document.getElementById('agentFilter').value;
    const cr=document.getElementById('showCritical').checked;
    gNode.attr('opacity',d=>{
        let ok=true;
        if(ms!=='all'&&d.milestone!==parseInt(ms))ok=false;
        if(ag!=='all'&&!d.agent.includes(ag))ok=false;
        if(cr&&!d.critical)ok=false;
        return ok?1:0.08;
    });
    gLink.attr('opacity',l=>{
        const sn=gNodeMap.get(l.source.id||l.source),tn=gNodeMap.get(l.target.id||l.target);
        if(!sn||!tn)return 0.05;
        let ok=true;
        if(ms!=='all'&&sn.milestone!==parseInt(ms)&&tn.milestone!==parseInt(ms))ok=false;
        if(ag!=='all'&&!sn.agent.includes(ag)&&!tn.agent.includes(ag))ok=false;
        if(cr&&!sn.critical&&!tn.critical)ok=false;
        return ok?0.5:0.03;
    });
}

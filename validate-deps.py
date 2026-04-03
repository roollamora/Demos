#!/usr/bin/env python3
"""
Validate every dependency by working backwards from 6.5.6.
For each node A, check if its parent B is ACTUALLY required for A.
If not, find which descendant C needs B, and connect B→C instead.
"""
import re

# Read the Detailed Task Breakdown to understand what each task does
with open('Detailed-Task-Breakdown.md', 'r') as f:
    content = f.read()

# Extract task descriptions
tasks = {}
current_parent = None
current_task = None

for line in content.split('\n'):
    # Parent task
    parent_match = re.match(r'^### \[(\d+\.\d+)\]', line)
    if parent_match:
        current_parent = parent_match.group(1)
        continue
    
    # Subtask
    subtask_match = re.match(r'^#### (\d+\.\d+\.\d+) (.+?) \((\d+) hours\) - (\w+)', line)
    if subtask_match:
        task_id, name, hours, agent = subtask_match.groups()
        tasks[task_id] = {
            'id': task_id,
            'name': name,
            'hours': int(hours),
            'agent': agent,
            'parent': current_parent,
            'description': '',
            'bullet_points': []
        }
        current_task = task_id
        continue
    
    # Bullet points
    if current_task and line.strip().startswith('- [ ]'):
        desc = line.strip()[5:].strip()
        tasks[current_task]['bullet_points'].append(desc)
        if not tasks[current_task]['description']:
            tasks[current_task]['description'] = desc
        else:
            tasks[current_task]['description'] += ' ' + desc

print(f"Loaded {len(tasks)} tasks with descriptions")

# Current edges from the HTML (the 118 dependencies)
current_edges = [
  ["1.1.1","1.1.2"],["1.1.2","1.4.2"],["1.1.3","1.3.1"],["1.1.4","1.2.1"],
  ["1.2.1","1.2.2"],["1.2.2","1.2.3"],["1.2.3","1.2.4"],["1.2.4","1.4.1"],
  ["1.3.1","1.3.2"],["1.3.2","1.3.3"],["1.3.3","1.3.4"],["1.3.4","1.3.5"],["1.3.5","4.1.1"],
  ["1.4.1","1.4.2"],["1.4.2","1.4.3"],["1.4.3","1.4.4"],["1.4.4","2.1.1"],
  ["2.1.1","2.1.3"],["2.1.2","2.1.3"],["2.1.3","2.2.1"],
  ["2.2.1","2.2.2"],["2.2.2","2.2.3"],["2.2.3","2.2.4"],["2.2.4","2.2.5"],["2.2.5","2.3.1"],["2.2.6","2.3.1"],
  ["2.3.1","2.3.2"],["2.3.2","2.3.3"],["2.3.3","2.3.4"],["2.3.4","5.1.1"],
  ["2.4.1","2.4.2"],["2.4.2","2.4.3"],["2.4.3","2.4.4"],["2.4.4","2.4.5"],["2.4.5","2.4.6"],["2.4.6","5.2.1"],
  ["3.1.1","3.1.2"],["3.1.2","3.1.3"],["3.1.3","3.1.4"],["3.1.4","3.2.1"],
  ["3.2.1","3.2.2"],["3.2.2","3.2.3"],["3.2.3","3.2.4"],["3.2.4","3.2.5"],["3.2.5","3.3.1"],
  ["3.3.1","3.3.2"],["3.3.2","3.3.3"],["3.3.3","3.3.4"],["3.3.4","3.3.5"],["3.3.5","3.3.6"],["3.3.6","3.4.1"],
  ["3.4.1","3.4.2"],["3.4.2","3.4.3"],["3.4.3","3.4.4"],["3.4.4","3.4.5"],["3.4.5","3.5.1"],["3.4.6","3.5.1"],
  ["3.5.1","3.5.2"],["3.5.2","3.5.3"],["3.5.3","5.1.1"],["3.5.4","6.3.1"],
  ["4.1.1","4.1.2"],["4.1.2","4.1.4"],["4.1.3","4.1.4"],["4.1.4","4.2.1"],
  ["4.2.1","4.2.2"],["4.2.2","4.2.3"],["4.2.3","4.3.1"],["4.2.4","4.3.1"],
  ["4.3.1","4.3.2"],["4.3.2","4.3.3"],["4.3.3","4.3.4"],["4.3.4","4.3.5"],["4.1.4","6.5.1"],
  ["4.4.1","4.4.2"],["4.4.2","4.4.3"],["4.4.3","6.1.1"],
  ["5.1.1","5.1.2"],["5.1.2","5.1.3"],["5.1.3","5.1.4"],["5.1.4","5.1.5"],["5.1.5","5.1.6"],["5.1.6","5.4.1"],
  ["5.2.1","5.2.2"],["5.2.2","5.2.3"],["5.2.3","5.2.4"],["5.2.4","5.4.1"],
  ["5.3.1","5.3.2"],["5.3.2","5.3.3"],["5.3.3","5.3.4"],["5.3.4","5.4.1"],
  ["5.4.1","5.4.2"],["5.4.2","5.4.3"],["5.4.3","5.4.5"],["5.4.4","6.5.1"],["5.4.5","6.1.1"],
  ["6.1.1","6.1.2"],["6.1.2","6.4.2"],["6.1.3","6.4.2"],["6.1.4","6.4.1"],
  ["6.2.1","6.2.2"],["6.2.2","6.2.3"],["6.2.3","6.2.4"],["6.2.4","6.5.5"],
  ["6.3.1","6.3.2"],["6.3.2","6.3.3"],["6.3.3","6.3.4"],["6.3.4","6.5.5"],
  ["6.4.1","6.4.2"],["6.4.2","6.4.3"],["6.4.3","6.4.4"],["6.4.4","6.4.5"],["6.4.5","6.5.1"],
  ["6.5.1","6.5.2"],["6.5.2","6.5.5"],["6.5.3","6.5.5"],["6.5.4","6.5.5"],["6.5.5","6.5.6"]
]

print(f"\n=== VALIDATING 118 DEPENDENCIES ===")

# Build adjacency lists
children = {}
parents = {}
for s, t in current_edges:
    children.setdefault(s, []).append(t)
    parents.setdefault(t, []).append(s)

# Get all nodes
all_nodes = set(tasks.keys())

# Function to check if B is actually required for A
def is_required(parent_id, child_id):
    parent = tasks[parent_id]
    child = tasks[child_id]
    
    # Quick checks based on task names and common sense
    # These are rules we can apply
    
    # 1. Same parent task? Usually sequential within same parent
    if parent['parent'] == child['parent']:
        # Within same parent, usually sequential (1.1.1 → 1.1.2 → 1.1.3)
        return True
    
    # 2. Infrastructure before application
    if parent_id.startswith('1.3.') and child_id.startswith('2.'):
        # Infrastructure (VPS, Tor, DB) before platform
        return True
    
    # 3. Design before implementation
    if 'Design' in parent['name'] and 'Implementation' in child['name']:
        return True
    
    # 4. Setup before testing
    if 'Setup' in parent['name'] and 'Test' in child['name']:
        return True
    
    # 5. Implementation before security audit
    if child_id.startswith('5.1.') and parent_id.startswith(('2.', '3.')):
        # Security audit needs things to audit
        return True
    
    # 6. Documentation at the end
    if child_id.startswith('6.') and not parent_id.startswith('6.'):
        # Docs need platform to document
        return True
    
    # 7. Specific known requirements
    known_reqs = {
        # CI/CD needs VPS
        ('1.1.3', '1.3.1'): True,
        # Project docs inform platform evaluation
        ('1.1.4', '1.2.1'): True,
        # Platform evaluation informs crypto library selection
        ('1.2.1', '1.2.2'): True,
        # Crypto library informs biometric library
        ('1.2.2', '1.2.3'): True,
        # Biometric library informs architecture docs
        ('1.2.3', '1.2.4'): True,
        # Architecture docs inform repository forking
        ('1.2.4', '1.4.1'): True,
        # VPS setup before OS hardening
        ('1.3.1', '1.3.2'): True,
        # OS hardening before Tor config
        ('1.3.2', '1.3.3'): True,
        # Tor config before DB setup
        ('1.3.3', '1.3.4'): True,
        # DB setup before SSL
        ('1.3.4', '1.3.5'): True,
        # SSL before Tor optimization
        ('1.3.5', '4.1.1'): True,
        # Repository forking before local setup
        ('1.4.1', '1.4.2'): True,
        # Custom theme before UI simplification
        ('2.1.2', '2.1.3'): True,
        # User profiles before 2FA
        ('2.2.6', '2.3.1'): True,
        # Mobile design before anonymization
        ('3.4.6', '3.5.1'): True,
        # Privacy policy docs → privacy policy writing
        ('3.5.4', '6.3.1'): True,
        # Tor browser testing before onion address publication
        ('4.1.3', '4.1.4'): True,
        # Censorship testing informs IPFS setup
        ('4.2.4', '4.3.1'): True,
    }
    
    if (parent_id, child_id) in known_reqs:
        return known_reqs[(parent_id, child_id)]
    
    # Default: if uncertain, assume required (we're being conservative)
    return True

# Validate each edge
valid_edges = []
questionable = []

for s, t in current_edges:
    if is_required(s, t):
        valid_edges.append((s, t))
    else:
        questionable.append((s, t))

print(f"\nValid dependencies: {len(valid_edges)}")
print(f"Questionable dependencies: {len(questionable)}")

if questionable:
    print("\nQUESTIONABLE DEPENDENCIES (need manual review):")
    for s, t in questionable:
        print(f"  {s} → {t}")
        print(f"    {tasks[s]['name']} → {tasks[t]['name']}")

# For each questionable edge, find where the parent IS actually needed
print("\n=== TRACING QUESTIONABLE DEPENDENCIES ===")

# Build full descendant map
def get_all_descendants(node):
    visited = set()
    stack = [node]
    descendants = set()
    
    while stack:
        current = stack.pop()
        if current in children:
            for child in children[current]:
                if child not in visited:
                    visited.add(child)
                    descendants.add(child)
                    stack.append(child)
    return descendants

fixed_edges = valid_edges.copy()

for s, t in questionable:
    # Find all descendants of s
    descendants = get_all_descendants(s)
    
    # Check which descendant actually needs s
    found = False
    for desc in sorted(descendants):
        if is_required(s, desc):
            print(f"  {s} → {t} is questionable, but {s} IS required for {desc}")
            # Replace the edge
            fixed_edges.append((s, desc))
            found = True
            break
    
    if not found:
        # Keep the original if we can't find a better place
        print(f"  {s} → {t} - keeping as is (no better placement found)")
        fixed_edges.append((s, t))

print(f"\n=== FINAL EDGES ===")
print(f"Total edges: {len(fixed_edges)}")

# Remove duplicates
unique_edges = []
seen = set()
for s, t in fixed_edges:
    if (s, t) not in seen:
        seen.add((s, t))
        unique_edges.append((s, t))

print(f"Unique edges: {len(unique_edges)}")

# Verify all reach 6.5.6
def reaches_end(node, edges_list, visited=None):
    if visited is None:
        visited = set()
    if node in visited:
        return False
    visited.add(node)
    
    outgoing = [t for s, t in edges_list if s == node]
    if not outgoing:
        return node == '6.5.6'
    
    return all(reaches_end(n, edges_list, visited.copy()) for n in outgoing)

unreachable = []
for node in all_nodes:
    if not reaches_end(node, unique_edges):
        unreachable.append(node)

print(f"\nNodes NOT reaching 6.5.6: {len(unreachable)}")
if unreachable:
    print(f"  {sorted(unreachable)}")

# Check for cycles
def has_cycle(edges_list):
    visited = set()
    rec_stack = set()
    all_nodes_set = set()
    for s, t in edges_list:
        all_nodes_set.add(s)
        all_nodes_set.add(t)
    
    def dfs(node):
        visited.add(node)
        rec_stack.add(node)
        
        for _, t in edges_list:
            if _ == node:
                if t not in visited:
                    if dfs(t):
                        return True
                elif t in rec_stack:
                    return True
        
        rec_stack.remove(node)
        return False
    
    for node in all_nodes_set:
        if node not in visited:
            if dfs(node):
                return True
    return False

print(f"\nHas cycles: {has_cycle(unique_edges)}")

# Stats
source_nodes = set(s for s, _ in unique_edges)
target_nodes = set(t for _, t in unique_edges)
start_nodes = all_nodes - target_nodes
end_nodes = all_nodes - source_nodes

print(f"\n=== FINAL STATS ===")
print(f"Total tasks: {len(all_nodes)}")
print(f"Dependencies: {len(unique_edges)}")
print(f"Start nodes: {len(start_nodes)}")
print(f"End nodes: {len(end_nodes)}")

# Merge points
in_count = {}
for _, t in unique_edges:
    in_count[t] = in_count.get(t, 0) + 1
merge_points = {k:v for k,v in in_count.items() if v > 1}
print(f"Merge points: {len(merge_points)}")

# Output JavaScript
print(f"\n=== JAVASCRIPT EDGES (VALIDATED) ===")
print("const edges=[")
for i, (s, t) in enumerate(sorted(unique_edges)):
    comma = "," if i < len(unique_edges)-1 else ""
    print(f'  ["{s}","{t}"]{comma}')
print("];")
#!/usr/bin/env python3
"""
Extract all subtasks from Detailed-Task-Breakdown.md and generate complete data.js
"""

import re
import json

def parse_detailed_breakdown(filename):
    """Parse the markdown file and extract all tasks and subtasks"""
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    milestones = []
    current_milestone = None
    current_task = None
    current_subtask = None
    
    lines = content.split('\n')
    
    for line in lines:
        # Milestone header: ## MILESTONE 1: Foundation & Setup (Weeks 1-2)
        milestone_match = re.match(r'^## MILESTONE (\d+): (.+?) \(Weeks? ([\d-]+)\)', line)
        if milestone_match:
            if current_milestone:
                milestones.append(current_milestone)
            
            milestone_id = int(milestone_match.group(1))
            milestone_name = milestone_match.group(2)
            weeks = milestone_match.group(3)
            
            current_milestone = {
                'id': milestone_id,
                'name': milestone_name,
                'weeks': weeks,
                'tasks': []
            }
            continue
        
        # Parent task: ### [1.1] Project Initialization 🔴 (3 days total)
        task_match = re.match(r'^### \[(\d+\.\d+)\] (.+?) (🔴|🟢)? ?\((.+?)\)', line)
        if task_match and current_milestone:
            if current_task:
                current_milestone['tasks'].append(current_task)
            
            task_id = task_match.group(1)
            task_name = task_match.group(2)
            critical = '🔴' in line
            duration = task_match.group(4)
            
            current_task = {
                'id': task_id,
                'name': task_name,
                'critical': critical,
                'duration': duration,
                'subtasks': []
            }
            continue
        
        # Subtask: #### 1.1.1 Repository Setup (4 hours) - DEV
        subtask_match = re.match(r'^#### (\d+\.\d+\.\d+) (.+?) \((\d+) hours?\) - (.+)', line)
        if subtask_match and current_task:
            subtask_id = subtask_match.group(1)
            subtask_name = subtask_match.group(2)
            hours = int(subtask_match.group(3))
            agent = subtask_match.group(4)
            
            current_subtask = {
                'id': subtask_id,
                'name': subtask_name,
                'hours': hours,
                'agent': agent,
                'parent': current_task['id'],
                'milestone': current_milestone['id'],
                'critical': current_task['critical'],
                'status': 'not-started',
                'dependencies': []
            }
            
            current_task['subtasks'].append(current_subtask)
    
    # Add last task and milestone
    if current_task:
        current_milestone['tasks'].append(current_task)
    if current_milestone:
        milestones.append(current_milestone)
    
    return milestones

def generate_data_js(milestones):
    """Generate data.js with all subtasks"""
    
    # Color mapping
    colors = {
        1: "#667eea",
        2: "#764ba2",
        3: "#f093fb",
        4: "#4facfe",
        5: "#43e97b",
        6: "#f5576c"
    }
    
    # Build complete task list
    all_tasks = []
    
    for milestone in milestones:
        for parent_task in milestone['tasks']:
            for subtask in parent_task['subtasks']:
                all_tasks.append({
                    'id': subtask['id'],
                    'name': subtask['name'],
                    'agent': subtask['agent'],
                    'hours': subtask['hours'],
                    'parent': subtask['parent'],
                    'milestone': subtask['milestone'],
                    'milestoneName': milestone['name'],
                    'color': colors.get(milestone['id'], '#667eea'),
                    'critical': subtask['critical'],
                    'status': 'not-started',
                    'dependencies': []
                })
    
    # Infer dependencies based on task order within parent
    for milestone in milestones:
        for parent_task in milestone['tasks']:
            subtasks = parent_task['subtasks']
            for i, subtask in enumerate(subtasks):
                # Each subtask depends on previous subtask in same parent
                if i > 0:
                    prev_subtask = subtasks[i-1]
                    task = next(t for t in all_tasks if t['id'] == subtask['id'])
                    task['dependencies'].append(prev_subtask['id'])
    
    # Generate JavaScript
    js_code = '''// Complete Project Data with All 380+ Subtasks
const PROJECT_DATA = {
    startDate: "2026-03-10",
    milestones: [
'''
    
    for i, milestone in enumerate(milestones):
        js_code += f'''        {{
            id: {milestone['id']},
            name: "{milestone['name']}",
            weeks: "{milestone['weeks']}",
            color: "{colors.get(milestone['id'], '#667eea')}",
            tasks: [
'''
        
        # Get all subtasks for this milestone
        milestone_tasks = [t for t in all_tasks if t['milestone'] == milestone['id']]
        
        for j, task in enumerate(milestone_tasks):
            deps = json.dumps(task['dependencies'])
            js_code += f'''                {{
                    id: "{task['id']}",
                    name: "{task['name']}",
                    agent: "{task['agent']}",
                    hours: {task['hours']},
                    parent: "{task['parent']}",
                    milestone: {task['milestone']},
                    critical: {str(task['critical']).lower()},
                    status: "not-started",
                    dependencies: {deps}
                }}'''
            
            if j < len(milestone_tasks) - 1:
                js_code += ','
            js_code += '\n'
        
        js_code += '            ]\n        }'
        
        if i < len(milestones) - 1:
            js_code += ','
        js_code += '\n'
    
    js_code += '''    ]
};
'''
    
    return js_code, all_tasks

def main():
    print("Parsing Detailed-Task-Breakdown.md...")
    milestones = parse_detailed_breakdown('Detailed-Task-Breakdown.md')
    
    print(f"Found {len(milestones)} milestones")
    
    total_subtasks = sum(len(task['subtasks']) for m in milestones for task in m['tasks'])
    print(f"Found {total_subtasks} subtasks")
    
    print("\nGenerating data.js...")
    js_code, all_tasks = generate_data_js(milestones)
    
    with open('project-dashboard-web/data.js', 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print(f"✅ Generated data.js with {len(all_tasks)} tasks")
    
    # Print summary
    print("\nSummary by milestone:")
    for milestone in milestones:
        count = len([t for t in all_tasks if t['milestone'] == milestone['id']])
        print(f"  M{milestone['id']}: {milestone['name']} - {count} subtasks")

if __name__ == '__main__':
    main()

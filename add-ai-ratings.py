#!/usr/bin/env python3
"""
Add AI capability ratings to all tasks
1 = Not doable by AI (requires human judgment/creativity)
5 = Completely delegatable to AI (routine/automated)
"""

import re

def rate_task_ai_capability(task_name, agent):
    """Rate how much AI can help with this task"""
    
    # Keywords that suggest high AI capability
    high_ai = ['setup', 'installation', 'configuration', 'documentation', 'writing', 
               'translation', 'testing', 'deployment', 'migration', 'generation']
    
    # Keywords that suggest low AI capability
    low_ai = ['design', 'architecture', 'security audit', 'review', 'decision', 
              'selection', 'strategy', 'planning', 'user research']
    
    # Keywords that suggest medium AI capability
    medium_ai = ['implementation', 'development', 'integration', 'optimization']
    
    task_lower = task_name.lower()
    
    # Check for high AI capability (5)
    if any(keyword in task_lower for keyword in ['generate', 'create database', 'write test', 
                                                   'install', 'configure docker', 'translation']):
        return 5
    
    # Check for very low AI capability (1-2)
    if any(keyword in task_lower for keyword in ['architecture design', 'security audit', 
                                                   'key management', 'threat model', 'strategy']):
        return 1 if 'design' in task_lower or 'audit' in task_lower else 2
    
    # Check for low-medium AI capability (2-3)
    if any(keyword in task_lower for keyword in ['review', 'analysis', 'evaluation', 
                                                   'selection', 'planning']):
        return 2
    
    # Check for medium-high AI capability (3-4)
    if any(keyword in task_lower for keyword in ['implementation', 'development', 'coding',
                                                   'api', 'ui', 'form', 'endpoint']):
        return 4
    
    # Check for high AI capability (4-5)
    if any(keyword in task_lower for keyword in ['documentation', 'guide', 'tutorial',
                                                   'testing', 'deployment', 'setup']):
        return 4
    
    # Agent-based defaults
    if agent in ['ARCH', 'SEC']:
        return 2  # Architecture and security need human oversight
    elif agent in ['DEV', 'DEVOPS']:
        return 4  # Development tasks are highly automatable
    elif agent in ['UX']:
        return 3  # UX needs human creativity but AI can help
    elif agent in ['QA']:
        return 4  # Testing is highly automatable
    elif agent in ['CRYPTO']:
        return 2  # Cryptography needs expert review
    
    return 3  # Default medium capability

def add_ai_ratings_to_data_js():
    """Add AI capability ratings to data.js"""
    
    with open('project-dashboard-web/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all task objects and add aiCapability field
    lines = content.split('\n')
    new_lines = []
    
    for i, line in enumerate(lines):
        new_lines.append(line)
        
        # If this line has "status: " and next line has "dependencies:", add aiCapability
        if '"status":' in line or 'status:' in line:
            # Look back to find task name and agent
            task_name = ""
            agent = ""
            
            for j in range(i-1, max(0, i-10), -1):
                if '"name":' in lines[j] or 'name:' in lines[j]:
                    match = re.search(r'name:\s*"([^"]+)"', lines[j])
                    if match:
                        task_name = match.group(1)
                if '"agent":' in lines[j] or 'agent:' in lines[j]:
                    match = re.search(r'agent:\s*"([^"]+)"', lines[j])
                    if match:
                        agent = match.group(1)
            
            # Calculate AI capability rating
            rating = rate_task_ai_capability(task_name, agent)
            
            # Add aiCapability field
            indent = len(line) - len(line.lstrip())
            new_lines.append(' ' * indent + f'aiCapability: {rating},')
    
    # Write back
    with open('project-dashboard-web/data.js', 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    
    print("✅ Added AI capability ratings to all tasks")

if __name__ == '__main__':
    add_ai_ratings_to_data_js()

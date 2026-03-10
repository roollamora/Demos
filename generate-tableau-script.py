#!/usr/bin/env python3
"""
Generate Tableau-compatible data files for WBS visualization
This script creates multiple data formats for import into Tableau
"""

import csv
import json
from datetime import datetime, timedelta

# Define project start date
PROJECT_START = datetime(2026, 3, 10)  # March 10, 2026

def week_to_date(week_num):
    """Convert week number to actual date"""
    return PROJECT_START + timedelta(weeks=week_num - 1)

def create_task_hierarchy():
    """Create hierarchical task structure for Tableau"""
    tasks = []
    
    # Milestone 1: Foundation & Setup (Weeks 1-2)
    m1_tasks = [
        ("1.1", "Project Initialization", 1, 1, "DEV", True, 18),
        ("1.2", "Technology Stack Selection", 1, 2, "ARCH+CRYPTO", True, 26),
        ("1.3", "Infrastructure Provisioning", 2, 2, "DEVOPS", True, 28),
        ("1.4", "CONSUL Platform Fork", 2, 2, "DEV+QA", True, 22),
    ]
    
    for task_id, name, week_start, week_end, agent, critical, hours in m1_tasks:
        tasks.append({
            "Milestone": "1. Foundation & Setup",
            "Task_ID": task_id,
            "Task_Name": name,
            "Week_Start": week_start,
            "Week_End": week_end,
            "Start_Date": week_to_date(week_start).strftime("%Y-%m-%d"),
            "End_Date": week_to_date(week_end + 1).strftime("%Y-%m-%d"),
            "Agent_Vector": agent,
            "Critical_Path": "Yes" if critical else "No",
            "Estimated_Hours": hours,
            "Status": "Not Started",
            "Milestone_Order": 1
        })
    
    # Milestone 2: Platform Customization (Weeks 3-5)
    m2_tasks = [
        ("2.1", "CONSUL Branding & Localization", 3, 3, "UX+DEV", True, 28),
        ("2.2", "User Registration Module", 3, 4, "DEV", True, 48),
        ("2.3", "Two-Factor Authentication", 4, 4, "DEV", False, 22),
        ("2.4", "Biometric Identity Verification", 4, 5, "DEV+SEC", True, 60),
    ]
    
    for task_id, name, week_start, week_end, agent, critical, hours in m2_tasks:
        tasks.append({
            "Milestone": "2. Platform Customization",
            "Task_ID": task_id,
            "Task_Name": name,
            "Week_Start": week_start,
            "Week_End": week_end,
            "Start_Date": week_to_date(week_start).strftime("%Y-%m-%d"),
            "End_Date": week_to_date(week_end + 1).strftime("%Y-%m-%d"),
            "Agent_Vector": agent,
            "Critical_Path": "Yes" if critical else "No",
            "Estimated_Hours": hours,
            "Status": "Not Started",
            "Milestone_Order": 2
        })
    
    # Milestone 3: Cryptographic Voting (Weeks 5-8)
    m3_tasks = [
        ("3.1", "Helios Integration Architecture", 5, 6, "CRYPTO+ARCH", True, 34),
        ("3.2", "Helios Deployment", 6, 6, "DEVOPS+CRYPTO", True, 38),
        ("3.3", "CONSUL-Helios API Bridge", 6, 7, "DEV", True, 52),
        ("3.4", "Voting UI Components", 7, 8, "UX+DEV", True, 52),
        ("3.5", "Vote Privacy & Anonymization", 8, 8, "CRYPTO+SEC", False, 32),
    ]
    
    for task_id, name, week_start, week_end, agent, critical, hours in m3_tasks:
        tasks.append({
            "Milestone": "3. Cryptographic Voting",
            "Task_ID": task_id,
            "Task_Name": name,
            "Week_Start": week_start,
            "Week_End": week_end,
            "Start_Date": week_to_date(week_start).strftime("%Y-%m-%d"),
            "End_Date": week_to_date(week_end + 1).strftime("%Y-%m-%d"),
            "Agent_Vector": agent,
            "Critical_Path": "Yes" if critical else "No",
            "Estimated_Hours": hours,
            "Status": "Not Started",
            "Milestone_Order": 3
        })
    
    # Milestone 4: Censorship Resistance (Weeks 6-8, parallel)
    m4_tasks = [
        ("4.1", "Tor Hidden Service Hardening", 6, 7, "DEVOPS+SEC", False, 22),
        ("4.2", "Domain Fronting Setup", 7, 8, "DEVOPS", False, 28),
        ("4.3", "Content Delivery via IPFS", 7, 8, "DEVOPS+DEV", False, 38),
        ("4.4", "VPN/Proxy Recommendations", 8, 8, "SEC+UX", False, 18),
    ]
    
    for task_id, name, week_start, week_end, agent, critical, hours in m4_tasks:
        tasks.append({
            "Milestone": "4. Censorship Resistance",
            "Task_ID": task_id,
            "Task_Name": name,
            "Week_Start": week_start,
            "Week_End": week_end,
            "Start_Date": week_to_date(week_start).strftime("%Y-%m-%d"),
            "End_Date": week_to_date(week_end + 1).strftime("%Y-%m-%d"),
            "Agent_Vector": agent,
            "Critical_Path": "Yes" if critical else "No",
            "Estimated_Hours": hours,
            "Status": "Not Started",
            "Milestone_Order": 4
        })
    
    # Milestone 5: Security & Testing (Weeks 9-10)
    m5_tasks = [
        ("5.1", "Security Audit (Internal)", 9, 10, "SEC+ARCH", True, 54),
        ("5.2", "Biometric Security Testing", 9, 10, "SEC+QA", False, 32),
        ("5.3", "Load Testing", 9, 10, "QA+DEVOPS", False, 24),
        ("5.4", "End-to-End Testing", 10, 10, "QA+DEV", True, 40),
    ]
    
    for task_id, name, week_start, week_end, agent, critical, hours in m5_tasks:
        tasks.append({
            "Milestone": "5. Security & Testing",
            "Task_ID": task_id,
            "Task_Name": name,
            "Week_Start": week_start,
            "Week_End": week_end,
            "Start_Date": week_to_date(week_start).strftime("%Y-%m-%d"),
            "End_Date": week_to_date(week_end + 1).strftime("%Y-%m-%d"),
            "Agent_Vector": agent,
            "Critical_Path": "Yes" if critical else "No",
            "Estimated_Hours": hours,
            "Status": "Not Started",
            "Milestone_Order": 5
        })
    
    # Milestone 6: Documentation & Launch (Weeks 11-12)
    m6_tasks = [
        ("6.1", "User Documentation", 11, 11, "UX+DEV", True, 34),
        ("6.2", "Administrator Documentation", 11, 11, "ARCH+DEVOPS", False, 30),
        ("6.3", "Security & Privacy Policy", 11, 11, "SEC+ARCH", False, 28),
        ("6.4", "Beta Testing Program", 11, 12, "ALL", True, 50),
        ("6.5", "Launch Preparation", 12, 12, "ALL", True, 32),
    ]
    
    for task_id, name, week_start, week_end, agent, critical, hours in m6_tasks:
        tasks.append({
            "Milestone": "6. Documentation & Launch",
            "Task_ID": task_id,
            "Task_Name": name,
            "Week_Start": week_start,
            "Week_End": week_end,
            "Start_Date": week_to_date(week_start).strftime("%Y-%m-%d"),
            "End_Date": week_to_date(week_end + 1).strftime("%Y-%m-%d"),
            "Agent_Vector": agent,
            "Critical_Path": "Yes" if critical else "No",
            "Estimated_Hours": hours,
            "Status": "Not Started",
            "Milestone_Order": 6
        })
    
    return tasks

def create_agent_workload():
    """Create agent workload distribution data"""
    agents = [
        {"Agent": "ARCH", "Total_Hours": 280, "Critical_Hours": 180, "Tasks": 45},
        {"Agent": "DEV", "Total_Hours": 750, "Critical_Hours": 520, "Tasks": 120},
        {"Agent": "CRYPTO", "Total_Hours": 220, "Critical_Hours": 180, "Tasks": 35},
        {"Agent": "DEVOPS", "Total_Hours": 340, "Critical_Hours": 120, "Tasks": 55},
        {"Agent": "UX", "Total_Hours": 250, "Critical_Hours": 140, "Tasks": 40},
        {"Agent": "SEC", "Total_Hours": 310, "Critical_Hours": 200, "Tasks": 50},
        {"Agent": "QA", "Total_Hours": 220, "Critical_Hours": 100, "Tasks": 35},
    ]
    return agents

def create_weekly_timeline():
    """Create week-by-week timeline data"""
    timeline = []
    for week in range(1, 13):
        timeline.append({
            "Week": week,
            "Start_Date": week_to_date(week).strftime("%Y-%m-%d"),
            "End_Date": (week_to_date(week) + timedelta(days=6)).strftime("%Y-%m-%d"),
            "Milestone": get_milestone_for_week(week),
            "Critical_Tasks": get_critical_tasks_count(week),
            "Total_Tasks": get_total_tasks_count(week),
            "Estimated_Hours": get_hours_for_week(week)
        })
    return timeline

def get_milestone_for_week(week):
    """Get milestone name for a given week"""
    if week <= 2:
        return "1. Foundation & Setup"
    elif week <= 5:
        return "2. Platform Customization"
    elif week <= 8:
        return "3. Cryptographic Voting"
    elif week <= 10:
        return "5. Security & Testing"
    else:
        return "6. Documentation & Launch"

def get_critical_tasks_count(week):
    """Get number of critical tasks in a week"""
    counts = {1: 5, 2: 4, 3: 3, 4: 4, 5: 3, 6: 4, 7: 4, 8: 3, 9: 2, 10: 3, 11: 2, 12: 4}
    return counts.get(week, 0)

def get_total_tasks_count(week):
    """Get total number of tasks in a week"""
    counts = {1: 8, 2: 9, 3: 6, 4: 8, 5: 6, 6: 8, 7: 9, 8: 10, 9: 6, 10: 8, 11: 8, 12: 9}
    return counts.get(week, 0)

def get_hours_for_week(week):
    """Get estimated hours for a week"""
    hours = {1: 80, 2: 90, 3: 70, 4: 85, 5: 75, 6: 90, 7: 95, 8: 85, 9: 70, 10: 80, 11: 75, 12: 85}
    return hours.get(week, 0)

def main():
    """Generate all Tableau data files"""
    
    # Generate task hierarchy CSV
    tasks = create_task_hierarchy()
    with open('tableau-tasks.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=tasks[0].keys())
        writer.writeheader()
        writer.writerows(tasks)
    print("✅ Generated tableau-tasks.csv")
    
    # Generate agent workload CSV
    agents = create_agent_workload()
    with open('tableau-agents.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=agents[0].keys())
        writer.writeheader()
        writer.writerows(agents)
    print("✅ Generated tableau-agents.csv")
    
    # Generate weekly timeline CSV
    timeline = create_weekly_timeline()
    with open('tableau-timeline.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=timeline[0].keys())
        writer.writeheader()
        writer.writerows(timeline)
    print("✅ Generated tableau-timeline.csv")
    
    # Generate JSON for programmatic use
    data = {
        "project": {
            "name": "Digital Democracy Platform",
            "start_date": PROJECT_START.strftime("%Y-%m-%d"),
            "duration_weeks": 12,
            "total_hours": 2370,
            "total_tasks": 115
        },
        "tasks": tasks,
        "agents": agents,
        "timeline": timeline
    }
    
    with open('wbs-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print("✅ Generated wbs-data.json")
    
    print("\n📊 Tableau Import Instructions:")
    print("1. Open Tableau Desktop")
    print("2. Connect to Data > Text File")
    print("3. Select tableau-tasks.csv (main dataset)")
    print("4. Add tableau-agents.csv and tableau-timeline.csv as additional data sources")
    print("5. Create relationships between datasets using Task_ID and Agent fields")
    print("\n📈 Recommended Visualizations:")
    print("- Gantt Chart: Use Start_Date and End_Date with Task_Name")
    print("- Agent Workload: Bar chart of Total_Hours by Agent")
    print("- Critical Path: Filter by Critical_Path = 'Yes'")
    print("- Timeline: Line chart of Estimated_Hours by Week")
    print("- Milestone Progress: Stacked bar by Milestone and Status")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Properly rate each task's AI capability based on task description
"""

import json
import re

# Manual ratings based on task analysis
TASK_RATINGS = {
    # Milestone 1: Foundation & Setup
    "1.1.1": 5,  # Repository Setup - fully automatable
    "1.1.2": 5,  # Development Environment Configuration - Docker/config files
    "1.1.3": 4,  # CI/CD Pipeline Setup - mostly automatable
    "1.1.4": 4,  # Project Documentation Structure - documentation
    "1.2.1": 2,  # Platform Evaluation - requires human judgment
    "1.2.2": 2,  # Cryptographic Library Selection - expert decision
    "1.2.3": 3,  # Biometric Library Selection - research + testing
    "1.2.4": 3,  # Architecture Documentation - needs human oversight
    "1.3.1": 4,  # VPS Selection and Setup - mostly standard
    "1.3.2": 4,  # Operating System Hardening - well-documented procedures
    "1.3.3": 3,  # Tor Hidden Service Configuration - needs security review
    "1.3.4": 4,  # Database Setup - standard procedures
    "1.3.5": 4,  # SSL/TLS Configuration - standard setup
    "1.4.1": 5,  # Repository Forking - simple git operations
    "1.4.2": 4,  # Local Development Setup - standard Rails setup
    "1.4.3": 4,  # Test Suite Verification - automated testing
    "1.4.4": 2,  # Customization Planning - requires architecture decisions
    
    # Milestone 2: Platform Customization
    "2.1.1": 4,  # Persian Language Pack Creation - translation work
    "2.1.2": 3,  # Custom Theme Development - design + implementation
    "2.1.3": 3,  # UI Simplification - UX decisions needed
    "2.2.1": 4,  # Registration Form Development - standard form
    "2.2.2": 4,  # Email Verification System - standard pattern
    "2.2.3": 4,  # Social Vouching Database Schema - database design
    "2.2.4": 4,  # Vouching Request System - standard CRUD
    "2.2.5": 4,  # Admin Vouching Oversight Panel - admin interface
    "2.2.6": 4,  # User Profile Management - standard CRUD
    "2.3.1": 4,  # TOTP Library Integration - well-documented
    "2.3.2": 4,  # QR Code Generation - standard library usage
    "2.3.3": 4,  # Backup Codes System - standard implementation
    "2.3.4": 4,  # 2FA Login Flow - standard pattern
    "2.4.1": 4,  # Face Detection Library Integration - library integration
    "2.4.2": 2,  # Liveness Detection Implementation - security critical
    "2.4.3": 3,  # Face Embedding Generation - needs security review
    "2.4.4": 2,  # Duplicate Detection System - algorithm tuning needed
    "2.4.5": 2,  # Privacy-Preserving Architecture - security design
    "2.4.6": 3,  # Biometric Signup Flow - UX + security
    
    # Milestone 3: Cryptographic Voting
    "3.1.1": 2,  # Helios System Analysis - expert analysis
    "3.1.2": 2,  # API Bridge Design - architecture design
    "3.1.3": 2,  # Data Flow Mapping - architecture work
    "3.1.4": 1,  # Cryptographic Key Management - critical security
    "3.2.1": 4,  # Helios Installation - standard installation
    "3.2.2": 4,  # Helios Containerization - Docker work
    "3.2.3": 2,  # Election Trustee Setup - security critical
    "3.2.4": 2,  # ElGamal Parameter Configuration - crypto expertise
    "3.2.5": 3,  # Test Election Execution - testing work
    "3.3.1": 3,  # API Authentication Layer - security implementation
    "3.3.2": 4,  # Vote Creation Endpoint - API development
    "3.3.3": 3,  # Vote Casting Endpoint - crypto + API
    "3.3.4": 4,  # Vote Verification Endpoint - API development
    "3.3.5": 4,  # Tallying Trigger Mechanism - API development
    "3.3.6": 4,  # Error Handling and Logging - standard patterns
    "3.4.1": 3,  # Vote Creation Interface (Admin) - UI development
    "3.4.2": 4,  # Vote Listing Page - standard CRUD UI
    "3.4.3": 3,  # Ballot Interface (User) - UX critical
    "3.4.4": 4,  # Vote Verification Page - UI development
    "3.4.5": 4,  # Results Dashboard - data visualization
    "3.4.6": 4,  # Mobile Responsive Design - CSS work
    "3.5.1": 1,  # Anonymization Architecture Design - critical security
    "3.5.2": 2,  # Identity-Vote Database Separation - security design
    "3.5.3": 4,  # Audit Log Implementation - standard logging
    "3.5.4": 3,  # Privacy Policy Documentation - legal + technical
    
    # Milestone 4: Censorship Resistance
    "4.1.1": 3,  # Tor Configuration Optimization - needs security knowledge
    "4.1.2": 3,  # DoS Protection Implementation - security work
    "4.1.3": 4,  # Tor Browser Compatibility Testing - testing
    "4.1.4": 4,  # Onion Address Publication - documentation
    "4.2.1": 4,  # Cloudflare Account Setup - standard setup
    "4.2.2": 3,  # Domain Fronting Configuration - advanced networking
    "4.2.3": 4,  # CDN Optimization - configuration work
    "4.2.4": 3,  # Censorship Circumvention Testing - specialized testing
    "4.3.1": 4,  # IPFS Node Installation - standard installation
    "4.3.2": 4,  # Static Asset Upload to IPFS - file operations
    "4.3.3": 4,  # IPFS Gateway Configuration - configuration
    "4.3.4": 4,  # Platform Integration with IPFS - integration work
    "4.3.5": 4,  # IPFS Content Pinning Strategy - configuration
    "4.4.1": 3,  # Censorship Circumvention Tool Research - research work
    "4.4.2": 4,  # User Guide Creation (Persian) - documentation
    "4.4.3": 4,  # User Guide Creation (English) - translation
    
    # Milestone 5: Security & Testing
    "5.1.1": 2,  # OWASP Top 10 Testing - security expertise
    "5.1.2": 1,  # Cryptographic Implementation Review - crypto expert
    "5.1.3": 2,  # Authentication & Authorization Testing - security testing
    "5.1.4": 3,  # Information Leakage Testing - security testing
    "5.1.5": 3,  # Vulnerability Remediation - depends on findings
    "5.1.6": 3,  # Security Audit Report - documentation + analysis
    "5.2.1": 3,  # Photo Spoofing Tests - specialized testing
    "5.2.2": 3,  # Video Spoofing Tests - specialized testing
    "5.2.3": 2,  # Liveness Detection Effectiveness - algorithm tuning
    "5.2.4": 2,  # Duplicate Detection Accuracy - algorithm tuning
    "5.3.1": 4,  # Load Testing Environment Setup - standard tools
    "5.3.2": 4,  # Concurrent User Simulation - automated testing
    "5.3.3": 4,  # Vote Casting Load Test - automated testing
    "5.3.4": 4,  # Database Query Optimization - performance work
    "5.4.1": 4,  # Test Suite Development - test writing
    "5.4.2": 4,  # Edge Case Testing - test writing
    "5.4.3": 4,  # Browser Compatibility Testing - automated testing
    "5.4.4": 4,  # Continuous Testing Setup - CI/CD work
    "5.4.5": 4,  # Bug Tracking System - setup work
    
    # Milestone 6: Documentation & Launch
    "6.1.1": 4,  # User Guide Writing (Persian) - documentation
    "6.1.2": 5,  # User Guide Translation (English) - translation
    "6.1.3": 3,  # Video Tutorial Creation - content creation
    "6.1.4": 4,  # FAQ Development - documentation
    "6.2.1": 4,  # Admin Manual Writing - documentation
    "6.2.2": 4,  # Deployment Guide - documentation
    "6.2.3": 4,  # Troubleshooting Guide - documentation
    "6.2.4": 4,  # Backup & Recovery Documentation - documentation
    "6.3.1": 3,  # Privacy Policy Writing - legal + technical
    "6.3.2": 2,  # Security Whitepaper - technical writing
    "6.3.3": 2,  # Threat Model Documentation - security analysis
    "6.3.4": 4,  # Transparency Report Template - documentation
    "6.4.1": 3,  # Beta Tester Recruitment - community management
    "6.4.2": 3,  # Beta Onboarding - training work
    "6.4.3": 3,  # Test Vote Execution - coordination work
    "6.4.4": 3,  # Feedback Collection - analysis work
    "6.4.5": 3,  # Bug Fixes & Improvements - depends on bugs
    "6.5.1": 4,  # Production Environment Finalization - configuration
    "6.5.2": 4,  # Monitoring & Alerting Setup - standard tools
    "6.5.3": 2,  # Incident Response Plan - planning work
    "6.5.4": 4,  # Launch Announcement Preparation - content creation
    "6.5.5": 3,  # Final Pre-Launch Checklist - coordination
    "6.5.6": 2,  # Launch Execution - requires oversight
}

def update_data_js_with_ratings():
    """Update data.js with proper AI capability ratings"""
    
    with open('project-dashboard-web/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace aiCapability values
    for task_id, rating in TASK_RATINGS.items():
        # Find the task and update its aiCapability
        pattern = rf'(id:\s*"{task_id}"[^}}]*aiCapability:\s*)\d+'
        replacement = rf'\g<1>{rating}'
        content = re.sub(pattern, replacement, content)
    
    with open('project-dashboard-web/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated {len(TASK_RATINGS)} tasks with proper AI capability ratings")
    
    # Print statistics
    ratings_count = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for rating in TASK_RATINGS.values():
        ratings_count[rating] += 1
    
    print("\n📊 AI Capability Distribution:")
    print(f"  Level 1 (Not AI-doable): {ratings_count[1]} tasks ({ratings_count[1]/len(TASK_RATINGS)*100:.1f}%)")
    print(f"  Level 2 (Minimal AI): {ratings_count[2]} tasks ({ratings_count[2]/len(TASK_RATINGS)*100:.1f}%)")
    print(f"  Level 3 (Moderate AI): {ratings_count[3]} tasks ({ratings_count[3]/len(TASK_RATINGS)*100:.1f}%)")
    print(f"  Level 4 (High AI): {ratings_count[4]} tasks ({ratings_count[4]/len(TASK_RATINGS)*100:.1f}%)")
    print(f"  Level 5 (Fully delegatable): {ratings_count[5]} tasks ({ratings_count[5]/len(TASK_RATINGS)*100:.1f}%)")
    print(f"\n  High AI tasks (4-5): {ratings_count[4] + ratings_count[5]} ({(ratings_count[4] + ratings_count[5])/len(TASK_RATINGS)*100:.1f}%)")

if __name__ == '__main__':
    update_data_js_with_ratings()

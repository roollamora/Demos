// Complete WBS Network Data
// Generated: 2026-03-10T20:07:32.184423
// Total Tasks: 74
// Total Links: 131

window.WBS_TASKS = [
  {
    "id": "1.1",
    "name": "Project Init",
    "fullName": "Project Initialization",
    "milestone": 1,
    "agent": "DEV",
    "hours": 18,
    "week": 1,
    "critical": true,
    "parent": true
  },
  {
    "id": "1.2",
    "name": "Tech Stack",
    "fullName": "Technology Stack Selection",
    "milestone": 1,
    "agent": "ARCH",
    "hours": 26,
    "week": 1,
    "critical": true,
    "parent": true
  },
  {
    "id": "1.3",
    "name": "Infrastructure",
    "fullName": "Infrastructure Provisioning",
    "milestone": 1,
    "agent": "DEVOPS",
    "hours": 28,
    "week": 2,
    "critical": true,
    "parent": true
  },
  {
    "id": "1.4",
    "name": "CONSUL Fork",
    "fullName": "CONSUL Platform Fork",
    "milestone": 1,
    "agent": "DEV",
    "hours": 22,
    "week": 2,
    "critical": true,
    "parent": true
  },
  {
    "id": "1.1.1",
    "name": "Repository Setup",
    "fullName": "Repository Setup",
    "milestone": 1,
    "agent": "DEV",
    "hours": 4,
    "week": 1,
    "critical": true,
    "parent": false,
    "parentId": "1.1"
  },
  {
    "id": "1.1.2",
    "name": "Dev Environment Config",
    "fullName": "Dev Environment Config",
    "milestone": 1,
    "agent": "DEV",
    "hours": 6,
    "week": 1,
    "critical": true,
    "parent": false,
    "parentId": "1.1"
  },
  {
    "id": "1.1.3",
    "name": "CI/CD Pipeline",
    "fullName": "CI/CD Pipeline",
    "milestone": 1,
    "agent": "DEVOPS",
    "hours": 8,
    "week": 1,
    "critical": true,
    "parent": false,
    "parentId": "1.1"
  },
  {
    "id": "1.1.4",
    "name": "Project Documentation",
    "fullName": "Project Documentation",
    "milestone": 1,
    "agent": "ARCH",
    "hours": 4,
    "week": 1,
    "critical": false,
    "parent": false,
    "parentId": "1.1"
  },
  {
    "id": "1.2.1",
    "name": "Platform Evaluation",
    "fullName": "Platform Evaluation",
    "milestone": 1,
    "agent": "ARCH",
    "hours": 6,
    "week": 1,
    "critical": true,
    "parent": false,
    "parentId": "1.2"
  },
  {
    "id": "1.2.2",
    "name": "Crypto Library Selection",
    "fullName": "Crypto Library Selection",
    "milestone": 1,
    "agent": "CRYPTO",
    "hours": 8,
    "week": 1,
    "critical": true,
    "parent": false,
    "parentId": "1.2"
  },
  {
    "id": "1.2.3",
    "name": "Biometric Library Selection",
    "fullName": "Biometric Library Selection",
    "milestone": 1,
    "agent": "DEV+SEC",
    "hours": 6,
    "week": 1,
    "critical": false,
    "parent": false,
    "parentId": "1.2"
  },
  {
    "id": "1.2.4",
    "name": "Architecture Documentation",
    "fullName": "Architecture Documentation",
    "milestone": 1,
    "agent": "ARCH",
    "hours": 6,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.2"
  },
  {
    "id": "1.3.1",
    "name": "VPS Setup",
    "fullName": "VPS Setup",
    "milestone": 1,
    "agent": "DEVOPS",
    "hours": 4,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.3"
  },
  {
    "id": "1.3.2",
    "name": "OS Hardening",
    "fullName": "OS Hardening",
    "milestone": 1,
    "agent": "DEVOPS",
    "hours": 6,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.3"
  },
  {
    "id": "1.3.3",
    "name": "Tor Configuration",
    "fullName": "Tor Configuration",
    "milestone": 1,
    "agent": "DEVOPS+SEC",
    "hours": 8,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.3"
  },
  {
    "id": "1.3.4",
    "name": "Database Setup",
    "fullName": "Database Setup",
    "milestone": 1,
    "agent": "DEVOPS",
    "hours": 6,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.3"
  },
  {
    "id": "1.3.5",
    "name": "SSL/TLS Config",
    "fullName": "SSL/TLS Config",
    "milestone": 1,
    "agent": "DEVOPS",
    "hours": 4,
    "week": 2,
    "critical": false,
    "parent": false,
    "parentId": "1.3"
  },
  {
    "id": "1.4.1",
    "name": "Repository Forking",
    "fullName": "Repository Forking",
    "milestone": 1,
    "agent": "DEV",
    "hours": 2,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.4"
  },
  {
    "id": "1.4.2",
    "name": "Local Dev Setup",
    "fullName": "Local Dev Setup",
    "milestone": 1,
    "agent": "DEV",
    "hours": 8,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.4"
  },
  {
    "id": "1.4.3",
    "name": "Test Suite Verification",
    "fullName": "Test Suite Verification",
    "milestone": 1,
    "agent": "QA",
    "hours": 6,
    "week": 2,
    "critical": false,
    "parent": false,
    "parentId": "1.4"
  },
  {
    "id": "1.4.4",
    "name": "Customization Planning",
    "fullName": "Customization Planning",
    "milestone": 1,
    "agent": "ARCH+DEV",
    "hours": 6,
    "week": 2,
    "critical": true,
    "parent": false,
    "parentId": "1.4"
  },
  {
    "id": "2.1",
    "name": "Branding",
    "fullName": "CONSUL Branding & Localization",
    "milestone": 2,
    "agent": "UX",
    "hours": 28,
    "week": 3,
    "critical": true,
    "parent": true
  },
  {
    "id": "2.2",
    "name": "Registration",
    "fullName": "User Registration Module",
    "milestone": 2,
    "agent": "DEV",
    "hours": 48,
    "week": 3,
    "critical": true,
    "parent": true
  },
  {
    "id": "2.3",
    "name": "2FA",
    "fullName": "Two-Factor Authentication",
    "milestone": 2,
    "agent": "DEV",
    "hours": 22,
    "week": 4,
    "critical": false,
    "parent": true
  },
  {
    "id": "2.4",
    "name": "Biometrics",
    "fullName": "Biometric Identity Verification",
    "milestone": 2,
    "agent": "DEV+SEC",
    "hours": 60,
    "week": 4,
    "critical": true,
    "parent": true
  },
  {
    "id": "2.1.1",
    "name": "Persian Language Pack",
    "fullName": "Persian Language Pack",
    "milestone": 2,
    "agent": "UX+DEV",
    "hours": 12,
    "week": 3,
    "critical": true,
    "parent": false,
    "parentId": "2.1"
  },
  {
    "id": "2.1.2",
    "name": "Custom Theme",
    "fullName": "Custom Theme",
    "milestone": 2,
    "agent": "UX",
    "hours": 8,
    "week": 3,
    "critical": false,
    "parent": false,
    "parentId": "2.1"
  },
  {
    "id": "2.1.3",
    "name": "UI Simplification",
    "fullName": "UI Simplification",
    "milestone": 2,
    "agent": "UX+DEV",
    "hours": 8,
    "week": 3,
    "critical": true,
    "parent": false,
    "parentId": "2.1"
  },
  {
    "id": "2.2.1",
    "name": "Registration Form",
    "fullName": "Registration Form",
    "milestone": 2,
    "agent": "DEV",
    "hours": 8,
    "week": 3,
    "critical": true,
    "parent": false,
    "parentId": "2.2"
  },
  {
    "id": "2.2.2",
    "name": "Email Verification",
    "fullName": "Email Verification",
    "milestone": 2,
    "agent": "DEV",
    "hours": 8,
    "week": 3,
    "critical": true,
    "parent": false,
    "parentId": "2.2"
  },
  {
    "id": "2.2.3",
    "name": "Vouching DB Schema",
    "fullName": "Vouching DB Schema",
    "milestone": 2,
    "agent": "DEV",
    "hours": 6,
    "week": 4,
    "critical": true,
    "parent": false,
    "parentId": "2.2"
  },
  {
    "id": "2.2.4",
    "name": "Vouching Request System",
    "fullName": "Vouching Request System",
    "milestone": 2,
    "agent": "DEV",
    "hours": 10,
    "week": 4,
    "critical": true,
    "parent": false,
    "parentId": "2.2"
  },
  {
    "id": "2.2.5",
    "name": "Admin Vouching Panel",
    "fullName": "Admin Vouching Panel",
    "milestone": 2,
    "agent": "DEV",
    "hours": 8,
    "week": 4,
    "critical": false,
    "parent": false,
    "parentId": "2.2"
  },
  {
    "id": "2.2.6",
    "name": "User Profile Mgmt",
    "fullName": "User Profile Mgmt",
    "milestone": 2,
    "agent": "DEV",
    "hours": 8,
    "week": 4,
    "critical": false,
    "parent": false,
    "parentId": "2.2"
  },
  {
    "id": "2.3.1",
    "name": "TOTP Integration",
    "fullName": "TOTP Integration",
    "milestone": 2,
    "agent": "DEV",
    "hours": 6,
    "week": 4,
    "critical": false,
    "parent": false,
    "parentId": "2.3"
  },
  {
    "id": "2.3.2",
    "name": "QR Code Generation",
    "fullName": "QR Code Generation",
    "milestone": 2,
    "agent": "DEV",
    "hours": 4,
    "week": 4,
    "critical": false,
    "parent": false,
    "parentId": "2.3"
  },
  {
    "id": "2.3.3",
    "name": "Backup Codes",
    "fullName": "Backup Codes",
    "milestone": 2,
    "agent": "DEV",
    "hours": 6,
    "week": 4,
    "critical": false,
    "parent": false,
    "parentId": "2.3"
  },
  {
    "id": "2.3.4",
    "name": "2FA Login Flow",
    "fullName": "2FA Login Flow",
    "milestone": 2,
    "agent": "DEV",
    "hours": 6,
    "week": 4,
    "critical": false,
    "parent": false,
    "parentId": "2.3"
  },
  {
    "id": "2.4.1",
    "name": "Face Detection Integration",
    "fullName": "Face Detection Integration",
    "milestone": 2,
    "agent": "DEV",
    "hours": 8,
    "week": 4,
    "critical": true,
    "parent": false,
    "parentId": "2.4"
  },
  {
    "id": "2.4.2",
    "name": "Liveness Detection",
    "fullName": "Liveness Detection",
    "milestone": 2,
    "agent": "DEV+SEC",
    "hours": 12,
    "week": 4,
    "critical": true,
    "parent": false,
    "parentId": "2.4"
  },
  {
    "id": "2.4.3",
    "name": "Face Embedding Generation",
    "fullName": "Face Embedding Generation",
    "milestone": 2,
    "agent": "DEV",
    "hours": 10,
    "week": 5,
    "critical": true,
    "parent": false,
    "parentId": "2.4"
  },
  {
    "id": "2.4.4",
    "name": "Duplicate Detection",
    "fullName": "Duplicate Detection",
    "milestone": 2,
    "agent": "DEV+SEC",
    "hours": 12,
    "week": 5,
    "critical": true,
    "parent": false,
    "parentId": "2.4"
  },
  {
    "id": "2.4.5",
    "name": "Privacy Architecture",
    "fullName": "Privacy Architecture",
    "milestone": 2,
    "agent": "SEC+DEV",
    "hours": 8,
    "week": 5,
    "critical": true,
    "parent": false,
    "parentId": "2.4"
  },
  {
    "id": "2.4.6",
    "name": "Biometric Signup Flow",
    "fullName": "Biometric Signup Flow",
    "milestone": 2,
    "agent": "DEV+UX",
    "hours": 10,
    "week": 5,
    "critical": true,
    "parent": false,
    "parentId": "2.4"
  },
  {
    "id": "3.1",
    "name": "Helios Arch",
    "fullName": "Helios Integration Architecture",
    "milestone": 3,
    "agent": "CRYPTO",
    "hours": 34,
    "week": 5,
    "critical": true,
    "parent": true
  },
  {
    "id": "3.2",
    "name": "Helios Deploy",
    "fullName": "Helios Deployment",
    "milestone": 3,
    "agent": "DEVOPS",
    "hours": 38,
    "week": 6,
    "critical": true,
    "parent": true
  },
  {
    "id": "3.3",
    "name": "API Bridge",
    "fullName": "CONSUL-Helios API Bridge",
    "milestone": 3,
    "agent": "DEV",
    "hours": 52,
    "week": 6,
    "critical": true,
    "parent": true
  },
  {
    "id": "3.4",
    "name": "Voting UI",
    "fullName": "Voting UI Components",
    "milestone": 3,
    "agent": "UX+DEV",
    "hours": 52,
    "week": 7,
    "critical": true,
    "parent": true
  },
  {
    "id": "3.5",
    "name": "Privacy",
    "fullName": "Vote Privacy & Anonymization",
    "milestone": 3,
    "agent": "CRYPTO",
    "hours": 32,
    "week": 8,
    "critical": false,
    "parent": true
  },
  {
    "id": "3.1.1",
    "name": "Helios System Analysis",
    "fullName": "Helios System Analysis",
    "milestone": 3,
    "agent": "CRYPTO+ARCH",
    "hours": 8,
    "week": 5,
    "critical": true,
    "parent": false,
    "parentId": "3.1"
  },
  {
    "id": "3.1.2",
    "name": "API Bridge Design",
    "fullName": "API Bridge Design",
    "milestone": 3,
    "agent": "ARCH",
    "hours": 10,
    "week": 5,
    "critical": true,
    "parent": false,
    "parentId": "3.1"
  },
  {
    "id": "3.1.3",
    "name": "Data Flow Mapping",
    "fullName": "Data Flow Mapping",
    "milestone": 3,
    "agent": "ARCH",
    "hours": 8,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.1"
  },
  {
    "id": "3.1.4",
    "name": "Crypto Key Management",
    "fullName": "Crypto Key Management",
    "milestone": 3,
    "agent": "CRYPTO",
    "hours": 8,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.1"
  },
  {
    "id": "3.2.1",
    "name": "Helios Installation",
    "fullName": "Helios Installation",
    "milestone": 3,
    "agent": "DEVOPS",
    "hours": 8,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.2"
  },
  {
    "id": "3.2.2",
    "name": "Helios Containerization",
    "fullName": "Helios Containerization",
    "milestone": 3,
    "agent": "DEVOPS",
    "hours": 6,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.2"
  },
  {
    "id": "3.2.3",
    "name": "Election Trustee Setup",
    "fullName": "Election Trustee Setup",
    "milestone": 3,
    "agent": "CRYPTO+DEVOPS",
    "hours": 10,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.2"
  },
  {
    "id": "3.2.4",
    "name": "ElGamal Config",
    "fullName": "ElGamal Config",
    "milestone": 3,
    "agent": "CRYPTO",
    "hours": 6,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.2"
  },
  {
    "id": "3.2.5",
    "name": "Test Election",
    "fullName": "Test Election",
    "milestone": 3,
    "agent": "CRYPTO+QA",
    "hours": 8,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.2"
  },
  {
    "id": "3.3.1",
    "name": "API Authentication",
    "fullName": "API Authentication",
    "milestone": 3,
    "agent": "DEV",
    "hours": 8,
    "week": 6,
    "critical": true,
    "parent": false,
    "parentId": "3.3"
  },
  {
    "id": "3.3.2",
    "name": "Vote Creation Endpoint",
    "fullName": "Vote Creation Endpoint",
    "milestone": 3,
    "agent": "DEV",
    "hours": 10,
    "week": 7,
    "critical": true,
    "parent": false,
    "parentId": "3.3"
  },
  {
    "id": "3.3.3",
    "name": "Vote Casting Endpoint",
    "fullName": "Vote Casting Endpoint",
    "milestone": 3,
    "agent": "DEV",
    "hours": 12,
    "week": 7,
    "critical": true,
    "parent": false,
    "parentId": "3.3"
  },
  {
    "id": "3.3.4",
    "name": "Vote Verification Endpoint",
    "fullName": "Vote Verification Endpoint",
    "milestone": 3,
    "agent": "DEV",
    "hours": 8,
    "week": 7,
    "critical": true,
    "parent": false,
    "parentId": "3.3"
  },
  {
    "id": "3.3.5",
    "name": "Tallying Trigger",
    "fullName": "Tallying Trigger",
    "milestone": 3,
    "agent": "DEV",
    "hours": 8,
    "week": 7,
    "critical": true,
    "parent": false,
    "parentId": "3.3"
  },
  {
    "id": "3.3.6",
    "name": "Error Handling",
    "fullName": "Error Handling",
    "milestone": 3,
    "agent": "DEV",
    "hours": 6,
    "week": 7,
    "critical": true,
    "parent": false,
    "parentId": "3.3"
  },
  {
    "id": "3.4.1",
    "name": "Vote Creation UI",
    "fullName": "Vote Creation UI",
    "milestone": 3,
    "agent": "UX+DEV",
    "hours": 10,
    "week": 7,
    "critical": true,
    "parent": false,
    "parentId": "3.4"
  },
  {
    "id": "3.4.2",
    "name": "Vote Listing Page",
    "fullName": "Vote Listing Page",
    "milestone": 3,
    "agent": "DEV",
    "hours": 6,
    "week": 8,
    "critical": true,
    "parent": false,
    "parentId": "3.4"
  },
  {
    "id": "3.4.3",
    "name": "Ballot Interface",
    "fullName": "Ballot Interface",
    "milestone": 3,
    "agent": "UX+DEV",
    "hours": 12,
    "week": 8,
    "critical": true,
    "parent": false,
    "parentId": "3.4"
  },
  {
    "id": "3.4.4",
    "name": "Vote Verification Page",
    "fullName": "Vote Verification Page",
    "milestone": 3,
    "agent": "DEV",
    "hours": 8,
    "week": 8,
    "critical": true,
    "parent": false,
    "parentId": "3.4"
  },
  {
    "id": "3.4.5",
    "name": "Results Dashboard",
    "fullName": "Results Dashboard",
    "milestone": 3,
    "agent": "UX+DEV",
    "hours": 10,
    "week": 8,
    "critical": true,
    "parent": false,
    "parentId": "3.4"
  },
  {
    "id": "3.4.6",
    "name": "Mobile Responsive",
    "fullName": "Mobile Responsive",
    "milestone": 3,
    "agent": "UX",
    "hours": 6,
    "week": 8,
    "critical": false,
    "parent": false,
    "parentId": "3.4"
  },
  {
    "id": "3.5.1",
    "name": "Anonymization Design",
    "fullName": "Anonymization Design",
    "milestone": 3,
    "agent": "CRYPTO+ARCH",
    "hours": 8,
    "week": 8,
    "critical": false,
    "parent": false,
    "parentId": "3.5"
  },
  {
    "id": "3.5.2",
    "name": "Identity-Vote Separation",
    "fullName": "Identity-Vote Separation",
    "milestone": 3,
    "agent": "DEV",
    "hours": 10,
    "week": 8,
    "critical": false,
    "parent": false,
    "parentId": "3.5"
  },
  {
    "id": "3.5.3",
    "name": "Audit Log",
    "fullName": "Audit Log",
    "milestone": 3,
    "agent": "DEV",
    "hours": 8,
    "week": 8,
    "critical": false,
    "parent": false,
    "parentId": "3.5"
  },
  {
    "id": "3.5.4",
    "name": "Privacy Policy",
    "fullName": "Privacy Policy",
    "milestone": 3,
    "agent": "SEC+ARCH",
    "hours": 6,
    "week": 8,
    "critical": false,
    "parent": false,
    "parentId": "3.5"
  }
];

window.WBS_LINKS = [
  {
    "source": "1.1.1",
    "target": "1.1.2",
    "type": "direct",
    "agent": "DEV",
    "hours": 6,
    "critical": true
  },
  {
    "source": "1.1.2",
    "target": "1.1.3",
    "type": "direct",
    "agent": "DEVOPS",
    "hours": 8,
    "critical": true
  },
  {
    "source": "1.1.1",
    "target": "1.2.1",
    "type": "direct",
    "agent": "ARCH",
    "hours": 6,
    "critical": true
  },
  {
    "source": "1.2.1",
    "target": "1.2.2",
    "type": "direct",
    "agent": "CRYPTO",
    "hours": 8,
    "critical": true
  },
  {
    "source": "1.2.2",
    "target": "1.2.4",
    "type": "direct",
    "agent": "ARCH",
    "hours": 6,
    "critical": true
  },
  {
    "source": "1.2.4",
    "target": "1.3.1",
    "type": "direct",
    "agent": "DEVOPS",
    "hours": 4,
    "critical": true
  },
  {
    "source": "1.3.1",
    "target": "1.3.2",
    "type": "direct",
    "agent": "DEVOPS",
    "hours": 6,
    "critical": true
  },
  {
    "source": "1.3.2",
    "target": "1.3.3",
    "type": "direct",
    "agent": "DEVOPS+SEC",
    "hours": 8,
    "critical": true
  },
  {
    "source": "1.3.3",
    "target": "1.3.4",
    "type": "direct",
    "agent": "DEVOPS",
    "hours": 6,
    "critical": true
  },
  {
    "source": "1.2.4",
    "target": "1.4.1",
    "type": "direct",
    "agent": "DEV",
    "hours": 2,
    "critical": true
  },
  {
    "source": "1.4.1",
    "target": "1.4.2",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "1.4.2",
    "target": "1.4.4",
    "type": "direct",
    "agent": "ARCH+DEV",
    "hours": 6,
    "critical": true
  },
  {
    "source": "1.4.4",
    "target": "2.1.1",
    "type": "direct",
    "agent": "UX+DEV",
    "hours": 12,
    "critical": true
  },
  {
    "source": "2.1.1",
    "target": "2.1.3",
    "type": "direct",
    "agent": "UX+DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "2.1.3",
    "target": "2.2.1",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "2.2.1",
    "target": "2.2.2",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "2.2.2",
    "target": "2.2.3",
    "type": "direct",
    "agent": "DEV",
    "hours": 6,
    "critical": true
  },
  {
    "source": "2.2.3",
    "target": "2.2.4",
    "type": "direct",
    "agent": "DEV",
    "hours": 10,
    "critical": true
  },
  {
    "source": "2.2.2",
    "target": "2.3.1",
    "type": "direct",
    "agent": "DEV",
    "hours": 6,
    "critical": false
  },
  {
    "source": "2.3.1",
    "target": "2.3.2",
    "type": "direct",
    "agent": "DEV",
    "hours": 4,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.4.1",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "2.4.1",
    "target": "2.4.2",
    "type": "direct",
    "agent": "DEV+SEC",
    "hours": 12,
    "critical": true
  },
  {
    "source": "2.4.2",
    "target": "2.4.3",
    "type": "direct",
    "agent": "DEV",
    "hours": 10,
    "critical": true
  },
  {
    "source": "2.4.3",
    "target": "2.4.4",
    "type": "direct",
    "agent": "DEV+SEC",
    "hours": 12,
    "critical": true
  },
  {
    "source": "2.4.4",
    "target": "2.4.5",
    "type": "direct",
    "agent": "SEC+DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "2.4.5",
    "target": "2.4.6",
    "type": "direct",
    "agent": "DEV+UX",
    "hours": 10,
    "critical": true
  },
  {
    "source": "2.1.3",
    "target": "3.1.1",
    "type": "direct",
    "agent": "CRYPTO+ARCH",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.1.1",
    "target": "3.1.2",
    "type": "direct",
    "agent": "ARCH",
    "hours": 10,
    "critical": true
  },
  {
    "source": "3.1.2",
    "target": "3.1.3",
    "type": "direct",
    "agent": "ARCH",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.1.3",
    "target": "3.1.4",
    "type": "direct",
    "agent": "CRYPTO",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.1.4",
    "target": "3.2.1",
    "type": "direct",
    "agent": "DEVOPS",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.2.1",
    "target": "3.2.2",
    "type": "direct",
    "agent": "DEVOPS",
    "hours": 6,
    "critical": true
  },
  {
    "source": "3.2.2",
    "target": "3.2.3",
    "type": "direct",
    "agent": "CRYPTO+DEVOPS",
    "hours": 10,
    "critical": true
  },
  {
    "source": "3.2.3",
    "target": "3.2.4",
    "type": "direct",
    "agent": "CRYPTO",
    "hours": 6,
    "critical": true
  },
  {
    "source": "3.2.4",
    "target": "3.2.5",
    "type": "direct",
    "agent": "CRYPTO+QA",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.2.5",
    "target": "3.3.1",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.3.1",
    "target": "3.3.2",
    "type": "direct",
    "agent": "DEV",
    "hours": 10,
    "critical": true
  },
  {
    "source": "3.3.2",
    "target": "3.3.3",
    "type": "direct",
    "agent": "DEV",
    "hours": 12,
    "critical": true
  },
  {
    "source": "3.3.3",
    "target": "3.3.4",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.3.4",
    "target": "3.3.5",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.3.5",
    "target": "3.3.6",
    "type": "direct",
    "agent": "DEV",
    "hours": 6,
    "critical": true
  },
  {
    "source": "3.3.6",
    "target": "3.4.1",
    "type": "direct",
    "agent": "UX+DEV",
    "hours": 10,
    "critical": true
  },
  {
    "source": "3.4.1",
    "target": "3.4.2",
    "type": "direct",
    "agent": "DEV",
    "hours": 6,
    "critical": true
  },
  {
    "source": "3.4.2",
    "target": "3.4.3",
    "type": "direct",
    "agent": "UX+DEV",
    "hours": 12,
    "critical": true
  },
  {
    "source": "3.4.3",
    "target": "3.4.4",
    "type": "direct",
    "agent": "DEV",
    "hours": 8,
    "critical": true
  },
  {
    "source": "3.4.4",
    "target": "3.4.5",
    "type": "direct",
    "agent": "UX+DEV",
    "hours": 10,
    "critical": true
  },
  {
    "source": "3.4.5",
    "target": "3.5.1",
    "type": "direct",
    "agent": "CRYPTO+ARCH",
    "hours": 8,
    "critical": false
  },
  {
    "source": "1.1.1",
    "target": "1.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.1",
    "target": "1.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.2",
    "target": "1.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.2",
    "target": "1.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.3",
    "target": "1.3.1",
    "type": "indirect",
    "agent": "DEVOPS",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.3",
    "target": "1.3.2",
    "type": "indirect",
    "agent": "DEVOPS",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.3",
    "target": "1.3.4",
    "type": "indirect",
    "agent": "DEVOPS",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.3",
    "target": "1.3.5",
    "type": "indirect",
    "agent": "DEVOPS",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.4",
    "target": "1.2.1",
    "type": "indirect",
    "agent": "ARCH",
    "hours": 0,
    "critical": false
  },
  {
    "source": "1.1.4",
    "target": "1.2.4",
    "type": "indirect",
    "agent": "ARCH",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.1",
    "target": "2.3.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.1",
    "target": "2.3.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.1",
    "target": "2.3.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.1",
    "target": "2.3.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.1",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.1",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.2",
    "target": "2.3.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.2",
    "target": "2.3.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.2",
    "target": "2.3.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.2",
    "target": "2.3.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.2",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.2",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.3",
    "target": "2.3.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.3",
    "target": "2.3.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.3",
    "target": "2.3.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.3",
    "target": "2.3.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.3",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.3",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.3.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.3.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.3.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.3.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.4",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.5",
    "target": "2.3.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.5",
    "target": "2.3.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.5",
    "target": "2.3.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.5",
    "target": "2.3.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.5",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.5",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.6",
    "target": "2.3.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.6",
    "target": "2.3.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.6",
    "target": "2.3.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.6",
    "target": "2.3.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.6",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.2.6",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.1",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.1",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.2",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.2",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.3",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.3",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.4",
    "target": "2.4.1",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "2.3.4",
    "target": "2.4.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.1.1",
    "target": "3.5.1",
    "type": "indirect",
    "agent": "CRYPTO+ARCH",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.1.4",
    "target": "3.2.4",
    "type": "indirect",
    "agent": "CRYPTO",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.1",
    "target": "3.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.1",
    "target": "3.4.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.1",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.1",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.2",
    "target": "3.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.2",
    "target": "3.4.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.2",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.2",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.3",
    "target": "3.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.3",
    "target": "3.4.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.3",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.3",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.4",
    "target": "3.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.4",
    "target": "3.4.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.4",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.4",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.5",
    "target": "3.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.5",
    "target": "3.4.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.5",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.5",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.6",
    "target": "3.4.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.6",
    "target": "3.4.4",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.6",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.3.6",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.4.2",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.4.2",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.4.4",
    "target": "3.5.2",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  },
  {
    "source": "3.4.4",
    "target": "3.5.3",
    "type": "indirect",
    "agent": "DEV",
    "hours": 0,
    "critical": false
  }
];

console.log('Loaded', window.WBS_TASKS.length, 'tasks and', window.WBS_LINKS.length, 'links');

// Project Status Data
// This file contains the initial project structure
// Data is saved to localStorage when you make changes

window.PROJECT_DATA = {
    startDate: "2026-03-10",
    milestones: [
        {
            id: 1,
            name: "Foundation & Setup",
            weeks: "1-2",
            color: "#667eea",
            tasks: [
                { id: "1.1", name: "Project Initialization", agent: "DEV", hours: 18, week: 1, critical: true, status: "not-started", deps: [] },
                { id: "1.2", name: "Technology Stack Selection", agent: "ARCH", hours: 26, week: 1, critical: true, status: "not-started", deps: ["1.1"] },
                { id: "1.3", name: "Infrastructure Provisioning", agent: "DEVOPS", hours: 28, week: 2, critical: true, status: "not-started", deps: ["1.2"] },
                { id: "1.4", name: "CONSUL Platform Fork", agent: "DEV", hours: 22, week: 2, critical: true, status: "not-started", deps: ["1.2"] }
            ]
        },
        {
            id: 2,
            name: "Platform Customization",
            weeks: "3-5",
            color: "#764ba2",
            tasks: [
                { id: "2.1", name: "CONSUL Branding & Localization", agent: "UX+DEV", hours: 28, week: 3, critical: true, status: "not-started", deps: ["1.4"] },
                { id: "2.2", name: "User Registration Module", agent: "DEV", hours: 48, week: 3, critical: true, status: "not-started", deps: ["2.1"] },
                { id: "2.3", name: "Two-Factor Authentication", agent: "DEV", hours: 22, week: 4, critical: false, status: "not-started", deps: ["2.2"] },
                { id: "2.4", name: "Biometric Identity Verification", agent: "DEV+SEC", hours: 60, week: 4, critical: true, status: "not-started", deps: ["2.2"] }
            ]
        },
        {
            id: 3,
            name: "Cryptographic Voting",
            weeks: "5-8",
            color: "#f093fb",
            tasks: [
                { id: "3.1", name: "Helios Integration Architecture", agent: "CRYPTO+ARCH", hours: 34, week: 5, critical: true, status: "not-started", deps: ["2.1"] },
                { id: "3.2", name: "Helios Deployment", agent: "DEVOPS+CRYPTO", hours: 38, week: 6, critical: true, status: "not-started", deps: ["3.1"] },
                { id: "3.3", name: "CONSUL-Helios API Bridge", agent: "DEV", hours: 52, week: 6, critical: true, status: "not-started", deps: ["3.2"] },
                { id: "3.4", name: "Voting UI Components", agent: "UX+DEV", hours: 52, week: 7, critical: true, status: "not-started", deps: ["3.3"] },
                { id: "3.5", name: "Vote Privacy & Anonymization", agent: "CRYPTO+SEC", hours: 32, week: 8, critical: false, status: "not-started", deps: ["3.4"] }
            ]
        },
        {
            id: 4,
            name: "Censorship Resistance",
            weeks: "6-8",
            color: "#4facfe",
            tasks: [
                { id: "4.1", name: "Tor Hidden Service Hardening", agent: "DEVOPS+SEC", hours: 22, week: 6, critical: false, status: "not-started", deps: ["1.3"] },
                { id: "4.2", name: "Domain Fronting Setup", agent: "DEVOPS", hours: 28, week: 7, critical: false, status: "not-started", deps: ["4.1"] },
                { id: "4.3", name: "Content Delivery via IPFS", agent: "DEVOPS+DEV", hours: 38, week: 7, critical: false, status: "not-started", deps: ["4.2"] },
                { id: "4.4", name: "VPN/Proxy Recommendations", agent: "SEC+UX", hours: 18, week: 8, critical: false, status: "not-started", deps: ["4.2"] }
            ]
        },
        {
            id: 5,
            name: "Security & Testing",
            weeks: "9-10",
            color: "#43e97b",
            tasks: [
                { id: "5.1", name: "Security Audit (Internal)", agent: "SEC+ARCH", hours: 54, week: 9, critical: true, status: "not-started", deps: ["3.5"] },
                { id: "5.2", name: "Biometric Security Testing", agent: "SEC+QA", hours: 32, week: 9, critical: false, status: "not-started", deps: ["2.4"] },
                { id: "5.3", name: "Load Testing", agent: "QA+DEVOPS", hours: 24, week: 9, critical: false, status: "not-started", deps: ["3.4"] },
                { id: "5.4", name: "End-to-End Testing", agent: "QA+DEV", hours: 40, week: 10, critical: true, status: "not-started", deps: ["5.1"] }
            ]
        },
        {
            id: 6,
            name: "Documentation & Launch",
            weeks: "11-12",
            color: "#f5576c",
            tasks: [
                { id: "6.1", name: "User Documentation", agent: "UX+DEV", hours: 34, week: 11, critical: true, status: "not-started", deps: ["5.4"] },
                { id: "6.2", name: "Administrator Documentation", agent: "ARCH+DEVOPS", hours: 30, week: 11, critical: false, status: "not-started", deps: ["6.1"] },
                { id: "6.3", name: "Security & Privacy Policy", agent: "SEC+ARCH", hours: 28, week: 11, critical: false, status: "not-started", deps: ["5.1"] },
                { id: "6.4", name: "Beta Testing Program", agent: "ALL", hours: 50, week: 11, critical: true, status: "not-started", deps: ["6.1"] },
                { id: "6.5", name: "Launch Preparation", agent: "ALL", hours: 32, week: 12, critical: true, status: "not-started", deps: ["6.4"] }
            ]
        }
    ]
};

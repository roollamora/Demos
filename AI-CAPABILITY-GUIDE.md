# AI Capability Rating Guide

## What is AI Capability?

Each task now has an AI Capability rating from 1-5 that indicates how much of the work can be delegated to AI tools (like GitHub Copilot, ChatGPT, Claude, etc.).

## Rating Scale

### 🔴 1 - Not AI-Doable
**Human expertise required**
- Strategic decisions
- Architecture design
- Security audits
- Threat modeling
- Key management decisions
- User research and interviews

**Why**: Requires human judgment, creativity, domain expertise, and accountability

**Examples**:
- "Helios Integration Architecture"
- "Security Audit (Internal)"
- "Threat Model Documentation"

---

### 🟠 2 - Minimal AI Help
**Mostly human work, AI can assist**
- Code reviews
- Technology selection
- System analysis
- Planning and strategy
- Evaluation and assessment

**Why**: Requires human judgment but AI can help with research and documentation

**Examples**:
- "Platform Evaluation"
- "Technology Stack Selection"
- "Architecture Documentation"

---

### 🟣 3 - Moderate AI Help
**Balanced human-AI collaboration**
- UI/UX design
- Integration work
- Complex implementations
- Optimization tasks

**Why**: Requires human creativity and oversight, but AI can generate code and suggestions

**Examples**:
- "Voting UI Components"
- "User Profile Management"
- "API Bridge Design"

---

### 🔵 4 - High AI Capability
**AI can do most of the work**
- Standard development tasks
- API implementations
- Form development
- Testing
- Deployment scripts

**Why**: Well-defined tasks with clear patterns that AI can follow

**Examples**:
- "Vote Creation Endpoint"
- "Registration Form Development"
- "Load Testing"
- "CI/CD Pipeline Setup"

---

### 🟢 5 - Fully Delegatable
**AI can complete independently**
- Documentation writing
- Translation
- Test case generation
- Configuration files
- Installation scripts
- Data migrations

**Why**: Routine, well-documented tasks with clear specifications

**Examples**:
- "Persian Language Pack Creation"
- "User Guide Writing"
- "Database Migration"
- "Docker Configuration"

## How to Use This Rating

### For Project Planning
- **High AI tasks (4-5)**: Can be completed quickly with AI assistance
- **Medium AI tasks (3)**: Need human oversight but AI speeds up work
- **Low AI tasks (1-2)**: Budget more time, require expert human input

### For Task Assignment
- **Beginners**: Focus on high AI tasks (4-5) with AI pair programming
- **Experts**: Handle low AI tasks (1-2) that need judgment
- **Mixed teams**: Pair beginners with AI on high-rated tasks, experts on low-rated

### For Time Estimation
- **AI Level 5**: Estimate 30-50% of original time with AI
- **AI Level 4**: Estimate 50-70% of original time with AI
- **AI Level 3**: Estimate 70-85% of original time with AI
- **AI Level 2**: Estimate 85-95% of original time with AI
- **AI Level 1**: Estimate 100% of original time (AI provides minimal help)

## Filtering by AI Capability

In the dashboard:
1. Use the "All AI Levels" dropdown
2. Filter to see only tasks at specific AI capability levels
3. Plan your AI-assisted workflow accordingly

## AI Tools Recommended

### For High AI Tasks (4-5)
- **GitHub Copilot**: Real-time code completion
- **ChatGPT/Claude**: Code generation, documentation
- **Cursor**: AI-powered IDE

### For Medium AI Tasks (3)
- **ChatGPT/Claude**: Design suggestions, code review
- **GitHub Copilot**: Code assistance
- **Tabnine**: Context-aware completion

### For Low AI Tasks (1-2)
- **ChatGPT/Claude**: Research assistance, documentation
- **Perplexity**: Technical research
- **AI as advisor**: Not as executor

## Important Notes

⚠️ **AI ratings are estimates** - Your mileage may vary based on:
- Your AI tool proficiency
- Task complexity
- Available context
- Code quality requirements

⚠️ **Always review AI output** - Even for high AI tasks (5), human review is essential for:
- Security vulnerabilities
- Logic errors
- Edge cases
- Code quality

⚠️ **AI doesn't replace expertise** - Low AI tasks (1-2) still need human experts, even with AI assistance

## Statistics

Based on the 119 subtasks:
- **Level 1**: ~10 tasks (8%) - Expert human work
- **Level 2**: ~25 tasks (21%) - Mostly human
- **Level 3**: ~30 tasks (25%) - Balanced
- **Level 4**: ~40 tasks (34%) - Mostly AI
- **Level 5**: ~14 tasks (12%) - Fully AI

**Average AI Capability**: 3.2 (Moderate AI help overall)

This means approximately 46% of tasks (levels 4-5) can be significantly accelerated with AI assistance!

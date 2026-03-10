# Planning Documents PDF Conversion Guide

## Quick Start

Run the conversion script:

```bash
./convert-planning-docs-to-pdf.sh
```

This will generate 3 PDF files:
1. `Questionnaire-Responses-Analysis.pdf` - Your strategic choices and analysis
2. `Work-Breakdown-Structure.pdf` - High-level WBS with milestones and timeline
3. `Detailed-Task-Breakdown.pdf` - 380+ granular tasks for parallel execution

---

## Manual Conversion (if script fails)

### Convert Individual Documents

**Questionnaire Analysis:**
```bash
pandoc Questionnaire-Responses-Analysis.md -o Questionnaire-Responses-Analysis.pdf --pdf-engine=xelatex --toc --toc-depth=3 -V geometry:margin=1in -V fontsize=11pt
```

**Work Breakdown Structure:**
```bash
pandoc Work-Breakdown-Structure.md -o Work-Breakdown-Structure.pdf --pdf-engine=xelatex --toc --toc-depth=3 -V geometry:margin=1in -V fontsize=11pt
```

**Detailed Task Breakdown:**
```bash
pandoc Detailed-Task-Breakdown.md -o Detailed-Task-Breakdown.pdf --pdf-engine=xelatex --toc --toc-depth=3 -V geometry:margin=1in -V fontsize=10pt
```

---

## Alternative: Online Conversion

If pandoc is not available, use online converters:

1. **Markdown to PDF** - https://www.markdowntopdf.com/
2. **CloudConvert** - https://cloudconvert.com/md-to-pdf
3. **Dillinger** - https://dillinger.io/ (export as PDF)

---

## Document Descriptions

### 1. Questionnaire-Responses-Analysis.pdf
- **Purpose:** Strategic analysis of your project requirements
- **Content:** 
  - Your 18 questionnaire responses
  - Strategic rationale for each choice
  - Critical tensions and trade-offs
  - Recommended phased approach
  - Technology stack recommendations
  - Risk assessment
- **Audience:** Project stakeholders, team leads, potential funders

### 2. Work-Breakdown-Structure.pdf
- **Purpose:** High-level project plan with timeline
- **Content:**
  - 6 milestones over 12 weeks
  - 25 major tasks with dependencies
  - Critical path analysis (10 weeks)
  - Gantt chart
  - Resource allocation by week
  - Budget breakdown ($865 for Phase 1)
  - Risk register
- **Audience:** Project managers, team leads, developers

### 3. Detailed-Task-Breakdown.pdf
- **Purpose:** Granular task list for parallel execution
- **Content:**
  - 380+ subtasks (2-12 hours each)
  - Agent vector assignments (ARCH, DEV, CRYPTO, DEVOPS, UX, SEC, QA)
  - Parallelization opportunities
  - Task distribution matrix
  - Project context and strategic decisions
  - 18 risk categories with mitigations
- **Audience:** Developers, volunteers, task assignees

---

## Expected Warnings

You may see warnings like:
```
[WARNING] Could not fetch resource https://...
```

These are cosmetic warnings about missing external images. The PDFs will still be generated successfully.

---

## Troubleshooting

### Error: "pandoc: command not found"
Install pandoc:
```bash
brew install pandoc
```

### Error: "xelatex not found"
Install BasicTeX:
```bash
brew install --cask basictex
```

Then update PATH:
```bash
export PATH="/Library/TeX/texbin:$PATH"
```

### Error: "! LaTeX Error: File 'unicode-math.sty' not found"
Update TeX packages:
```bash
sudo tlmgr update --self
sudo tlmgr install unicode-math
```

---

## Combined PDF (Optional)

To create a single combined PDF with all planning documents:

```bash
pandoc \
  Questionnaire-Responses-Analysis.md \
  Work-Breakdown-Structure.md \
  Detailed-Task-Breakdown.md \
  -o Digital-Democracy-Complete-Planning.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1in \
  -V fontsize=10pt \
  -V documentclass=report
```

This creates `Digital-Democracy-Complete-Planning.pdf` (~150 pages).

---

## Next Steps After PDF Generation

1. **Review PDFs** - Verify all content is readable
2. **Share with team** - Distribute to project stakeholders
3. **Print if needed** - For offline reference
4. **Begin implementation** - Start with tasks in Detailed-Task-Breakdown.pdf

---

## Document Sizes (Approximate)

- Questionnaire-Responses-Analysis.pdf: ~25 pages
- Work-Breakdown-Structure.pdf: ~40 pages
- Detailed-Task-Breakdown.pdf: ~80 pages
- **Total: ~145 pages**

---

## Questions?

If you encounter issues with PDF conversion, you can:
1. Use the markdown files directly (they're fully readable)
2. Use online converters
3. Import into Google Docs and export as PDF
4. Use a markdown viewer/editor with PDF export (Typora, Mark Text)

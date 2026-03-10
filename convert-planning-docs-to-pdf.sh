#!/bin/bash

# Convert Digital Democracy Planning Documents to PDF
# This script converts all planning documents to PDF format

echo "Converting planning documents to PDF..."

# Convert Questionnaire Responses Analysis
echo "1/3 Converting Questionnaire-Responses-Analysis.md..."
pandoc Questionnaire-Responses-Analysis.md \
  -o Questionnaire-Responses-Analysis.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article

# Convert Work Breakdown Structure
echo "2/3 Converting Work-Breakdown-Structure.md..."
pandoc Work-Breakdown-Structure.md \
  -o Work-Breakdown-Structure.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article

# Convert Detailed Task Breakdown
echo "3/3 Converting Detailed-Task-Breakdown.md..."
pandoc Detailed-Task-Breakdown.md \
  -o Detailed-Task-Breakdown.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1in \
  -V fontsize=10pt \
  -V documentclass=article

echo ""
echo "✅ Conversion complete!"
echo ""
echo "Generated PDFs:"
echo "  - Questionnaire-Responses-Analysis.pdf"
echo "  - Work-Breakdown-Structure.pdf"
echo "  - Detailed-Task-Breakdown.pdf"
echo ""
echo "Note: You may see warnings about missing images or resources - these are cosmetic and can be ignored."

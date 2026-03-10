#!/bin/bash

# Script to convert markdown files to PDF
# Requires: pandoc, texlive (for PDF generation)

echo "Digital Democracy Platform Guide - PDF Conversion"
echo "=================================================="
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed."
    echo ""
    echo "To install pandoc:"
    echo "  macOS: brew install pandoc"
    echo "  Ubuntu: sudo apt-get install pandoc"
    echo "  Windows: Download from https://pandoc.org/installing.html"
    echo ""
    exit 1
fi

# Combine the markdown files
echo "Combining markdown files..."
cat digital-democracy-platforms-comprehensive-guide.md digital-democracy-guide-final-sections.md > combined-guide.md

# Convert to PDF with pandoc
echo "Converting to PDF..."
pandoc combined-guide.md \
    -o digital-democracy-platforms-guide.pdf \
    --pdf-engine=xelatex \
    --toc \
    --toc-depth=3 \
    --number-sections \
    -V geometry:margin=1in \
    -V fontsize=11pt \
    -V documentclass=report \
    -V colorlinks=true \
    -V linkcolor=blue \
    -V urlcolor=blue \
    --highlight-style=tango

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ PDF created successfully: digital-democracy-platforms-guide.pdf"
    echo ""
    echo "The PDF includes:"
    echo "  - Table of contents"
    echo "  - Numbered sections"
    echo "  - Syntax-highlighted code blocks"
    echo "  - Clickable links"
    echo ""
else
    echo ""
    echo "Error: PDF conversion failed."
    echo ""
    echo "You may need to install additional LaTeX packages:"
    echo "  macOS: brew install basictex"
    echo "  Ubuntu: sudo apt-get install texlive-xetex texlive-fonts-recommended"
    echo ""
    echo "Alternative: Use an online converter:"
    echo "  - https://www.markdowntopdf.com/"
    echo "  - https://cloudconvert.com/md-to-pdf"
    echo "  - https://www.sejda.com/markdown-to-pdf"
    echo ""
fi

#!/bin/bash

# Simple HTTP server to view visualizations
# This solves CORS issues with loading external JS files

echo "🚀 Starting local web server..."
echo ""
echo "Open your browser to:"
echo "  http://localhost:8000/wbs-complete-network.html"
echo ""
echo "Available visualizations:"
echo "  - http://localhost:8000/wbs-complete-network.html (Complete network with all subtasks)"
echo "  - http://localhost:8000/wbs-network-graph.html (Simple network)"
echo "  - http://localhost:8000/wbs-visualization.html (Timeline dashboard)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000

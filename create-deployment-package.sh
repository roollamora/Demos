#!/bin/bash

# Create deployment package for Digital Democracy Dashboard

echo "📦 Creating deployment package..."

# Create zip file
cd project-dashboard-web
zip -r ../digital-democracy-dashboard.zip .
cd ..

echo "✅ Package created: digital-democracy-dashboard.zip"
echo ""
echo "🚀 Deployment options:"
echo "1. Netlify: Drag digital-democracy-dashboard.zip to app.netlify.com/drop"
echo "2. GitHub: Extract and push to repository"
echo "3. Vercel: Import the project-dashboard-web folder"
echo "4. Any host: Extract and upload via FTP/SFTP"
echo ""
echo "📖 See DEPLOYMENT-GUIDE.md for detailed instructions"

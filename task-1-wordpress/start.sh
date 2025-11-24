#!/bin/bash

clear

cat << "EOF"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        🚀 WordPress CMS - Quick Start                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF

echo ""
echo "This will set up everything you need for the interview."
echo ""

# Check if WordPress is already set up
if [ -f "wordpress/wp-config.php" ]; then
    echo "✅ WordPress is already configured"
else
    echo "❌ WordPress not configured. Run: bash setup-wordpress.sh"
    exit 1
fi

# Check if theme is installed
if [ -d "wordpress/wp-content/themes/frontdev-portfolio" ]; then
    echo "✅ Theme is installed"
else
    echo "❌ Theme not installed. Run: bash setup-wordpress.sh"
    exit 1
fi

# Check if assets are built
if [ -f "wordpress/wp-content/themes/frontdev-portfolio/assets/css/style.css" ]; then
    echo "✅ Assets are built"
else
    echo "🔨 Building assets..."
    npm run build:wp > /dev/null 2>&1
    echo "✅ Assets built"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Open your browser: http://localhost:8080"
echo ""
echo "2. Complete WordPress installation:"
echo "   • Site Title: FrontDev Portfolio"
echo "   • Username: admin (or your choice)"
echo "   • Password: (choose a strong password)"
echo "   • Email: your@email.com"
echo ""
echo "3. Login to WordPress admin: http://localhost:8080/wp-admin"
echo ""
echo "4. Activate the theme:"
echo "   • Go to: Appearance → Themes"
echo "   • Find: FrontDev Portfolio"
echo "   • Click: Activate"
echo ""
echo "5. Start development mode:"
echo "   • Open a NEW terminal"
echo "   • Run: npm run dev:wp"
echo "   • Browser opens at http://localhost:3000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎯 FOR THE INTERVIEW:"
echo ""
echo "✅ Show CMS integration: Add content via WordPress admin"
echo "✅ Show live development: Edit SCSS, see instant updates"
echo "✅ Show custom theme: Explain PHP templates and functions"
echo "✅ Show REST API: Testimonials loaded dynamically"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Starting PHP server for WordPress..."
echo ""

cd wordpress
php -S localhost:8080 &
PHP_PID=$!

echo "✅ WordPress server started (PID: $PHP_PID)"
echo ""
echo "🌐 WordPress URL: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server when you're done."
echo ""

# Keep script running
trap "echo ''; echo '🛑 Stopping WordPress server...'; kill $PHP_PID 2>/dev/null; echo '✅ Server stopped'; exit 0" INT TERM
wait $PHP_PID

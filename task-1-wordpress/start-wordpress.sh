#!/bin/bash

echo "=== Starting WordPress Development Environment ==="
echo ""

# Check if database exists
DB_EXISTS=$(mysql -u wpuser -pwppass123 -e "SHOW DATABASES LIKE 'frontdev_wp';" 2>/dev/null | grep frontdev_wp)

if [ -z "$DB_EXISTS" ]; then
    echo "Database not found. Creating..."
    echo "You may need to enter your sudo password:"
    sudo mysql -e "CREATE DATABASE IF NOT EXISTS frontdev_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'wpuser'@'localhost' IDENTIFIED BY 'wppass123'; GRANT ALL PRIVILEGES ON frontdev_wp.* TO 'wpuser'@'localhost'; FLUSH PRIVILEGES;" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Database created successfully"
    else
        echo "⚠ Could not create database. WordPress will guide you through setup."
    fi
else
    echo "✓ Database already exists"
fi

echo ""
echo "Starting PHP server on port 8080..."
cd wordpress
php -S localhost:8080 > /dev/null 2>&1 &
PHP_PID=$!
echo "✓ PHP server started (PID: $PHP_PID)"

cd ..
echo ""
echo "=== WordPress is ready! ==="
echo ""
echo "🌐 WordPress URL: http://localhost:8080"
echo "📝 Admin setup: http://localhost:8080/wp-admin/install.php"
echo ""
echo "In another terminal, run:"
echo "  npm run dev:wp"
echo ""
echo "This will:"
echo "  • Watch your SCSS/JS files for changes"
echo "  • Auto-compile to WordPress theme"
echo "  • Open http://localhost:3000 with live reload"
echo ""
echo "Press Ctrl+C to stop the PHP server"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping PHP server...'; kill $PHP_PID 2>/dev/null; echo 'Server stopped.'; exit 0" INT
wait $PHP_PID

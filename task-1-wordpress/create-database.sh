#!/bin/bash

# Quick database setup for WordPress
# Run this if WordPress installation fails due to database connection

echo "=== Creating WordPress Database ==="
echo ""
echo "This will create:"
echo "  • Database: frontdev_wp"
echo "  • User: wpuser"
echo "  • Password: wppass123"
echo ""
echo "You may need to enter your system password:"
echo ""

sudo mysql -e "
CREATE DATABASE IF NOT EXISTS frontdev_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'wpuser'@'localhost' IDENTIFIED BY 'wppass123';
GRANT ALL PRIVILEGES ON frontdev_wp.* TO 'wpuser'@'localhost';
FLUSH PRIVILEGES;
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database setup complete!"
    echo ""
    echo "Now you can:"
    echo "  1. Go to http://localhost:8080"
    echo "  2. Complete WordPress installation"
    echo "  3. Activate FrontDev Portfolio theme"
else
    echo ""
    echo "❌ Database creation failed"
    echo ""
    echo "WordPress will prompt you to create the database during installation."
fi

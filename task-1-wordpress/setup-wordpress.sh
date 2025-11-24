#!/bin/bash

# WordPress Quick Setup Script
# This will set up WordPress with your custom theme

echo "=== WordPress Quick Setup ==="
echo ""

# Step 1: Create wp-config.php
echo "Creating WordPress configuration..."
cat > wordpress/wp-config.php << 'EOL'
<?php
// Database settings - using MySQL
define( 'DB_NAME', 'frontdev_wp' );
define( 'DB_USER', 'wpuser' );
define( 'DB_PASSWORD', 'wppass123' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// Authentication Keys and Salts
define('AUTH_KEY',         'VdB-X|kR|L%o!RH9[+^YC5=g@YWV|P]LDUD4}xCUl-3uGV)M+>y(K#_u6j?wP^Nx');
define('SECURE_AUTH_KEY',  '-k+h-I@UIO[PW9R|1<d5FvX-;+^r+|Xo~eY;RhL]c8wvQ!N}z5.M{~S|3+dj#*zM');
define('LOGGED_IN_KEY',    'Z-Y+YV[dh#P-6f+B0Mz9g--~9!vW!O<oN>v7z~z~7gY^jG-Q|j0cA6t+K7mN+s?U');
define('NONCE_KEY',        'M9-Qy6cY|d8-L~B3M5gN-vP7s+Z2xW!v#Y8-G3hJ|k5nR-8tQ~v7zY!m4#w6gX-N');
define('AUTH_SALT',        'P7-vY8z#N5|gM3w-Q6tR~v4xZ!m9#Y2s-G7hJ|k5nQ~v8zX!t4#w6gN-P3yM-v5');
define('SECURE_AUTH_SALT', 'Y5-zN7v#M9|gQ3w-R6tP~v4xZ!m2#s8-J7hG|k5nV~v9zX!t4#w6gP-N3yQ-v5');
define('LOGGED_IN_SALT',   'N8-vY5z#M7|gQ3w-R6tP~v4xZ!m2#s9-G7hJ|k5nQ~v8zX!t4#w6gN-P3yM-v5');
define('NONCE_SALT',       'Q6-zY8v#N5|gM3w-R7tP~v4xZ!m9#s2-J7hG|k5nV~v8zX!t4#w6gP-N3yQ-v5');

// WordPress Database Table prefix
$table_prefix = 'wp_';

// Debugging
define( 'WP_DEBUG', false );

// Absolute path
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
EOL

echo "✓ wp-config.php created"

# Step 2: Create database directory for SQLite alternative (if MySQL fails)
mkdir -p wordpress/wp-content/database

# Step 3: Copy theme to WordPress
echo "Installing custom theme..."
cp -r wordpress-theme wordpress/wp-content/themes/frontdev-portfolio
echo "✓ Theme copied to wp-content/themes/frontdev-portfolio"

# Step 4: Set permissions
chmod -R 755 wordpress/wp-content

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Next steps:"
echo "1. Create MySQL database (run this command):"
echo "   sudo mysql -e \"CREATE DATABASE frontdev_wp; CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'wppass123'; GRANT ALL ON frontdev_wp.* TO 'wpuser'@'localhost'; FLUSH PRIVILEGES;\""
echo ""
echo "2. Start PHP server:"
echo "   cd wordpress && php -S localhost:8080"
echo ""
echo "3. Open browser:"
echo "   http://localhost:8080"
echo ""
echo "4. Complete WordPress 5-minute installation"
echo "5. Go to Appearance > Themes and activate 'FrontDev Portfolio'"
echo ""

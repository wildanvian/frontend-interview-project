<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?php bloginfo('description'); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Skip to main content link for accessibility -->
<a href="#main-content" class="skip-link"><?php esc_html_e('Skip to main content', 'frontdev-portfolio'); ?></a>

<!-- Header with Navigation -->
<header class="header" role="banner">
  <nav class="navbar" role="navigation" aria-label="<?php esc_attr_e('Main navigation', 'frontdev-portfolio'); ?>">
    <div class="navbar-container">
      <div class="navbar-brand">
        <?php if (has_custom_logo()) : ?>
          <?php the_custom_logo(); ?>
        <?php else : ?>
          <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php bloginfo('name'); ?> - <?php esc_attr_e('Home', 'frontdev-portfolio'); ?>">
            <span class="logo"><?php bloginfo('name'); ?></span>
          </a>
        <?php endif; ?>
        <button class="navbar-toggle" aria-label="<?php esc_attr_e('Toggle navigation menu', 'frontdev-portfolio'); ?>" aria-expanded="false" aria-controls="navbar-menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
      
      <div class="navbar-menu" id="navbar-menu">
        <?php
        wp_nav_menu(array(
          'theme_location' => 'primary',
          'menu_class'     => 'navbar-nav',
          'container'      => false,
          'fallback_cb'    => 'frontdev_fallback_menu',
        ));
        ?>
      </div>
    </div>
  </nav>
</header>

<!-- Footer -->
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-content">
      <?php if (is_active_sidebar('footer-1')) : ?>
        <div class="footer-section">
          <?php dynamic_sidebar('footer-1'); ?>
        </div>
      <?php else : ?>
        <div class="footer-section">
          <h3><?php bloginfo('name'); ?></h3>
          <p><?php bloginfo('description'); ?></p>
        </div>
      <?php endif; ?>

      <?php if (is_active_sidebar('footer-2')) : ?>
        <div class="footer-section">
          <?php dynamic_sidebar('footer-2'); ?>
        </div>
      <?php else : ?>
        <div class="footer-section">
          <h4><?php esc_html_e('Quick Links', 'frontdev-portfolio'); ?></h4>
          <?php
          wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_class'     => '',
            'container'      => 'ul',
            'depth'          => 1,
          ));
          ?>
        </div>
      <?php endif; ?>

      <?php if (is_active_sidebar('footer-3')) : ?>
        <div class="footer-section">
          <?php dynamic_sidebar('footer-3'); ?>
        </div>
      <?php else : ?>
        <div class="footer-section">
          <h4><?php esc_html_e('Contact', 'frontdev-portfolio'); ?></h4>
          <ul>
            <li><a href="mailto:<?php echo antispambot(get_option('admin_email')); ?>"><?php echo antispambot(get_option('admin_email')); ?></a></li>
          </ul>
        </div>
      <?php endif; ?>
    </div>
    <div class="footer-bottom">
      <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('All rights reserved. | Built with accessibility in mind.', 'frontdev-portfolio'); ?></p>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>

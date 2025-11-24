<section id="testimonials" class="testimonials-section">
  <div class="container">
    <h2><?php esc_html_e('What Clients Say', 'frontdev-portfolio'); ?></h2>
    <div class="testimonials-grid" id="testimonials-container" data-api-url="<?php echo esc_url(rest_url('frontdev/v1/testimonials')); ?>">
      <div class="loading-spinner" aria-label="<?php esc_attr_e('Loading testimonials', 'frontdev-portfolio'); ?>">
        <div class="spinner"></div>
        <p><?php esc_html_e('Loading testimonials...', 'frontdev-portfolio'); ?></p>
      </div>
    </div>
  </div>
</section>

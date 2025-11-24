<section id="services" class="services-section">
  <div class="container">
    <h2><?php esc_html_e('My Services', 'frontdev-portfolio'); ?></h2>
    <div class="services-grid">
      <?php
      // Get services from a custom page or use default
      $services = array(
        array(
          'title' => __('Frontend Development', 'frontdev-portfolio'),
          'description' => __('Modern, responsive web applications using the latest technologies and best practices.', 'frontdev-portfolio')
        ),
        array(
          'title' => __('UI/UX Design', 'frontdev-portfolio'),
          'description' => __('User-centered design focusing on accessibility and optimal user experience.', 'frontdev-portfolio')
        ),
        array(
          'title' => __('Performance Optimization', 'frontdev-portfolio'),
          'description' => __('Fast-loading, optimized websites that provide excellent user experiences.', 'frontdev-portfolio')
        ),
      );
      
      foreach ($services as $service) :
        ?>
        <div class="service-card">
          <h3><?php echo esc_html($service['title']); ?></h3>
          <p><?php echo esc_html($service['description']); ?></p>
        </div>
        <?php
      endforeach;
      ?>
    </div>
  </div>
</section>

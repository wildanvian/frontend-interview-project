<section id="portfolio" class="portfolio-section">
  <div class="container">
    <h2><?php esc_html_e('Recent Projects', 'frontdev-portfolio'); ?></h2>
    <div class="portfolio-grid">
      <?php
      $portfolio_args = array(
        'post_type' => 'portfolio',
        'posts_per_page' => 6,
        'orderby' => 'date',
        'order' => 'DESC'
      );
      $portfolio_query = new WP_Query($portfolio_args);
      
      if ($portfolio_query->have_posts()) :
        while ($portfolio_query->have_posts()) : $portfolio_query->the_post();
          ?>
          <div class="portfolio-item">
            <?php if (has_post_thumbnail()) : ?>
              <?php the_post_thumbnail('portfolio-thumb', array('class' => 'portfolio-image lazy-load', 'alt' => get_the_title())); ?>
            <?php else : ?>
              <img data-src="https://picsum.photos/400/300?random=<?php the_ID(); ?>" alt="<?php the_title_attribute(); ?>" class="portfolio-image lazy-load">
            <?php endif; ?>
            <div class="portfolio-content">
              <h3><?php the_title(); ?></h3>
              <p><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
            </div>
          </div>
          <?php
        endwhile;
        wp_reset_postdata();
      else :
        // Fallback portfolio items
        for ($i = 4; $i <= 6; $i++) :
          ?>
          <div class="portfolio-item">
            <img data-src="https://picsum.photos/400/300?random=<?php echo $i; ?>" alt="<?php printf(esc_attr__('Portfolio Item %d', 'frontdev-portfolio'), $i); ?>" class="portfolio-image lazy-load">
            <div class="portfolio-content">
              <h3><?php printf(esc_html__('Project %d', 'frontdev-portfolio'), $i); ?></h3>
              <p><?php esc_html_e('Modern web application with advanced features', 'frontdev-portfolio'); ?></p>
            </div>
          </div>
          <?php
        endfor;
      endif;
      ?>
    </div>
  </div>
</section>

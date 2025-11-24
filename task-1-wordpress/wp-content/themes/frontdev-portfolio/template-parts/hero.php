<section id="home" class="hero-section" aria-label="<?php esc_attr_e('Hero carousel', 'frontdev-portfolio'); ?>">
  <div class="carousel-container">
    <div class="carousel" role="region" aria-label="<?php esc_attr_e('Featured projects carousel', 'frontdev-portfolio'); ?>">
      <div class="carousel-track" aria-live="polite">
        <?php
        // Query for carousel slides (can be custom post type or featured posts)
        $carousel_args = array(
          'post_type' => 'post',
          'posts_per_page' => 3,
          'meta_key' => '_thumbnail_id',
          'orderby' => 'date',
          'order' => 'DESC'
        );
        $carousel_query = new WP_Query($carousel_args);
        $slide_count = 0;
        
        if ($carousel_query->have_posts()) :
          while ($carousel_query->have_posts()) : $carousel_query->the_post();
            $slide_count++;
            $active_class = ($slide_count === 1) ? 'active' : '';
            ?>
            <div class="carousel-slide <?php echo esc_attr($active_class); ?>" role="group" aria-label="<?php printf(esc_attr__('Slide %d of %d', 'frontdev-portfolio'), $slide_count, $carousel_query->post_count); ?>">
              <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full', array('class' => 'carousel-image lazy-load', 'alt' => get_the_title())); ?>
              <?php else : ?>
                <img data-src="https://picsum.photos/1200/600?random=<?php echo $slide_count; ?>" alt="<?php the_title_attribute(); ?>" class="carousel-image lazy-load">
              <?php endif; ?>
              <div class="carousel-content">
                <h1><?php the_title(); ?></h1>
                <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                <a href="<?php the_permalink(); ?>" class="btn btn--primary"><?php esc_html_e('Learn More', 'frontdev-portfolio'); ?></a>
              </div>
            </div>
            <?php
          endwhile;
          wp_reset_postdata();
        else :
          // Fallback slides if no posts
          for ($i = 1; $i <= 3; $i++) :
            $active_class = ($i === 1) ? 'active' : '';
            ?>
            <div class="carousel-slide <?php echo esc_attr($active_class); ?>" role="group" aria-label="<?php printf(esc_attr__('Slide %d of 3', 'frontdev-portfolio'), $i); ?>">
              <img data-src="https://picsum.photos/1200/600?random=<?php echo $i; ?>" alt="<?php printf(esc_attr__('Slide %d', 'frontdev-portfolio'), $i); ?>" class="carousel-image lazy-load">
              <div class="carousel-content">
                <h1><?php printf(esc_html__('Slide Title %d', 'frontdev-portfolio'), $i); ?></h1>
                <p><?php esc_html_e('Creating responsive, accessible, and performant web experiences', 'frontdev-portfolio'); ?></p>
                <a href="#contact" class="btn btn--primary"><?php esc_html_e('Get Started', 'frontdev-portfolio'); ?></a>
              </div>
            </div>
            <?php
          endfor;
        endif;
        ?>
      </div>
      <button class="carousel-btn carousel-btn--prev" aria-label="<?php esc_attr_e('Previous slide', 'frontdev-portfolio'); ?>">
        <span aria-hidden="true">‹</span>
      </button>
      <button class="carousel-btn carousel-btn--next" aria-label="<?php esc_attr_e('Next slide', 'frontdev-portfolio'); ?>">
        <span aria-hidden="true">›</span>
      </button>
      <div class="carousel-indicators" role="tablist" aria-label="<?php esc_attr_e('Carousel pagination', 'frontdev-portfolio'); ?>">
        <?php for ($i = 1; $i <= max(3, $carousel_query->post_count); $i++) : ?>
          <button class="carousel-indicator <?php echo ($i === 1) ? 'active' : ''; ?>" role="tab" aria-label="<?php printf(esc_attr__('Go to slide %d', 'frontdev-portfolio'), $i); ?>" aria-selected="<?php echo ($i === 1) ? 'true' : 'false'; ?>"></button>
        <?php endfor; ?>
      </div>
    </div>
  </div>
</section>

<?php
/**
 * The main template file
 *
 * @package FrontDev_Portfolio
 */

get_header();
?>

<!-- Main Content -->
<main id="main-content" role="main">
  
  <?php if (is_front_page()) : ?>
    <!-- Hero Section with Carousel -->
    <?php get_template_part('template-parts/hero'); ?>

    <!-- Services Section -->
    <?php get_template_part('template-parts/services'); ?>

    <!-- Portfolio Section -->
    <?php get_template_part('template-parts/portfolio'); ?>

    <!-- Testimonials Section -->
    <?php get_template_part('template-parts/testimonials'); ?>

    <!-- Contact Form Section -->
    <?php get_template_part('template-parts/contact'); ?>
    
  <?php else : ?>
    
    <div class="container">
      <div class="content-area" style="padding: 4rem 0;">
        <?php
        if (have_posts()) :
          while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
              <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
              </header>
              
              <?php if (has_post_thumbnail()) : ?>
                <div class="entry-thumbnail">
                  <?php the_post_thumbnail('large'); ?>
                </div>
              <?php endif; ?>
              
              <div class="entry-content">
                <?php the_content(); ?>
              </div>
            </article>
            <?php
          endwhile;
        else :
          ?>
          <p><?php esc_html_e('Sorry, no posts matched your criteria.', 'frontdev-portfolio'); ?></p>
          <?php
        endif;
        ?>
      </div>
    </div>
    
  <?php endif; ?>
  
</main>

<?php
get_footer();

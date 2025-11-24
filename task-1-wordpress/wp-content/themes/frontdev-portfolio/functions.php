<?php
/**
 * FrontDev Portfolio Theme Functions
 * 
 * @package FrontDev_Portfolio
 */

// Security check
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function frontdev_theme_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');
    
    // Set default thumbnail sizes
    set_post_thumbnail_size(1200, 600, true);
    add_image_size('portfolio-thumb', 400, 300, true);

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'frontdev-portfolio'),
        'mega-menu' => esc_html__('Mega Menu', 'frontdev-portfolio'),
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add theme support for Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-width'  => true,
        'flex-height' => true,
    ));
}
add_action('after_setup_theme', 'frontdev_theme_setup');

/**
 * Enqueue scripts and styles
 */
function frontdev_enqueue_assets() {
    // Enqueue Google Fonts
    wp_enqueue_style(
        'frontdev-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );

    // Enqueue main stylesheet (compiled from SCSS by Gulp)
    wp_enqueue_style(
        'frontdev-style',
        get_template_directory_uri() . '/assets/css/style.css',
        array(),
        filemtime(get_template_directory() . '/assets/css/style.css')
    );

    // Enqueue main JavaScript (minified by Gulp)
    wp_enqueue_script(
        'frontdev-main',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        filemtime(get_template_directory() . '/assets/js/main.js'),
        true
    );

    // Localize script with WordPress data
    wp_localize_script('frontdev-main', 'frontdevData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('frontdev_nonce'),
        'siteUrl' => home_url(),
    ));
}
add_action('wp_enqueue_scripts', 'frontdev_enqueue_assets');

/**
 * Register Custom Post Types
 */
function frontdev_register_post_types() {
    // Portfolio Post Type
    register_post_type('portfolio', array(
        'labels' => array(
            'name' => __('Portfolio', 'frontdev-portfolio'),
            'singular_name' => __('Portfolio Item', 'frontdev-portfolio'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
    ));

    // Testimonials Post Type
    register_post_type('testimonial', array(
        'labels' => array(
            'name' => __('Testimonials', 'frontdev-portfolio'),
            'singular_name' => __('Testimonial', 'frontdev-portfolio'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-testimonial',
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'frontdev_register_post_types');

/**
 * Register Widgets
 */
function frontdev_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Footer 1', 'frontdev-portfolio'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Add widgets here.', 'frontdev-portfolio'),
        'before_widget' => '<div class="footer-section widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer 2', 'frontdev-portfolio'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Add widgets here.', 'frontdev-portfolio'),
        'before_widget' => '<div class="footer-section widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer 3', 'frontdev-portfolio'),
        'id'            => 'footer-3',
        'description'   => esc_html__('Add widgets here.', 'frontdev-portfolio'),
        'before_widget' => '<div class="footer-section widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'frontdev_widgets_init');

/**
 * AJAX Handler for Contact Form
 */
function frontdev_handle_contact_form() {
    // Verify nonce
    check_ajax_referer('frontdev_nonce', 'nonce');

    // Get form data
    $firstName = sanitize_text_field($_POST['firstName']);
    $lastName = sanitize_text_field($_POST['lastName']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $projectType = sanitize_text_field($_POST['projectType']);
    $budget = sanitize_text_field($_POST['budget']);
    $timeline = sanitize_text_field($_POST['timeline']);
    $company = sanitize_text_field($_POST['company']);
    $message = sanitize_textarea_field($_POST['message']);
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;

    // Prepare email
    $to = get_option('admin_email');
    $subject = 'New Contact Form Submission from ' . $firstName . ' ' . $lastName;
    $body = "Name: {$firstName} {$lastName}\n";
    $body .= "Email: {$email}\n";
    $body .= "Phone: {$phone}\n";
    $body .= "Company: {$company}\n";
    $body .= "Project Type: {$projectType}\n";
    $body .= "Budget: {$budget}\n";
    $body .= "Timeline: {$timeline}\n";
    $body .= "Newsletter: " . ($newsletter ? 'Yes' : 'No') . "\n\n";
    $body .= "Message:\n{$message}";

    // Send email
    $sent = wp_mail($to, $subject, $body);

    if ($sent) {
        wp_send_json_success(array(
            'message' => 'Thank you for your message! We will get back to you soon.'
        ));
    } else {
        wp_send_json_error(array(
            'message' => 'Sorry, there was an error sending your message. Please try again.'
        ));
    }
}
add_action('wp_ajax_frontdev_contact_form', 'frontdev_handle_contact_form');
add_action('wp_ajax_nopriv_frontdev_contact_form', 'frontdev_handle_contact_form');

/**
 * REST API endpoint for testimonials
 */
function frontdev_register_rest_routes() {
    register_rest_route('frontdev/v1', '/testimonials', array(
        'methods' => 'GET',
        'callback' => 'frontdev_get_testimonials',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'frontdev_register_rest_routes');

function frontdev_get_testimonials() {
    $args = array(
        'post_type' => 'testimonial',
        'posts_per_page' => 6,
        'orderby' => 'date',
        'order' => 'DESC'
    );

    $testimonials = get_posts($args);
    $data = array();

    foreach ($testimonials as $testimonial) {
        $data[] = array(
            'id' => $testimonial->ID,
            'name' => get_the_title($testimonial),
            'email' => get_post_meta($testimonial->ID, 'email', true),
            'body' => get_the_content(null, false, $testimonial),
        );
    }

    return rest_ensure_response($data);
}

/**
 * Add custom meta boxes for testimonials
 */
function frontdev_add_testimonial_meta_boxes() {
    add_meta_box(
        'testimonial_details',
        'Testimonial Details',
        'frontdev_testimonial_meta_box_callback',
        'testimonial',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'frontdev_add_testimonial_meta_boxes');

function frontdev_testimonial_meta_box_callback($post) {
    wp_nonce_field('frontdev_save_testimonial_meta', 'frontdev_testimonial_nonce');
    $email = get_post_meta($post->ID, 'email', true);
    ?>
    <p>
        <label for="testimonial_email">Client Email:</label>
        <input type="email" id="testimonial_email" name="testimonial_email" value="<?php echo esc_attr($email); ?>" style="width: 100%;">
    </p>
    <?php
}

function frontdev_save_testimonial_meta($post_id) {
    if (!isset($_POST['frontdev_testimonial_nonce'])) {
        return;
    }
    if (!wp_verify_nonce($_POST['frontdev_testimonial_nonce'], 'frontdev_save_testimonial_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['testimonial_email'])) {
        update_post_meta($post_id, 'email', sanitize_email($_POST['testimonial_email']));
    }
}
add_action('save_post', 'frontdev_save_testimonial_meta');

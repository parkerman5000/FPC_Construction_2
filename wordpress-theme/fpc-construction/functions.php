<?php
/**
 * FPC Construction Theme Functions
 *
 * @package FPC_Construction
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function fpc_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'fpc-construction'),
        'footer'  => __('Footer Menu', 'fpc-construction'),
    ));
}
add_action('after_setup_theme', 'fpc_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function fpc_enqueue_scripts() {
    // Main stylesheet
    wp_enqueue_style(
        'fpc-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );

    // Main JavaScript
    wp_enqueue_script(
        'fpc-main',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );

    // Localize script with theme data
    wp_localize_script('fpc-main', 'fpcData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('fpc_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'fpc_enqueue_scripts');

/**
 * Theme Customizer Settings
 */
function fpc_customize_register($wp_customize) {
    // Contact Information Section
    $wp_customize->add_section('fpc_contact_info', array(
        'title'    => __('Contact Information', 'fpc-construction'),
        'priority' => 30,
    ));

    // Phone Number
    $wp_customize->add_setting('fpc_phone', array(
        'default'           => '(803) 288-9616',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('fpc_phone', array(
        'label'   => __('Phone Number', 'fpc-construction'),
        'section' => 'fpc_contact_info',
        'type'    => 'text',
    ));

    // Email Address
    $wp_customize->add_setting('fpc_email', array(
        'default'           => 'info@fpcconstructions.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('fpc_email', array(
        'label'   => __('Email Address', 'fpc-construction'),
        'section' => 'fpc_contact_info',
        'type'    => 'email',
    ));

    // Address
    $wp_customize->add_setting('fpc_address', array(
        'default'           => 'North Augusta, SC 29860',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('fpc_address', array(
        'label'   => __('Address', 'fpc-construction'),
        'section' => 'fpc_contact_info',
        'type'    => 'text',
    ));

    // Business Hours
    $wp_customize->add_setting('fpc_hours', array(
        'default'           => 'Monday - Friday: 7AM - 6PM',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('fpc_hours', array(
        'label'   => __('Business Hours', 'fpc-construction'),
        'section' => 'fpc_contact_info',
        'type'    => 'text',
    ));

    // Hero Section
    $wp_customize->add_section('fpc_hero', array(
        'title'    => __('Hero Section', 'fpc-construction'),
        'priority' => 35,
    ));

    // Hero Title
    $wp_customize->add_setting('fpc_hero_title', array(
        'default'           => 'We Build Dreams Into Reality',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('fpc_hero_title', array(
        'label'   => __('Hero Title', 'fpc-construction'),
        'section' => 'fpc_hero',
        'type'    => 'text',
    ));

    // Hero Subtitle
    $wp_customize->add_setting('fpc_hero_subtitle', array(
        'default'           => 'Professional construction services transforming visions into lasting structures since 2009',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('fpc_hero_subtitle', array(
        'label'   => __('Hero Subtitle', 'fpc-construction'),
        'section' => 'fpc_hero',
        'type'    => 'textarea',
    ));

    // Stats Section
    $wp_customize->add_section('fpc_stats', array(
        'title'    => __('Statistics', 'fpc-construction'),
        'priority' => 40,
    ));

    // Years Experience
    $wp_customize->add_setting('fpc_years', array(
        'default'           => '15',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('fpc_years', array(
        'label'   => __('Years of Experience', 'fpc-construction'),
        'section' => 'fpc_stats',
        'type'    => 'number',
    ));

    // Projects Completed
    $wp_customize->add_setting('fpc_projects', array(
        'default'           => '500',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('fpc_projects', array(
        'label'   => __('Projects Completed', 'fpc-construction'),
        'section' => 'fpc_stats',
        'type'    => 'number',
    ));
}
add_action('customize_register', 'fpc_customize_register');

/**
 * Get Theme Option
 */
function fpc_get_option($option, $default = '') {
    return get_theme_mod($option, $default);
}

/**
 * Custom Walker for Navigation Menu
 */
class FPC_Nav_Walker extends Walker_Nav_Menu {
    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'nav__item';

        $class_names = join(' ', array_filter($classes));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

        $output .= '<li' . $class_names . '>';

        $atts = array();
        $atts['href'] = !empty($item->url) ? $item->url : '';
        $atts['class'] = 'nav__link';

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $title = apply_filters('the_title', $item->title, $item->ID);

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}

/**
 * Contact Form Handler
 */
function fpc_handle_contact_form() {
    check_ajax_referer('fpc_nonce', 'nonce');

    $name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $service = isset($_POST['service']) ? sanitize_text_field($_POST['service']) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';

    if (empty($name) || empty($email) || empty($phone) || empty($service)) {
        wp_send_json_error(array('message' => 'Please fill in all required fields.'));
    }

    $to = fpc_get_option('fpc_email', get_option('admin_email'));
    $subject = 'New Contact Form Submission from ' . $name;
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Service: $service\n";
    $body .= "Message: $message\n";

    $headers = array('Content-Type: text/plain; charset=UTF-8');

    $sent = wp_mail($to, $subject, $body, $headers);

    if ($sent) {
        wp_send_json_success(array('message' => 'Thank you! Your message has been sent.'));
    } else {
        wp_send_json_error(array('message' => 'Failed to send message. Please try again.'));
    }
}
add_action('wp_ajax_fpc_contact_form', 'fpc_handle_contact_form');
add_action('wp_ajax_nopriv_fpc_contact_form', 'fpc_handle_contact_form');

/**
 * Add ElevenLabs Widget Support
 */
function fpc_add_elevenlabs_widget() {
    ?>
    <elevenlabs-convai agent-id="agent_5801kehtxvkzenwvpc48t3sr5n56"></elevenlabs-convai>
    <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
    <?php
}
add_action('wp_footer', 'fpc_add_elevenlabs_widget');

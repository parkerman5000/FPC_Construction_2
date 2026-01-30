<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">

    <!-- Open Graph / Social Media -->
    <meta property="og:title" content="<?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?>">
    <meta property="og:description" content="<?php bloginfo('description'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- Skip to main content for accessibility -->
    <a href="#main" class="skip-link"><?php esc_html_e('Skip to main content', 'fpc-construction'); ?></a>

    <!-- Header / Navigation -->
    <header class="header" id="header">
        <nav class="nav container">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav__logo">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/logo.png" alt="<?php bloginfo('name'); ?> Logo" class="nav__logo-img">
                <?php endif; ?>
            </a>

            <button class="nav__toggle" id="nav-toggle" aria-label="<?php esc_attr_e('Toggle navigation menu', 'fpc-construction'); ?>" aria-expanded="false">
                <span class="nav__toggle-bar"></span>
                <span class="nav__toggle-bar"></span>
                <span class="nav__toggle-bar"></span>
            </button>

            <?php if (has_nav_menu('primary')) : ?>
                <ul class="nav__menu" id="nav-menu">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'container'      => false,
                        'items_wrap'     => '%3$s',
                        'walker'         => new FPC_Nav_Walker(),
                    ));
                    ?>
                    <li class="nav__item nav__item--cta">
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', fpc_get_option('fpc_phone', '8032889616'))); ?>" class="btn btn--primary nav__cta">
                            <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <?php esc_html_e('Call Now', 'fpc-construction'); ?>
                        </a>
                    </li>
                </ul>
            <?php else : ?>
                <ul class="nav__menu" id="nav-menu">
                    <li class="nav__item"><a href="#home" class="nav__link"><?php esc_html_e('Home', 'fpc-construction'); ?></a></li>
                    <li class="nav__item"><a href="#about" class="nav__link"><?php esc_html_e('About', 'fpc-construction'); ?></a></li>
                    <li class="nav__item"><a href="#services" class="nav__link"><?php esc_html_e('Services', 'fpc-construction'); ?></a></li>
                    <li class="nav__item"><a href="#projects" class="nav__link"><?php esc_html_e('Projects', 'fpc-construction'); ?></a></li>
                    <li class="nav__item"><a href="#testimonials" class="nav__link"><?php esc_html_e('Reviews', 'fpc-construction'); ?></a></li>
                    <li class="nav__item"><a href="#contact" class="nav__link"><?php esc_html_e('Contact', 'fpc-construction'); ?></a></li>
                    <li class="nav__item nav__item--cta">
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', fpc_get_option('fpc_phone', '8032889616'))); ?>" class="btn btn--primary nav__cta">
                            <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <?php esc_html_e('Call Now', 'fpc-construction'); ?>
                        </a>
                    </li>
                </ul>
            <?php endif; ?>
        </nav>
    </header>

    <main id="main">

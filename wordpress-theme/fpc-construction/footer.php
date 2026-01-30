    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__brand">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="footer__logo">
                        <?php if (has_custom_logo()) : ?>
                            <?php the_custom_logo(); ?>
                        <?php else : ?>
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/logo.png" alt="<?php bloginfo('name'); ?> Logo">
                        <?php endif; ?>
                    </a>
                    <p class="footer__tagline"><?php esc_html_e('Building Dreams Into Reality', 'fpc-construction'); ?></p>
                    <p class="footer__description"><?php esc_html_e('Professional construction services in North Augusta, SC and the surrounding CSRA region since 2009.', 'fpc-construction'); ?></p>
                </div>

                <div class="footer__links">
                    <h3 class="footer__title"><?php esc_html_e('Quick Links', 'fpc-construction'); ?></h3>
                    <ul class="footer__nav">
                        <li><a href="#home"><?php esc_html_e('Home', 'fpc-construction'); ?></a></li>
                        <li><a href="#about"><?php esc_html_e('About Us', 'fpc-construction'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Services', 'fpc-construction'); ?></a></li>
                        <li><a href="#projects"><?php esc_html_e('Projects', 'fpc-construction'); ?></a></li>
                        <li><a href="#testimonials"><?php esc_html_e('Reviews', 'fpc-construction'); ?></a></li>
                        <li><a href="#contact"><?php esc_html_e('Contact', 'fpc-construction'); ?></a></li>
                    </ul>
                </div>

                <div class="footer__services">
                    <h3 class="footer__title"><?php esc_html_e('Our Services', 'fpc-construction'); ?></h3>
                    <ul class="footer__nav">
                        <li><a href="#services"><?php esc_html_e('Land Clearing', 'fpc-construction'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Privacy Fencing', 'fpc-construction'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Septic Services', 'fpc-construction'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Land Grading', 'fpc-construction'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Driveways', 'fpc-construction'); ?></a></li>
                        <li><a href="#services"><?php esc_html_e('Foundations', 'fpc-construction'); ?></a></li>
                    </ul>
                </div>

                <div class="footer__contact">
                    <h3 class="footer__title"><?php esc_html_e('Contact Info', 'fpc-construction'); ?></h3>
                    <ul class="footer__contact-list">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <?php echo esc_html(fpc_get_option('fpc_address', 'North Augusta, SC 29860')); ?>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', fpc_get_option('fpc_phone', '8032889616'))); ?>"><?php echo esc_html(fpc_get_option('fpc_phone', '(803) 288-9616')); ?></a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <a href="mailto:<?php echo esc_attr(fpc_get_option('fpc_email', 'info@fpcconstructions.com')); ?>"><?php echo esc_html(fpc_get_option('fpc_email', 'info@fpcconstructions.com')); ?></a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <?php echo esc_html(fpc_get_option('fpc_hours', 'Mon-Fri: 7AM - 6PM')); ?>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">&copy; <?php echo esc_html(date('Y')); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('All rights reserved.', 'fpc-construction'); ?></p>
                <p class="footer__powered">
                    <a href="https://mpowerio.ai" target="_blank" rel="noopener"><?php esc_html_e('Powered by mpowerio.ai', 'fpc-construction'); ?></a>
                </p>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>

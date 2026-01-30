<?php
/**
 * Front Page Template
 *
 * @package FPC_Construction
 * @since 1.0.0
 */

get_header();
?>

        <!-- Hero Section -->
        <section class="hero" id="home">
            <div class="hero__overlay"></div>
            <div class="hero__content container">
                <h1 class="hero__title"><?php echo esc_html(fpc_get_option('fpc_hero_title', 'We Build Dreams Into Reality')); ?></h1>
                <p class="hero__subtitle"><?php echo esc_html(fpc_get_option('fpc_hero_subtitle', 'Professional construction services transforming visions into lasting structures since 2009')); ?></p>

                <div class="hero__stats">
                    <div class="hero__stat">
                        <span class="hero__stat-number" data-count="<?php echo esc_attr(fpc_get_option('fpc_years', '15')); ?>" data-suffix="+">0</span>
                        <span class="hero__stat-label"><?php esc_html_e('Years Experience', 'fpc-construction'); ?></span>
                    </div>
                    <div class="hero__stat">
                        <span class="hero__stat-number" data-count="<?php echo esc_attr(fpc_get_option('fpc_projects', '500')); ?>" data-suffix="+">0</span>
                        <span class="hero__stat-label"><?php esc_html_e('Projects Completed', 'fpc-construction'); ?></span>
                    </div>
                    <div class="hero__stat">
                        <span class="hero__stat-number" data-count="100" data-suffix="%">0</span>
                        <span class="hero__stat-label"><?php esc_html_e('Satisfaction Rate', 'fpc-construction'); ?></span>
                    </div>
                </div>

                <div class="hero__cta">
                    <a href="#contact" class="btn btn--primary btn--large"><?php esc_html_e('Get Free Estimate', 'fpc-construction'); ?></a>
                    <a href="#projects" class="btn btn--outline btn--large"><?php esc_html_e('View Our Work', 'fpc-construction'); ?></a>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about section" id="about">
            <div class="container">
                <div class="about__grid">
                    <div class="about__image">
                        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/about-team.jpg" alt="<?php esc_attr_e('FPC Construction team at work', 'fpc-construction'); ?>" loading="lazy">
                    </div>
                    <div class="about__content">
                        <span class="section__label"><?php esc_html_e('About Us', 'fpc-construction'); ?></span>
                        <h2 class="section__title"><?php esc_html_e('Your Trusted Construction Partner Since 2009', 'fpc-construction'); ?></h2>
                        <p class="about__text"><?php esc_html_e('FPC Construction LLC has been serving North Augusta, SC and surrounding communities for over 15 years. We specialize in land clearing, site preparation, driveways, foundations, and septic services.', 'fpc-construction'); ?></p>
                        <p class="about__text"><?php esc_html_e('Our team of experienced professionals is committed to delivering quality workmanship on every project, big or small. We take pride in transforming our clients\' visions into reality while maintaining the highest standards of safety and craftsmanship.', 'fpc-construction'); ?></p>

                        <div class="about__features">
                            <div class="about__feature">
                                <svg class="about__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span><?php esc_html_e('Fully Licensed & Insured', 'fpc-construction'); ?></span>
                            </div>
                            <div class="about__feature">
                                <svg class="about__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span><?php esc_html_e('Free No-Obligation Estimates', 'fpc-construction'); ?></span>
                            </div>
                            <div class="about__feature">
                                <svg class="about__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span><?php esc_html_e('Comprehensive Warranties', 'fpc-construction'); ?></span>
                            </div>
                            <div class="about__feature">
                                <svg class="about__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span><?php esc_html_e('Flexible Payment Options', 'fpc-construction'); ?></span>
                            </div>
                        </div>

                        <a href="#contact" class="btn btn--primary"><?php esc_html_e('Request a Quote', 'fpc-construction'); ?></a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section class="services section section--dark" id="services">
            <div class="container">
                <div class="section__header">
                    <span class="section__label section__label--light"><?php esc_html_e('Our Services', 'fpc-construction'); ?></span>
                    <h2 class="section__title section__title--light"><?php esc_html_e('Professional Construction Services', 'fpc-construction'); ?></h2>
                    <p class="section__description section__description--light"><?php esc_html_e('We offer a comprehensive range of construction services to meet all your residential and commercial needs.', 'fpc-construction'); ?></p>
                </div>

                <div class="services__grid">
                    <div class="service-card">
                        <div class="service-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h3 class="service-card__title"><?php esc_html_e('Land Clearing', 'fpc-construction'); ?></h3>
                        <p class="service-card__description"><?php esc_html_e('Professional removal of trees, plants, brush, and obstacles from your property in a meticulous and safe manner.', 'fpc-construction'); ?></p>
                        <a href="#contact" class="service-card__link"><?php esc_html_e('Learn More', 'fpc-construction'); ?> &rarr;</a>
                    </div>

                    <div class="service-card">
                        <div class="service-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="7" height="18"/>
                                <rect x="14" y="3" width="7" height="18"/>
                            </svg>
                        </div>
                        <h3 class="service-card__title"><?php esc_html_e('Privacy Fencing', 'fpc-construction'); ?></h3>
                        <p class="service-card__description"><?php esc_html_e('Quality fence installation to enhance your property\'s privacy, security, and aesthetic appeal.', 'fpc-construction'); ?></p>
                        <a href="#contact" class="service-card__link"><?php esc_html_e('Learn More', 'fpc-construction'); ?> &rarr;</a>
                    </div>

                    <div class="service-card">
                        <div class="service-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <h3 class="service-card__title"><?php esc_html_e('Septic Tank Services', 'fpc-construction'); ?></h3>
                        <p class="service-card__description"><?php esc_html_e('Complete septic system installation, repair, and maintenance services for residential and commercial properties.', 'fpc-construction'); ?></p>
                        <a href="#contact" class="service-card__link"><?php esc_html_e('Learn More', 'fpc-construction'); ?> &rarr;</a>
                    </div>

                    <div class="service-card">
                        <div class="service-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"/>
                            </svg>
                        </div>
                        <h3 class="service-card__title"><?php esc_html_e('Land Grading', 'fpc-construction'); ?></h3>
                        <p class="service-card__description"><?php esc_html_e('Expert land grading services ensuring a smooth, well-prepared site for your construction project.', 'fpc-construction'); ?></p>
                        <a href="#contact" class="service-card__link"><?php esc_html_e('Learn More', 'fpc-construction'); ?> &rarr;</a>
                    </div>

                    <div class="service-card">
                        <div class="service-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19h16M4 15l4-8 4 8M14 15l4-8 4 8"/>
                            </svg>
                        </div>
                        <h3 class="service-card__title"><?php esc_html_e('Driveways', 'fpc-construction'); ?></h3>
                        <p class="service-card__description"><?php esc_html_e('Beautiful, durable driveway installation and repair services that enhance your property\'s curb appeal.', 'fpc-construction'); ?></p>
                        <a href="#contact" class="service-card__link"><?php esc_html_e('Learn More', 'fpc-construction'); ?> &rarr;</a>
                    </div>

                    <div class="service-card">
                        <div class="service-card__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="6" width="20" height="12" rx="2"/>
                                <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </div>
                        <h3 class="service-card__title"><?php esc_html_e('Foundations', 'fpc-construction'); ?></h3>
                        <p class="service-card__description"><?php esc_html_e('Solid foundation construction and repair services that provide the stability your structure needs.', 'fpc-construction'); ?></p>
                        <a href="#contact" class="service-card__link"><?php esc_html_e('Learn More', 'fpc-construction'); ?> &rarr;</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Counter Section -->
        <section class="stats section">
            <div class="container">
                <div class="stats__grid">
                    <div class="stats__item">
                        <span class="stats__number" data-count="<?php echo esc_attr(fpc_get_option('fpc_years', '15')); ?>">0</span>
                        <span class="stats__suffix">+</span>
                        <span class="stats__label"><?php esc_html_e('Years of Experience', 'fpc-construction'); ?></span>
                    </div>
                    <div class="stats__item">
                        <span class="stats__number" data-count="<?php echo esc_attr(fpc_get_option('fpc_projects', '500')); ?>">0</span>
                        <span class="stats__suffix">+</span>
                        <span class="stats__label"><?php esc_html_e('Projects Completed', 'fpc-construction'); ?></span>
                    </div>
                    <div class="stats__item">
                        <span class="stats__number" data-count="50">0</span>
                        <span class="stats__suffix">mi</span>
                        <span class="stats__label"><?php esc_html_e('Service Radius', 'fpc-construction'); ?></span>
                    </div>
                    <div class="stats__item">
                        <span class="stats__number" data-count="100">0</span>
                        <span class="stats__suffix">%</span>
                        <span class="stats__label"><?php esc_html_e('Client Satisfaction', 'fpc-construction'); ?></span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects/Portfolio Section -->
        <section class="projects section section--gray" id="projects">
            <div class="container">
                <div class="section__header">
                    <span class="section__label"><?php esc_html_e('Our Work', 'fpc-construction'); ?></span>
                    <h2 class="section__title"><?php esc_html_e('Featured Projects', 'fpc-construction'); ?></h2>
                    <p class="section__description"><?php esc_html_e('Browse our portfolio of completed projects and see the quality of our workmanship.', 'fpc-construction'); ?></p>
                </div>

                <div class="projects__filters">
                    <button class="projects__filter projects__filter--active" data-filter="all"><?php esc_html_e('All Projects', 'fpc-construction'); ?></button>
                    <button class="projects__filter" data-filter="driveways"><?php esc_html_e('Driveways', 'fpc-construction'); ?></button>
                    <button class="projects__filter" data-filter="land-clearing"><?php esc_html_e('Land Clearing', 'fpc-construction'); ?></button>
                    <button class="projects__filter" data-filter="foundations"><?php esc_html_e('Foundations', 'fpc-construction'); ?></button>
                    <button class="projects__filter" data-filter="grading"><?php esc_html_e('Grading', 'fpc-construction'); ?></button>
                </div>

                <div class="projects__grid">
                    <div class="project-card" data-category="driveways">
                        <div class="project-card__image">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/project-1.jpg" alt="<?php esc_attr_e('Concrete driveway installation', 'fpc-construction'); ?>" loading="lazy">
                            <div class="project-card__overlay">
                                <span class="project-card__category"><?php esc_html_e('Driveways', 'fpc-construction'); ?></span>
                            </div>
                        </div>
                        <div class="project-card__content">
                            <h3 class="project-card__title"><?php esc_html_e('Residential Driveway', 'fpc-construction'); ?></h3>
                            <p class="project-card__location"><?php esc_html_e('North Augusta, SC', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="project-card" data-category="land-clearing">
                        <div class="project-card__image">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/project-2.jpg" alt="<?php esc_attr_e('Land clearing project', 'fpc-construction'); ?>" loading="lazy">
                            <div class="project-card__overlay">
                                <span class="project-card__category"><?php esc_html_e('Land Clearing', 'fpc-construction'); ?></span>
                            </div>
                        </div>
                        <div class="project-card__content">
                            <h3 class="project-card__title"><?php esc_html_e('2-Acre Lot Clearing', 'fpc-construction'); ?></h3>
                            <p class="project-card__location"><?php esc_html_e('Aiken, SC', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="project-card" data-category="foundations">
                        <div class="project-card__image">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/project-3.jpg" alt="<?php esc_attr_e('Foundation construction', 'fpc-construction'); ?>" loading="lazy">
                            <div class="project-card__overlay">
                                <span class="project-card__category"><?php esc_html_e('Foundations', 'fpc-construction'); ?></span>
                            </div>
                        </div>
                        <div class="project-card__content">
                            <h3 class="project-card__title"><?php esc_html_e('Commercial Foundation', 'fpc-construction'); ?></h3>
                            <p class="project-card__location"><?php esc_html_e('Augusta, GA', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="project-card" data-category="grading">
                        <div class="project-card__image">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/project-4.jpg" alt="<?php esc_attr_e('Land grading project', 'fpc-construction'); ?>" loading="lazy">
                            <div class="project-card__overlay">
                                <span class="project-card__category"><?php esc_html_e('Grading', 'fpc-construction'); ?></span>
                            </div>
                        </div>
                        <div class="project-card__content">
                            <h3 class="project-card__title"><?php esc_html_e('Site Preparation', 'fpc-construction'); ?></h3>
                            <p class="project-card__location"><?php esc_html_e('Evans, GA', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="project-card" data-category="driveways">
                        <div class="project-card__image">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/project-5.jpg" alt="<?php esc_attr_e('Stamped concrete driveway', 'fpc-construction'); ?>" loading="lazy">
                            <div class="project-card__overlay">
                                <span class="project-card__category"><?php esc_html_e('Driveways', 'fpc-construction'); ?></span>
                            </div>
                        </div>
                        <div class="project-card__content">
                            <h3 class="project-card__title"><?php esc_html_e('Stamped Concrete', 'fpc-construction'); ?></h3>
                            <p class="project-card__location"><?php esc_html_e('Martinez, GA', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="project-card" data-category="land-clearing">
                        <div class="project-card__image">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder/project-6.jpg" alt="<?php esc_attr_e('Commercial land clearing', 'fpc-construction'); ?>" loading="lazy">
                            <div class="project-card__overlay">
                                <span class="project-card__category"><?php esc_html_e('Land Clearing', 'fpc-construction'); ?></span>
                            </div>
                        </div>
                        <div class="project-card__content">
                            <h3 class="project-card__title"><?php esc_html_e('Commercial Lot', 'fpc-construction'); ?></h3>
                            <p class="project-card__location"><?php esc_html_e('North Augusta, SC', 'fpc-construction'); ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials section" id="testimonials">
            <div class="container">
                <div class="section__header">
                    <span class="section__label"><?php esc_html_e('Testimonials', 'fpc-construction'); ?></span>
                    <h2 class="section__title"><?php esc_html_e('What Our Clients Say', 'fpc-construction'); ?></h2>
                    <p class="section__description"><?php esc_html_e('Don\'t just take our word for it - hear from our satisfied customers.', 'fpc-construction'); ?></p>
                </div>

                <div class="testimonials__carousel">
                    <div class="testimonials__track">
                        <div class="testimonial-card">
                            <div class="testimonial-card__stars">
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <p class="testimonial-card__quote"><?php esc_html_e('"Our new driveway is absolutely stunning! The crew was professional from start to finish. They arrived on time, worked efficiently, and left the site spotless. Couldn\'t be happier with the results."', 'fpc-construction'); ?></p>
                            <div class="testimonial-card__author">
                                <div class="testimonial-card__avatar">JM</div>
                                <div class="testimonial-card__info">
                                    <span class="testimonial-card__name"><?php esc_html_e('John Mitchell', 'fpc-construction'); ?></span>
                                    <span class="testimonial-card__role"><?php esc_html_e('Homeowner', 'fpc-construction'); ?></span>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-card__stars">
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <p class="testimonial-card__quote"><?php esc_html_e('"Outstanding work on our commercial project! FPC Construction delivered on time and within budget. Their attention to detail and professionalism made the entire process smooth and stress-free."', 'fpc-construction'); ?></p>
                            <div class="testimonial-card__author">
                                <div class="testimonial-card__avatar">SR</div>
                                <div class="testimonial-card__info">
                                    <span class="testimonial-card__name"><?php esc_html_e('Sarah Reynolds', 'fpc-construction'); ?></span>
                                    <span class="testimonial-card__role"><?php esc_html_e('Business Owner', 'fpc-construction'); ?></span>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-card__stars">
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <p class="testimonial-card__quote"><?php esc_html_e('"The stamped concrete patio looks amazing and has transformed our backyard into an outdoor oasis. FPC\'s team was knowledgeable, friendly, and truly cared about getting every detail right."', 'fpc-construction'); ?></p>
                            <div class="testimonial-card__author">
                                <div class="testimonial-card__avatar">DT</div>
                                <div class="testimonial-card__info">
                                    <span class="testimonial-card__name"><?php esc_html_e('David Thompson', 'fpc-construction'); ?></span>
                                    <span class="testimonial-card__role"><?php esc_html_e('Homeowner', 'fpc-construction'); ?></span>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-card__stars">
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <p class="testimonial-card__quote"><?php esc_html_e('"Best concrete contractor in the area! They repaired our damaged foundation and now it looks better than new. Professional, reliable, and reasonably priced. Highly recommend FPC Construction!"', 'fpc-construction'); ?></p>
                            <div class="testimonial-card__author">
                                <div class="testimonial-card__avatar">MJ</div>
                                <div class="testimonial-card__info">
                                    <span class="testimonial-card__name"><?php esc_html_e('Michael Johnson', 'fpc-construction'); ?></span>
                                    <span class="testimonial-card__role"><?php esc_html_e('Homeowner', 'fpc-construction'); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonials__nav">
                        <button class="testimonials__btn testimonials__btn--prev" aria-label="<?php esc_attr_e('Previous testimonial', 'fpc-construction'); ?>">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <div class="testimonials__dots"></div>
                        <button class="testimonials__btn testimonials__btn--next" aria-label="<?php esc_attr_e('Next testimonial', 'fpc-construction'); ?>">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Banner Section -->
        <section class="cta-banner">
            <div class="cta-banner__overlay"></div>
            <div class="container cta-banner__content">
                <h2 class="cta-banner__title"><?php esc_html_e('Ready to Start Your Project?', 'fpc-construction'); ?></h2>
                <p class="cta-banner__text"><?php esc_html_e('Contact us today for a free, no-obligation estimate. Let\'s build something great together.', 'fpc-construction'); ?></p>
                <div class="cta-banner__buttons">
                    <a href="#contact" class="btn btn--primary btn--large"><?php esc_html_e('Get Free Estimate', 'fpc-construction'); ?></a>
                    <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', fpc_get_option('fpc_phone', '8032889616'))); ?>" class="btn btn--outline-light btn--large">
                        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <?php echo esc_html(fpc_get_option('fpc_phone', '(803) 288-9616')); ?>
                    </a>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact section" id="contact">
            <div class="container">
                <div class="section__header">
                    <span class="section__label"><?php esc_html_e('Contact Us', 'fpc-construction'); ?></span>
                    <h2 class="section__title"><?php esc_html_e('Get Your Free Estimate', 'fpc-construction'); ?></h2>
                    <p class="section__description"><?php esc_html_e('Fill out the form below and we\'ll get back to you within 24 hours.', 'fpc-construction'); ?></p>
                </div>

                <div class="contact__grid">
                    <div class="contact__info">
                        <div class="contact__info-item">
                            <div class="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </div>
                            <div class="contact__info-content">
                                <h3 class="contact__info-title"><?php esc_html_e('Our Location', 'fpc-construction'); ?></h3>
                                <p><?php echo esc_html(fpc_get_option('fpc_address', 'North Augusta, SC 29860')); ?></p>
                                <p><?php esc_html_e('Serving the CSRA region', 'fpc-construction'); ?></p>
                            </div>
                        </div>

                        <div class="contact__info-item">
                            <div class="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </div>
                            <div class="contact__info-content">
                                <h3 class="contact__info-title"><?php esc_html_e('Phone', 'fpc-construction'); ?></h3>
                                <p><a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', fpc_get_option('fpc_phone', '8032889616'))); ?>"><?php echo esc_html(fpc_get_option('fpc_phone', '(803) 288-9616')); ?></a></p>
                            </div>
                        </div>

                        <div class="contact__info-item">
                            <div class="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </div>
                            <div class="contact__info-content">
                                <h3 class="contact__info-title"><?php esc_html_e('Email', 'fpc-construction'); ?></h3>
                                <p><a href="mailto:<?php echo esc_attr(fpc_get_option('fpc_email', 'info@fpcconstructions.com')); ?>"><?php echo esc_html(fpc_get_option('fpc_email', 'info@fpcconstructions.com')); ?></a></p>
                            </div>
                        </div>

                        <div class="contact__info-item">
                            <div class="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                            </div>
                            <div class="contact__info-content">
                                <h3 class="contact__info-title"><?php esc_html_e('Business Hours', 'fpc-construction'); ?></h3>
                                <p><?php echo esc_html(fpc_get_option('fpc_hours', 'Monday - Friday: 7AM - 6PM')); ?></p>
                                <p><?php esc_html_e('Saturday - Sunday: Closed', 'fpc-construction'); ?></p>
                            </div>
                        </div>
                    </div>

                    <div class="contact__form-wrapper">
                        <form class="contact__form" id="contact-form" action="#" method="POST">
                            <?php wp_nonce_field('fpc_contact_form', 'fpc_nonce'); ?>
                            <div class="form__group">
                                <label for="name" class="form__label"><?php esc_html_e('Full Name *', 'fpc-construction'); ?></label>
                                <input type="text" id="name" name="name" class="form__input" required placeholder="<?php esc_attr_e('John Doe', 'fpc-construction'); ?>">
                            </div>

                            <div class="form__row">
                                <div class="form__group">
                                    <label for="email" class="form__label"><?php esc_html_e('Email Address *', 'fpc-construction'); ?></label>
                                    <input type="email" id="email" name="email" class="form__input" required placeholder="<?php esc_attr_e('john@example.com', 'fpc-construction'); ?>">
                                </div>
                                <div class="form__group">
                                    <label for="phone" class="form__label"><?php esc_html_e('Phone Number *', 'fpc-construction'); ?></label>
                                    <input type="tel" id="phone" name="phone" class="form__input" required placeholder="<?php esc_attr_e('(803) 555-0123', 'fpc-construction'); ?>">
                                </div>
                            </div>

                            <div class="form__group">
                                <label for="service" class="form__label"><?php esc_html_e('Service Needed *', 'fpc-construction'); ?></label>
                                <select id="service" name="service" class="form__select" required>
                                    <option value=""><?php esc_html_e('Select a service...', 'fpc-construction'); ?></option>
                                    <option value="land-clearing"><?php esc_html_e('Land Clearing', 'fpc-construction'); ?></option>
                                    <option value="privacy-fencing"><?php esc_html_e('Privacy Fencing', 'fpc-construction'); ?></option>
                                    <option value="septic-services"><?php esc_html_e('Septic Tank Services', 'fpc-construction'); ?></option>
                                    <option value="land-grading"><?php esc_html_e('Land Grading', 'fpc-construction'); ?></option>
                                    <option value="driveways"><?php esc_html_e('Driveways', 'fpc-construction'); ?></option>
                                    <option value="foundations"><?php esc_html_e('Foundations', 'fpc-construction'); ?></option>
                                    <option value="other"><?php esc_html_e('Other', 'fpc-construction'); ?></option>
                                </select>
                            </div>

                            <div class="form__group">
                                <label for="message" class="form__label"><?php esc_html_e('Project Details', 'fpc-construction'); ?></label>
                                <textarea id="message" name="message" class="form__textarea" rows="5" placeholder="<?php esc_attr_e('Tell us about your project...', 'fpc-construction'); ?>"></textarea>
                            </div>

                            <button type="submit" class="btn btn--primary btn--large btn--full">
                                <?php esc_html_e('Request Free Estimate', 'fpc-construction'); ?>
                            </button>

                            <p class="form__note"><?php esc_html_e('By submitting this form, you agree to be contacted regarding your inquiry.', 'fpc-construction'); ?></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq section section--gray" id="faq">
            <div class="container">
                <div class="section__header">
                    <span class="section__label"><?php esc_html_e('FAQ', 'fpc-construction'); ?></span>
                    <h2 class="section__title"><?php esc_html_e('Frequently Asked Questions', 'fpc-construction'); ?></h2>
                    <p class="section__description"><?php esc_html_e('Find answers to common questions about our services and process.', 'fpc-construction'); ?></p>
                </div>

                <div class="faq__list">
                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span><?php esc_html_e('How long does a typical project take?', 'fpc-construction'); ?></span>
                            <svg class="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p><?php esc_html_e('Project timelines vary based on scope and complexity. A standard residential driveway typically takes 2-3 days, while larger commercial projects may take 1-2 weeks. We\'ll provide a detailed timeline during your free estimate consultation.', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span><?php esc_html_e('Do you offer free estimates?', 'fpc-construction'); ?></span>
                            <svg class="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p><?php esc_html_e('Yes! We provide free, no-obligation estimates for all projects. Contact us to schedule a site visit where we\'ll assess your needs and provide a detailed quote with no pressure or hidden fees.', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span><?php esc_html_e('What areas do you serve?', 'fpc-construction'); ?></span>
                            <svg class="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p><?php esc_html_e('We serve North Augusta, SC and surrounding communities within a 50-mile radius, including Aiken, Augusta, Evans, Martinez, and the greater CSRA region. Contact us to confirm service availability in your area.', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span><?php esc_html_e('Are you licensed and insured?', 'fpc-construction'); ?></span>
                            <svg class="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p><?php esc_html_e('Yes, FPC Construction is fully licensed and insured. We carry comprehensive liability insurance and workers\' compensation coverage to protect both our team and your property throughout every project.', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span><?php esc_html_e('What payment methods do you accept?', 'fpc-construction'); ?></span>
                            <svg class="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p><?php esc_html_e('We accept cash, checks, and all major credit cards. For larger projects, we also offer financing options to help make your project more affordable. Ask about our payment plans during your estimate.', 'fpc-construction'); ?></p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span><?php esc_html_e('Do you offer warranties on your work?', 'fpc-construction'); ?></span>
                            <svg class="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p><?php esc_html_e('Yes, we stand behind our work with comprehensive warranties. The specific warranty terms depend on the type of project and are clearly outlined in your contract. We\'re committed to your long-term satisfaction.', 'fpc-construction'); ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

<?php get_footer(); ?>

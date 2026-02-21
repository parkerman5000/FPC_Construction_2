/**
 * FPC Construction LLC - Main JavaScript
 * Version: 1.0.0
 *
 * This file contains all interactive functionality:
 * - Mobile navigation toggle
 * - Smooth scroll navigation
 * - Counter animation on scroll
 * - Testimonials carousel
 * - Project filtering
 * - FAQ accordion
 * - Contact form validation
 */

(function() {
    'use strict';

    // ============================================
    // DOM Ready Handler
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initSmoothScroll();
        initCounterAnimation();
        initTestimonialsCarousel();
        initProjectFilters();
        initFaqAccordion();
        initContactForm();
        initScrollHeader();
        updateCurrentYear();
        initGoogleDriveGallery();
        initBrokenImageFallback();
    });

    // ============================================
    // Mobile Navigation
    // ============================================
    function initMobileNav() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!navToggle || !navMenu) return;

        // Toggle menu
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // Smooth Scroll Navigation
    // ============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without scrolling
                history.pushState(null, null, href);
            });
        });
    }

    // ============================================
    // Counter Animation
    // ============================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-count]');
        if (counters.length === 0) return;

        const animateCounter = function(counter) {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const updateCounter = function(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);

                counter.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };

            requestAnimationFrame(updateCounter);
        };

        // Intersection Observer for triggering animation
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    // ============================================
    // Reviews Data (randomized on each page load)
    // ============================================
    var reviewsData = [
        { name: 'John Mitchell', role: 'Homeowner', stars: 5, quote: 'Our new driveway is absolutely stunning! The crew was professional from start to finish. They arrived on time, worked efficiently, and left the site spotless. Couldn\'t be happier with the results.' },
        { name: 'Sarah Reynolds', role: 'Business Owner', stars: 5, quote: 'Outstanding work on our commercial project! FPC Construction delivered on time and within budget. Their attention to detail and professionalism made the entire process smooth and stress-free.' },
        { name: 'David Thompson', role: 'Homeowner', stars: 5, quote: 'The stamped concrete patio looks amazing and has transformed our backyard into an outdoor oasis. FPC\'s team was knowledgeable, friendly, and truly cared about getting every detail right.' },
        { name: 'Michael Johnson', role: 'Homeowner', stars: 5, quote: 'Best concrete contractor in the area! They repaired our damaged foundation and now it looks better than new. Professional, reliable, and reasonably priced. Highly recommend FPC Construction!' },
        { name: 'Amanda Collins', role: 'Homeowner', stars: 5, quote: 'FPC cleared our 2-acre lot in just two days. The land was perfectly graded and ready for our new build. Their equipment operators really know what they\'re doing. Would absolutely hire them again.' },
        { name: 'Robert Williams', role: 'Property Developer', stars: 5, quote: 'We\'ve used FPC Construction on three separate projects now. Septic installation, grading, and a commercial driveway. Every single time they deliver quality work on schedule. They\'re our go-to contractor.' },
        { name: 'Lisa Patterson', role: 'Homeowner', stars: 5, quote: 'Our privacy fence looks incredible! The crew was respectful of our property and finished ahead of schedule. The fence is solid, level, and exactly what we wanted. Five stars all the way.' },
        { name: 'James Carter', role: 'Homeowner', stars: 5, quote: 'Had them install a new septic system for our rural property. Everything passed inspection on the first try. Fair pricing and they explained every step of the process. True professionals.' },
        { name: 'Karen Davis', role: 'Homeowner', stars: 5, quote: 'FPC Construction saved us after another contractor left our grading half-done. They came in, fixed the mess, and completed the job beautifully. Honest, hardworking, and dependable.' },
        { name: 'Thomas Wright', role: 'Business Owner', stars: 5, quote: 'Hired FPC for our new warehouse foundation. Rock-solid work and they handled all the permitting headaches for us. The kind of contractor you can trust with a handshake. Highly recommend.' }
    ];

    function shuffleArray(array) {
        var shuffled = array.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    function generateStarsHtml(count) {
        var html = '';
        for (var i = 0; i < count; i++) {
            html += '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        }
        return html;
    }

    function getInitials(name) {
        return name.split(' ').map(function(n) { return n[0]; }).join('');
    }

    // ============================================
    // Testimonials Carousel
    // ============================================
    function initTestimonialsCarousel() {
        const carousel = document.querySelector('.testimonials__carousel');
        if (!carousel) return;

        const track = carousel.querySelector('.testimonials__track');
        const prevBtn = carousel.querySelector('.testimonials__btn--prev');
        const nextBtn = carousel.querySelector('.testimonials__btn--next');
        const dotsContainer = carousel.querySelector('.testimonials__dots');

        if (!track) return;

        // Shuffle reviews and build cards dynamically
        var shuffledReviews = shuffleArray(reviewsData);
        track.innerHTML = '';

        shuffledReviews.forEach(function(review) {
            var card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML =
                '<div class="testimonial-card__stars">' + generateStarsHtml(review.stars) + '</div>' +
                '<p class="testimonial-card__quote">"' + review.quote + '"</p>' +
                '<div class="testimonial-card__author">' +
                    '<div class="testimonial-card__avatar">' + getInitials(review.name) + '</div>' +
                    '<div class="testimonial-card__info">' +
                        '<span class="testimonial-card__name">' + review.name + '</span>' +
                        '<span class="testimonial-card__role">' + review.role + '</span>' +
                    '</div>' +
                '</div>';
            track.appendChild(card);
        });

        var cards = track.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;

        let currentIndex = 0;
        const totalCards = cards.length;

        // Create dots
        dotsContainer.innerHTML = '';
        cards.forEach(function(_, index) {
            const dot = document.createElement('button');
            dot.classList.add('testimonials__dot');
            dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
            if (index === 0) dot.classList.add('testimonials__dot--active');
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.testimonials__dot');

        function updateCarousel() {
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

            dots.forEach(function(dot, index) {
                dot.classList.toggle('testimonials__dot--active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-advance carousel
        let autoPlayInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });

        carousel.addEventListener('mouseleave', function() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (diff > swipeThreshold) {
                nextSlide();
            } else if (diff < -swipeThreshold) {
                prevSlide();
            }
        }
    }

    // ============================================
    // Project Filters
    // ============================================
    function initProjectFilters() {
        const filterButtons = document.querySelectorAll('.projects__filter');
        const projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length === 0 || projectCards.length === 0) return;

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('projects__filter--active');
                });
                this.classList.add('projects__filter--active');

                // Filter projects
                projectCards.forEach(function(card) {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq__question');

            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Close all other items
                faqItems.forEach(function(otherItem) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // ============================================
    // Contact Form Validation
    // ============================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const fields = {
            name: {
                element: form.querySelector('#name'),
                validate: function(value) {
                    if (!value.trim()) return 'Please enter your name';
                    if (value.trim().length < 2) return 'Name must be at least 2 characters';
                    return '';
                }
            },
            email: {
                element: form.querySelector('#email'),
                validate: function(value) {
                    if (!value.trim()) return 'Please enter your email';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) return 'Please enter a valid email address';
                    return '';
                }
            },
            phone: {
                element: form.querySelector('#phone'),
                validate: function(value) {
                    if (!value.trim()) return 'Please enter your phone number';
                    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
                    return '';
                }
            },
            service: {
                element: form.querySelector('#service'),
                validate: function(value) {
                    if (!value) return 'Please select a service';
                    return '';
                }
            }
        };

        // Real-time validation
        Object.keys(fields).forEach(function(key) {
            const field = fields[key];
            if (!field.element) return;

            field.element.addEventListener('blur', function() {
                validateField(field);
            });

            field.element.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        function validateField(field) {
            const error = field.validate(field.element.value);
            const errorElement = field.element.parentElement.querySelector('.form__error');

            if (error) {
                field.element.classList.add('error');
                if (!errorElement) {
                    const errorSpan = document.createElement('span');
                    errorSpan.classList.add('form__error');
                    errorSpan.textContent = error;
                    field.element.parentElement.appendChild(errorSpan);
                } else {
                    errorElement.textContent = error;
                }
                return false;
            } else {
                field.element.classList.remove('error');
                if (errorElement) {
                    errorElement.remove();
                }
                return true;
            }
        }

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Validate all fields
            Object.keys(fields).forEach(function(key) {
                const field = fields[key];
                if (field.element && !validateField(field)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual form handling)
                setTimeout(function() {
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.style.cssText = 'padding: 1rem; background: #10b981; color: white; border-radius: 0.5rem; text-align: center; margin-top: 1rem;';
                    successMessage.textContent = 'Thank you! Your message has been sent. We will contact you shortly.';

                    form.appendChild(successMessage);
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);

                // TODO: Implement actual form submission
                // Options:
                // 1. Formspree: action="https://formspree.io/f/YOUR_FORM_ID"
                // 2. Netlify Forms: add data-netlify="true" to form
                // 3. Custom endpoint: fetch('/api/contact', { method: 'POST', body: new FormData(form) })
            }
        });

        // Phone number formatting
        const phoneInput = form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = '(' + value;
                    } else if (value.length <= 6) {
                        value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
                    } else {
                        value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
                    }
                }
                e.target.value = value;
            });
        }
    }

    // ============================================
    // Scroll Header
    // ============================================
    function initScrollHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            // Add shadow when scrolled
            if (currentScrollY > 0) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '';
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // ============================================
    // Update Current Year
    // ============================================
    function updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ============================================
    // Broken Image Fallback
    // ============================================
    function initBrokenImageFallback() {
        document.querySelectorAll('img').forEach(function(img) {
            img.addEventListener('error', function() {
                this.classList.add('img-broken');
                this.alt = 'Photo coming soon';
            });
        });
    }

    // ============================================
    // Gallery Integration (Local, Google Drive, Supabase)
    // ============================================
    var galleryMode = 'local';
    var supabaseStorageUrl = '';

    function initGoogleDriveGallery() {
        // Load gallery configuration
        fetch('assets/data/gallery-config.json')
            .then(function(response) {
                if (!response.ok) {
                    console.log('Gallery config not found, using default images');
                    return null;
                }
                return response.json();
            })
            .then(function(config) {
                if (!config) return;

                // Set mode from config
                galleryMode = config.mode || 'local';

                // Set Supabase URL if in supabase mode
                if (galleryMode === 'supabase' && config.supabaseUrl && config.supabaseBucket) {
                    supabaseStorageUrl = config.supabaseUrl + '/storage/v1/object/public/' + config.supabaseBucket + '/';
                }

                // Update project images from config
                if (config.projects && config.projects.length > 0) {
                    updateProjectImages(config.projects);
                }

                // Initialize additional gallery if present
                if (config.gallery && config.gallery.length > 0) {
                    initDynamicGallery(config.gallery);
                }
            })
            .catch(function(error) {
                console.log('Gallery config loading skipped:', error.message);
            });
    }

    // Get image URL based on mode (local, Google Drive, or Supabase)
    function getImageUrl(item, index) {
        // Supabase mode: use public storage URL
        if (galleryMode === 'supabase' && supabaseStorageUrl) {
            var filename = item.supabaseFile || item.localImage;
            if (filename && filename.trim() !== '') {
                return supabaseStorageUrl + filename;
            }
        }
        // Local mode: use local image path
        if (galleryMode === 'local' && item.localImage && item.localImage.trim() !== '') {
            return 'assets/images/projects/' + item.localImage;
        }
        // Google Drive mode: use gdrive ID
        if (galleryMode === 'gdrive' && item.gdriveId && item.gdriveId.trim() !== '') {
            return 'https://drive.google.com/thumbnail?id=' + item.gdriveId + '&sz=w800';
        }
        // Fallback to placeholder
        return 'assets/images/placeholder/project-' + (index + 1) + '.jpg';
    }

    // Update project card images from config
    function updateProjectImages(projects) {
        var cards = document.querySelectorAll('.project-card');
        cards.forEach(function(card, index) {
            if (projects[index]) {
                var projectData = projects[index];
                var img = card.querySelector('img');

                if (img) {
                    var imageUrl = getImageUrl(projectData, index);
                    img.src = imageUrl;
                    img.onerror = function() {
                        // Fallback to placeholder if image fails
                        this.src = 'assets/images/placeholder/project-' + (index + 1) + '.jpg';
                    };
                }

                // Update title and location if provided
                var titleEl = card.querySelector('.project-card__title');
                var locationEl = card.querySelector('.project-card__location');

                if (titleEl && projectData.title) {
                    titleEl.textContent = projectData.title;
                }
                if (locationEl && projectData.location) {
                    locationEl.textContent = projectData.location;
                }
            }
        });
    }

    // Initialize dynamic gallery section
    function initDynamicGallery(galleryItems) {
        var galleryContainer = document.getElementById('dynamic-gallery');
        if (!galleryContainer) return;

        var validItems = galleryItems.filter(function(item) {
            if (galleryMode === 'local') {
                return item.localImage && item.localImage.trim() !== '';
            }
            return item.gdriveId && item.gdriveId.trim() !== '';
        });

        if (validItems.length === 0) {
            galleryContainer.style.display = 'none';
            return;
        }

        var grid = galleryContainer.querySelector('.gallery__grid');
        if (!grid) return;

        // Clear existing items
        grid.innerHTML = '';

        validItems.forEach(function(item, index) {
            var imageUrl = getImageUrl(item, index);
            if (!imageUrl) return;

            var galleryItem = document.createElement('div');
            galleryItem.className = 'gallery__item';
            galleryItem.innerHTML =
                '<img src="' + imageUrl + '" alt="' + (item.title || 'Gallery image') + '" loading="lazy">' +
                '<div class="gallery__overlay">' +
                    '<span class="gallery__title">' + (item.title || '') + '</span>' +
                '</div>';

            // Add lightbox click handler
            galleryItem.addEventListener('click', function() {
                openLightbox(imageUrl, item.title);
            });

            grid.appendChild(galleryItem);
        });

        galleryContainer.style.display = 'block';
    }

    // Simple lightbox for gallery images
    function openLightbox(imageUrl, title) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML =
            '<div class="lightbox__backdrop"></div>' +
            '<div class="lightbox__content">' +
                '<button class="lightbox__close" aria-label="Close">&times;</button>' +
                '<img src="' + imageUrl + '" alt="' + (title || 'Gallery image') + '">' +
                (title ? '<p class="lightbox__title">' + title + '</p>' : '') +
            '</div>';

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close handlers
        var closeHandler = function() {
            lightbox.remove();
            document.body.style.overflow = '';
        };

        lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeHandler);
        lightbox.querySelector('.lightbox__close').addEventListener('click', closeHandler);

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeHandler();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

})();

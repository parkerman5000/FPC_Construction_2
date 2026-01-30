<?php
/**
 * Main Template File
 *
 * @package FPC_Construction
 * @since 1.0.0
 */

get_header();
?>

<?php if (have_posts()) : ?>
    <section class="section">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="section__header">
                        <h1 class="section__title"><?php the_title(); ?></h1>
                    </header>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
            <?php endwhile; ?>

            <?php the_posts_navigation(); ?>
        </div>
    </section>
<?php else : ?>
    <section class="section">
        <div class="container">
            <div class="section__header">
                <h1 class="section__title"><?php esc_html_e('Nothing Found', 'fpc-construction'); ?></h1>
                <p class="section__description"><?php esc_html_e('It seems we can\'t find what you\'re looking for.', 'fpc-construction'); ?></p>
            </div>
        </div>
    </section>
<?php endif; ?>

<?php get_footer(); ?>

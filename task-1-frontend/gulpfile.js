const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// Paths - Updated for WordPress theme
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'wordpress/wp-content/themes/frontdev-portfolio/assets/css',
    destStandalone: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'wordpress/wp-content/themes/frontdev-portfolio/assets/js',
    destStandalone: 'dist/js'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  wordpress: {
    watch: 'wordpress/wp-content/themes/frontdev-portfolio/**/*.php',
    base: 'wordpress'
  }
};

// Compile SCSS to CSS (WordPress)
function stylesWP() {
  return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Compile SCSS to CSS (Standalone)
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.destStandalone))
    .pipe(browserSync.stream());
}

// Minify JavaScript (WordPress)
function scriptsWP() {
  return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Minify JavaScript (Standalone)
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.destStandalone))
    .pipe(browserSync.stream());
}

// Copy HTML files
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Watch WordPress theme files
function watchWordPress() {
  gulp.watch(paths.styles.src, stylesWP);
  gulp.watch(paths.scripts.src, scriptsWP);
  gulp.watch(paths.wordpress.watch).on('change', browserSync.reload);
}

// BrowserSync with WordPress proxy
function serveWordPress() {
  browserSync.init({
    proxy: "localhost:8080", // PHP built-in server
    port: 3000,
    open: true,
    notify: false,
    files: [
      'wordpress/wp-content/themes/frontdev-portfolio/**/*.php',
      'wordpress/wp-content/themes/frontdev-portfolio/assets/**/*'
    ]
  });

  watchWordPress();
}

// BrowserSync for standalone HTML
function serveStandalone() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
}

// Build tasks
const buildStandalone = gulp.series(
  gulp.parallel(styles, scripts, html)
);

const buildWordPress = gulp.series(
  gulp.parallel(stylesWP, scriptsWP)
);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;

// Standalone version (current setup)
exports.build = buildStandalone;
exports.default = gulp.series(buildStandalone, serveStandalone);

// WordPress version
exports['build:wp'] = buildWordPress;
exports['dev:wp'] = gulp.series(buildWordPress, serveWordPress);
exports.serve = serveStandalone;

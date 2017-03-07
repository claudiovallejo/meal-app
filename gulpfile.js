var gulp = require('gulp'),
    copy = require('gulp-copy'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    cssmin = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip');
    sitemap = require('gulp-sitemap'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

//  Copy site content into public
gulp.task('copy', function() {
  gulp.src(['images/refresh.svg'])
    .pipe(gulp.dest('public/images/'))
  gulp.src(['scripts/app.js'])
    .pipe(gulp.dest('public/scripts/'))
  gulp.src(['styles/tachyons.css', 'styles/app.js'])
    .pipe(gulp.dest('public/styles/'))
  gulp.src(['index.html'])
    .pipe(gulp.dest('public/'))
});

//  Minify .html
gulp.task('markup', function(){
  gulp.src('public/index.html')
  .pipe(htmlmin())
  .pipe(gulp.dest('public/'))
});

//  Remove unused css from tachyons.css
gulp.task('uncss', function(){
  return gulp.src('public/styles/tachyons.css')
    .pipe(uncss({ html: ['public/index.html'] }))
    .pipe(cssmin())
    .pipe(gulp.dest('public/styles/'))
});

//  Minify site.css + Gzip site.css
gulp.task('styles', function(){
  gulp.src(['public/styles/tachyons.css', 'public/styles/app.css'])
  .pipe(concat('public/styles/app.css'))
  .pipe(cssmin())
  .pipe(gzip())
});

//  Generate sitemap
gulp.task('sitemap', function() {
  gulp.src('public/*.html', {
    read: false
  })
  .pipe(sitemap({
    siteUrl: 'http://www.claudiovallejo.mx'
  }))
  .pipe(gulp.dest('public/'));
});

//  Remove unused files
gulp.task('clean', function(){
  gulp.src('public/styles/tachyons.css', {read: false})
  .pipe(clean());
});

// Run previously `gulp` tasks in sequence
gulp.task('sequence', function(callback) {
  runSequence('copy', 'uncss', 'markup', 'styles', 'sitemap', 'clean');
});

// Build
gulp.task('build', ['sequence']);

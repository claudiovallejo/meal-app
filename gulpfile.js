var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    cssmin = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip');
    sitemap = require('gulp-sitemap'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

//  Minify .html
gulp.task('markup', function(){
  gulp.src('./index.html')
  .pipe(htmlmin())
  .pipe(gulp.dest('./public'))
});

//  Remove unused css from tachyons.css
gulp.task('uncss', function(){
  return gulp.src('./styles/tachyons.css')
    .pipe(uncss({ html: ['./index.html'] }))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/styles'))
});

//  Minify site.css + Gzip site.css
gulp.task('styles', function(){
  gulp.src(['./styles/tachyons.css', './styles/app.css'])
  .pipe(concat('./styles/app.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('./public/styles'))
  .pipe(gzip())
  .pipe(gulp.dest('./public/styles'))
});

//  Minify all.js
gulp.task('scripts', function(){
  gulp.src('./scripts/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./public/scripts'))
  .pipe(gzip())
  .pipe(gulp.dest('./public/scripts'))
});

//  Generate sitemap
gulp.task('sitemap', function() {
  gulp.src('./public/*.html', {
    read: false
  })
  .pipe(sitemap({
    siteUrl: 'http://www.claudiovallejo.mx'
  }))
  .pipe(gulp.dest('./'));
});

//  Remove unused files
gulp.task('clean', function(){
  gulp.src('./public/styles/tachyons.css', {read: false})
  .pipe(clean());
});

// Run previously `gulp` tasks in sequence
gulp.task('sequence', function(callback) {
  runSequence('uncss', ['markup', 'styles', 'scripts', 'sitemap'], 'clean');
});

// Build
gulp.task('build', ['sequence']);

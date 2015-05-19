var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var rev = require('gulp-rev');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var usemin = require('gulp-usemin');
var rsync = require('gulp-rsync');
var webserver = require('gulp-webserver');

var paths = {
  src: 'site',
  build: 'build/**',
  scripts: 'site/js/**/*.js',
  images: 'site/images/**/*'
};

gulp.task('usemin', function() {
  return gulp.src('./site/*html')
     .pipe(usemin({
       css: [minifyCss(), 'concat'],
       html: [minifyHtml({empty:true})],
       js: [uglify(), rev()],
       inlinejs: [uglify()],
       inlinecss: [minifyCss(), 'concat']
     }))
     .pipe(gulp.dest('build/'));
});

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
             .pipe(sourcemaps.init())
             .pipe(uglify())
             .pipe(concat('all.min.js'))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest('build/js'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
             .pipe(imagemin({optimizationLevel: 5}))
             .pipe(gulp.dest('build/images'));
});

gulp.task('deploy', ['usemin'], function() {
  return gulp.src(paths.build)
             .pipe(rsync({
                   username: 'deployer',
                   root: 'build',
                   hostname: 'tlcowling.com',
                   destination: '/var/www/tlcowling.com/profile'
                 }));     
});

gulp.task('develop', function() {
  gulp.src(paths.src)
      .pipe(webserver({
         livereload: true,
         directoryListing: false,
         open: true
      }));
});

gulp.task('default', ['usemin'], function() { });

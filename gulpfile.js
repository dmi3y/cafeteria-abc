var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

//Clean//
var del = require('del');
gulp.task('clean', function (cb) {
  del([
    './dist/*.*'
  ], cb);
});

//Build//
var runSequence = require('run-sequence');

gulp.task('templates', function() {
  var locals = {};

  return gulp.src('./src/jade/*.jade')
    .pipe(plugins.jade({
      basedir: './src/jade/',
      locals: locals
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('templates-client', function() {

  return gulp.src('./src/jade/client/*.jade')
    .pipe(plugins.jade({
      basedir: './src/jade/',
      client: true
    }))
    .pipe(plugins.jadeTemplateConcat('templates.js', {templateVariable: 'Templates'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function () {
  return gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap',
      './src/styles/main.styl'
    ])
    .pipe(plugins.stylus())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/jade/runtime.js',
      './bower_components/firebase/firebase.js',
      './src/scripts/vertical-slider.js',
      './src/scripts/*.js'
    ])
    .pipe(plugins.concat('main.js'))
    //.pipe(plugins.uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    [
      'templates',
      'templates-client',
      'styles',
      'scripts'
    ],
    cb
  );
});

gulp.task('default', ['build']);

// Watch
gulp.task('watch', ['build'], function() {

  gulp.watch(['./src/jade/**/*'], ['templates', 'templates-client']);
  gulp.watch(['./src/scripts/**/*'], ['scripts']);
  gulp.watch(['./src/styles/**/*'], ['styles']);
});

const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglifyjs');
const $ = require('gulp-load-plugins')();
const stylish = require('jshint-stylish');


gulp.task('jshint', () => {
  return gulp.src(['js/**/*.js'])
    .pipe(babel({presets: ['es2015']}))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

gulp.task('clean', () => {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
})

gulp.task('build', () => {
  return gulp.src(['js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    // .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    // .pipe(wrap('(function(){"use strict";<%= contents %>\n})();'))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor', () => {
  let vendorFiles = JSON.parse(fs.readFileSync('bundlefile.json'))
    .filter(file => file.match(/\.js$/));
  return gulp.src(vendorFiles)
    .pipe(wrap('(function(){"use strict";<%= contents %>\n})();'))
    .pipe(uglify({compress: {}}))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  return gulp.watch([
      'bower.json',
      'package.json',
      'bundlefile.json',
      'js/**/*.js'
    ],
    ['jshint', 'build']
  );
});

gulp.task('default', runSequence('clean', ['watch', 'build', 'vendor']));


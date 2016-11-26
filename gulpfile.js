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
  return gulp.src([
      'js/**/*.js',
      'js-workers/**/*.js'
    ])
    .pipe(babel({presets: ['es2015']}))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

gulp.task('clean', () => {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
})

gulp.task('quick-build', () => {
  gulp.src(['css/**/*.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist'));

  gulp.src(['js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

  gulp.src(['js-workers/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/workers'));

  fs.writeFileSync('dist/examples.json', JSON.stringify(
    fs.readdirSync('examples')
  ));
});

gulp.task('vendor', () => {
  let vendorFiles = JSON.parse(fs.readFileSync('bundlefile.json'));
  let js = file => file.match(/\.js$/);
  let css = file => file.match(/\.css$/);

  gulp.src(vendorFiles.filter(js))
    .pipe(wrap('(function(){"use strict";<%= contents %>\n})();'))
    .pipe(uglify({compress: {}}))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist'));

  gulp.src(vendorFiles.filter(css))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist'));

  let workerFiles = ['node_modules/brainfuck-compiler/lib/brainfuck.js'];

  gulp.src(workerFiles)
    .pipe(uglify({compress: {}}))
    .pipe(gulp.dest('dist/workers'));
});

gulp.task('watch', () => {
  return gulp.watch([
      'bower.json',
      'package.json',
      'bundlefile.json',
      'css/**/*.css',
      'js/**/*.js',
      'js-workers/**/*.js',
      'examples/*.bf'
    ],
    ['jshint', 'quick-build']
  );
});

gulp.task('default', runSequence('clean', ['watch', 'vendor']));
gulp.task('build', runSequence('clean', ['quick-build', 'vendor']));


var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

var appfiles = [
    'view/app/app.js',
    'view/app/**/!(app.)*.js',
    'view/app/**/!(app.)*.JS',
    'view/app/app.bootstrap.js'
];

var stylesFiles = [
  'view/css/**/*.scss'
];

gulp.task('js', function(){
  gulp.src(appfiles)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./view/dist'));
});

gulp.task('js-min', function(){
  gulp.src(appfiles)
    .pipe(plumber())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./view/dist'));
});

gulp.task('sass', function () {
  gulp.src(stylesFiles)
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./view/dist'));
});

gulp.task('sass-min', function () {
  gulp.src(stylesFiles)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./view/dist'));
});

gulp.task('start-watch', function (argument) {
  gulp.watch(appfiles, ['js', 'js-min']);
  gulp.watch(stylesFiles, ['sass', 'sass-min']);
});

gulp.task('default', ['js', 'js-min', 'sass', 'sass-min', 'start-watch']);

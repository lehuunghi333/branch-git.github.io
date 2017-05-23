var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('useref', function () {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpIf('main.min.js', uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('browser-sync', ['sass'], function () {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(bs.reload({ stream: true }));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/styles.scss", ['sass']);
    gulp.watch("index.html").on('change', bs.reload);
});
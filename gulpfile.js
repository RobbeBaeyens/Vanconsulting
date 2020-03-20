var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var sass = require('gulp-dart-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var mqpacker = require('@lipemat/css-mqpacker');

gulp.task('browser-sync', function () {
    browserSync.init({
        startPath: '/index.html',
        server: {
            baseDir: "./dist",
            directory: true
        }
    });
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./**/*.{html,css,js,php}').on('change', browserSync.reload);
});

// Optimize CSS just before publishing
gulp.task('minify-css', function () {
    return gulp.src('./dist/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist'));
});

// Copy bootstrap JS-files
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(newer('./dist/js'))
        .pipe(notify({message: 'Copy JS files'}))
        .pipe(gulp.dest('./dist/js'));
});

// Compile sass into CSS (/dist/css/) & auto-inject into browser
gulp.task('sass', function () {
    var processors = [
        mqpacker({sort: true})
    ];
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'SASS compile error!',
                message: '<%= error.message %>'
            })
        }))
        .pipe(sourcemaps.init())
        // outputStyle: nested (default), expanded, compact, compressed
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(prefix("last 2 versions"))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', gulp.series('js', 'sass', 'browser-sync'));
gulp.task('minify', gulp.series('minify-css'));

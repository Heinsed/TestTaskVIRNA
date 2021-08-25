const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
var ts = require("gulp-typescript");


//Компилируем SCSS в CSS
function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
}

function script_ts() {
    return gulp.src('src/js/**/*.ts')
        .pipe(rename({ suffix: '.min' }))
        .pipe(ts())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))

    .pipe(browserSync.stream());


}


function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());


}

const paths = {

    html: {
        src: 'src/',
        dest: 'dist/',
        mask: '/**/[^_]*.+(html|php)',
    }
}

function html() {
    return gulp.src(paths.html.src + paths.html.mask)
        // .pipe(plumber({ errorHandle: handleError }))
        .pipe(fileinclude())
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });

    gulp.watch(['src/js/*.js'], scripts);
    gulp.watch(['src/js/*.ts'], script_ts);
    gulp.watch(['src/scss/**/*.scss'], styles);
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/img/*'], images);
}

const dev = gulp.series(html, scripts, styles, images, fonts, watch);

const dev_ts = gulp.series(html, script_ts, styles, images, fonts, watch);

gulp.task('dev', dev);
gulp.task('dev_ts', dev_ts);
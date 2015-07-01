var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    jshint = require('gulp-jshint'),
    plugins = gulpLoadPlugins(),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    ghPages = require('gulp-gh-pages');

var app = 'src';

var onError = function(err) {
    console.log(err);
};

gulp.task('Sass', function() {

    gulp.src(app + '/scss/**/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(plugins.rubySass({
            style: 'expanded',
            check: true,
            "sourcemap=none": true
        }))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(plugins.minifyCss({keepSpecialComments:0}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist/css/'));
});

gulp.task('concat', function() {
    gulp.src([
        app + '/vendor/**.js',
        app + '/js/**.js'
    ])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify({mangle: true}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/js/'));
});

gulp.task('lint', function() {
    return gulp.src(app + '/js/**.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(app + '/scss/**/*.scss', ['Sass']);
    gulp.watch([
        app + '/vendor/**.js',
        app + '/js/**.js'
    ], ['concat', 'lint']);
});

gulp.task('deploy', function() {
    return gulp.src('./app/**/*')
        .pipe(ghPages());
});

gulp.task('default', [
    'concat',
    'Sass',
    'lint'
]);

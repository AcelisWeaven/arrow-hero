var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    jshint = require('gulp-jshint'),
    plugins = gulpLoadPlugins();

var app = 'src';

var onError = function(err) {
    console.log(err);
};

gulp.task('Sass', function() {

    gulp.src(app + '/scss/**/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.rubySass({
            compass: true,
            style: 'compressed',
            check: true}))
        .pipe(plugins.minifyCss({keepSpecialComments:0}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/css/'));
});



gulp.task('copy', function() {
    gulp.src(app + '/fonts/*.{ttf,woff,eof,svg,eot}')
        .pipe(gulp.dest('app/dist/fonts/'));
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


gulp.task('build', [
'copy',
'concat',
'Sass',
'lint'
]);

gulp.task('default', [
'Sass'
]);

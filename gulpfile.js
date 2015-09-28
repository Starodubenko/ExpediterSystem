var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

var tempDirectory = "app/temp";
var srcDirectory = "app/front/**/**/";

gulp.task('scripts', function () {
    gulp.src(srcDirectory + '*js')
        .pipe(concat('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(tempDirectory))
});

gulp.task('css', function(){
    gulp.src(srcDirectory + '*css')
        .pipe(concat('all.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(tempDirectory))
});

gulp.task('watch', function(){
    gulp.watch(srcDirectory + '*js', ['scripts']);
    gulp.watch(srcDirectory + '*css', ['css']);
});

gulp.task('default', ['scripts', 'css']);
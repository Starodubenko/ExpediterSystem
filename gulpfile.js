var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

gulp.task('scripts', function () {
    gulp.src('app/front/**/**/*js')
        .pipe(concat('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('app/front/temp'))
});

gulp.task('css', function(){
    gulp.src('app/front/**/**/*css')
        .pipe(concat('all.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('app/front/temp'))
});

gulp.task('watch', function(){
    gulp.watch('app/front/**/**/*js', ['scripts']);
    gulp.watch('app/front/**/**/*css', ['css']);
});

gulp.task('default', ['scripts', 'css']);
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('scripts', function () {
    gulp.src('app/front/**/**/*js')
        .pipe(concat('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('app/front/temp'))
});

gulp.task('watch', function(){
    gulp.watch('app/front/**/**/*js', ['scripts'])
});
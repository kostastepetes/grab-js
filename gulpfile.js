var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress', function () {
 return gulp.src('grab.js')
    .pipe(uglify())
    .pipe(rename('grab.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
 gulp.watch('grab.js', gulp.series('compress'));
});

gulp.task('default', gulp.series('watch'));
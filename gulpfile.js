const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('js-min', function () {
    return gulp.src('safs.jquery.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', gulp.series('js-min'));

gulp.task('watch', function () {
    gulp.watch('safs.jquery.js', series('js-min'));
});
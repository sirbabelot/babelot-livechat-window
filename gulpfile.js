var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var babel = require('gulp-babel');


gulp.task('watch', function () {
  gulp.watch(['src/**/*.js'], ['default']);
});

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015'],
      sourceMaps: true,
      compact: false
    }))
    //.pipe(uglify())
    .pipe(gulp.dest('build'));
});

var intercept = require('gulp-intercept');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var config = require('./webpack.config');

gulp.task('default', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(intercept(function(file){
      console.log(file.contents.toString());
      return file;
    }))
});

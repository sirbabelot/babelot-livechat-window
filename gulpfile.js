var intercept = require('gulp-intercept');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var config = require('./webpack.config');

module.exports = function(businessId, done) {
  var babelotBusinessId = businessId;

  config.module.loaders.push({
    test: /\.js?$/,
    exclude: /(node_modules)/,
    loader: `imports?babelotBusinessId=>'${babelotBusinessId}'`
  });

  gulp.src('src/index.js')
      .pipe(webpack(config))
      .pipe(uglify())
      .pipe(intercept((file)=> {
        config.module.loaders.pop();
        done(file.contents.toString());
      }))
};


var babelotBusinessId = 'ExclusiveRentals.com'

config.module.loaders.push({
  test: /\.js?$/,
  exclude: /(node_modules)/,
  loader: `imports?babelotBusinessId=>'${babelotBusinessId}'`
});

gulp.task('default', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(intercept((file)=> {
      return file;
    }))
    .pipe(gulp.dest('./build'))
});

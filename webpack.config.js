var webpack = require('webpack');
var EventEmitter = require("events").EventEmitter;


var options = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel?presets[]=es2015'
    }]
  }
};

module.exports = options;

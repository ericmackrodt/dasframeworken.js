'use strict';
/*global __dirname, require, module*/
//https://github.com/krasimir/webpack-library-starter/blob/master/webpack.config.js
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'dasframeworkenTemplateTranspiler';

let plugins = [], outputFile;

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function() {
    const dts = require('dts-bundle');
    dts.bundle({
      name: libraryName,
      main: './dist/**/*.d.ts',
      out: './' + libraryName + '.d.ts',
      removeSource: true,
      outputAsModuleFolder: true,
      externals: false,
      referenceExtrenals: false
    });
  });
};

// plugins.push(new DtsBundlePlugin());

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = '.min.js';
} else {
  outputFile = '.js';
}

const config = {
  entry: { 
    'template.transpiler': __dirname + '/src/transpiler.ts'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name]' + outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        loader: 'ts-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.json', '.js', '.ts']
  },
  plugins: plugins
};

module.exports = config;
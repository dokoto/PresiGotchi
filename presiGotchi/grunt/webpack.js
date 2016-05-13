module.exports = function(grunt) {
  'use strict';

  var webpack = require('webpack');
  var options = grunt.config.data;

  return {
    dev: {
      cache: true,
      debug: true,
      devtool: 'eval',

      // webpack options
      entry: './src/js/app/app.js',
      output: {
        path: "builds/dev/",
        filename: "<%=base.appName%>.js",
      },

      stats: {
        // Configure the console output
        colors: false,
        modules: true,
        reasons: true
      },
      // stats: false disables the stats output

      storeStatsTo: "webpackStatus", // writes the status to a variable named xyz
      // you may use it later in grunt i.e. <%= xyz.hash %>

      progress: true, // Don't show progress
      // Defaults to true

      failOnError: true, // don't report error to grunt if webpack find errors
      // Use this if webpack errors are tolerable and grunt should continue

      inline: true, // embed the webpack-dev-server runtime into the bundle
      // Defaults to false

      module: {
        loaders: [{
          test: /\.hbs$/,
          loader: 'handlebars-loader'
        }]
      },

      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          BUILD_MODE: '<%= args.mode %>',
          VERSION: '<%= args.versionApp %>',
          TARGET: '<%= args.target %>',
          TARGET_OS: '<%= args.targetOS %>',
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          _: 'underscore',
          Backbone: 'backbone',
          Marionette: 'backbone.marionette'
        })
      ],
      resolve: {
        modulesDirectories: ['./node_modules'],
        root: './src/js/app'
      },
      resolveLoader: {
        root: './node_modules'
      }

    },
    prod: {
      debug: false,

      // webpack options
      entry: './src/js/app/app.js',
      output: {
        path: "builds/prod/",
        filename: "<%=base.appName%>.js",
      },

      stats: {
        // Configure the console output
        colors: false,
        modules: true,
        reasons: true
      },
      // stats: false disables the stats output

      storeStatsTo: "webpackStatus", // writes the status to a variable named xyz
      // you may use it later in grunt i.e. <%= xyz.hash %>

      progress: true, // Don't show progress
      // Defaults to true

      failOnError: true, // don't report error to grunt if webpack find errors
      // Use this if webpack errors are tolerable and grunt should continue

      inline: true, // embed the webpack-dev-server runtime into the bundle
      // Defaults to false

      module: {
        loaders: [{
          test: /\.hbs$/,
          loader: 'handlebars-loader'
        }]
      },

      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            screw_ie8: true,
            warnings: false
          },
          output: {
            comments: false
          }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          BUILD_MODE: '<%= args.mode %>',
          VERSION: '<%= args.versionApp %>',
          TARGET: '<%= args.target %>',
          TARGET_OS: '<%= args.targetOS %>',
        })
      ]
    }
  };
};

module.exports = function(grunt) {
    'use strict';

    var webpack = require('webpack');
    var options = grunt.config.data;
    var path = require('path');

    return {
        dev: {
            cache: false,
            debug: true,
            devtool: 'source-map',

            // webpack options
            entry: './src/js/app/app.js',
            output: {
                devtoolLineToLine: true,
                path: "builds/web/dev/",
                filename: "<%=base.appName%>.js",
                pathinfo: true,
                sourceMapFilename: "<%=base.appName%>.js.map",
            },
            stats: {
                // Configure the console output
                colors: true,
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
                    test: /\.html$/,
                    loader: "underscore-template-loader"
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }, {
                    test: /\.png$/,
                    loader: "url-loader?limit=100000"
                }, {
                    test: /\.jpg$/,
                    loader: "file-loader"
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
                    $: "jquery",
                    jQuery: "jquery",
                    "window.jQuery": "jquery"
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
                path: "builds/web/prod/",
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
                    test: /\.html$/,
                    loader: "underscore-template-loader"
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }, {
                    test: /\.png$/,
                    loader: "url-loader?limit=100000"
                }, {
                    test: /\.jpg$/,
                    loader: "file-loader"
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

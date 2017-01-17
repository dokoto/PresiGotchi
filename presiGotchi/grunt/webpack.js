'use strict';

module.exports = function(grunt, options) {

    const webpack = require('webpack');
    const path = require('path');
    const ProgressBarPlugin = require('progress-bar-webpack-plugin');
    const chalk = require('chalk');

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
                filename: "<%=pkg.name%>.js",
                pathinfo: true,
                sourceMapFilename: "<%=pkg.name%>.js.map",
            },
            stats: {
                colors: true,
                modules: options.args.verbose,
                reasons: options.args.verbose,
                hash: options.args.verbose,
                version: options.args.verbose,
                timings: options.args.verbose,
                assets: options.args.verbose,
                chunks: options.args.verbose,
                children: options.args.verbose,
                source: options.args.verbose,
                errors: options.args.verbose,
                errorDetails: options.args.verbose,
                warnings: options.args.verbose,
                publicPath: options.args.verbose
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
                }),
                new ProgressBarPlugin({
                    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                    clear: false
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
                filename: "<%=pkg.name%>.js",
            },

            stats: {
                colors: true,
                modules: options.args.verbose,
                reasons: options.args.verbose,
                hash: options.args.verbose,
                version: options.args.verbose,
                timings: options.args.verbose,
                assets: options.args.verbose,
                chunks: options.args.verbose,
                children: options.args.verbose,
                source: options.args.verbose,
                errors: options.args.verbose,
                errorDetails: options.args.verbose,
                warnings: options.args.verbose,
                publicPath: options.args.verbose
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
                }),
                new ProgressBarPlugin({
                    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                    clear: false
                })
            ]
        }
    };
};

'use strict';

module.exports = function(grunt, options) {

    var build_android_full_dev = [
        'git-manager',
        'jshint',
        'mkdir:builds',
        'clean:web_builds',
        'copy:constants',
        'webpack:dev',
        'copy:single_html_page',
        'clean:bin_builds',
        'cordovacli:create',
        'cordova-settings',
        'cordovacli:add_platforms',
        'cordovacli:add_plugins',
        'copy:android_assets',
        'clean:bin_builds_www',
        'copy:compiled_sources',
        'cordovacli:build_android'
    ];

    var build_android_dev = [
        'jshint',
        'clean:web_builds',
        'copy:constants',
        'webpack:dev',
        'copy:single_html_page'
    ];

    var test_ios = [],
        build_ios_full_dev = [],
        build_android_prod = [],
        build_android_full_prod = [],
        build_ios_dev = [];

    function test(key) {
        if (key === 'ios') {
            return test_ios;
        }
    }

    function resolve(task, targetOS, mode) {
        if (targetOS === 'ios' && require('os').platform() === 'win32') {
            Log.error.v0('*** ONLY OSX IS ALLOWED TO BUILD IOS APPS ***');
            return null;
        }

        if ('build-full' === task) {
            if (mode === 'dev') {
                return (targetOS === 'ios') ? build_ios_full_dev : build_android_full_dev;
            } else if (mode === 'prod') {
                return (targetOS === 'ios') ? build_ios_full_dev : build_android_full_dev;
            }
        } else if ('build' === task) {
            if (mode === 'dev') {
                return (targetOS === 'ios') ? build_ios_dev : build_android_dev;
            } else if (mode === 'prod') {
                return (targetOS === 'ios') ? build_ios_dev : build_android_dev;
            }
        }

    }

    if (options && options.args && options.args.targetOS) {
        return {
            'default': ['help'],
            'build-full': resolve('build-full', options.args.targetOS, options.args.mode),
            'build': resolve('build', options.args.targetOS, options.args.mode),
        };
    } else {
        return {
            'default': ['help']
        };
    }
};

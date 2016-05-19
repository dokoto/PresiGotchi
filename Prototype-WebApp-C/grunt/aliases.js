module.exports = function(grunt, options) {
  'use strict';

  var build_android_full_dev = [
    'jshint',
    'clean:sources',
    'webpack:dev',
    'copy:sources_html'
  ];

  var build_android_dev = [
    'jshint',
    'clean:sources',
    'webpack:dev',
    'copy:sources_html'
  ];

  var build_android_full_prod = [
    'git-manager',
    'jshint',
    'clean:sources',
    'webpack:prod',
    'copy:sources_html'
  ];

  var build_android_prod = [
    'git-manager',
    'jshint',
    'clean:sources',
    'webpack:prod',
    'copy:sources_html'
  ];

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

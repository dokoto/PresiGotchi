module.exports = function(grunt, options) {
  'use strict';

  var build_android_full_dev = [
    'jshint',
    'webpack:dev'
  ];

  var build_android_dev = [
    'jshint',
    'webpack:dev'
  ];

  var build_android_full_prod = [
    'git-manager',
    'jshint',
    'webpack:prod'
  ];

  var build_android_prod = [
    'git-manager',
    'jshint',
    'webpack:prod'
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

  if (options && options.args.targetOS) {
    return {
      'default': ['help'],
      'build-full': resolve('build-full', options.targetOS, options.args.mode),
      'build': resolve('build', options.targetOS, options.args.mode),
    };
  } else {
    return {
      'default': ['help']
    };
  }
};

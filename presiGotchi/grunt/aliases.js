module.exports = function(grunt, options) {
  'use strict';

  var build_android_full = [
    'git-manager',
    'mkdir:src',
    'jshint'
  ];

  var build_android = [
    'git-manager',
    'jshint'
  ];
  

  function test(key) {
    if (key === 'ios') {
      return test_ios;
    }
  }

  function resolve(task, targetOS) {
    if ('build-full' === task) {
      if (targetOS === 'ios' && require('os').platform() === 'win32') {
        Log.error.v0('*** ONLY OSX IS ALLOWED TO BUILD IOS APPS ***');
        return null;
      }

      return (targetOS === 'ios') ? build_ios_full : build_android_full;
    }

    if ('build' === task) {
      return (targetOS === 'ios') ? build_ios : build_android;
    }

  }

  if (options && options.targetOS) {
    return {
      'default': ['help'],
      'build-full': resolve('build-full', options.targetOS),
      'build': resolve('build', options.targetOS),
    };
  } else {
    return {
      'default': ['help']
    };
  }
};

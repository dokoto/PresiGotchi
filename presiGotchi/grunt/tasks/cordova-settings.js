'use strict';

module.exports = function(grunt) {
    const path = require('path');
    const CordorvaConfTool = require('../utils/cordovaConfTool');

    let options = grunt.config.data;
    let origin = path.join(options.baseDir, 'builds/bin/', options.args.mode, options.base.appName, options.cordova.configXmlPath);
    let confTool = new CordorvaConfTool(grunt, origin, options.cordova.configXmlActions);
    grunt.registerTask('cordova-settings', confTool.run.bind(this));
};

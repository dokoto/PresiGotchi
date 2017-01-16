'use strict';

module.exports = function(grunt) {

    var options = grunt.config.data;
    grunt.registerTask('git-manager', function() {

        var sh = require('shelljs');
        var utilsShell = require('../utils/shell');
        var executeGitCmd = function(cmd, forceVerbose) {
            var execlog;

            execlog = utilsShell.execCmd(grunt, options, cmd, {
                asyncMode: false,
                forceVerbose: forceVerbose
            });
            grunt.file.setBase(options.baseDir);
            if (execlog.code !== 0) {
                grunt.fail.fatal(execlog.output);
            }
        };

        if (sh.which(options.git.cmd)) {
            var fs = require('fs');
            var path = require('path');

            try {
                var cmd;
                grunt.log.writeln('* Updating sources from git');
                grunt.log.writeln('==> Changin to path : ' + path.join(options.baseDir, options.git.destinationFolderName));
                grunt.file.setBase(path.join(options.baseDir, options.git.destinationFolderName));
                cmd = 'git pull';
                executeGitCmd(cmd, true);

            } catch (error) {
                grunt.file.setBase(options.baseDir);
                grunt.fail.fatal(error);
            }

        } else {
            grunt.fail.fatal('git command not found. Please install command-line git and try again.');
        }

    });

};

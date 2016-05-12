/*global module*/

module.exports = function(grunt, options) {
  grunt.registerTask('git-manager', function() {
    'use strict';

    var executeGitCmd = function(cmd, forceVerbose) {
      var hideCmdArgs = ' --username ' + options.proxy.user + ' --password ' + options.proxy.password;
      var execlog;

      execlog = utils.execCmd(grunt, options, cmd, {
        asyncMode: false,
        forceVerbose: forceVerbose,
        hideCmdArgs: hideCmdArgs
      });
      grunt.file.setBase(options.baseDir);
      if (execlog.code !== 0) {
        Log.error.v0(execlog.output);
      }
    };

    if (!sh.which(options.git.cmd) === false) {
      var fs = require('fs');
      var path = require('path');


      try {
        var cmd;
        Log.info.v0(path.join(options.git.destinationFolderName, options.git.configFile));
        if (fs.existsSync(path.join(options.git.destinationFolderName, options.git.configFile))) {
          Log.info.v0('* Updating sources from git');
          grunt.file.setBase(path.join(options.baseDir, options.git.destinationFolderName));
          cmd = 'git pull';
          execlog(cmd, true);
        } else {
          Log.info.v0('* Cloning sources from git  ');
          cmd = 'git clone ' + options.git.repoUrl + ' ' + options.git.destinationFolderName;
          execlog(cmd, false);
        }
      } catch (error) {
        grunt.file.setBase(options.baseDir);
        Log.error.v0(error);
      }
    } else {
      Log.error.v0('git command not found. Please install command-line git and try again.');
    }
  });

});

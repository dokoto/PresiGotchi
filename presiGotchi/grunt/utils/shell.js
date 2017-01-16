'use strict';

module.exports = {
    execCmd: function(grunt, options, cmd, flags) {
        var noVerbose = (options.logger === 1) ? false : true;
        var asyncMode, envVars, forceVerbose, hideCmdArgs;
        grunt.log.writeln(JSON.stringify(flags, null, 4));

        if (flags !== undefined) {
            asyncMode = (flags.asyncMode === undefined) ? false : flags.asyncMode;
            envVars = (flags.envVars === undefined) ? '' : flags.envVars;
            forceVerbose = (flags.forceVerbose === undefined) ? false : flags.forceVerbose;
            hideCmdArgs = (flags.hideCmdArgs === undefined) ? undefined : flags.hideCmdArgs;
        } else {
            asyncMode = false;
            envVars = '';
            forceVerbose = false;
        }
        if (forceVerbose === true) {
            noVerbose = false;
        }

        var sh = require('shelljs');
        if (envVars !== '') {
            grunt.log.writeln('==> $> ' + envVars);
        }
        grunt.log.writeln('==> $> ' + cmd);
        if (hideCmdArgs !== undefined) {
            cmd += ' ' + hideCmdArgs;
        }
        grunt.log.writeln('====> $> [DETAIL] ' + cmd);
        cmd = (envVars !== '') ? envVars + cmd : cmd;
        var execLog = sh.exec(cmd, {
            silent: noVerbose,
            async: asyncMode
        });

        return execLog;
    },

    execCmdAsync: function(grunt, options, cmd, execEnv) {
        var sh = require('shelljs');
        var ee = require('events');

        cmd = (execEnv !== undefined) ? execEnv + cmd : cmd;
        grunt.log.writeln('==> $> ' + cmd);
        var child = sh.exec(cmd, {
            async: true,
            silent: (options.logger === 1) ? false : true
        });

        var errorOutput = '';
        child.stderr.on('data', function(data) {
            errorOutput += data;
        });
        child.on('close', function(code) {
            if (code === 0) {
                ee.emit('complete', {
                    code: code,
                    output: child.output
                });
            } else {
                ee.emit('error', {
                    code: code,
                    output: errorOutput
                });
            }
        });

        return ee;

    }
};

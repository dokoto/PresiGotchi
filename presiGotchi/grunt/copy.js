'use strict';

module.exports = function(grunt, options) {

    return {
        single_html_page: {
            files: [{
                expand: true,
                cwd: '<%=git.destinationFolderName%>',
                src: ['*.html'],
                dest: 'builds/web/<%=args.mode%>/'
            }]
        },
        compiled_sources: {
            files: [{
                expand: true,
                cwd: 'builds/web/<%=args.mode%>/',
                src: ['**/*'],
                dest: 'builds/bin/<%=args.mode%>/<%=base.appName%>/www/'
            }]
        },
        android_assets: {
            files: [{
                expand: true,
                cwd: 'assets/<%=args.targetOS%>/icons/',
                src: ['**/*'],
                dest: 'builds/bin/<%=args.mode%>/<%=base.appName%>/platforms/<%=args.targetOS%>/res/'
            }]
        },
        constants: {
            files: [{
                expand: true,
                cwd: __dirname + '/config/',
                src: ['runtime_constants.json'],
                dest: 'src/js/app/config/'
            }],
            options: {
                process: function(content, srcpath) {
                    try {
                        const path = require('path');
                        let constsToModify = require(srcpath);
                        let builtConsts = {};
                        for (let key in constsToModify) {
                            if (options.args[key.toLowerCase()] !== undefined) {
                                builtConsts[key] = options.args[key.toLowerCase()];
                            } else {
                                builtConsts[key] = constsToModify[key];
                            }
                        }
                        for (let key in options.args) {
                            builtConsts[key] = options.args[key];
                        }
                        return JSON.stringify(builtConsts);
                    } catch (error) {
                        grunt.log.error(error);
                        return content;
                    }
                }
            }
        }
    };
};

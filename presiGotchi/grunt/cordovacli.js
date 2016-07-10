module.exports = function(grunt, options) {
    'use strict';

    return {
        options: {
            path: 'builds/bin/<%=args.mode%>/<%=base.appName%>',
            cli: 'cordova'
        },
        cordova: {
            options: {
                command: ['create', 'platform', 'plugin', 'build'],
                platforms: ['ios', 'android'],
                plugins: ['device', 'dialogs'],
                path: 'builds/bin/<%=args.mode%>/<%=base.appName%>',
                id: '<%=base.cordova.domain%>.<%=base.cordova.mainClassName%>',
                name: '<%=base.appName%>'
            }
        },
        create: {
            options: {
                command: 'create',
                id: '<%=base.cordova.domain%>.<%=base.cordova.mainClassName%>',
                name: '<%=base.appName%>'
            }
        },
        add_platforms: {
            options: {
                command: 'platform',
                action: 'add',
                platforms: ['android']
            }
        },
        build_ios: {
            options: {
                command: 'build',
                platforms: ['ios']
            }
        },
        build_android: {
            options: {
                command: 'build',
                platforms: ['android']
            }
        },
        emulate_android: {
            options: {
                command: 'emulate',
                platforms: ['android'],
                args: ['--target', 'Nexus5']
            }
        }
    };
};

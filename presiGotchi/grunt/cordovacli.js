'use strict';

module.exports = function(grunt, options) {

    return {
        options: {
            path: 'builds/bin/<%=args.mode%>/<%=pkg.name%>',
            cli: 'cordova'
        },
        cordova: {
            options: {
                command: ['create', 'platform', 'plugin', 'build'],
                platforms: ['ios', 'android'],
                plugins: ['device', 'dialogs'],
                path: 'builds/bin/<%=args.mode%>/<%=pkg.name%>',
                id: '<%=cordova.domain%>.<%=cordova.mainClassName%>',
                name: '<%=pkg.name%>'
            }
        },
        create: {
            options: {
                command: 'create',
                id: '<%=cordova.domain%>.<%=cordova.mainClassName%>',
                name: '<%=pkg.name%>'
            }
        },
        add_platforms: {
            options: {
                command: 'platform',
                action: 'add',
                platforms: ['android']
            }
        },
        add_plugins: {
            options: {
                command: 'plugin',
                action: 'add',
                plugins: [
                    'https://github.com/Telerik-Verified-Plugins/LocalNotification.git'
                ]
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

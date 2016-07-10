module.exports = function(grunt, options) {
    'use strict';

    return {
        web_builds: {
            src: ['builds/web/<%=args.mode%>/*']
        },
        bin_builds: {
            src: ['builds/bin/<%=args.mode%>/*']
        },
        bin_builds_www: {
            src: ['builds/bin/<%=args.mode%>/<%=base.appName%>/www/*']
        },
    };
};

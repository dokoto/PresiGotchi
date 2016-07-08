module.exports = function(grunt, options) {
    'use strict';

    return {
        web_builds: {
            src: ['builds/web/<%=args.mode%>/*']
        },
        bin_builds: {
            src: ['builds/bin/<%=args.mode%>/*']
        }
    };
};

module.exports = function (grunt, options) {
  'use strict';


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
      files:[{
          expand: true,
          cwd: 'builds/web/<%=args.mode%>/',
          src: ['*/*.*'],
          dest: 'builds/bin/<%=args.mode%>/<%=base.appName%>/www/'
      }]
  },
  android_assets: {
      files: [{
          expand: true,
          cwd: 'assets/<%=args.targetOS%>/icons/res/',
          src: ['*/*.*'],
          dest: 'builds/bin/<%=args.mode%>/<%=base.appName%>/platform/<%=args.targetOS%>/res/'
      }]
  }
  };
};

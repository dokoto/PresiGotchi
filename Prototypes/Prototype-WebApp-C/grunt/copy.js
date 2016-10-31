module.exports = function (grunt, options) {
  'use strict';


  return {
    sources_html: {
      files: [{
        expand: true,
        cwd: '<%=git.destinationFolderName%>',
        src: ['*.html'],
        dest: 'builds/dev/'
      }]
    }
  };
};

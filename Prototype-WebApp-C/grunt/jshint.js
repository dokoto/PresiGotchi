module.exports = {
  jshint: {
    options: {
      node: true,
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: false,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      // unused: true,
      boss: true,
      eqnull: true,
      globals: {
        // jQuery: true,
        require: true,
        define: true,
        location: true,
        document: true,
        requirejs: true,
        navigator: true
      }
    },
    gruntfile: {
      src: 'gruntfile.js'
    },
    files: {
      src: ['<%=git.destinationFolderName%>/js/app/**/*.js']
    }
  }
};

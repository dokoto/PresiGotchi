var exports = module.exports = {};

var path = require('path');
var utils = {
  misc: require('./utils/misc')
};


function Configurator(grunt, jsonConfigFile) {
  this.jsonConfigFile = jsonConfigFile;
  this.data = require(jsonConfigFile);
  this.grunt = grunt;
}

Configurator.prototype.explore = function(ptr, args) {
  if (args.length === 1) {
    if (ptr[args[0]] === undefined) {
      return {
        value: null,
        error: true,
        fieldError: args[0]
      };
    } else {
      return {
        value: ptr[args[0]],
        error: false,
        fieldError: null
      };
    }
  } else {
    if (ptr[args[0]] === undefined) {
      return {
        value: null,
        error: true,
        fieldError: args[0]
      };
    }
    var newPtr = ptr[args[0]];
    args = args.splice(1);
    return this.explore(newPtr, args);
  }
};

Configurator.prototype.fetch = function(args) {
  var params = args.slice(0);
  var result = this.explore(this.data, params);
  if (result.error === true) {
    var literal = '';
    for (var arg in args) {
      literal += '[' + args[arg] + ']';
    }
    console.error('Field: "' + result.fieldError + '" not found as : confEnv' + literal + '. Check your json config file "' + this.jsonConfigFile + '"');
    this.grunt.fail.fatal("FATAL ERROR");
  } else {
    return result.value;
  }
};

var doMap = {
  mkConf: function(grunt) {
    return {
      base: new Configurator(grunt, './config/conf_base.json'),
      git:  new Configurator(grunt, './config/conf_git.json'),
    };
  },

  global: function(grunt) {
    var data = {};
    global.Log = require('./utils/Logger').create(grunt, data);

    return data;
  },

  args: function(grunt, data) {
    var packageApp = grunt.file.readJSON('package.json');
    data.baseDir = process.cwd();
    data.pkg = packageApp;

    data.args = {};
    if (grunt.option('versionApp') === undefined) {
      grunt.fail.fatal('El parametro --versionApp es obliglatorio para el constructor');
    } else {
      data.args.versionApp = grunt.option('versionApp');
    }

    data.args.mode = (grunt.option('mode') || 'dev').toLowerCase();
    if (data.args.mode !== 'dev' && data.args.mode !== 'prod') {
      grunt.fail.fatal('El parametro --mode solo puede contener los valores "dev" o "prod"');
    }

    data.args.target = (grunt.option('target') || 'device');
    if (data.args.target !== 'device' && data.args.target !== 'emulator') {
      grunt.fail.fatal('El parametro --target solo puede contener los valores "device" o "emulator"');
    }

    if (grunt.option('os') === undefined) {
      grunt.fail.fatal('El parametro --os es obliglatorio para el constructor');
    } else {
      data.args.targetOS = (grunt.option('os') || 'android');
      if (data.args.targetOS !== 'android' && data.args.targetOS !== 'ios') {
        grunt.fail.fatal('El parametro --targetOS solo puede contener los valores "ios" o "android"');
      }
    }

    data.args.mocks = utils.misc.convBoolean(grunt.option, 'mocks', false);
    data.args.logger = grunt.option('logger') || 0;

    return data;
  },

  base: function(grunt, conf, data) {
    data.base = {};

    data.base.appName = conf.base.fetch(['appName']);
    data.base.proxy = conf.base.fetch(['proxy']);
    data.base.log = conf.base.fetch(['log']);
    data.base.keystore = conf.base.fetch(['keyStore']).path + (grunt.option('keystore') || 'default');
    data.base.buildFolder = conf.base.fetch(['buildFolder']);
    data.base.proyectFolderName = __dirname.substr(__dirname.lastIndexOf(path.sep) + 1);
    data.base.cordova = conf.base.fetch(['cordova']);

    return data;
  },

  git: function(grunt, conf, data) {
    data.git = conf.git.data;

    return data;
  },


};

function header(grunt, data) {
  grunt.log.writeln('**************************************************');
  grunt.log.writeln('Gotchi Constructor System... ' + data.pkg.version + 'v');
  grunt.log.writeln('**************************************************');
  grunt.log.writeln('OS Target         : ' + data.args.targetOS);
  grunt.log.writeln('Device Target     : ' + data.args.target);
  if (data.targetOS === 'android') {
    grunt.log.writeln('Keystore          : ' + data.base.keystore);
  }
  grunt.log.writeln('Project           : ' + data.base.proyectFolderName);
  grunt.log.writeln('App version       : ' + data.args.versionApp);
  grunt.log.writeln('Compilation Mode  : ' + data.args.mode);
  grunt.log.writeln('**************************************************');
}

function mainProcess(grunt, data) {
  // CONFIG FILES
  var conf = doMap.mkConf(grunt);

  // ARGUMENTS
  data = doMap.args(grunt, data);

  // BASE
  data = doMap.base(grunt, conf, data);

  // GIT
  data = doMap.git(grunt, conf, data);

  // Header
  header(grunt, data);

  return data;
}

exports.doMap = function(grunt) {

  // GLOBAL
  var data = doMap.global(grunt);
  if (process.argv.length === 2) {
    data.args = {};
    data.args.logger = grunt.option('logger') || 0;
  } else if (process.argv.length > 2) {
    data = mainProcess(grunt, data);
  }

  return data;
};

var Logger = (function() {
  'use strict';

  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;

  function _printCOLOR(func, message, color) {
    if (color !== undefined) {
      func(message[color]);
    } else {
      func(message);
    }
  }

  function _printTYPE(type, message, color) {
    switch (type) {
      case 'info':
        _printCOLOR(_self.grunt.log.writeln, message, color);
        break;
      case 'error':
        _printCOLOR(_self.grunt.fail.fatal, message, color);
        break;
    }
  }

  function _print(priority, type, message, color) {
    if (priority <= _self.options.logger) {
      _printTYPE(type, message, color);
    }
  }

  function _factory(typeMsg) {
    var funcs = {};
    for (var i = 0; i < _self.verboseDeep; i++) {
      funcs['v' + i] = function(i, typeMsg, message, color) {
        return _print(i, typeMsg, message, color);
      }.bind(_self, i, typeMsg);
    }
    return funcs;
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  function logger(verboseDeep, grunt, options) {
    _self = this;
    this.grunt = grunt;
    this.options = options;
    this.verboseDeep = verboseDeep;
    this.typeMsg = {
      ERROR: 'error',
      INFO: 'info'
    };
    this.info = _factory(this.typeMsg.INFO);
    this.error = _factory(this.typeMsg.ERROR);
  }

  logger.prototype.info = function() {
    return this.info;
  };

  logger.prototype.error = function() {
    return this.error;
  };

  return logger;

})();


module.exports = {
  VERBOSE_DEEP: 2,
  create: function(grunt, options) {
    return new Logger(this.VERBOSE_DEEP, grunt, options);
  }

};

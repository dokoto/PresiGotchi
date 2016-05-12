'use strict';

module.exports = {
  convBoolean: function(options, key, defaultValue) {
    if (typeof options(key) === 'boolean') {
      return options(key);
    } else {
      var stringBoolean = options(key);
      if (stringBoolean) {
        if (stringBoolean === 'true') {
          return true;
        } else if (stringBoolean === 'false') {
          return false;
        } else {
          return defaultValue;
        }
      } else {
        return defaultValue;
      }
    }
  }
};

var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');


module.exports = function() {
  return Marionette.AppRouter.extend({

    appRoutes: {
      '': 'initialize',
      'hello': 'hello'
    },

    initialize: function() {
    },

    hello: function() {
      var HelloView = require('./hello/hello_controller');
      HelloView.run();
    }

  });

};

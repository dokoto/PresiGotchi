var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');


module.exports = function() {
  return Backbone.Router.extend({

    routes: {
      '': 'initialize',
      'hello': 'hello'
    },

    initialize: function() {
    },

    hello: function() {
      var HelloView = require('./hello/hello');
      HelloView.show();
    },

    dashboard: function() {
      var helloView = new HelloView().render();

      $('#js-app').empty().append(helloView.$el);
    }

  });

};

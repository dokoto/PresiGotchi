var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var HelloView = require('./views/hello');


module.exports = function() {
  return Backbone.Router.extend({

    routes: {
      '': 'dashboard',
      'about': 'about'
    },

    initialize: function() {
      $('body').append('<div id="js-app"></div>');
    },

    dashboard: function() {
      var helloView = new HelloView().render();

      $('#js-app').empty().append(helloView.$el);
    },

    about: function() {
      var helloView = new HelloView({
        template: _.template('Im the about page')
      }).render();

      $('#js-app').empty().append(helloView.$el);
    }

  });

};

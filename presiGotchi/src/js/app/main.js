var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Router = require('./app_router');

var App = new Marionette.Application({
  onStart: function(options) {
    var router = new Router(options);

    /** Starts the URL handling framework */
    Backbone.history.start();
  }
});

App.start();

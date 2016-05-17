var Marionette = require('backbone.marionette');
var Controller = require('./app_controller');


var Router = Marionette.AppRouter.extend({
  initialize: function() {
    this.controller = new Controller();
  }
});

module.exports = Router;

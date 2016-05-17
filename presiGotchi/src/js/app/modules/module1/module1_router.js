var Marionette = require('backbone.marionette');
var Controller = require('./module1_controller');


var Router = Marionette.AppRouter.extend({
  initialize: function() {
    console.log('Module1 Router: initialize');
  }
});

module.exports = Router;

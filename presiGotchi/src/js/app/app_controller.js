var Marionette = require('backbone.marionette');

var Controller = Marionette.Object.extend({
  initialize: function() {
    console.log('Controller: initialize');
    var Controller = require('modules/module1/module1_controller');
    var module1Controller = new Controller();
    module1Controller.start();
  }
});


module.exports = Controller;

var Marionette = require('backbone.marionette');
var View = require('./module1_view');

var Controller = Marionette.Object.extend({
  initialize: function() {
    console.log('Module1 Controller: initialize');
  },
  start: function() {
    console.log('Module1 Controller: starting');
    var module1_view = new View({name: 'DOKOTOR KING OF METAL'});
    module1_view.render();
  }
});


module.exports = Controller;

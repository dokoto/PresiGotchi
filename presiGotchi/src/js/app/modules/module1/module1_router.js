var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    'module1/start': 'start'
  },
  
  start: function() {
    console.log('Router module1: start');
    var view = require('./module1_view').create();
    view.render();
  }
});

module.exports =  {
  create: function() {
    return new Router();
  }
};

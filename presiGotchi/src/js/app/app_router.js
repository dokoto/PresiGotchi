var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    'help': 'help',
    'start': 'start'
  },

  help: function() {
    console.log('Router App: start');
  },

  start: function() {
    console.log('Router App: start');
    var module1Router = require('modules/module1/module1_router').create();
    module1Router.navigate('module1/start', {trigger: true});
  }

});

module.exports =  {
  create: function() {
    return new Router();
  }
};

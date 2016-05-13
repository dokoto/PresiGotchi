var Backbone = require('backbone');
Backbone.Wreqr = require('backbone.wreqr');
var Marionette = require('backbone.marionette');
Marionette.$ = Backbone.$ = require('jquery');


var Router = require('./router_app');


var app = new Marionette.Application({
  onStart: function(options) {
    var router = new Router(options);
  }
});

app.start();

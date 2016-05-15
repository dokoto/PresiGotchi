
var Marionette = require('backbone.marionette');

var Router = require('./router_app');


var app = new Marionette.Application({
  onStart: function(options) {
    var router = new Router(options);
    
  }
});

app.start();

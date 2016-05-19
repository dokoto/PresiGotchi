var Backbone = require('backbone');
var appRouter = require('./app_router').create();

Backbone.history.start();
appRouter.navigate('start', {trigger: true});

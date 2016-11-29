'use strict';

require("./css/reset.min.css");
require("./css/index.css");

const Backbone = require('backbone');
const appRouter = require('./app_router').create();

Backbone.history.start();
appRouter.navigate('start', {
    trigger: true
});

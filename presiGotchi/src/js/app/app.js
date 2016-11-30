'use strict';

require("./css/reset.min.css");
require("./css/index.css");
const Backbone = require('backbone');

Backbone.history.start();
let Router = require('./app_router');
new Router().navigate('start', {
    trigger: true
});

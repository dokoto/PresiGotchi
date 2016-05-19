/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

require("../../css/reset.min.css");
require("../../css/index.css");
require("../../css/android_toast.min.css");

var Backbone = require('backbone');
var appRouter = require('./app_router').create();

Backbone.history.start();
appRouter.navigate('start', {
    trigger: true
});

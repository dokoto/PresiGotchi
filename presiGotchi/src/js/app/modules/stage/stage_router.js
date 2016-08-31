/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');

var Router = Backbone.Router.extend({
    routes: {
        'stage/engine/start': 'start',
    },

    start: function() {
        Log.MSG('[TREPI-ENGINE] Starting');
        require("./css/stage-base.css");
        var controller = require('./stage_controller.js').create();
        controller.run();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

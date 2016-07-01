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
        Log.MSG_DESP('[TREPI-ENGINE] Starting');
        require("./css/engine-base.css");
        var controller = require('./stage_constroler.js').create();
        controller.run();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

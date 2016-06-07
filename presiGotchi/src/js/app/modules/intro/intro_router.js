/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');

var Router = Backbone.Router.extend({
    routes: {
        'intro/start': 'start'
    },

    start: function() {
        Log.MSG_DESP('[INTRO ROUTER] Starting');
        require("./css/intro.css");
        var controller = require('./intro_controller').create();        
        controller.show();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

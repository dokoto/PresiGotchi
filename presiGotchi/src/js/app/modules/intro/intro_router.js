/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');
//var Pmsg = require('utils/pmsg').create();

var Router = Backbone.Router.extend({
    routes: {
        'intro/start': 'start'
    },

    start: function() {
        Log.MSG_DESP('[INTRO ROUTER] Starting');
        require("../../../../css/intro.css");
        /*Pmsg.show({
            content: 'TEST TOAST MESSAGE',
            duration: 9 * 1000
        });*/
        var controller = require('./intro_controller').create();
        controller.fetch();
        controller.show();        
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

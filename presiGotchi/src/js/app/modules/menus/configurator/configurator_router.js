/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');

var Router = Backbone.Router.extend({
    routes: {
        'menus/configurator/start': 'start',
        'menus/configurator/menu': 'configuratorMenu'
    },

    start: function() {
        Log.MSG_DESP('[CONFIGURATOR ROUTER] Starting');
        require("./css/configurator.css");
        this.configuratorMenu();
    },
    configuratorMenu: function() {
      var controller = require('./configurator_controller').create();
      controller.run();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

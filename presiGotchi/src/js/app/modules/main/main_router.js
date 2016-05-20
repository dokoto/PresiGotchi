/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');

var Router = Backbone.Router.extend({
    routes: {
        'main/start': 'start',
        'main/menu': 'mainMenu'
    },

    start: function() {
        Log.MSG_DESP('[MAIN ROUTER] Starting');
        require("../../../../css/intro.css");
        Router.mainMenu();
    },
    mainMenu: function() {
      var controller = require('./main_controller').create();
      controller.showMainMenu();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');

var Router = Backbone.Router.extend({
    routes: {
        'menus/main/start': 'start',
        'menus/main/menu': 'mainMenu'
    },

    start: function() {
        Log.MSG_DESP('[MAIN ROUTER] Starting');
        require("./css/main.css");
        this.mainMenu();
    },
    mainMenu: function() {
      var controller = require('./main_controller').create();
      controller.show();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

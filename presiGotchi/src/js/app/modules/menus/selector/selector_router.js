/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');

var Router = Backbone.Router.extend({
    routes: {
        'menus/selector/start': 'start',
        'menus/selector/menu': 'selectorMenu'
    },

    start: function() {
        Log.MSG_DESP('[SELECTOR ROUTER] Starting');
        require("./css/selector.css");
        this.selectorMenu();
    },
    selectorMenu: function() {
      var controller = require('./selector_controller').create();
      controller.show();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

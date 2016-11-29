'use strict';

const Backbone = require('backbone');
const Log = require('utils/logger');

let Router = Backbone.Router.extend({
    routes: {
        'menus/selector/start': 'start',
        'menus/selector/menu': 'selectorMenu'
    },

    start: function() {
        console.log('[SELECTOR ROUTER] Starting');
        require("./css/selector.css");
        this.selectorMenu();
    },
    selectorMenu: function() {
      let controller = require('./selector_controller').create();
      controller.show();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

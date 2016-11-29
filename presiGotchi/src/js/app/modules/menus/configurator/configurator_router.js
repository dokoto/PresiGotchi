'use strict';

const Backbone = require('backbone');
const Log = require('utils/logger');

let Router = Backbone.Router.extend({
    routes: {
        'menus/configurator/start': 'start',
        'menus/configurator/menu': 'configuratorMenu'
    },

    start: function() {
        console.log('[CONFIGURATOR ROUTER] Starting');
        require("./css/configurator.css");
        this.configuratorMenu();
    },
    configuratorMenu: function() {
      let controller = require('./configurator_controller').create();
      controller.run();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

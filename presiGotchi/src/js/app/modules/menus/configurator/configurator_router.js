'use strict';

const Backbone = require('backbone');
const Controller = require('./configurator_controller');

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
        new Controller().run();
    }

});

module.exports = Router;

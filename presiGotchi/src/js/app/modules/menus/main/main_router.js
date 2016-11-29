'use strict';

const Backbone = require('backbone');
const Log = require('utils/logger');

let Router = Backbone.Router.extend({
    routes: {
        'menus/main/start': 'start',
        'menus/main/menu': 'mainMenu'
    },

    start: function() {
        console.log('[MAIN ROUTER] Starting');
        require("./css/main.css");
        this.mainMenu();
    },
    mainMenu: function() {
        let controller = require('./main_controller').create();
        controller.show();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

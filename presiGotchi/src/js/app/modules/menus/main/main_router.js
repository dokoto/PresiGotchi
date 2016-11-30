'use strict';

const Backbone = require('backbone');
const Controller = require('./main_controller');

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
        new Controller().show();
    }

});

module.exports = Router;

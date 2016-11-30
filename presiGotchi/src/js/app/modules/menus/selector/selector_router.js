'use strict';

const Backbone = require('backbone');
const Controller = require('./selector_controller');

let Router = Backbone.Router.extend({
    routes: {
        'menus/selector/start': 'start',
        'menus/selector/menu': 'selectorMenu'
    },

    start: function() {
        console.log('[SELECTOR ROUTER] Starting');
        require("./css/selector.css");
        this._selectorMenu();
    },

    _selectorMenu: function() {
        new Controller().show();
    }

});

module.exports = Router;

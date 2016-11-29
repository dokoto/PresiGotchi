'use strict';

const Backbone = require('backbone');
const Log = require('utils/logger');

let Router = Backbone.Router.extend({
    routes: {
        'intro/start': 'start'
    },

    start: function() {
        console.log('[INTRO ROUTER] Starting');
        require("./css/intro.css");
        var controller = require('./intro_controller').create();
        controller.run();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

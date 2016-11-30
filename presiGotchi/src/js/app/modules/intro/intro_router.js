'use strict';

const Backbone = require('backbone');
const Controller = require('./intro_controller');

let Router = Backbone.Router.extend({
    routes: {
        'intro/start': 'start'
    },

    start: function() {
        console.log('[INTRO ROUTER] Starting');
        require("./css/intro.css");
        new Controller().run();
    }

});

module.exports = Router;

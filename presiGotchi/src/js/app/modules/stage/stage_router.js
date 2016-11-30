'use strict';

const Backbone = require('backbone');

let Router = Backbone.Router.extend({
    routes: {
        'stage/engine/start': 'start',
    },

    start: function() {
        console.log('[TREPI-ENGINE] Starting');
        require("./css/stage-base.css");
        let Controller = require('./stage_controller.js');
        new Controller().run();
    }

});

module.exports = Router;

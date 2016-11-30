'use strict';

const Backbone = require('backbone');
const Controller = require('./stage_controller.js');

let Router = Backbone.Router.extend({
    routes: {
        'stage/engine/start': 'start',
    },

    start: function() {
        console.log('[TREPI-ENGINE] Starting');
        require("./css/stage-base.css");
        new Controller().run();
    }

});

module.exports = Router;

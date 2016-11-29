'use strict';

const Backbone = require('backbone');
const Log = require('utils/logger');

let Router = Backbone.Router.extend({
    routes: {
        'stage/engine/start': 'start',
    },

    start: function() {
        console.log('[TREPI-ENGINE] Starting');
        require("./css/stage-base.css");
        let controller = require('./stage_controller.js').create();
        controller.run();
    }

});

module.exports = {
    create: function() {
        return new Router();
    }
};

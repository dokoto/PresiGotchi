'use strict';

const Backbone = require('backbone');
const Popup = require('utils/popup');

let Router = Backbone.Router.extend({
    routes: {
        'help': 'help',
        'start': 'start'
    },

    help: function() {
        console.log('[APP ROUTER] Gotchi Help');
    },

    start: function() {
        console.log('%c=== GOTCHI ENGINE ===', 'font-weight: bold;font-family: "Century Gothic", CenturyGothic, "AppleGothic", sans-serif; font-size: 54px; background-color:#f16251; color: #ffcc33;text-align: center; padding-right:20px; padding-left:20px; padding-top:2px;');
        window.APP = {};
        APP.popup = new Popup();
        APP.Gotchi = {};
        APP.consts = require('json!config/constants.json');
        let Intro = require('modules/intro/intro_router');
        new Intro().navigate('intro/start', {
            trigger: true
        });
    }

});

module.exports = Router;

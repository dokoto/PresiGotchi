'use strict';

const Backbone = require('backbone');
const Log = require('utils/logger.js');

var Router = Backbone.Router.extend({
  routes: {
    'help': 'help',
    'start': 'start'
  },

  help: function() {
    console.log('[APP ROUTER] Gotchi Help');
  },

  start: function() {
    console.log('%c=== GOTCHI ENGINE ===', 'font-weight: bold;font-family: "Century Gothic", CenturyGothic, "AppleGothic", sans-serif; font-size: 54px; background-color:#f16251; color: #ffcc33;text-align: center; padding-right:20px; padding-left:20px; padding-top:2px;');
    let intro = require('modules/intro/intro_router').create();
    intro.navigate('intro/start', {trigger: true});
  }

});

module.exports =  {
  create: function() {
    return new Router();
  }
};

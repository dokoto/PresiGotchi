/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger.js');

var Router = Backbone.Router.extend({
  routes: {
    'help': 'help',
    'start': 'start'
  },

  help: function() {
    Log.MSG_DESP('[APP ROUTER] Gotchi Help');
  },

  start: function() {
    Log.APP_TITLE('=== GOTCHI ENGINE ===');
    Log.MSG_DESP('[APP ROUTER] Starting');
    var intro = require('modules/intro/intro_router').create();
    intro.navigate('intro/start', {trigger: true});
  }

});

module.exports =  {
  create: function() {
    return new Router();
  }
};

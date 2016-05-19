/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');
//var Pmsg = require('utils/pmsg').create();

var Router = Backbone.Router.extend({
  routes: {
    'intro/start': 'start'
  },

  start: function() {
    Log.MSG_DESP('[INTRO ROUTER] Starting');
    /*Pmsg.show({
        content: 'TEST TOAST MESSAGE',
        duration: 9 * 1000
    });*/
    var controller = require('./intro_controller').create();
    controller.fetch();
    var view = require('./intro_view').create();
    view.render();
  }

});

module.exports =  {
  create: function() {
    return new Router();
  }
};

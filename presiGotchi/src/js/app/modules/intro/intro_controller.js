/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var baseParams = require('json!../../config/baseParams.json');

function Controller(options) {
  window.Gotchi = window.Gotchi || {};
}

Controller.prototype.fetch = function() {
  var gotchiCollection = require('models/gotchiCollection').create();
  gotchiCollection.on('sync', this._completeHandler, this, gotchiCollection);
  gotchiCollection.on('error', this._errorHandler, this, gotchiCollection);
  gotchiCollection.fetch({data: {
    email: baseParams.email
  }});
};

Controller.prototype.show = function() {
  var view = require('./intro_view').create();
  view.render();
  view.on('intro:gotomain', this._gotomainHandler, this);
};

Controller.prototype._gotomainHandler = function() {
  var main = require('modules/main/main_router').create();
  main.navigate('main/start', {trigger: true});
};

Controller.prototype._completeHandler = function(gotchiCollection) {
  Log.MSG_DESP('[INTRO CONTROLLER] Successful synchronized gotchi collection with ddbb. ' + gotchiCollection.lenth + ' Items requested.');
  Gotchi.gotchiCollection = gotchiCollection;
};

Controller.prototype._errorHandler = function(error) {
  Log.ERROR_DESP(error);
};


module.exports =  {
  create: function(options) {
    return new Controller(options);
  }
};

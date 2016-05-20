/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var gotchiCollection = require('models/gotchiCollection').create();
var baseParams = require('json!../../config/baseParams.json');

function Controller() {
  window.Gotchi = window.Gotchi || {};
}

Controller.prototype.fetch = function() {
  gotchiCollection.on('sync', this._completeHandler, this);
  gotchiCollection.on('error', this._errorHandler, this);
  gotchiCollection.fetch({data: {
    email: baseParams.email
  }});
};

Controller.prototype._completeHandler = function() {
  Log.MSG_DESP('[INTRO CONTROLLER] Successful synchronized gotchi collection with ddbb. ' + gotchiCollection.lenth + ' Items requested.');
  Gotchi.gotchiCollection = gotchiCollection;
};

Controller.prototype._errorHandler = function(error) {
  Log.ERROR_DESP(error);
};


module.exports =  {
  create: function() {
    return new Controller();
  }
};

/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var gotchiCollection = require('models/gotchiCollection').create();

function Controller() {
  window.Gotchi = window.Gotchi || {};
}

Controller.prototype.fetch = function() {
  var evetnHandler = gotchiCollection.fetch();
  evetnHandler.on('sync', this._completeHandler, this);
  evetnHandler.on('error', this._errorHandler, this);
};

Controller._completeHandler = function() {
  Gotchi.gotchiCollection = gotchiCollection;
};

Controller._errorHandler = function(error) {
  Log.ERROR_DESP(error);
};


module.exports =  {
  create: function() {
    return new Controller();
  }
};

/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var baseParams = require('json!config/baseParams.json');

function Controller(options) {
    window.Gotchi = window.Gotchi || {};
    Gotchi.collections = {};
}



Controller.prototype.loadPool = [
    function() {
        var gotchiCollection = require('models/gotchiCollection').create();
        Gotchi.collections.gotchi = {};
        gotchiCollection.on('sync', this._completeHandler, this, gotchiCollection, Gotchi.collections.gotchi);
        gotchiCollection.on('error', this._errorHandler, this, gotchiCollection);
        gotchiCollection.fetch({
            data: {
                email: baseParams.email
            }
        });
    },

    function() {
        var menusCollection = require('models/menuCollection').create();
        Gotchi.collections.menus = {};
        menusCollection.on('sync', this._completeHandler, this, menusCollection, Gotchi.collections.menus);
        menusCollection.on('error', this._errorHandler, this, menusCollection);
        menusCollection.fetch({
            data: {
                lang: 'ES'
            }
        });
    },

    function() {
        var configuratorCollection = require('models/configuratorCollection').create();
        Gotchi.collections.configurator = {};
        configuratorCollection.on('sync', this._completeHandler, this, configuratorCollection, Gotchi.collections.configurator);
        configuratorCollection.on('error', this._errorHandler, this, configuratorCollection);
        configuratorCollection.fetch();
    },

    function() {
        var quotesCollection = require('models/quotesCollection').create();
        Gotchi.collections.quotes = {};
        quotesCollection.on('sync', this._completeHandler, this, quotesCollection, Gotchi.collections.quotes);
        quotesCollection.on('error', this._errorHandler, this, quotesCollection);
        quotesCollection.fetch();
    }
];

Controller.prototype.fetch = function() {
    this.loadPoll.forEach(function(func) {
        func();
    });
};

Controller.prototype.show = function() {
    var view = require('./intro_view').create();
    view.render();
    view.on('intro:gotomain', this._gotomainHandler, this);
};

Controller.prototype._gotomainHandler = function() {
    var main = require('modules/menus/main/main_router').create();
    main.navigate('menus/main/start', {
        trigger: true
    });
};

Controller.prototype._completeHandler = function(collection, globalScope) {
    Log.MSG_DESP('[INTRO CONTROLLER] Successful synchronized collection with ddbb. ' + collection.length + ' Items requested.');
    globalScope = collection;
};

Controller.prototype._errorHandler = function(error) {
    Log.ERROR_DESP(error);
};


module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

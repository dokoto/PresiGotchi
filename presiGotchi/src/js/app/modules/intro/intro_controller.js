/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var baseParams = require('json!config/baseParams.json');
var _ = require('underscore');
var Backbone = require('backbone');

function Controller(options) {
    window.Gotchi = window.Gotchi || {};
    Gotchi.collections = {};
    this.emiter = {};
    _.extend(this.emiter, Backbone.Events);
}

Controller.prototype.loadPool = [
    function() {
        var gotchiCollection = require('models/gotchiCollection').create();
        Gotchi.collections.gotchi = {};
        gotchiCollection.on('sync', this._completeHandler.bind(this, gotchiCollection, Gotchi.collections.gotchi, 'Gotchi'));
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
        menusCollection.on('sync', this._completeHandler.bind(this, menusCollection, Gotchi.collections.menus, 'Menus'));
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
        configuratorCollection.on('sync', this._completeHandler.bind(this, configuratorCollection, Gotchi.collections.configurator, 'Configurator'));
        configuratorCollection.on('error', this._errorHandler, this, configuratorCollection);
        configuratorCollection.fetch();
    },

    function() {
        var quotesCollection = require('models/quotesCollection').create();
        Gotchi.collections.quotes = {};
        quotesCollection.on('sync', this._completeHandler.bind(this, quotesCollection, Gotchi.collections.quotes, 'Quotes'));
        quotesCollection.on('error', this._errorHandler, this, quotesCollection);
        quotesCollection.fetch();
    }
];

Controller.prototype.resourceLoader = function() {

    this.loadPool.forEach(function(func, index, array) {
        func.call(this);
        this.emiter.trigger('on-process-pool', index, array.length);
        if (index === array.length - 1) {
            this.emiter.trigger('complete-pool');
        }
    }, this);

};

Controller.prototype.loadResources = function() {
    this.emiter.once('complete-pool', function() {
        $('#intro-progress').hide();
        $('#intro-menu').show();
        $('#intro-container').data('enable-click', 'true');
    }, this);

    this.emiter.on('on-process-pool', function(current, total) {
        this.progress(current, total);
    }, this);

    this.resourceLoader();
};

Controller.prototype.progress = function(current, total) {
    var progress = ((current + 1) * 100) / total;
    $('#intro-progress').text('Loading ....... ' + progress + '%');
};

Controller.prototype.show = function() {
    var view = require('./intro_view').create();
    view.once('intro:gotomain', this._gotomainHandler, this);
    view.once('intro:render:finish', function() {
        this.loadResources();
    }, this);

    view.render();
};

Controller.prototype._gotomainHandler = function() {
    var main = require('modules/menus/main/main_router').create();
    main.navigate('menus/main/start', {
        trigger: true
    });
};

Controller.prototype._completeHandler = function(collection, globalScope, text) {
    Log.MSG_DESP('[INTRO CONTROLLER] Successful synchronized collection ' + text + ' with backend. ' + collection.length + ' Items requested.');
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

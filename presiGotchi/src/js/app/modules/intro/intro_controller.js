/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var baseParams = require('json!config/baseParams.json');
var _ = require('underscore');
var Backbone = require('backbone');
var pmsg = require('utils/pmsg').create();
var misc = require('utils/misc');

function Controller(options) {
    if (!window.Gotchi || Object.keys(window.Gotchi.collections).length === 0) {
        window.Gotchi = window.Gotchi || {};
        Gotchi.collections = {};
    }
    this.emiter = {};
    _.extend(this.emiter, Backbone.Events);
}

Controller.prototype.loadPool = [
    function(index, total) {
        var gotchiCollection = require('models/gotchiCollection').create();
        Gotchi.collections.gotchi = {};
        gotchiCollection.on('sync', this._completeHandlerConfig.bind(this, gotchiCollection.uuid, 'gotchi', index, total));
        gotchiCollection.on('error', this._errorHandler, this);
        gotchiCollection.fetch({
            data: {
                email: baseParams.email
            }
        });
    },

    function(index, total) {
        var menusCollection = require('models/menuCollection').create();
        Gotchi.collections.menus = {};
        menusCollection.on('sync', this._completeHandlerConfig.bind(this, menusCollection.uuid, 'menus', index, total));
        menusCollection.on('error', this._errorHandler, this);
        menusCollection.fetch({
            data: {
                lang: 'ES'
            }
        });
    },

    function(index, total) {
        var configuratorCollection = require('models/configuratorCollection').create();
        Gotchi.collections.configurator = {};
        configuratorCollection.on('sync', this._completeHandlerConfig.bind(this, configuratorCollection.uuid, 'configurator', index, total));
        configuratorCollection.on('error', this._errorHandler, this);
        configuratorCollection.fetch();
    },

    function(index, total) {
        var quotesCollection = require('models/quotesCollection').create();
        Gotchi.collections.quotes = {};
        quotesCollection.on('sync', this._completeHandlerConfig.bind(this, quotesCollection.uuid, 'quotes', index, total));
        quotesCollection.on('error', this._errorHandler, this);
        quotesCollection.fetch();
    },

    function(index, total) {
        var thumbs = Gotchi.collections.configurator.getAllThumbs();
        var preloadManager = misc.preLoadImgs(thumbs);
        preloadManager.once('complete', this._completeHandlerImages.bind(this, 'images', index, total));
    }
];

Controller.prototype.loadResources = function() {
    this.emiter.once('complete-pool', function() {
        $('#intro-progress').hide();
        $('#intro-menu').show();
        $('#intro-container').data('enable-click', 'true');
    }, this);

    this.emiter.on('on-processed-resource', function(index, total) {
        this.progress(index, total);
        this.loadPool[index].call(this, index, total);
    }, this);

    this.loadPool[0].call(this, 0, this.loadPool.length);
};

Controller.prototype.progress = function(current, total) {
    var progress = ((current + 1) * 100) / total;
    $('#intro-progress').text('Cargando ....... ' + progress + '%');
};

Controller.prototype.run = function() {
    var view = require('./intro_view').create();
    view.once('intro:gotomain', this._gotomainHandler, this);
    view.once('intro:render:finish', function() {
        if (Object.keys(Gotchi.collections).length === 0) {
            this.loadResources();
        } else {
            $('#intro-progress').hide();
            $('#intro-menu').show();
            $('#intro-container').data('enable-click', 'true');
        }
    }, this);

    view.render();
};

Controller.prototype._gotomainHandler = function() {
    var main = require('modules/menus/main/main_router').create();
    main.navigate('menus/main/start', {
        trigger: true
    });
};

Controller.prototype._completeHandlerConfig = function(uuid, collectionName, index, total, model, errors, options) {
    Log.MSG_DESP('[INTRO CONTROLLER] Successful synchronized collection ' + collectionName + ' id: ' + uuid + ' with backend. ' + model.length + ' Items requested.');
    Gotchi.collections[collectionName] = model;
    if (index < total - 1) {
        this.emiter.trigger('on-processed-resource', index + 1, total);
    } else if (index === total - 1) {
        this.emiter.trigger('complete-pool');
    }
};

Controller.prototype._completeHandlerImages = function(name, index, total) {
    Log.MSG_DESP('[INTRO CONTROLLER] Successful preloaded ' + name + ' Items requested.');
    if (index < total - 1) {
        this.emiter.trigger('on-processed-resource', index + 1, total);
    } else if (index === total - 1) {
        this.emiter.trigger('complete-pool');
    }
};

Controller.prototype._errorHandler = function(model, response, options) {
    Log.ERROR_DESP('[INTRO CONTROLLER] Error synchroning collection ' + model.uuid + ' Msg: ' + options.textStatus);
    pmsg.show({
        content: 'Error de conexion :(',
        type: 'error'
    });
};


module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var baseParams = require('json!config/baseParams.json');
var misc = require('utils/misc');

module.exports = [
    function(index, total) {
        var configuratorCollection = require('models/configuratorCollection').create();
        Gotchi.collections.configurator = {};
        configuratorCollection.on('sync', this._completeHandlerConfig.bind(this, configuratorCollection.uuid, 'configurator', index, total));
        configuratorCollection.on('error', this._errorHandler, this);
        configuratorCollection.fetch();
    },

    function(index, total) {
        var thumbs = Gotchi.collections.configurator.getAllThumbs();
        var preloadManager = misc.preLoadImgs(thumbs);
        preloadManager.once('complete', this._completeHandlerImages.bind(this, 'images', index, total));
    },

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
        var quotesCollection = require('models/quotesCollection').create();
        Gotchi.collections.quotes = {};
        quotesCollection.on('sync', this._completeHandlerConfig.bind(this, quotesCollection.uuid, 'quotes', index, total));
        quotesCollection.on('error', this._errorHandler, this);
        quotesCollection.fetch();
    },

    function(index, total) {
        var quoteProcessor = require('./quoteProcessor').create();
        quoteProcessor.process(Gotchi.collections.quotes);
        quoteProcessor.emiter.on('finish-all-quotes', this._completeHandler.bind(this, 'quotes-processor', index, total));
        quoteProcessor.emiter.on('error', this._errorHandler, this);
    }

];

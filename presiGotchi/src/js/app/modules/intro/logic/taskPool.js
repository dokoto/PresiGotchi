'use strict';

const baseParams = require('json!config/baseParams.json');
const misc = require('utils/misc');

module.exports = [
    function(index, total) {
        let configuratorCollection = require('models/configuratorCollection').create();
        window.Gotchi.collections.configurator = {};
        configuratorCollection.on('sync', this._completeHandlerConfig.bind(this, configuratorCollection.uuid, 'configurator', index, total));
        configuratorCollection.on('error', this._errorHandler, this);
        configuratorCollection.fetch();
    },

    function(index, total) {
        let thumbs = window.Gotchi.collections.configurator.getAllThumbs();
        let preloadManager = misc.preLoadImgs(thumbs);
        preloadManager.once('complete', this._completeHandlerImages.bind(this, 'images', index, total));
    },

    function(index, total) {
        let gotchiCollection = require('models/gotchiCollection').create();
        window.Gotchi.collections.gotchi = {};
        gotchiCollection.on('sync', this._completeHandlerConfig.bind(this, gotchiCollection.uuid, 'gotchi', index, total));
        gotchiCollection.on('error', this._errorHandler, this);
        gotchiCollection.fetch({
            data: {
                email: baseParams.email
            }
        });
    },

    function(index, total) {
        let menusCollection = require('models/menuCollection').create();
        window.Gotchi.collections.menus = {};
        menusCollection.on('sync', this._completeHandlerConfig.bind(this, menusCollection.uuid, 'menus', index, total));
        menusCollection.on('error', this._errorHandler, this);
        menusCollection.fetch({
            data: {
                lang: 'ES'
            }
        });
    },

    function(index, total) {
        let quotesCollection = require('models/quotesCollection').create();
        window.Gotchi.collections.quotes = {};
        quotesCollection.on('sync', this._completeHandlerConfig.bind(this, quotesCollection.uuid, 'quotes', index, total));
        quotesCollection.on('error', this._errorHandler, this);
        quotesCollection.fetch();
    }

];

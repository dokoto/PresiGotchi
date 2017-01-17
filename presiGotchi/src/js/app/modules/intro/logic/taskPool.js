'use strict';

const misc = require('utils/misc');
const ConfiguratorCollection = require('models/configuratorCollection');
const GotchiCollection = require('models/gotchiCollection');
const MenusCollection = require('models/menuCollection');
const QuotesCollection = require('models/quotesCollection');

module.exports = [
    function(index, total) {
        let configuratorCollection = new ConfiguratorCollection();
        APP.Gotchi.configurator = {};
        configuratorCollection.on('sync', this._completeHandlerConfig.bind(this, configuratorCollection.uuid, 'configurator', index, total));
        configuratorCollection.on('error', this._errorHandler, this);
        configuratorCollection.fetch();
    },

    function(index, total) {
        let thumbs = APP.Gotchi.configurator.getAllThumbs();
        let preloadManager = misc.preLoadImgs(thumbs);
        preloadManager.once('complete', this._completeHandlerImages.bind(this, 'images', index, total));
    },

    function(index, total) {
        let gotchiCollection = new GotchiCollection();
        APP.Gotchi.gotchi = {};
        gotchiCollection.on('sync', this._completeHandlerConfig.bind(this, gotchiCollection.uuid, 'gotchi', index, total));
        gotchiCollection.on('error', this._errorHandler, this);
        gotchiCollection.fetch({
            data: {
                email: APP.consts.EMAIL
            }
        });
    },

    function(index, total) {
        let menusCollection = new MenusCollection();
        APP.Gotchi.menus = {};
        menusCollection.on('sync', this._completeHandlerConfig.bind(this, menusCollection.uuid, 'menus', index, total));
        menusCollection.on('error', this._errorHandler, this);
        menusCollection.fetch({
            data: {
                lang: 'ES'
            }
        });
    },

    function(index, total) {
        let quotesCollection = new QuotesCollection();
        APP.Gotchi.quotes = {};
        quotesCollection.on('sync', this._completeHandlerConfig.bind(this, quotesCollection.uuid, 'quotes', index, total));
        quotesCollection.on('error', this._errorHandler, this);
        quotesCollection.fetch();
    }

];

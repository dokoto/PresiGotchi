/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');

function Controller(options) {}

Controller.prototype._fetch = function() {
    var menusCollection = require('models/menuCollection').create();
    menusCollection.on('sync', this._completeHandler, this, menusCollection);
    menusCollection.on('error', this._errorHandler, this, menusCollection);
    menusCollection.fetch({
        data: {
            lang: 'ES'
        }
    });
};

Controller.prototype._completeHandler = function(menusCollection) {
    Log.MSG_DESP('[MAIN CONTROLLER] Successful synchronized Menus collection with ddbb. ' + menusCollection.length + ' Items requested.');
    Gotchi.menusCollection = menusCollection;
    var view = require('./main_menu_view').create({
        'viewOptions': {
            'model': menusCollection.findWhere({
                name: 'main'
            })
        }
    });
    view.render();
};

Controller.prototype._errorHandler = function(error) {
    Log.ERROR_DESP(error);
};

Controller.prototype.show = function() {
    this._fetch();
};


module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

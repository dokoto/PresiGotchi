/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');
var Backbone = require('backbone');
var pmsg = require('utils/pmsg').create();

function Controller(options) {
    if (!window.Gotchi || Object.keys(window.Gotchi.collections).length === 0) {
        window.Gotchi = window.Gotchi || {};
        Gotchi.collections = {};
    }
    this.emiter = {};
    this.loadPool = require('./logic/taskPool');
    _.extend(this.emiter, Backbone.Events);
}

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
    var progress = ((current) * 100) / total;
    $('#intro-progress').text('Cargando ' + progress.toFixed(2) + '%');
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
    Log.MSG('[INTRO CONTROLLER] Successful synchronized collection ' + collectionName + ' id: ' + uuid + ' with backend. ' + model.length + ' Items requested.');
    Gotchi.collections[collectionName] = model;
    if (index < total - 1) {
        this.emiter.trigger('on-processed-resource', index + 1, total);
    } else if (index === total - 1) {
        this.emiter.trigger('complete-pool');
    }
};

Controller.prototype._completeHandler = function(textInfo, index, total, model, errors, options) {
    Log.MSG('[INTRO CONTROLLER] Successful pool task finished ' + textInfo );
    if (index < total - 1) {
        this.emiter.trigger('on-processed-resource', index + 1, total);
    } else if (index === total - 1) {
        this.emiter.trigger('complete-pool');
    }
};

Controller.prototype._completeHandlerImages = function(name, index, total) {
    Log.MSG('[INTRO CONTROLLER] Successful preloaded ' + name + ' Items requested.');
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

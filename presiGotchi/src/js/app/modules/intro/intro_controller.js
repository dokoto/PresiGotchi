'use strict';

const _ = require('underscore');
const Backbone = require('backbone');
const View = require('./intro_view');
const MainRouter = require('modules/menus/main/main_router');

class Controller {
    constructor(options) {
        if (!APP.Gotchi || Object.keys(APP.Gotchi).length === 0) {
            APP.Gotchi = APP.Gotchi || {};
        }
        this.view = new View();
        this.emiter = {};
        this.loadPool = require('./logic/taskPool');        
        _.extend(this.emiter, Backbone.Events);
    }

    loadResources() {
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
    }

    progress(current, total) {
        var progress = ((current) * 100) / total;
        $('#intro-progress').text('Cargando ' + progress.toFixed(2) + '%');
    }

    run() {
        this.view.once('intro:gotomain', this._gotomainHandler, this);
        this.view.once('intro:render:finish', function() {
            if (Object.keys(APP.Gotchi).length === 0) {
                this.loadResources();
            } else {
                $('#intro-progress').hide();
                $('#intro-menu').show();
                $('#intro-container').data('enable-click', 'true');
            }
        }, this);

        this.view.render();
    }

    _gotomainHandler() {
        new MainRouter().navigate('menus/main/start', {
            trigger: true
        });
    }

    _completeHandlerConfig(uuid, collectionName, index, total, model, errors, options) {
        console.log('[INTRO CONTROLLER] Successful synchronized collection ' + collectionName + ' id: ' + uuid + ' with backend. ' + model.length + ' Items requested.');
        APP.Gotchi[collectionName] = model;
        if (index < total - 1) {
            this.emiter.trigger('on-processed-resource', index + 1, total);
        } else if (index === total - 1) {
            this.emiter.trigger('complete-pool');
        }
    }

    _completeHandler(textInfo, index, total, model, errors, options) {
        console.log('[INTRO CONTROLLER] Successful pool task finished ' + textInfo);
        if (index < total - 1) {
            this.emiter.trigger('on-processed-resource', index + 1, total);
        } else if (index === total - 1) {
            this.emiter.trigger('complete-pool');
        }
    }

    _completeHandlerImages(name, index, total) {
        console.log('[INTRO CONTROLLER] Successful preloaded ' + name + ' Items requested.');
        if (index < total - 1) {
            this.emiter.trigger('on-processed-resource', index + 1, total);
        } else if (index === total - 1) {
            this.emiter.trigger('complete-pool');
        }
    }

    _errorHandler(model, response, options) {
        console.error('[INTRO CONTROLLER] Error synchroning collection ' + model.uuid + ' Msg: ' + options.textStatus);
        APP.popup.show({
            content: 'Error de conexion :(',
            type: 'error'
        });
    }
}


module.exports = Controller;

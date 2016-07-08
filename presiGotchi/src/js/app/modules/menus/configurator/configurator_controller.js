/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');
var Log = require('utils/logger');
var pmsg = require('utils/pmsg').create();

function Controller(options) {
    this.currentStep = {
        step: 0,
        title: true
    };
    this.direction = {
        left: 0,
        right: 0
    };
}

Controller.prototype.run = function() {
    this._show();
};

Controller.prototype._show = function() {
    var view = require('./configurator_view').create({
        'viewOptions': {
            'collection': Gotchi.collections.configurator
        }
    });

    view.on('menu:configurator:completedStep', this._completedStepChecking, this);
    view.on('menu:configurator:itemSelected', this._itemSelected, this);
    view.on('menu:configurator:nextStep', this._nextStep, this);
    view.once('menu:configurator:render:finish', this._initStep, this);

    view.render();
};

Controller.prototype._processDirection = function(direction) {
    switch (direction.toUpperCase()) {
        case 'LEFT':
            this.direction.left++;
            break;
        case 'RIGHT':
            this.direction.right++;
            break;
        case 'RANDOM':
            if (Math.floor((Math.random() * 2) + 100) % 2 === 0) {
                this.direction.right++;
            } else {
                this.direction.left++;
            }
            break;
        default:
            break;
    }
};

Controller.prototype._completedStepChecking = function(ev) {
    var $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
    if ($sel.find('.slider-block').length ===
        $sel.find('.slider-item-response.selected').length) {
        var self = this;
        $sel.find('.slider-item-response.selected').each(function(index, value) {
            self._processDirection($(value).data('direction'));
        }, this).promise().done(function() {
            self._completedStep();
        });
    } else {
        pmsg.show({
            duration: 4000,
            content: 'Debes seleccionar una respuesta a cada pregunta ;)',
            type: 'warn'
        });
    }
};

Controller.prototype._completedStep = function(ev) {
    var $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
    $sel.find('#slider-blocks').fadeOut();
    $sel.find('#complete').fadeOut();
    $sel.find('#slider-block-title').addClass('slider-hide');
    $sel.addClass('slider-hide');

    this.currentStep.title = true;
    this.currentStep.step++;
    if( this.currentStep.step < $('.slider-configurator-step').length) {
        this._initStep(ev);
    } else if( $('.slider-configurator-step').length === this.currentStep.step) {
        this._finishConfigurator();
    } else {
        Log.ERROR('[CONFIGURATOR] Something went wrong');
    }
};

Controller.prototype._finishConfigurator = function(ev) {
    Gotchi.collections.gotchi.state.direction = (this.direction.right > this.direction.left) ? 'RIGHT' : 'LEFT';
};

Controller.prototype._nextStep = function(ev) {
    this.currentStep.title = false;
    var $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
    $sel.find('#slider-block-title').fadeOut();
    $sel.find('#slider-blocks').fadeIn();
    $sel.find('#complete').fadeIn();
};

Controller.prototype._initStep = function(ev) {
    var $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
    $sel.removeClass('slider-hide');
    $sel.find('#slider-block-title').fadeIn();
    $sel.find('#slider-block-title').removeClass('slider-hide');
};

Controller.prototype._itemSelected = function(ev) {
    var self = this;
    $(ev.currentTarget).parent().find('.slider-item-response').removeClass('selected').promise().done(function() {
        $(ev.currentTarget).find('.slider-item-response').toggleClass('selected');
    });
};

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

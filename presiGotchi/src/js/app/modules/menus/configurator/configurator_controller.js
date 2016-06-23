/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');

function Controller(options) {
    this.currentStep = {
        step: 0,
        title: true
    };
}

Controller.prototype.run = function() {
    this.show();
};

Controller.prototype.show = function() {
    var view = require('./configurator_view').create({
        'viewOptions': {
            'collection': Gotchi.collections.configurator
        }
    });

    view.on('menu:configurator:itemSelected', this._itemSelected, this);
    view.on('menu:configurator:nextStep', this._nextStep, this);    
    view.once('menu:configurator:render:finish', this._finishedRender, this);
    view.render();

};

Controller.prototype._nextStep = function(ev) {
    this.currentStep.title = false;
    $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]').find('#slider-block-title').fadeOut();
    $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]').find('#slider-blocks').fadeIn();
};

Controller.prototype._finishedRender = function(ev) {
    this.currentStep.step = 0;
    this.currentStep.title = true;
    $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]').removeClass('slider-hide');
    $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]').find('#slider-block-title').fadeIn();
    $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]').find('#slider-block-title').removeClass('slider-hide');
};

Controller.prototype._itemSelected = function(ev) {
    var self = this;
    $(ev.target.id).parent().find('.slider-item').each(function(index, value) {
        self._resetItemResponses(this);
    }).promise().done(function() {
        self._toggleItemSelected(self);
    });
};

Controller.prototype._resetItemResponses = function(el) {
    $(el).find('.slider-item-response').css('color', 'black');
    $(el).find('.slider-item-response').css('background-color', 'white');
};

Controller.prototype._toggleItemSelected = function(el) {
    if ($(el).find('.slider-item-response').css('color') === 'rgb(0, 0, 0)') {
        $(el).find('.slider-item-response').css('color', 'white');
        $(el).find('.slider-item-response').css('background-color', 'black');
    } else {
        $(el).find('.slider-item-response').css('color', 'black');
        $(el).find('.slider-item-response').css('background-color', 'white');
    }
};

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

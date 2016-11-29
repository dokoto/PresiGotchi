'use strict';

const Log = require('utils/logger');
const _ = require('underscore');
const Log = require('utils/logger');
const pmsg = require('utils/pmsg').create();

class Controller {
    constructor(options) {
        this.currentStep = {
            step: 0,
            title: true
        };
        this.direction = {
            left: 0,
            right: 0
        };
    }

    run() {
        this._show();
    }

    _show() {
        let view = require('./configurator_view').create({
            'viewOptions': {
                'collection': window.Gotchi.collections.configurator
            }
        });

        view.on('menu:configurator:completedStep', this._completedStepChecking, this);
        view.on('menu:configurator:itemSelected', this._itemSelected, this);
        view.on('menu:configurator:nextStep', this._nextStep, this);
        view.once('menu:configurator:render:finish', this._initStep, this);

        view.render();
    }

    _processDirection(direction) {
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
    }

    _completedStepChecking(ev) {
        let $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
        if ($sel.find('.slider-block').length ===
            $sel.find('.slider-item-response.selected').length) {
            let self = this;
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
    }

    _completedStep(ev) {
        let $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
        $sel.find('#slider-blocks').fadeOut();
        $sel.find('#complete').fadeOut();
        $sel.find('#slider-block-title').addClass('slider-hide');
        $sel.addClass('slider-hide');

        this.currentStep.title = true;
        this.currentStep.step++;
        if (this.currentStep.step < $('.slider-configurator-step').length) {
            this._initStep(ev);
        } else if ($('.slider-configurator-step').length === this.currentStep.step) {
            this._finishConfigurator();
        } else {
            console.error('[CONFIGURATOR] Something went wrong');
        }
    }

    _finishConfigurator(ev) {
        window.Gotchi.collections.gotchi.first().get('state').direction = (this.direction.right > this.direction.left) ? 'RIGHT' : 'LEFT';
        let stage = require('modules/stage/stage_router').create();
        stage.navigate('stage/engine/start', {
            trigger: true
        });
    }

    _nextStep(ev) {
        this.currentStep.title = false;
        let $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
        $sel.find('#slider-block-title').fadeOut();
        $sel.find('#slider-blocks').fadeIn();
        $sel.find('#complete').fadeIn();
    }

    _initStep(ev) {
        let $sel = $('.slider-configurator-step').filter('[data-index="' + this.currentStep.step + '"]');
        $sel.removeClass('slider-hide');
        $sel.find('#slider-block-title').fadeIn();
        $sel.find('#slider-block-title').removeClass('slider-hide');
    }

    _itemSelected(ev) {
        let self = this;
        $(ev.currentTarget).parent().find('.slider-item-response').removeClass('selected').promise().done(function() {
            $(ev.currentTarget).find('.slider-item-response').toggleClass('selected');
        });
    }
}

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

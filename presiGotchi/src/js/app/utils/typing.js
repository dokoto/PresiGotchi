'use strict';

const Backbone = require('backbone');
const _ = require('underscore');

class Typing {
    constructor(options) {
        _.extend(this, Backbone.Events);
        if (!options.parent) {
            throw Error('options.parent is mandatory');
        }
        this.parent = options.parent;
        if (!options.id) {
            throw Error('options.id is mandatory');
        }
        this.id = options.id;
        this.wantedPorcHeight = options.wantedPorcHeight || 20;

        this.initAttribs();
    }

    initAttribs() {
        this.spans = '';
        this.porc = 0;
        this.length = 0;
        this.progressUnit = 0;
        this.progress = 0;
        this.hiddenHeight = 0;
        this.scroll = 0;
        this.idHeightPorc = 0;
        this.idHeightPixels = 0;
        this.wantedPixelHeight = 0;
    }

    hide() {
        $('#response-bar').fadeOut('slow');
        $(this.parent).fadeOut();
        $(this.id).empty();
        $(this.id).removeAttr('style');
    }

    show(text, id) {
        $(this.parent).fadeIn();
        $(this.id).css('visibility', 'hidden');
        this.initAttribs();
        this.spans = '<span>' + text.split('').join('</span><span>') + '</span>';
        this.porc = 6;
        this.length = $(this.spans).length;
        this.progressUnit = (this.length * (100 / this.porc)) / 100;
        this.progress = this.progressUnit;
        $(this.spans).appendTo(this.id);
        this.idHeightPixels = $(this.id).height();
        $(this.id).children('span').hide();
        this.idHeightPorc = this._calcHeightPorcOfWindow(this.id);
        this.wantedPixelHeight = this._calcHeightPixelsOfWin(this.wantedPorcHeight);
        $(this.id).css('visibility', 'visible');
        if (this.idHeightPixels > this.wantedPixelHeight) {
            $(this.id).css('height', this.wantedPixelHeight);
        } else {
            $(id).css('height', this.idHeightPixels);
        }
        $(this.id).children('span').each(this._handleAllCharacteres.bind(this, this.id));
    }

    _calcHeightPorcOfWindow(id) {
        return (this.idHeightPixels * 100) / window.innerHeight;
    }

    _calcHeightPixelsOfWin(porc) {
        return (window.innerHeight * porc) / 100;
    }

    _handleAllCharacteres(id, index, DOMContext) {
        $(DOMContext).delay(100 * index).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 100, this._handleCharacter.bind(this, id, index));
    }

    _handleCharacter(id, index, DOMContext) {
        if (this.hiddenHeight === 0) {
            this.hiddenHeight = $(id)[0].scrollHeight - $(id)[0].clientHeight;
        }
        if (index >= this.progress) {
            this.scroll += this.hiddenHeight / this.porc;
            //console.log('proc: %d progressUnit: %d progress: %d hiddenHeight: %d scroll: %d', porc, progressUnit, progress, hiddenHeight, scroll);
            if (this.porc === 2) {
                this.scroll = this.hiddenHeight;
            }
            $('#typing-text').animate({
                scrollTop: this.scroll
            });
            this.porc--;
            this.progress += this.progressUnit;
        }
        if (index === this.length - 1) {
            this.trigger('typing:finish');
            this._finishTyping();
        }
    }

    _finishTyping() {
        $('#response-bar').fadeIn('slow');
    }
}

module.exports = Typing;

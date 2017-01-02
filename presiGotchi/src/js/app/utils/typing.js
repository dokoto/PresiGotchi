'use strict';

const Backbone = require('backbone');
const _ = require('underscore');

class Typing {
    constructor() {
        _.extend(this, Backbone.Events);
        this.setAttribs();
    }

    setAttribs() {
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
        this.wantedPorcHeight = 20;
    }

    start(text, id) {
        id = id || '#typing-text';
        $(id).css('visibility', 'hidden');
        this.setAttribs();
        this.spans = '<span>' + text.split('').join('</span><span>') + '</span>';
        this.porc = 6;
        this.length = $(this.spans).length;
        this.progressUnit = (this.length * (100 / this.porc)) / 100;
        this.progress = this.progressUnit;
        $(this.spans).appendTo(id);
        this.idHeightPixels = $(id).height();
        $(id).children('span').hide();
        this.idHeightPorc = this._calcHeightPorcOfWindow(id);
        this.wantedPixelHeight = this._calcHeightPixelsOfWin(this.wantedPorcHeight);
        $(id).css('visibility', 'visible');
        if (this.idHeightPixels > this.wantedPixelHeight) {
            $(id).css('height', this.wantedPixelHeight);
        } else {
            $(id).css('height', this.idHeightPixels);
        }
        $(id).children('span').each(this._handleAllCharacteres.bind(this, id));
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
        }
    }
}

module.exports = Typing;

'use strict';

const _ = require('underscore');
const utils = require('utils/misc');

class Engine {
    constructor(options) {
        this._options = options;
        if (APP.consts.mocks) {
            this._options.gotchi.first().get('state').activated = true;
        }
        this._gotchi = this._options.gotchi.find(item => item.get('state').activated);
        this._quotesByStage = this._options.quotes.find(item => item.get('status') === this._gotchi.get('state').stage).get('quotes');
        if (this._gotchi.get('state').stage === 'FILOSOFER') {
            this._quotes = this._quotesByStage;
        } else {
            _.each(this._quotesByStage, (item) => {
                if (this._gotchi.get('state').stage === 'FILOSOFER' || item.direction === this._gotchi.get('state').direction) {
                    this._quotes.push(item);
                }
            });
        }
    }

    start() {
        let randAuthor = utils.getRandomIntInclusive(0, this._quotes.length - 1);
        let randQuote = utils.getRandomIntInclusive(0, this._quotes[randAuthor].texts.length - 1);
        let str = utils.cleanText(this._quotes[randAuthor].texts[randQuote]);
        this.typingText(str);
    }

    typingText(text, id) {
        id = id || '#typing-text';
        let spans = '<span>' + text.split('').join('</span><span>') + '</span>';
        let porc = 6;
        let progressUnit = ($(spans).length * (100 / porc)) / 100;
        let progress = progressUnit;
        let hiddenHeight = 0,
            scroll = 0;
        $(spans).hide().appendTo(id).each(function(i) {
            $(this).delay(100 * i).css({
                display: 'inline',
                opacity: 0
            }).animate({
                opacity: 1
            }, 100, function() {
                if (hiddenHeight === 0) {
                    hiddenHeight = $(id)[0].scrollHeight - $(id)[0].clientHeight;
                }
                if (i >= progress) {
                    scroll += hiddenHeight / porc;
                    //console.log('proc: %d progressUnit: %d progress: %d hiddenHeight: %d scroll: %d', porc, progressUnit, progress, hiddenHeight, scroll);
                    if (porc === 2) {
                        scroll = hiddenHeight;
                    }
                    $('#typing-text').animate({
                        scrollTop: scroll
                    });
                    porc--;
                    progress += progressUnit;
                }
            });
        });
    }
}

module.exports = Engine;

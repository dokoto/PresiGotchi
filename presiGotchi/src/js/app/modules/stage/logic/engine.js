'use strict';

const _ = require('underscore');

class Engine {
    constructor(options) {
        this._options = options;
        this.gotchi = this._options.gotchi.find(item=>item.get('activated'));
        this._quotesByStage = this._options.quotes.find(item => item.get('status') === this.gotchi.get('state').stage).get('quotes');
        this._quotes = [];
        _.each(this._quotesByStage, (item) => {
            if (item.direction === 'LEFT') {
                this._quotes.push(item);
            }
        });
    }

    start() {
        let str = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
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

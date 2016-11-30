'use strict';


class Engine {
    constructor(options) {
        this._options = options;
    }

    start() {
        let str = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
        let spans = '<span>' + str.split('').join('</span><span>') + '</span>';
        let porc = 4;
        let progressUnit = ($(spans).length * (100 / porc)) / 100;
        let progress = progressUnit;
        let hiddenHeight = $('#typing-text')[0].scrollHeight - $('#typing-text')[0].clientHeight;

        $(spans).hide().appendTo('#typing-text').each(function(i) {
            $(this).delay(100 * i).css({
                display: 'inline',
                opacity: 0
            }).animate({
                opacity: 1
            }, 100, function() {
                if (hiddenHeight === 0) {
                    hiddenHeight = $('#typing-text')[0].scrollHeight - $('#typing-text')[0].clientHeight;
                }
                if (i >= progress) {
                    let scroll = hiddenHeight / porc;
                    if (porc === 2) {
                        scroll = hiddenHeight;
                    }
                    $('#typing-text').animate({
                        scrollTop: scroll
                    });
                    porc--;
                    //progress = $(spans).length * (100 / porc) / 100;
                    progress += progressUnit;
                }
            });
        });
    }
}

module.exports = Engine;

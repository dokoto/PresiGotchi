'use strict';

require('./css/stage-base.css');
const Engine = require('./logic/engine');
const View = require('./stage_view');
const Typing = require('utils/typing');

class Controller {
    constructor(options) {
        this.collections = {
            'gotchi': APP.Gotchi.gotchi,
            'quotes': APP.Gotchi.quotes
        };
        this.engine = new Engine(this.collections);
        this.typing = new Typing();
    }

    run() {
        new View().render();
        this.engine.on('new:quote', this._handleQuotes.bind(this));
        this.engine.start();
    }

    _handleQuotes(quote) {
        this.typing.on('typing:finish', this._typingFinished.bind(this));
        this.typing.start(quote);
    }

    _typingFinished() {
        console.log('[STAGE COSNTROLLER] Typer finis, showing response bar');
        $('#response-bar').fadeIn('slow');
    }
}

module.exports = Controller;

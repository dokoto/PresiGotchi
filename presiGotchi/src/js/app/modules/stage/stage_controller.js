'use strict';

const Engine = require('./logic/engine');

class Controller {
    constructor(options) {
        this.collections = {
            'gotchi': window.Gotchi.collections.gotchi,
            'quotes': window.Gotchi.collections.quotes
        };
        this._engine = new Engine(this.collections);
    }

    run() {
        this._engine.start();
    }
}

module.exports = Controller;

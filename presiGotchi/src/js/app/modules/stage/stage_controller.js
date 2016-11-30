'use strict';

const Engine = require('./logic/engine');

class Controller {
    constructor(options) {
        this.collections = {
            'gotchi': APP.Gotchi.collections.gotchi,
            'quotes': APP.Gotchi.collections.quotes
        };
        this.engine = new Engine(this.collections);
    }

    run() {
        this.engine.start();
    }
}

module.exports = Controller;

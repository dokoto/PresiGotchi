'use strict';

require('./css/stage-base.css');
const Engine = require('./logic/engine');
const View = require('./stage_view');

class Controller {
    constructor(options) {
        this.collections = {
            'gotchi': APP.Gotchi.collections.gotchi,
            'quotes': APP.Gotchi.collections.quotes
        };
        this.engine = new Engine(this.collections);
    }

    run() {
        new View().render();
        this.engine.start();
    }
}

module.exports = Controller;

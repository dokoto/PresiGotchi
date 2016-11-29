'use strict';

const engineFactory = require('./logic/engine');

class Controller {
    constructor(options) {
        this._trepiEngine = engineFactory.create({
            'collections': {
                'gotchi': window.Gotchi.collections.gotchi,
                'quotes': window.Gotchi.collections.quotes
            }
        });
    }

    run() {
        this._trepiEngine.start();
    }
}

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

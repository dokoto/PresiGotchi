'use strict';

const View = require('./selector_view');

class Controller {
    constructor(options) {
        this.viewOptions = {
            'collection': APP.Gotchi.gotchiCollection
        };
    }

    show() {
        new View(this.viewOptions).render();
    }
}

module.exports = Controller;

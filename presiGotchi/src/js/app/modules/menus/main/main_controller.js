'use strict';

const View = require('./main_view');

class Controller {
    constructor(options) {
        this.viewOptions = {
            'model': window.Gotchi.collections.menus.findWhere({
                name: 'main'
            })
        };
    }

    show() {
        new View(this.viewOptions).render();
    }
}


module.exports = Controller;

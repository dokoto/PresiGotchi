'use strict';

const Log = require('utils/logger');
const _ = require('underscore');

class Controller {
    constructor(options) {}

    show() {
        var view = require('./selector_view').create({
            'viewOptions': {
                'collection': window.Gotchi.gotchiCollection
            }
        });
        view.render();
    }
}

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

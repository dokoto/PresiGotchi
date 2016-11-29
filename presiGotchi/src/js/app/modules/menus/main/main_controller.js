'use strict';

const Log = require('utils/logger');
const _ = require('underscore');

class Controller {
    constructor(options) {}

    _show(menusCollection) {
        let view = require('./main_view').create({
            'viewOptions': {
                'model': window.Gotchi.collections.menus.findWhere({
                    name: 'main'
                })
            }
        });
        view.render();
    }

    show() {
        this._show();
    }
}


module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');

function Controller(options) {}


Controller.prototype._show = function(menusCollection) {
    var view = require('./main_view').create({
        'viewOptions': {
            'model': Gotchi.collections.menus.findWhere({
                name: 'main'
            })
        }
    });
    view.render();
};

Controller.prototype.show = function() {
    this._show();
};


module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

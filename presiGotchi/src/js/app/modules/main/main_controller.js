/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');

function Controller(options) {  
}


Controller.prototype.show = function() {
    var menuModel = require('models/menuModel').create();
    var view = require('./main_menu_view').create({
        'viewOptions': {
            'model': menuModel
        }
    });
    view.render();
};


module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

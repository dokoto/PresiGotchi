/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var engineFactory = require('./logic/engine');

function Controller(options) {
    this._trepiEngine = engineFactory.create({
        'collections' : {
          'gotchi': Gotchi.collections.gotchi,
          'quotes': Gotchi.collections.quotes
        }
    });
}

Controller.prototype.run = function() {
    this._trepiEngine.start();
};

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');
var engineFactory = require('./logic/engine');

function Controller(options) {
    this._trepiEngine = engineFactory.create({});
}

Controller.prototype.run = function() {
    this._trepiEngine.start();
};

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};

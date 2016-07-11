/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

function Engine(options) {
    this._options = options;
}

Engine.prototype.start = function() {
    
};

module.exports = {
    create: function(options) {
        return new Engine(options);
    }
};

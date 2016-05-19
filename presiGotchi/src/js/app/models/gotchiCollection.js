/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/CollectionBase');

var GotchiCollection = CollectionBase.self.extend({});

module.exports = {
    create: function() {
        return new GotchiCollection();
    },
    self: GotchiCollection
};

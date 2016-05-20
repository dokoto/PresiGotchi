/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/CollectionBase');
var _ = require('underscore');

var GotchiCollection = CollectionBase.self.extend({});
_.extend(GotchiCollection.prototype.defaults, CollectionBase.self.prototype.defaults);

module.exports = {
    create: function() {
        return new GotchiCollection();
    },
    self: GotchiCollection
};

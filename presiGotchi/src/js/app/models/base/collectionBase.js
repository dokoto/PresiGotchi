/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');
var ModelBase = require('./modelBase');

var CollectionBase = Backbone.Collection.extend({
    model: ModelBase.self,
    parse: function(response) {
        //return response.value.collection;
        return response;
    }
});


module.exports = {
    create: function() {
        return new CollectionBase();
    },
    self: CollectionBase
};

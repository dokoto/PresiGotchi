/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('utils/logger');
var ModelBase = require('./modelBase');
var baseParams = require('json!../../config/baseParams.json');

var CollectionBase = Backbone.Collection.extend({
    model: ModelBase.self,
    urlRoot: baseParams.urlRoot,
    url: function() {
        return this.urlRoot + '/collection';
    },
    parse: function(response) {
        return response.value.collection;
    }
});


module.exports = {
    create: function() {
        return new CollectionBase();
    },
    self: CollectionBase
};

/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/CollectionBase');
var _ = require('underscore');
var baseParams = require('json!config/baseParams.json');
var utils = require('utils/misc');
var Backbone = require('backbone');

//var GotchiCollection = CollectionBase.self.extend({
var GotchiCollection = Backbone.Collection.extend({
    urlRoot: baseParams.urlRoot,
    url: function() {
        return this.urlRoot + '/characters/gotchis';
    },
    parse: function(response) {
        return response.value.data;
    }
});
//_.extend(GotchiCollection.prototype.defaults, CollectionBase.self.prototype.defaults);

module.exports = {
    create: function() {
        var vv = new GotchiCollection();
        vv.uuid = utils.uuid();
        return vv;
    },
    self: GotchiCollection
};

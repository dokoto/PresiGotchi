/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/CollectionBase');
var _ = require('underscore');
var baseParams = require('json!config/baseParams.json');
var utils = require('utils/misc');
var Backbone = require('backbone');

//var ConfiguratorCollection = CollectionBase.self.extend({
var ConfiguratorCollection = Backbone.Collection.extend({
  urlRoot: baseParams.urlRoot,
  url: function() {
      return this.urlRoot + '/texts/configurator';
  },
  parse: function(response) {
      return response.value.data;
  }
});
//_.extend(ConfiguratorCollection.prototype.defaults, CollectionBase.self.prototype.defaults);

module.exports = {
    create: function() {
        var vv = new ConfiguratorCollection();
        vv.uuid = utils.uuid();
        return vv;
    },
    self: ConfiguratorCollection
};

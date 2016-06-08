/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/CollectionBase');
var _ = require('underscore');
var baseParams = require('json!config/baseParams.json');
var utils = require('utils/misc');
var Backbone = require('backbone');

//var MenusCollection = CollectionBase.self.extend({
var MenusCollection = Backbone.Collection.extend({
  urlRoot: baseParams.urlRoot,
  url: function() {
      return this.urlRoot + '/texts/menus';
  },
  parse: function(response) {
      return response.value.data;
  }
});
//_.extend(MenusCollection.prototype.defaults, CollectionBase.self.prototype.defaults);

module.exports = {
    create: function() {
        var vv = new MenusCollection();
        vv.uuid = utils.uuid();
        return vv;
    },
    self: MenusCollection
};

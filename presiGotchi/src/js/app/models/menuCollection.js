/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/modelBase');
var _ = require('underscore');
var baseParams = require('json!../../config/baseParams.json');

var MenuCollection = CollectionBase.self.extend({
  urlRoot: baseParams.urlRoot,
  url: function() {
      return this.urlRoot + '/texts/menus';
  },
});
_.extend(MenuCollection.prototype.defaults, CollectionBase.self.prototype.defaults);

module.exports = {
    create: function() {
        return new MenuCollection();
    },
    self: MenuCollection
};

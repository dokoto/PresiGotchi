/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var Log = require('../../utils/logger');
var baseParams = require('json!../../config/baseParams.json');

var ModelBase = Backbone.Model.extend({
    urlRoot: baseParams.urlRoot,
    url: function() {
      return this.urlRoot + '/model' + '?email=' + this.email + '&name=' + this.name;
    }
});


module.exports = {
    create: function() {
        return new ModelBase();
    },
    self: ModelBase
};

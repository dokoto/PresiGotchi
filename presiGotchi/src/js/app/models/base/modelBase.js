'use strict';

var Backbone = require('backbone');
var Log = require('../../utils/logger');
var baseParams = require('json!../../config/baseParams.json');

var ModelBase = Backbone.Model.extend({
    parse: function(response) {
        return response;
    }
});


module.exports = {
    create: function() {
        return new ModelBase();
    },
    self: ModelBase
};

/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';


var CollectionBase = require('./base/CollectionBase');
var _ = require('underscore');
var baseParams = require('json!config/baseParams.json');
var utils = require('utils/misc');
var Backbone = require('backbone');

var ConfiguratorCollection = Backbone.Collection.extend({
    urlRoot: baseParams.urlRoot,
    url: function() {
        return this.urlRoot + '/texts/configurator';
    },
    parse: function(response) {
        return response.value.data;
    },
    getAllThumbs: function() {
        var i, x, thumbs = [];
        for (i in this.models) {
            for (x in this.models[i].attributes.questions) {
                thumbs = thumbs.concat(_.pluck(this.models[i].attributes.questions[x].responses, 'thumb'));
            }
        }

        return thumbs.filter(function(o) {
            return o !== '';
        });
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

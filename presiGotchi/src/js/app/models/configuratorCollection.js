'use strict';


const _ = require('underscore');
const baseParams = require('json!config/baseParams.json');
const utils = require('utils/misc');
const Backbone = require('backbone');

class ConfiguratorCollection extends Backbone.Collection {
    constructor() {
        super();
        this.urlRoot = baseParams.urlRoot;
        this.url = function() {
            return this.urlRoot + '/texts/configurator';
        };
        this.parse = function(response) {
            return response.value.data;
        };
    }
    getAllThumbs() {
        let i, x, thumbs = [];
        for (i in this.models) {
            for (x in this.models[i].attributes.questions) {
                thumbs = thumbs.concat(_.pluck(this.models[i].attributes.questions[x].responses, 'thumb'));
            }
        }

        return thumbs.filter(function(o) {
            return o !== '';
        });
    }
}

module.exports = {
    create: function() {
        var vv = new ConfiguratorCollection();
        vv.uuid = utils.uuid();
        return vv;
    },
    self: ConfiguratorCollection
};

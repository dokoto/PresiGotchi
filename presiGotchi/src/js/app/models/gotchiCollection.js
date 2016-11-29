'use strict';


const _ = require('underscore');
const baseParams = require('json!config/baseParams.json');
const utils = require('utils/misc');
const Backbone = require('backbone');

class GotchiCollection extends Backbone.Collection {
    constructor() {
        super();
        this.urlRoot = baseParams.urlRoot;
        this.url = function() {
            return this.urlRoot + '/characters/gotchis';
        };
        this.parse = function(response) {
            return response.value.data;
        };
    }
}

module.exports = {
    create: function() {
        var vv = new GotchiCollection();
        vv.uuid = utils.uuid();
        return vv;
    },
    self: GotchiCollection
};

'use strict';


const _ = require('underscore');
const baseParams = require('json!config/baseParams.json');
const utils = require('utils/misc');
const Backbone = require('backbone');

class QuotesCollection extends Backbone.Collection {
    constructor() {
        super();
        this.urlRoot = baseParams.urlRoot;
        this.url = function() {
            return this.urlRoot + '/texts/quotes';
        };
        this.parse = function(response) {
            return response.value.data;
        };
    }

}

module.exports = {
    create: function() {
        var quotes = new QuotesCollection();
        quotes.uuid = utils.uuid();
        return quotes;
    },
    self: QuotesCollection
};

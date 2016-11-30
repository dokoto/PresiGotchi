'use strict';

const utils = require('utils/misc');
const baseParams = require('json!config/baseParams.json');
const BaseCollection = require('./base/collectionbase');

class QuotesCollection extends BaseCollection {
    constructor() {
        super();
        this.url = baseParams.urlRoot + '/texts/quotes';
    }
}

module.exports = QuotesCollection;

'use strict';

const utils = require('utils/misc');
const BaseCollection = require('./base/collectionbase');

class QuotesCollection extends BaseCollection {
    constructor() {
        super();
        this.url = APP.consts.SERVICE_URL + '/texts/quotes';
    }
}

module.exports = QuotesCollection;

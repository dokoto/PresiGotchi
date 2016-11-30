'use strict';

const baseParams = require('json!config/baseParams.json');
const utils = require('utils/misc');
const BaseCollection = require('./base/collectionbase');

class GotchiCollection extends BaseCollection {
    constructor() {
        super();        
        this.url = baseParams.urlRoot + '/characters/gotchis';
    }
}

module.exports = GotchiCollection;

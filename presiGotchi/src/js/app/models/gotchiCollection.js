'use strict';

const utils = require('utils/misc');
const BaseCollection = require('./base/collectionbase');

class GotchiCollection extends BaseCollection {
    constructor() {
        super();
        this.url = APP.consts.SERVICE_URL + '/characters/gotchis';
    }
}

module.exports = GotchiCollection;

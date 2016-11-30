'use strict';

const baseParams = require('json!config/baseParams.json');
const utils = require('utils/misc');
const BaseCollection = require('./base/collectionbase');

class MenusCollection extends BaseCollection {
    constructor() {
        super();
        this.url = baseParams.urlRoot + '/texts/menus';
    }
}


module.exports = MenusCollection;

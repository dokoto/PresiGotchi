'use strict';

const utils = require('utils/misc');
const BaseCollection = require('./base/collectionbase');

class MenusCollection extends BaseCollection {
    constructor() {
        super();
        this.url = APP.consts.SERVICE_URL + '/texts/menus';
    }
}


module.exports = MenusCollection;

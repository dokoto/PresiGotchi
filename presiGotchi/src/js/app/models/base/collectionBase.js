'use strict';

var Backbone = require('backbone');
const utils = require('utils/misc');

class CollectionBase extends Backbone.Collection {
    constructor() {
        super();
        this.uuid = utils.uuid();
        this.parse = response => response.value.data;
    }
}

module.exports = CollectionBase;

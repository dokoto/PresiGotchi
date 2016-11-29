'use strict';


const _ = require('underscore');
const baseParams = require('json!config/baseParams.json');
const utils = require('utils/misc');
const Backbone = require('backbone');

class MenusCollection extends Backbone.Collection {
    constructor() {
        super();
        this.urlRoot = baseParams.urlRoot;
        this.url = function() {
            return this.urlRoot + '/texts/menus';
        };
        this.parse = function(response) {
            return response.value.data;
        };
    }
}


module.exports = {
    create: function() {
        var menus = new MenusCollection();
        menus.uuid = utils.uuid();
        return menus;
    },
    self: MenusCollection
};

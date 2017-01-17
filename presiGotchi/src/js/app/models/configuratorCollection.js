'use strict';


const _ = require('underscore');
const BaseCollection = require('./base/collectionbase');

class ConfiguratorCollection extends BaseCollection {
    constructor() {
        super();
        this.url = APP.consts.SERVICE_URL + '/texts/configurator';
    }

    getAllThumbs() {
        let i, x, thumbs = [];
        for (i in this.models) {
            for (x in this.models[i].attributes.questions) {
                thumbs = thumbs.concat(_.pluck(this.models[i].attributes.questions[x].responses, 'thumb'));
            }
        }

        return thumbs.filter(o => o !== '');
    }
}

module.exports = ConfiguratorCollection;

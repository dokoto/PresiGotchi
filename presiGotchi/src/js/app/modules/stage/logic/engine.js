'use strict';

const Backbone = require('backbone');
const _ = require('underscore');
const utils = require('utils/misc');

class Engine {
    constructor(options) {
        _.extend(this, Backbone.Events);
        this._options = options;
        if (APP.consts.mocks) {
            this._options.gotchi.first().get('state').activated = true;
        }
        this._gotchi = this._options.gotchi.find(item => item.get('state').activated);
        this._quotesByStage = this._options.quotes.find(item => item.get('status') === this._gotchi.get('state').stage).get('quotes');
        if (this._gotchi.get('state').stage === 'FILOSOFER') {
            this._quotes = this._quotesByStage;
        } else {
            _.each(this._quotesByStage, (item) => {
                if (this._gotchi.get('state').stage === 'FILOSOFER' || item.direction === this._gotchi.get('state').direction) {
                    this._quotes.push(item);
                }
            });
        }
    }

    start() {
        let randAuthor = utils.getRandomIntInclusive(0, this._quotes.length - 1);
        let randQuote = utils.getRandomIntInclusive(0, this._quotes[randAuthor].texts.length - 1);
        let quote = utils.cleanText(this._quotes[randAuthor].texts[randQuote]);
        this.trigger('new:quote', quote);
    }
}

module.exports = Engine;

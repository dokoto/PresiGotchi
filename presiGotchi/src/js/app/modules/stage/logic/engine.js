'use strict';

const Backbone = require('backbone');
const _ = require('underscore');
const utils = require('utils/misc');
const moment = require('moment');

class Engine {
    constructor(options) {
        _.extend(this, Backbone.Events);
        moment().format();
        this._gotchi = options.gotchi;
        this._quotes = options.quotes;
        this._maxAskIntervalSecs = options.maxAskIntervalSecs || utils.time.ms.minute;
        if (APP.consts.MOCKS) {
            this._gotchi.first().get('state').activated = true;
        }
        this._gotchi = this._gotchi.find(item => item.get('state').activated);
        this._quotesByStage = this._quotes.find(item => item.get('status') === this._gotchi.get('state').stage).get('quotes');
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

    nextTic() {
        let nextMessageIn = this._getRamdomMessageTime();
        console.log('[ENGINE] Waiting for the next message in %d milliseconds', nextMessageIn);
        this.lastNotificationTime = new Date();
        window.setTimeout(this._handleRamdonMesage.bind(this), nextMessageIn);
    }

    _getQuote() {
        let randAuthor = utils.getRandomIntInclusive(0, this._quotes.length - 1);
        let randQuote = utils.getRandomIntInclusive(0, this._quotes[randAuthor].texts.length - 1);
        return utils.cleanText(this._quotes[randAuthor].texts[randQuote]);
    }

    _handleRamdonMesage() {
        console.log('[ENGINE] Time complete, it\'s time for a new message. Last notificaion was at %d', this.lastNotificationTime);
        this.trigger('new:quote', this._getQuote());
    }

    _getRamdomMessageTime() {
        return utils.getRandomIntInclusive(100, this._maxAskIntervalSecs - 1);
    }
}

module.exports = Engine;

/*global define, module, require, console*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const EventEmitter = require('events');
let wikiquote = require('./wikiQuotes').create();


class QuoteProcessor extends EventEmitter {
    constructor(options) {
        super();
        this.options = options || {};
        this._items = [];
        this._progress = 0;
        this._quotesBlocks = require('../../presiGotchid/config/default/quotes.json');
    }

    process() {
        this._processQuotes();
    }

    _processQuotes() {
        this._resoveItems();
        this._processItems();
    }

    _processItems(el, who, quotes) {
        wikiquote.removeAllListeners();
        if (quotes) {
            el.texts = quotes;
        }
        if (this._items.length === 0) {
            this.emit('error-quotes');
        } else if (this._progress > this._items.length - 1) {
            this.emit('finish-all-quotes', this._quotesBlocks);
        } else {
            wikiquote.getQuotes(this._items[this._progress].page, {
                url: this._items[this._progress].urlRoot
            });
            wikiquote.once('all-quotes-complete', this._processItems.bind(this, this._items[this._progress], 'done_' + this._progress));
            wikiquote.once('error', this._processItems.bind(this, this._items[this._progress], 'error_' + this._progress));
            this._progress++;
        }
    }

    _resoveItems() {
        var i = 0,
            x = 0,
            quotes;

        for (i in this._quotesBlocks) {
            quotes = this._quotesBlocks[i].quotes;
            for (x in quotes) {
                if (quotes[x].urlRoot) {
                    this._items.push(quotes[x]);
                }
            }
        }
        //this._items.splice(0, 22);
        //console.log('[QuoteProcessor] ITEMS : ');
        //this._items.map(function(obj) { console.log(obj.page); });
    }

}


module.exports = {
    create: function(options) {
        return new QuoteProcessor(options);
    }
};

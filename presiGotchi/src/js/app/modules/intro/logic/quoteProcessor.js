/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/

'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var wikiquote = require('utils/wikiQuotes').create();

function QuoteProcessor(options) {
    this._options = options;
    this.emiter = {};
    this._items = [];
    this._progress = 0;
    this._quotesBlocks = {};
    _.extend(this.emiter, Backbone.Events);
}

QuoteProcessor.prototype.process = function(quotesBlocks) {
    this._quotesBlocks = quotesBlocks;
    var quotesBlocksResolved;
    try {
        quotesBlocksResolved = JSON.parse(window.localStorage.getItem('quotesBlocks'));
    } catch(e) {
        quotesBlocksResolved = null;
    }
    if (quotesBlocksResolved !== null) {
        var QuotesCollection = require('models/quotesCollection').self;
        quotesBlocksResolved = new QuotesCollection(quotesBlocksResolved);
        this._quotesBlocks = quotesBlocksResolved;
        this.emiter.trigger('finish-all-quotes');
    }
    window.setTimeout(this._processQuotes.bind(this), 5);
};

QuoteProcessor.prototype._processQuotes = function() {
    this._resoveItems();
    this._processItems();
};

QuoteProcessor.prototype._processItems = function(el, who, quotes) {
    wikiquote.emiter.off();
    if (quotes) {
        el.texts = quotes;
    }
    if (this._items.length === 0) {
        this.emiter.trigger('error-quotes');
    } else if (this._progress > this._items.length - 1) {
        window.localStorage.setItem('quotesBlocks', JSON.stringify(this._quotesBlocks));
        this.emiter.trigger('finish-all-quotes');
    } else {
        wikiquote.getQuotes(this._items[this._progress].page, {
            url: this._items[this._progress].urlRoot
        });
        wikiquote.emiter.once('all-quotes-complete', this._processItems.bind(this, this._items[this._progress], 'done_' + this._progress));
        wikiquote.emiter.once('error', this._processItems.bind(this, this._items[this._progress], 'error_' + this._progress));
        this._progress++;
    }
};

QuoteProcessor.prototype._resoveItems = function() {
    var i = 0,
        x = 0,
        quotes;

    for (i in this._quotesBlocks.models) {
        quotes = this._quotesBlocks.models[i].get('quotes');
        for (x in quotes) {
            if (quotes[x].urlRoot) {
                this._items.push(quotes[x]);
            }
        }
    }
    //this._items.splice(0, 22);
    //console.log('[QuoteProcessor] ITEMS : ');
    //this._items.map(function(obj) { console.log(obj.page); });
};


module.exports = {
    create: function(options) {
        return new QuoteProcessor(options);
    }
};

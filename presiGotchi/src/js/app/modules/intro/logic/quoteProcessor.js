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
    _.extend(this.emiter, Backbone.Events);
}

QuoteProcessor.prototype.process = function(quotesBlocks) {
    window.setTimeout(this._processQuotes.bind(this, quotesBlocks), 5);
};

QuoteProcessor.prototype._processQuotes = function(quotesBlocks) {
    this._resoveItems(quotesBlocks);
    this._processItems();
};

QuoteProcessor.prototype._processItems = function(el, quotes) {
    if (quotes) {
        el.texts = quotes;
    }
    if (this._items.length === 0) {
        this.emiter.trigger('error-quotes');
    } else if (this._progress === this._items.length - 1) {
        this.emiter.trigger('finish-all-quotes');
    } else {
        wikiquote.getAllQuotes(this._items[this._progress].page, {
            url: this._items[this._progress].urlRoot
        });
        wikiquote.emiter.once('all-quotes-complete', this._processItems.bind(this, this._items[this._progress]));
        wikiquote.emiter.once('error', this._processItems.bind(this, this._items[this._progress]));
        this._progress++;
    }
};

QuoteProcessor.prototype._resoveItems = function(quotesBlocks) {
    var i = 0,
        x = 0,
        quotes;

    for (i in quotesBlocks.models) {
        quotes = quotesBlocks.models[i].get('quotes');
        for (x in quotes) {
            if (quotes[x].urlRoot) {
                this._items.push(quotes[x]);
            }
        }
    }
};


module.exports = {
    create: function(options) {
        return new QuoteProcessor(options);
    }
};

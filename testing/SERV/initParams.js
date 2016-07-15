/*global define, module, require, Config, global, console, options, dbManager, window*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const EventEmitter = require('events');

class InitParams extends EventEmitter {
    constructor(options) {
        super();
        this.options = options || {};
        this._quotesModels = null;
    }

    test() {
        var self = this;
        var request = require('request');
        var requestOptions = {
            url: "https://es.wikiquote.org/w/api.php",
            qs: {
                format: "json",
                action: "query",
                redirects: "",
                titles: "Buda_Gautama"
            }
        };

        request(requestOptions, function(error, response, body) {
            var pageid = -1;
            if (!error && response.statusCode == 200) {
                console.log('[WikiQuote queryTitles] ');
                console.log('ERROR: ' + JSON.stringify(error, null, '\t'));
                console.log('RESPONSE: ' + JSON.stringify(response, null, '\t'));
                console.log('BODY: ' + JSON.stringify(body, null, '\t'));
                var pages = body.pages;
                for (var p in pages) {
                    var page = pages[p];
                    // api can return invalid recrods, these are marked as "missing"
                    if (!("missing" in page)) {
                        pageid = page.pageid;
                        break;
                    }
                }
                if (pageid > 0) {
                    console.log('[WikiQuote queryTitles]         TITLE: "' + body.pages[pageid].title + '" Pageid : ' + pageid);
                    self.emit('test-finish', pageid, {
                        url: options.url
                    });
                } else {
                    console.error('[WikiQuote queryTitles]         TITLE: "' + body.pages[pageid].title + '" Pageid : ' + pageid);
                    self.emit('test-finish', null);
                }
            } else {
                console.error('[WikiQuote queryTitles] Error de conexion');
                self.emit('test-finish', null);
            }
        });
    }

    run() {
        this._preProcessing().once('finish-all-quotes', function(quotesBlocks) {
            this._quotesModels = quotesBlocks;
        }, this);
    }

    _preProcessing() {
        let quoteProcessor = require('./quoteProcessor').create();
        quoteProcessor.process();
        return quoteProcessor;
    }


}

module.exports = {
    create: function(options) {
        return new InitParams(options);
    }
};

/*global define, module, require, console*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const EventEmitter = require('events');
const Request = require('request');
const $ = require('cheerio');

class WikiQuote extends EventEmitter {
    constructor(options) {
        super();
        this.options = options || {};
        this._localEmiter = new EventEmitter();

    }

    getQuotes(titles, options) {
        this._localEmiter.once('pageid-complete', function(pageid, options) {
            this._getSectionsForPage(pageid, options);
        }.bind(this));

        this._localEmiter.once('sections-complete', function(pageid, sections, options) {
            options.index = 0;
            this._extractQuotes(pageid, sections, options);
        }.bind(this));

        this._queryTitles(titles, options);
    }

    _extractQuotes(pageid, sections, options, allQuotes) {
        if (options.index > sections.length - 1) {
            this.emit('all-quotes-complete', allQuotes);
        } else {
            this._getQuotesForSection(pageid, sections[options.index], options);
            options.index++;
            this._localEmiter.once('quotes-complete', this._extractQuotes.bind(this, pageid, sections, options));
        }
    }

    _queryTitles(titles, options) {
        var requestOptions = {
            url: options.url || this.options.url,
            qs: {
                format: "json",
                action: "query",
                redirects: "",
                titles: titles
            }
        };

        Request(requestOptions, function(error, response, body) {
            var pageid = -1;
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                var pages = body.query.pages;
                for (var p in pages) {
                    var page = pages[p];
                    // api can return invalid recrods, these are marked as "missing"
                    if (!("missing" in page)) {
                        pageid = page.pageid;
                        break;
                    }
                }
                if (pageid > 0) {
                    console.log('[WikiQuote queryTitles]         TITLE: "' + body.query.pages[pageid].title + '" Pageid : ' + pageid);
                    this._localEmiter.emit('pageid-complete', pageid, {
                        url: options.url
                    });
                } else {
                    console.error('[WikiQuote queryTitles] Pageid : ' + pageid);
                    this._localEmiter.emit('error', null);
                }
            } else {
                console.error('[WikiQuote queryTitles] Error de conexion');
                this._localEmiter.emit('error', null);
            }
        }.bind(this));
    }

    _getSectionsForPage(pageid, options) {
        Request({
                method: 'GET',
                url: options.url || this.options.url,
                qs: {
                    format: "json",
                    action: "parse",
                    prop: "sections",
                    'pageid': pageid
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    var sectionArray = [];
                    var sections = body.parse.sections;
                    for (var s in sections) {
                        var splitNum = sections[s].number.split('.');
                        if (splitNum.length > 1 && splitNum[0] === "1") {
                            sectionArray.push(sections[s].index);
                        }
                    }
                    // Use section 1 if there are no "1.x" sections
                    if (sectionArray.length === 0) {
                        sectionArray.push("1");
                    }
                    console.log('[WikiQuote getSectionsForPage]  TITLE: "' + body.parse.title + '" Sections : ' + JSON.stringify(sectionArray));
                    this._localEmiter.emit('sections-complete', pageid, sectionArray, options);
                }
            }.bind(this))
            .on('aborted', function() {
                console.error("[WikiQuote queryTitles] Error processing your query");
                this._localEmiter.emit('pageid-error');
            }.bind(this));
    }

    _getQuotesForSection(pageid, sectionIndex, options) {
        Request({
                method: 'GET',
                url: options.url || this.options.url,
                qs: {
                    format: "json",
                    action: "parse",
                    noimages: "",
                    'pageid': pageid,
                    section: sectionIndex
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    var quotes = body.parse.text["*"];
                    var quoteArray = [];

                    // Find top level <li> only
                    var $lis = $(quotes).find('li:not(li li)');
                    $lis.each(function() {
                        // Remove all children that aren't <b>
                        $(this).children().remove(':not(b)');
                        var $bolds = $(this).find('b');

                        // If the section has bold text, use it.  Otherwise pull the plain text.
                        if ($bolds.length > 0) {
                            quoteArray.push($bolds.html());
                        } else {
                            quoteArray.push($(this).html());
                        }
                    });
                    console.log('[WikiQuote getQuotesForSection] TITLE: "' + body.parse.displaytitle + '" Num Quotes : ' + quoteArray.length + ' Secction : ' + sectionIndex);
                    this._localEmiter.emit('quotes-complete', quoteArray);
                    //console.log(JSON.stringify(quoteArray, null, '\t'));
                }
            }.bind(this))
            .on('aborted', function() {
                console.error("[WikiQuote queryTitles] Error processing your query");
                this._localEmiter.emit('pageid-error');
            }.bind(this));
    }
}

module.exports = {
    create: function(options) {
        return new WikiQuote(options);
    }

};

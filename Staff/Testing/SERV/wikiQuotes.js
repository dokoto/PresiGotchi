/*global define, module, require, console*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const EventEmitter = require('events');
var request = require('request');
var $ = require('cheerio');

class WikiQuote extends EventEmitter {
    constructor(options) {
        super();
        this.options = options || {};

    }

    getQuotes(titles, options) {
        this.emit('pageid-complete', function(pageid, options) {
            this._getSectionsForPage(pageid, options);
        }, this);

        this.emit('sections-complete', function(pageid, sections, options) {
            options.index = 0;
            this._extractQuotes(pageid, sections, options);
        }, this);

        this._queryTitles(titles, options);
    }

    _extractQuotes(pageid, sections, options, allQuotes) {
        if (options.index > sections.length - 1) {
            this.emit('all-quotes-complete', allQuotes);
        } else {
            this._getQuotesForSection(pageid, sections[options.index], options);
            options.index++;
            this.emit('quotes-complete', this._extractQuotes.bind(this, pageid, sections, options));
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
                    this.emit('pageid-complete', pageid, {
                        url: options.url
                    });
                } else {
                    console.error('[WikiQuote queryTitles]         TITLE: "' + body.pages[pageid].title + '" Pageid : ' + pageid);
                    this.emit('error', null);
                }
            } else {
                console.error('[WikiQuote queryTitles] Error de conexion');
                this.emit('error', null);
            }
        });
    }

    _getSectionsForPage(pageid, options) {
        request({
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
                    var sectionArray = [];
                    var sections = body.sections;
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
                    console.log('[WikiQuote getSectionsForPage]  TITLE: "' + body.title + '" Sections : ' + JSON.stringify(sectionArray));
                    this.emit('sections-complete', pageid, sectionArray, options);
                }
            })
            .on('aborted', function() {
                console.error("[WikiQuote queryTitles] Error processing your query");
                this.emit('pageid-error');
            });
    }

    _getQuotesForSection(pageid, sectionIndex, options) {
        request({
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
                    var quotes = body.text["*"];
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
                    console.log('[WikiQuote getQuotesForSection] TITLE: "' + body.displaytitle + '" Num Quotes : ' + quoteArray.length + ' Secction : ' + sectionIndex);
                    this.emit('quotes-complete', quoteArray);
                    //console.log(JSON.stringify(quoteArray, null, '\t'));
                }
            })
            .on('aborted', function() {
                console.error("[WikiQuote queryTitles] Error processing your query");
                this.emit('pageid-error');
            });
    }
}

module.exports = {
    create: function(options) {
        return new WikiQuote(options);
    }

};

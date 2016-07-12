/*global define, module, require, window, document, $, Gotchi, console*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

function WikiQuote(options) {
    this.options = options || {};
    this.emiter = {};
    _.extend(this.emiter, Backbone.Events);
}

WikiQuote.prototype.queryTitles = function(titles, options) {
    var self = this;
    $.ajax({
        url: options.url || this.options.url,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "query",
            redirects: "",
            titles: titles
        },

        success: function(result) {
            var pages = result.query.pages;
            var pageid = -1;
            for (var p in pages) {
                var page = pages[p];
                // api can return invalid recrods, these are marked as "missing"
                if (!("missing" in page)) {
                    pageid = page.pageid;
                    break;
                }
            }
            if (pageid > 0) {
                console.log('[WikiQuote queryTitles]         TITLE: "' + result.query.pages[pageid].title + '" Pageid : ' + pageid);
                this.emiter.trigger('pageid-complete', pageid, {
                    url: options.url
                });
            } else {
                console.error('[WikiQuote queryTitles]         TITLE: "' + result.query.pages[pageid].title + '" Pageid : ' + pageid);
                this.emiter.trigger('error', null);
            }
        }.bind(this),

        error: function(xhr, result, status) {
            console.error("[WikiQuote queryTitles] Error processing your query");
            self.emiter.trigger('pageid-error');
        }
    });
};


WikiQuote.prototype.getSectionsForPage = function(pageid, options) {
    var self = this;
    $.ajax({
        url: options.url || this.options.url,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "parse",
            prop: "sections",
            'pageid': pageid
        },

        success: function(pageid, options, result) {
            var sectionArray = [];
            var sections = result.parse.sections;
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
            console.log('[WikiQuote getSectionsForPage]  TITLE: "' + result.parse.title + '" Sections : ' + JSON.stringify(sectionArray));
            self.emiter.trigger('sections-complete', pageid, sectionArray, options);
        }.bind(this, pageid, options),
        error: function(xhr, result, status) {
            console.error('[WikiQuote getSectionsForPage]  TITLE: "' + result.parse.title);
            self.emiter.trigger('error');
        }
    });
};

WikiQuote.prototype.getQuotesForSection = function(pageid, sectionIndex, options) {
    var self = this;
    $.ajax({
        url: options.url || this.options.url,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "parse",
            noimages: "",
            'pageid': pageid,
            section: sectionIndex
        },

        success: function(options, result) {
            var quotes = result.parse.text["*"];
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
            console.log('[WikiQuote getQuotesForSection] TITLE: "' + result.parse.displaytitle + '" Num Quotes : ' + quoteArray.length + ' Secction : ' + sectionIndex);
            self.emiter.trigger('quotes-complete', quoteArray);
            //console.log(JSON.stringify(quoteArray, null, '\t'));
        }.bind(this, options),
        error: function(xhr, result, status) {
            console.error('[WikiQuote getQuotesForSection] TITLE: "' + result.parse.displaytitle);
            self.emiter.trigger('error');
        }
    });
};

WikiQuote.prototype.getQuotes = function(titles, options) {
    this.emiter.once('pageid-complete', function(pageid, options) {
        this.getSectionsForPage(pageid, options);
    }, this);

    this.emiter.once('sections-complete', function(pageid, sections, options) {
        options.index = 0;
        this._extractQuotes(pageid, sections, options);
    }, this);

    this.queryTitles(titles, options);
};

WikiQuote.prototype._extractQuotes = function(pageid, sections, options, allQuotes) {
    if (options.index > sections.length - 1) {
        this.emiter.trigger('all-quotes-complete', allQuotes);
    } else {
        this.getQuotesForSection(pageid, sections[options.index], options);
        options.index++;
        this.emiter.once('quotes-complete', this._extractQuotes.bind(this, pageid, sections, options));
    }
};

module.exports = {
    create: function(options) {
        return new WikiQuote(options);
    }
};

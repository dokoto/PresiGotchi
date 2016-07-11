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
                console.log('[WikiQuote queryTitles] Pageid : ' + pageid + ' title: ' + result.query.pages[pageid].title);
                this.emiter.trigger('pageid-complete', pageid, {url: options.url});
            } else {
                this.emiter.trigger('error');
                console.log('[WikiQuote queryTitles] No results');
            }
        }.bind(this),

        error: function(xhr, result, status) {
            self.emiter.trigger('pageid-error');
            console.error("[WikiQuote queryTitles] Error processing your query");
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
            console.log('[WikiQuote getSectionsForPage] Title: "' + result.parse.displaytitle + '" Sections : ' + JSON.stringify(sectionArray));
            self.emiter.trigger('sections-complete', pageid, sectionArray, options);
        }.bind(this, pageid, options),
        error: function(xhr, result, status) {
            console.error("[WikiQuote getSectionsForPage] Error processing your query");
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
            console.log('[WikiQuote getQuotesForSection] Title: "' + result.parse.displaytitle + '" Num Quotes : ' + quoteArray.length);
            self.emiter.trigger('quotes-complete', quoteArray);
            //console.log(JSON.stringify(quoteArray, null, '\t'));
        }.bind(this, options),
        error: function(xhr, result, status) {
            console.error("[WikiQuote getQuotesForSection] Error processing your query");
            self.emiter.trigger('error');
        }
    });
};

WikiQuote.prototype.getAllQuotes = function(titles, options) {
    options = options || {};
    var allQuotes = [],
        sectionsLength = 0;

    this.emiter.on('pageid-complete', function(pageid, options) {
        this.getSectionsForPage(pageid, options);
    }, this);

    this.emiter.on('sections-complete', function(pageid, sections, options) {
        sectionsLength = sections.length;
        sections.forEach(function(value, index, array) {
            this.getQuotesForSection(pageid, value, options);
        }, this);
    }, this);

    this.emiter.on('quotes-complete', function(quotes) {
        sectionsLength--;
        allQuotes.push(quotes);
        if (0 === sectionsLength) {
            this.emiter.trigger('all-quotes-complete', allQuotes);
        }
    }, this);

    this.queryTitles(titles, options);
};

module.exports = {
    create: function(options) {
        return new WikiQuote(options);
    }
};

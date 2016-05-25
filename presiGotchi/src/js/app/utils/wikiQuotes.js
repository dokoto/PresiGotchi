/*global define, module, require, window, document, $, Gotchi, console*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

function WikiQuote(options) {
    this.options = options || {};
}

WikiQuote.prototype.queryTitles = function(titles) {
    $.ajax({
        url: this.options.url,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "query",
            redirects: "",
            titles: titles
        },

        success: function(result, status) {
            var pages = result.query.pages;
            var pageId = -1;
            for (var p in pages) {
                var page = pages[p];
                // api can return invalid recrods, these are marked as "missing"
                if (!("missing" in page)) {
                    pageId = page.pageid;
                    break;
                }
            }
            if (pageId > 0) {
                console.log('[WikiQuote queryTitles] Pageid : ' + pageId);
                this.trigger('pageid-complete', pageId);
            } else {
                this.trigger('pageid-error');
                console.log('[WikiQuote queryTitles] No results');
            }
        },

        error: function(xhr, result, status) {
            this.trigger('pageid-error');
            console.error("[WikiQuote queryTitles] Error processing your query");
        }
    });
};


WikiQuote.prototype.getSectionsForPage = function(pageId) {
    $.ajax({
        url: this.options.url,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "parse",
            prop: "sections",
            pageid: pageId
        },

        success: function(result, status) {
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
            console.log('[WikiQuote getSectionsForPage] Sections : ' + JSON.stringify(sectionArray));
            this.trigger('sections-complete', sectionArray);
        },
        error: function(xhr, result, status) {
            console.error("[WikiQuote getSectionsForPage] Error processing your query");
            this.trigger('sections-error');
        }
    });
};

WikiQuote.prototype.getQuotesForSection = function(pageId, sectionIndex) {
    $.ajax({
        url: this.options.url,
        dataType: "jsonp",
        data: {
            format: "json",
            action: "parse",
            noimages: "",
            pageid: pageId,
            section: sectionIndex
        },

        success: function(result, status) {
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
            console.log('[getQuotesForSection getSectionsForPage] Quotes : ' + quoteArray.length);
            this.trigger('quotes-complete', quoteArray);
            console.log(JSON.stringify(quoteArray, null, '\t'));
        },
        error: function(xhr, result, status) {
            console.error("[getQuotesForSection getSectionsForPage] Error processing your query");
            this.trigger('quotes-error');
        }
    });
};

WikiQuote.prototype.getAllQuotes = function(titles) {
    var allQuotes = [],
        sectionsLength = 0;

    this.on('pageid-complete', function(pageid) {
        this.getSectionsForPage(pageid);
    });

    this.on('sections-complete', function(sections) {
        sectionsLength = sections.length;
        sections.forEach(function(value, index, array) {
            this.getQuotesForSection(value);
        }).bind(this);
    });

    this.on('quotes-complete', function(quotes) {
        sectionsLength--;
        allQuotes.push(quotes);
        if (0 === sectionsLength) {
            this.trigger('all-quotes-complete', allQuotes);
        }
    });

    this.queryTitles(titles);
};

_.extend(WikiQuote, Backbone.Events);


module.exports = {
    create: function(options) {
        return new WikiQuote(options);
    }
};

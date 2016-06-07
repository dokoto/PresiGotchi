/*global define, module, require, $*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var template = require('./templates/intro.html');
var baseParams = require('json!../../config/baseParams.json');

var View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    events: {
        'click #intro-container': 'gotoMain'
    },
    render: function() {
        this.$el.html(this.template({
            title: baseParams.appName,
            message: 'Press screen to continue ',
            loadingMsg: 'Loading ....... 0%'
        }));
        this.trigger('intro:render:finish');
        return this;
    },
    gotoMain: function(e) {
        if ($('#intro-container').data('enable-click') === 'true') {
            this.trigger('intro:gotomain');
        }
    }
});

module.exports = {
    create: function(options) {
        return new View();
    }
};

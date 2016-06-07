/*global define, module, require, window, document, $, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var template = require('./templates/selector_menu.html');
var FreewallLib = require('freewall');

var View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    events: {
        'click .selector-menu-item': 'menuHandler'
    },
    render: function(e) {
        this.$el.html(this.template());
        this.setGridLayout();
        return this;
    },
    setGridLayout: function() {
        var wall = new FreewallLib.freewall('#selector-menu-grid');
        wall.reset({
            selector: '.selector-menu-item',
            animate: true,
            cellW: $(window).width() / 3,
            cellH: $(window).width() / 3,
            gutterX: 2,
            gutterY: 2,
            onResize: function() {
                wall.fitWidth();
            }
        });
        wall.fitWidth();
    },
    menuHandler: function(e) {
        Gotchi.selected = Gotchi.gotchiCollection.findWhere({
            name: e.target.id
        });

        var stage = require('modules/stage/stage_router').create();
        stage.navigate('menus/stage/start', {
            trigger: true
        });
    }
});

module.exports = {
    create: function(options) {
        return new View(options.viewOptions);
    }
};

/*global define, module, require, window*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var template = require('./templates/selector_menu.html');
var FreewallLib = require('freewall');
var $ = require('jquery');

var View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    events: {
        'click .selector-menu-item': 'menuHandler'
    },
    render: function(e) {
        this.$el.html(this.template());
        var wall = new FreewallLib.freewall('#selector-menu-grid');
        wall.reset({
          selector: '.selector-menu-item',
          animate: true,
          cellW: 120,
          cellH: 120,
          fixSize: 0,
          gutterY: 3,
          gutterX: 3,
          onResize: function() {
            //wall.fitWidth();
            wall.refresh($(window).width() - 5, $(window).height() - 5);
          }
        });
        //wall.fitWidth();
        wall.fitZone($(window).width() - 5 , $(window).height() - 5);
        return this;
    },
    menuHandler: function(e) {
        switch (e.target.id) {}
    }
});

module.exports = {
    create: function(options) {
        return new View(options.viewOptions);
    }
};

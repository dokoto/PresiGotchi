'use strict';

const Backbone = require('backbone');
const template = require('./templates/selector_menu.html');
const FreewallLib = require('freewall');
const StageRouter = require('modules/stage/stage_router');

let View = Backbone.View.extend({
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
        let wall = new FreewallLib.freewall('#selector-menu-grid');
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
        APP.Gotchi.selected = APP.Gotchi.gotchiCollection.findWhere({
            name: e.target.id
        });

        new StageRouter().navigate('menus/stage/start', {
            trigger: true
        });
    }
});

module.exports = View;

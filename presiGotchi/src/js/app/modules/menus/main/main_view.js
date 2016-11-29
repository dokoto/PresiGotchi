'use strict';

const Backbone = require('backbone');
const template = require('./templates/main_menu.html');

let View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    events: {
        'click .main-menu-item': 'menuHandler'
    },
    render: function(e) {
        this.$el.html(this.template());
        return this;
    },
    menuHandler: function(e) {
        switch (e.target.id) {
            case 'new':
                let configurator = require('modules/menus/configurator/configurator_router').create();
                configurator.navigate('menus/configurator/start', {
                    trigger: true
                });
                break;
            case 'close':
                let intro = require('modules/intro/intro_router').create();
                intro.navigate('intro/start', {
                    trigger: true
                });
                break;
        }
    }
});

module.exports = {
    create: function(options) {
        return new View(options.viewOptions);
    }
};

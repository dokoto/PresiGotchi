'use strict';

const Backbone = require('backbone');
const template = require('./templates/main_menu.html');
const ConfiguratorRouter = require('modules/menus/configurator/configurator_router');
const IntroRouter = require('modules/intro/intro_router');

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
                /*
                    new ConfiguratorRouter().navigate('menus/configurator/start', {
                        trigger: true
                    });
                    */
                const StageRouter = require('modules/stage/stage_router');
                new StageRouter().navigate('stage/engine/start', {
                    trigger: true
                });
                break;
            case 'close':
                new IntroRouter().navigate('intro/start', {
                    trigger: true
                });
                break;
        }
    }
});

module.exports = View;

/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var template = require('./templates/main_menu.html');

var View = Backbone.View.extend({
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
                break;
            case 'close':
                var intro = require('modules/intro/intro_router').create();
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

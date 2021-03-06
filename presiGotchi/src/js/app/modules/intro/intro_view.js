'use strict';

const Backbone = require('backbone');
const template = require('./templates/intro.html');

let View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    events: {
        'click #intro-container': 'gotoMain'
    },
    render: function() {
        this.$el.html(this.template({
            title: APP.consts.NAME,
            message: 'Pulse la pantalla para continuar ',
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

module.exports = View;

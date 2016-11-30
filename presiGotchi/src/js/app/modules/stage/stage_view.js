'use strict';

const Backbone = require('backbone');
const template = require('./templates/stage-base.html');

let View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    render: function() {
        this.$el.html(this.template());
        this.trigger('stage:render:finish');
        return this;
    }
});

module.exports = View;

/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var template = require('./templates/main_menu.html');

var View = Backbone.View.extend({
    el: '#container-region',
    template: template,
    events: {
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = {
    create: function(options) {
        return new View(options.viewOptions);
    }
};

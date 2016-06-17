/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var template_step = require('./templates/configurator_step_menu.html');
var template_block = require('./templates/configurator_block_menu.html');
var template_item = require('./templates/configurator_item_menu.html');

var ViewLayout = Backbone.View.extend({
    el: '#container-region',
    render: function(e) {
        this.$el.empty();
        this.collection.each(function(value, key, list) {
            var viewStep = new ViewStepCollection({
                'model': value
            });
            this.$el.append(viewStep.$el);
            viewStep.render();
        }, this);
        return this;
    }
});

var ViewStepCollection = Backbone.View.extend({
    el: '#container-region',
    template: template_step,
    render: function(e) {
        this.$el.append(this.template());
        _.each(this.model.get('questions'), function(value, key, list) {
            var viewBlock = new ViewBlockCollection({
                'model': value,
                'el': this.$el.children().last()
            });
            this.$el.append(viewBlock.$el);
            viewBlock.render();
        }, this);

        return this;
    }
});

var ViewBlockCollection = Backbone.View.extend({
    template: template_block,
    initialize: function(options) {
        this.setElement(options.el);
    },
    render: function(e) {

        this.$el.append(this.template());
        var viewItem = new ViewItemCollection({
            'model': this.model.responses,
            'el': this.$el.children().last().find('#slider-responses')
        });
        viewItem.render();
        return this;
    }
});

var ViewItemCollection = Backbone.View.extend({
    initialize: function(options) {
        this.setElement(options.el);
    },
    render: function(e) {
        _.each(this.model, function(value, key, list) {
            var viewItem = new ViewItem({
                'model': value,
                'el': this.$el
            });
            this.$el.append(viewItem.$el);
            viewItem.render();
        }, this);
        return this;
    }
});

var ViewItem = Backbone.View.extend({
    initialize: function(options) {
        this.setElement(options.el);
    },
    template: template_item,
    render: function(e) {
        this.$el.append(this.template());
        this.$el.find('.slider-item-background').css("background-image", "url(" + this.model.thumb + ")");
        return this;
    }
});

module.exports = {
    create: function(options) {
        return new ViewLayout(options.viewOptions);
    }
};

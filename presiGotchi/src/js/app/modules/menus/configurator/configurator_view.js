/*global define, module, require, window, $*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var template_step = require('./templates/configurator_step_menu.html');
var template_block = require('./templates/configurator_block_menu.html');
var template_item = require('./templates/configurator_item_menu.html');

var ViewLayout = Backbone.View.extend({
    render: function(e) {
        $('#container-region').empty();
        this.collection.each(function(value, index, list) {
            var viewStep = new ViewStepCollection({
                'model': value
            });            
            $('#container-region').append(viewStep.$el);
            viewStep.render();
            if (index === list.length - 1) {
                this.trigger('menu:configurator:render:finish');
            }
        }, this);

        return this;
    }
});

var ViewStepCollection = Backbone.View.extend({
    el: '#container-region',
    initialize: function(options) {
        this.$el.on('click', function(e) {
            e.preventDefault();
            this.trigger('menu:configurator:nextStep', e);
        }).bind(this);
    },
    template: template_step,
    render: function(e) {
        this.$el.append(this.template());
        _.each(this.model.get('questions'), function(value, index, list) {

            var viewBlock = new ViewBlockCollection({
                'model': value,
                'el': this.$el.children().last().find('#slider-blocks')
            });
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
            'el': this.$el.children().last().find('#slider-responses'),
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
        _.each(this.model, function(value, index, list) {
            var viewItem = new ViewItem({
                'model': value,
                'el': this.$el,
            });
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
    events: {
        'click .slider-item': 'itemSelected'
    },
    itemSelected: function(e) {
        e.preventDefault();
        this.trigger('menu:configurator:itemSelected', e);
    },
    render: function(e) {
        this.$el.append(this.template());
        var height = (window.innerHeight / 3) - this.$el.parent().css('margin-bottom').replace('px', '');
        this.$el.css('height', height);
        this.$el.find('.slider-item-background').last().css("background-image", "url(" + this.model.thumb + ")");
        return this;
    }
});

module.exports = {
    create: function(options) {
        return new ViewLayout(options.viewOptions);
    }
};

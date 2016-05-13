var $ = require('jquery');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var template = require('./template.hbs');

module.exports = function() {
  return Marionette.ItemView.extend({

    template: template,

    serializeData: function() {
      return {
        name: 'world'
      };
    }

  });
};

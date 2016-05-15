var $ = require('jquery');
var Marionette = require('backbone.marionette');
var template = require('./templates/template.html');

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

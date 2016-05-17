var Marionette = require('backbone.marionette');
var template = require('./templates/template.html');

var View = Marionette.ItemView.extend({
  el: '#container-region',
  template: template,

});

module.exports = View;

/*global define, module, require*/
/*jshint globalstrict: true*/

'use strict';

var Backbone = require('backbone');
var template = require('./templates/intro.html');

var View = Backbone.View.extend({
  el: '#container-region',
  template: template,

  render: function() {
   this.$el.html(this.template({name: 'DOKOTOR KING OF METAL'}));
   return this;
 }
});

module.exports =  {
  create: function() {
    return new View();
  }
};

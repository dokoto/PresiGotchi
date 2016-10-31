var Backbone = require('backbone');
var template = require('./templates/template.html');

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

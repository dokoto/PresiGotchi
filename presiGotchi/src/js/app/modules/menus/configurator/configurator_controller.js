/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');

function Controller(options) {}

Controller.prototype.show = function() {
  var view = require('./configurator_view').create({
      'viewOptions': {
          'collection': Gotchi.configuratorCollection
      }
  });
  view.render();
};

module.exports = {
    create: function(options) {
        return new Controller(options);
    }
};
/*global define, module, require, window, Gotchi*/
/*jshint globalstrict: true*/

'use strict';

var Log = require('utils/logger');
var _ = require('underscore');

function Controller(options) {}

Controller.prototype.run = function() {

};
//http://stereobit.github.io/dragend/
//http://stackoverflow.com/questions/18751811/smooth-native-style-swipe-scrolling-with-acceleration-deceleration-on-ios-using
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

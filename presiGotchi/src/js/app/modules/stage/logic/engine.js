/*global define, module, require, window, Gotchi, $*/
/*jshint globalstrict: true*/
/*jshint esversion: 6 */

'use strict';

require('typed-text');

class Engine {
  constructor(options) {
    this._options = options;
  }

  start() {
    $('#block-text').typedText("La casa de pepito ni es suya ni mia ni de nadie, es efimera como el resto de cosas", 100);
  }
}

module.exports = {
    create: function(options) {
        return new Engine(options);
    }
};

'use strict';

require('typed-text');

class Engine {
    constructor(options) {
        super();
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

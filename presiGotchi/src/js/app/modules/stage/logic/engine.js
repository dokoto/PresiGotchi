'use strict';


class Engine {
    constructor(options) {
        this._options = options;
    }

    start() {
        $('#block-text').text("La casa de pepito ni es suya ni mia ni de nadie, es efimera como el resto de cosas");
        $('#block-text').addClass('css-typing');
    }
}

module.exports = Engine;

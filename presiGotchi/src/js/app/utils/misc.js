'use strict';

module.exports = {
    uuid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(match) {
                var randomNibble = Math.random() * 16 | 0;

                var nibble = (match === 'y') ?
                    (randomNibble & 0x3 | 0x8) :
                    randomNibble;

                return nibble.toString(16);
            }
        );
    },

    preLoadImgs: function(images) {
        var Backbone = require('backbone');
        var _ = require('underscore');
        var emiter = {},
            index = 0,
            total = images.length,
            currentIndex = 0,
            image,
            onloadFunc;

        _.extend(emiter, Backbone.Events);
        onloadFunc = function() {
            currentIndex++;
            if (currentIndex === total - 1) {
                emiter.trigger('complete');
            }
        };

        for (index in images) {
            image = new window.Image();
            image.onload = onloadFunc.bind(this);
            image.src = images[index];
        }

        return emiter;
    }
};

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
    cleanText: (text) => {
        text = text.replace(/\"/g, '');
        return text;
    },
    getRandomIntInclusive: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
    },
    time: {
        ms: {
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 86400000,
            week: 604800016,
            month: 2629800000            
        }
    }
};

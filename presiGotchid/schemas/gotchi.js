'use strict';

//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
  email: { type: [String], index: true },
  name: { type: [String], index: true },
  spriteSheet: {
    imagePath: String,
    boxSize: {
      width: Number,
      height: Number
    },
    position: {
      x: Number,
      y: Number
    },
    frames: Number
  },
  actions: {
    WAITING: String
  },
  states: {
    HUNGRY: {
      live: {
        status: Number,
        top: Number,
        bottom: Number,
        decrease: Number
      },
      time: {
        interval: Number,
        elapsed: Number
      }
    },
    THIRSTY: {
      live: {
        status: Number,
        top: Number,
        bottom: Number,
        decrease: Number
      },
      time: {
        interval: Number,
        elapsed: Number
      }
    },
    SLEEPY: {
      live: {
        status: Number,
        top: Number,
        bottom: Number,
        decrease: Number
      },
      time: {
        interval: Number,
        elapsed: Number
      }
    }
  }
};


module.exports = {
  create: function() {
    return new new Schema(schema);
  }
};

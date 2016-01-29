'use strict';

//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
  email: {
    type: String,
    trim: true,
    index: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    trim: true,
    index: true
  },
  country: {
    type: String,
    trim: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    index: true,
    enum: ['POLITICIANS', 'DICTATORS', 'CELEBRITIES', 'RELIGIOUS'],
    default: 'POLITICIANS'
  },
  isDead: {
    type: Boolean,
    required: true,
    index: true
  },
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
    var retSchema =  new Schema(schema);
    retSchema.index({email: 1, name: 1}, {unique: true});
    retSchema.set('autoIndex', false );

    return retSchema;
  }
};

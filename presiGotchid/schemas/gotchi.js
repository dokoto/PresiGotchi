//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
  email: {
    type: String,
    trim: true,
    index: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    default: ''
  },
  name: {
    type: String,
    trim: true,
    index: true,
    default: ''
  },
  country: {
    type: String,
    trim: true,
    index: true,
    default: ''
  },
  description: {
    type: String
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
    index: true,
    default: false
  },
  thumb: {
    height: {
      type: Number,
      default: 0.0
    },
    width: {
      type: Number,
      default: 0.0
    },
    url: {
      type: String,
      default: ''
    },
    credit: {
      type: String,
      default: ''
    }
  },
  spriteSheet: {
    imagePath: {
      type: String,
      default: ''
    },
    boxSize: {
      width: {
        type: Number,
        default: 0.0
      },
      height: {
        type: Number,
        default: 0.0
      }
    },
    position: {
      x: {
        type: Number,
        default: 0.0
      },
      y: {
        type: Number,
        default: 0.0
      }
    },
    frames: {
      type: Number,
      default: 0.0
    }
  },
  actions: {
    WAITING: {
      type: String,
      default: ''
    }
  },
  states: {
    HUNGRY: {
      live: {
        status: {
          type: Number,
          default: 0.0
        },
        top: {
          type: Number,
          default: 0.0
        },
        bottom: {
          type: Number,
          default: 0.0
        },
        decrease: {
          type: Number,
          default: 0.0
        }
      },
      time: {
        interval: {
          type: Number,
          default: 0.0
        },
        elapsed: {
          type: Number,
          default: 0.0
        }
      }
    },
    THIRSTY: {
      live: {
        status: {
          type: Number,
          default: 0.0
        },
        top: {
          type: Number,
          default: 0.0
        },
        bottom: {
          type: Number,
          default: 0.0
        },
        decrease: {
          type: Number,
          default: 0.0
        }
      },
      time: {
        interval: {
          type: Number,
          default: 0.0
        },
        elapsed: {
          type: Number,
          default: 0.0
        }
      }
    },
    SLEEPY: {
      live: {
        status: {
          type: Number,
          default: 0.0
        },
        top: {
          type: Number,
          default: 0.0
        },
        bottom: {
          type: Number,
          default: 0.0
        },
        decrease: {
          type: Number,
          default: 0.0
        }
      },
      time: {
        interval: {
          type: Number,
          default: 0.0
        },
        elapsed: {
          type: Number,
          default: 0.0
        }
      }
    }
  }
  };


  module.exports = {
      create: function() {
          var retSchema = new Schema(schema);
          retSchema.index({
              email: 1,
              name: 1
          }, {
              unique: true
          });
          retSchema.set('autoIndex', false);

          return retSchema;
      }
  };

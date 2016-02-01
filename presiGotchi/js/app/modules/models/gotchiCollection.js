define(['./base/containerBase'], function(containerBase) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  /*
  {
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
  }
 */
  //*****************************************************
  // PUBLIC
  //*****************************************************
  var Gotchi = (function() {
    function gotchi() {
      containerBase.this.call(this);
    }

    // No hay problema con la comparticion de memoria de "_model" ya que baseModel
    // clona el objeto es si mismo. "_model" solo se usa como patron de estructura
    // no para contener datos, los datos se continene por instancia dentro de baseModel
    gotchi.prototype = containerBase.create();
    gotchi.prototype.constructor = gotchi;

    return gotchi;

  })();


  return {
    create: function() {
      return new Gotchi();
    },
    this: Gotchi

  };

});

define(['./base/containerBase'], function(containerBase) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  /*
  {
    name: 'presiGotchi',
    spriteSheet: {
      imagePath: 'assets/images/sprites/presiGotchi_temp_vec.png',
      boxSize: {
        width: 27,
        height: 28
      },
      position: {
        x: 0,
        y: 0
      },
      frames: 6
    },
    actions: {
      WAITING: 'WAITING'
    },
    states: {
      HUNGRY: {
        live: {
          status: 0.0,
          top: 100.0,
          bottom: 0.0,
          decrease: 120.0
        },
        time: {
          interval: 120 * 1000,
          elapsed: 0.0
        }
      },
      THIRSTY: {
        live: {
          status: 0.0,
          top: 100.0,
          bottom: 0.0,
          decrease: 30.0
        },
        time: {
          interval: 20 * 1000,
          elapsed: 0.0
        }
      },
      SLEEPY: {
        live: {
          status: 0.0,
          top: 100.0,
          bottom: 0.0,
          decrease: 50.0
        },
        time: {
          interval: 480 * 1000,
          elapsed: 0.0
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

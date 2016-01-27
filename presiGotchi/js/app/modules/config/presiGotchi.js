define([], function(Phaser, $, Logger) {

  var config = {
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
  };

  return {
    config: config
  };

});

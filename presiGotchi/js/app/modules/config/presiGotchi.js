define([], function (Phaser, $, Logger) {

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
          decrease: 20,0
        },
        time: {}
      },
      THIRSTY: {},
      SLEEPY: {}
    },
    states: {
      HUNGRY: 'HUNGRY',
      THIRSTY: 'THIRSTY',
      SLEEPY: 'SLEEPY'
    },
    live: {
      status: {},
      consts: {
        top: {
          HUNGRY: 100.0,
          THIRSTY: 100.0,
          SLEEPY: 100.0
        },
        bottom: {
          HUNGRY: 0.0,
          THIRSTY: 0.0,
          SLEEPY: 0.0
        },
        decrease:{
          HUNGRY: 30.0,
          THIRSTY: 50.0,
          SLEEPY: 20.0
        }
      }
    },
    times: {
      consts: { // milliseconds
        HUNGRY: 120*1000,
        THIRSTY: 20*1000,
        SLEEPY: 480*1000
      },
      elapsed: {
        HUNGRY: 0.0,
        THIRSTY: 0.0,
        SLEEPY: 0.0
      }
    }
  };

    return  {
        config: config
    };

});

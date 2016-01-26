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
      HUNGRY: 'HUNGRY',
      THIRSTY: 'THIRSTY',
      SLEEPY: 'SLEEPY'
    },
    liveStatusTop : 100,
    liveStatus: {
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

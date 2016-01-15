define(['jquery', 'underscore', 'backbone', 'modules/helpers/Logger', './TestView'], function ($, _, Backbone, Logger, TestView) {

    'use strict';

    var controllerEvents = {};
    var constructor = function () {
        controllerEvents = {};
        _.extend(controllerEvents, Backbone.Events);
        controllerEvents.on({
            'test:handle:start': test.start
        });
    };

    var test = {
        intervals: {
            hungry: null,
            thirsty: null,
            sleepy: null
        },
        start: function () {
            constructor();
            if (test.checkLocalStorage()) {
                TestView.init(controllerEvents);                
                test.vitalSigns.datas = test.vitalSigns.load();
                TestView.drawAcid(test.vitalSigns.datas.thirsty, true);
                TestView.status(test.vitalSigns);
                TestView.activateControls(test.vitalSigns);

                Logger.MSG_DESP('Init hungry checker at 4 seconds');
                test.intervals.hungry = setInterval(test.check.hungry, 4000);

                Logger.MSG_DESP('Init thirsty checker at 4,1 seconds');
                test.intervals.thirsty = setInterval(test.check.thirsty, 4100);

                Logger.MSG_DESP('Init sleppy checker at 5 seconds');
                test.intervals.sleepy = setInterval(test.check.sleepy, 5000);
            }
        },        
        check: {
            hungry: function () {
                clearInterval(test.intervals.hungry);
                Logger.MSG_DESP('Checking hungry status');
                Logger.MSG_DESP('hungry status is : ' + test.vitalSigns.datas.hungry);
                test.vitalSigns.datas.hungry -= 5;

                if (test.vitalSigns.datas.hungry <= 0) {
                    clearInterval(test.intervals.thirsty);
                    clearInterval(test.intervals.sleepy);
                    TestView.removeControls();
                    Logger.ERROR_H3('Your fucking tamagotchi is death for hungry');
                    TestView.drawAcid(100, false);
                    TestView.death('Your fucking tamagotchi is death for hungry');
                }
                else {
                    Logger.MSG_DESP('RE-Init hungry checker at 4 seconds');
                    test.intervals.hungry = setInterval(test.check.hungry, 4000);
                    TestView.drawAcid(test.vitalSigns.datas.thirsty, true);                    
                }
                TestView.status(test.vitalSigns);
            },
            thirsty: function () {
                clearInterval(test.intervals.thirsty);
                Logger.MSG_DESP('Checking thirsty status');
                Logger.MSG_DESP('thirsty status is : ' + test.vitalSigns.datas.thirsty);
                test.vitalSigns.datas.thirsty -= 20;

                if (test.vitalSigns.datas.thirsty <= 0) {
                    clearInterval(test.intervals.hungry);
                    clearInterval(test.intervals.sleepy);
                    TestView.removeControls();
                    Logger.ERROR_H3('Your fucking tamagotchi is death for thirsty');
                    TestView.drawAcid(100, false);
                    TestView.death('Your fucking tamagotchi is death for thirsty');                    
                }
                else {
                    Logger.MSG_DESP('RE-Init thirsty checker at 4,1 seconds');
                    TestView.drawAcid(test.vitalSigns.datas.thirsty, true);
                    test.intervals.thirsty = setInterval(test.check.thirsty, 4100);                    
                }
                TestView.status(test.vitalSigns);                
            },
            sleepy: function () {
                clearInterval(test.intervals.sleepy);
                Logger.MSG_DESP('Checking sleepy status');
                Logger.MSG_DESP('sleepy status is : ' + test.vitalSigns.datas.sleepy);
                test.vitalSigns.datas.sleepy -= 2;

                if (test.vitalSigns.datas.sleepy <= 0) {
                    clearInterval(test.intervals.hungry);
                    clearInterval(test.intervals.thirsty);
                    TestView.removeControls();
                    Logger.ERROR_H3('Your fucking tamagotchi is death for sleepy');
                    TestView.drawAcid(100, false);
                    TestView.death('Your fucking tamagotchi is death for sleepy');
                }
                else {
                    Logger.MSG_DESP('RE-Init sleppy checker at 5 seconds');
                    TestView.status(test.vitalSigns);
                    test.intervals.sleepy = setInterval(test.check.sleepy, 5000);
                }
                TestView.status(test.vitalSigns);
            }
        },
        vitalSigns: {
            datas: {
                hungry: 0,
                thirsty: 0,
                sleepy: 0
            },
            defaults: {
                hungry: 100,
                thirsty: 100,
                sleepy: 100
            },
            load: function () {
                if (window.localStorage.tamagotchi) {
                    Logger.MSG_DESP('Vital Signs loaded from localStorage');
                    return window.localStorage.tamagotchi.vitalSigns;
                }
                else {
                    Logger.ERROR_DESP('No vitalSigns created, returning default');
                    return test.vitalSigns.defaults;
                }
            },
            save: function (vitalSigns) {
                Logger.MSG_DESP('Vital Signs saved to localStorage');
                window.localStorage.setItem('vitalSigns', vitalSigns);
            }
        },
        checkLocalStorage: function () {
            if (typeof (window.localStorage) !== "undefined") {
                Logger.MSG_DESP('Detected LocalStorage support');
                return true;
            } else {
                Logger.ERROR_DESP('No LocalStorage support');
                return false;
            }
        }


    };

    return {
        start: test.start
    };

});


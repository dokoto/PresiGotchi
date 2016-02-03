requirejs.config({
    paths: {
        domReady: '../vendor/domReady/domReady',
        Phaser: '../vendor/phaser/build/phaser.min',
        jquery: '../vendor/jquery/dist/jquery.min',
        hammer: '../vendor/hammer/hammer.min',
        freewall: '../vendor/freewall/freewall',
        underscore: '../vendor/underscore/underscore-min',
        text: '../vendor/text/text'
    },
    shim: {
        hammer: {
            exports: 'Hammer'
        },
        freewall: {
          deps: ['jquery'],
          exports: 'freewall'
        },
        underscore: {
          exports: '_'
        }
    }
});


requirejs.onResourceLoad = function (context, map, depMaps) {
    updateModuleProgress(context, map, depMaps);
};

var updateModuleProgress = function (context, map, depMaps) {
    var console = window.console;
    if (console && console.log) {
        console.log('[LOAD PHASE]  ' + map.name + ' at ' + map.url);
    }
};

require(['jquery', 'domReady'], function ($, domReady) {
    domReady(function () {
        updateModuleProgress = function (context, map, depMaps) {
            var loadingStatusEl = $('#loading-status');
            var loadingModuleNameEl = $('#loading-module-name');
            if (loadingStatusEl && loadingModuleNameEl) {
                loadingStatusEl.innerHTML = loadingStatusEl.innerHTML += '.'; //add one more dot character
                loadingModuleNameEl.innerHTML = map.name + (map.url ? ' at ' + map.url : '');
                console.log('[LOAD PHASE]  ' + map.name + ' at ' + map.url);
            }
        };
    });
});


window.onerror = function(message, file, line, col, error) {
    console.error(message);
    console.error(file + ' linea ' + line + ' - col ' + col);
};



require(['app'], function (PRESIGOTCHI) {

    'use strict';

    PRESIGOTCHI.ajaxConf();
    PRESIGOTCHI.run();

});

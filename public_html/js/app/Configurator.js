requirejs.config({
    paths: {
        domReady: '../vendor/domReady',        
        Phaser: '../vendor/phaser.min',
        jquery: '../vendor/jquery-2.1.3.min',        
        hammer: '../vendor/hammer.min'
    },
    shim: {
        hammer: {
            exports: 'Hammer'
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
    
    PRESIGOTCHI.run();
    
});
'use strict';

module.exports = function (grunt, options) {
  grunt.registerTask('help', function () {

    Log.info.v0('Use : #> grunt [options] [task]');
    Log.info.v0('Ej: #> grunt --os=android --mode=dev --versionApp=0.0.1 --logger=0 build');
    Log.info.v0('Debug Win Ej: #> node-debug C:\\Users\\USER\\AppData\\Roaming\\nvm\\v5.5.0\\node_modules\\grunt-cli\\bin\\grunt --os=android --mode=debug --versionApp=0.0.1 --logger=0 build');
    Log.info.v0('Debug Win Ej: #> node-debug C:\\Users\\USER\\AppData\\Roaming\\npm\\node_modules\\grunt-cli\\bin\\grunt --os=android --mode=debug --versionApp=0.0.1 --logger=0 build');
    Log.info.v0('Debug Win Ej: #> %gruntd% --os=android --mode=dev --versionApp=0.0.1 --logger=0 build');

    Log.info.v0(' ');
    Log.info.v0('[Opciones *:parametro obligatorio] >', 'blue');
    Log.info.v0('Los parametros son obligatorios en todas las tareas porque es lo que le indica al constructor sobre que build/[gotchi_XX_XX_XXX] trabajar');
    Log.info.v0('*os             : Sistema operativo objetivo ej: --os=android');
    Log.info.v0('*versionApp     : Version a generar ej: --versionApp=287.3.3');
    Log.info.v0('mode            : Tipo de compilacion ej: --mode=[dev(por defecto)|prod]');
    Log.info.v0('logger          : Nivel de traza ej: --logger=[0: Pocas trazas(por defecto), 1: Maximo posible de trazas]');
    Log.info.v0('mocks           : Activa los mocks ej: --mode=[false(por defecto)|true]');


    Log.info.v0(' ');
    Log.info.v0('[CONSTRUCCION] >', 'blue');
    Log.info.v0('build-full                           : Genera la App nativa');
    Log.info.v0('build                                : Genera la App web');
  });
};

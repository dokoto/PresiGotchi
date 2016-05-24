module.exports = function (grunt, options) {
  grunt.registerTask('help', function () {
    'use strict';

    Log.info.v0('Use : #> grunt [options] [task]');
    Log.info.v0('Ej: #> grunt --os=android --mode=debug --versionApp=0.0.1 --logger=0 fake-task');
    Log.info.v0('Debug Win Ej: #> node-debug C:\\Users\\e454989\\AppData\\Roaming\\nvm\\v5.5.0\\node_modules\\grunt-cli\\bin\\grunt --os=android --mode=debug --versionApp=0.0.1 --logger=0 fake-task');
    Log.info.v0('Debug Win Ej: #> %gruntd% --os=android --mode=debug --versionApp=0.0.1 --logger=0 fake-task');

    Log.info.v0(' ');
    Log.info.v0('[Opciones *:parametro obligatorio] >', 'blue');
    Log.info.v0('Los parametros son obligatorios en todas las tareas porque es lo que le indica al constructor sobre que build/[gotchi_XX_XX_XXX] trabajar');
    Log.info.v0('*os             : Sistema operativo objetivo ej: --os=android');
    Log.info.v0('*versionApp     : Version a generar ej: --versionApp=287.3.3');
    Log.info.v0('mode            : Tipo de compilacion ej: --mode=[dev(por defecto)|prod]');
    Log.info.v0('keystore        : Nombre de la carpeta keystore desde donde cagar la firma ej: --keystore=[default(por defecto en assets/config/android/keyStore/default)]');
    Log.info.v0('testPrefix      : Prefijo añadir al nombre de la app ej: --testPrefix=test_');

    Log.info.v0(' ');
    Log.info.v0('[Opciones para DESARROLLO] >', 'blue');
    Log.info.v0('dev             : Abrevia el uso de parametro. ej: --dev=APRF: Compilaria "APFR" desde el repo "trunk_dev" en "debug"');
    Log.info.v0('logger          : Nivel de traza ej: --logger=[0: Pocas trazas(por defecto), 1: Maximo posible de trazas]');
    Log.info.v0('mocks           : Activa los mocks o objetos simulados ej: --mocks=[false: sin mocks(por defecto), true: con mocks]');

    Log.info.v0(' ');
    Log.info.v0('[Lista de tareas] >', 'blue');
    Log.info.v0('default                   : Muestra esta ayuda');

    Log.info.v0(' ');
    Log.info.v0('[CONSTRUCCION] >', 'blue');
    Log.info.v0('build-full                           : Crea la app hibrida desde el principio pasando por todos los pasos');
    Log.info.v0('clean-build                          : Elimina el directorio del build/[opvTablet_XX_XX_XXX]');
    Log.info.v0('build                                : Crea la app hibrida o la actualiza. Evita ciertos pasos, dando por sentado que ya se ejecuto previamente la tarea "build-full".');
    Log.info.v0('commit-release                       : Sube un paquete generado apk ó ipa al gestor de versiones con intervencion del usuario');
    Log.info.v0('install                              : Instala la app en un dispositivo fisico o virtual');
    Log.info.v0('simu-login                           : Arranca la app y simula un login sin necesidad de usuario');

    Log.info.v0(' ');
    Log.info.v0('[UTILIDADES ANDROID] >', 'blue');
    Log.info.v0('clean-all-android                    : Elimina los directorios "Build", "androidSDK"');
    Log.info.v0('clean-android-sdk                    : Elimina el directorio del androidSDK');
    Log.info.v0('commit-release-no-user-android       : Sube un paquete generado apk al gestor de versiones sin intervencion del usuario');
    Log.info.v0('commit-release-no-user-ios           : Sube un paquete generado compuesto de .ipa, .plist, .html al gestor de versiones sin intervencion del usuario');

    Log.info.v0(' ');
    Log.info.v0('[DEPURACION] >', 'blue');
    Log.info.v0('test-[task]               : Usando el prefijo "test-" mas el nombre de cualquier tareas se pueden probar de forma unitaria');
  });
};

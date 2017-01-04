'use strict';

module.exports = function (grunt, options) {
  grunt.registerTask('help', function () {

    this.grunt.log.writeln('Use : #> grunt [options] [task]');
    this.grunt.log.writeln('Ej: #> grunt --os=android --mode=dev --versionApp=0.0.1 --logger=0 build');
    this.grunt.log.writeln('Debug Win Ej: #> node-debug C:\\Users\\USER\\AppData\\Roaming\\nvm\\v5.5.0\\node_modules\\grunt-cli\\bin\\grunt --os=android --mode=debug --versionApp=0.0.1 --logger=0 build');
    this.grunt.log.writeln('Debug Win Ej: #> node-debug C:\\Users\\USER\\AppData\\Roaming\\npm\\node_modules\\grunt-cli\\bin\\grunt --os=android --mode=debug --versionApp=0.0.1 --logger=0 build');
    this.grunt.log.writeln('Debug Win Ej: #> %gruntd% --os=android --mode=dev --versionApp=0.0.1 --logger=0 build');

    this.grunt.log.writeln(' ');
    this.grunt.log.writeln('[Opciones *:parametro obligatorio] >', 'blue');
    this.grunt.log.writeln('Los parametros son obligatorios en todas las tareas porque es lo que le indica al constructor sobre que build/[gotchi_XX_XX_XXX] trabajar');
    this.grunt.log.writeln('*os             : Sistema operativo objetivo ej: --os=android');
    this.grunt.log.writeln('*versionApp     : Version a generar ej: --versionApp=287.3.3');
    this.grunt.log.writeln('mode            : Tipo de compilacion ej: --mode=[dev(por defecto)|prod]');
    this.grunt.log.writeln('logger          : Nivel de traza ej: --logger=[0: Pocas trazas(por defecto), 1: Maximo posible de trazas]');
    this.grunt.log.writeln('mocks           : Activa los mocks ej: --mode=[false(por defecto)|true]');


    this.grunt.log.writeln(' ');
    this.grunt.log.writeln('[CONSTRUCCION] >', 'blue');
    this.grunt.log.writeln('build-full                           : Genera la App nativa');
    this.grunt.log.writeln('build                                : Genera la App web');
  });
};

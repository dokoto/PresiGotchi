module.exports = function(grunt, options) {
	'use strict';

	return {
    	builds: {
            options: {
                create: ['builds/bin/dev', 'builds/web/dev', 'builds/bin/prod', 'builds/web/prod']
            }
        }
   	};
};

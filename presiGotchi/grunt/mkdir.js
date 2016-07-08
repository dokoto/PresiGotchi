module.exports = function(grunt, options) {
	'use strict';

	return {
    	builds: {
            options: {
                create: ['builds/bin', 'builds/web']
            }
        }
   	};
};

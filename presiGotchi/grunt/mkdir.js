module.exports = function(grunt, options) {
	'use strict';

	return {
    	src: {
            options: {
                create: ['<%=git.destinationFolderName%>']
            }
        }
   	};
};

	'use-strict';

module.exports = function(grunt){
	
	var path      = require('path');
	var rootPath  = require('rfr');
    var htmlIndex = path.join(rootPath.root,'app/client/index.html');

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
	    wiredep: {
	      app: {
	        src: htmlIndex
	      }
	    },
	    watch:{
	    	scripts: {
		    files: ['**/*.html'],
		    tasks: ['wiredep'],
		    options: {
		      spawn: false,
		    },
		  }
	    }
	});

	grunt.registerTask('_wiredep', ['wiredep']);
	grunt.registerTask('_watch', ['watch']);
	grunt.registerTask('default', ['_wiredep','_watch']);
	


}
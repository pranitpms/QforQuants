	'use-strict';

module.exports = function(grunt){
	
	var path      = require('path');
	var rootPath  = require('rfr');
    var htmlIndex = path.join(rootPath.root,'app/client/index.html');

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-injector');

	grunt.initConfig({
	    wiredep: {
	      app: {
	        src: 'app/client/index.html'
	      }
	    },
	    injector:{
	     options: {
	     	transform: function(filePath) {
	     		if(filePath.includes('client/contents')){
	     			filePath = filePath.replace('/app/client/contents/','style/');
	     			return '<link rel="stylesheet" href="'+ filePath +'">'
	     		}
	     		if(filePath.includes('client/font-awesome/css')){
	     			filePath = filePath.replace('/app/client/font-awesome/css/','fonts/css/');
	     			return '<link rel="stylesheet" href="'+ filePath +'">'
	     		}
	     		if(filePath.includes('app/client/application/')){
	     			filePath = filePath.replace('/app/client/application/','app/');
	     			return '<script type="text/javascript" src="'+ filePath +'"></script>'
	     		}
	     		return filePath;
	      }
	     },
	     local_dependencies: {
		      files: {
		        'app/client/index.html' : [
		        	'app/client/application/**/*.js', 
			        'app/client/**/*.css',
			        'iq-ui/**/*.js'
			        ],
		      }
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
	grunt.registerTask('inject', ['injector']);
	grunt.registerTask('default', ['_wiredep','_watch','inject']);
	


}
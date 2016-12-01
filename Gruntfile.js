	'use-strict';

module.exports = function(grunt){
	
	var path      = require('path');
	var rootPath  = require('rfr');
    var htmlIndex = path.join(rootPath.root,'app/client/index.html');

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-injector');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.initConfig({
		
	    wiredep: {
	      app: {
	        src: 'app/client/index.html',
	        fileTypes:{
	        	html:{
	        		replace : {
	        			js : function(filepath){
		        				if(filepath.includes('bower_components')){
				     			filepath = filepath.replace('../../bower_components/','bower_components/');
				     			return '<script type="text/javascript" src="'+ filepath +'"></script>'
				     		}
	        			},
	        			css: function(filepath){
		        				if(filepath.includes('bower_components')){
				     			filepath = filepath.replace('../../bower_components/','bower_components/');
				     			return '<link rel="stylesheet" href="'+ filepath +'">'
				     		}
	        			}
	        		}
	        	}
	         }
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
	     		if(filePath.includes('/iq-ui/')){
	     			filePath = filePath.replace('/iq-ui/','directives/');
	     			return '<script type="text/javascript" src="'+ filePath +'"></script>'
	     		}
	     		if(filePath.includes('client/script')){
	     			filePath = filePath.replace('/app/client/script/','script/');
	     			return '<script type="text/javascript" src="'+ filePath +'"></script>'
	     		}
	     	}
	     },
	     local_dependencies: {
		      files: {
		        'app/client/index.html' : [
		        	'app/client/application/app.js',
		        	'iq-ui/module.js',
		        	'app/client/application/**/*.js', 
			        'app/client/**/*.css',
			        'iq-ui/**/*.js',
			        'app/client/script/**/*.js'
			        ],
		      }
		    }
	    },
		concat: {
		    options: {
		      separator: ';\n',
		    },
		    dist: {
		      src: [
		      	'app/client/application/app.js',
	        	'iq-ui/module.js',
	        	'app/client/application/**/*.js', 
		        'iq-ui/**/*.js'
		      ],
		      dest: 'app/public/dev/index.js',
		    },
		    bower: {
		      src: ['bower_components/**/*.js'],
		      dest: 'app/public/dev/bower.js',
		    },
		    style :{
		      src: ['app/client/**/*.css'],
		      dest: 'app/public/dev/style.css',
		    }
	    },
	    jshint: {
		    lint: ['app/client/application/**/*.js','iq-ui/**/*.js']//,
		  },
		  uglify: {
		    my_target: {
		      files: {
		        'app/public/production/index.min.js': ['app/public/dev/index.js'],
		      }
		    }
		  },
		  cssmin: {
			  options: {
			    shorthandCompacting: false,
			    roundingPrecision: -1
			  },
			  target: {
			    files: {
			      'app/public/production/style.min.css': ['app/public/dev/style.css']
			    }
			  }
			},
	    watch:{
	    	scripts: {
		    files: ['**/*.html'],
		    tasks: ['wiredep','injector'],
		    options: {
		      spawn: false,
		    },
		  }
	    }
	});

	grunt.registerTask('_wiredep', ['wiredep']);
	grunt.registerTask('_watch', ['watch']);
	grunt.registerTask('inject', ['injector']);
	grunt.registerTask('_concat', ['concat']);
	grunt.registerTask('_jshint', ['jshint']);
	grunt.registerTask('ugly', ['uglify']);
	grunt.registerTask('mini', ['cssmin']);
	grunt.registerTask('default', ['_wiredep','inject','_jshint','_concat','ugly','_watch']);
	


}
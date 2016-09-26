	'use-strict';

module.exports = function(grunt){

	var path = require('path');
	var baseDirectory = path.basename(__dirname);
	var packageJsonFile = 'package.json';
	var htmlIndexFile   = 'app/index.html';
	var applicationPath = 'app';


	grunt.initConfig({
		wiredep:{
			task:{
				src:[htmlIndexFile]

			}
		},
		watch: {
		  files: ['bower_components/*',htmlIndexFile],
		  tasks: ['wiredep']
		},
		less:{
			files:['/*.less']
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('wiredep', ['wiredep']);
	grunt.registerTask('changes', ['watch']);
	grunt.registerTask('less'   , ['less']);
	grunt.registerTask('default', ['wiredep','watch']);


}
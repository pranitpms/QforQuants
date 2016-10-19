	'use-strict';

module.exports = function(grunt){
	
	// var path     = require('path');
	// var baseDirectory   = path.basename(__dirname);
	// var packageJsonFile = __dirname + '/package.json';
 //    var htmlIndexFile   = __dirname + '/app/client/index.html';
	// var applicationPath = 'app';
console.log(__dirname + '/app/client/index.html');

	grunt.initConfig({
		wiredep:{
			target:{
				src: __dirname + 'app/client/index.html'
			}
		},
		watch: {
		  files: ['bower_components/*', __dirname + 'app/client/index.html'],
		  tasks: ['wiredep']
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('wiredep', ['wiredep']);
	grunt.registerTask('changes', ['watch']);
//	grunt.registerTask('less'   , ['less']);
	grunt.registerTask('default', ['wiredep','watch']);


}
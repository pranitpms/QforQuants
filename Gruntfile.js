	'use-strict';

module.exports = function(grunt){
	
	var path      = require('path');
	var rootPath  = require('rfr');
    var htmlIndex = path.join(rootPath.root,'app/client/index.html');

grunt.loadNpmTasks('grunt-wiredep');

	grunt.initConfig({
		wiredep:{
			task:{
				src: htmlIndex
			}
		}
		// },
		// watch: {
		//   files: ['bower_components/*', __dirname + 'app/client/index.html'],
		//   tasks: ['wiredep']
		// }
	});

	
	// grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('wiredep', ['wiredep']);
// 	grunt.registerTask('changes', ['watch']);
// //	grunt.registerTask('less'   , ['less']);
// 	grunt.registerTask('default', ['wiredep','watch']);


}
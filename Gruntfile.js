module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    concat: { 
      generated: { 
        files: [ 
          { 
             dest: '.tmp/concat/assets/css/style.min.css', 
             src: [ 'assets/css/style.css' ] 
          },
          { 
             dest: '.tmp/concat/assets/js/optimized.js',
             src: [ 'assets/js/foo.js', 'assets/js/bar.js' ] 
          } 
        ] 
      } 
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: [ 'dist/index.html' ]
    },
    copy: {
      html: {
        src: './index.html', dest: 'dist/index.html'
      }
    },
    jshint: {
      files: [ 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js' ]
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['copy:html','useminPrepare','concat','uglify','cssmin','usemin']);

};

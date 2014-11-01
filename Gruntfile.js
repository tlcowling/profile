module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    concat: { 
      generated: { 
        files: [ 
          { 
             dest: '.tmp/concat/assets/css/style.min.css', 
             src: [ 'assets/css/style.css', 'assets/css/print.css' ] 
          },
          { 
             dest: '.tmp/concat/assets/js/optimized.js',
             src: [ 'assets/js/general.js' ] 
          } 
        ] 
      } 
    },
    uglify: { 
      generated: { 
        files: [ 
          { 
            dest: 'dist/assets/js/optimized.js',
            src: [ '.tmp/concat/assets/js/optimized.js' ] 
          } 
        ] 
      } 
    },
    cssmin: {
      generated: {
        files: [
          { 
            dest: 'dist/assets/css/style.min.css',
            src : [ '.tmp/concat/assets/css/style.min.css' ] 
          }
        ]
      }
    },
    useminPrepare: {
      html: 'assets/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: [ 'dist/index.html' ]
    },
    copy: {
      html: {
        src: 'assets/index.html', dest: 'dist/index.html'
      }
    },
    jshint: {
      files: [ 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js' ]
    }
  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['jshint','copy:html','useminPrepare','concat','uglify','cssmin','usemin']);

};

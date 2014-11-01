module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd   : 'assets/images',
          src   : ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      }
    },
    concat: { 
      generated: { 
        files: [ 
          { 
             dest: '.tmp/concat/css/style.min.css', 
             src: [ 'assets/css/style.css', 'assets/css/print.css','assets/plugins/fancybox/jquery.fancybox-1.3.4.css' ] 
          },
          { 
             dest: '.tmp/concat/js/optimized.js',
             src: [ 'assets/js/jquery.min.js','assets/js/general.js'  ] 
          } 
        ] 
      } 
    },
    uglify: { 
      generated: { 
        files: [ 
          { 
            dest: 'dist/js/optimized.js',
            src: [ '.tmp/concat/js/optimized.js' ] 
          } 
        ] 
      } 
    },
    cssmin: {
      generated: {
        files: [
          { 
            dest: 'dist/css/style.min.css',
            src : [ '.tmp/concat/css/style.min.css' ] 
          }
        ]
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
    },
    rsync: {
      options: {
        recursive: true,
        args: [ "--verbose"]
      },
      prod: {
        options: {
          src: 'dist/*',
          dest: '/var/www/tlcowling.com/public_html/profile',
          host: 'deployer@tlcowling.com'
        }
      }
    }
  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['jshint','copy:html','concat','uglify','cssmin','usemin']);
  grunt.registerTask('deploy', ['build','imagemin','rsync:prod']);

};

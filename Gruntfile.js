'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['public'],
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade', '!**/*.{sass, scss}'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{expand: true, cwd: 'app/' , src : ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}]
      }
    },
    sass: {
      options: {
        sourceMap: true
        },
      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'
        }
      }
    },
    watch: {
      other: {
        files: [ 'app/**', '!app/**/*.jade', '!app/**/*.{sass,scss}' ],
        tasks: ['copy']
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['app/**/*.{sass,scss}'],
        tasks: ['sass', 'autoprefixer']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 1% in US']
      },
        build: {
          src:'public/css/**/*.css'
      }
    },

    wiredep: {
      build: {
        src: ['public/**/*.html']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass', 'autoprefixer', 'wiredep']);
  grunt.registerTask('serve', ['build', 'watch']);
};
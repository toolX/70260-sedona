"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      style: {
        files: {
          "build/css/style.css": ["source/sass/style.scss"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    watch: {
      style: {
        files: ["sass/**/*.scss"],
        tasks: ["sass", "postcss"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    
    cmq: {
        style: {
            files: {
                "build/css/style.css": ["build/css/style.css"]
            }
        }
    },

    cssmin: {
        options: {
            keepSpecialComments: 0,
            report: "gzip"
        },
        style: {
            files: {
                "build/css/style.min.css": ["build/vendors/css/normalize.css", "build/css/style.css"]
            }
        }
    },
    
    uglify: {
        style: {
            files: {
                "build/js/menu.min.js": ["build/js/menu.js"],
                "build/js/form.min.js": ["build/js/form.js"],
                "build/js/tap.min.js": ["build/vendors/js/tap.js"]
            }
        }
    },
    
    imagemin: {
        images: {
            options: {
                optimizationLevel: 3
            },
            files: [{
                expand: true,
            src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
        }
    },
    
    clean: {
        build: ["build"]
    },
    
    copy: {
        build: {
            files: [{
                expand: true,
                cwd: "source",
                src: [
                    "img/**",
                    "js/**",
                    "vendors/css/normalize.css",
                    "vendors/js/tap.js",
                    "index.html",
                    "form.html"
                ],
                dest: "build"
            }]
        }
    }
  };
    
    grunt.registerTask("build", [
      "clean",
      "copy",
      "sass",
      "cmq",
      "postcss",
      "cssmin",
      "uglify",
      "imagemin"
  ]);



  // Не редактируйте эту строку
  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);
};

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
                "build/css/style.min.css": ["build/css/style.css"]
            }
        }
    },
    
    uglify: {
        style: {
            files: {
                "build/js/script.min.js": ["build/js/script.js"]
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
                    "index.html",
                    "form.html"
                ],
                dest: "build"
            }]
        }
    },
    
    concat: {
        options: {
            separator: ";"
        },
        dist: {
          src: [
              "source/js/tap.min.js",
              "source/js/menu.js",
              "source/js/form.js"
          ],
          dest: "build/js/script.js"
         }
    },
  };
    
    grunt.registerTask("build", [
      "clean",
      "copy",
      "sass",
      "cmq",
      "postcss",
      "cssmin",
      "concat",
      "uglify",
      "imagemin"
  ]);



  // Не редактируйте эту строку
  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);
};

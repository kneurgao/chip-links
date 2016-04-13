module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            // files: {
            //     cwd: 'app/module',
            //     src: '**',
            //     dest: 'app/dist'
            //     expand: true,
            // },
            build: {
                cwd: 'app/module',
                src: ['**'],
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: 'build'
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n;\n'
            },
            dist: {
                // the files to concatenate
                src: ['app/module/module.js', 'app/module/**/*.js'],
                // the location of the resulting JS file
                dest: 'app/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some',
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'app/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'app/module',
                    src: ['*.css', '!*.min.css'],
                    dest: 'app/dist',
                    ext: '.min.css'
                }]
            }
        },
        qunit: {
            files: ['app/test/**/*.html']
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'app/module/**/*.js', 'app/test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                },
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');



    grunt.registerTask(
        'build',
        'Compiles all the assets and copies the files to the build directory.',
       [ 'clean', 'copy' ]
    );

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

    //This would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);

    //Temporary
    grunt.registerTask('dist', ['jshint', 'concat', 'uglify', 'cssmin']);
};

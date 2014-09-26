module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        cwd: '../third-party-api-server-Github',
        src: ['**/*'],
        dest: '../third-party-api-server/'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy']);

};
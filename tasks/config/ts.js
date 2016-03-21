
module.exports = function(grunt) {

  grunt.config.set('ts', {
    default: {
      tsconfig: './tsconfig.json',
      watch: '.'
    }
  });

  grunt.loadNpmTasks('grunt-ts');
};

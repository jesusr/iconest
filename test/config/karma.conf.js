module.exports = function(config) {
  config.set({
    basePath: '../..',
    files: ['**/*.spec.js'],
    frameworks: ['mocha', 'chai'],
    reporter: ['mocha'],
    browsers: ['PhantomJS']
  });
};
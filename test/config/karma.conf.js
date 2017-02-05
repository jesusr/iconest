module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['mocha', 'chai'],
    reporter: ['mocha']
  });
};
var project = require(__dirname + '/project.ctrl');
module.exports = function(router) {
  'use strict';

  var _ = require('lodash');

  router.get('/', project.list);
  router.get('/:project', project.detail);
};
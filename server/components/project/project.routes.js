var project = require(__dirname + '/project.ctrl');
module.exports = function(router) {
  'use strict';

  var _ = require('lodash');

  router.get('/', function(req, res) {
    return res.json(project.list());
  });
  router.get('/:project', function(req, res) {
    return res.json(project.detail(req.params.project));
  });
};
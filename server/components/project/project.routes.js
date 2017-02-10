var project = require(__dirname + '/project.ctrl'),
  set = require(__dirname + '/../set/set.ctrl');
module.exports = function(router) {
  'use strict';

  var _ = require('lodash');

  router.get('/', function(req, res) {
    return res.json(project.list());
  });
  router.get('/:project', function(req, res) {
    return res.json(project.detail(req.params.project));
  });
  router.get('/:project/sets', function(req, res) {
    return res.json(set.list(req.params.project));
  });
  router.get('/:project/:set', function(req, res) {
    return res.json(set.detail(req.params.project, req.params.set));
  });
  router.get('/:project/:set/svg', function(req, res) {
    var file = set.zip(req.params.project, req.params.set);
    return res.sendFile(file);
  });
};
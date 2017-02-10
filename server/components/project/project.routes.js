var project = require(__dirname + '/project.ctrl'),
  set = require(__dirname + '/../set/set.ctrl');
module.exports = function (router) {
  'use strict';

  var _ = require('lodash');

  router.get('/', function (req, res) {
    return res.json(project.list());
  });
  router.get('/:project', function (req, res) {
    return res.json(project.detail(req.params.project));
  });
  router.get('/:project/sets', function (req, res) {
    return res.json(set.list(req.params.project));
  });
  router.get('/:project/:set', function (req, res) {
    return res.json(set.detail(req.params.project, req.params.set));
  });
  router.get('/:project/:set/svg', function (req, res) {
    var file = set.zip(req.params.project, req.params.set);
    if (file) {
      return res.redirect('/storage/projects/' + req.params.project + '/dist/' + req.params.project + '.' + req.params.set + '.zip');
    }
  });
  router.get('/:project/:set/font', function (req, res) {
    var formats = ['svg', 'ttf', 'eot', 'woff', 'woff2'];
      set.svgFont(req.params.project, req.params.set, formats, function (result) {
        var file = set.svgFontFiles(req.params.project, req.params.set, result, formats);
        return res.redirect('/storage/projects/' + req.params.project + '/dist/' + req.params.project + '.' + req.params.set + '.webfonts.zip');
      });
  });
};
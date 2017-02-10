var express = require('express'),
  routes = require('require-dir')(__dirname + '/../components/', {
    recurse: true
  });

module.exports = function(app) {
  'use strict';
  var router = express.Router();
  
  Object.keys(routes).forEach(function(routeName) {
    if (typeof routes[routeName] === 'object') {
      require(__dirname + '/../components/' + routeName + '/' + routeName + '.routes')(router);
      app.use('/api/' + routeName, router);
    }
  });

  app.use('/api', function(req, res) {
    res.json({
      type: 'definition',
      name: 'API',
      version: 'v0.1'
    });
  });
  
  app.use('/storage', express.static('storage'));
  
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });
};

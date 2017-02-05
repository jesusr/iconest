var express = require('express'),
  config = require('nconf'),
  bodyParser = require('body-parser'),
  logger = require('winston'),
  routes = require('../../server/routes/index'),
  app,
  start;

start = function(cb) {
  'use strict';
  configureServer();
  configureRoutes();
  app.listen(config.get('NODE_PORT'));
  logger.info('[SERVER] Listening on port ' + config.get('NODE_PORT'));
};

function configureServer() {
  app = express();
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
  }));

  app.use(bodyParser.json({
    limit: '5mb'
  }));
}

function configureRoutes() {
  logger.info('[SERVER] Initializing routes');
  routes(app);
}

module.exports = start;

// /index.js
'use strict';
var server,
  nconf = require('nconf'),
  async = require('async'),
  logger = require('winston');

require('dotenv').load();
nconf.use('memory');
nconf.argv();
nconf.env();
require('./config/envs/' + nconf.get('NODE_ENV'));

server = require('./config/inits/server');

logger.info('[APP] Starting server initialization');

async.series([
  function startServer(callback) {
    server(callback);
  }
], function (err) {
  if (err) {
    logger.error('[APP] initialization failed', err);
  } else {
    logger.info('[APP] initialized SUCCESSFULLY');
  }
});

var gzippo = require('gzippo');
  var express = require('express');
  var bodyParser = require('body-parser');
  var logger = require('morgan');


  var app = express();

  app.use(logger('dev'));
  app.use(gzippo.staticGzip("" + __dirname + "/dist"));
  // parse application/json
    app.use(bodyParser.json());
  app.listen(process.env.PORT || 5000);

var express = require('express');
var app = express();
var logger = require("./modules/logger");

app.get('/hello', function (req, res) {
  logger.log(req.connection.remoteAddress, req.query.name)
  res.send('Hello ' + (req.query.name || 'anonymous') + '!');
});

logger.init("mylog.txt", true);

app.listen(8080);

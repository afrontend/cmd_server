var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var error = chalk.bold.blue;
var info = chalk.bold.blue;
var cp = require("child_process")

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/terminal', function(req, res, next) {
  console.log(info('terminal'));
  cp.exec("gnome-terminal");
  res.writeHead(200);
  res.end();
});

module.exports = router;

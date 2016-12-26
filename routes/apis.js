var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var error = chalk.bold.blue;
var info = chalk.bold.blue;

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/terminal', function(req, res, next) {
  res.send('respond with a resource');
  console.log(info('terminal'));
});

module.exports = router;

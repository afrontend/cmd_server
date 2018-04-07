var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var error = chalk.bold.blue;
var info = chalk.bold.blue;
var cp = require("child_process");
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function getTerminalCmd(option) {
  option.x = option.x || 0;
  option.y = option.y || 0;
  var cmd = 'gnome-terminal --geometry=80x24+'+option.x+'+'+option.y;
  return cmd;
}

function getVimCmd(filename) {
  var cmd = 'terminator -e "vim '+filename+'"';
  return cmd;
}

router.get('/terminal', function(req, res, next) {
  console.log(info('query: '+ JSON.stringify(req.query.option, null, 2)));
  if(req.query.option) {
    var optionString = decodeURIComponent(req.query.option);
    var optionJson = JSON.parse(optionString);
    cp.exec(getTerminalCmd(optionJson));
  }
  res.writeHead(200);
  res.end();
});

router.get('/vim', function(req, res, next) {
  console.log(info('query: '+ JSON.stringify(req.query, null, 2)));
  var filename = req.query.filename;
  fs.exists(filename, function () {
    cp.exec(getVimCmd(filename));
  });
  res.writeHead(200);
  res.end();
});

module.exports = router;

var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var error = chalk.bold.blue;
var info = chalk.bold.blue;
var cp = require("child_process")

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

function createTerminalCommand(option) {
  var cmd = '';
  if (option) {
    cmd = 'gnome-terminal --geometry=80x24+'+option.x+'+'+option.y;
  } else {
    cmd = 'gnome-terminal --geometry=80x24+100+100';
  }
  console.log(info('terminal cmd: ' + cmd));
  return cmd;
}

router.get('/terminal', function(req, res, next) {
    console.log(info('query: '+ JSON.stringify(req.query.option, null, 2)));
    if(req.query.option) {
      var optionString = decodeURIComponent(req.query.option);
      var optionJson = JSON.parse(optionString);
      cp.exec(createTerminalCommand(optionJson));
    } else {
      cp.exec(createTerminalCommand(null));
    }
    res.writeHead(200);
    res.end();
});

module.exports = router;

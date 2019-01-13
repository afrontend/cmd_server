const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const error = chalk.bold.blue;
const info = chalk.bold.blue;
const cp = require("child_process");
const fs = require('fs');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function getTerminalCmd(option) {
  option.x = option.x || 0;
  option.y = option.y || 0;
  const cmd = 'gnome-terminal --geometry=80x24+'+option.x+'+'+option.y;
  return cmd;
}

function getVimCmd(filename) {
  const cmd = 'terminator -e "vim '+filename+'"';
  return cmd;
}

router.get('/terminal', function(req, res, next) {
  console.log(info('query: '+ JSON.stringify(req.query.option, null, 2)));
  if(req.query.option) {
    const optionString = decodeURIComponent(req.query.option);
    const optionJson = JSON.parse(optionString);
    cp.exec(getTerminalCmd(optionJson));
  }
  res.writeHead(200);
  res.end();
});

router.get('/vim', function(req, res, next) {
  console.log(info('query: '+ JSON.stringify(req.query, null, 2)));
  const filename = req.query.filename;
  fs.exists(filename, function () {
    cp.exec(getVimCmd(filename));
  });
  res.writeHead(200);
  res.end();
});

module.exports = router;

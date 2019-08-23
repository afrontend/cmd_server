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
  option = option || {};
  option.x = option.x || 0;
  option.y = option.y || 0;
  return 'gnome-terminal --geometry=80x24+'+option.x+'+'+option.y;
}

function getVimCmd(filename) {
  return 'terminator -e "vim '+filename+'"';
}

function getTerminalOption(query) {
  return (query !== undefined && query.option) ? JSON.parse(decodeURIComponent(query.option)) : null;
}

router.get('/terminal', function(req, res, next) {
  cp.exec(getTerminalCmd(getTerminalOption(req.query)));
  res.writeHead(200);
  res.end();
});

router.get('/vim', function(req, res, next) {
  const filename = req.query.filename;
  fs.exists(filename, function () {
    cp.exec(getVimCmd(filename));
  });
  res.writeHead(200);
  res.end();
});

module.exports = router;

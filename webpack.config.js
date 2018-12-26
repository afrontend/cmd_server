const path = require('path');

module.exports = {
  mode: 'production',
  entry: './public/javascripts/launch.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'bundle.js'
  }
};


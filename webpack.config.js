const path = require('path');
const nodeExternals = require('webpack-node-externals');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: "development",
  entry: './server.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  resolve: {

    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.es6', '.babel', '.node']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/, loader: "ts-loader",
        options: {
          configFile: "tsconfig.json"
        }
      },
      { test: /\.node$/, loader: 'node-loader' },
      { exclude: /node_modules/ },
    ]
  }
};
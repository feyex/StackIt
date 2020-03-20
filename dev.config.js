const baseConfig = require("./webpack.config.js");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require("webpack-merge");

const config = merge(baseConfig, {
  mode: "development",
  devServer: {
    contentBase: "dist",
    host: "0.0.0.0",
    port: 5000
  },
  node: {
    __dirname: true
  },
  plugins: [
    new CleanWebpackPlugin(['dev']),
    new Dotenv({
      path: '.env'
    })
  ],
});

module.exports = config;
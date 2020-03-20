const baseConfig = require("./webpack.config.js");
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require("webpack-merge");


const config = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  }
});

module.exports = config;
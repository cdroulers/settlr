/// <reference path="typings/node/node.d.ts" />

var path = require("path");
var webpackShared = require("./webpack.shared");
var webpack = require("webpack");
var webpackConfig = require("webpack-config");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require("webpack-md5-hash");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpack = require("clean-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var nodeModulesPath = path.join(__dirname, "node_modules");
var buildPath = path.join(__dirname, "build");

var packageJson = require("./package.json");

var config = {
  historyApiFallback: true,
  // entry points - each will produce one bundled js file and one css file if there is any css in dependency tree
  entry: {
    vendors: [
      "flux",
      "react",
      "react-dom",
      "react-intl",
      "react-mixin",
      "react-router",
      "superagent",
      "async",
      "cookie",
      "history",
      "jwt-decode"
    ],
    app: [
      path.join(__dirname, "App", "Index"),
      path.join(__dirname, "App", "main")
    ]
  },

  // This is path to loaders
  resolveLoader: {
    root: nodeModulesPath
  },

  resolve: {
    extensions: ["", ".tsx", ".ts", ".js", ".less", ".css"],
    fallback: __dirname
  },

  output: {
    path: buildPath,
    filename: "/[name]_[chunkhash].js"
  },

  module: {
    preLoaders: [
      { test: /\.ts(x?)$/, loader: "tslint", include: path.resolve(__dirname, "App") },
    ],
    noParse: [],
    loaders: [
      { test: /\.ts(x?)$/, loader: "ts-loader?instance=jsx", include: path.resolve(__dirname, "App") },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize"), include: path.resolve(__dirname, "App") },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!less-loader?compress"), include: path.resolve(__dirname, "App") },
      { test: /\.(jpg|png|woff|eot|ttf|svg|gif)$/, loader: "file-loader?name=[name]_[hash].[ext]", include: path.resolve(__dirname, "App") }
    ]
  },

  plugins: [
    new CleanWebpack([buildPath]),
    new ExtractTextPlugin("/[name]_[chunkhash].css", { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin("vendors", "/vendors_[chunkhash].js"),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: "template.html",
      inject: "body",
      version: packageJson.version
    }),
    new CopyWebpackPlugin([
      /*{ from: "favicon.ico" },
      { from: "manifest.json" },
      { from: "favicons", to: "favicons" }*/
    ])
  ],

  tslint: {
    // Rules are in tslint.json
    emitErrors: false, // false = WARNING for webpack, true = ERROR for webpack
    formattersDirectory: path.join(nodeModulesPath, "tslint-loader", "formatters")
  },
};

if (webpackShared.isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
      API_URL_ROOT: JSON.stringify("{API_URL_ROOT}"),
      API_URL_PATH: JSON.stringify("{API_URL_PATH}")
    }
  }));
}

module.exports = webpackConfig.fromObject(config);

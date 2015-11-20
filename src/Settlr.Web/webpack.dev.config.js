// This config is extented from webpack.config.js. We use it for development with webpack-dev-server and autoreload/refresh

var webpackShared = require("./webpack.shared");
var webpack = require('webpack');
var webpackConfig = require('webpack-config');
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var mainConfig = webpackConfig.fromFile("webpack.config");

var packageJson = require("./package.json");

// To work with webpack-dev-server
//webpackShared.removeObjectProperties(mainConfig.resolve.alias, ['react/addons']);

var devConfigExtension = {
  entry: {
    app: [
    // We are using next two entries for hot-reload
      'webpack-dev-server/client?http://localhost:3333',
      'webpack/hot/only-dev-server',
    ].concat(mainConfig.entry.app)
  },

  output: {
    filename: 'assets/[name].js',
    publicPath: "/"
  },

  resolve: {
    alias: mainConfig.resolve.alias
  },

  // more options here: http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval-source-map',

  watch: true,

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loaders: ['react-hot', 'ts-loader?instance=jsx'], include: path.resolve(__dirname, "App") },
      { test: /\.css$/, loader: "style!css", include: path.resolve(__dirname, "App") },
      { test: /\.less$/, loader: "style!css!less", include: path.resolve(__dirname, "App") },
      { test: /\.(jpg|png|jpg|png|woff|eot|ttf|svg|gif)$/, loader: "file-loader?name=[name].[ext]" }
    ]
  },

  plugins: [
    // Used for hot-reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        API_URL_ROOT: JSON.stringify("http://localhost:5000"),
        API_URL_PATH: JSON.stringify(""),
        API_URL_SOCKET_PATH: JSON.stringify("/signlar")
      }
    }),
    new HtmlWebpackPlugin({
      template: "template.html",
      inject: "body",
      version: packageJson.version
    })
  ]
};

mainConfig.module.loaders = [];
mainConfig.resolve.alias = {};
mainConfig.plugins = [];

module.exports = mainConfig.extend(devConfigExtension);
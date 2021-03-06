const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv({
      path: "./.env.development",
      safe: true,
    }),
  ],
});

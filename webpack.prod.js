const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new Dotenv({
      path: "./.env.production",
      safe: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
});

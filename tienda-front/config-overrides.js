/* eslint-disable react-hooks/rules-of-hooks */
const { addWebpackAlias, useBabelRc, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  useBabelRc(),
  addWebpackAlias({ "#root": path.resolve(__dirname, "src") })
);

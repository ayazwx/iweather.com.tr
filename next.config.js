const { parsed: localEnv } = require('dotenv').config();

// This is to ensure that webpack uses the appropriate environment variables
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};

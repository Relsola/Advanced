const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const { public } = require("./paths.js");
const proxy = require("./proxy.js");

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        compress: false,
        open: true,
        hot: true,
        historyApiFallback: true,
        static: { directory: public },
        proxy
    },

    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/,
    },

    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimize: false,
        concatenateModules: false,
        usedExports: false,
    }
})
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const globAll = require('glob-all');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { src, public, build } = require("./paths.js")
module.exports = merge(baseConfig, {
    mode: 'production',

    plugins: [
        new CopyPlugin({
            patterns: [{
                from: public,
                to: build,
                filter: source => !/index\.html$/.test(source),
            }]
        }),

        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css'
        }),

        new PurgeCSSPlugin({
            paths: globAll.sync([`${src}\\**\\*.vue`, `${public}\\index.html`]),
            safelist: { standard: [/^el-/] }
        }),

        new CompressionPlugin({
            test: /\.(?:js|css|json)$/,
            filename: '[path][base].gz',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
        })
    ],

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),

            new TerserPlugin({
                parallel: true,
                terserOptions: { compress: { pure_funcs: ["console.log"] } }
            })
        ],

        splitChunks: {
            chunks: 'all',
            minSize: 0,

            cacheGroups: {
                vendors: {
                    test: /node_modules/i,
                    name: 'vendors',
                    minChunks: 1,
                    priority: 1
                },

                commons: {
                    name: 'commons',
                    minChunks: 2
                }
            }
        }
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
})
// 打包环境配置
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const globAll = require('glob-all')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const { src, public, build } = require("./paths.js");

module.exports = merge(baseConfig, {

    mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化

    plugins: [
        // 复制文件插件
        new CopyPlugin({
            patterns: [
                {
                    // 复制public下文件
                    from: public,
                    // 复制到dist目录中
                    to: build,
                    // 忽略index.html
                    filter: source => !/index\.html$/.test(source),
                },
            ]
        }),

        // 抽离css插件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash].css',
            ignoreOrder: true,
        }),

        // 清理无用css
        new PurgeCSSPlugin({
            /*  
                检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称，只打包这些文件中用到的样式

                模式mode为production时就会默认开启tree-shaking功能，tree-shaking清理未引用js
             */
            paths: globAll.sync([`${src}\\**\\*.tsx`, `${public}\\index.html`]),
            // 过滤以ant-开头的类名，哪怕没用到也不删除
            safelist: { standard: [/^ant-/] }
        }),

        // 打包时生成gzip文件
        new CompressionPlugin({
            // 只生成css,js压缩文件
            test: /\.(?:js|css|json)$/,
            // 文件命名
            filename: '[path][base].gz',
            // 压缩格式,默认是gzip
            algorithm: 'gzip',
            // 只有大小大于该值的资源会被处理。默认值是 10k
            threshold: 10240,
            // 压缩率,默认值是 0.8
            minRatio: 0.8,
        })
    ],

    optimization: {
        // 压缩文件
        minimize: true,

        minimizer: [
            // 压缩CSS插件
            new CssMinimizerPlugin(),

            // 压缩JS插件
            new TerserPlugin({
                // 开启多线程压缩
                parallel: true,
                // 删除console.log
                terserOptions: { compress: { pure_funcs: ["console.log"] } }
            })
        ],

        // 分隔代码
        splitChunks: {
            // 提取所有模块
            chunks: 'all',

            cacheGroups: {
                // 提取node_modules代码
                vendors: {
                    // 只匹配node_modules里面的模块
                    test: /node_modules/i,
                    // 提取文件命名为vendors
                    name: 'vendors',
                    // 只要使用一次就提取出来
                    minChunks: 1,
                    // 提取代码体积大于0就提取出来
                    minSize: 0,
                    // 提取优先级为10
                    priority: 10,
                    chunks: 'all',
                    enforce: true,
                },

                // 提取页面公共代码
                commons: {
                    // 提取文件命名为commons
                    name: 'commons',
                    // 只要使用两次就提取出来
                    minChunks: 2,
                    // 提取代码体积大于0就提取出来
                    minSize: 0,
                    chunks: 'initial',
                }
            }
        }
    },

    // 忽略打包文件产生的警告并设置打包文件大小超过多少时进行警告提示
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
})
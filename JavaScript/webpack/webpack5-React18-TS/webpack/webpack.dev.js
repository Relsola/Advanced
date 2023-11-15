// 开发环境配置
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ReactRefreshWebpackPlugin =
    require('@pmmmwh/react-refresh-webpack-plugin');
const { public } = require("./paths.js");
const proxy = require("./proxy.js");

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
    // 开发模式
    mode: 'development',

    // 源码调试模式
    devtool: 'eval-cheap-module-source-map',

    devServer: {
        // 设置'0.0.0.0'则所有的地址均能访问
        host: '0.0.0.0',
        // 服务端口号
        port: 8080,
        // gzip压缩,开发环境不开启,提升热更新速度
        compress: false,
        // 开启热更新
        hot: true,
        // 解决history路由404问题
        historyApiFallback: true,
        //托管静态资源public文件夹
        static: { directory: public },
        // 前端代理
        proxy
    },

    // 监听模式
    watchOptions: {
        // 500ms以后统一重构
        aggregateTimeout: 500,
        // 轮询检查文件是否发生了变化
        poll: 1000,
        // 忽略node_modules
        ignored: /node_modules/,
    },

    optimization: {
        // 禁止删除已经可用的模块
        removeAvailableModules: false,
        // 禁止删除空的代码块
        removeEmptyChunks: false,
        // 禁止拆分代码块
        splitChunks: false,
        // 禁止对代码进行压缩和混淆
        minimize: false,
        // 禁止模块代码的合并
        concatenateModules: false,
        // 禁止根据代码的使用情况进行导出优化
        usedExports: false,
    },

    plugins: [
        // React组件热更新插件
        new ReactRefreshWebpackPlugin({ overlay: false }),
    ]
})
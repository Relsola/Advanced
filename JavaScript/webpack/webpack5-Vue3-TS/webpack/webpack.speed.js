// webpack构建分析配置文件

// 引入打包配置
const prodConfig = require('./webpack.prod.js')
// 引入webpack打包速度分析插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// 实例化分析插件
const smp = new SpeedMeasurePlugin();
// 引入合并webpack配置方法
const { merge } = require('webpack-merge');
// 引入分析打包结果插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = smp.wrap(merge(prodConfig, {
    plugins: [
        // 配置分析打包结果插件
        new BundleAnalyzerPlugin()
    ]
}))
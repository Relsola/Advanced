// 公共配置
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');
const { src, build, React, public } = require('./paths')
const { isDev, JSBabel, cssBabel, assetOptions, jsonBabel } = require("./rules")

module.exports = {
    // 应用程序的入口文件路径
    entry: { app: `${src}\\index.tsx` },

    // 打包文件出口
    output: {
        // 打包结果输出路径
        path: build,
        // 引用打包后的资源时的公共路径
        publicPath: isDev ? '/' : './',
        // 打包后的 JavaScript 文件名
        filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js',
        // 打包后的按需加载的 chunk 文件名
        chunkFilename: isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js',
        // 打包前是否清除输出目录
        clean: true
    },

    // 配置模块解析的规则，包括文件扩展名和模块别名等
    resolve: {
        // 解析模块时自动解析的文件扩展名 越少越好
        extensions: ['.js', '.tsx', '.ts'],
        // 模块别名，用于简化模块引入的路径
        alias: {
            '@': src,
            "@hooks": `${src}\\hooks`,
            "@assets": `${src}\\assets`,
            '@pages': `${src}\\pages`,
            '@utils': `${src}\\utils`,
        },
        // 是否解析符号链接文件
        symlinks: true
    },

    // 配置各种插件
    plugins: [
        // 注入环境变量
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        // 全局使用某些包
        new webpack.ProvidePlugin({ React }),

        // 生成 HTML 文件的配置
        new HtmlWebpackPlugin({
            title: isDev ? 'React Dev' : 'React',
            template: `${public}\\index.html`,
            favicon: `${public}\\favicon.ico`,
            // 自动注入静态资源
            inject: "body",
            // 缓存控制
            hash: true,
            cache: false,
        }),

        // 构建进度条和构建统计信息
        new WebpackBar(),

        // 优化 Ant Design 组件库中日期处理
        new AntdDayjsWebpackPlugin(),

        // 检测文件路径大小写
        new CaseSensitivePathsPlugin(),

        // 检测循环依赖
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            // 检测到循环依赖时，停止构建并抛出错误
            failOnError: true,
            // 不允许异步循环依赖
            allowAsyncCycles: false,
            // 当前工作目录的绝对路径
            cwd: process.cwd(),
        }),

        // 在构建过程中并行地检查 TypeScript 代码的类型错误，提供更快的构建速度
        new ForkTsCheckerWebpackPlugin({ async: false }),

        // 代码风格和语法检查
        new EslintWebpackPlugin({
            // 指定检查文件的根目录
            context: src,
            // 开启缓存
            cache: true
        })
    ],

    // 配置模块处理规则，包括各种文件类型的加载器和处理器
    module: {
        // 将缺失的导出提示成错误而不是警告
        strictExportPresence: true,

        rules: [
            // 精确使用loader 优化构建速度

            // 匹配ts
            JSBabel("ts", false),

            // // 匹配tsx
            JSBabel("tsx", false),

            // 匹配css
            cssBabel("css"),

            // 匹配less
            cssBabel("less"),

            // 匹配图片文件
            assetOptions(/\.(png|jpg|jpeg|gif|svg|webp)$/i, "images"),

            // 匹配字体图标文件
            assetOptions(/\.(woff|woff2|eot|ttf|otf)$/i, "fonts"),

            // 匹配媒体文件
            assetOptions(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i, "media"),

            // 处理json文件
            jsonBabel()
        ]
    },

    // 开启webpack5持久化存储缓存
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    }
};
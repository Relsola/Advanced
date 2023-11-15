const { src } = require('./paths');
// 抽取css样式文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 是否是开发模式
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    isDev,

    JSBabel: (value, thread) => ({
        /* 
          缩小loader作用范围
           * include：只解析该选项配置的模块
           * exclude：不解该选项配置的模块,优先级更高
        */
        include: [src],
        test: new RegExp(`\\.${value}$`, "i"),
        // thread-loader 开启多线程loader
        use: [
            thread && 'thread-loader',
            {
                loader: 'babel-loader',
                options: {
                    // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                    presets: value !== "ts" ? [
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        '@babel/preset-typescript'
                    ] : ['@babel/typescript'],
                    // 开启 Babel 缓存目录
                    cacheDirectory: true,
                    // 禁用 Babel 缓存的压缩
                    cacheCompression: false,
                }
            }
        ].filter(Boolean)
    }),

    cssBabel: value => ({
        test: new RegExp(`\\.${value}$`, "i"),
        exclude: /node_modules/,
        use: [
            // 开发环境使用style-loader,打包模式抽离css
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            // 处理css3前缀兼容
            'postcss-loader',
            value !== "css" && `${value}-loader`
        ].filter(Boolean)
    }),

    assetOptions: (test, name) => ({
        test,
        // type选择asset
        type: "asset",
        // 小于25kb转base64位
        parser: { dataUrlCondition: { maxSize: 25 * 1024 } },
        // 文件输出目录和命名
        generator: { filename: `static/${name}/[name].[contenthash:8][ext]` }
    }),

    jsonBabel: () => ({
        test: /\.json$/,
        // 将json文件视为文件类型
        type: 'asset/resource',
        generator: { filename: 'static/json/[name].[hash][ext]' }
    })
}
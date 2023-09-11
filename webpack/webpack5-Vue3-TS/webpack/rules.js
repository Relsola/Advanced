const { src } = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    isDev,

    JSBabel: (value, thread) => ({
        include: [src],
        test: new RegExp(`\.${value}$`, "i"),
        use: [
            thread && 'thread-loader',
            `${value === "vue" ? 'vue' : 'babel'}-loader`
        ].filter(Boolean)
    }),

    // 使用了vue3了基本上就不用考虑低版本浏览器了
    cssBabel: value => ({
        test: new RegExp(`\\.${value}$`, "i"),
        exclude: /node_modules/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            value !== "css" && 'sass-loader'
        ].filter(Boolean)
    }),

    assetOptions: (test, name) => ({
        test,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 25 * 1024 } },
        generator: { filename: `static/${name}/[name].[contenthash:8][ext]` }
    }),

    jsonBabel: () => ({
        test: /\.json$/,
        type: 'asset/resource',
        generator: { filename: 'static/json/[name].[hash][ext]' }
    })
}
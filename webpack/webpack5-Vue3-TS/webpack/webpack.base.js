const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const { src, build, public } = require('./paths');
const { isDev, JSBabel, cssBabel, assetOptions, jsonBabel } = require("./rules");

module.exports = {
    entry: { app: `${src}\\index.ts` },

    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: build,
        clean: true,
        publicPath: '/'
    },

    resolve: {
        extensions: ['.vue', '.ts', '.js'],
        alias: {
            '@': src,
            "@hooks": `${src}\\hooks`,
            "@assets": `${src}\\assets`,
            '@views': `${src}\\views`,
            '@utils': `${src}\\utils`,
        }
    },

    plugins: [
        // vue-loader插件
        new VueLoaderPlugin(),

        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),

        // 全局导入组合式API
        new webpack.ProvidePlugin({
            ref: ['vue', 'ref'],
            computed: ['vue', 'computed'],
            onMounted: ['vue', 'onMounted'],
        }),

        new HtmlWebpackPlugin({
            title: isDev ? 'Vue Dev' : 'Vue',
            template: `${public}\\index.html`,
            favicon: `${public}\\favicon.ico`,
            inject: "body",
            hash: true,
            cache: false,
        })
    ],

    module: {
        strictExportPresence: true,

        rules: [
            JSBabel("vue", false),
            JSBabel("ts", false),
            cssBabel("css"),
            cssBabel("scss"),
            assetOptions(/\.(png|jpg|jpeg|gif|svg|webp)$/i, "images"),
            assetOptions(/\.(woff|woff2|eot|ttf|otf)$/i, "fonts"),
            assetOptions(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i, "media"),
            jsonBabel()
        ]
    },

    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    }
}
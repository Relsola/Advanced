const { resolve } = require('path')

// 暴露出常用路径
module.exports = {
    src: resolve(__dirname, '../src'),

    build: resolve(__dirname, '../dist'),

    public: resolve(__dirname, '../public'),

    React: resolve(__dirname, "../node_modules/react/index.js"),
}

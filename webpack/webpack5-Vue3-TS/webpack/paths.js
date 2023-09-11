const { resolve } = require('path')

module.exports = {
    src: resolve(__dirname, '../src'),
    build: resolve(__dirname, '../dist'),
    public: resolve(__dirname, '../public')
}
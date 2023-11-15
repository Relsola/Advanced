const plugins = [
    // 按需加载模块
    '@babel/plugin-syntax-dynamic-import',
    // 支持装饰器
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    // 减少冗余代码
    '@babel/plugin-transform-runtime',
    // 捕获和处理异步函数中的异常
    require.resolve('babel-plugin-await-add-trycatch'),
]

module.exports = {
    presets: [['@babel/preset-env']],

    // 紧凑的格式显示
    compact: true,

    // 魔法注释生效
    comments: true,

    plugins: process.env.NODE_ENV === 'production'
        ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
        : [...plugins, require.resolve('react-refresh/babel')]
}
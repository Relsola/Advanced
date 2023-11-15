module.exports = {
    // 需要代理的路径前缀
    '/faker': {
        // 指定代理的目标服务器地址
        target: 'http://localhost:4000',
        // 将请求路径中的前缀替换为空字符串
        pathRewrite: { '^/faker': '' },
        // 禁用 SSL 安全验证
        secure: false,
        // 修改请求头中的 Origin 字段，确保目标服务器能够正确识别请求的来源
        changeOrigin: true,
        // 修改请求中的 Cookie 域名
        cookieDomainRewrite: 'localhost'
    }
}
// 此文件运行在 Node.js 服务器上
import { createSSRApp } from 'vue'
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer'

import express from 'express';
const server = express();

server.get('/', (req, res) => {
    const app = createSSRApp({
        data: () => ({ count: 1 }),
        template: `<button @click="count++">{{ count }}</button>`
    });

    renderToString(app).then((html) => {
        res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
    })
});

server.listen(3000, () => {
    console.log('ready')
});
/* 
  运行：node example.js

  在命令行中打印出如下内容：<button>1</button>
*/


// 客户端激活-------------------------------------

// 该文件运行在浏览器中
import { createSSRApp } from 'vue'

const app = createSSRApp({
    // ...和服务端完全一致的应用实例
})

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
app.mount('#app');



// 代码结构--------------------------

// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'

export function createApp() {
    return createSSRApp({
        data: () => ({ count: 1 }),
        template: `<button @click="count++">{{ count }}</button>`
    })
}

// client.js
import { createApp } from './app.js'

createApp().mount('#app')


// server.js (不相关的代码省略)
import { createApp } from './app.js'

server.get('/', (req, res) => {
    const app = createApp()
    renderToString(app).then(html => {
        // ...
    })
});

/* 
  此外，为了在浏览器中加载客户端文件，我们还需要：
  1. 在 server.js 中添加 server.use(express.static('.')) 来托管客户端文件。
  2. 将 <script type="module" src="/client.js"></script> 添加到 HTML 外壳以加载客户端入口文件。
  3. 通过在 HTML 外壳中添加 Import Map 以支持在浏览器中使用 import * from 'vue'。
*/

// 推荐使用Nuxt.js
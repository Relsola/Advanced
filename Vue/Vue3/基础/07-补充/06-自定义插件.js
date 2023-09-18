import { createApp } from 'vue';
import i18nPlugin from './plugins/i18n';
const app = createApp({})

// 一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 app.use() 的额外选项作为参数

const myPlugin = {
    install(app, options) {
        // 配置此应用

        /*
          插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：
           1.通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令。
           2. 通过 app.provide() 使一个资源可被注入进整个应用。
           3. 向 app.config.globalProperties 中添加一些全局实例属性或方法
        */

        // 注入一个全局可用的 $translate() 方法
        app.config.globalProperties.$translate = (key) => {
            // 获取 `options` 对象的深层属性
            // 使用 `key` 作为索引
            return key.split('.').reduce((o, i) => {
                if (o) return o[i]
            }, options)
        }

        // 插件中的 Provide / Inject
        app.provide('i18n', options)

    }
}

app.use(myPlugin, {
    /* 可选的选项 */
});

// 第三方翻译插件
app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!'
    }
})
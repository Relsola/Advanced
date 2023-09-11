// 异步组件

/* 
   在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
   为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。
   Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。
*/

Vue.component('async-example', function (resolve, reject) {
    setTimeout(function () {
        // 向 `resolve` 回调传递组件定义
        resolve({
            template: '<div>I am async!</div>'
        })
    }, 1000)
})


// 和 webpack 的 code-splitting 功能一起配合使用
Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 `require` 语法将会告诉 webpack
    // 自动将你的构建代码切割成多个包，这些包
    // 会通过 Ajax 请求加载
    require(['./my-async-component'], resolve)
})

// 返回一个 Promise
Vue.component(
    'async-webpack-example',
    // 这个动态导入会返回一个 `Promise` 对象。
    () => import('./my-async-component')
)

// 处理加载状态
const AsyncComponent = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: import('./MyComponent.vue'),
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    error: ErrorComponent,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
})
<script setup>
import { defineAsyncComponent } from 'vue';

/* 
  defineAsyncComponent 方法接收一个返回 Promise 的加载函数。
  这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用。
  你也可以调用 reject(reason) 表明加载失败。
*/

const AsyncComp = defineAsyncComponent(() => {
    return new Promise((resolve, reject) => {
        // ...从服务器获取组件
        resolve(/* 获取到的组件 */)
    })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`

// ES 模块动态导入也会返回一个 Promise，所以多数情况下我们会将它和 defineAsyncComponent 搭配使用。
{
    const AsyncComp = defineAsyncComponent(() =>
        import('./components/MyComponent.vue')
    )
}

// 全局注册
{
    app.component('MyComponent', defineAsyncComponent(() =>
        import('./components/MyComponent.vue')
    ))
}

// 加载与错误状态
{
    const AsyncComp = defineAsyncComponent({
        // 加载函数
        loader: () => import('./Foo.vue'),

        // 加载异步组件时使用的组件
        loadingComponent: LoadingComponent,
        // 展示加载组件前的延迟时间，默认为 200ms
        delay: 200,

        // 加载失败后展示的组件
        errorComponent: ErrorComponent,
        // 如果提供了一个 timeout 时间限制，并超时了
        // 也会显示这里配置的报错组件，默认值是：Infinity
        timeout: 3000
    })
}

</script>

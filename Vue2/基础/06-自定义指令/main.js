import Vue from 'vue'
import App from './App.vue'
import "./style.css"

Vue.config.productionTip = false

// 在main.js中定义自定义指令就是全局定义
// 第一个参数 就是指令的名字
// 在 new Vue 上面写
Vue.directive("objSet", {
    // 数组对象去重
    inserted: (el, op) => {
        el.innerHTML =
            [...new Set(
                op.value.map(
                    item => JSON.stringify(item)))]
    }
})

const app = new Vue({
    render: h => h(App),
})

app.$mount('#app')

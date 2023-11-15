import Vue from 'vue'
import App from './App.vue'
import "./style.css"

Vue.config.productionTip = false

// 全局过滤器
Vue.filter("objSet", (arr) =>
    [...Array.from(new Set(arr.
        map(item => JSON.stringify(item)))).
        map(item => JSON.parse(item))]
)

const app = new Vue({
    render: h => h(App),
})

app.$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import "./style.css"

import router from './router'

Vue.config.productionTip = false

const app = new Vue({
    render: h => h(App),
    router
})

app.$mount('#app')

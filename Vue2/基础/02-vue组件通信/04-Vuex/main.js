import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "./style.css"


Vue.config.productionTip = false

const app = new Vue({
    render: h => h(App),
    store
})

app.$mount('#app')

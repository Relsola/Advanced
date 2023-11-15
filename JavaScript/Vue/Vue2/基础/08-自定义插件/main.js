import Vue from 'vue'
import App from './App.vue'
import "./style.css"

import plugins from "@/plugin"
Vue.use(plugins);

Vue.config.productionTip = false


const app = new Vue({
    render: h => h(App),
})

app.$mount('#app')

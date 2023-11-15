import Vue from 'vue'
import App from './App.vue'
import "./style.css"

Vue.config.productionTip = false

/* 
  谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。
  大多数情况下，只应当应用于自定义选项。
  推荐将其作为插件发布，以避免重复应用混入。
*/
Vue.mixin({
    data: () => ({
        once: 10,
    }),
    methods: {
        fn() {
            this.once++
        }
    }
})

// 自定义选项合并策略
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
    // 返回合并后的值 默认覆盖
}

// 混入策略高级例子
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
    if (!toVal) return fromVal
    if (!fromVal) return toVal
    return {
        getters: merge(toVal.getters, fromVal.getters),
        state: merge(toVal.state, fromVal.state),
        actions: merge(toVal.actions, fromVal.actions)
    }
}

const app = new Vue({
    render: h => h(App),
})

app.$mount('#app')

// 一键复制
import copy from "./modules/v-copy";
// 长按触发
import longpress from "./modules/v-longpress";
// 拖拽
import draggable from "./modules/v-draggable";
// 校验表单
import inputValidator from "./modules/v-inputValidator";
// 图片懒加载
import lazyLoad from "./modules/v-lazyLoad";


const directives = {
    copy,
    longpress,
    draggable,
    inputValidator,
    lazyLoad
}

export default {
    install(Vue) {
        Object.keys(directives).forEach(key => {
            Vue.directive(key, directives[key])
        })
    }
}


/* 
指令定义函数提供了几个钩子函数（可选）：

  bind: 只调用一次，指令第一次绑定到元素时调用，可以定义一个在绑定时执行一次的初始化动作。
  inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
  update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值。
  componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
  unbind: 只调用一次， 指令与元素解绑时调用。
*/
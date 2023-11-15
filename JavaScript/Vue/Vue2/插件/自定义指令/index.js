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

  指令钩子函数会被传入以下参数：
  
  el：指令所绑定的元素，可以用来直接操作 DOM。
  binding：一个对象，包含以下 property：
    name：指令名，不包括 v- 前缀。
    value：指令的绑定值。
    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression：字符串形式的指令表达式。
    arg：传给指令的参数，可选。
    modifiers：一个包含修饰符的对象。
    vnode：Vue 编译生成的虚拟节点。
    oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。


  指令的参数可以是动态的。例如，在 v-pin:[argument]="value"
*/
// 一个插件 就是一个js文件
// 可以写各种各样的功能

export default {

    // 一定有一个install函数 install函数有两个参数
    // 第一个参数是Vue构造器 第二个参数是配置项option

    install(Vue, options) {

        // 自定义指令
        Vue.directive("objSet", {
            // 数组对象去重
            inserted: (el, op) => {
                el.innerHTML =
                    [...new Set(
                        op.value.map(
                            item => JSON.stringify(item)))]
            }
        })

        // 过滤器
        Vue.filter("objSet", (arr) =>
            [...Array.from(new Set(arr.
                map(item => JSON.stringify(item)))).
                map(item => JSON.parse(item))]
        )

        // 注册一个子组件
        Vue.component("Once", {
            render(h) {
                // 这个h函数的作用是渲染我们的虚拟DOM
                return h("h1", { class: "once" }, "plugin中的组件")
            }
        })

        // 在Vue原型上挂在一个属性
        Vue.prototype.$double = function (val) {
            switch (typeof val) {
                case 'number':
                    return val * 2;

                case 'string':
                    let num = Number(val)
                    return isNaN(num) ? -1 : num * 2;

                default:
                    return -1;
            }
        }
    }
}
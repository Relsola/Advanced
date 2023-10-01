import { patch } from "./vdom/patch.js";
import Watcher from "./observer/watcher.js";

export function mountComponent(vm, el) {
	// 真实的el选项赋值给实例的$el属性 为之后虚拟dom产生的新的dom替换老的dom做铺垫
	// vm.$el = el;

	// 引入watcher的概念 这里注册一个渲染watcher 执行vm._update(vm._render())方法渲染视图
	const updateComponent = () => {
		console.log("刷新页面");
		vm.$el = document.querySelector(vm.$options.el);
		// _update 和 _render 方法都是挂载在Vue原型的方法  类似 _init
		// 执行 vm._render() 方法 调用生成的render函数 生成虚拟dom
		// 使用 vm._update() 方法把虚拟dom渲染到页面
		vm._update(vm._render());
	};
	console.log(new Watcher(vm, updateComponent, null, true));;
}

export function lifecycleMixin(Vue) {
	// 把_update挂载在Vue的原型
	Vue.prototype._update = function (vnode) {
		const vm = this;
		// patch是渲染vnode为真实dom核心
		patch(vm.$el, vnode);
	};
}

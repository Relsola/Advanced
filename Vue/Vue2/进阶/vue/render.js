import { createElement, createTextNode } from "./vdom/index.js";
import { nextTick } from "./util/next-tick.js";
import Watcher from "./observer/watcher.js";

export function renderMixin(Vue) {
	Vue.prototype._render = function () {
		const vm = this;
		// 获取模板编译生成的render方法
		const { render } = vm.$options;
		// 生成vnode--虚拟dom
		const vnode = render.call(vm);
		return vnode;
	};

	// render函数里面有_c _v _s方法需要定义

	// 创建虚拟dom元素
	Vue.prototype._c = function (...args) {
		const vm = this;
		return createElement(vm, ...args);
	};

	// 创建虚拟dom文本
	Vue.prototype._v = function (text) {
		return createTextNode(text);
	};

	// 如果模板里面的是一个对象  需要JSON.stringify
	Vue.prototype._s = function (val) {
		return val == null
			? ""
			: typeof val === "object"
			? JSON.stringify(val)
			: val;
	};

	// 挂载在原型的nextTick方法 可供用户手动调用
	Vue.prototype.$nextTick = nextTick;

	Vue.prototype.$watch = function (exprOrFn, cb, options) {
		const vm = this;
		//  user: true 这里表示是一个用户watcher
		new Watcher(vm, exprOrFn, cb, {
			...options,
			user: true
		});

		// 如果有 immediate属性 代表需要立即执行回调
		if (options.immediate) cb();
	};
}

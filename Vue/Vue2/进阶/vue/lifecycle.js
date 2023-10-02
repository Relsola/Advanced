import { patch } from "./vdom/patch.js";
import Watcher from "./observer/watcher.js";

export function mountComponent(vm, el) {
	// 真实的el选项赋值给实例的$el属性 为之后虚拟dom产生的新的dom替换老的dom做铺垫
	vm.$el = el;

	// 初始渲染之前
	callHook(vm, "beforeMount");

	// 这里注册一个渲染watcher 执行vm._update(vm._render())方法渲染视图
	const updateComponent = () => {
		// _update 和 _render 方法都是挂载在Vue原型的方法
		// vm._render() 方法 调用生成的render函数 生成虚拟dom
		// vm._update() 方法把虚拟dom渲染到页面
		vm._update(vm._render());
	};

	new Watcher(
		vm,
		updateComponent,
		//更新之前
		() => callHook(vm, "beforeUpdate"),
		true
	);

	//渲染完成之后
	callHook(vm, "mounted");
}

export function lifecycleMixin(Vue) {
	// 把_update挂载在Vue的原型
	Vue.prototype._update = function (vnode) {
		const vm = this;

		// 保留上一次的vnode
		// 初次渲染 vm._vnode 不存在 赋值给$el属性
		const prevVnode = vm._vnode ?? vm.$el;
		vm._vnode = vnode;

		// patch是渲染vnode为真实dom核心
		// 更新时把上次的vnode和这次更新的vnode穿进去 进行diff算法
		vm.$el = patch(prevVnode ?? vm.$el, vnode);
	};
}

export function callHook(vm, hook) {
	// 依次执行生命周期对应的方法
	const handlers = vm.$options[hook];

	if (handlers)
		//生命周期里面的this指向当前实例
		handlers.forEach(handler => handler.call(vm));
}

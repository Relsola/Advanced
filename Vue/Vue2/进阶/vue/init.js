import { initState } from "./state.js";
import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from "./lifecycle.js";
import { callHook } from "./lifecycle.js";
import { mergeOptions } from "./util/index.js";

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		const vm = this;

		vm.$options = mergeOptions(vm.constructor.options, options);

		//初始化数据之前
		callHook(vm, "beforeCreate");

		// 初始化状态
		initState(vm);

		//初始化数据之后
		callHook(vm, "created");

		// 如果有el属性 进行模板渲染
		if (vm.$options.el) vm.$mount(vm.$options.el);
	};

	Vue.prototype.$mount = function (el) {
		const vm = this;
		const options = vm.$options;
		el = document.querySelector(el);

		// 如果不存在render属性
		if (!options.render) {
			// 如果存在template属性
			let template = options.template;

			// 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的外层html结构（就是el本身 并不是父元素）
			if (!template && el) template = el.outerHTML;

			// 最终需要把template模板转化成render函数
			if (template) {
				const render = compileToFunctions(template);
				options.render = render;
			}
		}
		// 将当前组件实例挂载到真实的el节点上面
		return mountComponent(vm, el);
	};

	Vue.mixin = function (mixin) {
		// 合并对象
		this.options = mergeOptions(this.options, mixin);
	};
}

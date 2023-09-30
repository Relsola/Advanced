// 1.组件挂载入口

// src/init.js

Vue.prototype.$mount = function (el) {
	const vm = this;
	const options = vm.$options;
	el = document.querySelector(el);

	// 如果不存在render属性
	if (!options.render) {
		// 如果存在template属性
		let template = options.template;

		if (!template && el) {
			// 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的外层html结构（就是el本身 并不是父元素）
			template = el.outerHTML;
		}

		// 最终需要把template模板转化成render函数
		if (template) {
			const render = compileToFunctions(template);
			options.render = render;
		}
	}

	// 将当前组件实例挂载到真实的el节点上面
	return mountComponent(vm, el);
};

// 2.组件挂载核心方法 mountComponent
// src/lifecycle.js
export function mountComponent(vm, el) {
	// 上一步模板编译解析生成了render函数
	// 下一步就是执行vm._render()方法 调用生成的render函数 生成虚拟dom
	// 最后使用vm._update()方法把虚拟dom渲染到页面

	// 真实的el选项赋值给实例的$el属性 为之后虚拟dom产生的新的dom替换老的dom做铺垫
	vm.$el = el;
	//   _update和._render方法都是挂载在Vue原型的方法  类似_init
	vm._update(vm._render());
}

// 3.render 函数转化成虚拟 dom 核心方法 _render

// src/render.js

import { createElement, createTextNode } from "./vdom/index";

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
	Vue.prototype._c = function (...args) {
		// 创建虚拟dom元素
		return createElement(...args);
	};

	Vue.prototype._v = function (text) {
		// 创建虚拟dom文本
		return createTextNode(text);
	};
	Vue.prototype._s = function (val) {
		// 如果模板里面的是一个对象  需要JSON.stringify
		return val == null
			? ""
			: typeof val === "object"
			? JSON.stringify(val)
			: val;
	};
}

// 主要在原型定义了_render 方法 然后执行了 render 函数 我们知道模板编译出来的 render 函数核心代码主要 return 了 类似于_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))这样的代码 那么我们还需要定义一下_c _v _s 这些函数才能最终转化成为虚拟 dom

// 定义Vnode类
export default class Vnode {
	constructor(tag, data, key, children, text) {
		this.tag = tag;
		this.data = data;
		this.key = key;
		this.children = children;
		this.text = text;
	}
}

// 创建元素vnode 等于render函数里面的 h=>h(App)
export function createElement(tag, data = {}, ...children) {
	let key = data.key;
	return new Vnode(tag, data, key, children);
}

// 创建文本vnode
export function createTextNode(text) {
	return new Vnode(
		undefined,
		undefined,
		undefined,
		undefined,
		text
	);
}

// 4.虚拟 dom 转化成真实 dom 核心方法 _update
// src/lifecycle.js

import { patch } from "./vdom/patch";
export function lifecycleMixin(Vue) {
	// 把_update挂载在Vue的原型
	Vue.prototype._update = function (vnode) {
		const vm = this;
		// patch是渲染vnode为真实dom核心
		patch(vm.$el, vnode);
	};
}

// src/vdom/patch.js

// patch用来渲染和更新视图 今天只介绍初次渲染的逻辑
export function patch(oldVnode, vnode) {
	// 判断传入的oldVnode是否是一个真实元素
	// 这里很关键  初次渲染 传入的vm.$el就是咱们传入的el选项  所以是真实dom
	// 如果不是初始渲染而是视图更新的时候  vm.$el就被替换成了更新之前的老的虚拟dom
	const isRealElement = oldVnode.nodeType;
	if (isRealElement) {
		// 这里是初次渲染的逻辑
		const oldElm = oldVnode;
		const parentElm = oldElm.parentNode;
		// 将虚拟dom转化成真实dom节点
		let el = createElm(vnode);
		// 插入到 老的el节点下一个节点的前面 就相当于插入到老的el节点的后面
		// 这里不直接使用父元素appendChild是为了不破坏替换的位置
		parentElm.insertBefore(el, oldElm.nextSibling);
		// 删除老的el节点
		parentElm.removeChild(oldVnode);
		return el;
	}
}
// 虚拟dom转成真实dom 就是调用原生方法生成dom树
function createElm(vnode) {
	let { tag, data, key, children, text } = vnode;
	//   判断虚拟dom 是元素节点还是文本节点
	if (typeof tag === "string") {
		//   虚拟dom的el属性指向真实dom
		vnode.el = document.createElement(tag);
		// 解析虚拟dom属性
		updateProperties(vnode);
		// 如果有子节点就递归插入到父节点里面
		children.forEach(child => {
			return vnode.el.appendChild(createElm(child));
		});
	} else {
		//   文本节点
		vnode.el = document.createTextNode(text);
	}
	return vnode.el;
}

// 解析vnode的data属性 映射到真实dom上
function updateProperties(vnode) {
	let newProps = vnode.data || {};
	let el = vnode.el; //真实节点
	for (let key in newProps) {
		// style需要特殊处理下
		if (key === "style") {
			for (let styleName in newProps.style) {
				el.style[styleName] = newProps.style[styleName];
			}
		} else if (key === "class") {
			el.className = newProps.class;
		} else {
			// 给这个元素添加属性 值就是对应的值
			el.setAttribute(key, newProps[key]);
		}
	}
}

// 5._render 和_update 原型方法的混入
// src/index.js

import { initMixin } from "./init.js";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
// Vue就是一个构造函数 通过new关键字进行实例化
function Vue(options) {
	// 这里开始进行Vue初始化工作
	this._init(options);
}
// _init方法是挂载在Vue原型的方法 通过引入文件的方式进行原型挂载需要传入Vue
// 此做法有利于代码分割
initMixin(Vue);

// 混入_render
renderMixin(Vue);
// 混入_update
lifecycleMixin(Vue);

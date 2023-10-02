import { mergeOptions } from "../util/index.js";

export default function initExtend(Vue) {
	//组件的唯一标识
	let cid = 0;

	// 创建子类继承Vue父类 便于属性扩展
	Vue.extend = function (extendOptions) {
		// 创建子类的构造函数 并且调用初始化方法
		const Sub = function VueComponent(options) {
			this._init(options); //调用Vue初始化方法
		};

		Sub.cid = cid++;

		// 子类原型指向父类
		Sub.prototype = Object.create(this.prototype);
		//constructor指向自己
		Sub.prototype.constructor = Sub;
		//合并自己的 options 和父类的 options
		Sub.options = mergeOptions(this.options, extendOptions);
		return Sub;
	};
}

import { arrayMethods } from "./array.js";
import { Dep } from "./dep.js";

class Observer {
	// 观测值
	constructor(value) {
		Object.defineProperty(value, "__ob__", {
			// 值指代的就是Observer的实例
			value: this,
			// 不可枚举
			enumerable: false,
			writable: true,
			configurable: true
		});

		if (Array.isArray(value)) {
			// 判断是数组通过通过重写数组原型方法来对数组的七种方法进行拦截
			value.__proto__ = arrayMethods;
			// 如果数组里面还包含数组 需要递归判断
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	}

	walk(data) {
		// 对象上的所有属性依次进行观测
		Object.keys(data).forEach(key => {
			defineReactive(data, key, data[key]);
		});
	}

	observeArray(items) {
		items.forEach(item => observe(item));
	}
}

// Object.defineProperty 数据劫持核心
function defineReactive(data, key, value) {
	// 递归，直到value不是对象才停止
	// childOb就是Observer实例
	const childOb = observe(value);

	// 为每个属性实例化一个Dep
	const dep = new Dep();

	Object.defineProperty(data, key, {
		get() {
			// 页面取值的时候 把watcher收集到dep里面 --依赖收集
			if (Dep.target) {
				// 如果有watcher dep就会保存watcher 同时watcher也会保存dep
				dep.depend();

				// 如果 value 是一个数组
				if (childOb && Array.isArray(value)) {
					value.__ob__.dep = dep;
					// 递归遍历属性
					dependArray(value);
				}
			}
			return value;
		},

		set(newValue) {
			if (newValue === value) return;

			// 如果赋值的新值也是一个对象  需要观测
			observe(newValue);
			value = newValue;

			// 通知渲染watcher去更新 --派发更新
			dep.notify();
		}
	});
}

// 递归收集数组依赖
function dependArray(value) {
	value.forEach(e => {
		e && e.__ob__ && e.__ob__.dep.depend();
		// 如果数组里面还有数组  就递归去收集依赖
		if (Array.isArray(e)) dependArray(e);
	});
}

export function observe(value) {
	// 如果传过来的是对象或者数组 进行属性劫持
	const type = Object.prototype.toString.call(value);
	if (type === "[object Object]" || type === "[object Array]")
		return new Observer(value);
}

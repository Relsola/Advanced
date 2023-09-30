// 1.数据初始化
new Vue({
	el: "#app",
	router,
	store,
	render: h => h(App)
});

// Vue就是一个构造函数 通过new关键字进行实例化
function Vue(options) {
	this._init(options);
}

// _init方法是挂载在Vue原型的方法 通过引入文件的方式进行原型挂载需要传入Vue
// 此做法有利于代码分割
initMixin(Vue);

function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		// 这里的this代表调用_init方法的对象(实例对象)
		//  this.$options就是用户new Vue的时候传入的属性
		const vm = this;
		vm.$options = options;
		initState(vm);
	};
}

// 这里初始化的顺序依次是 prop>methods>data>computed>watch
function initState(vm) {
	// 获取传入的数据对象
	const opts = vm.$options;
	if (opts.props) {
		initProps(vm);
	}
	if (opts.methods) {
		initMethod(vm);
	}
	if (opts.data) {
		// 初始化data
		initData(vm);
	}
	if (opts.computed) {
		initComputed(vm);
	}
	if (opts.watch) {
		initWatch(vm);
	}
}

// 初始化data数据
function initData(vm) {
	let data = vm.$options.data;
	// 实例的_data属性就是传入的data
	// vue组件data推荐使用函数 防止数据在组件之间共享
	data = vm._data =
		typeof data === "function" ? data.call(vm) : data || {};

	// 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a
	for (let key in data) {
		proxy(vm, `_data`, key);
	}
	// 数据劫持 --响应式数据核心
	observe(data);
}

// 数据代理
function proxy(object, sourceKey, key) {
	Object.defineProperty(object, key, {
		get() {
			return object[sourceKey][key];
		},
		set(newValue) {
			object[sourceKey][key] = newValue;
		}
	});
}

// 对象的数据劫持
class Observer {
	// 观测值
	constructor(value) {
		this.walk(value);
	}

	walk(data) {
		// 对象上的所有属性依次进行观测
		Object.keys(data).forEach(key => {
			defineReactive(data, key, data[key]);
		});
	}
}

// Object.defineProperty数据劫持核心 兼容性在ie9以及以上
function defineReactive(data, key, value) {
	observe(value); // 递归关键
	// --如果value还是一个对象会继续走一遍defineReactive 层层遍历一直到value不是对象才停止
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get() {
			return value;
		},
		set(newValue) {
			if (newValue === value) return;
			value = newValue;
		}
	});
}

function observe(value) {
	// 如果传过来的是对象或者数组 进行属性劫持
	const type = Object.prototype.toString.call(value);
	if (type === "[object Object]" || type === "[object Array]")
		return new Observer(value);
}

// 数组的观测
class Observer {
	constructor(value) {
		if (Array.isArray(value)) {
			// 这里对数组做了额外判断
			// 通过重写数组原型方法来对数组的七种方法进行拦截
			value.__proto__ = arrayMethods;
			// 如果数组里面还包含数组 需要递归判断
			this.observeArray(value);
		} else this.walk(value);
	}
	observeArray(items) {
		items.forEach(item => observe(item));
	}
}

class Observer {
	// 观测值
	constructor(value) {
		Object.defineProperty(value, "__ob__", {
			//  值指代的就是Observer的实例
			value: this,
			//  不可枚举
			enumerable: false,
			writable: true,
			configurable: true
		});
	}
}

const arrayProto = Array.prototype;
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
const arrayMethods = Object.create(arrayProto);
let methodsToPatch = [
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"reverse",
	"sort"
];
methodsToPatch.forEach(method => {
	arrayMethods[method] = function (...args) {
		//   这里保留原型方法的执行结果
		const result = arrayProto[method].apply(this, args);
		// 这句话是关键
		// this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
		const ob = this.__ob__;

		// 这里的标志就是代表数组有新增操作
		let inserted;
		switch (method) {
			case "push":
			case "unshift":
				inserted = args;
				break;
			case "splice":
				inserted = args.slice(2);
			default:
				break;
		}
		// 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
		if (inserted) ob.observeArray(inserted);
		// 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作--后续源码会揭晓
		return result;
	};
});

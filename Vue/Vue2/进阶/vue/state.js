import { observe } from "./observer/index.js";
import Watcher from "./observer/watcher.js";
import { Dep } from "./observer/dep.js";

// 这里初始化的顺序依次是 prop > methods > data > computed > watch
export function initState(vm) {
	// 获取传入的数据对象
	const opts = vm.$options;

	// 初始化props
	// if (opts.props) initProps(vm);

	// 初始化methods
	// if (opts.methods) initMethod(vm);

	// 初始化data
	if (opts.data) initData(vm);

	// 初始化computed
	if (opts.computed) initComputed(vm);

	// 初始化watch
	if (opts.watch) initWatch(vm);
}

// 初始化data数据
function initData(vm) {
	// 实例的 _data 属性就是传入的 data
	let data = vm.$options.data;

	// vue组件data推荐使用函数 防止数据在组件之间共享
	data = vm._data =
		typeof data === "function" ? data.call(vm) : data || {};

	// 将 data 数据代理到 Vue 实例上
	for (const key in data) proxy(vm, `_data`, key);

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

// 初始化watch
function initWatch(vm) {
	const watch = vm.$options.watch;
	for (const key in watch) {
		// 用户自定义 watch 的写法可能是数组 对象 函数 字符串
		const handler = watch[key];
		
		if (Array.isArray(handler)) {
			// 如果是数组就遍历进行创建
			handler.forEach(handle => createWatcher(vm, key, handle));
		} else {
			createWatcher(vm, key, handler);
		}
	}
}

// 创建watcher的核心
function createWatcher(vm, exprOrFn, handler, options = {}) {
	if (typeof handler === "object") {
		//保存用户传入的对象
		options = handler;
		//这个代表真正用户传入的函数
		handler = handler.handler;
	}

	// 传入的是定义好的methods方法
	if (typeof handler === "string") {
		handler = vm[handler];
	}

	// 调用vm.$watch创建用户watcher
	return vm.$watch(exprOrFn, handler, options);
}

function initComputed(vm) {
	const computed = vm.$options.computed;

	//用来存放计算watcher
	const watchers = (vm._computedWatchers = {});

	for (const key in computed) {
		// 获取用户定义的计算属性
		const userDef = computed[key];

		//创建计算属性watcher使用
		const getter =
			typeof userDef === "function" ? userDef : userDef.get;

		// 创建计算watcher  lazy设置为true
		watchers[key] = new Watcher(vm, getter, () => {}, {
			lazy: true
		});

		defineComputed(vm, key, userDef);
	}
}

// 定义普通对象用来劫持计算属性
const sharedPropertyDefinition = {
	enumerable: true,
	configurable: true,
	get: () => {},
	set: () => {}
};

// 重新定义计算属性  对get和set劫持
function defineComputed(target, key, userDef) {
	if (typeof userDef === "function") {
		// 如果是一个函数  需要手动赋值到get上
		sharedPropertyDefinition.get = createComputedGetter(key);
	} else {
		sharedPropertyDefinition.get = createComputedGetter(key);
		sharedPropertyDefinition.set = userDef.set;
	}

	//   利用Object.defineProperty来对计算属性的get和set进行劫持
	Object.defineProperty(target, key, sharedPropertyDefinition);
}

// 重写计算属性的get方法 来判断是否需要进行重新计算
function createComputedGetter(key) {
	return function () {
		const watcher = this._computedWatchers[key]; //获取对应的计算属性watcher
		if (watcher) {
			if (watcher.dirty) {
				watcher.evaluate(); //计算属性取值的时候 如果是脏的  需要重新求值
				if (Dep.target) {
					// 如果Dep还存在target 这个时候一般为渲染watcher 计算属性依赖的数据也需要收集
					watcher.depend();
				}
			}
			return watcher.value;
		}
	};
}

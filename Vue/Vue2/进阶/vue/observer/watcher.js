import { pushTarget, popTarget } from "./dep.js";

// 全局变量id  每次new Watcher都会自增
let id = 0;

export default class Watcher {
	constructor(vm, exprOrFn, cb, options) {
		this.vm = vm;
		this.exprOrFn = exprOrFn;

		//回调函数 比如在watcher更新之前可以执行beforeUpdate方法
		this.cb = cb;

		//额外的选项 true代表渲染watcher
		this.options = options;

		// watcher的唯一标识
		this.id = id++;

		//存放dep的容器
		this.deps = [];

		//用来去重dep
		this.depsId = new Set();

		// 如果表达式是一个函数
		if (typeof exprOrFn === "function") {
			this.getter = exprOrFn;
		}

		// 实例化就会默认调用get方法
		this.get();
	}

	get() {
		// 在调用方法之前先把当前watcher实例推到全局Dep.target上
		pushTarget(this);

		//如果watcher是渲染watcher 那么就相当于执行  vm._update(vm._render()) 这个方法在render函数执行的时候会取值 从而实现依赖收集
		this.getter();

		// 在调用方法之后把当前watcher实例从全局Dep.target移除
		popTarget();
	}

	// 把dep放到deps里面 同时保证同一个dep只被保存到watcher一次  同样的  同一个watcher也只会保存在dep一次
	addDep(dep) {
		let id = dep.id;
		if (!this.depsId.has(id)) {
			this.depsId.add(id);
			this.deps.push(dep);
			// 直接调用dep的addSub方法  把自己--watcher实例添加到dep的subs容器里面
			dep.addSub(this);
		}
	}

	// 这里简单的就执行以下get方法  之后涉及到计算属性就不一样了
	update() {
		this.get();
	}
}

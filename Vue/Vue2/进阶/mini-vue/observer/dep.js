// dep和watcher是多对多的关系

// 每个属性都有自己的dep
export class Dep {
	// 默认Dep.target为null
	static target = null;
	// 栈结构用来存watcher
	static targetStack = [];
	// dep实例的唯一标识
	static id = 0;

	constructor() {
		this.id = Dep.id++;
		// 存放 watcher
		this.subs = [];
	}

	depend() {
		// 如果当前存在watcher 把自身dep实例存放在watcher里面
		if (Dep.target) Dep.target.addDep(this);
	}

	notify() {
		// 依次执行subs里面的watcher更新方法
		this.subs.forEach(watcher => watcher.update());
	}

	addSub(watcher) {
		// 把watcher加入到自身的subs容器
		this.subs.push(watcher);
	}
}

export function pushTarget(watcher) {
	Dep.targetStack.push(watcher);
	// Dep.target指向当前watcher
	Dep.target = watcher;
}

export function popTarget() {
	// 当前watcher出栈 拿到上一个watcher
	Dep.targetStack.pop();
	Dep.target = Dep.targetStack.at(-1);
}

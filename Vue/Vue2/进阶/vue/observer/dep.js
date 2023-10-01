// dep和watcher是多对多的关系

// 每个属性都有自己的dep

//dep实例的唯一标识
let id = 0;
export class Dep {
	static target = null

	constructor() {
		this.id = id++;
		// 这个是存放watcher的容器
		this.subs = [];
	}

	depend() {
		// 如果当前存在watcher
		if (Dep.target) {
			Dep.target.addDep(this); // 把自身dep实例存放在watcher里面
		}
	}

	notify() {
		//   依次执行subs里面的watcher更新方法
		this.subs.forEach(watcher => watcher.update());
	}
	
	addSub(watcher) {
		// 把watcher加入到自身的subs容器
		this.subs.push(watcher);
	}
}

// 默认Dep.target为null
// Dep.target = null;

// 栈结构用来存watcher
const targetStack = [];

export function pushTarget(watcher) {
	targetStack.push(watcher);
	// Dep.target指向当前watcher
	Dep.target = watcher;
}

export function popTarget() {
	// 当前watcher出栈 拿到上一个watcher
	targetStack.pop();
	Dep.target = targetStack.at(-1);
}

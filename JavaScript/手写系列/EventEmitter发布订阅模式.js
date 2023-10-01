class EventEmitter {
	constructor() {
		// 用一个对象来保存事件和订阅者
		this.events = {};
	}

	// 添加事件
	on(event, listener) {
		if (this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener);
	}

	// 触发事件
	emit(event, ...arg) {
		const listeners = this.events[event] ?? [];
		listeners.forEach(listener => listener(...arg));
	}

	// 移除事件
	off(event, listener) {
		const listeners = this.events[event] ?? [];
		const index = listeners.indexOf(listener);
		if (index !== -1) listener.splice(index, 1);
    }
}
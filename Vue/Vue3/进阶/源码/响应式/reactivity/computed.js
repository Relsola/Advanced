import {
	ReactiveEffect,
	activeEffect,
	triggerEffects
} from "./effect.js";

export function computed(getterOrOptions) {
	// 这里只考虑简单情况 即 getterOrOptions 为 getter
	const getter = getterOrOptions;
	return new ComputedRefImpl(getter);
}

export class ComputedRefImpl {
	constructor(getter) {
		// 保存getter
		this.effect = new ReactiveEffect(getter, () => {
			if (!this._dirty) {
				this._dirty = true;
				this.dep && triggerEffects(this.dep);
			}
		});
		this.dep = undefined;
		// 是否重新计算 默认值为true
		this._dirty = true;
	}
	get value() {
		// 收集依赖
		this.dep ??= new Set();
		this.dep.add(activeEffect);
		if (this._dirty) {
			this._dirty = false;
			// 执行run函数
			this._value = this.effect.run();
		}
		return this._value;
	}
}

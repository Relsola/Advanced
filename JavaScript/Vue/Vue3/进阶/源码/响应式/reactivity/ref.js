import { activeEffect, triggerEffects } from "./effect.js";
import { reactive } from "./reactive.js";

export const isObject = val =>
	val !== null && typeof val === "object";

export function ref(value) {
	return new RefImpl(value);
}

class RefImpl {
	constructor(value) {
		// 代理value
		this._value = toReactive(value);
		// 保存原型
		this._rawValue = value;
		this.dep = undefined;
	}
	// 收集依赖
	get value() {
		if (activeEffect) {
			this.dep ??= new Set();
			this.dep.add(activeEffect);
		}
		return this._value;
	}

	set value(newVal) {
		// 确定两个值是否为相同值。
		if (!Object.is(newVal, this._rawValue)) {
			this._rawValue = newVal;
			this._value = toReactive(newVal);
			// 触发依赖
			if (this.dep) {
				triggerEffects(this.dep);
			}
		}
	}
}

// 对象形式转换成reactive代理
export const toReactive = value =>
	isObject(value) ? reactive(value) : value;

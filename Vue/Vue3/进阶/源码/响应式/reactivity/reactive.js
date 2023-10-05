import { trigger, track } from "./effect.js";

// Map缓存 observed
export const reactiveMap = new WeakMap();

export function reactive(target) {
	// 如果对象已经被劫持，返回之前的proxy
	if (reactiveMap.has(target)) {
		return reactiveMap.get(target);
	}
	// 这里只考虑 get 和 set
	const observed = new Proxy(target, {
		get(target, key, receiver) {
			const result = Reflect.get(target, key, receiver);
			track(target, key);
			return result;
		},
		set(target, key, value, receiver) {
			const result = Reflect.set(target, key, value, receiver);
			trigger(target, key);
			return result;
		}
	});
	observed.__v_isReadonly = true;
	reactiveMap.set(target, observed);
	return observed;
}

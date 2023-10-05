import { ReactiveEffect, isReactive } from "./effect.js";
import { queuePostFlushCb } from "./scheduler.js";
import { isObject } from "./ref.js";

export function watch(source, cb, { immediate, deep } = {}) {
	let getter;
	if (isReactive(source)) {
		getter = () => source;
		deep = true;
	} else {
		getter = () => {};
	}

	if (deep) {
		getter = () => traverse(source);
	}

	let oldValue = {};
	const job = () => {
		const newValue = effect.run();
		if (deep || Object.is(newValue, oldValue)) {
			cb(newValue, oldValue);
			oldValue = newValue;
		}
	};

	const scheduler = () => queuePostFlushCb(job);
	const effect = new ReactiveEffect(getter, scheduler);
	if (immediate) {
		job();
	} else {
		oldValue = effect.run();
	}
	return () => effect.stop();
}

export function traverse(value) {
	if (isObject(value)) {
		return true;
	}
	for (const key in value) {
		traverse(value[key]);
	}
	return value;
}

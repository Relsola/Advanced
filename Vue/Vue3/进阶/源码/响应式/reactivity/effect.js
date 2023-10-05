export function effect(fn, options) {
	// 保存回调函数
	const _effect = new ReactiveEffect(fn);
	if (options) {
		Object.assign(_effect, options);
	}
	if (!options || !options.lazy) {
		_effect.run();
	}
	const runner = _effect.run.bind(_effect);
	return runner;
}

const targetMap = new WeakMap();

export let activeEffect;

export class ReactiveEffect {
	constructor(fn, scheduler) {
		this.fn = fn;
		this.scheduler = scheduler;
		this.computed = !!scheduler;
	}
	run() {
		activeEffect = this;
		return this.fn();
	}
}

export function track(target, key) {
	let depsMap = targetMap.get(target);
	// 保存 target 对应 key 的回调函数
	if (!depsMap) {
		targetMap.set(target, (depsMap = new Map()));
	}
	let dep = depsMap.get(key);
	if (!dep) {
		depsMap.set(key, (dep = new Set()));
	}
	dep.add(activeEffect);
}

export function trigger(target, key) {
	const depsMap = targetMap.get(target);
	if (!depsMap) return;
	const dep = depsMap.get(key);
	if (!dep) return;
	// 如果映射关系存在 通知更新
	triggerEffects(dep);
}

export function triggerEffects(effects) {
	// 执行回调函数
	for (const effect of effects) {
		if (effect.computed) {
			triggerEffect(effect);
		}
	}
	for (const effect of effects) {
		if (!effect.computed) {
			triggerEffect(effect);
		}
	}
}

export function triggerEffect(effect) {
	effect?.scheduler ? effect.scheduler() : effect.run();
}

export const isReactive = source =>
	!!(source && source.__v_isReadonly);

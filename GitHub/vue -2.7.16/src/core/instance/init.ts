import type { Component } from 'types/component';
import { initLifecycle, callHook } from './lifecycle';

let uid: number = 0;

export function initMixin(Vue: typeof Component) {
  Vue.prototype._init = function (options?: Record<string, any>) {
    const vm: Component = this;
    vm._uid = uid++; // 唯一id

    vm._isVue = true;
    vm.__v_skip = true;

    vm._self = vm;
  };
}

function resolveModifiedOptions(Ctor: typeof Component): Record<string, any> | null {
  let modified: Record<string, any> | null = null;
  const latest = Ctor.options;
  const sealed = Ctor.sealedOptions;

  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {};
      modified[key] = latest[key];
    }
  }

  return modified;
}

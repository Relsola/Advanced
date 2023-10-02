import initExtend from "./initExtend.js";
import initAssetRegisters from "./assets.js";

export const ASSETS_TYPE = ["component", "directive", "filter"];

export function initGlobalApi(Vue) {
	// 全局的组件 指令 过滤器
	Vue.options = {};

	ASSETS_TYPE.forEach(type => (Vue.options[type + "s"] = {}));

	// _base 指向Vue
	Vue.options._base = Vue;

	// extend方法定义
	initExtend(Vue);

	// assets注册方法 包含组件 指令和过滤器
	initAssetRegisters(Vue);
}

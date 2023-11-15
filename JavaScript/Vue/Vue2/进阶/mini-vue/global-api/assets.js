import { ASSETS_TYPE } from "./index.js";

export default function initAssetRegisters(Vue) {
	ASSETS_TYPE.forEach(type => {
		Vue[type] = function (id, definition) {
			if (type === "component") {
				// 全局组件注册 子组件继承父组件方法
				definition = this.options._base.extend(definition);
			}

			this.options[type + "s"][id] = definition;
		};
	});
}

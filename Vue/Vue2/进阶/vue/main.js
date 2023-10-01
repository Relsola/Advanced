import Vue from "./index.js";

const vm = new Vue({
	el: "#app",
	data: () => ({
		msg: "Hello Vue",
		num: 111,
		arr: [1, 2, 3]
	})
});

// 模拟更新视图
setTimeout(() => {
	vm.num = 222;
	vm.arr.push(99)
}, 2000);

console.log(vm);
